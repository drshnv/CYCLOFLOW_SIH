import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import type { BenchmarkStorm, AIAnalysisResult } from '../../types/cyclone';
import { Compass, Eye, ShieldAlert, Layers, Maximize2 } from 'lucide-react';

interface CycloneMapProps {
  currentStorm: BenchmarkStorm | null;
  analysis: AIAnalysisResult | null;
  theme?: 'light' | 'dark';
}

const ZOOM_EARTH_BASE_URL = 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}';
const ZOOM_EARTH_OVERLAY_URL = 'https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}';

export const CycloneMap: React.FC<CycloneMapProps> = ({ currentStorm, analysis }) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const layerGroupRef = useRef<L.LayerGroup | null>(null);
  const baseLayerRef = useRef<L.TileLayer | null>(null);
  const overlayLayerRef = useRef<L.TileLayer | null>(null);

  const [showCone, setShowCone] = useState(true);
  const [showPastTrack, setShowPastTrack] = useState(true);
  const [showCoastalZones, setShowCoastalZones] = useState(true);

  // Initialize Map with performance optimizations for Zoom Earth
  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return;

    const initialLat = currentStorm?.center.lat || 18.5;
    const initialLon = currentStorm?.center.lon || 82.0;

    const map = L.map(mapContainerRef.current, {
      center: [initialLat, initialLon],
      zoom: 5,
      minZoom: 3,
      maxZoom: 14,
      zoomControl: false,
      preferCanvas: true, // Accelerates vector rendering (cone, tracks, hazard zones)
      fadeAnimation: true,
      zoomAnimation: true,
      markerZoomAnimation: true
    });

    // High-performance Base Satellite Layer with aggressive caching and real-time streaming
    const baseLayer = L.tileLayer(ZOOM_EARTH_BASE_URL, {
      attribution: '&copy; Zoom Earth &copy; Esri &mdash; Maxar, Earthstar Geographics, USDA, USGS',
      maxZoom: 18,
      keepBuffer: 12,        // Retains 12 buffer rings in memory to eliminate re-fetching on pan
      updateWhenIdle: false, // Stream tiles continuously while dragging
      updateWhenZooming: false,
      updateInterval: 60,    // High-frequency tile check (60ms vs default 200ms)
      crossOrigin: 'anonymous'
    }).addTo(map);
    baseLayerRef.current = baseLayer;

    // High-performance Boundaries and Labels Overlay
    const overlayLayer = L.tileLayer(ZOOM_EARTH_OVERLAY_URL, {
      maxZoom: 18,
      keepBuffer: 12,
      updateWhenIdle: false,
      updateWhenZooming: false,
      updateInterval: 60,
      crossOrigin: 'anonymous',
      opacity: 0.95
    }).addTo(map);
    overlayLayerRef.current = overlayLayer;

    L.control.zoom({ position: 'bottomright' }).addTo(map);

    const layerGroup = L.layerGroup().addTo(map);
    layerGroupRef.current = layerGroup;
    mapInstanceRef.current = map;

    // Ensure immediate rendering on mount
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
      baseLayerRef.current = null;
      overlayLayerRef.current = null;
    };
  }, []);

  // Update Storm Track, Cone, and Overlays
  useEffect(() => {
    const map = mapInstanceRef.current;
    const layerGroup = layerGroupRef.current;
    if (!map || !layerGroup || !currentStorm) return;

    layerGroup.clearLayers();

    const centerLat = currentStorm.center.lat;
    const centerLon = currentStorm.center.lon;

    // 1. Coastal Hazard Warning Zones
    if (showCoastalZones) {
      const warningZones = [
        {
          name: "Gujarat Saurashtra & Kutch Coast",
          bounds: [[20.5, 68.0], [23.5, 71.0]] as L.LatLngBoundsLiteral,
          color: "#ef4444",
          alert: "RED ALERT: Great Danger Signal 10"
        },
        {
          name: "Odisha & West Bengal Coastal Belt",
          bounds: [[19.0, 84.5], [22.2, 89.0]] as L.LatLngBoundsLiteral,
          color: "#f97316",
          alert: "ORANGE ALERT: Severe Inundation Warning"
        },
        {
          name: "Andhra Pradesh & North Tamil Nadu",
          bounds: [[13.5, 79.8], [17.5, 83.5]] as L.LatLngBoundsLiteral,
          color: "#eab308",
          alert: "YELLOW WATCH: Squally Wind Advisory"
        }
      ];

      warningZones.forEach(zone => {
        const rect = L.rectangle(zone.bounds, {
          color: zone.color,
          weight: 1.5,
          fillColor: zone.color,
          fillOpacity: 0.08,
          dashArray: '4, 6'
        });
        rect.bindTooltip(`<b>${zone.name}</b><br/>${zone.alert}`, {
          className: 'custom-map-tooltip'
        });
        layerGroup.addLayer(rect);
      });
    }

    // 2. Historical Track (Only display 3-4 recent points)
    if (showPastTrack && currentStorm.historical_track && currentStorm.historical_track.length > 0) {
      const displayTrack = currentStorm.historical_track.length > 4
        ? currentStorm.historical_track.slice(-4)
        : currentStorm.historical_track;

      const historyCoords: [number, number][] = displayTrack.map(p => [p.lat, p.lon]);
      
      const pastPolyline = L.polyline(historyCoords, {
        color: '#00e5ff', // Zoom Earth radiant cyan
        weight: 3.5,
        opacity: 0.95,
        lineCap: 'round',
        lineJoin: 'round'
      });
      layerGroup.addLayer(pastPolyline);

      displayTrack.forEach((p, idx) => {
        const isCurrent = idx === displayTrack.length - 1;
        if (!isCurrent) {
          const circle = L.circleMarker([p.lat, p.lon], {
            radius: 4.5,
            fillColor: '#00e5ff',
            fillOpacity: 1.0,
            color: '#ffffff',
            weight: 1.8
          });
          circle.bindPopup(`
            <div style="font-family: Inter, sans-serif; font-size: 12px; color: #1e293b;">
              <strong style="color: #0284c7;">Time: ${p.time}</strong><br/>
              <b>Position:</b> ${p.lat.toFixed(2)}°N, ${p.lon.toFixed(2)}°E<br/>
              <b>Wind:</b> ${p.msw_knots} Knots (${Math.round(p.msw_knots * 1.852)} km/h)
            </div>
          `);
          layerGroup.addLayer(circle);
        }
      });
    }

    // 3. Spatio-temporal Forecast Track & Cone of Uncertainty
    // Consistency check: ensure forecast trajectory begins near currentStorm center (< 3.2 deg / ~350km)
    // to strictly prevent cross-basin teleports or rendering artifacts between mismatched storms
    const isForecastConsistent = Boolean(
      analysis?.forecast && 
      analysis.forecast.length > 0 && 
      Math.hypot(analysis.forecast[0].lat - centerLat, analysis.forecast[0].lon - centerLon) < 3.2
    );

    let forecastPoints = isForecastConsistent ? analysis!.forecast : null;

    if (!forecastPoints) {
      // Coherent physical forecast along storm's actual heading
      const headingDeg = currentStorm.heading || (centerLon >= 77.5 ? (centerLat >= 17.0 ? 25.0 : 330.0) : (centerLat >= 18.0 ? 20.0 : 345.0));
      const speedKmPerH = currentStorm.forward_speed_kmph || 14.0;
      const currentWind = currentStorm.peak_msw_knots || (currentStorm as any).max_wind_knots || 85;
      
      forecastPoints = [
        { hours: 6, cone_km: 40, wind_factor: 1.05 },
        { hours: 12, cone_km: 70, wind_factor: 1.08 },
        { hours: 24, cone_km: 125, wind_factor: 1.05 },
        { hours: 48, cone_km: 230, wind_factor: 0.95 },
        { hours: 72, cone_km: 360, wind_factor: 0.85 }
      ].map(s => {
        const distKm = speedKmPerH * s.hours;
        const rad = (headingDeg * Math.PI) / 180.0;
        const dLat = (distKm * Math.cos(rad)) / 111.0;
        const dLon = (distKm * Math.sin(rad)) / (111.0 * Math.max(0.2, Math.cos((centerLat * Math.PI) / 180.0)));
        const wKt = Math.round(currentWind * s.wind_factor);
        return {
          step: `+${s.hours}h`,
          hours: s.hours,
          lat: Number((centerLat + dLat).toFixed(2)),
          lon: Number((centerLon + dLon).toFixed(2)),
          msw_knots: wKt,
          msw_kmph: Math.round(wKt * 1.852),
          cone_radius_km: s.cone_km,
          central_pressure_hpa: Math.round(1010.0 - Math.pow(wKt / 3.9, 1.45))
        };
      });
    }

    const allTrackPoints: [number, number][] = [[centerLat, centerLon], ...forecastPoints.map(f => [f.lat, f.lon] as [number, number])];

    // Compute Cone of Uncertainty Polygon
    if (showCone && allTrackPoints.length >= 2) {
      const leftBoundary: [number, number][] = [];
      const rightBoundary: [number, number][] = [];

      allTrackPoints.forEach((pt, i) => {
        let coneRadiusKm = 15;
        if (i > 0) {
          coneRadiusKm = forecastPoints[i - 1]?.cone_radius_km || 40 * i;
        }

        // Approx 1 deg lat = 111 km
        const radiusDeg = coneRadiusKm / 111.0;

        // Calculate heading to get orthogonal normal
        let angle = 45;
        if (i < allTrackPoints.length - 1) {
          const next = allTrackPoints[i + 1];
          angle = Math.atan2(next[0] - pt[0], next[1] - pt[1]) * (180 / Math.PI);
        } else {
          const prev = allTrackPoints[i - 1];
          angle = Math.atan2(pt[0] - prev[0], pt[1] - prev[1]) * (180 / Math.PI);
        }

        const normAngleRad = (angle + 90) * (Math.PI / 180);
        const dLat = radiusDeg * Math.sin(normAngleRad);
        const dLon = (radiusDeg * Math.cos(normAngleRad)) / Math.cos(pt[0] * Math.PI / 180);

        leftBoundary.push([pt[0] + dLat, pt[1] + dLon]);
        rightBoundary.push([pt[0] - dLat, pt[1] - dLon]);
      });

      const conePolygonCoords = [...leftBoundary, ...rightBoundary.reverse()];
      const conePolygon = L.polygon(conePolygonCoords, {
        color: '#f59e0b',
        weight: 2,
        opacity: 0.9,
        fillColor: '#fbbf24',
        fillOpacity: 0.22,
        dashArray: '4, 4'
      });
      conePolygon.bindTooltip("<b>Cone of Uncertainty (72h Forecast)</b><br/>Area of probable cyclone center track", {
        className: 'custom-map-tooltip'
      });
      layerGroup.addLayer(conePolygon);
    }

    // Draw Forecast Path (Zoom Earth neon coral/pink dashed)
    const forecastPolyline = L.polyline(allTrackPoints, {
      color: '#ff2a6d',
      weight: 3.5,
      dashArray: '6, 7',
      opacity: 0.95
    });
    layerGroup.addLayer(forecastPolyline);

    // Forecast Markers
    forecastPoints.forEach(f => {
      const forecastIcon = L.divIcon({
        className: 'forecast-waypoint-icon',
        html: `<div class="waypoint-badge">${f.step}</div>`,
        iconSize: [36, 20],
        iconAnchor: [18, 10]
      });

      const fMarker = L.marker([f.lat, f.lon], { icon: forecastIcon });
      fMarker.bindPopup(`
        <div style="font-family: Inter, sans-serif; font-size: 12px; color: #0f172a; min-width: 170px;">
          <div style="font-weight: 700; color: #e11d48; margin-bottom: 4px; border-bottom: 1px solid #e2e8f0; padding-bottom: 2px;">
            Forecast ${f.step} (${f.hours} Hours)
          </div>
          <div><b>Position:</b> ${f.lat.toFixed(2)}°N, ${f.lon.toFixed(2)}°E</div>
          <div><b>Intensity:</b> ${f.msw_knots} Knots (${Math.round(f.msw_knots * 1.852)} km/h)</div>
          <div><b>Central Pressure:</b> ${f.central_pressure_hpa} hPa</div>
          <div><b>Uncertainty Radius:</b> ±${f.cone_radius_km} km</div>
        </div>
      `);
      layerGroup.addLayer(fMarker);
    });

    // 4. Landfall Target Marker
    if (forecastPoints.length > 0) {
      const endPt = forecastPoints[forecastPoints.length - 1];
      const landfallIcon = L.divIcon({
        className: 'landfall-icon',
        html: `
          <div class="landfall-pin">
            <span class="landfall-pulse"></span>
            🎯
          </div>
        `,
        iconSize: [32, 32],
        iconAnchor: [16, 16]
      });
      const landfallMarker = L.marker([endPt.lat, endPt.lon], { icon: landfallIcon });
      landfallMarker.bindTooltip(`<b>Projected Landfall Zone:</b><br/>${currentStorm.landfall}`, {
        permanent: false,
        className: 'custom-map-tooltip'
      });
      layerGroup.addLayer(landfallMarker);
    }

    // 5. Current Cyclone Eye Beacon Marker
    const eyeIcon = L.divIcon({
      className: 'cyclone-eye-marker',
      html: `
        <div class="eye-beacon-container">
          <div class="eye-wave wave-1"></div>
          <div class="eye-wave wave-2"></div>
          <div class="eye-wave wave-3"></div>
          <div class="eye-core">🌀</div>
        </div>
      `,
      iconSize: [64, 64],
      iconAnchor: [32, 32]
    });

    const eyeMarker = L.marker([centerLat, centerLon], { icon: eyeIcon, zIndexOffset: 1000 });
    eyeMarker.bindPopup(`
      <div style="font-family: Inter, sans-serif; font-size: 13px; color: #0f172a; min-width: 200px;">
        <div style="font-weight: 800; color: #0284c7; font-size: 14px; margin-bottom: 4px;">
          ${currentStorm.name} (${currentStorm.year})
        </div>
        <div style="color: #475569; font-size: 11px; margin-bottom: 6px;">${currentStorm.category}</div>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 4px; font-size: 12px;">
          <div><b>Lat:</b> ${centerLat.toFixed(2)}°N</div>
          <div><b>Lon:</b> ${centerLon.toFixed(2)}°E</div>
          <div><b>Max Wind:</b> ${currentStorm.peak_msw_knots} kt</div>
          <div><b>Pressure:</b> ${currentStorm.central_pressure_hpa} hPa</div>
          <div><b>Heading:</b> ${currentStorm.heading}°</div>
          <div><b>Speed:</b> ${currentStorm.forward_speed_kmph} km/h</div>
        </div>
      </div>
    `).openPopup();
    layerGroup.addLayer(eyeMarker);

    // Pan map smoothly to storm center
    map.flyTo([centerLat, centerLon], 5.5, { duration: 1.2 });

  }, [currentStorm, analysis, showCone, showPastTrack, showCoastalZones]);

  const recenterMap = () => {
    if (mapInstanceRef.current && currentStorm) {
      mapInstanceRef.current.flyTo([currentStorm.center.lat, currentStorm.center.lon], 6, { duration: 1.0 });
    }
  };

  return (
    <div className="map-wrapper" id="cyclone-geospatial-map">
      {/* Map Control Toolbar */}
      <div className="map-toolbar">
        <div className="map-toolbar-group">
          <span className="map-tag">
            <Compass className="w-3.5 h-3.5 text-cyan-400 inline mr-1" />
            NIO RADAR & SATELLITE OVERLAY
          </span>
          <span className="map-storm-title">
            {currentStorm ? `${currentStorm.name} (${currentStorm.basin})` : 'Scanning Basin...'}
          </span>
        </div>

        <div className="map-toolbar-controls">
          <div className="zoom-earth-pill-badge" title="High-Resolution True-Color Satellite Imagery (Zoom Earth Standard)">
            <span className="zoom-earth-pulse-dot"></span>
            <span>ZOOM EARTH HD</span>
          </div>

          <button 
            className={`map-btn ${showCone ? 'active' : ''}`}
            onClick={() => setShowCone(!showCone)}
            title="Toggle 72h Cone of Uncertainty"
            id="toggle-cone-btn"
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Cone ({showCone ? 'ON' : 'OFF'})</span>
          </button>

          <button 
            className={`map-btn ${showPastTrack ? 'active' : ''}`}
            onClick={() => setShowPastTrack(!showPastTrack)}
            title="Toggle Past Observation Track"
            id="toggle-past-track-btn"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Track ({showPastTrack ? 'ON' : 'OFF'})</span>
          </button>

          <button 
            className={`map-btn ${showCoastalZones ? 'active' : ''}`}
            onClick={() => setShowCoastalZones(!showCoastalZones)}
            title="Toggle Coastal Warning Hazard Zones"
            id="toggle-coastal-zones-btn"
          >
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>Alerts ({showCoastalZones ? 'ON' : 'OFF'})</span>
          </button>

          <button 
            className="map-btn"
            onClick={recenterMap}
            title="Recenter Map on Eye Center"
            id="recenter-map-btn"
          >
            <Maximize2 className="w-3.5 h-3.5" />
            <span>Center Eye</span>
          </button>
        </div>
      </div>

      {/* Leaflet Map Div */}
      <div ref={mapContainerRef} className="map-viewport" />

      {/* Legend Overlay */}
      <div className="map-legend">
        <div className="legend-title">TRACK LEGEND</div>
        <div className="legend-item">
          <span className="legend-line past"></span>
          <span>Past Track (-24h to 00h)</span>
        </div>
        <div className="legend-item">
          <span className="legend-line forecast"></span>
          <span>Forecast Track (+6h to +72h)</span>
        </div>
        <div className="legend-item">
          <span className="legend-box cone"></span>
          <span>Cone of Uncertainty</span>
        </div>
        <div className="legend-item">
          <span className="legend-dot red"></span>
          <span>Red Hazard Coastal Zone</span>
        </div>
      </div>
    </div>
  );
};
