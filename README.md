# 🌀 CycloneAI: Operational Meteorological AI System

> **Smart India Hackathon (SIH) Project**  
> *AI/ML-based Identification, Dvorak Pattern Classification, and 72-Hour Kinematic Track Prediction using Multi-Source Satellite Observations.*

---

## 🎯 Problem Statement Alignment

| SIH Requirement Clause | CycloneAI Technical Implementation | Output / Impact |
| :--- | :--- | :--- |
| **Multi-Source Satellite Data** | `backend/ai_engine.py`<br>`frontend/src/components/SatelliteStudio` | INSAT-3D/3DR (Thermal IR 10.8µm, Mid-IR 3.9µm, Water Vapor 6.7µm), Megha-Tropiques MADRAS microwave, and ScatSat-1 scatterometer wind vectors. |
| **AI/ML Identification** | `backend/ai_engine.py` (`detect_eye_and_cdo`) | Circle Hough Transform & gradient centroid analysis for sub-pixel eye coordinates, diameter ($km$), eye temperature, and surrounding eyewall brightness. |
| **Pattern Classification** | `backend/ai_engine.py` (`classify_dvorak_pattern`) | Dvorak morphological patterns (Eye Pattern, Curved Band, Sheared/Embedded Center, Banding Type) + IMD Basin Intensity Categories ($T1.0 - T8.0$). |
| **Track & Hazard Prediction** | `backend/ai_engine.py` (`forecast_trajectory_and_landfall`) | 72-Hour Kinematic Forecaster ($+6h, +12h, +24h, +48h, +72h$), expanding **Cone of Uncertainty**, Landfall Target/ETA, and 24h Rapid Intensification index. |

---

## 🏗️ Architecture & Technology Stack

```
c:/SIH_PROJECT/
├── backend/                  # FastAPI AI Inference Server (Python 3.14)
│   ├── server.py             # REST API endpoints & CORS middleware
│   ├── ai_engine.py          # Multi-spectral CV, Dvorak CNN, Hough Eye Localization
│   └── benchmark_data.py     # Curated historical storms (Amphan, Biparjoy, Fani, Tauktae)
├── frontend/                 # React 19 + TypeScript + Vite Dashboard
│   ├── src/
│   │   ├── components/
│   │   │   ├── Map/          # Leaflet Geospatial Radar & Cone of Uncertainty
│   │   │   ├── SatelliteStudio/ # Multi-spectral channel viewer (BD-Curve, IR, WV, Grad-CAM)
│   │   │   ├── Telemetry/    # Real-time physical gauges (MSW, pressure drop, Dvorak CI)
│   │   │   ├── Analysis/     # AI diagnostics, benchmark loader, custom file upload
│   │   │   ├── Bulletin/     # Standardized IMD RSMC New Delhi bulletin generator
│   │   │   └── Auth/         # Firebase Authentication & Cloud Sync modal
│   │   ├── services/
│   │   │   ├── api.ts        # FastAPI client
│   │   │   └── firebase.ts   # Firebase v10 Auth & Firestore sync
│   │   └── types/            # Strict TypeScript meteorological data contracts
│   └── index.html
├── sih_compliance_matrix.md  # Detailed SIH requirements mapping matrix
└── start.bat                 # 1-Click launcher for both backend & frontend
```

---

## ⚡ Quick Start (1-Click Run)

Simply double-click [`start.bat`](file:///c:/SIH_PROJECT/start.bat) or execute in PowerShell:

```powershell
.\start.bat
```

### Manual Execution

1. **Start the FastAPI Backend**:
   ```powershell
   cd c:\SIH_PROJECT\backend
   python -m uvicorn server:app --host 127.0.0.1 --port 8000 --reload
   ```

2. **Start the Vite Frontend**:
   ```powershell
   cd c:\SIH_PROJECT\frontend
   npm run dev -- --host 127.0.0.1 --port 5173
   ```

3. **Access Services**:
   - **Frontend UI**: [http://127.0.0.1:5173/](http://127.0.0.1:5173/)
   - **Interactive API Documentation**: [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)

---

## 🌟 Key Features for SIH Demonstration

1. **Multi-Spectral Satellite Studio**:
   - Real-time switching between **BD-Curve Enhanced IR**, **Thermal IR 10.8µm**, **Water Vapor 6.7µm**, and **Explainable AI (Grad-CAM)**.
   - Interactive reticle measuring brightness temperature in Celsius at any coordinate.
2. **Precision Eye Extraction & Convective Geometry**:
   - Automated sub-pixel eye detection returning precise latitude/longitude, eye radius ($km$), and eye temperature ($°C$).
3. **Atkinson-Holliday Wind-Pressure Calibration**:
   - Specifically calibrated for the North Indian Ocean basin (Bay of Bengal & Arabian Sea).
4. **72-Hour Forecast & Dynamic Cone of Uncertainty**:
   - Interactive Leaflet radar map rendering projected waypoint badges and expanding operational error polygons.
5. **Instant IMD National Advisory Bulletin**:
   - Standardized RSMC New Delhi advisory format with 1-click **Copy**, **Print / PDF**, and **Text Download**.
6. **Firebase Cloud Synchronization**:
   - 1-click fast-track meteorologist demo login and live Firestore synchronization.
