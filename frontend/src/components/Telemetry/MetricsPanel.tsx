import React from 'react';
import type { AIAnalysisResult, BenchmarkStorm } from '../../types/cyclone';
import { Wind, Gauge, AlertTriangle, Zap, Compass, MapPin } from 'lucide-react';

interface MetricsPanelProps {
  analysis: AIAnalysisResult | null;
  storm: BenchmarkStorm | null;
}

export const MetricsPanel: React.FC<MetricsPanelProps> = ({ analysis, storm }) => {
  const intensity = analysis?.intensity;

  // Compute progress percentages for gauge visuals
  const windKnots = intensity?.msw_knots || storm?.peak_msw_knots || 65;
  const windKmPh = intensity?.msw_kmph || Math.round(windKnots * 1.852);
  const gustKmPh = intensity?.gust_kmph || Math.round(windKmPh * 1.25);
  const windPercent = Math.min(100, (windKnots / 165) * 100);

  const pressureHpa = intensity?.central_pressure_hpa || storm?.central_pressure_hpa || 970;
  // Pressure scale: 1010 hPa down to 880 hPa
  const pressurePercent = Math.min(100, Math.max(0, ((1010 - pressureHpa) / (1010 - 880)) * 100));

  const tNumber = intensity?.dvorak_t_number || 5.0;
  const tPercent = (tNumber / 8.0) * 100;

  const imdCategory = intensity?.imd_category || storm?.category || "Severe Cyclonic Storm (SCS)";
  const warningLevel = intensity?.warning_level || "Severe Warning";
  const badgeColor = intensity?.badge_color || "#f97316";

  const riProb = intensity?.ri_probability ? Math.round(intensity.ri_probability * 100) : 45;
  const riStatus = intensity?.ri_status || "Moderate";

  // Forward motion
  const speed = storm?.forward_speed_kmph || (storm?.id === 'biparjoy-2023' ? 13 : (storm?.id === 'amphan-2020' ? 18 : 15));
  const heading = storm?.heading ?? (storm?.id === 'biparjoy-2023' ? 40 : (storm?.id === 'amphan-2020' ? 25 : 330));
  const landfallTarget = storm?.landfall || "Coastal Sector";

  // Compass Heading Direction String
  const getHeadingDirection = (deg: number): string => {
    const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
    const idx = Math.round(deg / 22.5) % 16;
    return directions[idx];
  };
  const headingDirection = getHeadingDirection(heading);

  // Compute dynamic landfall ETA window based on distance to coast and forward speed
  const computeLandfallEta = (): string => {
    if (!storm?.center) return "~ 18-24 HOURS";
    
    let targetLat = storm.landfall_coords?.lat;
    let targetLon = storm.landfall_coords?.lon;
    
    if (!targetLat || !targetLon) {
      if (storm.landfall.includes("Naliya") || storm.landfall.includes("Kutch")) {
        targetLat = 23.25; targetLon = 68.80;
      } else if (storm.landfall.includes("Bakkhali") || storm.landfall.includes("Sundarbans")) {
        targetLat = 21.55; targetLon = 88.25;
      } else if (storm.landfall.includes("Puri")) {
        targetLat = 19.81; targetLon = 85.83;
      } else if (storm.landfall.includes("Sittwe")) {
        targetLat = 20.15; targetLon = 92.90;
      } else if (storm.landfall.includes("Una") || storm.landfall.includes("Saurashtra")) {
        targetLat = 20.82; targetLon = 71.04;
      } else {
        targetLat = storm.center.lat + 2.5; targetLon = storm.center.lon + 1.2;
      }
    }

    const dLat = (targetLat - storm.center.lat) * 111.0;
    const avgLatRad = ((targetLat + storm.center.lat) / 2.0) * (Math.PI / 180);
    const dLon = (targetLon - storm.center.lon) * 111.0 * Math.cos(avgLatRad);
    const distanceKm = Math.sqrt(dLat * dLat + dLon * dLon);

    const etaHours = distanceKm / Math.max(8, speed);
    const etaMin = Math.max(4, Math.round(etaHours * 0.85));
    const etaMax = Math.max(6, Math.round(etaHours * 1.15));
    return `~ ${etaMin}-${etaMax} HOURS (${Math.round(distanceKm)} km)`;
  };

  const dynamicLandfallEta = computeLandfallEta();

  return (
    <div className="telemetry-panel-container" id="meteorological-telemetry-panel">
      {/* Top Banner: IMD Classification Banner */}
      <div 
        className="category-banner"
        style={{ borderLeftColor: badgeColor, background: `linear-gradient(90deg, ${badgeColor}18, var(--bg-card))` }}
      >
        <div className="category-text-block">
          <span className="category-eyebrow">IMD OPERATIONAL BASIN CLASSIFICATION</span>
          <h2 className="category-title" style={{ color: badgeColor }}>
            {imdCategory}
          </h2>
        </div>

        <div className="warning-pill-group">
          <span className="warning-pill" style={{ borderColor: badgeColor, color: badgeColor }}>
            <AlertTriangle className="w-3.5 h-3.5 inline mr-1" />
            {warningLevel}
          </span>
          <span className="station-pill">
            RSMC NEW DELHI
          </span>
        </div>
      </div>

      {/* Grid of Key Physical Metrics */}
      <div className="metrics-grid">
        {/* Metric 1: Maximum Sustained Wind */}
        <div className="metric-card" id="metric-wind-speed">
          <div className="metric-header">
            <span className="metric-label">MAX SUSTAINED WIND (MSW)</span>
            <Wind className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="metric-primary-val">
            <span className="val-number text-cyan-400">{windKnots}</span>
            <span className="val-unit">KTS</span>
          </div>
          <div className="metric-secondary-row">
            <span>{windKmPh} km/h</span>
            <span className="text-slate-400">&bull;</span>
            <span className="text-amber-400">Gusts: {gustKmPh} km/h</span>
          </div>
          <div className="metric-bar-track">
            <div 
              className="metric-bar-fill bg-cyan-400" 
              style={{ width: `${windPercent}%` }}
            />
          </div>
        </div>

        {/* Metric 2: Central Pressure */}
        <div className="metric-card" id="metric-central-pressure">
          <div className="metric-header">
            <span className="metric-label">ESTIMATED CENTRAL PRESSURE</span>
            <Gauge className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="metric-primary-val">
            <span className="val-number text-emerald-400">{pressureHpa}</span>
            <span className="val-unit">hPa</span>
          </div>
          <div className="metric-secondary-row">
            <span>Drop: -{(1010 - pressureHpa).toFixed(1)} hPa</span>
            <span className="text-slate-400">&bull;</span>
            <span className="text-slate-300">Atkinson-Holliday Calib.</span>
          </div>
          <div className="metric-bar-track">
            <div 
              className="metric-bar-fill bg-emerald-400" 
              style={{ width: `${pressurePercent}%` }}
            />
          </div>
        </div>

        {/* Metric 3: Dvorak T-Number */}
        <div className="metric-card" id="metric-dvorak-tnumber">
          <div className="metric-header">
            <span className="metric-label">DVORAK INTENSITY (T-NUMBER)</span>
            <Zap className="w-4 h-4 text-amber-400" />
          </div>
          <div className="metric-primary-val">
            <span className="val-number text-amber-400">T{tNumber.toFixed(1)}</span>
            <span className="val-unit">/ T8.0</span>
          </div>
          <div className="metric-secondary-row">
            <span>Current Intensity (CI): {intensity?.ci_number?.toFixed(1) || tNumber.toFixed(1)}</span>
            <span className="text-slate-400">&bull;</span>
            <span className="text-slate-300">ADT Neural</span>
          </div>
          <div className="metric-bar-track">
            <div 
              className="metric-bar-fill bg-amber-400" 
              style={{ width: `${tPercent}%` }}
            />
          </div>
        </div>

        {/* Metric 4: Rapid Intensification (RI) Probability */}
        <div className="metric-card" id="metric-rapid-intensification">
          <div className="metric-header">
            <span className="metric-label">RAPID INTENSIFICATION (24H)</span>
            <AlertTriangle className={`w-4 h-4 ${riProb > 60 ? 'text-rose-400' : 'text-amber-400'}`} />
          </div>
          <div className="metric-primary-val">
            <span className={`val-number ${riProb > 60 ? 'text-rose-400' : 'text-amber-400'}`}>
              {riProb}%
            </span>
            <span className="val-unit">RISK</span>
          </div>
          <div className="metric-secondary-row">
            <span className="font-semibold text-rose-300">{riStatus}</span>
            <span className="text-slate-400">&bull;</span>
            <span className="text-slate-300">&Delta;MSW &gt; 30kt/24h</span>
          </div>
          <div className="metric-bar-track">
            <div 
              className={`metric-bar-fill ${riProb > 60 ? 'bg-rose-500' : 'bg-amber-400'}`}
              style={{ width: `${riProb}%` }}
            />
          </div>
        </div>
      </div>

      {/* Trajectory & Landfall Summary Strip */}
      <div className="landfall-summary-strip">
        <div className="summary-item">
          <Compass className="w-4 h-4 text-cyan-400 inline mr-2" />
          <div>
            <div className="summary-label">MOVEMENT VECTOR</div>
            <div className="summary-value">{heading}° ({headingDirection}) @ {speed} km/h</div>
          </div>
        </div>

        <div className="summary-divider" />

        <div className="summary-item">
          <MapPin className="w-4 h-4 text-rose-400 inline mr-2" />
          <div>
            <div className="summary-label">PROJECTED LANDFALL TARGET</div>
            <div className="summary-value text-rose-300">{landfallTarget}</div>
          </div>
        </div>

        <div className="summary-divider" />

        <div className="summary-item">
          <div className="eta-badge">
            <span className="eta-label">LANDFALL WINDOW</span>
            <span className="eta-time">{dynamicLandfallEta}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
