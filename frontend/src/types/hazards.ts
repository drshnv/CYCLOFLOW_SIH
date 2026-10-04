export type HazardType = 'cyclone' | 'earthquake' | 'tsunami' | 'surge' | 'multi_hazard';

export type RiskLevel = 'critical' | 'extreme' | 'high' | 'elevated';

export interface HistoricalDisasterRecord {
  eventName: string;
  year: number;
  intensityOrMagnitude: string;
  casualties: string;
  economicLoss: string;
  summary: string;
}

export interface HighRiskPlace {
  id: string;
  rank: 1 | 2 | 3;
  name: string;
  region: string;
  country: string;
  coordinates: {
    lat: number;
    lon: number;
  };
  impactRadiusKm: number;
  primaryHazard: HazardType;
  hazardTypes: HazardType[];
  riskScore: number; // 0 - 100
  riskLevel: RiskLevel;
  recordPeakEvent: string;
  whyHighestRisk: string;
  keyDisasters: HistoricalDisasterRecord[];
  geologicalOrClimaticFactor: string;
  populationExposed: string;
  recommendedMitigation: string;
}

export interface CountryHazardProfile {
  id: string;
  name: string;
  code: string;
  flag: string;
  basinRegion: 'South Asia' | 'East Asia' | 'Americas' | 'Oceania' | 'Europe & Mediterranean' | 'Africa';
  center: {
    lat: number;
    lon: number;
  };
  defaultZoom: number;
  totalHistoricalEventsOnRecord: number;
  mostFrequentHazard: string;
  countryOverview: string;
  officialDataSources: string[];
  topRiskPlaces: [HighRiskPlace, HighRiskPlace, HighRiskPlace]; // Exactly Top 3 places per country!
}
