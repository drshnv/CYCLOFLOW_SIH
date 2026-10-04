import React, { useState, useMemo } from 'react';
import type { CountryHazardProfile, HighRiskPlace, HazardType } from '../../types/hazards';
import { GLOBAL_HAZARD_PROFILES, HAZARD_TYPE_META, RISK_LEVEL_META } from '../../data/hazardHotspotsData';
import { HazardHotspotsMap } from './HazardHotspotsMap';
import { 
  Globe, 
  ShieldAlert, 
  MapPin, 
  Search, 
  Compass, 
  Activity, 
  BookOpen, 
  Printer, 
  Info,
  CheckCircle2,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

interface GlobalHazardAtlasProps {
  theme?: 'light' | 'dark';
}

export const GlobalHazardAtlas: React.FC<GlobalHazardAtlasProps> = ({ theme = 'light' }) => {
  const [selectedCountryId, setSelectedCountryId] = useState<string>('india');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedRegion, setSelectedRegion] = useState<string>('all');
  const [selectedHazardFilter, setSelectedHazardFilter] = useState<string>('all');
  const [focusedPlace, setFocusedPlace] = useState<HighRiskPlace | null>(null);
  const [viewMode, setViewMode] = useState<'spotlight' | 'table' | 'science'>('spotlight');
  const [expandedPlaceIds, setExpandedPlaceIds] = useState<Set<string>>(new Set());

  // Filter countries based on search and region/hazard filters
  const filteredCountries = useMemo(() => {
    return GLOBAL_HAZARD_PROFILES.filter((country) => {
      const matchesSearch = 
        country.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        country.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
        country.topRiskPlaces.some(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.region.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesRegion = selectedRegion === 'all' || country.basinRegion === selectedRegion;

      const matchesHazard = 
        selectedHazardFilter === 'all' || 
        country.topRiskPlaces.some(p => p.primaryHazard === selectedHazardFilter || p.hazardTypes.includes(selectedHazardFilter as HazardType));

      return matchesSearch && matchesRegion && matchesHazard;
    });
  }, [searchQuery, selectedRegion, selectedHazardFilter]);

  // Current active country
  const selectedCountry = useMemo(() => {
    return GLOBAL_HAZARD_PROFILES.find(c => c.id === selectedCountryId) || GLOBAL_HAZARD_PROFILES[0];
  }, [selectedCountryId]);

  const handleSelectCountry = (country: CountryHazardProfile) => {
    setSelectedCountryId(country.id);
    setFocusedPlace(null);
    setExpandedPlaceIds(new Set());
  };

  const handleFocusPlace = (place: HighRiskPlace) => {
    setFocusedPlace(place);
  };

  const toggleExpandPlace = (placeId: string) => {
    setExpandedPlaceIds(prev => {
      const next = new Set(prev);
      if (next.has(placeId)) {
        next.delete(placeId);
      } else {
        next.add(placeId);
      }
      return next;
    });
  };

  return (
    <div className="hazard-atlas-page">
      {/* Page Header Strip */}
      <section className="hazard-atlas-header">
        <div className="header-brand-block">
          <div className="hazard-globe-icon-badge">
            <Globe className="w-6 h-6 text-emerald-400 animate-spin-slow" />
          </div>
          <div>
            <div className="hazard-page-title-row">
              <h1 className="hazard-page-title">Global Hazard Hotspots Atlas</h1>
              <span className="hazard-title-badge">TOP 3 PLACES BY COUNTRY</span>
              <span className="hazard-title-subbadge">HISTORICAL RECORDS DATABASE</span>
            </div>
            <p className="hazard-page-tagline">
              Country-wise historical records of catastrophic tropical cyclones, megathrust earthquakes, and storm surges. 
              The <strong>Top 3 highest-risk places</strong> in each nation are marked and highlighted with verified meteorological archives.
            </p>
          </div>
        </div>

        {/* Global Key Figures */}
        <div className="hazard-stats-strip">
          <div className="stat-pill">
            <span className="stat-label">COUNTRIES PROFILED</span>
            <span className="stat-value">{GLOBAL_HAZARD_PROFILES.length} Nations</span>
          </div>
          <div className="stat-pill">
            <span className="stat-label">TOP RISK PLACES</span>
            <span className="stat-value">{GLOBAL_HAZARD_PROFILES.length * 3} Highlighted</span>
          </div>
          <div className="stat-pill">
            <span className="stat-label">ARCHIVE COVERAGE</span>
            <span className="stat-value">1899 – Present</span>
          </div>
          <div className="stat-pill">
            <span className="stat-label">SOURCE STANDARDS</span>
            <span className="stat-value" style={{ color: '#0284c7' }}>IMD &bull; NOAA &bull; USGS</span>
          </div>
        </div>
      </section>

      {/* Filter and Country Selector Bar */}
      <section className="hazard-controls-section">
        {/* Search & Filter Controls Row */}
        <div className="controls-row">
          {/* Search Input */}
          <div className="hazard-search-box">
            <Search className="w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search country, city, or hotspot (e.g., Odisha, Tokyo, Kutch, Florida)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="hazard-search-input"
              id="hazard-search-input"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="clear-search-btn"
                title="Clear search"
              >
                ✕
              </button>
            )}
          </div>

          {/* Region Filter Tabs */}
          <div className="region-filter-tabs">
            <span className="filter-group-label">Region:</span>
            {[
              { id: 'all', label: 'All Regions' },
              { id: 'South Asia', label: 'South Asia' },
              { id: 'East Asia', label: 'East Asia & Pacific' },
              { id: 'Americas', label: 'Americas' },
              { id: 'Oceania', label: 'Oceania' },
              { id: 'Europe & Mediterranean', label: 'Mediterranean' },
              { id: 'Africa', label: 'Africa' },
            ].map(reg => (
              <button
                key={reg.id}
                className={`filter-pill-btn ${selectedRegion === reg.id ? 'active' : ''}`}
                onClick={() => setSelectedRegion(reg.id)}
                id={`filter-reg-${reg.id.replace(/\s+/g, '-').toLowerCase()}`}
              >
                {reg.label}
              </button>
            ))}
          </div>

          {/* Hazard Class Filter */}
          <div className="hazard-class-filters">
            <span className="filter-group-label">Hazard:</span>
            {[
              { id: 'all', label: 'All Hazards', icon: '🌐' },
              { id: 'cyclone', label: 'Cyclones', icon: '🌀' },
              { id: 'earthquake', label: 'Earthquakes', icon: '⚡' },
              { id: 'tsunami', label: 'Tsunamis', icon: '🌊' },
            ].map(haz => (
              <button
                key={haz.id}
                className={`hazard-filter-btn ${selectedHazardFilter === haz.id ? 'active' : ''}`}
                onClick={() => setSelectedHazardFilter(haz.id)}
                id={`filter-haz-${haz.id}`}
              >
                <span>{haz.icon}</span>
                <span>{haz.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Quick Country Selector Scrollable Strip */}
        <div className="country-carousel-strip" role="tablist" aria-label="Country Selection">
          {filteredCountries.length === 0 ? (
            <div className="no-countries-found">
              <span>No countries match your current search/filter criteria.</span>
              <button 
                onClick={() => { setSearchQuery(''); setSelectedRegion('all'); setSelectedHazardFilter('all'); }}
                className="reset-filters-btn"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            filteredCountries.map(country => {
              const isSelected = country.id === selectedCountry.id;
              const topPlace = country.topRiskPlaces[0];
              const topHazard = HAZARD_TYPE_META[topPlace.primaryHazard];

              return (
                <button
                  key={country.id}
                  className={`country-pill-card ${isSelected ? 'active' : ''}`}
                  onClick={() => handleSelectCountry(country)}
                  id={`select-country-${country.id}`}
                  role="tab"
                  aria-selected={isSelected}
                >
                  <div className="country-pill-top">
                    <span className="country-flag">{country.flag}</span>
                    <strong className="country-name">{country.name}</strong>
                    <span className="country-code">{country.code}</span>
                  </div>
                  <div className="country-pill-bottom">
                    <span className="pill-top-place">
                      {topHazard.icon} {topPlace.name.split('(')[0]}
                    </span>
                  </div>
                </button>
              );
            })
          )}
        </div>
      </section>

      {/* Main View Mode Navigation (Spotlight Cards & Map vs Full Comparison Table vs Scientific Factors) */}
      <div className="atlas-view-tabs">
        <button
          className={`atlas-tab-btn ${viewMode === 'spotlight' ? 'active' : ''}`}
          onClick={() => setViewMode('spotlight')}
          id="atlas-tab-spotlight"
        >
          <Compass className="w-4 h-4" />
          <span>Interactive Map & Top 3 Spotlights ({selectedCountry.name})</span>
        </button>
        <button
          className={`atlas-tab-btn ${viewMode === 'table' ? 'active' : ''}`}
          onClick={() => setViewMode('table')}
          id="atlas-tab-table"
        >
          <Activity className="w-4 h-4" />
          <span>Full Historical Records Matrix</span>
        </button>
        <button
          className={`atlas-tab-btn ${viewMode === 'science' ? 'active' : ''}`}
          onClick={() => setViewMode('science')}
          id="atlas-tab-science"
        >
          <BookOpen className="w-4 h-4" />
          <span>Geological & Climatological Risk Drivers</span>
        </button>

        <button
          className="atlas-export-btn"
          onClick={() => window.print()}
          title="Print or Export Selected Country Hazard Dossier"
          id="export-hazard-dossier-btn"
        >
          <Printer className="w-4 h-4 text-cyan-400" />
          <span>Print Country Dossier</span>
        </button>
      </div>

      {/* VIEW MODE 1: Interactive Map + Top 3 Places Spotlight Cards */}
      {viewMode === 'spotlight' && (
        <div className="hazard-main-grid">
          {/* Left Column: Interactive Leaflet Map Highlighting Top 3 Places on the Country */}
          <div className="map-column">
            <div className="section-card-header">
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-rose-500" />
                <h3 className="section-title">
                  {selectedCountry.flag} {selectedCountry.name} Geospatial Risk Map
                </h3>
              </div>
              <div className="section-header-badges">
                <span className="source-tag">3 Highlighted Hotspots</span>
                <span className="source-tag-sub">{selectedCountry.basinRegion}</span>
              </div>
            </div>

            <HazardHotspotsMap
              selectedCountry={selectedCountry}
              focusedPlace={focusedPlace}
              onSelectPlace={handleFocusPlace}
              theme={theme}
            />

            {/* Country Context & Sources Footer */}
            <div className="country-context-card">
              <div className="context-header">
                <Info className="w-4 h-4 text-cyan-400" />
                <h4>Country Hazard Profile & Geological Exposure</h4>
              </div>
              <p className="context-text">{selectedCountry.countryOverview}</p>
              <div className="context-sources">
                <span className="source-label">Official Meteorological & Seismic Sources:</span>
                <div className="source-pills">
                  {selectedCountry.officialDataSources.map((source, idx) => (
                    <span key={idx} className="source-item-pill">
                      <CheckCircle2 className="w-3 h-3 text-emerald-400 inline mr-1" />
                      {source}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Top 3 Highest Risk Places Detail Cards */}
          <div className="hotspots-list-column">
            <div className="section-card-header">
              <div>
                <h3 className="section-title">
                  Top 3 Highest-Risk Places &bull; {selectedCountry.name}
                </h3>
                <p className="section-subtitle">
                  Key tropical cyclone and earthquake hazard zones based on verified historical records.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  className="expand-all-pill-btn"
                  onClick={() => {
                    if (expandedPlaceIds.size === selectedCountry.topRiskPlaces.length) {
                      setExpandedPlaceIds(new Set());
                    } else {
                      setExpandedPlaceIds(new Set(selectedCountry.topRiskPlaces.map(p => p.id)));
                    }
                  }}
                  id="toggle-expand-all-btn"
                >
                  {expandedPlaceIds.size === selectedCountry.topRiskPlaces.length ? 'Collapse All' : 'Expand All'}
                </button>
                <span className="rank-count-badge">TOP 3</span>
              </div>
            </div>

            <div className="places-cards-container">
              {selectedCountry.topRiskPlaces.map((place) => {
                const riskMeta = RISK_LEVEL_META[place.riskLevel] || RISK_LEVEL_META.critical;
                const isFocused = focusedPlace?.id === place.id;
                const isExpanded = expandedPlaceIds.has(place.id);

                // Specific hazard label clarifying whether it's cyclone, earthquake, or compound
                const hazardCategoryLabel = 
                  place.primaryHazard === 'cyclone' ? '🌀 Cyclone & Surge Hazard' :
                  place.primaryHazard === 'earthquake' ? '⚡ Earthquake Fault Zone' :
                  place.primaryHazard === 'tsunami' ? '🌊 Tsunami & Seismicity' :
                  place.primaryHazard === 'surge' ? '🌊 Storm Surge Inundation' :
                  '⚠️ Cyclone & Earthquake Risk';

                return (
                  <div
                    key={place.id}
                    className={`hazard-place-card rank-${place.rank} ${isFocused ? 'card-focused' : ''} ${isExpanded ? 'card-expanded' : 'card-compact'}`}
                    id={`hazard-card-${place.id}`}
                    style={{ '--card-accent': riskMeta.color } as React.CSSProperties}
                  >
                    {/* Card Top Banner with Rank and Risk Score */}
                    <div className="place-card-top" style={{ borderLeftColor: riskMeta.color }}>
                      <div className="rank-badge-pill" style={{ background: riskMeta.color }}>
                        #{place.rank}
                      </div>
                      <div className="hazard-type-pill">
                        <span>{hazardCategoryLabel}</span>
                      </div>
                      <div className="risk-score-display">
                        <span className="score-label">RISK:</span>
                        <strong className="score-num" style={{ color: riskMeta.color }}>{place.riskScore}</strong>
                        <span className="score-max">/100</span>
                      </div>
                    </div>

                    {/* Place Name and Location */}
                    <div className="place-card-title-section">
                      <h4 className="place-name">{place.name}</h4>
                      <div className="place-meta-line">
                        <span className="place-region">
                          <MapPin className="w-3.5 h-3.5 inline mr-1 text-slate-400" />
                          {place.region}
                        </span>
                        <span className="place-coords">
                          {place.coordinates.lat.toFixed(2)}°N, {place.coordinates.lon.toFixed(2)}°E &bull; {place.impactRadiusKm} km Risk Aura
                        </span>
                      </div>
                    </div>

                    {/* Historical Peak Record Callout (Compact) */}
                    <div className="historical-peak-box compact-peak" style={{ background: riskMeta.bgColor, borderColor: riskMeta.borderColor }}>
                      <div className="peak-box-label">
                        <ShieldAlert className="w-3.5 h-3.5 inline mr-1" style={{ color: riskMeta.color }} />
                        HISTORICAL RECORD:
                      </div>
                      <div className="peak-box-val">{place.recordPeakEvent}</div>
                    </div>

                    {/* Action Buttons Bar: Highlight on Map & View More Toggle */}
                    <div className="place-card-actions-bar">
                      <button
                        className="locate-map-btn"
                        onClick={() => handleFocusPlace(place)}
                        title="Highlight and Zoom to this location on the satellite map"
                        id={`locate-place-${place.id}`}
                      >
                        <MapPin className="w-3.5 h-3.5" />
                        <span>Highlight on Map</span>
                      </button>

                      <button
                        className={`view-more-toggle-btn ${isExpanded ? 'active' : ''}`}
                        onClick={() => toggleExpandPlace(place.id)}
                        id={`toggle-expand-${place.id}`}
                        title={isExpanded ? 'Collapse details' : 'View more historical details'}
                      >
                        <span>{isExpanded ? 'View Less' : 'View More'}</span>
                        {isExpanded ? (
                          <ChevronUp className="w-4 h-4 ml-1" />
                        ) : (
                          <ChevronDown className="w-4 h-4 ml-1" />
                        )}
                      </button>
                    </div>

                    {/* Collapsible Expanded Details */}
                    {isExpanded && (
                      <div className="place-expanded-content">
                        {/* Why Highest Risk Analysis */}
                        <div className="place-why-section">
                          <div className="field-title">WHY THIS PLACE HAS HIGHEST RISK:</div>
                          <p className="field-description">{place.whyHighestRisk}</p>
                        </div>

                        {/* Key Historical Disasters on Record */}
                        <div className="place-disasters-section">
                          <div className="field-title">
                            <Activity className="w-3.5 h-3.5 inline mr-1 text-amber-500" />
                            KEY HISTORICAL DISASTERS ON RECORD:
                          </div>
                          <div className="disasters-timeline">
                            {place.keyDisasters.map((disaster, dIdx) => (
                              <div key={dIdx} className="disaster-timeline-item">
                                <div className="disaster-year-badge">{disaster.year}</div>
                                <div className="disaster-details">
                                  <strong className="disaster-name">{disaster.eventName}</strong>
                                  <div className="disaster-impact-row">
                                    <span className="disaster-stat">
                                      <strong>Intensity:</strong> {disaster.intensityOrMagnitude}
                                    </span>
                                    <span className="disaster-stat">
                                      <strong>Casualties:</strong> {disaster.casualties}
                                    </span>
                                    <span className="disaster-stat">
                                      <strong>Loss:</strong> {disaster.economicLoss}
                                    </span>
                                  </div>
                                  <p className="disaster-summary">{disaster.summary}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Geological Driver & Exposed Population */}
                        <div className="place-geo-factors">
                          <div className="geo-item">
                            <span className="geo-label">Geological / Climatic Driver:</span>
                            <span className="geo-val">{place.geologicalOrClimaticFactor}</span>
                          </div>
                          <div className="geo-item">
                            <span className="geo-label">Population Exposed:</span>
                            <span className="geo-val">{place.populationExposed}</span>
                          </div>
                        </div>

                        {/* Mitigation Protocol */}
                        <div className="mitigation-box">
                          <strong>Civil Defense Mitigation:</strong> {place.recommendedMitigation}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* VIEW MODE 2: Full Historical Records Matrix Table */}
      {viewMode === 'table' && (
        <div className="hazard-table-section">
          <div className="section-card-header">
            <div>
              <h3 className="section-title">
                Comprehensive Multi-Country Historical Hazard Matrix
              </h3>
              <p className="section-subtitle">
                Cross-comparison of all profiled countries and their Top 3 ranked risk hotspots.
              </p>
            </div>
            <div className="table-filter-stat">
              Showing {filteredCountries.length * 3} profiled locations across {filteredCountries.length} countries
            </div>
          </div>

          <div className="hazard-table-container">
            <table className="hazard-matrix-table" id="hazard-records-matrix-table">
              <thead>
                <tr>
                  <th>Country</th>
                  <th>#</th>
                  <th>High-Risk Place & Region</th>
                  <th>Primary Hazard</th>
                  <th>Risk Score</th>
                  <th>All-Time Historical Peak Record</th>
                  <th>Benchmark Disaster Event</th>
                  <th>Fatalities on Record</th>
                  <th>Exposed Population</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredCountries.map(country => (
                  country.topRiskPlaces.map((place) => {
                    const hazardMeta = HAZARD_TYPE_META[place.primaryHazard] || HAZARD_TYPE_META.cyclone;
                    const riskMeta = RISK_LEVEL_META[place.riskLevel] || RISK_LEVEL_META.critical;
                    const primaryDisaster = place.keyDisasters[0];

                    return (
                      <tr key={place.id} className={`table-row-rank-${place.rank}`}>
                        <td>
                          <span className="country-cell">
                            <span className="text-lg">{country.flag}</span>
                            <strong>{country.name}</strong>
                          </span>
                        </td>
                        <td>
                          <span className={`table-rank-badge rank-${place.rank}`}>
                            #{place.rank}
                          </span>
                        </td>
                        <td>
                          <strong>{place.name}</strong>
                          <div className="text-xs text-muted">{place.region} ({place.coordinates.lat.toFixed(1)}°N, {place.coordinates.lon.toFixed(1)}°E)</div>
                        </td>
                        <td>
                          <span className="table-hazard-tag">
                            {hazardMeta.icon} {hazardMeta.label.split('&')[0]}
                          </span>
                        </td>
                        <td>
                          <div className="table-score-bar-wrapper">
                            <div className="table-score-bar" style={{ width: `${place.riskScore}%`, background: riskMeta.color }}></div>
                            <span className="table-score-text" style={{ color: riskMeta.color }}>{place.riskScore}/100</span>
                          </div>
                        </td>
                        <td className="table-record-text">
                          {place.recordPeakEvent}
                        </td>
                        <td>
                          <strong>{primaryDisaster?.eventName} ({primaryDisaster?.year})</strong>
                          <div className="text-xs text-muted">{primaryDisaster?.intensityOrMagnitude}</div>
                        </td>
                        <td>
                          <span className="table-casualties-badge">{primaryDisaster?.casualties}</span>
                        </td>
                        <td className="text-xs">
                          {place.populationExposed}
                        </td>
                        <td>
                          <button
                            className="table-action-btn"
                            onClick={() => {
                              setSelectedCountryId(country.id);
                              setViewMode('spotlight');
                              setTimeout(() => setFocusedPlace(place), 200);
                            }}
                            title="Open in Interactive Map"
                          >
                            Map ➔
                          </button>
                        </td>
                      </tr>
                    );
                  })
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* VIEW MODE 3: Climatological & Geological Drivers Dossier */}
      {viewMode === 'science' && (
        <div className="hazard-science-section">
          <div className="section-card-header">
            <div>
              <h3 className="section-title">Scientific Drivers of Extreme Hazard Vulnerability</h3>
              <p className="section-subtitle">
                Why specific regions repeatedly suffer catastrophic cyclone surges, megathrust earthquakes, and coastal inundation.
              </p>
            </div>
          </div>

          <div className="science-cards-grid">
            <div className="science-card">
              <div className="science-icon-box" style={{ background: 'rgba(2, 132, 199, 0.15)', color: '#0284c7' }}>
                🌀
              </div>
              <h4 className="science-card-title">1. Concave Bathymetry & Coastal Funneling</h4>
              <p className="science-card-text">
                The northern Bay of Bengal (Odisha, West Bengal, Bangladesh) and the northern Gulf of Mexico feature shallow continental shelves (&lt;30m depth extending tens of kilometers offshore) bounded by converging coastlines. 
                As cyclonic winds push ocean water toward the apex of the funnel, the surge cannot dissipate horizontally and is forced vertically, creating towering 6 to 10-meter storm surges that submerge low-lying delta systems.
              </p>
              <div className="science-examples">
                <strong>Benchmark Examples:</strong> 1970 Bhola Cyclone (10m surge, 300,000+ deaths), 1999 Odisha Super Cyclone (9.5m surge, Ersama), Hurricane Katrina (28-ft surge, Gulf Coast).
              </div>
            </div>

            <div className="science-card">
              <div className="science-icon-box" style={{ background: 'rgba(225, 29, 72, 0.15)', color: '#e11d48' }}>
                ⚡
              </div>
              <h4 className="science-card-title">2. Megathrust Subduction Fault Friction</h4>
              <p className="science-card-text">
                Where dense oceanic plates plunge beneath continental lithosphere (the Sunda Megathrust in Indonesia, the Japan Trench off Tohoku, the Peru-Chile Trench, and the Cascadia/Middle America trenches), plates lock along asperities over centuries. 
                When these locked zones suddenly rupture, tens of meters of horizontal and vertical slip displace billions of cubic meters of seawater in minutes, generating trans-oceanic tsunamis traveling at the speed of commercial jetliners (800 km/h).
              </p>
              <div className="science-examples">
                <strong>Benchmark Examples:</strong> 1960 Valdivia M9.5 (Chile), 2004 Indian Ocean M9.1 (Aceh), 2011 Tohoku M9.1 (Sanriku 40m tsunami).
              </div>
            </div>

            <div className="science-card">
              <div className="science-icon-box" style={{ background: 'rgba(245, 158, 11, 0.15)', color: '#f59e0b' }}>
                🌡️
              </div>
              <h4 className="science-card-title">3. Oceanic Heat Content & Rapid Intensification</h4>
              <p className="science-card-text">
                Tropical cyclones undergo explosive Rapid Intensification (RI) &mdash; defined as wind speed increases &gt;30 knots in 24 hours &mdash; when passing over deep warm oceanic reservoirs with Sea Surface Temperatures (SST) &gt;29.5&deg;C and high Tropical Cyclone Heat Potential (TCHP).
                Warm eddy filaments in the Western Pacific Warm Pool, the Mozambique Channel, and the Gulf of Mexico Loop Current eliminate the normal upwelling of cold water, enabling storms to intensify from Category 1 to Category 5 in under 12 hours with minimal evacuation warning.
              </p>
              <div className="science-examples">
                <strong>Benchmark Examples:</strong> 2023 Hurricane Otis (Acapulco, 50kt to 145kt in 12h), 2013 Super Typhoon Haiyan (Philippines, 315 km/h), 2016 Cyclone Winston (Fiji).
              </div>
            </div>

            <div className="science-card">
              <div className="science-icon-box" style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#10b981' }}>
                🌱
              </div>
              <h4 className="science-card-title">4. Deltaic Subsidence & Loss of Mangrove Bio-Shields</h4>
              <p className="science-card-text">
                Dense human settlements on river deltas (Sundarbans, Mekong, Irrawaddy, Mississippi) accelerate natural land subsidence through massive groundwater extraction, reduced sediment replenishment from upstream dams, and clearance of mangrove wetlands for commercial aquaculture.
                Healthy dense mangrove forests (Rhizophora and Avicennia) reduce incoming cyclonic wave energy by up to 66% within the first 100 meters of forest. Their removal strips the frontline natural defense against inundation.
              </p>
              <div className="science-examples">
                <strong>Benchmark Examples:</strong> Sundarbans Mangrove buffer in Cyclone Amphan (2020), Mekong Delta saline intrusion (2020), New Orleans coastal marsh loss.
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GlobalHazardAtlas;
