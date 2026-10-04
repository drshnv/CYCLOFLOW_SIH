import type { BenchmarkStorm, AIAnalysisResult, IMDBulletinData } from '../types/cyclone';

const API_BASE = "http://127.0.0.1:8000/api";

export const checkBackendHealth = async (): Promise<boolean> => {
  try {
    const res = await fetch(`${API_BASE}/health`, { method: 'GET', signal: AbortSignal.timeout(2500) });
    return res.ok;
  } catch {
    return false;
  }
};

export const fetchBenchmarkStorms = async (): Promise<BenchmarkStorm[]> => {
  try {
    const res = await fetch(`${API_BASE}/benchmark-storms`, { signal: AbortSignal.timeout(4000) });
    if (res.ok) {
      return await res.json();
    }
  } catch (e) {
    console.warn("Backend API unavailable, using fallback benchmark storms:", e);
  }

  // Resilient fallback benchmark records matching backend/benchmark_data.py
  return [
    {
      id: "biparjoy-2023",
      name: "Cyclone Biparjoy",
      year: 2023,
      basin: "Arabian Sea",
      category: "Extremely Severe Cyclonic Storm (ESCS)",
      peak_msw_knots: 90,
      central_pressure_hpa: 958.0,
      center: { lat: 20.8, lon: 66.5 },
      heading: 40.0,
      forward_speed_kmph: 13.0,
      landfall: "Naliya, Kutch, Gujarat, India",
      landfall_coords: { lat: 23.25, lon: 68.80 },
      satellite_source: "INSAT-3D TIR1 & ASCAT Winds",
      dvorak_pattern: "Curved Band Pattern",
      historical_track: [
        { time: "-24h", lat: 18.2, lon: 67.2, msw_knots: 85 },
        { time: "-12h", lat: 19.8, lon: 67.0, msw_knots: 90 },
        { time: "00h", lat: 20.8, lon: 66.5, msw_knots: 90 }
      ]
    },
    {
      id: "amphan-2020",
      name: "Cyclone Amphan",
      year: 2020,
      basin: "Bay of Bengal",
      category: "Super Cyclonic Storm (SuCS)",
      peak_msw_knots: 140,
      central_pressure_hpa: 907.0,
      center: { lat: 18.5, lon: 86.8 },
      heading: 18.0,
      forward_speed_kmph: 18.0,
      landfall: "Bakkhali / Digha (West Bengal / Sundarbans)",
      satellite_source: "INSAT-3DR & Himawari-8 Multi-spectral",
      dvorak_pattern: "Eye Pattern",
      historical_track: [
        { time: "-24h", lat: 13.2, lon: 86.4, msw_knots: 110 },
        { time: "-18h", lat: 14.6, lon: 86.5, msw_knots: 125 },
        { time: "-12h", lat: 16.0, lon: 86.6, msw_knots: 135 },
        { time: "-6h", lat: 17.2, lon: 86.7, msw_knots: 140 },
        { time: "00h", lat: 18.5, lon: 86.8, msw_knots: 140 }
      ]
    },
    {
      id: "fani-2019",
      name: "Cyclone Fani",
      year: 2019,
      basin: "Bay of Bengal",
      category: "Extremely Severe Cyclonic Storm (ESCS)",
      peak_msw_knots: 115,
      central_pressure_hpa: 932.0,
      center: { lat: 17.8, lon: 85.3 },
      heading: 25.0,
      forward_speed_kmph: 16.0,
      landfall: "Puri Coast (Odisha)",
      satellite_source: "INSAT-3D & NOAA-GOES",
      dvorak_pattern: "Central Dense Overcast (CDO)",
      historical_track: [
        { time: "-24h", lat: 14.1, lon: 84.8, msw_knots: 95 },
        { time: "-18h", lat: 15.0, lon: 84.9, msw_knots: 105 },
        { time: "-12h", lat: 16.0, lon: 85.0, msw_knots: 110 },
        { time: "-6h", lat: 16.9, lon: 85.1, msw_knots: 115 },
        { time: "00h", lat: 17.8, lon: 85.3, msw_knots: 115 }
      ]
    },
    {
      id: "mocha-2023",
      name: "Cyclone Mocha",
      year: 2023,
      basin: "Bay of Bengal",
      category: "Super Cyclonic Storm (SuCS)",
      peak_msw_knots: 135,
      central_pressure_hpa: 918.0,
      center: { lat: 18.8, lon: 91.5 },
      heading: 42.0,
      forward_speed_kmph: 20.0,
      landfall: "Sittwe (Myanmar) / Cox's Bazar",
      satellite_source: "Himawari-9 & INSAT-3DR",
      dvorak_pattern: "Eye Pattern",
      historical_track: [
        { time: "-24h", lat: 14.5, lon: 88.8, msw_knots: 100 },
        { time: "-18h", lat: 15.6, lon: 89.4, msw_knots: 115 },
        { time: "-12h", lat: 16.7, lon: 90.1, msw_knots: 125 },
        { time: "-6h", lat: 17.8, lon: 90.8, msw_knots: 135 },
        { time: "00h", lat: 18.8, lon: 91.5, msw_knots: 135 }
      ]
    },
    {
      id: "tauktae-2021",
      name: "Cyclone Tauktae",
      year: 2021,
      basin: "Arabian Sea",
      category: "Extremely Severe Cyclonic Storm (ESCS)",
      peak_msw_knots: 100,
      central_pressure_hpa: 950.0,
      center: { lat: 19.5, lon: 71.3 },
      heading: 350.0,
      forward_speed_kmph: 15.0,
      landfall: "Una / Diu (Saurashtra Coast, Gujarat)",
      satellite_source: "INSAT-3D & Scatterometer",
      dvorak_pattern: "Curved Band Pattern",
      historical_track: [
        { time: "-24h", lat: 15.5, lon: 72.8, msw_knots: 80 },
        { time: "-18h", lat: 16.5, lon: 72.4, msw_knots: 90 },
        { time: "-12h", lat: 17.5, lon: 72.0, msw_knots: 95 },
        { time: "-6h", lat: 18.5, lon: 71.6, msw_knots: 100 },
        { time: "00h", lat: 19.5, lon: 71.3, msw_knots: 100 }
      ]
    }
  ];
};

export const runBenchmarkAnalysis = async (stormId: string): Promise<AIAnalysisResult> => {
  const res = await fetch(`${API_BASE}/analyze-benchmark/${stormId}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  });
  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`AI Analysis failed (${res.status}): ${errorText}`);
  }
  return await res.json();
};

export const runCustomImageAnalysis = async (
  file: File, 
  lat = 18.5, 
  lon = 86.5, 
  heading = 320.0
): Promise<AIAnalysisResult> => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('lat', lat.toString());
  formData.append('lon', lon.toString());
  formData.append('heading', heading.toString());

  const res = await fetch(`${API_BASE}/analyze`, {
    method: 'POST',
    body: formData
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Custom image analysis failed: ${errorText}`);
  }
  return await res.json();
};

export const generateBulletin = async (data: {
  storm_name: string;
  basin: string;
  category: string;
  lat: number;
  lon: number;
  msw_knots: number;
  msw_kmph: number;
  pressure_hpa: number;
  landfall_target: string;
  forecast_points: any[];
}): Promise<IMDBulletinData> => {
  const res = await fetch(`${API_BASE}/bulletin`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });

  if (!res.ok) {
    throw new Error("Failed to generate IMD Bulletin");
  }
  return await res.json();
};

export interface NetCDFRenderResponse {
  status: string;
  netcdf_info: any;
  rendered_pictures: Record<string, string>;
  ai_diagnosis: AIAnalysisResult;
  storm_profile?: any;
  unique_identifier?: string;
  storm_name?: string;
  place?: string;
  landfall?: string;
  file_name?: string;
}

export const fetchSampleNetCDFRender = async (): Promise<NetCDFRenderResponse> => {
  const res = await fetch(`${API_BASE}/netcdf/render-sample`);
  if (!res.ok) {
    throw new Error("Failed to render NetCDF sample data");
  }
  return await res.json();
};

export const uploadNetCDFDataset = async (file: File, stormSid?: string): Promise<NetCDFRenderResponse> => {
  const formData = new FormData();
  formData.append('file', file);
  if (stormSid) {
    formData.append('storm_sid', stormSid);
  }
  const res = await fetch(`${API_BASE}/netcdf/upload`, {
    method: 'POST',
    body: formData
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`NetCDF upload failed: ${err}`);
  }
  return await res.json();
};

export const selectIBTrACSStorm = async (fileName: string, stormSid: string): Promise<NetCDFRenderResponse> => {
  const res = await fetch(`${API_BASE}/netcdf/select-storm`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ file_name: fileName, storm_sid: stormSid })
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`IBTrACS storm switch failed: ${err}`);
  }
  return await res.json();
};

export const deleteCycloneRecord = async (stormId: string): Promise<boolean> => {
  try {
    const res = await fetch(`${API_BASE}/cyclones/${stormId}`, { method: 'DELETE' });
    return res.ok;
  } catch (e) {
    console.warn("Server delete endpoint error, proceeding with client-side deletion:", e);
    return true;
  }
};

export const lookupCycloneIdentifier = async (identifier: string): Promise<any> => {
  const res = await fetch(`${API_BASE}/cyclones/lookup/${encodeURIComponent(identifier.trim())}`);
  if (!res.ok) {
    throw new Error(`Failed to lookup identifier ${identifier}`);
  }
  return await res.json();
};

export const fetchModelValidationMetrics = async (): Promise<any> => {
  try {
    const res = await fetch(`${API_BASE}/ml-models/validation-metrics`);
    if (res.ok) {
      return await res.json();
    }
  } catch (e) {
    console.warn("Failed to fetch validation metrics from backend, using certified baseline:", e);
  }
  return null;
};


