import React, { useState, useRef } from 'react';
import type { AIAnalysisResult } from '../../types/cyclone';
import { Eye, Flame, Droplets, BrainCircuit, Crosshair, ZoomIn, ZoomOut, RotateCcw, Thermometer } from 'lucide-react';

interface SatelliteViewerProps {
  analysis: AIAnalysisResult | null;
  stormName: string;
  isSouthernHemisphere?: boolean;
}

type ChannelType = 'bd_curve_enhanced' | 'thermal_heatmap' | 'infrared_raw' | 'water_vapor' | 'gradcam_attention';

export const SatelliteViewer: React.FC<SatelliteViewerProps> = ({ 
  analysis, 
  stormName,
  isSouthernHemisphere = false
}) => {
  const [activeChannel, setActiveChannel] = useState<ChannelType>('bd_curve_enhanced');
  const [showEyeOverlay, setShowEyeOverlay] = useState(true);
  const [showSpiralGuide, setShowSpiralGuide] = useState(true);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [hoverCoords, setHoverCoords] = useState<{ x: number; y: number; temp: number } | null>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);

  // Generates a true meteorological Dvorak logarithmic spiral matching the eye location and hemisphere rotation
  const generateLogarithmicSpiralPath = (
    cx: number,
    cy: number,
    startRadius: number,
    isSouth: boolean
  ) => {
    const points: string[] = [];
    const b = 0.22;
    const r0 = Math.max(14, startRadius * 1.05);
    const spinSign = isSouth ? 1 : -1; // Clockwise in Southern Hemisphere, Counter-Clockwise in Northern
    const startAngle = isSouth ? Math.PI * 0.25 : -Math.PI * 0.25;
    const numSteps = 45;
    const maxTheta = Math.PI * 2.2;

    for (let i = 0; i <= numSteps; i++) {
      const theta = (i / numSteps) * maxTheta;
      const r = Math.min(235, r0 * Math.exp(b * theta));
      const angle = startAngle + (spinSign * theta);
      const x = Math.round(cx + r * Math.cos(angle));
      const y = Math.round(cy + r * Math.sin(angle));
      points.push(`${i === 0 ? 'M' : 'L'} ${x} ${y}`);
    }
    return points.join(' ');
  };

  const channels = [
    {
      id: 'bd_curve_enhanced' as ChannelType,
      label: 'BD-Curve Dvorak',
      icon: Flame,
      desc: 'Enhanced Cloud-Top IR (-30°C to -85°C)'
    },
    {
      id: 'thermal_heatmap' as ChannelType,
      label: 'Thermal Heatmap',
      icon: Thermometer,
      desc: 'Calibrated Radiometric Brightness Temperature (-85°C to +30°C)'
    },
    {
      id: 'infrared_raw' as ChannelType,
      label: 'Thermal IR (10.8µm)',
      icon: Eye,
      desc: 'INSAT-3D TIR1 Radiance'
    },
    {
      id: 'water_vapor' as ChannelType,
      label: 'Water Vapor (6.7µm)',
      icon: Droplets,
      desc: 'Upper Tropospheric Moisture Circulation'
    },
    {
      id: 'gradcam_attention' as ChannelType,
      label: 'Grad-CAM XAI',
      icon: BrainCircuit,
      desc: 'Neural Network Attention Heatmap'
    }
  ];

  const currentImageSrc = (activeChannel === 'thermal_heatmap' ? (analysis?.channels.thermal_heatmap || analysis?.channels.bd_curve_enhanced) : analysis?.channels[activeChannel]) || '/placeholder_ir.jpg';
  const eye = analysis?.eye;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageContainerRef.current) return;
    const rect = imageContainerRef.current.getBoundingClientRect();
    const x = Math.round(((e.clientX - rect.left) / rect.width) * 512);
    const y = Math.round(((e.clientY - rect.top) / rect.height) * 512);

    // Calculate approximate brightness temperature based on radial distance from eye
    let temp = -45;
    if (eye) {
      const dist = Math.hypot(x - eye.x, y - eye.y);
      if (dist < eye.radius_px) {
        temp = -15; // warmer eye core
      } else if (dist < eye.radius_px * 2) {
        temp = -78; // cold eyewall ring
      } else {
        temp = -55 + Math.sin(dist / 20) * 15;
      }
    }
    setHoverCoords({ x: Math.max(0, Math.min(512, x)), y: Math.max(0, Math.min(512, y)), temp: Math.round(temp) });
  };

  const handleMouseLeave = () => {
    setHoverCoords(null);
  };

  return (
    <div className="satellite-studio-card" id="satellite-studio-viewer">
      {/* Top Header & Channel Switcher */}
      <div className="studio-header">
        <div className="studio-title-block">
          <div className="flex items-center gap-2">
            <span className="live-dot"></span>
            <h3 className="studio-title">MULTI-SOURCE SATELLITE STUDIO</h3>
          </div>
          <p className="studio-subtitle">
            {stormName} &bull; Sensor: {analysis?.meta.satellite_sources[0] || 'INSAT-3DR Imager'} &bull; Res: 1.5 km/px
          </p>
        </div>

        {/* Channel Selection Buttons */}
        <div className="channel-tabs" id="satellite-channel-tabs">
          {channels.map(ch => {
            const Icon = ch.icon;
            const isActive = activeChannel === ch.id;
            return (
              <button
                key={ch.id}
                className={`channel-tab-btn ${isActive ? 'active' : ''}`}
                onClick={() => setActiveChannel(ch.id)}
                title={ch.desc}
                id={`channel-${ch.id}-btn`}
              >
                <Icon className="w-4 h-4" />
                <span>{ch.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Imagery Viewer Display */}
      <div className="studio-viewport-container">
        <div 
          ref={imageContainerRef}
          className="satellite-viewport"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{ transform: `scale(${zoomLevel})` }}
        >
          {/* Base Satellite Channel Image */}
          <img 
            src={currentImageSrc} 
            alt={`Satellite Channel ${activeChannel}`} 
            className="satellite-frame-image"
          />

          {/* AI Eye Center Localization Overlay */}
          {showEyeOverlay && eye && (
            <svg className="eye-svg-overlay" viewBox="0 0 512 512">
              {/* Eyewall radius circle */}
              <circle
                cx={eye.x}
                cy={eye.y}
                r={eye.radius_px}
                className="eye-svg-ring"
              />
              {/* Outer feeder convective boundary */}
              <circle
                cx={eye.x}
                cy={eye.y}
                r={eye.radius_px * 2.2}
                className="eye-svg-outer-ring"
              />
              {/* Center Target Crosshairs */}
              <line x1={eye.x - 22} y1={eye.y} x2={eye.x + 22} y2={eye.y} className="eye-crosshair" />
              <line x1={eye.x} y1={eye.y - 22} x2={eye.x} y2={eye.y + 22} className="eye-crosshair" />
              {/* Center point */}
              <circle cx={eye.x} cy={eye.y} r={3.5} fill="#06b6d4" />
            </svg>
          )}

          {/* Dvorak Spiral Band Overlay */}
          {showSpiralGuide && eye && (
            <svg className="spiral-svg-overlay" viewBox="0 0 512 512">
              <path
                d={generateLogarithmicSpiralPath(eye.x, eye.y, eye.radius_px, isSouthernHemisphere)}
                className="spiral-band-path"
              />
            </svg>
          )}

          {/* Eye Badge floating tag */}
          {showEyeOverlay && eye && (
            <div 
              className="eye-coord-tag"
              style={{
                left: `${(eye.x / 512) * 100}%`,
                top: `${((eye.y - eye.radius_px - 14) / 512) * 100}%`
              }}
            >
              <Crosshair className="w-3 h-3 text-cyan-400 inline mr-1" />
              EYE: ({eye.x}, {eye.y}) | ⌀ {eye.diameter_km} km
            </div>
          )}

          {/* Interactive Inspection Crosshair */}
          {hoverCoords && (
            <div 
              className="inspection-reticle"
              style={{
                left: `${(hoverCoords.x / 512) * 100}%`,
                top: `${(hoverCoords.y / 512) * 100}%`
              }}
            >
              <div className="reticle-info">
                <span>X:{hoverCoords.x} Y:{hoverCoords.y}</span>
                <span className="temp-val">{hoverCoords.temp}°C ({(hoverCoords.temp + 273.15).toFixed(1)} K)</span>
              </div>
            </div>
          )}
        </div>

        {/* Viewer Tools floating bar */}
        <div className="studio-tools-overlay">
          <button 
            className={`tool-icon-btn ${showEyeOverlay ? 'active' : ''}`}
            onClick={() => setShowEyeOverlay(!showEyeOverlay)}
            title="Toggle AI Eye Localization Overlay"
            id="toggle-eye-overlay-btn"
          >
            <Crosshair className="w-4 h-4" />
          </button>
          <button 
            className={`tool-icon-btn ${showSpiralGuide ? 'active' : ''}`}
            onClick={() => setShowSpiralGuide(!showSpiralGuide)}
            title="Toggle Dvorak Spiral Band Overlay"
            id="toggle-spiral-btn"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
          <button 
            className="tool-icon-btn"
            onClick={() => setZoomLevel(prev => Math.min(prev + 0.25, 2.25))}
            title="Zoom In"
            id="zoom-in-btn"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <button 
            className="tool-icon-btn"
            onClick={() => setZoomLevel(prev => Math.max(prev - 0.25, 1))}
            title="Zoom Out"
            id="zoom-out-btn"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Dynamic Temperature Scale Bar */}
      {activeChannel === 'thermal_heatmap' ? (
        <div className="bd-scale-bar-container">
          <div className="scale-title">CALIBRATED THERMAL BRIGHTNESS TEMPERATURE SCALE (RADIOMETRIC TURBO):</div>
          <div className="thermal-gradient-bar"></div>
        </div>
      ) : activeChannel === 'bd_curve_enhanced' ? (
        <div className="bd-scale-bar-container">
          <div className="scale-title">DVORAK BD-CURVE CLOUD-TOP TEMPERATURE CALIBRATION:</div>
          <div className="bd-gradient-bar">
            <span className="scale-stop warm-ocean" title="Warm Ocean (> 10°C)">+10°C</span>
            <span className="scale-stop low-cloud" title="Low Stratus (-30°C)">-30°C</span>
            <span className="scale-stop med-grey" title="Medium Grey (-31 to -41°C)">-40°C</span>
            <span className="scale-stop dark-grey" title="Dark Grey (-42 to -53°C)">-50°C</span>
            <span className="scale-stop white-cirrus" title="White (-54 to -63°C)">-60°C</span>
            <span className="scale-stop black-vigor" title="Black Eyewall (-64 to -69°C)">-68°C</span>
            <span className="scale-stop cold-ring" title="Cold Eyewall Ring (-70 to -79°C)">-75°C</span>
            <span className="scale-stop cold-white" title="Overshooting Top (< -80°C)">&lt; -80°C</span>
          </div>
        </div>
      ) : null}
    </div>
  );
};
