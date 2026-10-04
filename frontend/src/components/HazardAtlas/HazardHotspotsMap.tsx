import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import type { CountryHazardProfile, HighRiskPlace } from '../../types/hazards';
import { HAZARD_TYPE_META, RISK_LEVEL_META } from '../../data/hazardHotspotsData';
import { Satellite, Layers, Maximize2 } from 'lucide-react';

interface HazardHotspotsMapProps {
  selectedCountry: CountryHazardProfile;
  focusedPlace: HighRiskPlace | null;
  onSelectPlace: (place: HighRiskPlace) => void;
  theme?: 'light' | 'dark';
}

const ZOOM_EARTH_BASE_URL = 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}';
const ZOOM_EARTH_OVERLAY_URL = 'https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}';

export const HazardHotspotsMap: React.FC<HazardHotspotsMapProps> = ({
  selectedCountry,
  focusedPlace,
  onSelectPlace
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const layerGroupRef = useRef<L.LayerGroup | null>(null);
  const markersRef = useRef<Map<string, L.Marker>>(new Map());

  const [showHazardAuras, setShowHazardAuras] = useState<boolean>(true);

  // Initialize Map with Satellite Imagery
  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return;

    const map = L.map(mapContainerRef.current, {
      center: [selectedCountry.center.lat, selectedCountry.center.lon],
      zoom: selectedCountry.defaultZoom,
      minZoom: 2,
      maxZoom: 16,
      zoomControl: false,
      preferCanvas: true
    });

    // High-Resolution Satellite Base Layer
    L.tileLayer(ZOOM_EARTH_BASE_URL, {
      attribution: '&copy; Esri &mdash; Maxar, Earthstar Geographics &copy; IMD, NOAA & USGS Historical Archives',
      maxZoom: 18,
      keepBuffer: 8,
      crossOrigin: 'anonymous'
    }).addTo(map);

    // Reference Boundaries & Place Names Overlay
    L.tileLayer(ZOOM_EARTH_OVERLAY_URL, {
      maxZoom: 18,
      crossOrigin: 'anonymous',
      opacity: 0.85
    }).addTo(map);

    L.control.zoom({ position: 'bottomright' }).addTo(map);

    const layerGroup = L.layerGroup().addTo(map);
    layerGroupRef.current = layerGroup;
    mapInstanceRef.current = map;

    requestAnimationFrame(() => {
      map.invalidateSize();
    });

    const resizeObserver = new ResizeObserver(() => {
      map.invalidateSize();
    });
    if (mapContainerRef.current) {
      resizeObserver.observe(mapContainerRef.current);
    }

    return () => {
      resizeObserver.disconnect();
      map.remove();
      mapInstanceRef.current = null;
      layerGroupRef.current = null;
    };
  }, []);

  // Center/Fly to selected country when country changes
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    map.flyTo([selectedCountry.center.lat, selectedCountry.center.lon], selectedCountry.defaultZoom, {
      duration: 1.2,
      easeLinearity: 0.25
    });
  }, [selectedCountry]);

  // Render Top 3 Risk Places Markers and Highlight Auras
  useEffect(() => {
    const map = mapInstanceRef.current;
    const layerGroup = layerGroupRef.current;
    if (!map || !layerGroup) return;

    layerGroup.clearLayers();
    markersRef.current.clear();

    const places = selectedCountry.topRiskPlaces;

    places.forEach((place) => {
      const hazardMeta = HAZARD_TYPE_META[place.primaryHazard] || HAZARD_TYPE_META.cyclone;
      const riskMeta = RISK_LEVEL_META[place.riskLevel] || RISK_LEVEL_META.critical;

      // 1. Hazard Impact Zone Highlight Aura (Radius Circle on Country)
      if (showHazardAuras) {
        // Outer pulsing ring
        const outerCircle = L.circle([place.coordinates.lat, place.coordinates.lon], {
          radius: place.impactRadiusKm * 1000,
          color: riskMeta.borderColor,
          weight: 2,
          opacity: 0.85,
          dashArray: '6, 8',
          fillColor: riskMeta.color,
          fillOpacity: 0.12
        });

        // Inner core ground-zero circle
        const innerCircle = L.circle([place.coordinates.lat, place.coordinates.lon], {
          radius: (place.impactRadiusKm * 1000) * 0.45,
          color: riskMeta.borderColor,
          weight: 1.5,
          opacity: 0.95,
          fillColor: riskMeta.color,
          fillOpacity: 0.25
        });

        outerCircle.bindTooltip(
          `<b>${place.name}</b><br/><span style="color:${riskMeta.color}">#${place.rank} Risk Zone (${place.impactRadiusKm}km Radius)</span>`,
          { className: 'custom-map-tooltip', direction: 'top' }
        );

        layerGroup.addLayer(outerCircle);
        layerGroup.addLayer(innerCircle);
      }

      // 2. Custom Glowing Ranked Marker Pin
      const isFocused = focusedPlace?.id === place.id;
      const iconHtml = `
        <div class="hazard-ranked-pin-wrapper rank-${place.rank} ${isFocused ? 'active-focus' : ''}" style="--pin-color: ${riskMeta.color};">
          <div class="hazard-wave-pulse" style="border-color: ${riskMeta.color};"></div>
          <div class="hazard-pin-head" style="background: ${riskMeta.color}; box-shadow: 0 0 16px ${riskMeta.color};">
            <span class="pin-rank">#${place.rank}</span>
            <span class="pin-icon">${hazardMeta.icon}</span>
          </div>
          <div class="hazard-pin-tag">
            <span class="pin-name">${place.name.split('(')[0].trim()}</span>
            <span class="pin-score" style="background:${riskMeta.color}">${place.riskScore}</span>
          </div>
        </div>
      `;

      const customIcon = L.divIcon({
        html: iconHtml,
        className: 'hazard-leaflet-div-icon',
        iconSize: [120, 60],
        iconAnchor: [60, 48],
        popupAnchor: [0, -50]
      });

      const marker = L.marker([place.coordinates.lat, place.coordinates.lon], {
        icon: customIcon,
        zIndexOffset: 1000 - place.rank * 100
      });

      // Rich Informational Popup
      const popupHtml = `
        <div class="hazard-popup-card">
          <div class="hazard-popup-header" style="border-bottom: 2px solid ${riskMeta.color};">
            <div class="hazard-popup-badge" style="background: ${riskMeta.color}; color: #fff;">
              #${place.rank} • ${riskMeta.label}
            </div>
            <div class="hazard-popup-score">
              Risk Index: <strong>${place.riskScore}/100</strong>
            </div>
          </div>
          <div class="hazard-popup-body">
            <h4 class="hazard-popup-title">${place.name}</h4>
            <div class="hazard-popup-meta">
              <span><strong>Region:</strong> ${place.region}</span>
              <span><strong>Type:</strong> ${hazardMeta.icon} ${hazardMeta.label}</span>
            </div>
            <div class="hazard-popup-record">
              <span class="record-label">HISTORICAL MAX RECORD:</span>
              <p class="record-val">${place.recordPeakEvent}</p>
            </div>
            <div class="hazard-popup-factor">
              <span class="factor-label">WHY HIGHEST RISK:</span>
              <p class="factor-val">${place.whyHighestRisk.slice(0, 160)}...</p>
            </div>
            <div class="hazard-popup-disasters">
              <span class="disasters-label">BENCHMARK DISASTERS ON RECORD:</span>
              <ul class="disasters-list">
                ${place.keyDisasters.slice(0, 2).map(d => `
                  <li><strong>${d.eventName} (${d.year}):</strong> ${d.casualties} &bull; ${d.intensityOrMagnitude}</li>
                `).join('')}
              </ul>
            </div>
            <div class="hazard-popup-mitigation">
              <span class="mitigation-label">RECOMMENDED PROTOCOL:</span>
              <p class="mitigation-val">${place.recommendedMitigation}</p>
            </div>
          </div>
        </div>
      `;

      marker.bindPopup(popupHtml, {
        maxWidth: 360,
        className: 'custom-hazard-popup'
      });

      marker.on('click', () => {
        onSelectPlace(place);
      });

      layerGroup.addLayer(marker);
      markersRef.current.set(place.id, marker);
    });
  }, [selectedCountry, showHazardAuras, focusedPlace, onSelectPlace]);

  // Handle auto-focus from external card selection
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map || !focusedPlace) return;

    map.flyTo([focusedPlace.coordinates.lat, focusedPlace.coordinates.lon], 7.5, {
      duration: 1.0,
      easeLinearity: 0.3
    });

    const marker = markersRef.current.get(focusedPlace.id);
    if (marker) {
      setTimeout(() => {
        marker.openPopup();
      }, 700);
    }
  }, [focusedPlace]);

  const handleResetCountryView = () => {
    const map = mapInstanceRef.current;
    if (!map) return;
    map.flyTo([selectedCountry.center.lat, selectedCountry.center.lon], selectedCountry.defaultZoom, {
      duration: 1.0
    });
  };

  return (
    <div className="hazard-map-wrapper">
      {/* Map Control Toolbar */}
      <div className="hazard-map-toolbar">
        <div className="hazard-toolbar-title">
          <Satellite className="w-4 h-4 text-cyan-400" />
          <span style={{ color: '#38bdf8' }}>SATELLITE IMAGERY</span>
          <span style={{ opacity: 0.6 }}>&bull;</span>
          <span>
            {selectedCountry.flag} {selectedCountry.name} &bull; Top 3 Risk Hotspots
          </span>
        </div>

        <div className="hazard-toolbar-actions">
          <button
            className={`map-tool-btn ${showHazardAuras ? 'active' : ''}`}
            onClick={() => setShowHazardAuras(prev => !prev)}
            title="Toggle High-Risk Zone Impact Radius Highlight Rings"
            id="toggle-hazard-auras-btn"
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Hazard Radiuses</span>
          </button>

          <button
            className="map-tool-btn"
            onClick={handleResetCountryView}
            title="Re-center map to full country view"
            id="recenter-country-btn"
          >
            <Maximize2 className="w-3.5 h-3.5" />
            <span>Fit Country</span>
          </button>
        </div>
      </div>

      {/* Leaflet Map Div */}
      <div ref={mapContainerRef} className="hazard-leaflet-container" id="hazard-hotspots-leaflet-map" />

      {/* Interactive Map Legend */}
      <div className="hazard-map-legend">
        <div className="legend-header">
          <span className="legend-title">RISK HOTSPOT HIGHLIGHTS</span>
          <span className="legend-sub">TOP 3 RANKING</span>
        </div>
        <div className="legend-items">
          <div className="legend-item">
            <span className="legend-dot rank-1"></span>
            <span className="legend-label"><strong>#1 Critical Risk</strong> (Max Vulnerability)</span>
          </div>
          <div className="legend-item">
            <span className="legend-dot rank-2"></span>
            <span className="legend-label"><strong>#2 Extreme Risk</strong> (Severe Threat)</span>
          </div>
          <div className="legend-item">
            <span className="legend-dot rank-3"></span>
            <span className="legend-label"><strong>#3 Elevated Risk</strong> (High Threat)</span>
          </div>
        </div>
        <div className="legend-hazard-types">
          <span>🌀 Cyclone</span>
          <span>⚡ Earthquake</span>
          <span>🌊 Tsunami</span>
          <span>🌊 Surge</span>
        </div>
      </div>
    </div>
  );
};
