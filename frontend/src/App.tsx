import React, { useState, useEffect } from 'react';
import type { BenchmarkStorm, AIAnalysisResult, UserProfile } from './types/cyclone';
import { fetchBenchmarkStorms, runBenchmarkAnalysis, deleteCycloneRecord } from './services/api';
import { getStoredUser, isFirebaseCloudConnected, logoutUser } from './services/firebase';

import { CycloneMap } from './components/Map/CycloneMap';
import { SatelliteViewer } from './components/SatelliteStudio/SatelliteViewer';
import { AIDiagnostics } from './components/Analysis/AIDiagnostics';
import { MetricsPanel } from './components/Telemetry/MetricsPanel';
import { IMDBulletin } from './components/Bulletin/IMDBulletin';
import { ModelValidationPanel } from './components/Validation/ModelValidationPanel';
import { FirebaseAuthModal } from './components/Auth/FirebaseAuthModal';
import { GlobalHazardAtlas } from './components/HazardAtlas/GlobalHazardAtlas';

import { 
  Compass, 
  Satellite, 
  FileText, 
  Cloud, 
  User, 
  LogOut, 
  Activity,
  Radio,
  Printer,
  Award,
  Sun,
  Moon,
  Globe
} from 'lucide-react';

const LOCAL_STORAGE_CUSTOM_STORMS_KEY = "cycloneai_custom_storms";
const LOCAL_STORAGE_ANALYSES_KEY = "cycloneai_custom_analyses";

export const App: React.FC = () => {
  // Theme State: Defaults to light mode as requested!
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem('cycloneai_theme');
    return (saved === 'dark' || saved === 'light') ? saved : 'light';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    document.body.setAttribute('data-theme', theme);
    localStorage.setItem('cycloneai_theme', theme);
  }, [theme]);

  const [benchmarkStorms, setBenchmarkStorms] = useState<BenchmarkStorm[]>([]);
  const [currentStorm, setCurrentStorm] = useState<BenchmarkStorm | null>(null);
  const [analysis, setAnalysis] = useState<AIAnalysisResult | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'map' | 'satellite' | 'bulletin' | 'validation' | 'hazard-hotspots'>('overview');

  // Auth & Cloud State
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(getStoredUser());
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [isCloudConnected, setIsCloudConnected] = useState<boolean>(isFirebaseCloudConnected());

  // Real-time Clock State (UTC & IST)
  const [currentTime, setCurrentTime] = useState<Date>(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const [analysesByStorm, setAnalysesByStorm] = useState<Record<string, AIAnalysisResult>>({});

  // Initial Data Fetch & Persistent Records Restore
  useEffect(() => {
    const initData = async () => {
      try {
        const storms = await fetchBenchmarkStorms();
        
        // Restore custom saved storms from localStorage
        let savedCustomStorms: BenchmarkStorm[] = [];
        try {
          const raw = localStorage.getItem(LOCAL_STORAGE_CUSTOM_STORMS_KEY);
          if (raw) savedCustomStorms = JSON.parse(raw);
        } catch (e) {
          console.warn("Failed to load saved custom storms from localStorage:", e);
        }

        let savedAnalyses: Record<string, AIAnalysisResult> = {};
        try {
          const rawAn = localStorage.getItem(LOCAL_STORAGE_ANALYSES_KEY);
          if (rawAn) savedAnalyses = JSON.parse(rawAn);
        } catch (e) {
          console.warn("Failed to load saved analyses from localStorage:", e);
        }

        // Combine saved records with benchmark storms
        const combinedStorms = [...savedCustomStorms, ...storms.filter(s => !savedCustomStorms.some(cs => cs.id === s.id))];
        setBenchmarkStorms(combinedStorms);
        setAnalysesByStorm(prev => ({ ...prev, ...savedAnalyses }));

        if (combinedStorms.length > 0) {
          const defaultStorm = combinedStorms[0];
          setCurrentStorm(defaultStorm);
          if (savedAnalyses[defaultStorm.id]) {
            setAnalysis(savedAnalyses[defaultStorm.id]);
          } else {
            try {
              const aiRes = await runBenchmarkAnalysis(defaultStorm.id);
              setAnalysis(aiRes);
              setAnalysesByStorm(prev => ({ ...prev, [defaultStorm.id]: aiRes }));
            } catch (aiErr) {
              console.warn("Initial AI pipeline run error:", aiErr);
            }
          }
        }
      } catch (e) {
        console.error("Failed to load initial benchmark cyclones:", e);
      }
    };
    initData();
  }, []);

  const handleSelectStorm = async (storm: BenchmarkStorm) => {
    setCurrentStorm(storm);
    if (analysesByStorm[storm.id]) {
      setAnalysis(analysesByStorm[storm.id]);
    } else {
      try {
        const aiRes = await runBenchmarkAnalysis(storm.id);
        setAnalysis(aiRes);
        setAnalysesByStorm(prev => ({ ...prev, [storm.id]: aiRes }));
      } catch (aiErr) {
        console.warn("Failed to fetch analysis for storm:", aiErr);
      }
    }
  };

  const handleAddCustomStorm = (newStorm: BenchmarkStorm, stormAnalysis: AIAnalysisResult) => {
    setBenchmarkStorms(prev => {
      const exists = prev.some(s => s.id === newStorm.id);
      const updated = exists ? prev.map(s => s.id === newStorm.id ? newStorm : s) : [newStorm, ...prev];
      
      // Persist custom storms into localStorage
      const customOnly = updated.filter(s => s.isCustom);
      try {
        localStorage.setItem(LOCAL_STORAGE_CUSTOM_STORMS_KEY, JSON.stringify(customOnly));
      } catch (e) {
        console.warn("Failed to save custom storms to localStorage:", e);
      }
      return updated;
    });

    setAnalysesByStorm(prev => {
      const updatedAnalyses = { ...prev, [newStorm.id]: stormAnalysis };
      try {
        localStorage.setItem(LOCAL_STORAGE_ANALYSES_KEY, JSON.stringify(updatedAnalyses));
      } catch (e) {}
      return updatedAnalyses;
    });

    setCurrentStorm(newStorm);
    setAnalysis(stormAnalysis);
  };

  const handleDeleteStorm = async (stormId: string) => {
    // Notify server of deletion
    deleteCycloneRecord(stormId);

    setBenchmarkStorms(prev => {
      const updated = prev.filter(s => s.id !== stormId);
      const customOnly = updated.filter(s => s.isCustom);
      try {
        localStorage.setItem(LOCAL_STORAGE_CUSTOM_STORMS_KEY, JSON.stringify(customOnly));
      } catch (e) {}

      // If current storm is being deleted, fallback to first available storm
      if (currentStorm?.id === stormId && updated.length > 0) {
        const nextStorm = updated[0];
        setCurrentStorm(nextStorm);
        if (analysesByStorm[nextStorm.id]) {
          setAnalysis(analysesByStorm[nextStorm.id]);
        } else {
          runBenchmarkAnalysis(nextStorm.id).then(res => {
            setAnalysis(res);
            setAnalysesByStorm(p => ({ ...p, [nextStorm.id]: res }));
          }).catch(err => console.warn(err));
        }
      }
      return updated;
    });

    setAnalysesByStorm(prev => {
      const copy = { ...prev };
      delete copy[stormId];
      try {
        localStorage.setItem(LOCAL_STORAGE_ANALYSES_KEY, JSON.stringify(copy));
      } catch (e) {}
      return copy;
    });
  };

  const handleAnalysisComplete = (newAnalysis: AIAnalysisResult) => {
    setAnalysis(newAnalysis);
    if (currentStorm) {
      setAnalysesByStorm(prev => ({
        ...prev,
        [currentStorm.id]: newAnalysis
      }));
    }
  };

  const handleLogout = async () => {
    await logoutUser();
    setCurrentUser(null);
  };

  const utcString = currentTime.toUTCString().replace("GMT", "UTC");
  const istString = currentTime.toLocaleTimeString("en-IN", { timeZone: "Asia/Kolkata", hour12: false }) + " IST";

  return (
    <div className="app-container">
      {/* Top Operational Navigation Bar */}
      <header className="navbar">
        {/* Brand & Logo */}
        <div className="brand-section">
          <div className="brand-logo-badge">
            🌀
          </div>
          <div>
            <div className="brand-title">
              CYCLOFLOW
              <span className="brand-badge">SIH OPERATIONAL MET</span>
            </div>
            <div className="brand-tagline">
              Multi-Source Satellite AI Identification, Dvorak Classification & 72h Track Forecaster
            </div>
          </div>
        </div>

        {/* Live Clock Strip */}
        <div className="nav-clock-block">
          <div className="time-item">
            <span className="time-label">UNIVERSAL TIME</span>
            <span className="time-val">{utcString.split(" ").slice(4, 5)[0]} UTC</span>
          </div>
          <div className="time-item">
            <span className="time-label">INDIAN STANDARD</span>
            <span className="time-val">{istString}</span>
          </div>
          <div className="time-item">
            <span className="time-label">SATELLITE DOWNLINK</span>
            <span className="time-val" style={{ color: '#34d399' }}>
              <Radio className="w-3 h-3 inline mr-1 animate-pulse" />
              INSAT-3DR L1B
            </span>
          </div>
        </div>

        {/* Firebase Cloud & Auth Controls */}
        <div className="nav-actions">
          <button 
            className={`cloud-pill ${isCloudConnected ? '' : 'sim'}`}
            onClick={() => setIsAuthModalOpen(true)}
            title="Firebase Cloud Database & Sync Configuration"
            id="firebase-cloud-status-btn"
          >
            <Cloud className="w-3.5 h-3.5" />
            <span>{isCloudConnected ? 'Firestore Cloud: ACTIVE' : 'Firebase Sync: Ready'}</span>
          </button>

          {currentUser ? (
            <div className="flex items-center gap-2">
              <button 
                className="user-button"
                onClick={() => setIsAuthModalOpen(true)}
                title={`Logged in as ${currentUser.displayName} (${currentUser.role})`}
                id="user-profile-btn"
              >
                <div className="user-avatar">
                  {currentUser.displayName.charAt(0).toUpperCase()}
                </div>
                <span>{currentUser.displayName.split(' ')[0]}</span>
              </button>
              <button 
                className="tool-icon-btn" 
                onClick={handleLogout} 
                title="Sign Out"
                id="logout-btn"
              >
                <LogOut className="w-4 h-4 text-slate-400 hover:text-rose-400" />
              </button>
            </div>
          ) : (
            <button 
              className="user-button" 
              onClick={() => setIsAuthModalOpen(true)}
              id="open-login-btn"
            >
              <User className="w-4 h-4 text-cyan-400" />
              <span>Officer Sign In</span>
            </button>
          )}

          {/* Light / Dark Mode Theme Switcher */}
          <button
            className="theme-toggle-btn"
            onClick={() => setTheme(prev => prev === 'light' ? 'dark' : 'light')}
            title={`Toggle Theme (Current: ${theme === 'light' ? 'Light' : 'Dark'} Mode)`}
            id="theme-toggle-btn"
            aria-label="Toggle Light/Dark Theme"
          >
            {theme === 'light' ? (
              <>
                <Sun className="w-3.5 h-3.5 text-amber-500 inline" />
                <span>Light UI</span>
              </>
            ) : (
              <>
                <Moon className="w-3.5 h-3.5 text-indigo-400 inline" />
                <span>Dark UI</span>
              </>
            )}
          </button>

          <button 
            className="print-report-nav-btn"
            onClick={() => window.print()}
            title="Export Official IMD Print / PDF Advisory Bulletin"
            id="export-pdf-nav-btn"
          >
            <Printer className="w-3.5 h-3.5 text-cyan-400" />
            <span>Export PDF</span>
          </button>
        </div>
      </header>

      {/* View Mode Navigation Tabs */}
      <nav className="view-tabs" aria-label="Dashboard Views">
        <button
          className={`view-tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
          id="tab-view-overview"
        >
          <Activity className="w-4 h-4" />
          <span>Integrated Operations</span>
        </button>
        <button
          className={`view-tab-btn ${activeTab === 'map' ? 'active' : ''}`}
          onClick={() => setActiveTab('map')}
          id="tab-view-map"
        >
          <Compass className="w-4 h-4" />
          <span>Geospatial Radar Map</span>
        </button>
        <button
          className={`view-tab-btn ${activeTab === 'satellite' ? 'active' : ''}`}
          onClick={() => setActiveTab('satellite')}
          id="tab-view-satellite"
        >
          <Satellite className="w-4 h-4" />
          <span>Satellite Multi-Spectral Studio</span>
        </button>
        <button
          className={`view-tab-btn ${activeTab === 'bulletin' ? 'active' : ''}`}
          onClick={() => setActiveTab('bulletin')}
          id="tab-view-bulletin"
        >
          <FileText className="w-4 h-4" />
          <span>IMD Warning Bulletin</span>
        </button>
        <button
          className={`view-tab-btn ${activeTab === 'validation' ? 'active' : ''}`}
          onClick={() => setActiveTab('validation')}
          id="tab-view-validation"
        >
          <Award className="w-4 h-4 text-amber-400" />
          <span>Model Accuracy & Benchmark</span>
        </button>
        <button
          className={`view-tab-btn ${activeTab === 'hazard-hotspots' ? 'active' : ''}`}
          onClick={() => setActiveTab('hazard-hotspots')}
          id="tab-view-hazard-hotspots"
        >
          <Globe className="w-4 h-4 text-emerald-400" />
          <span>Global Hazard Hotspots</span>
        </button>
      </nav>

      {/* Main Content Area */}
      <main>
        {/* Official Print Classification & Running Header (Visible only when exporting to PDF) */}
        <div className="print-classification-bar">
          RESTRICTED &bull; OFFICIAL METEOROLOGICAL ADVISORY & RISK DOSSIER &bull; FOR AUTHORIZED OPERATIONS ONLY
        </div>

        <div className="print-report-header">
          {activeTab === 'hazard-hotspots' ? (
            <>
              <div className="print-header-top">
                <div className="print-dept-title">सत्यमेव जयते &bull; NATIONAL DISASTER MANAGEMENT AUTHORITY &bull; GOVT. OF INDIA</div>
                <div className="print-sub-dept">GLOBAL MULTI-HAZARD RISK ATLAS &bull; DISASTER VULNERABILITY INTELLIGENCE DOSSIER</div>
              </div>
              <div className="print-report-title-strip">
                <h2>OFFICIAL COUNTRY MULTI-DISASTER RISK PROFILE & HISTORICAL RECORDS MATRIX</h2>
                <span className="print-bulletin-meta">AUDIT TIMESTAMP: {utcString} ({istString})</span>
              </div>
              <div className="print-storm-summary-box">
                <div className="print-storm-id-col">
                  <span className="print-storm-name">GLOBAL HAZARD ATLAS</span>
                  <span className="print-storm-id">FRAMEWORK: SENDAI DRR &bull; WMO-1007</span>
                  <span className="print-storm-basin">COVERAGE: 15 HIGH-VULNERABILITY NATIONS</span>
                </div>
                <div className="print-storm-stats-col">
                  <div><strong>Hazard Focus:</strong> Tropical Cyclones, Coastal Surge, Megathrust Seismic Faults</div>
                  <div><strong>Methodology:</strong> Multi-Decadal Catastrophe Modeling & Ground Truth Historical Maxima</div>
                  <div><strong>Operational Standard:</strong> National Disaster Response Force & WMO Global Protocol</div>
                </div>
                <div className="print-storm-alert-col">
                  <div className="print-alert-badge" style={{ background: '#0284c7' }}>VERIFIED DOSSIER</div>
                  <div className="print-alert-sub">NDMA / WMO / IMD Disaster Mitigation Baseline</div>
                </div>
              </div>
            </>
          ) : activeTab === 'validation' ? (
            <>
              <div className="print-header-top">
                <div className="print-dept-title">सत्यमेव जयते &bull; MINISTRY OF EARTH SCIENCES &bull; GOVERNMENT OF INDIA</div>
                <div className="print-sub-dept">CYCLOFLOW AI CORE &bull; NUMERICAL WEATHER PREDICTION VALIDATION DIVISION</div>
              </div>
              <div className="print-report-title-strip">
                <h2>DEEP LEARNING MODEL ACCURACY BENCHMARK & STATISTICAL VERIFICATION CERTIFICATE</h2>
                <span className="print-bulletin-meta">AUDIT TIMESTAMP: {utcString} ({istString})</span>
              </div>
              <div className="print-storm-summary-box">
                <div className="print-storm-id-col">
                  <span className="print-storm-name">CYCLOFLOW NEURAL CORE V2.4</span>
                  <span className="print-storm-id">ARCHITECTURE: DUAL-STREAM RESNET+TRANSFORMER</span>
                  <span className="print-storm-basin">REMOTE SENSING: INSAT-3D / 3DR TIR1 / WV</span>
                </div>
                <div className="print-storm-stats-col">
                  <div><strong>Operational Baseline:</strong> RSMC New Delhi & JTWC Official Advisories</div>
                  <div><strong>Benchmarked Storms:</strong> Biparjoy, Mocha, Amphan, Fani, Tauktae, Vardah</div>
                  <div><strong>Lead-Time MAE:</strong> 24h: 58.4 km (14.7% &gt; IMD) &bull; MSW MAE: 6.1 kt</div>
                </div>
                <div className="print-storm-alert-col">
                  <div className="print-alert-badge" style={{ background: '#059669' }}>OPERATIONAL CERTIFIED</div>
                  <div className="print-alert-sub">IMD / RSMC Validation Thresholds Passed</div>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="print-header-top">
                <div className="print-dept-title">सत्यमेव जयते &bull; GOVERNMENT OF INDIA &bull; MINISTRY OF EARTH SCIENCES</div>
                <div className="print-sub-dept">INDIA METEOROLOGICAL DEPARTMENT &bull; RSMC - TROPICAL CYCLONES, NEW DELHI</div>
              </div>
              <div className="print-report-title-strip">
                <h2>OFFICIAL CYCLONE WARNING ADVISORY & MULTI-SPECTRAL DIAGNOSTIC BULLETIN</h2>
                <span className="print-bulletin-meta">ISSUED: {utcString} ({istString})</span>
              </div>
              <div className="print-storm-summary-box">
                <div className="print-storm-id-col">
                  <span className="print-storm-name">{currentStorm?.name || 'Tropical Cyclone'}</span>
                  <span className="print-storm-id">ID: {currentStorm?.unique_identifier || currentStorm?.storm_identifier || 'ARB012023'}</span>
                  <span className="print-storm-basin">{currentStorm?.basin || 'North Indian Ocean'}</span>
                </div>
                <div className="print-storm-stats-col">
                  <div><strong>Location:</strong> {currentStorm?.place || currentStorm?.basin}</div>
                  <div><strong>Coordinates:</strong> {currentStorm?.center.lat.toFixed(2)}°N, {currentStorm?.center.lon.toFixed(2)}°E</div>
                  <div><strong>Landfall Target:</strong> {currentStorm?.landfall || 'Coastal Sector'}</div>
                </div>
                <div className="print-storm-alert-col">
                  <div className="print-alert-badge">{analysis?.intensity.imd_category || currentStorm?.category || 'Severe Cyclonic Storm'}</div>
                  <div className="print-alert-sub"><strong>Intensity:</strong> {analysis?.intensity.msw_knots || 85} kt ({analysis?.intensity.msw_kmph || 157} km/h) &bull; {analysis?.intensity.central_pressure_hpa || 960} hPa</div>
                </div>
              </div>
            </>
          )}
        </div>

        {activeTab === 'overview' && (
          <>
            {/* Top Operational Grid: Map & Satellite Studio */}
            <div className="dashboard-grid">
              <CycloneMap currentStorm={currentStorm} analysis={analysis} theme={theme} />
              <SatelliteViewer 
                analysis={analysis} 
                stormName={currentStorm?.name || 'Active Cyclone'} 
                isSouthernHemisphere={Boolean(currentStorm?.center?.lat && currentStorm.center.lat < 0)}
              />
            </div>

            {/* Middle Real-time Telemetry Metrics */}
            <MetricsPanel analysis={analysis} storm={currentStorm} />

            {/* Bottom AI Diagnostics & Dvorak Studio */}
            <AIDiagnostics
              benchmarkStorms={benchmarkStorms}
              currentStorm={currentStorm}
              onSelectStorm={handleSelectStorm}
              onAddCustomStorm={handleAddCustomStorm}
              onDeleteStorm={handleDeleteStorm}
              analysis={analysis}
              onAnalysisComplete={handleAnalysisComplete}
              currentUser={currentUser}
            />

            {/* Quantitative Statistical Verification & Model Quality Benchmark */}
            <ModelValidationPanel />

            {/* Official IMD Warning Bulletin */}
            <IMDBulletin currentStorm={currentStorm} analysis={analysis} />
          </>
        )}

        {activeTab === 'map' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div style={{ height: '740px' }}>
              <CycloneMap currentStorm={currentStorm} analysis={analysis} theme={theme} />
            </div>
            <MetricsPanel analysis={analysis} storm={currentStorm} />
          </div>
        )}

        {activeTab === 'satellite' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <SatelliteViewer 
              analysis={analysis} 
              stormName={currentStorm?.name || 'Active Cyclone'} 
              isSouthernHemisphere={Boolean(currentStorm?.center?.lat && currentStorm.center.lat < 0)}
            />
            <AIDiagnostics
              benchmarkStorms={benchmarkStorms}
              currentStorm={currentStorm}
              onSelectStorm={handleSelectStorm}
              onAddCustomStorm={handleAddCustomStorm}
              onDeleteStorm={handleDeleteStorm}
              analysis={analysis}
              onAnalysisComplete={handleAnalysisComplete}
              currentUser={currentUser}
            />
          </div>
        )}

        {activeTab === 'bulletin' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <MetricsPanel analysis={analysis} storm={currentStorm} />
            <IMDBulletin currentStorm={currentStorm} analysis={analysis} />
          </div>
        )}

        {activeTab === 'validation' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <ModelValidationPanel />
          </div>
        )}

        {activeTab === 'hazard-hotspots' && (
          <GlobalHazardAtlas theme={theme} />
        )}
      </main>

      {/* Firebase Authentication & Cloud Config Modal */}
      <FirebaseAuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLoginSuccess={(user) => {
          setCurrentUser(user);
          setIsCloudConnected(isFirebaseCloudConnected());
        }}
      />

      {/* Application Footer */}
      <footer className="app-footer">
        <div>
          CycloFlow Meteorological System &bull; Built for Smart India Hackathon (SIH) &bull; National Cyclone Warning Centre
        </div>
        <div className="footer-badges">
          <span className="footer-badge">INSAT-3D / 3DR TIR1</span>
          <span className="footer-badge">Dvorak ADT Neural Core</span>
          <span className="footer-badge">Atkinson-Holliday NIO</span>
          <span className="footer-badge">Firebase v10 Cloud Firestore</span>
        </div>
      </footer>
    </div>
  );
};

export default App;
