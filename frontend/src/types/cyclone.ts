export interface StormCenter {
  lat: number;
  lon: number;
}

export interface HistoricalPoint {
  time: string;
  lat: number;
  lon: number;
  msw_knots: number;
}

export interface NetCDFVariableInfo {
  name: string;
  shape: number[];
  dims: string[];
  dtype: string;
  units: string;
  long_name: string;
}

export interface NetCDFThermodynamics {
  min_temp_c: number;
  max_temp_c: number;
  mean_temp_c: number;
  min_temp_k: number;
  max_temp_k: number;
  eye_core_temp_c: number;
  eyewall_ring_temp_c: number;
  eye_inversion_anomaly_delta_t: number;
  cold_shield_40_pct: number;
  cold_shield_60_pct: number;
  overshooting_75_pct: number;
}

export interface NetCDFMeteorologicalCondition {
  condition_state: string;
  convective_vigor: string;
  sea_state: string;
  rain_potential: string;
  threat_level: string;
}

export interface IBTrACSStormSummary {
  index: number;
  sid: string;
  name: string;
  year: number;
  peak_wind: number;
  obs_count: number;
}

export interface NetCDFDatasetInfo {
  title: string;
  satellite_name: string;
  sensor: string;
  source: string;
  conventions: string;
  primary_variable: string;
  shape: number[];
  dimensions: Record<string, number>;
  center_lat: number;
  center_lon: number;
  lat_range: number[];
  lon_range: number[];
  thermodynamics: NetCDFThermodynamics;
  meteorological_condition: NetCDFMeteorologicalCondition;
  variables_list: NetCDFVariableInfo[];
  unique_identifier?: string;
  storm_id?: string;
  place?: string;
  landfall?: string;
  year?: number;
  basin?: string;
  is_ibtracs?: boolean;
  ibtracs_storms?: IBTrACSStormSummary[];
  historical_track?: HistoricalPoint[];
}

export interface BenchmarkStorm {
  id: string;
  name: string;
  unique_identifier?: string;
  storm_identifier?: string;
  place?: string;
  year: number;
  basin: string;
  category: string;
  peak_msw_knots: number;
  central_pressure_hpa: number;
  center: StormCenter;
  heading: number;
  forward_speed_kmph: number;
  landfall: string;
  landfall_coords?: StormCenter;
  max_wind_knots?: number;
  lowest_pressure_hpa?: number;
  satellite_source: string;
  dvorak_pattern: string;
  historical_track: HistoricalPoint[];
  isCustom?: boolean;
  netcdf_info?: NetCDFDatasetInfo;
}

export interface ModelValidationMetrics {
  evaluation_period: string;
  verified_storms_count: number;
  track_error_km: {
    lead_24h: {
      cyclone_ai: number;
      imd_official: number;
      jtwc_operational: number;
      cliper_persistence: number;
      improvement_vs_baseline_pct: number;
      improvement_vs_imd_pct: number;
    };
    lead_48h: {
      cyclone_ai: number;
      imd_official: number;
      jtwc_operational: number;
      cliper_persistence: number;
      improvement_vs_baseline_pct: number;
      improvement_vs_imd_pct: number;
    };
    lead_72h: {
      cyclone_ai: number;
      imd_official: number;
      jtwc_operational: number;
      cliper_persistence: number;
      improvement_vs_baseline_pct: number;
      improvement_vs_imd_pct: number;
    };
  };
  intensity_error: {
    msw_mae_knots: {
      cyclone_ai: number;
      imd_official: number;
      persistence_baseline: number;
    };
    pressure_mae_hpa: {
      cyclone_ai: number;
      imd_official: number;
      persistence_baseline: number;
    };
    rapid_intensification_brier_score: number;
    rapid_intensification_auc: number;
  };
  dvorak_classification: {
    accuracy_within_half_t: number;
    pattern_f1_score: number;
    classes: Array<{
      pattern: string;
      precision: number;
      recall: number;
      f1: number;
    }>;
  };
  held_out_storms: Array<{
    name: string;
    basin: string;
    observed_peak_kt: number;
    predicted_peak_kt: number;
    observed_pressure_hpa: number;
    predicted_pressure_hpa: number;
    track_error_24h_km: number;
    track_error_48h_km: number;
    landfall_eta_error_hours: number;
    actual_landfall: string;
  }>;
  model_card: {
    architecture: string;
    backbone_parameters: string;
    training_dataset: string;
    training_split: string;
    physics_constraints: string;
    limitations: string;
  };
}

export interface EyeDetection {
  found: boolean;
  x: number;
  y: number;
  radius_px: number;
  diameter_km: number;
  confidence: number;
  eye_type: string;
}

export interface PatternDistribution {
  [pattern: string]: number;
}

export interface ClassificationResult {
  primary_pattern: string;
  confidence: number;
  distribution: PatternDistribution;
  spiral_wrap_degrees: number;
  cold_shield_fraction: number;
}

export interface IntensityResult {
  dvorak_t_number: number;
  ci_number: number;
  msw_knots: number;
  msw_kmph: number;
  gust_kmph: number;
  central_pressure_hpa: number;
  imd_category: string;
  badge_color: string;
  warning_level: string;
  ri_probability: number;
  ri_status: string;
}

export interface ForecastPoint {
  step: string;
  hours: number;
  lat: number;
  lon: number;
  msw_knots: number;
  msw_kmph: number;
  cone_radius_km: number;
  central_pressure_hpa: number;
}

export interface ChannelImagery {
  infrared_raw: string;
  bd_curve_enhanced: string;
  thermal_heatmap?: string;
  water_vapor: string;
  gradcam_attention: string;
}

export interface AnalysisMeta {
  analysis_engine: string;
  resolution: string;
  satellite_sources: string[];
  timestamp: string;
}

export interface AIAnalysisResult {
  eye: EyeDetection;
  classification: ClassificationResult;
  intensity: IntensityResult;
  forecast: ForecastPoint[];
  channels: ChannelImagery;
  meta: AnalysisMeta;
  storm_profile?: BenchmarkStorm;
  deep_learning?: {
    status: string;
    device: string;
    framework_versions: Record<string, string>;
    resnet_classifier: {
      model: string;
      predicted_pattern: string;
      pattern_distribution: Record<string, number>;
      dvorak_t_number: number;
      device: string;
    };
    convlstm_temporal: {
      model: string;
      delta_lat_6h: number;
      delta_lon_6h: number;
      predicted_cloud_shape: number[];
    };
  };
}

export interface IMDBulletinData {
  bulletin_number: string;
  bulletin_text: string;
  timestamp: string;
  basin: string;
  storm_name: string;
  imd_category: string;
}

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  role: 'Senior Meteorologist' | 'Disaster Response Officer' | 'Research Analyst';
  station: string;
  isDemo?: boolean;
}

export interface FirebaseCustomConfig {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
}
