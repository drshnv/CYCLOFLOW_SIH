import type { CountryHazardProfile } from '../types/hazards';

export const GLOBAL_HAZARD_PROFILES: CountryHazardProfile[] = [
  {
    id: 'india',
    name: 'India',
    code: 'IND',
    flag: '🇮🇳',
    basinRegion: 'South Asia',
    center: { lat: 21.0, lon: 78.5 },
    defaultZoom: 5,
    totalHistoricalEventsOnRecord: 184,
    mostFrequentHazard: 'Tropical Cyclones (Bay of Bengal / Arabian Sea) & Himalayan Seismicity',
    countryOverview: 'India has a 7,516 km vulnerable coastline exposed to ~10% of the world’s tropical cyclones, with the funnel-shaped Bay of Bengal generating 4 of the 5 deadliest cyclones in world history. Additionally, the northern territory sits directly on the active Himalayan collision zone.',
    officialDataSources: ['India Meteorological Department (IMD)', 'National Disaster Management Authority (NDMA)', 'National Center for Seismology (NCS)'],
    topRiskPlaces: [
      {
        id: 'in-odisha',
        rank: 1,
        name: 'Odisha Coastal Belt (Kendrapada, Jagatsinghpur, Puri)',
        region: 'Odisha State',
        country: 'India',
        coordinates: { lat: 20.35, lon: 86.60 },
        impactRadiusKm: 95,
        primaryHazard: 'cyclone',
        hazardTypes: ['cyclone', 'surge'],
        riskScore: 98,
        riskLevel: 'critical',
        recordPeakEvent: '1999 Odisha Super Cyclone (260 km/h MSW, 960 hPa, 9-10m storm surge)',
        whyHighestRisk: 'The concave bathymetry of northern Bay of Bengal acts as an amphitheater that funnels oceanic energy directly into the low-lying Mahanadi delta. Extreme shallow shelf depths amplify storm surges up to 10 meters inland, flooding hundreds of square kilometers.',
        keyDisasters: [
          {
            eventName: '1999 Super Cyclone BOB 06',
            year: 1999,
            intensityOrMagnitude: 'Super Cyclonic Storm (260 km/h wind, 912 hPa)',
            casualties: '9,887 official fatalities',
            economicLoss: '$4.5 Billion USD',
            summary: 'Stalled over Odisha for 30 hours with catastrophic surge, destroying 1.6 million homes and wiping out Ersama block.'
          },
          {
            eventName: 'Extremely Severe Cyclone Fani',
            year: 2019,
            intensityOrMagnitude: 'Category 5 equivalent (215 km/h wind, 932 hPa)',
            casualties: '89 fatalities (1.2M evacuated)',
            economicLoss: '$8.1 Billion USD',
            summary: 'Direct landfall near Puri devastating electricity infrastructure and heritage temples; showcased world-class early evacuation.'
          },
          {
            eventName: 'Very Severe Cyclone Phailin',
            year: 2013,
            intensityOrMagnitude: 'Category 5 equivalent (215 km/h, 940 hPa)',
            casualties: '45 fatalities (massive shelter success)',
            economicLoss: '$4.2 Billion USD',
            summary: 'Mass evacuation of over 1.15 million people prevented casualty levels seen in 1999.'
          }
        ],
        geologicalOrClimaticFactor: 'Concave coastal geometry + very shallow continental shelf (<30m depth over 60km offshore) + high tidal range.',
        populationExposed: '18.4 Million in coastal lowlands',
        recommendedMitigation: 'Multi-purpose cyclone shelters at 1.5km intervals, automated early warning sirens, mangrove bio-shield restoration along Kendrapara.'
      },
      {
        id: 'in-kutch-gujarat',
        rank: 2,
        name: 'Gujarat Saurashtra & Kutch Basin (Bhuj, Kandla, Naliya)',
        region: 'Gujarat State',
        country: 'India',
        coordinates: { lat: 23.25, lon: 69.67 },
        impactRadiusKm: 85,
        primaryHazard: 'multi_hazard',
        hazardTypes: ['earthquake', 'cyclone', 'surge'],
        riskScore: 95,
        riskLevel: 'extreme',
        recordPeakEvent: '2001 Bhuj M7.7 Intraplate Earthquake & 1998 Kandla Super Cyclone',
        whyHighestRisk: 'Dual extreme hazard intersection: sits directly on the active intraplate Kutch Mainland Fault (KMF) and Allah Bund fault system, while also forming the primary landfall funnel for Arabian Sea tropical cyclones transitioning into Gujarat.',
        keyDisasters: [
          {
            eventName: '2001 Gujarat (Bhuj) Earthquake',
            year: 2001,
            intensityOrMagnitude: 'Mw 7.7 (Epicenter near Chobari, depth 16 km)',
            casualties: '20,085 fatalities, 166,000 injured',
            economicLoss: '$7.5 Billion USD',
            summary: 'Level 10 Mercalli shaking flattened Bhuj, Anjar, and Bachau; demolished 340,000 buildings.'
          },
          {
            eventName: '1998 Gujarat (Kandla) Cyclone',
            year: 1998,
            intensityOrMagnitude: 'Extremely Severe Cyclone (165 km/h, 958 hPa)',
            casualties: '10,000+ fatalities (mostly port workers)',
            economicLoss: '$3.0 Billion USD',
            summary: 'A 5-meter storm surge struck Kandla Port and salt pan labor settlements without sufficient early warning.'
          },
          {
            eventName: 'Cyclone Biparjoy',
            year: 2023,
            intensityOrMagnitude: 'Extremely Severe Cyclone (140 km/h landfall at Jakhau)',
            casualties: 'Minimal due to 100,000+ preemptive evacuations',
            economicLoss: '$1.2 Billion USD',
            summary: 'Longest-lived cyclone in Arabian Sea (13 days); caused extensive power grid damage across Kutch.'
          }
        ],
        geologicalOrClimaticFactor: 'East-west trending compressive rift faults (Kutch Mainland Fault, Katrol Hill Fault) + Arabian Sea thermal warming.',
        populationExposed: '7.8 Million across Kutch and Saurashtra ports',
        recommendedMitigation: 'Seismic Zone V building enforcement, subterranean power grid cabling in cyclone path, port storm wall reinforcement.'
      },
      {
        id: 'in-sundarbans',
        rank: 3,
        name: 'West Bengal & Sundarbans Delta (Sagar Island, Digha, Kakdwip)',
        region: 'West Bengal State',
        country: 'India',
        coordinates: { lat: 21.80, lon: 88.10 },
        impactRadiusKm: 75,
        primaryHazard: 'cyclone',
        hazardTypes: ['cyclone', 'surge'],
        riskScore: 93,
        riskLevel: 'extreme',
        recordPeakEvent: '2020 Super Cyclone Amphan (185 km/h at landfall, 950 hPa) & 1737 Hooghly Event',
        whyHighestRisk: 'The world’s largest river delta situated barely 1 to 2 meters above mean sea level. Highly porous embankment network of over 3,500 km constantly erodes under cyclonic storm surges, driving long-term soil salinization and tidal river inundation.',
        keyDisasters: [
          {
            eventName: 'Super Cyclone Amphan',
            year: 2020,
            intensityOrMagnitude: 'Super Cyclone (Peak 260 km/h, Landfall 185 km/h)',
            casualties: '128 fatalities (West Bengal & Bangladesh)',
            economicLoss: '$13.5 Billion USD',
            summary: 'Devastated 28% of the Sundarbans mangrove forest and flooded Kolkata with 130 km/h wind gusts.'
          },
          {
            eventName: 'Very Severe Cyclone Yaas',
            year: 2021,
            intensityOrMagnitude: 'Very Severe Cyclone (140 km/h, 970 hPa)',
            casualties: '20 fatalities (1.5M evacuated)',
            economicLoss: '$2.8 Billion USD',
            summary: 'Triggered high spring tides breaching 140 embankments across South & North 24 Parganas.'
          },
          {
            eventName: '1737 Calcutta / Hooghly Cyclone',
            year: 1737,
            intensityOrMagnitude: 'Historical Super Cyclone & 12m Surge',
            casualties: 'Estimated 300,000 fatalities',
            economicLoss: 'Total colonial fleet destruction',
            summary: 'Deadliest storm surge in early recorded Indian history; destroyed colonial port and settlements.'
          }
        ],
        geologicalOrClimaticFactor: 'Extremely flat Gangetic deltaic silt, tidal amplification in narrow estuaries, and sea-level rise exceeding 4.5 mm/year.',
        populationExposed: '5.2 Million island and delta residents',
        recommendedMitigation: 'Geotextile-reinforced embankments, mangrove reforestation (Rhizophora mucronata), solar micro-grids for cyclone resilience.'
      }
    ]
  },
  {
    id: 'usa',
    name: 'United States',
    code: 'USA',
    flag: '🇺🇸',
    basinRegion: 'Americas',
    center: { lat: 37.0, lon: -95.7 },
    defaultZoom: 4,
    totalHistoricalEventsOnRecord: 215,
    mostFrequentHazard: 'Atlantic / Gulf Coast Hurricanes & Pacific Rim / San Andreas Seismicity',
    countryOverview: 'The US experiences both the highest volume of multi-billion dollar tropical cyclone disasters in the Atlantic/Gulf basins and intense seismic risk along the Pacific San Andreas and Cascadia subduction zones.',
    officialDataSources: ['NOAA National Hurricane Center (NHC)', 'USGS Earthquake Hazards Program', 'FEMA'],
    topRiskPlaces: [
      {
        id: 'us-south-florida',
        rank: 1,
        name: 'South Florida & Florida Keys (Miami-Dade, Monroe, Broward)',
        region: 'Florida',
        country: 'United States',
        coordinates: { lat: 25.76, lon: -80.19 },
        impactRadiusKm: 90,
        primaryHazard: 'cyclone',
        hazardTypes: ['cyclone', 'surge'],
        riskScore: 97,
        riskLevel: 'critical',
        recordPeakEvent: '1935 Labor Day Hurricane (892 hPa record low pressure, 185 mph / 295 km/h)',
        whyHighestRisk: 'Enormous asset density ($3.5 Trillion in coastal infrastructure) sitting on porous limestone geology with elevation rarely exceeding 2 meters above sea level. Straight path for intense Category 4-5 Atlantic hurricanes originating off Cape Verde.',
        keyDisasters: [
          {
            eventName: 'Hurricane Andrew',
            year: 1992,
            intensityOrMagnitude: 'Category 5 (165 mph sustained, 922 hPa)',
            casualties: '65 fatalities',
            economicLoss: '$27.3 Billion USD ($55B inflation-adjusted)',
            summary: 'Flattened Homestead and southern Miami-Dade, destroying over 63,000 homes and revolutionizing Florida building codes.'
          },
          {
            eventName: 'Hurricane Irma',
            year: 2017,
            intensityOrMagnitude: 'Category 5 peak / Cat 4 Florida landfall (130 mph)',
            casualties: '134 fatalities',
            economicLoss: '$77.2 Billion USD',
            summary: 'Triggered the largest evacuation in US history (6.5 million people); inundated the Florida Keys and downtown Miami.'
          },
          {
            eventName: '1935 Labor Day Hurricane',
            year: 1935,
            intensityOrMagnitude: 'Category 5 (892 hPa, 185 mph wind)',
            casualties: '408 fatalities (primarily WWI veterans)',
            economicLoss: '$100 Million USD (1935 value)',
            summary: 'Strongest hurricane landfall in US history by atmospheric pressure; destroyed the Overseas Railroad.'
          }
        ],
        geologicalOrClimaticFactor: 'Biscayne aquifer limestone porosity prevents traditional seawall efficacy; Gulf Stream thermal fuel accelerates storms.',
        populationExposed: '6.2 Million residents in Miami metro area',
        recommendedMitigation: 'High-velocity hurricane zone (HVHZ) building code enforcement, storm-surge tidal valves, elevated electrical substations.'
      },
      {
        id: 'us-louisiana-gulf',
        rank: 2,
        name: 'Louisiana Gulf Coast (New Orleans, Plaquemines, Terrebonne)',
        region: 'Louisiana',
        country: 'United States',
        coordinates: { lat: 29.95, lon: -90.07 },
        impactRadiusKm: 80,
        primaryHazard: 'cyclone',
        hazardTypes: ['cyclone', 'surge'],
        riskScore: 95,
        riskLevel: 'extreme',
        recordPeakEvent: '2005 Hurricane Katrina (Category 5 peak, 8.5m surge breached 53 levee points)',
        whyHighestRisk: 'Bowl topography with much of metropolitan New Orleans 1 to 2 meters below sea level. Severe wetland coastal erosion (losing 1 football field of marsh every 100 minutes) eliminates natural friction buffers against Gulf storm surges.',
        keyDisasters: [
          {
            eventName: 'Hurricane Katrina',
            year: 2005,
            intensityOrMagnitude: 'Category 5 peak / Cat 3 landfall (920 hPa, 28-foot surge)',
            casualties: '1,833 fatalities',
            economicLoss: '$125 Billion USD ($190B+ inflation-adjusted)',
            summary: 'Catastrophic levee failures submerged 80% of New Orleans; displaced over 400,000 people.'
          },
          {
            eventName: 'Hurricane Ida',
            year: 2021,
            intensityOrMagnitude: 'Category 4 (150 mph / 240 km/h landfall, 929 hPa)',
            casualties: '107 fatalities across US',
            economicLoss: '$75.2 Billion USD',
            summary: 'Tied for 5th strongest hurricane to ever make landfall in the US; left entire city of New Orleans without power for weeks.'
          },
          {
            eventName: 'Hurricane Camille',
            year: 1969,
            intensityOrMagnitude: 'Category 5 (175 mph sustained, 900 hPa)',
            casualties: '259 fatalities',
            economicLoss: '$1.42 Billion USD',
            summary: 'Unprecedented 24-foot storm surge swept away beachfront communities along the Gulf Coast.'
          }
        ],
        geologicalOrClimaticFactor: 'Sediment compaction subsidence (-10 mm/year) + warm Loop Current eddy heat content in Gulf of Mexico.',
        populationExposed: '2.1 Million across south Louisiana bayous and metro',
        recommendedMitigation: 'US Army Corps Hurricane & Storm Damage Risk Reduction System (HSDRRS), coastal wetland marsh diversions.'
      },
      {
        id: 'us-california-fault',
        rank: 3,
        name: 'California San Andreas Fault Corridor (San Francisco Bay & Los Angeles Basin)',
        region: 'California',
        country: 'United States',
        coordinates: { lat: 37.77, lon: -122.42 },
        impactRadiusKm: 85,
        primaryHazard: 'earthquake',
        hazardTypes: ['earthquake'],
        riskScore: 94,
        riskLevel: 'extreme',
        recordPeakEvent: '1906 Great San Francisco Earthquake (Mw 7.9, 470 km fault rupture)',
        whyHighestRisk: 'The Pacific and North American tectonic plates grind past each other along the 1,200 km San Andreas fault zone. Major locked segments (Hayward Fault, Southern San Andreas) are overdue for a Mw 7.5+ rupture running through massive urban corridors.',
        keyDisasters: [
          {
            eventName: '1906 Great San Francisco Earthquake & Fire',
            year: 1906,
            intensityOrMagnitude: 'Mw 7.9 (Slip of up to 6.4 meters, Mercalli XI)',
            casualties: '3,000+ fatalities',
            economicLoss: '$524 Million USD ($16B+ inflation-adjusted)',
            summary: 'Ruptured 470 km of San Andreas fault; resulting fires burned 80% of San Francisco.'
          },
          {
            eventName: '1994 Northridge Earthquake',
            year: 1994,
            intensityOrMagnitude: 'Mw 6.7 (Blind thrust fault, peak acceleration 1.82g)',
            casualties: '57 fatalities, 8,700 injured',
            economicLoss: '$49 Billion USD',
            summary: 'Collapsed major freeway bridges (I-10), parking structures, and non-ductile concrete buildings in LA.'
          },
          {
            eventName: '1989 Loma Prieta ("World Series") Quake',
            year: 1989,
            intensityOrMagnitude: 'Mw 6.9 (Santa Cruz Mountains, depth 19 km)',
            casualties: '63 fatalities, 3,757 injured',
            economicLoss: '$10 Billion USD',
            summary: 'Collapsed upper deck of Nimitz Freeway (Cypress Structure) in Oakland and damaged Bay Bridge.'
          }
        ],
        geologicalOrClimaticFactor: 'Right-lateral strike-slip plate boundary with shallow focal depths (<15 km) and bay mud soil liquefaction zones.',
        populationExposed: '18 Million across Bay Area and Southern California',
        recommendedMitigation: 'ShakeAlert early earthquake warning app integration, mandatory soft-story soft retrofit ordinances, seismic gas shutoff valves.'
      }
    ]
  },
  {
    id: 'japan',
    name: 'Japan',
    code: 'JPN',
    flag: '🇯🇵',
    basinRegion: 'East Asia',
    center: { lat: 36.2, lon: 138.2 },
    defaultZoom: 5,
    totalHistoricalEventsOnRecord: 240,
    mostFrequentHazard: 'Subduction Zone Earthquakes & Pacific Super Typhoons',
    countryOverview: 'Situated at the junction of 4 tectonic plates (Pacific, North American, Eurasian, and Philippine Sea plates), Japan faces the world’s most acute combination of megathrust earthquakes, giant tsunamis, and Category 5 Western Pacific typhoons.',
    officialDataSources: ['Japan Meteorological Agency (JMA)', 'National Research Institute for Earth Science and Disaster Resilience (NIED)'],
    topRiskPlaces: [
      {
        id: 'jp-tokyo-kanto',
        rank: 1,
        name: 'Tokyo Metropolitan Area & Kanto Plain (Tokyo, Yokohama, Chiba)',
        region: 'Kanto Region',
        country: 'Japan',
        coordinates: { lat: 35.68, lon: 139.76 },
        impactRadiusKm: 65,
        primaryHazard: 'multi_hazard',
        hazardTypes: ['earthquake', 'cyclone', 'tsunami'],
        riskScore: 99,
        riskLevel: 'critical',
        recordPeakEvent: '1923 Great Kanto Earthquake (M7.9, 142,800 fatalities & firestorm)',
        whyHighestRisk: 'The world’s most populous metropolitan area (38 million people) situated immediately above the Sagami Trough subduction zone. JMA estimates a 70% probability of a direct Southern Kanto inland M7+ earthquake in the next 30 years.',
        keyDisasters: [
          {
            eventName: '1923 Great Kanto Earthquake',
            year: 1923,
            intensityOrMagnitude: 'Mw 7.9 (Sagami Trough megathrust, Shindo 7)',
            casualties: '142,800 fatalities or missing',
            economicLoss: '$4.5 Billion USD (equivalent to 1/3 of Japan’s GDP in 1923)',
            summary: 'Triggered catastrophic fire tornadoes and tsunamis that obliterated Tokyo and Yokohama.'
          },
          {
            eventName: 'Typhoon Hagibis',
            year: 2019,
            intensityOrMagnitude: 'Category 5 peak / Cat 2 landfall (915 hPa peak, 1,000mm rain)',
            casualties: '100 fatalities',
            economicLoss: '$15.0 Billion USD',
            summary: 'Broke all-time rainfall records across Kanto; flooded 140 rivers and disrupted high-speed Shinkansen network.'
          },
          {
            eventName: 'Typhoon Faxai',
            year: 2019,
            intensityOrMagnitude: 'Very Strong Typhoon (207 km/h gust at Chiba)',
            casualties: '3 fatalities, 900,000 homes blacked out',
            economicLoss: '$9.0 Billion USD',
            summary: 'Collapsed two major power transmission towers in Chiba; caused prolonged summer heat stroke crisis.'
          }
        ],
        geologicalOrClimaticFactor: 'Triple plate subduction junction beneath the Boso Peninsula + Tokyo Lowland deltaic alluvium soil.',
        populationExposed: '38.5 Million in Greater Tokyo Area',
        recommendedMitigation: 'Metropolitan Area Outer Underground Discharge Channel (G-CANS), base-isolation skyscraper dampers, community firebreak boulevards.'
      },
      {
        id: 'jp-tohoku-sanriku',
        rank: 2,
        name: 'Tohoku Sanriku Coast (Miyagi, Iwate, Fukushima)',
        region: 'Tohoku Region',
        country: 'Japan',
        coordinates: { lat: 38.27, lon: 140.87 },
        impactRadiusKm: 85,
        primaryHazard: 'tsunami',
        hazardTypes: ['earthquake', 'tsunami'],
        riskScore: 97,
        riskLevel: 'critical',
        recordPeakEvent: '2011 Great East Japan Earthquake & Tsunami (Mw 9.1, 40.5m peak tsunami run-up)',
        whyHighestRisk: 'The Sanriku coastline is characterized by deep, narrow ria bays (funnel-shaped inlets) that compress approaching tsunami waves, multiplying offshore wave heights by 3 to 4 times as they strike land.',
        keyDisasters: [
          {
            eventName: '2011 Great East Japan Earthquake & Tsunami',
            year: 2011,
            intensityOrMagnitude: 'Mw 9.1 (4th largest earthquake recorded in modern history, 50m fault slip)',
            casualties: '19,759 dead, 2,553 missing',
            economicLoss: '$235 Billion USD (Costliest natural disaster in world history)',
            summary: 'A 40.5m tsunami overtopped sea walls, destroyed towns (Rikuzentakata, Minamisanriku), and caused Fukushima Daiichi nuclear disaster.'
          },
          {
            eventName: '1896 Meiji-Sanriku Tsunami',
            year: 1896,
            intensityOrMagnitude: 'Mw 8.5 (Tsunami earthquake with slow rupture, 38.2m wave)',
            casualties: '22,000+ fatalities',
            economicLoss: 'Complete coastal community wipeout',
            summary: 'Gentle shaking deceived villagers; 35 minutes later giant waves inundated the entire coast.'
          },
          {
            eventName: '1933 Showa-Sanriku Earthquake',
            year: 1933,
            intensityOrMagnitude: 'Mw 8.4 (Outer-trench normal faulting, 28.7m tsunami)',
            casualties: '3,064 fatalities',
            economicLoss: 'Heavy regional fishing fleet loss',
            summary: 'Outer-rise rupture spawned severe tsunami waves hitting Iwate and Miyagi.'
          }
        ],
        geologicalOrClimaticFactor: 'Pacific Plate subducting beneath the Okhotsk/North American plate at 8 cm/year + ria coastline hydrodynamics.',
        populationExposed: '5.8 Million in Tohoku coastal municipalities',
        recommendedMitigation: '15-meter reinforced concrete tsunami seawalls, elevated coastal town relocation, S-net seafloor cable observation network.'
      },
      {
        id: 'jp-okinawa-ryukyu',
        rank: 3,
        name: 'Okinawa & Ryukyu Archipelago (Naha, Ishigaki, Miyakojima)',
        region: 'Okinawa Prefecture',
        country: 'Japan',
        coordinates: { lat: 26.21, lon: 127.68 },
        impactRadiusKm: 70,
        primaryHazard: 'cyclone',
        hazardTypes: ['cyclone', 'earthquake', 'tsunami'],
        riskScore: 91,
        riskLevel: 'extreme',
        recordPeakEvent: '1979 Super Typhoon Tip (870 hPa - lowest sea-level pressure ever measured on Earth)',
        whyHighestRisk: 'Situated right along the primary track of intense Category 4-5 Western Pacific typhoons crossing the warm Kuroshio Current, combined with the Ryukyu Trench subduction zone capable of generating M8+ earthquakes.',
        keyDisasters: [
          {
            eventName: 'Typhoon Tip',
            year: 1979,
            intensityOrMagnitude: 'Super Typhoon (870 hPa, 305 km/h sustained wind, 2,220 km diameter)',
            casualties: '99 fatalities across Japan',
            economicLoss: '$480 Million USD',
            summary: 'Largest and most intense tropical cyclone in world history; battered Okinawa before sweeping mainland Japan.'
          },
          {
            eventName: '1771 Great Yaeyama Tsunami',
            year: 1771,
            intensityOrMagnitude: 'M7.4 Submarine Earthquake (Run-up estimated at 85.4m)',
            casualties: '12,000 fatalities (nearly half the population of Ishigaki/Miyako)',
            economicLoss: 'Total agricultural collapse',
            summary: 'Tsunami swept huge coral boulders hundreds of meters inland onto Ishigaki Island.'
          },
          {
            eventName: 'Typhoon Bolaven',
            year: 2012,
            intensityOrMagnitude: 'Category 4 Super Typhoon (910 hPa, 260 km/h gusts)',
            casualties: 'Moderate due to world-class concrete bunker architecture',
            economicLoss: '$1.1 Billion USD',
            summary: 'Direct eye transit over Okinawa with violent winds tearing down power infrastructure.'
          }
        ],
        geologicalOrClimaticFactor: 'Kuroshio current provides uninterrupted ocean heat content (>29°C) + Ryukyu Trench plate convergence.',
        populationExposed: '1.45 Million island inhabitants',
        recommendedMitigation: 'Reinforced concrete monolithic hurricane architecture (100% concrete roofs), underground power cables across Naha.'
      }
    ]
  },
  {
    id: 'philippines',
    name: 'Philippines',
    code: 'PHL',
    flag: '🇵🇭',
    basinRegion: 'East Asia',
    center: { lat: 12.8, lon: 121.7 },
    defaultZoom: 5,
    totalHistoricalEventsOnRecord: 265,
    mostFrequentHazard: 'Western Pacific Super Typhoons & Ring of Fire Seismicity',
    countryOverview: 'Ranked the #1 most disaster-prone country in the World Risk Index. Averages 20 tropical cyclones per year from the warm Western Pacific basin, with 8-9 making devastating landfall, overlaid on the Philippine Fault System and active Ring of Fire volcanism.',
    officialDataSources: ['PAGASA (Philippine Atmospheric, Geophysical and Astronomical Services Administration)', 'PHIVOLCS'],
    topRiskPlaces: [
      {
        id: 'ph-eastern-samar-leyte',
        rank: 1,
        name: 'Eastern Samar & Leyte (Tacloban City, Guiuan, Ormoc)',
        region: 'Eastern Visayas',
        country: 'Philippines',
        coordinates: { lat: 11.24, lon: 125.00 },
        impactRadiusKm: 85,
        primaryHazard: 'cyclone',
        hazardTypes: ['cyclone', 'surge'],
        riskScore: 99,
        riskLevel: 'critical',
        recordPeakEvent: '2013 Super Typhoon Haiyan / Yolanda (315 km/h sustained wind, 895 hPa, 6m storm surge)',
        whyHighestRisk: 'The Pacific gateway of the Philippines: receives initial, unhindered landfalls of fully mature Category 5 Super Typhoons arriving directly from the deep warm waters of the Caroline/Mariana Islands.',
        keyDisasters: [
          {
            eventName: 'Super Typhoon Haiyan (Yolanda)',
            year: 2013,
            intensityOrMagnitude: 'Category 5 Super Typhoon (315 km/h sustained, 380 km/h gusts, 895 hPa)',
            casualties: '6,300+ confirmed dead, 1,061 missing',
            economicLoss: '$5.8 Billion USD',
            summary: 'Deadliest Philippine typhoon in modern history; a tsunami-like 6-meter storm surge decimated downtown Tacloban.'
          },
          {
            eventName: 'Typhoon Rai (Odette)',
            year: 2021,
            intensityOrMagnitude: 'Category 5 Super Typhoon (260 km/h sustained wind)',
            casualties: '407 fatalities',
            economicLoss: '$1.02 Billion USD',
            summary: 'Underwent explosive rapid intensification before leveling Siargao, Southern Leyte, and Bohol.'
          },
          {
            eventName: '1991 Tropical Storm Thelma (Uring)',
            year: 1991,
            intensityOrMagnitude: 'Tropical Storm (Heavy orographic rain in Ormoc)',
            casualties: '5,100+ fatalities',
            economicLoss: '$27 Million USD',
            summary: 'Triggered catastrophic flash floods and landslides in deforested mountains above Ormoc City.'
          }
        ],
        geologicalOrClimaticFactor: 'Warm Western Pacific Pool sea surface temperatures (>30°C) + funnel-shaped San Pedro Bay bathymetry.',
        populationExposed: '4.5 Million in Eastern Visayas coastal lowlands',
        recommendedMitigation: 'Evacuation storm surge towers, no-build 40-meter coastal buffer zones, radar-linked Doppler early warning network.'
      },
      {
        id: 'ph-metro-manila',
        rank: 2,
        name: 'Metro Manila & Marikina Valley Fault System',
        region: 'National Capital Region',
        country: 'Philippines',
        coordinates: { lat: 14.60, lon: 120.98 },
        impactRadiusKm: 60,
        primaryHazard: 'multi_hazard',
        hazardTypes: ['earthquake', 'cyclone', 'surge'],
        riskScore: 96,
        riskLevel: 'extreme',
        recordPeakEvent: 'West Valley Fault (M7.2 "Big One" pending) & 2009 Typhoon Ketsana (Ondoy)',
        whyHighestRisk: 'A hyper-dense megacity of 14 million people built on the alluvial muds of the Pasig-Marikina river basin between Manila Bay and Laguna de Bay. The active West Valley Fault transects the urban core, with a recurrence interval of 400-500 years due now.',
        keyDisasters: [
          {
            eventName: 'Typhoon Ketsana (Ondoy)',
            year: 2009,
            intensityOrMagnitude: 'Tropical Storm (455 mm rain in 24 hours, record deluges)',
            casualties: '747 fatalities',
            economicLoss: '$1.09 Billion USD',
            summary: 'Submerged 80% of Metro Manila under water up to rooftop levels; stranded hundreds of thousands.'
          },
          {
            eventName: '1990 Luzon Earthquake',
            year: 1990,
            intensityOrMagnitude: 'Mw 7.7 (Philippine Fault rupture, 125 km strike-slip)',
            casualties: '1,621 fatalities, 3,513 injured',
            economicLoss: '$369 Million USD',
            summary: 'Collapsed Hyatt Terraces Hotel in Baguio and damaged numerous high-rises in Manila.'
          },
          {
            eventName: 'Typhoon Vamco (Ulysses)',
            year: 2020,
            intensityOrMagnitude: 'Category 4 Typhoon (155 km/h, 955 hPa)',
            casualties: '102 fatalities',
            economicLoss: '$420 Million USD',
            summary: 'Severe dam spill discharges flooded Marikina and Cagayan Valley, repeating Ondoy-level inundation.'
          }
        ],
        geologicalOrClimaticFactor: 'Alluvial river silt prone to severe liquefaction + West Valley Fault dextral strike-slip rupture potential.',
        populationExposed: '14.2 Million across 16 cities of NCR',
        recommendedMitigation: 'Metro Manila Earthquake Impact Reduction Plan (MMEIRP), Marikina River flood retention basins, high-density school retrofits.'
      },
      {
        id: 'ph-bicol-peninsula',
        rank: 3,
        name: 'Bicol Peninsula & Albay (Legazpi City, Naga, Catanduanes)',
        region: 'Bicol Region',
        country: 'Philippines',
        coordinates: { lat: 13.14, lon: 123.74 },
        impactRadiusKm: 75,
        primaryHazard: 'multi_hazard',
        hazardTypes: ['cyclone', 'earthquake'],
        riskScore: 94,
        riskLevel: 'extreme',
        recordPeakEvent: '2020 Super Typhoon Goni / Rolly (315 km/h sustained wind, 884 hPa) & Mayon Lahars',
        whyHighestRisk: 'The volcanic-meteorological trap: Super typhoons make landfall on Catanduanes and Albay while torrential rain washes millions of cubic meters of volcanic ash from active Mount Mayon into deadly lahar mudslides.',
        keyDisasters: [
          {
            eventName: 'Super Typhoon Goni (Rolly)',
            year: 2020,
            intensityOrMagnitude: 'Category 5 Super Typhoon (315 km/h 1-min sustained, 884 hPa)',
            casualties: '31 fatalities (preemptive evacuation of 400,000)',
            economicLoss: '$415 Million USD',
            summary: 'Tied for strongest landfalling tropical cyclone in recorded world history with Haiyan and Meranti.'
          },
          {
            eventName: 'Typhoon Durian (Reming)',
            year: 2006,
            intensityOrMagnitude: 'Category 4 Typhoon (195 km/h, 938 hPa)',
            casualties: '1,500+ fatalities (mostly from volcanic mudflows)',
            economicLoss: '$130 Million USD',
            summary: 'Heavy rainfall remobilized loose pyroclastic deposits on Mayon Volcano, burying entire villages in Padang and Guinobatan.'
          },
          {
            eventName: 'Typhoon Angela (Rosing)',
            year: 1995,
            intensityOrMagnitude: 'Category 5 Super Typhoon (290 km/h, 910 hPa)',
            casualties: '936 fatalities',
            economicLoss: '$240 Million USD',
            summary: 'Catastrophic direct strike across Catanduanes and Camarines Sur.'
          }
        ],
        geologicalOrClimaticFactor: 'Mayon Volcano active pyroclastic slope deposits + Catanduanes headland exposure to typhoons.',
        populationExposed: '6.1 Million in Bicol Region',
        recommendedMitigation: 'Sabodams on Mayon flanks to trap lahar flows, permanent danger zone enforcement, typhoon-proof evacuation centers.'
      }
    ]
  },
  {
    id: 'bangladesh',
    name: 'Bangladesh',
    code: 'BGD',
    flag: '🇧🇩',
    basinRegion: 'South Asia',
    center: { lat: 23.8, lon: 90.4 },
    defaultZoom: 6,
    totalHistoricalEventsOnRecord: 170,
    mostFrequentHazard: 'Bay of Bengal Super Cyclones & Catastrophic Oceanic Surges',
    countryOverview: 'Topographically the most exposed nation on Earth to tropical storm surges. Two-thirds of Bangladesh is less than 5 meters above sea level, with a dense population living along the funnel-shaped apex of the Bay of Bengal.',
    officialDataSources: ['Bangladesh Meteorological Department (BMD)', 'Cyclone Preparedness Programme (CPP)'],
    topRiskPlaces: [
      {
        id: 'bd-chittagong-cox',
        rank: 1,
        name: 'Chittagong Coastal Belt & Cox’s Bazar',
        region: 'Chittagong Division',
        country: 'Bangladesh',
        coordinates: { lat: 22.34, lon: 91.83 },
        impactRadiusKm: 80,
        primaryHazard: 'cyclone',
        hazardTypes: ['cyclone', 'surge'],
        riskScore: 99,
        riskLevel: 'critical',
        recordPeakEvent: '1970 Bhola Cyclone (300,000–500,000 fatalities, deadliest tropical cyclone in human history)',
        whyHighestRisk: 'The northern tip of the Bay of Bengal acts as an oceanic funnel where incoming cyclone storm surges meet the gigantic discharge of the Ganges-Brahmaputra-Meghna river delta, producing surges up to 6–10 meters.',
        keyDisasters: [
          {
            eventName: '1970 Great Bhola Cyclone',
            year: 1970,
            intensityOrMagnitude: 'Category 4 Cyclone (205 km/h wind, 966 hPa, 10m surge)',
            casualties: '300,000 – 500,000 fatalities',
            economicLoss: '$86 Million USD (1970 value)',
            summary: 'Deadliest tropical cyclone in recorded human history; wiped out islands in the Meghna estuary and triggered political transformation.'
          },
          {
            eventName: '1991 Bangladesh Cyclone (BOB 01)',
            year: 1991,
            intensityOrMagnitude: 'Category 5 Super Cyclone (260 km/h wind, 918 hPa, 6m surge)',
            casualties: '138,866 fatalities',
            economicLoss: '$1.78 Billion USD',
            summary: 'Surge inundated Chittagong airport and naval base; drowned 100,000+ livestock and submerged Kutubdia.'
          },
          {
            eventName: 'Cyclone Mocha',
            year: 2023,
            intensityOrMagnitude: 'Extremely Severe Cyclone (280 km/h peak, 938 hPa)',
            casualties: 'Low in BD due to 700,000 evacuations (severe in Myanmar)',
            economicLoss: '$1.5 Billion USD regional',
            summary: 'Narrowly spared Cox’s Bazar refugee camps from direct core impact; demolished thousands of bamboo shelters on St. Martin’s Island.'
          }
        ],
        geologicalOrClimaticFactor: 'Triangular bay apex geometry + high astronomical tides (up to 4m) aligning with cyclonic surges.',
        populationExposed: '14.5 Million in coastal Chittagong and offshore chars',
        recommendedMitigation: 'Cyclone Preparedness Programme (CPP) community volunteer network, 5,000+ elevated multi-tier cyclone shelters (killas).'
      },
      {
        id: 'bd-barisal-meghna',
        rank: 2,
        name: 'Barisal & Patuakhali Coast (Meghna Estuary & Kuakata)',
        region: 'Barisal Division',
        country: 'Bangladesh',
        coordinates: { lat: 22.70, lon: 90.37 },
        impactRadiusKm: 75,
        primaryHazard: 'surge',
        hazardTypes: ['cyclone', 'surge'],
        riskScore: 95,
        riskLevel: 'extreme',
        recordPeakEvent: '2007 Cyclone Sidr (Category 5, 260 km/h wind, 944 hPa, 5-6m surge)',
        whyHighestRisk: 'Consists of hundreds of low-lying chars (silt islands) and riverine delta plains intersected by hundreds of channels. Completely vulnerable to water surges rushing up the Meghna river mouth.',
        keyDisasters: [
          {
            eventName: 'Cyclone Sidr',
            year: 2007,
            intensityOrMagnitude: 'Category 5 Cyclone (260 km/h wind, 944 hPa)',
            casualties: '4,234 confirmed dead (CPP saved an estimated 40,000)',
            economicLoss: '$1.7 Billion USD',
            summary: 'Direct strike on Bagerhat, Barguna, and Patuakhali; destroyed 1.5 million houses.'
          },
          {
            eventName: 'Cyclone Aila',
            year: 2009,
            intensityOrMagnitude: 'Severe Cyclonic Storm (120 km/h, 967 hPa, 3m surge)',
            casualties: '339 fatalities',
            economicLoss: '$1.0 Billion USD',
            summary: 'Breached mud polders, flooding villages with salt water that remained submerged for over 2 years.'
          },
          {
            eventName: 'Cyclone Remal',
            year: 2024,
            intensityOrMagnitude: 'Severe Cyclonic Storm (130 km/h, 976 hPa)',
            casualties: '16 fatalities (800,000 evacuated)',
            economicLoss: '$600 Million USD',
            summary: 'Slow-moving cyclone brought 48 hours of intense tidal flooding across Patuakhali and coastal polders.'
          }
        ],
        geologicalOrClimaticFactor: 'Unconsolidated deltaic silt subject to active riverine erosion + zero natural elevation barrier.',
        populationExposed: '9.3 Million in Barisal coastal division',
        recommendedMitigation: 'Polder embankment raising to +6m, early warning megaphones, solar water desalination for salinized coastal aquifers.'
      },
      {
        id: 'bd-khulna-sundarbans',
        rank: 3,
        name: 'Khulna & Sundarbans Mangrove Frontier (Mongla, Satkhira, Shyamnagar)',
        region: 'Khulna Division',
        country: 'Bangladesh',
        coordinates: { lat: 22.82, lon: 89.54 },
        impactRadiusKm: 70,
        primaryHazard: 'cyclone',
        hazardTypes: ['cyclone', 'surge'],
        riskScore: 91,
        riskLevel: 'extreme',
        recordPeakEvent: '2020 Cyclone Amphan & 1988 Khulna Cyclone',
        whyHighestRisk: 'The frontline buffer between the open sea and southwestern Bangladesh. Rising sea levels and cyclonic salinity intrusions have contaminated drinking water sources, while shrimp farming has weakened earthen dikes.',
        keyDisasters: [
          {
            eventName: 'Cyclone Amphan',
            year: 2020,
            intensityOrMagnitude: 'Super Cyclone (185 km/h at landfall, 950 hPa)',
            casualties: '26 fatalities in BD (huge asset destruction)',
            economicLoss: '$1.5 Billion USD (Bangladesh sector)',
            summary: 'Breached 150 km of coastal embankments in Satkhira and Khulna; ruined thousands of freshwater shrimp gher ponds.'
          },
          {
            eventName: '1988 Khulna-Sundarbans Cyclone',
            year: 1988,
            intensityOrMagnitude: 'Severe Cyclone (160 km/h, 4.5m surge)',
            casualties: '5,708 fatalities',
            economicLoss: '$400 Million USD',
            summary: 'Inundated the southwestern Sundarbans and Mongla port.'
          },
          {
            eventName: 'Cyclone Bulbul',
            year: 2019,
            intensityOrMagnitude: 'Very Severe Cyclone (140 km/h, 975 hPa)',
            casualties: '24 fatalities',
            economicLoss: '$300 Million USD',
            summary: 'Mangrove forest absorbed bulk of the kinetic energy, demonstrating vital ecosystem defense value.'
          }
        ],
        geologicalOrClimaticFactor: 'Tidal saline intrusion up to 100 km inland + degradation of natural mangrove root anchors.',
        populationExposed: '4.8 Million in southwestern coastal fringe',
        recommendedMitigation: 'Mangrove ecological conservation zone, rainwater harvesting tanks, climate-resilient floating agricultural beds (dhap).'
      }
    ]
  },
  {
    id: 'indonesia',
    name: 'Indonesia',
    code: 'IDN',
    flag: '🇮🇩',
    basinRegion: 'East Asia',
    center: { lat: -0.78, lon: 113.9 },
    defaultZoom: 5,
    totalHistoricalEventsOnRecord: 235,
    mostFrequentHazard: 'Sunda Megathrust Earthquakes & Volcanic / Tectonic Tsunamis',
    countryOverview: 'Stretching over 5,000 km across the Pacific Ring of Fire and Alpide Belt. The Sunda Subduction Megathrust is capable of generating M9+ earthquakes and transatlantic tsunamis, alongside 127 active volcanoes.',
    officialDataSources: ['BMKG (Badan Meteorologi, Klimatologi, dan Geofisika)', 'BNPB'],
    topRiskPlaces: [
      {
        id: 'id-sumatra-aceh',
        rank: 1,
        name: 'Sumatra Subduction Megathrust & Aceh (Banda Aceh, Nias, Padang)',
        region: 'Sumatra Island',
        country: 'Indonesia',
        coordinates: { lat: 5.55, lon: 95.32 },
        impactRadiusKm: 100,
        primaryHazard: 'tsunami',
        hazardTypes: ['earthquake', 'tsunami'],
        riskScore: 99,
        riskLevel: 'critical',
        recordPeakEvent: '2004 Indian Ocean Mw 9.1 Megathrust Earthquake & 30m Tsunami',
        whyHighestRisk: 'The Indo-Australian plate subducts obliquely beneath the Sunda plate at 5–6 cm/year along the 1,600 km Sunda Trench. Ruptures here release colossal strain energy, generating devastating ocean-wide tsunamis with minimal warning time (<20 mins).',
        keyDisasters: [
          {
            eventName: '2004 Boxing Day Indian Ocean Earthquake & Tsunami',
            year: 2004,
            intensityOrMagnitude: 'Mw 9.1–9.3 (Fault slip of up to 20 meters over 1,300 km)',
            casualties: '227,898 total fatalities (167,540 in Aceh alone)',
            economicLoss: '$15.0 Billion USD',
            summary: 'Deadliest tsunami in world history; obliterated coastal Banda Aceh, Meulaboh, and affected 14 countries.'
          },
          {
            eventName: '2005 Nias–Simeulue Earthquake',
            year: 2005,
            intensityOrMagnitude: 'Mw 8.6 (Depth 30 km, rupture length 300 km)',
            casualties: '1,313 fatalities',
            economicLoss: '$1.0 Billion USD',
            summary: 'Uplifted parts of Nias Island by up to 2.8 meters; destroyed Gunung Sitoli.'
          },
          {
            eventName: '2009 Padang Earthquake',
            year: 2009,
            intensityOrMagnitude: 'Mw 7.6 (Intermediate depth 81 km, severe shaking)',
            casualties: '1,115 fatalities, 2,900 injured',
            economicLoss: '$2.3 Billion USD',
            summary: 'Triggered extensive landslides burying entire villages in Padang Pariaman.'
          }
        ],
        geologicalOrClimaticFactor: 'Oblique subduction slip partition into Sunda megathrust and the 1,900 km Great Sumatran Fault.',
        populationExposed: '9.2 Million in western Sumatra coastal strip',
        recommendedMitigation: 'InaTEWS deep-ocean tsunami bouy network, vertical tsunami escape hills (TES), coastal mangrove bio-shield parks.'
      },
      {
        id: 'id-central-java',
        rank: 2,
        name: 'Central Java & Yogyakarta Fault Corridor (Opak Fault Zone)',
        region: 'Central Java',
        country: 'Indonesia',
        coordinates: { lat: -7.80, lon: 110.36 },
        impactRadiusKm: 65,
        primaryHazard: 'earthquake',
        hazardTypes: ['earthquake'],
        riskScore: 94,
        riskLevel: 'extreme',
        recordPeakEvent: '2006 Yogyakarta Earthquake (Mw 6.3, 5,782 fatalities, 300,000 houses flattened)',
        whyHighestRisk: 'Dense population living directly above active shallow crustal intraplate faults (Opak Fault) coupled with volcanic soil that amplifies ground motion by a factor of 3 to 5.',
        keyDisasters: [
          {
            eventName: '2006 Yogyakarta Earthquake',
            year: 2006,
            intensityOrMagnitude: 'Mw 6.3 (Depth 10 km, shallow crustal strike-slip on Opak Fault)',
            casualties: '5,782 fatalities, 36,000+ injured',
            economicLoss: '$3.1 Billion USD',
            summary: 'Flattened Bantul district and damaged Prambanan ancient temple complex in 20 seconds.'
          },
          {
            eventName: '2018 Palu–Donggala (Sulawesi) Earthquake',
            year: 2018,
            intensityOrMagnitude: 'Mw 7.5 (Palu-Koro Fault, massive soil liquefaction & tsunami)',
            casualties: '4,340 fatalities',
            economicLoss: '$1.3 Billion USD',
            summary: 'Submarine landslides in Palu Bay created a 6m localized tsunami; Balaroa and Petobo underwent total soil liquefaction.'
          },
          {
            eventName: '2022 Cianjur (West Java) Earthquake',
            year: 2022,
            intensityOrMagnitude: 'Mw 5.6 (Very shallow 10 km, Cugenang Fault)',
            casualties: '602 fatalities, 7,700 injured',
            economicLoss: '$500 Million USD',
            summary: 'Severe destruction of non-engineered unreinforced masonry houses in rural West Java.'
          }
        ],
        geologicalOrClimaticFactor: 'Loose volcanic alluvium from Mount Merapi providing extreme soil liquefaction and resonance.',
        populationExposed: '36.5 Million in Central Java urban and rural areas',
        recommendedMitigation: 'BARRATAGA earthquake-resistant timber/masonry construction, fault line zoning setback bylaws.'
      },
      {
        id: 'id-sunda-strait',
        rank: 3,
        name: 'Sunda Strait & Krakatau Volcanic Basin (Banten & Lampung)',
        region: 'Banten & Lampung',
        country: 'Indonesia',
        coordinates: { lat: -6.10, lon: 105.42 },
        impactRadiusKm: 60,
        primaryHazard: 'tsunami',
        hazardTypes: ['tsunami', 'earthquake'],
        riskScore: 92,
        riskLevel: 'extreme',
        recordPeakEvent: '1883 Krakatoa Mega-Eruption (36,417 fatalities, 30m tsunami) & 2018 Anak Krakatau Flank Collapse',
        whyHighestRisk: 'The volcanic strait connects Java and Sumatra. Flank collapses or pyroclastic flow entry from active Anak Krakatau volcano generate silent tsunamis without preceding earthquake shaking warnings.',
        keyDisasters: [
          {
            eventName: '1883 Krakatoa Mega-Colossus Eruption',
            year: 1883,
            intensityOrMagnitude: 'VEI 6 (Explosion heard 4,800 km away, 30–40m tsunami waves)',
            casualties: '36,417 fatalities',
            economicLoss: 'Complete regional destruction (1883 value)',
            summary: 'Pushed volcanic tsunamis that destroyed 165 towns along the coasts of Java and Sumatra; lowered global temperatures for 5 years.'
          },
          {
            eventName: '2018 Anak Krakatau Flank Collapse Tsunami',
            year: 2018,
            intensityOrMagnitude: 'Volcanic Flank Collapse (64 hectares collapsed into sea)',
            casualties: '437 fatalities, 14,059 injured',
            economicLoss: '$250 Million USD',
            summary: 'Struck Anyer, Carita, and Lampung without an earthquake alert while beach concerts were underway.'
          },
          {
            eventName: '1994 Banyuwangi Tsunami',
            year: 1994,
            intensityOrMagnitude: 'Mw 7.8 (Tsunami earthquake, 13.9m run-up)',
            casualties: '250 fatalities',
            economicLoss: '$50 Million USD',
            summary: 'Slow rupture south of Java triggered devastating localized tsunami waves.'
          }
        ],
        geologicalOrClimaticFactor: 'Extensional tectonic rift in Sunda Strait coupled with submarine volcanic edifice instability.',
        populationExposed: '4.1 Million along resort and industrial coastlines of Banten and Lampung',
        recommendedMitigation: 'High-frequency coastal radar monitoring, volcano deformation acoustic sensors, 24/7 coastal siren automation.'
      }
    ]
  },
  {
    id: 'china',
    name: 'China',
    code: 'CHN',
    flag: '🇨🇳',
    basinRegion: 'East Asia',
    center: { lat: 35.8, lon: 104.1 },
    defaultZoom: 4,
    totalHistoricalEventsOnRecord: 220,
    mostFrequentHazard: 'Western Pacific Typhoons & Tibetan Plateau Collision Earthquakes',
    countryOverview: 'Faces massive typhoons along the developed southeastern coast (Pearl River Delta / Fujian) and catastrophic intraplate thrust earthquakes along the Longmenshan fault bordering the Sichuan Basin.',
    officialDataSources: ['China Meteorological Administration (CMA)', 'China Earthquake Administration (CEA)'],
    topRiskPlaces: [
      {
        id: 'cn-pearl-river-delta',
        rank: 1,
        name: 'Guangdong & Pearl River Delta (Shenzhen, Guangzhou, Hong Kong)',
        region: 'Guangdong Province',
        country: 'China',
        coordinates: { lat: 22.54, lon: 114.05 },
        impactRadiusKm: 85,
        primaryHazard: 'cyclone',
        hazardTypes: ['cyclone', 'surge'],
        riskScore: 96,
        riskLevel: 'critical',
        recordPeakEvent: '2018 Super Typhoon Mangkhut (250 km/h gusts, 905 hPa peak, 3.8m storm surge)',
        whyHighestRisk: 'The Greater Bay Area concentrates over 86 million people and $2 Trillion in economic output in low-lying reclaimed lands and estuaries directly exposed to Category 4-5 Western Pacific typhoons entering the South China Sea.',
        keyDisasters: [
          {
            eventName: 'Super Typhoon Mangkhut',
            year: 2018,
            intensityOrMagnitude: 'Category 5 peak / Cat 2 landfall (175 km/h, 945 hPa, 3.8m surge)',
            casualties: '6 fatalities in China (massive early shutdown)',
            economicLoss: '$3.7 Billion USD in Guangdong & HK',
            summary: 'Shattered high-rise skyscraper windows in Shenzhen and flooded Victoria Harbour, Hong Kong.'
          },
          {
            eventName: 'Typhoon Hato',
            year: 2017,
            intensityOrMagnitude: 'Category 3 (185 km/h, 950 hPa at Zhuhai landfall)',
            casualties: '24 fatalities (10 in Macau underground garages)',
            economicLoss: '$6.8 Billion USD',
            summary: 'Triggered 2.3m storm surge coinciding with astronomical high tide, submerging downtown Macau.'
          },
          {
            eventName: '1937 Great Hong Kong Typhoon',
            year: 1937,
            intensityOrMagnitude: 'Category 4 Typhoon (130 mph / 209 km/h wind)',
            casualties: 'Estimated 11,000 fatalities',
            economicLoss: 'Massive fleet and shipyard wipeout',
            summary: 'Surge swept 6 meters through Tolo Harbour, destroying fishing sampans.'
          }
        ],
        geologicalOrClimaticFactor: 'Shallow South China Sea continental shelf + intense urban coastal reclamation below high-tide level.',
        populationExposed: '86 Million in Greater Bay Area megapolis',
        recommendedMitigation: '1-in-200 year tidal sea walls, sponge city permeable urban stormwater soakways, automated subway flood gates.'
      },
      {
        id: 'cn-sichuan-longmenshan',
        rank: 2,
        name: 'Sichuan Longmenshan Fault Zone (Wenchuan, Beichuan, Chengdu)',
        region: 'Sichuan Province',
        country: 'China',
        coordinates: { lat: 31.00, lon: 103.40 },
        impactRadiusKm: 90,
        primaryHazard: 'earthquake',
        hazardTypes: ['earthquake'],
        riskScore: 97,
        riskLevel: 'critical',
        recordPeakEvent: '2008 Great Sichuan / Wenchuan Earthquake (Mw 8.0, 87,587 fatalities)',
        whyHighestRisk: 'The Tibetan Plateau collides eastward into the rigid Sichuan Basin crust along the steep Longmenshan thrust fault. Steep mountainous relief (rising 4,000m in 50 km) triggers massive earthquake-induced landslides, damming rivers into dangerous barrier lakes.',
        keyDisasters: [
          {
            eventName: '2008 Wenchuan Earthquake',
            year: 2008,
            intensityOrMagnitude: 'Mw 8.0 (300 km surface rupture, 9m vertical fault slip)',
            casualties: '87,587 fatalities or missing, 374,643 injured',
            economicLoss: '$150 Billion USD',
            summary: 'Flattened Beichuan and Dujiangyan; triggered 56,000 mountain landslides and created 34 unstable quake lakes (Tangjiashan).'
          },
          {
            eventName: '2013 Lushan (Ya’an) Earthquake',
            year: 2013,
            intensityOrMagnitude: 'Mw 6.6 (Blind thrust fault rupture, depth 12 km)',
            casualties: '196 fatalities, 11,000+ injured',
            economicLoss: '$12 Billion USD',
            summary: 'Severely damaged Lushan county and triggered thousands of highway rockfalls.'
          },
          {
            eventName: '1976 Songpan–Pingwu Earthquakes',
            year: 1976,
            intensityOrMagnitude: 'M7.2 triplet earthquakes in northern Sichuan',
            casualties: '41 fatalities (successfully predicted and evacuated)',
            economicLoss: '$100 Million USD',
            summary: 'Preceded the deadly Tangshan event by days; verified fault slip transfers.'
          }
        ],
        geologicalOrClimaticFactor: 'India-Eurasia continental collision creating compressional crustal shortening >3 mm/year.',
        populationExposed: '21.5 Million in Sichuan sub-mountain valleys',
        recommendedMitigation: 'Landslide early-warning radar slope sensors, emergency barrier lake spillway blasting protocols, strict 8-degree seismic building code.'
      },
      {
        id: 'cn-fujian-taiwan-strait',
        rank: 3,
        name: 'Fujian & Taiwan Strait Coastal Zone (Xiamen, Fuzhou, Quanzhou)',
        region: 'Fujian Province',
        country: 'China',
        coordinates: { lat: 24.48, lon: 118.08 },
        impactRadiusKm: 70,
        primaryHazard: 'cyclone',
        hazardTypes: ['cyclone', 'surge'],
        riskScore: 92,
        riskLevel: 'extreme',
        recordPeakEvent: '2016 Super Typhoon Meranti (315 km/h peak, 890 hPa, Cat 5 at Xiamen)',
        whyHighestRisk: 'The Taiwan Strait acts as a wind funnel that concentrates tropical cyclone wind fields. When typhoons graze or bypass Taiwan’s Central Mountain Range without weakening, they slam directly into Fujian with immense kinetic energy.',
        keyDisasters: [
          {
            eventName: 'Super Typhoon Meranti',
            year: 2016,
            intensityOrMagnitude: 'Category 5 Super Typhoon (Peak 315 km/h, Landfall 230 km/h, 890 hPa)',
            casualties: '47 fatalities (across Taiwan & China)',
            economicLoss: '$4.8 Billion USD in Fujian',
            summary: 'Strongest typhoon to strike Fujian in modern records; toppled giant electrical grid pylons and destroyed 350,000 trees in Xiamen.'
          },
          {
            eventName: 'Typhoon Doksuri',
            year: 2023,
            intensityOrMagnitude: 'Super Typhoon (175 km/h at Jinjiang landfall)',
            casualties: '30+ fatalities (record rainfall pushed inland to Beijing)',
            economicLoss: '$4.3 Billion USD',
            summary: 'Caused severe coastal inundation in Quanzhou before its moisture plume triggered 744 mm rain in northern China.'
          },
          {
            eventName: 'Typhoon Saomai',
            year: 2006,
            intensityOrMagnitude: 'Category 4 Super Typhoon (215 km/h at Cangnan/Fuding border)',
            casualties: '458 fatalities',
            economicLoss: '$2.5 Billion USD',
            summary: 'Wiped out hundreds of fishing vessels sheltered in Shacheng harbor.'
          }
        ],
        geologicalOrClimaticFactor: 'Taiwan Strait Venturi wind funnel effect + shallow waters generating high localized tidal surges.',
        populationExposed: '39.8 Million in Fujian coastal belt',
        recommendedMitigation: 'Fishery harbor storm breakwaters, underground utility ducting, satellite-linked vessel tracking shelter mandate.'
      }
    ]
  },
  {
    id: 'mexico',
    name: 'Mexico',
    code: 'MEX',
    flag: '🇲🇽',
    basinRegion: 'Americas',
    center: { lat: 23.6, lon: -102.5 },
    defaultZoom: 5,
    totalHistoricalEventsOnRecord: 195,
    mostFrequentHazard: 'Eastern Pacific Explosive Hurricanes & Cocos Plate Subduction Quakes',
    countryOverview: 'Surrounded by the hurricane-rich waters of both the Eastern Pacific and the Caribbean/Gulf of Mexico, while its southern coast sits on the Cocos-North America subduction zone responsible for M8+ earthquakes.',
    officialDataSources: ['Servicio Meteorológico Nacional (SMN)', 'Servicio Sismológico Nacional (SSN)', 'CENAPRED'],
    topRiskPlaces: [
      {
        id: 'mx-guerrero-oaxaca',
        rank: 1,
        name: 'Guerrero & Oaxaca Pacific Coast (Acapulco, Puerto Escondido)',
        region: 'Guerrero & Oaxaca',
        country: 'Mexico',
        coordinates: { lat: 16.85, lon: -99.91 },
        impactRadiusKm: 85,
        primaryHazard: 'multi_hazard',
        hazardTypes: ['cyclone', 'earthquake', 'tsunami'],
        riskScore: 98,
        riskLevel: 'critical',
        recordPeakEvent: '2023 Hurricane Otis (Category 5, 270 km/h wind) & 1985 Michoacán M8.0 Subduction Quake',
        whyHighestRisk: 'The Middle America Trench lies just 50 km offshore where the Cocos Plate subducts beneath Mexico. The oceanic waters off Guerrero boast extreme heat content, enabling explosive rapid intensification of hurricanes in under 12 hours.',
        keyDisasters: [
          {
            eventName: 'Hurricane Otis',
            year: 2023,
            intensityOrMagnitude: 'Category 5 Hurricane (Explosive jump from 50 kt to 145 kt in 12h, 922 hPa)',
            casualties: '52 confirmed dead, 32 missing',
            economicLoss: '$16.0 Billion USD',
            summary: 'Strongest landfalling Eastern Pacific hurricane in history; devastated 80% of Acapulco hotels and housing with zero warning window.'
          },
          {
            eventName: '1985 Mexico City / Michoacán Earthquake',
            year: 1985,
            intensityOrMagnitude: 'Mw 8.0 (Subduction thrust off Michoacán/Guerrero coast)',
            casualties: '10,000+ fatalities (amplified in ancient Texcoco lakebed)',
            economicLoss: '$5.0 Billion USD ($13B+ inflation-adjusted)',
            summary: 'Ruptured the subduction trench; deep seismic waves propagated 350 km to collapse hundreds of buildings in Mexico City.'
          },
          {
            eventName: '1997 Hurricane Pauline',
            year: 1997,
            intensityOrMagnitude: 'Category 4 Hurricane (135 mph / 215 km/h, 400 mm rain)',
            casualties: '230–400 fatalities',
            economicLoss: '$448 Million USD',
            summary: 'Triggered catastrophic flash floods and landslides down the steep Sierra Madre del Sur slopes into Acapulco.'
          }
        ],
        geologicalOrClimaticFactor: 'Middle America Trench megathrust slip + warm Pacific oceanic eddy corridor off Gulf of Tehuantepec.',
        populationExposed: '4.5 Million in coastal Guerrero and Oaxaca',
        recommendedMitigation: 'SASMEX seismic early warning system extension, rapid hurricane radar forecasting upgrade, hillside landslide barrier netting.'
      },
      {
        id: 'mx-yucatan-cancun',
        rank: 2,
        name: 'Yucatán Peninsula & Riviera Maya (Cancún, Cozumel, Tulum)',
        region: 'Quintana Roo',
        country: 'Mexico',
        coordinates: { lat: 21.16, lon: -86.85 },
        impactRadiusKm: 80,
        primaryHazard: 'cyclone',
        hazardTypes: ['cyclone', 'surge'],
        riskScore: 94,
        riskLevel: 'extreme',
        recordPeakEvent: '2005 Hurricane Wilma (882 hPa - lowest barometric pressure ever recorded in Atlantic Basin)',
        whyHighestRisk: 'Extremely flat limestone platform jutting directly into the Caribbean Sea. Hurricanes often stall over the warm waters of the Yucatán Channel, subjecting tourist hubs and barrier islands to days of Category 4-5 onslaught.',
        keyDisasters: [
          {
            eventName: 'Hurricane Wilma',
            year: 2005,
            intensityOrMagnitude: 'Category 5 (882 hPa record low, stalled over Cozumel for 24h at Cat 4)',
            casualties: '8 fatalities in Mexico (70,000 tourists evacuated)',
            economicLoss: '$7.5 Billion USD',
            summary: 'Washed away miles of Cancún beaches; inundated luxury hotel strip and left island of Cozumel without power.'
          },
          {
            eventName: 'Hurricane Gilbert',
            year: 1988,
            intensityOrMagnitude: 'Category 5 Hurricane (185 mph / 295 km/h, 888 hPa)',
            casualties: '318 fatalities (across Caribbean and Mexico)',
            economicLoss: '$2.0 Billion USD',
            summary: 'Direct landfall on Cozumel and Playa del Carmen; spawned 7m storm surges.'
          },
          {
            eventName: 'Hurricane Beryl',
            year: 2024,
            intensityOrMagnitude: 'Category 2 at Tulum landfall (preceded by historic Cat 5 in Caribbean)',
            casualties: 'Zero casualties in Quintana Roo due to timely civil defense',
            economicLoss: '$150 Million USD',
            summary: 'Earliest Category 5 Atlantic hurricane on record; crossed over Riviera Maya.'
          }
        ],
        geologicalOrClimaticFactor: 'Porous karst geology without surface rivers prevents pooling runoff but allows ocean water intrusion through cenotes.',
        populationExposed: '2.2 Million residents and millions of seasonal tourists',
        recommendedMitigation: 'Artificial reef breakwater restoration, mandatory hotel storm shutter standards, cenote hydrological monitoring.'
      },
      {
        id: 'mx-baja-california-sur',
        rank: 3,
        name: 'Baja California Sur (Cabo San Lucas, La Paz, San José)',
        region: 'Baja California Sur',
        country: 'Mexico',
        coordinates: { lat: 22.89, lon: -109.91 },
        impactRadiusKm: 65,
        primaryHazard: 'cyclone',
        hazardTypes: ['cyclone', 'surge'],
        riskScore: 90,
        riskLevel: 'extreme',
        recordPeakEvent: '2014 Hurricane Odile (Category 4, 140 mph sustained wind, 918 hPa)',
        whyHighestRisk: 'Located at the southern tip of the Baja California desert peninsula. Recurving Pacific tropical cyclones accelerate directly toward Los Cabos, where fragile arroyo (dry riverbed) settlements are vulnerable to sudden torrential wall-of-water flash floods.',
        keyDisasters: [
          {
            eventName: 'Hurricane Odile',
            year: 2014,
            intensityOrMagnitude: 'Category 4 Hurricane (140 mph / 220 km/h, 918 hPa)',
            casualties: '15 fatalities, 30,000 tourists stranded',
            economicLoss: '$1.22 Billion USD',
            summary: 'Strongest hurricane to strike Baja California Sur in satellite era; destroyed airport terminal and power grid.'
          },
          {
            eventName: '1976 Hurricane Liza',
            year: 1976,
            intensityOrMagnitude: 'Category 4 Hurricane (140 mph, 948 hPa)',
            casualties: 'Estimated 1,000–3,000 fatalities',
            economicLoss: '$100 Million USD',
            summary: 'Overtopped and breached the earthen El Cajoncito dam, flooding La Paz with a deadly wall of mud and water.'
          },
          {
            eventName: 'Hurricane Kay',
            year: 2022,
            intensityOrMagnitude: 'Category 2 (105 mph sustained wind)',
            casualties: '3 fatalities',
            economicLoss: '$120 Million USD',
            summary: 'Brought extraordinary desert rainfall causing extensive highway washouts along Highway 1.'
          }
        ],
        geologicalOrClimaticFactor: 'Steep arid granite topography channelizes desert arroyo flash floods into coastal resort bays.',
        populationExposed: '800,000 residents across the peninsula',
        recommendedMitigation: 'Arroyo floodway evacuation zoning, buried electrical distribution in tourist zones, satellite emergency backup radio.'
      }
    ]
  },
  {
    id: 'australia',
    name: 'Australia',
    code: 'AUS',
    flag: '🇦🇺',
    basinRegion: 'Oceania',
    center: { lat: -25.2, lon: 133.7 },
    defaultZoom: 4,
    totalHistoricalEventsOnRecord: 165,
    mostFrequentHazard: 'Severe Tropical Cyclones (Western & Coral Sea Basins)',
    countryOverview: 'Australia’s northern coastline is flanked by two cyclonically hyperactive oceans: the warm Indian Ocean / Timor Sea in the northwest and the Coral Sea in the northeast, generating intense Category 4-5 systems.',
    officialDataSources: ['Bureau of Meteorology (BOM)', 'Geoscience Australia'],
    topRiskPlaces: [
      {
        id: 'au-pilbara-coast',
        rank: 1,
        name: 'Pilbara Coast & Port Hedland (Dampier, Karratha, Barrow Island)',
        region: 'Western Australia',
        country: 'Australia',
        coordinates: { lat: -20.31, lon: 118.57 },
        impactRadiusKm: 90,
        primaryHazard: 'cyclone',
        hazardTypes: ['cyclone', 'surge'],
        riskScore: 94,
        riskLevel: 'extreme',
        recordPeakEvent: '1996 Cyclone Olivia (408 km/h wind gust on Barrow Island - world record non-tornado wind speed)',
        whyHighestRisk: 'The economic engine of global iron ore exports. The warm Indian Ocean waters off northwest Australia produce some of the most intense and rapidly deepening Category 5 cyclones on Earth.',
        keyDisasters: [
          {
            eventName: 'Cyclone Olivia',
            year: 1996,
            intensityOrMagnitude: 'Category 4 Severe Tropical Cyclone (World record wind gust 408 km/h on Barrow Island)',
            casualties: 'Zero on Barrow Island (world-class cyclone engineering)',
            economicLoss: '$50 Million AUD',
            summary: 'BOM and WMO officially ratified 408 km/h (253 mph) gust at Barrow Island as highest wind speed ever recorded on Earth.'
          },
          {
            eventName: 'Cyclone Vance',
            year: 1999,
            intensityOrMagnitude: 'Category 5 Severe Cyclone (267 km/h gust at Exmouth, 910 hPa)',
            casualties: 'Minimal fatalities (Exmouth severely damaged)',
            economicLoss: '$100 Million AUD',
            summary: 'Highest wind gust ever recorded on the Australian mainland; demolished 10% of Exmouth homes.'
          },
          {
            eventName: 'Severe Tropical Cyclone Ilsa',
            year: 2023,
            intensityOrMagnitude: 'Category 5 (Record 10-min sustained wind 218 km/h at Bedout Island, 289 km/h gust)',
            casualties: 'Zero casualties due to automated port shutdown',
            economicLoss: '$20 Million AUD (mining port disruption)',
            summary: 'Broke Australia’s 10-minute sustained wind record at Bedout Island before crossing uninhabited coastline.'
          }
        ],
        geologicalOrClimaticFactor: 'Very warm sea surface temperatures (>30°C in Timor Sea) + lack of mountainous terrain to disrupt storms.',
        populationExposed: '65,000 residents + billions in offshore oil & gas rigs and iron ore export terminals',
        recommendedMitigation: 'Region D extreme cyclonic structural tie-downs, cyclonic mooring buoys for bulk carriers, storm surge port dikes.'
      },
      {
        id: 'au-north-queensland',
        rank: 2,
        name: 'North Queensland Coral Coast (Cairns, Townsville, Cardwell, Innisfail)',
        region: 'Queensland',
        country: 'Australia',
        coordinates: { lat: -16.92, lon: 145.77 },
        impactRadiusKm: 85,
        primaryHazard: 'cyclone',
        hazardTypes: ['cyclone', 'surge'],
        riskScore: 93,
        riskLevel: 'extreme',
        recordPeakEvent: '2011 Severe Tropical Cyclone Yasi (Category 5, 285 km/h wind, 929 hPa, 5m storm surge) & 1899 Cyclone Mahina',
        whyHighestRisk: 'The Great Barrier Reef lagoon creates a shallow body of water where incoming Coral Sea cyclones generate massive storm surge and wave setup. Backed by the Great Dividing Range which wrings out catastrophic flooding rains.',
        keyDisasters: [
          {
            eventName: 'Severe Tropical Cyclone Yasi',
            year: 2011,
            intensityOrMagnitude: 'Category 5 Severe Tropical Cyclone (285 km/h wind, 929 hPa)',
            casualties: '1 fatality (exemplary evacuation of 10,000)',
            economicLoss: '$3.6 Billion AUD',
            summary: 'Struck Mission Beach / Cardwell; decimated 75% of Australia’s banana crop and damaged sugar cane industry.'
          },
          {
            eventName: '1899 Bathurst Bay / Mahina Cyclone',
            year: 1899,
            intensityOrMagnitude: 'Category 5 (Estimated 880 hPa, 13m world record storm surge)',
            casualties: '400+ fatalities (pearling fleet crews)',
            economicLoss: 'Complete fleet destruction',
            summary: 'Deadliest natural disaster in Australian history; surge washed porpoises 15 meters up coastal cliffs.'
          },
          {
            eventName: 'Tropical Cyclone Jasper',
            year: 2023,
            intensityOrMagnitude: 'Category 4 Coral Sea / Cat 2 landfall, record 2,252 mm rainfall deluge',
            casualties: '1 fatality',
            economicLoss: '$1.0 Billion AUD',
            summary: 'Stalled over Cairns and Daintree rainforest, causing historic 1-in-500 year river floods and isolating remote communities.'
          }
        ],
        geologicalOrClimaticFactor: 'Coral Sea warm water basin + orographic uplift against the steep Atherton Tablelands / coastal range.',
        populationExposed: '550,000 residents along the tropical coast',
        recommendedMitigation: 'Australian standard AS/NZS 1170.2 cyclonic roof battens, early evacuation centers at high elevation, flood-proof Bruce Highway.'
      },
      {
        id: 'au-darwin-top-end',
        rank: 3,
        name: 'Darwin & Top End Coast (Northern Territory)',
        region: 'Northern Territory',
        country: 'Australia',
        coordinates: { lat: -12.46, lon: 130.84 },
        impactRadiusKm: 65,
        primaryHazard: 'cyclone',
        hazardTypes: ['cyclone', 'surge'],
        riskScore: 89,
        riskLevel: 'high',
        recordPeakEvent: '1974 Cyclone Tracy (Christmas Day Cat 4, 217+ km/h wind, obliterated 80% of Darwin city)',
        whyHighestRisk: 'Geographically isolated tropical capital situated on Beagle Gulf. Subject to intense monsoon trough depressions and small, tightly wound tropical cyclones that rapidly deepen before striking land.',
        keyDisasters: [
          {
            eventName: 'Cyclone Tracy',
            year: 1974,
            intensityOrMagnitude: 'Category 4 Cyclone (Extremely compact eye, 217 km/h gust measured before instrument failure, 950 hPa)',
            casualties: '71 fatalities',
            economicLoss: '$837 Million AUD ($4.5B+ inflation-adjusted)',
            summary: 'Destroyed 80% of Darwin houses on Christmas Eve; necessitated complete aerial evacuation of 30,000 residents.'
          },
          {
            eventName: 'Cyclone Marcus',
            year: 2018,
            intensityOrMagnitude: 'Category 2 at Darwin / Cat 5 in Indian Ocean (130 km/h wind in city)',
            casualties: 'Zero fatalities',
            economicLoss: '$97 Million AUD',
            summary: 'Strongest cyclone to strike Darwin since Tracy; brought down thousands of trees and knocked out city power.'
          },
          {
            eventName: 'Cyclone Carlos',
            year: 2011,
            intensityOrMagnitude: 'Category 1 / Tropical Low (Record 365 mm 24h rain)',
            casualties: 'Zero fatalities',
            economicLoss: '$16 Million AUD',
            summary: 'Stalled over Darwin for 3 days causing record flooding and road closures.'
          }
        ],
        geologicalOrClimaticFactor: 'Arafura Sea and Timor Sea thermal reservoir + extreme 8-meter tidal range amplifies surge vulnerability.',
        populationExposed: '150,000 residents in Darwin metropolitan area',
        recommendedMitigation: 'Mandatory post-Tracy cyclone building codes (reinforced masonry & double tie-downs), underground power distribution.'
      }
    ]
  },
  {
    id: 'taiwan',
    name: 'Taiwan',
    code: 'TWN',
    flag: '🇹🇼',
    basinRegion: 'East Asia',
    center: { lat: 23.7, lon: 121.0 },
    defaultZoom: 7,
    totalHistoricalEventsOnRecord: 210,
    mostFrequentHazard: 'Western Pacific Super Typhoons & Plate Convergence Earthquakes',
    countryOverview: 'Straddles the collision boundary between the Philippine Sea Plate and Eurasian Plate, while sitting right in the bowling alley of Western Pacific typhoons. Its 3,952m Central Mountain Range triggers record-shattering orographic rainfall.',
    officialDataSources: ['Central Weather Administration (CWA)', 'National Science and Technology Center for Disaster Reduction (NCDR)'],
    topRiskPlaces: [
      {
        id: 'tw-hualien-east',
        rank: 1,
        name: 'Hualien & East Longitudinal Valley (Taroko Gorge, Yuli)',
        region: 'Eastern Taiwan',
        country: 'Taiwan',
        coordinates: { lat: 23.98, lon: 121.60 },
        impactRadiusKm: 65,
        primaryHazard: 'earthquake',
        hazardTypes: ['earthquake'],
        riskScore: 98,
        riskLevel: 'critical',
        recordPeakEvent: '2024 Hualien Mw 7.4 Earthquake & 1999 Jiji / 921 Earthquake (Mw 7.7, 2,415 fatalities)',
        whyHighestRisk: 'The Philippine Sea Plate collides northwestward into the Eurasian Plate at 8 cm/year directly beneath Hualien along the Longitudinal Valley Fault, resulting in Taiwan’s most active and frequent shallow seismic ruptures.',
        keyDisasters: [
          {
            eventName: '2024 Hualien Earthquake',
            year: 2024,
            intensityOrMagnitude: 'Mw 7.4 (Depth 34 km, maximum CWA intensity 6+ in Hualien)',
            casualties: '18 fatalities, 1,155 injured',
            economicLoss: '$1.0 Billion USD',
            summary: 'Strongest earthquake in Taiwan in 25 years; collapsed buildings in Hualien city and triggered massive landslides in Taroko Gorge.'
          },
          {
            eventName: '1999 Jiji (921) Earthquake',
            year: 1999,
            intensityOrMagnitude: 'Mw 7.7 (Chelungpu Fault, 100 km surface rupture, 8m vertical offset)',
            casualties: '2,415 fatalities, 11,305 injured',
            economicLoss: '$9.2 Billion USD',
            summary: 'Toppled high-rises across central Taiwan; destroyed 51,711 buildings and damaged the national electrical grid.'
          },
          {
            eventName: '2018 Hualien Earthquake',
            year: 2018,
            intensityOrMagnitude: 'Mw 6.4 (Shallow depth 10 km, Milun Fault)',
            casualties: '17 fatalities, 282 injured',
            economicLoss: '$250 Million USD',
            summary: 'Pancaked lower floors of the Marshal Hotel and Yun Men Tsui Ti commercial building.'
          }
        ],
        geologicalOrClimaticFactor: 'Direct oblique collision of Luzon Volcanic Arc into Eurasian continental shelf margin.',
        populationExposed: '350,000 residents in narrow linear tectonic valley',
        recommendedMitigation: 'CWA 10-second Earthquake Early Warning (EEW) broadcasting, Taroko landslide rock-shed tunnels, strict school seismic retrofitting.'
      },
      {
        id: 'tw-taitung-coast',
        rank: 2,
        name: 'Taitung & South-Eastern Pacific Coast (Dawu, Chenggong)',
        region: 'Southeastern Taiwan',
        country: 'Taiwan',
        coordinates: { lat: 22.75, lon: 121.14 },
        impactRadiusKm: 60,
        primaryHazard: 'cyclone',
        hazardTypes: ['cyclone', 'surge'],
        riskScore: 93,
        riskLevel: 'extreme',
        recordPeakEvent: '2016 Super Typhoon Nepartak (280 km/h wind gusts at Taitung) & 2009 Typhoon Morakot',
        whyHighestRisk: 'Direct head-on landfall intercept point for Category 4-5 Western Pacific super typhoons. Slopes of the Central Mountain Range rise abruptly from sea level, causing extreme Foehn wind events and flash mountain torrents.',
        keyDisasters: [
          {
            eventName: 'Super Typhoon Nepartak',
            year: 2016,
            intensityOrMagnitude: 'Category 5 Super Typhoon (Landfall at Taimali with 280 km/h gusts)',
            casualties: '3 fatalities, 300+ injured',
            economicLoss: '$700 Million USD',
            summary: 'Taitung weather station recorded its highest gust in 115 years; overturned trucks and blew off roofs.'
          },
          {
            eventName: 'Typhoon Morakot',
            year: 2009,
            intensityOrMagnitude: 'Category 2 Typhoon (World record 3,000 mm rainfall over 4 days)',
            casualties: '673 fatalities',
            economicLoss: '$6.2 Billion USD',
            summary: 'Deadliest typhoon in Taiwan history; buried Xiaolin village under a massive deep-seated mudslide.'
          },
          {
            eventName: 'Typhoon Koinu',
            year: 2023,
            intensityOrMagnitude: 'Category 4 (All-time Taiwan wind gust record 342.7 km/h at Orchid Island)',
            casualties: '1 fatality',
            economicLoss: '$150 Million USD',
            summary: 'Broke 126-year Taiwan anemometer record with 95.2 m/s (342.7 km/h) gust before striking mainland Taitung.'
          }
        ],
        geologicalOrClimaticFactor: 'Open Pacific fetch without islands to buffer typhoons + immediate 3,000m orographic wall.',
        populationExposed: '220,000 residents across Taitung coastal plain and offshore islands',
        recommendedMitigation: 'Debris-flow monitoring sensor network, reinforced wind-shed residential windows, community evacuation drills.'
      },
      {
        id: 'tw-taipei-basin',
        rank: 3,
        name: 'Taipei Basin & Keelung North Coast (Taipei, New Taipei)',
        region: 'Northern Taiwan',
        country: 'Taiwan',
        coordinates: { lat: 25.03, lon: 121.56 },
        impactRadiusKm: 55,
        primaryHazard: 'multi_hazard',
        hazardTypes: ['cyclone', 'earthquake'],
        riskScore: 90,
        riskLevel: 'extreme',
        recordPeakEvent: '2001 Typhoon Nari (flooded entire Taipei Metro network) & Shanchiao Active Normal Fault',
        whyHighestRisk: 'A bowl-shaped sediment-filled basin housing 7 million people and critical high-tech corporate headquarters. Prone to severe rainfall ponding from typhoons trapped by northern mountain ridges, plus soft soil seismic resonance.',
        keyDisasters: [
          {
            eventName: 'Typhoon Nari',
            year: 2001,
            intensityOrMagnitude: 'Category 3 Typhoon (Stalled over Taipei basin for over 48 hours)',
            casualties: '104 fatalities',
            economicLoss: '$800 Million USD',
            summary: 'Submerged Taipei Main Station, the Nangang underground metro line, and 16 subway stations for three months.'
          },
          {
            eventName: 'Typhoon Soudelor',
            year: 2015,
            intensityOrMagnitude: 'Category 3 at landfall (165 km/h, 940 hPa)',
            casualties: '8 fatalities in Taiwan',
            economicLoss: '$350 Million USD',
            summary: 'Knocked out power to a record 4.3 million households across Taiwan; bent Taipei mailboxes into tourist landmarks.'
          },
          {
            eventName: '1694 Kangxi Taipei Earthquake',
            year: 1694,
            intensityOrMagnitude: 'Estimated M7.0 (Ruptured Shanchiao Fault)',
            casualties: 'Unknown historical count',
            economicLoss: 'Formation of Kangxi Taipei Lake',
            summary: 'Basin floor subsided several meters, transforming the central basin into a lake for over a century.'
          }
        ],
        geologicalOrClimaticFactor: 'Basin effect amplifies low-frequency seismic waves + Tamsui River single drainage bottleneck to sea.',
        populationExposed: '7.1 Million in Taipei-New Taipei metropolitan basin',
        recommendedMitigation: 'Erchong Floodway diversion channel, automated metro entrance watertight bulkheads, Shanchiao fault monitoring.'
      }
    ]
  },
  {
    id: 'turkey',
    name: 'Turkey (Türkiye)',
    code: 'TUR',
    flag: '🇹🇷',
    basinRegion: 'Europe & Mediterranean',
    center: { lat: 39.0, lon: 35.0 },
    defaultZoom: 5,
    totalHistoricalEventsOnRecord: 180,
    mostFrequentHazard: 'North & East Anatolian Transform Fault Earthquakes',
    countryOverview: 'Squeezed between the colliding Arabian and Eurasian tectonic plates. The Anatolian Plate is forced westward along two major strike-slip boundaries: the 1,500 km North Anatolian Fault (NAF) and the East Anatolian Fault (EAF).',
    officialDataSources: ['AFAD (Disaster and Emergency Management Authority)', 'Kandilli Observatory and Earthquake Research Institute (KOERI)'],
    topRiskPlaces: [
      {
        id: 'tr-marmara-istanbul',
        rank: 1,
        name: 'Marmara Megacity Corridor (Istanbul, Kocaeli, Yalova)',
        region: 'Marmara Region',
        country: 'Turkey (Türkiye)',
        coordinates: { lat: 40.90, lon: 28.97 },
        impactRadiusKm: 70,
        primaryHazard: 'earthquake',
        hazardTypes: ['earthquake', 'tsunami'],
        riskScore: 98,
        riskLevel: 'critical',
        recordPeakEvent: '1999 Izmit (Kocaeli) Earthquake (Mw 7.6, 17,127 fatalities) & Pending Marmara Gap Rupture',
        whyHighestRisk: 'The North Anatolian Fault branches into the Sea of Marmara barely 15 to 20 km south of Istanbul’s 16 million residents. The 150 km Marmara central segment is a locked seismic gap with a >65% probability of an Mw 7.2+ earthquake before 2030.',
        keyDisasters: [
          {
            eventName: '1999 Izmit (Kocaeli) Earthquake',
            year: 1999,
            intensityOrMagnitude: 'Mw 7.6 (120 km strike-slip rupture, 5m displacement, depth 15 km)',
            casualties: '17,127 fatalities, 43,953 injured',
            economicLoss: '$20 Billion USD',
            summary: 'Flattened towns of Gölcük and Adapazarı; ignited massive refinery fire at Tupras and caused localized tsunami in Izmit Bay.'
          },
          {
            eventName: '1999 Düzce Earthquake',
            year: 1999,
            intensityOrMagnitude: 'Mw 7.2 (Triggered 3 months after Izmit by stress transfer)',
            casualties: '845 fatalities, 4,948 injured',
            economicLoss: '$1.0 Billion USD',
            summary: 'Ruptured eastern continuation of NAF, demonstrating characteristic westward earthquake migration.'
          },
          {
            eventName: '1766 Great Istanbul Earthquake',
            year: 1766,
            intensityOrMagnitude: 'Estimated M7.1–7.4 (Marmara central segment)',
            casualties: '4,000+ fatalities in historical city',
            economicLoss: 'Severe destruction of Topkapi Palace and Grand Bazaar',
            summary: 'Triggered 7-meter tsunamis along the Golden Horn and Bosphorus shorelines.'
          }
        ],
        geologicalOrClimaticFactor: 'Right-lateral strike-slip fault with shallow focal depth (10–15 km) running directly through enclosed marine basin.',
        populationExposed: '16.5 Million in Istanbul metropolitan conurbation',
        recommendedMitigation: 'Istanbul Seismic Risk Mitigation and Emergency Preparedness Project (ISMEP), urban renewal of pre-2000 apartment blocks.'
      },
      {
        id: 'tr-kahramanmaras-hatay',
        rank: 2,
        name: 'Kahramanmaraş & Hatay Basin (Antakya, Gaziantep, Malatya)',
        region: 'Southeastern Anatolia',
        country: 'Turkey (Türkiye)',
        coordinates: { lat: 37.58, lon: 36.93 },
        impactRadiusKm: 95,
        primaryHazard: 'earthquake',
        hazardTypes: ['earthquake'],
        riskScore: 97,
        riskLevel: 'critical',
        recordPeakEvent: '2023 Turkey–Syria Doublet Earthquakes (Mw 7.8 & Mw 7.7, 53,500+ fatalities in Turkey)',
        whyHighestRisk: 'The junction where the Dead Sea Transform Fault meets the East Anatolian Fault. The catastrophic 2023 doublet sequence ruptured over 400 km of faults, causing unprecedented structural pancake collapses across 11 provinces.',
        keyDisasters: [
          {
            eventName: '2023 Kahramanmaraş Earthquake Doublet',
            year: 2023,
            intensityOrMagnitude: 'Mw 7.8 (Pazarcık segment, 04:17 AM) followed 9 hours later by Mw 7.7 (Elbistan segment)',
            casualties: '53,537 dead in Turkey + 8,476 in Syria (62,000+ total)',
            economicLoss: '$104 Billion USD (9% of Turkey’s GDP)',
            summary: 'Deadliest disaster in modern Turkish history; completely ruined historic city of Antakya (Hatay) and collapsed 100,000+ buildings.'
          },
          {
            eventName: '2020 Elazığ Earthquake',
            year: 2020,
            intensityOrMagnitude: 'Mw 6.7 (East Anatolian Fault, depth 10 km)',
            casualties: '41 fatalities, 1,600+ injured',
            economicLoss: '$600 Million USD',
            summary: 'Served as direct stress-transfer precursor along the northeastern segment of the EAF.'
          },
          {
            eventName: '1822 Aleppo–Antakya Earthquake',
            year: 1822,
            intensityOrMagnitude: 'Estimated M7.0 (Dead Sea / East Anatolian junction)',
            casualties: 'Estimated 20,000–60,000 fatalities',
            economicLoss: 'Total destruction of historical Levant trade cities',
            summary: 'Shook regions from Damascus to Antakya, followed by months of violent aftershocks.'
          }
        ],
        geologicalOrClimaticFactor: 'Sinistral (left-lateral) slip between Arabian and Anatolian microplates with extreme horizontal surface accelerations.',
        populationExposed: '9.0 Million across the 11 affected southeastern provinces',
        recommendedMitigation: 'Ground-penetrating radar site zoning away from alluvial basins, tunnel form concrete construction mandate.'
      },
      {
        id: 'tr-aegean-izmir',
        rank: 3,
        name: 'Aegean Coast & Izmir Bay (Izmir, Bodrum, Kusadasi)',
        region: 'Aegean Region',
        country: 'Turkey (Türkiye)',
        coordinates: { lat: 38.42, lon: 27.14 },
        impactRadiusKm: 65,
        primaryHazard: 'multi_hazard',
        hazardTypes: ['earthquake', 'tsunami'],
        riskScore: 91,
        riskLevel: 'extreme',
        recordPeakEvent: '2020 Aegean Sea (Samos–Izmir) Earthquake (Mw 7.0, 117 fatalities & localized tsunami)',
        whyHighestRisk: 'The Aegean extensional tectonic province is the most rapidly stretching continental crust in the world (30 mm/year), creating a lattice of east-west graben normal faults and exposed coastal bays susceptible to both earthquakes and Mediterranean cyclonic storms (Medicanes).',
        keyDisasters: [
          {
            eventName: '2020 Samos–Izmir Earthquake',
            year: 2020,
            intensityOrMagnitude: 'Mw 7.0 (Normal faulting north of Samos, depth 12 km)',
            casualties: '117 fatalities in Izmir, 1,034 injured',
            economicLoss: '$400 Million USD',
            summary: 'Collapsed multi-story residential blocks in Bayraklı built on soft river sediments 70 km from epicenter; tsunami flooded Seferihisar.'
          },
          {
            eventName: '2017 Bodrum–Kos Earthquake',
            year: 2017,
            intensityOrMagnitude: 'Mw 6.6 (Gökova Graben normal faulting, depth 10 km)',
            casualties: '2 fatalities in Kos, 350+ injured in Bodrum',
            economicLoss: '$150 Million USD',
            summary: 'A 1.5m tsunami inundated Bodrum harbor, damaging dozens of yachts and waterfront shops.'
          },
          {
            eventName: 'Medicane Daniel (Eastern Mediterranean Storm)',
            year: 2023,
            intensityOrMagnitude: 'Mediterranean Tropical-like Cyclone (Wind gusts 120 km/h, catastrophic rainfall)',
            casualties: '8 fatalities in Turkey (thousands in Derna, Libya)',
            economicLoss: '$200 Million USD in Turkey',
            summary: 'Brought intense flash deluges to Kırklareli and Istanbul before devastating eastern Libya.'
          }
        ],
        geologicalOrClimaticFactor: 'North-south back-arc crustal extension behind the Hellenic Arc + soft clay deltaic soil amplification in Izmir Bay.',
        populationExposed: '4.5 Million in Izmir conurbation and Aegean tourist corridor',
        recommendedMitigation: 'Bayraklı alluvial building height limits, coastal tsunami inundation evacuation signs in tourist marinas.'
      }
    ]
  },
  {
    id: 'chile',
    name: 'Chile',
    code: 'CHL',
    flag: '🇨🇱',
    basinRegion: 'Americas',
    center: { lat: -35.6, lon: -71.5 },
    defaultZoom: 4,
    totalHistoricalEventsOnRecord: 175,
    mostFrequentHazard: 'Peru–Chile Trench Megathrust Earthquakes & Giant Pacific Tsunamis',
    countryOverview: 'Flanked by the 6,000 km Nazca-South American plate subduction zone. Holds the world record for the strongest earthquake ever recorded (1960 Valdivia M9.5) and possesses the strictest, most successful seismic building standards on Earth.',
    officialDataSources: ['CSN (Centro Sismológico Nacional)', 'SENAPRED (formerly ONEMI)', 'SHOA (Servicio Hidrográfico y Oceanográfico)'],
    topRiskPlaces: [
      {
        id: 'cl-biobio-concepcion',
        rank: 1,
        name: 'Biobío & Concepción (Maule Seismic Subduction Zone)',
        region: 'Biobío & Maule',
        country: 'Chile',
        coordinates: { lat: -36.82, lon: -73.05 },
        impactRadiusKm: 90,
        primaryHazard: 'tsunami',
        hazardTypes: ['earthquake', 'tsunami'],
        riskScore: 98,
        riskLevel: 'critical',
        recordPeakEvent: '1960 Great Valdivia Earthquake (Mw 9.5 - highest magnitude ever measured in human history) & 2010 Maule Mw 8.8',
        whyHighestRisk: 'The Nazca Plate plunges under the South American Plate at an exceptional 7 cm/year. The rupture zone here has repeatedly produced the world’s most energetic megathrust quakes, generating trans-Pacific tsunamis reaching Japan and Hawaii.',
        keyDisasters: [
          {
            eventName: '1960 Great Chilean (Valdivia) Earthquake',
            year: 1960,
            intensityOrMagnitude: 'Mw 9.5 (Rupture length 1,000 km, 20m slip, 25m tsunami run-up)',
            casualties: '1,655 – 6,000 fatalities',
            economicLoss: '$550 Million USD (1960 value, $5B+ today)',
            summary: 'Largest earthquake recorded in human history; tsunamis killed people in Hawaii (61 dead), Japan (138 dead), and the Philippines.'
          },
          {
            eventName: '2010 Maule / Biobío Earthquake',
            year: 2010,
            intensityOrMagnitude: 'Mw 8.8 (6th largest earthquake in world history, 500 km rupture)',
            casualties: '525 fatalities (mostly from tsunami waves)',
            economicLoss: '$30 Billion USD (17% of Chile’s GDP)',
            summary: 'Permanently shifted city of Concepción 3 meters to the west; destroyed port of Talcahuano and coastal villages.'
          },
          {
            eventName: '1939 Chillán Earthquake',
            year: 1939,
            intensityOrMagnitude: 'Mw 7.8 (Deep intra-slab rupture, depth 60 km)',
            casualties: 'Estimated 28,000 fatalities',
            economicLoss: 'Near-total destruction of Chillán',
            summary: 'Deadliest earthquake in Chilean history; prompted creation of CORFO and first national building codes.'
          }
        ],
        geologicalOrClimaticFactor: 'Very fast convergence rate (66 mm/year) of young, warm oceanic Nazca lithosphere.',
        populationExposed: '2.5 Million across Biobío, Maule, and Los Ríos',
        recommendedMitigation: 'Mandatory NCh433 reinforced shear-wall building design, SHOA ocean wave sensor early warning sirens, coastal evacuation hills.'
      },
      {
        id: 'cl-valparaiso-central',
        rank: 2,
        name: 'Valparaíso & Central Coastal Corridor (Valparaíso, Viña del Mar, San Antonio)',
        region: 'Valparaíso Region',
        country: 'Chile',
        coordinates: { lat: -33.04, lon: -71.61 },
        impactRadiusKm: 75,
        primaryHazard: 'multi_hazard',
        hazardTypes: ['earthquake', 'tsunami'],
        riskScore: 96,
        riskLevel: 'extreme',
        recordPeakEvent: '1906 Valparaíso Earthquake (Mw 8.2, 3,887 fatalities) & 1985 Algarrobo Mw 8.0',
        whyHighestRisk: 'The main maritime gateway to the capital Santiago. Sits directly above the subducting Juan Fernández Ridge on the Nazca plate, which concentrates high seismic stress directly beneath steep coastal ravines prone to massive urban fires and landslides.',
        keyDisasters: [
          {
            eventName: '1906 Great Valparaíso Earthquake',
            year: 1906,
            intensityOrMagnitude: 'Mw 8.2 (Depth 25 km, Mercalli X shaking)',
            casualties: '3,887 fatalities',
            economicLoss: '$100 Million USD (1906 value)',
            summary: 'Flattened downtown El Almendral; fire raged for days, destroying the historic colonial seaport.'
          },
          {
            eventName: '1985 Algarrobo Earthquake',
            year: 1985,
            intensityOrMagnitude: 'Mw 8.0 (Offshore central Chile, depth 33 km)',
            casualties: '177 fatalities, 2,575 injured',
            economicLoss: '$1.04 Billion USD',
            summary: 'Demolished port of San Antonio and heavily damaged adobe structures throughout central Chile.'
          },
          {
            eventName: '2015 Illapel Earthquake',
            year: 2015,
            intensityOrMagnitude: 'Mw 8.3 (Depth 25 km, 4.5m tsunami run-up)',
            casualties: '15 fatalities (1 million people successfully evacuated in 15 mins)',
            economicLoss: '$1.0 Billion USD',
            summary: 'Gold-standard demonstration of rapid civil evacuation preventing tsunami casualties along Coquimbo/Valparaíso.'
          }
        ],
        geologicalOrClimaticFactor: 'Subduction of Juan Fernández Ridge creates severe interplate locking and high recurrence frequency (~80 years).',
        populationExposed: '1.9 Million in Valparaíso conurbation + 7 Million in nearby Santiago basin',
        recommendedMitigation: 'Ravine firebreak buffer zones, rapid automated cell broadcast alerts (SAE), port seismic container crane tie-downs.'
      },
      {
        id: 'cl-atacama-tarapaca',
        rank: 3,
        name: 'Tarapacá & Atacama Coast (Iquique, Arica, Antofagasta)',
        region: 'Northern Chile',
        country: 'Chile',
        coordinates: { lat: -20.21, lon: -70.15 },
        impactRadiusKm: 80,
        primaryHazard: 'earthquake',
        hazardTypes: ['earthquake', 'tsunami'],
        riskScore: 91,
        riskLevel: 'extreme',
        recordPeakEvent: '1868 Arica Mw 9.0 Megathrust Earthquake & 2014 Iquique Mw 8.2',
        whyHighestRisk: 'Home to the famous "Northern Chile Seismic Gap" where significant sections of the subduction zone have not ruptured in a mega-event since 1877. The narrow coastal desert shelf sits directly beneath 500-meter vertical coastal cliffs.',
        keyDisasters: [
          {
            eventName: '1868 Arica Earthquake & Tsunami',
            year: 1868,
            intensityOrMagnitude: 'Mw 8.5–9.0 (Rupture of 600 km, 15m tsunami run-up)',
            casualties: '25,000+ fatalities across South America & Pacific',
            economicLoss: 'Carried US warship USS Wateree 3 km inland onto desert sand',
            summary: 'Tsunami reached New Zealand, Japan, and Hawaii with devastating wave power.'
          },
          {
            eventName: '2014 Iquique Earthquake',
            year: 2014,
            intensityOrMagnitude: 'Mw 8.2 (Depth 20 km, ruptured central portion of northern gap)',
            casualties: '6 fatalities (prompt evacuation of 900,000)',
            economicLoss: '$100 Million USD',
            summary: 'Left northern and southern segments still locked and capable of a future M8.5+ event.'
          },
          {
            eventName: '1877 Iquique Earthquake',
            year: 1877,
            intensityOrMagnitude: 'Mw 8.5–8.8 (Epicenter off Tarapacá, 20m tsunami waves)',
            casualties: '2,541 fatalities',
            economicLoss: 'Wiped out all nitrate export ports',
            summary: 'Devastated ports of Tocopilla, Cobija, and Mejillones.'
          }
        ],
        geologicalOrClimaticFactor: 'Complete lack of rain means lack of sediment lubrication on subduction trench, increasing frictional coupling.',
        populationExposed: '1.1 Million in northern coastal mining port cities',
        recommendedMitigation: 'Vertical evacuation buildings along Iquique peninsula, desalination plant backup power, coastal highway tsunami ramps.'
      }
    ]
  },
  {
    id: 'madagascar',
    name: 'Madagascar',
    code: 'MDG',
    flag: '🇲🇬',
    basinRegion: 'Africa',
    center: { lat: -18.7, lon: 46.8 },
    defaultZoom: 5,
    totalHistoricalEventsOnRecord: 140,
    mostFrequentHazard: 'South-West Indian Ocean Intense Tropical Cyclones',
    countryOverview: 'Acts as the primary land shield for the East African coast, absorbing the brunt of fierce South-West Indian Ocean tropical cyclones originating near Mauritius and Diego Garcia.',
    officialDataSources: ['Météo Madagascar (Direction Générale de la Météorologie)', 'BNGRC (National Disaster Management Office)'],
    topRiskPlaces: [
      {
        id: 'mg-toamasina-east',
        rank: 1,
        name: 'Analanjirofo & Toamasina Coast (Eastern Seaboard)',
        region: 'Atsinanana & Analanjirofo',
        country: 'Madagascar',
        coordinates: { lat: -18.15, lon: 49.40 },
        impactRadiusKm: 85,
        primaryHazard: 'cyclone',
        hazardTypes: ['cyclone', 'surge'],
        riskScore: 96,
        riskLevel: 'critical',
        recordPeakEvent: '2022 Cyclone Batsirai (Category 4, 230 km/h wind) & 2023 Cyclone Freddy (Longest-lived cyclone in world history - 36 days)',
        whyHighestRisk: 'The eastern cliff of Madagascar rises sharply from the Indian Ocean. Intense tropical cyclones slam directly into this windward coastline with zero prior land obstruction, dumping meters of rain and wiping out wooden settlements.',
        keyDisasters: [
          {
            eventName: 'Cyclone Batsirai',
            year: 2022,
            intensityOrMagnitude: 'Category 4 Intense Tropical Cyclone (230 km/h wind, 934 hPa)',
            casualties: '121 fatalities',
            economicLoss: '$190 Million USD',
            summary: 'Devastated Mananjary and Nosy Varika; destroyed 90% of health clinics and schools.'
          },
          {
            eventName: 'Cyclone Freddy',
            year: 2023,
            intensityOrMagnitude: 'Very Intense Tropical Cyclone (Traversed entire Indian Ocean, 36 days total lifecycle)',
            casualties: '17 fatalities in Madagascar (1,400+ in Malawi/Mozambique)',
            economicLoss: '$650 Million USD regional',
            summary: 'Longest-lived tropical cyclone ever documented on Earth; made landfall twice in Madagascar.'
          },
          {
            eventName: 'Cyclone Gafilo',
            year: 2004,
            intensityOrMagnitude: 'Category 5 Super Cyclone (260 km/h wind, 895 hPa lowest SW Indian Ocean pressure)',
            casualties: '363 fatalities, 181 missing (including ferry MV Samson sinking)',
            economicLoss: '$250 Million USD',
            summary: 'Strongest cyclone to strike Madagascar in satellite era; destroyed half the homes in northern cities.'
          }
        ],
        geologicalOrClimaticFactor: 'Very warm Mascarene Basin sea temperatures (>28°C) + orographic lift against the eastern escarpment.',
        populationExposed: '3.8 Million in eastern agricultural and port communities',
        recommendedMitigation: 'Cyclone-resistant public school architecture, early community radio warning in Malagasy dialects, coastal mangrove re-planting.'
      },
      {
        id: 'mg-sava-vanilla',
        rank: 2,
        name: 'Sava Region (Antalaha, Sambava - The Vanilla Coast)',
        region: 'Sava Region',
        country: 'Madagascar',
        coordinates: { lat: -14.90, lon: 50.28 },
        impactRadiusKm: 70,
        primaryHazard: 'cyclone',
        hazardTypes: ['cyclone', 'surge'],
        riskScore: 93,
        riskLevel: 'extreme',
        recordPeakEvent: '2017 Cyclone Enawo (Category 4, 230 km/h wind, 932 hPa) & 2024 Cyclone Gamane',
        whyHighestRisk: 'The world’s capital for natural vanilla production. Positioned on the northeastern tip of Madagascar, where westward-tracking cyclones from the central Indian Ocean first make landfall before recurving.',
        keyDisasters: [
          {
            eventName: 'Cyclone Enawo',
            year: 2017,
            intensityOrMagnitude: 'Category 4 Intense Tropical Cyclone (230 km/h wind, 932 hPa)',
            casualties: '81 fatalities, 250,000 affected',
            economicLoss: '$400 Million USD',
            summary: 'Destroyed 30% of the world’s vanilla crop in Antalaha, causing global ice cream and confectionery price spikes.'
          },
          {
            eventName: 'Cyclone Gamane',
            year: 2024,
            intensityOrMagnitude: 'Severe Tropical Storm / Cat 2 (Stalled for 48 hours dumping 600 mm rain)',
            casualties: '19 fatalities',
            economicLoss: '$80 Million USD',
            summary: 'Cut off national road RN5A; flooded Sambava and Vohemar plain.'
          },
          {
            eventName: 'Cyclone Hudah',
            year: 2000,
            intensityOrMagnitude: 'Category 5 equivalent (260 km/h wind, 905 hPa)',
            casualties: '114 fatalities',
            economicLoss: '$150 Million USD',
            summary: 'Flattened 90% of homes in Antalaha with extreme gusts.'
          }
        ],
        geologicalOrClimaticFactor: 'Cape Amber convergence zone + high reliance on fragile subsistence vanilla agroforestry.',
        populationExposed: '1.2 Million across northeastern coastal districts',
        recommendedMitigation: 'Crop insurance micro-finance for vanilla farmers, elevated concrete community shelters, bridge hydraulic scouring defenses.'
      },
      {
        id: 'mg-boeny-mahajanga',
        rank: 3,
        name: 'Boeny & Mahajanga (Mozambique Channel Coast)',
        region: 'Boeny Region',
        country: 'Madagascar',
        coordinates: { lat: -15.71, lon: 46.31 },
        impactRadiusKm: 65,
        primaryHazard: 'cyclone',
        hazardTypes: ['cyclone', 'surge'],
        riskScore: 89,
        riskLevel: 'high',
        recordPeakEvent: '2014 Cyclone Hellen (Rapidly deepened into Very Intense Cyclone in Mozambique Channel, 915 hPa)',
        whyHighestRisk: 'The Mozambique Channel is a warm, semi-enclosed sea that acts as a supercharger for cyclones looping between Madagascar and mainland Africa. Low-lying estuaries around the Betsiboka River are vulnerable to severe silt-laden flooding.',
        keyDisasters: [
          {
            eventName: 'Cyclone Hellen',
            year: 2014,
            intensityOrMagnitude: 'Very Intense Tropical Cyclone (Deepened by 65 hPa in 24h to 915 hPa, 240 km/h)',
            casualties: '14 fatalities',
            economicLoss: '$50 Million USD',
            summary: 'One of the most rapidly intensifying tropical cyclones ever observed in the Mozambique Channel.'
          },
          {
            eventName: 'Cyclone Cheneso',
            year: 2023,
            intensityOrMagnitude: 'Intense Tropical Cyclone (Stalled in Mozambique Channel, 170 km/h wind)',
            casualties: '33 fatalities, 20 missing',
            economicLoss: '$70 Million USD',
            summary: 'Submerged national roads and washed out red laterite soil from deforested highlands into Bombetoka Bay.'
          },
          {
            eventName: 'Cyclone Kamisy',
            year: 1984,
            intensityOrMagnitude: 'Very Intense Cyclone (210 km/h, 930 hPa)',
            casualties: '68 fatalities',
            economicLoss: '$250 Million USD',
            summary: 'Direct landfall on Mahajanga city; devastated harbor wharves.'
          }
        ],
        geologicalOrClimaticFactor: 'Channel bathymetry causes high tidal range (up to 4.5m) that synchronizes with cyclone surges.',
        populationExposed: '950,000 residents in northwestern coastal towns',
        recommendedMitigation: 'Betsiboka river catchment reforestation, seawall restoration along Mahajanga Corniche.'
      }
    ]
  },
  {
    id: 'vietnam',
    name: 'Vietnam',
    code: 'VNM',
    flag: '🇻🇳',
    basinRegion: 'East Asia',
    center: { lat: 14.05, lon: 108.27 },
    defaultZoom: 6,
    totalHistoricalEventsOnRecord: 190,
    mostFrequentHazard: 'South China Sea Typhoons & Flash Mountain Deluges',
    countryOverview: 'With over 3,260 km of curved coastline directly facing the South China Sea (East Sea). Typhoons entering from the Philippines track across warm waters to slam into central and northern coastal deltas.',
    officialDataSources: ['NCHMF (National Centre for Hydro-Meteorological Forecasting)', 'VDDMA (Vietnam Disaster and Dyke Management Authority)'],
    topRiskPlaces: [
      {
        id: 'vn-central-coast',
        rank: 1,
        name: 'Central Coast Corridor (Da Nang, Quang Nam, Thua Thien Hue)',
        region: 'Central Vietnam',
        country: 'Vietnam',
        coordinates: { lat: 16.05, lon: 108.20 },
        impactRadiusKm: 80,
        primaryHazard: 'cyclone',
        hazardTypes: ['cyclone', 'surge'],
        riskScore: 95,
        riskLevel: 'critical',
        recordPeakEvent: '2020 Typhoon Molave (175 km/h, 950 hPa) & 1999 Historic Central Vietnam Deluge',
        whyHighestRisk: 'The narrowest strip of Vietnam (as narrow as 50 km between the sea and the Truong Son / Annamite mountains). Incoming typhoons drop catastrophic rain that cascades down short, steep river basins within hours, causing deadly flash floods and landslides.',
        keyDisasters: [
          {
            eventName: 'Typhoon Molave',
            year: 2020,
            intensityOrMagnitude: 'Category 3 (175 km/h wind, 950 hPa, 400 mm rain)',
            casualties: '89 fatalities or missing (massive mountain landslides)',
            economicLoss: '$860 Million USD',
            summary: 'Tore roofs off 90,000 homes in Quang Nam and Quang Ngai; triggered devastating landslide in Tra Leng.'
          },
          {
            eventName: '1999 Historic Central Vietnam Floods',
            year: 1999,
            intensityOrMagnitude: 'Tropical Depression + Cold Surge (2,000 mm rain in 7 days)',
            casualties: '595 fatalities',
            economicLoss: '$250 Million USD',
            summary: 'Submerged ancient imperial city of Hue under 3 meters of water for a week; worst flood in 100 years.'
          },
          {
            eventName: 'Typhoon Noru',
            year: 2022,
            intensityOrMagnitude: 'Category 4 peak / Cat 2 landfall (140 km/h wind at Da Nang)',
            casualties: 'Zero in Vietnam (400,000 preemptively evacuated)',
            economicLoss: '$180 Million USD',
            summary: 'Demonstrated effectiveness of digital early warning sirens and military evacuation mobilization.'
          }
        ],
        geologicalOrClimaticFactor: 'Steep Truong Son mountain range creates rapid orographic rainfall run-off with concentration time <6 hours.',
        populationExposed: '6.5 Million in central coastal provinces',
        recommendedMitigation: 'Community-based flood telemetry sensors, multi-purpose two-story storm-resistant housing (Green Climate Fund), reforestation of upstream slopes.'
      },
      {
        id: 'vn-gulf-tonkin',
        rank: 2,
        name: 'Northern Gulf of Tonkin (Hai Phong, Quang Ninh / Ha Long)',
        region: 'Red River Delta & Northeast',
        country: 'Vietnam',
        coordinates: { lat: 20.84, lon: 106.68 },
        impactRadiusKm: 75,
        primaryHazard: 'cyclone',
        hazardTypes: ['cyclone', 'surge'],
        riskScore: 96,
        riskLevel: 'critical',
        recordPeakEvent: '2024 Super Typhoon Yagi (Category 4-5, 215 km/h sustained wind, 925 hPa) - strongest typhoon in northern Vietnam in 70 years',
        whyHighestRisk: 'The major industrial and logistics port hub of northern Vietnam. The enclosed Gulf of Tonkin traps and amplifies storm surges, while surrounding limestone karst terrain is susceptible to catastrophic rock collapses.',
        keyDisasters: [
          {
            eventName: 'Super Typhoon Yagi',
            year: 2024,
            intensityOrMagnitude: 'Category 4 Super Typhoon (215 km/h landfall, 925 hPa)',
            casualties: '344 fatalities or missing (mostly upstream flash floods/landslides in Lao Cai)',
            economicLoss: '$3.3 Billion USD in Vietnam',
            summary: 'Strongest storm to hit northern Vietnam in 70 years; sunk 30+ ships in Ha Long Bay, collapsed Phong Chau bridge, and severed Hai Phong industrial power.'
          },
          {
            eventName: 'Typhoon Kalmaegi',
            year: 2014,
            intensityOrMagnitude: 'Category 2 (140 km/h, 970 hPa)',
            casualties: '13 fatalities',
            economicLoss: '$150 Million USD',
            summary: 'Overtopped sea dikes in Cat Ba island and flooded coastal industrial export processing zones.'
          },
          {
            eventName: 'Typhoon Wayne',
            year: 1986,
            intensityOrMagnitude: 'Category 2 (Erratically looping typhoon, 130 km/h)',
            casualties: '433 fatalities',
            economicLoss: '$200 Million USD',
            summary: 'Struck Red River Delta with prolonged rain, destroying hundreds of thousands of homes.'
          }
        ],
        geologicalOrClimaticFactor: 'Enclosed Gulf of Tonkin geometry magnifies storm surges + high concentration of low-lying industrial parks.',
        populationExposed: '4.8 Million in Hai Phong and coastal Quang Ninh',
        recommendedMitigation: 'Reinforced 1-in-100 year sea dikes, marine vessel smart tracking port mandates, industrial park rooftop wind standards.'
      },
      {
        id: 'vn-mekong-delta',
        rank: 3,
        name: 'Mekong Delta Coastal Fringe (Ca Mau, Ben Tre, Soc Trang)',
        region: 'Mekong River Delta',
        country: 'Vietnam',
        coordinates: { lat: 9.17, lon: 105.15 },
        impactRadiusKm: 65,
        primaryHazard: 'surge',
        hazardTypes: ['cyclone', 'surge'],
        riskScore: 89,
        riskLevel: 'high',
        recordPeakEvent: '1997 Typhoon Linda (Category 1, 3,000+ casualties - deadliest storm in modern Vietnamese history)',
        whyHighestRisk: 'Because southern Vietnam rarely experiences direct typhoons, coastal fishing fleets and residential buildings were historically unbuilt for cyclonic winds. Exacerbated by land subsidence from groundwater pumping and sea level rise.',
        keyDisasters: [
          {
            eventName: 'Typhoon Linda',
            year: 1997,
            intensityOrMagnitude: 'Category 1 / Severe Tropical Storm (100–120 km/h wind, 985 hPa)',
            casualties: '3,111 fatalities or missing',
            economicLoss: '$400 Million USD',
            summary: 'Deadliest storm in modern Vietnam history; caught 3,000+ fishermen in unmotorized wooden boats unprepared off Ca Mau.'
          },
          {
            eventName: 'Tropical Storm Tembin',
            year: 2017,
            intensityOrMagnitude: 'Category 2 approaching Mekong Delta (evacuation of 1 million)',
            casualties: 'Minimal in Vietnam due to unprecedented mobilization',
            economicLoss: '$50 Million USD',
            summary: 'Weakened before landfall but prompted the largest defensive evacuation in southern Vietnamese history.'
          },
          {
            eventName: '2020 Historic Saline Drought & Sea Intrusion',
            year: 2020,
            intensityOrMagnitude: 'Severe sea water intrusion up to 80 km inland into Mekong channels',
            casualties: 'Agricultural crisis',
            economicLoss: '$200 Million USD',
            summary: 'Dry season tidal surges salinized fruit orchards and rice paddies across Ben Tre and Tien Giang.'
          }
        ],
        geologicalOrClimaticFactor: 'Average elevation <1.5m above sea level + delta subsidence rate up to 2-3 cm/year.',
        populationExposed: '17.5 Million across the fertile rice basket of Vietnam',
        recommendedMitigation: 'Cai Lon - Cai Be super salinity barrier gates, mangrove belt conservation, transition to brackish shrimp-mangrove ecology.'
      }
    ]
  },
  {
    id: 'fiji',
    name: 'Fiji & South Pacific',
    code: 'FJI',
    flag: '🇫🇯',
    basinRegion: 'Oceania',
    center: { lat: -17.7, lon: 178.0 },
    defaultZoom: 7,
    totalHistoricalEventsOnRecord: 130,
    mostFrequentHazard: 'Category 5 Severe Tropical Cyclones & Coral Reef Surges',
    countryOverview: 'Located in the South Pacific convergence zone. Faces Category 5 severe tropical cyclones that generate massive waves overtopping narrow coral reef barrier rings and inundating coastal villages.',
    officialDataSources: ['Fiji Meteorological Service (FMS / RSMC Nadi)', 'National Disaster Management Office (NDMO)'],
    topRiskPlaces: [
      {
        id: 'fj-viti-levu-coral',
        rank: 1,
        name: 'Viti Levu & Coral Coast (Nadi, Ba, Lautoka, Rakiraki)',
        region: 'Western Division',
        country: 'Fiji & South Pacific',
        coordinates: { lat: -17.80, lon: 177.41 },
        impactRadiusKm: 65,
        primaryHazard: 'cyclone',
        hazardTypes: ['cyclone', 'surge'],
        riskScore: 96,
        riskLevel: 'critical',
        recordPeakEvent: '2016 Severe Tropical Cyclone Winston (Category 5, 280 km/h 10-min sustained, 305 km/h gusts, 884 hPa) - strongest cyclone in Southern Hemisphere history',
        whyHighestRisk: 'The main economic and tourism island of Fiji. Cyclones crossing the warm waters between Vanuatu and Fiji rapidly intensify to Category 5 before slamming into the north and west coasts of Viti Levu.',
        keyDisasters: [
          {
            eventName: 'Severe Tropical Cyclone Winston',
            year: 2016,
            intensityOrMagnitude: 'Category 5 (280 km/h 10-min sustained, 884 hPa lowest pressure recorded in Southern Hemisphere)',
            casualties: '44 fatalities',
            economicLoss: '$1.4 Billion USD (equivalent to 31% of Fiji’s national GDP)',
            summary: 'Strongest tropical cyclone to ever make landfall in the Southern Hemisphere; destroyed 40,000 homes in Rakiraki and Koro Island.'
          },
          {
            eventName: 'Cyclone Evan',
            year: 2012,
            intensityOrMagnitude: 'Category 4 (185 km/h, 943 hPa)',
            casualties: 'Zero in Fiji (timely evacuation)',
            economicLoss: '$108 Million USD',
            summary: 'Severely battered the Mamanuca tourist resorts and western Viti Levu.'
          },
          {
            eventName: 'Cyclone Kina',
            year: 1993,
            intensityOrMagnitude: 'Category 3 (150 km/h, 955 hPa)',
            casualties: '23 fatalities',
            economicLoss: '$100 Million USD',
            summary: 'Washed away Sigatoka and Ba major road bridges, paralyzing the national economy.'
          }
        ],
        geologicalOrClimaticFactor: 'Very warm South Pacific Ocean heat content (>29°C) + low vertical wind shear in summer months.',
        populationExposed: '600,000 on main island of Viti Levu',
        recommendedMitigation: 'Fiji National Building Code cyclone tie-down enforcement, village river flood retention dikes, buried airport grid power.'
      },
      {
        id: 'fj-vanua-levu',
        rank: 2,
        name: 'Vanua Levu & Koro Sea (Labasa, Savusavu, Koro Island)',
        region: 'Northern Division',
        country: 'Fiji & South Pacific',
        coordinates: { lat: -16.43, lon: 179.37 },
        impactRadiusKm: 60,
        primaryHazard: 'cyclone',
        hazardTypes: ['cyclone', 'surge'],
        riskScore: 92,
        riskLevel: 'extreme',
        recordPeakEvent: '2020 Severe Tropical Cyclone Yasa (Category 5, 250 km/h sustained wind, 917 hPa)',
        whyHighestRisk: 'The second largest island in Fiji, surrounded by extensive coral barrier reefs and shallow passages. Direct hits from Category 5 storms create extreme localized funneling surges into coastal villages.',
        keyDisasters: [
          {
            eventName: 'Severe Tropical Cyclone Yasa',
            year: 2020,
            intensityOrMagnitude: 'Category 5 Severe Tropical Cyclone (250 km/h sustained wind, 917 hPa)',
            casualties: '4 fatalities',
            economicLoss: '$250 Million USD',
            summary: 'Direct landfall on Bua province, Vanua Levu; wiped out 80% of houses in remote rural villages.'
          },
          {
            eventName: 'Severe Tropical Cyclone Tomas',
            year: 2010,
            intensityOrMagnitude: 'Category 4 (185 km/h, 925 hPa)',
            casualties: '3 fatalities',
            economicLoss: '$45 Million USD',
            summary: 'Damaged food crops and school buildings across northern and eastern divisions.'
          },
          {
            eventName: 'Cyclone Ana',
            year: 2021,
            intensityOrMagnitude: 'Category 2 (Slow moving, 400 mm torrential rain)',
            casualties: '1 fatality',
            economicLoss: '$50 Million USD',
            summary: 'Struck just weeks after Yasa, causing widespread river flooding across Labasa.'
          }
        ],
        geologicalOrClimaticFactor: 'Isolated archipelago geography hinders rapid emergency relief logistics from the main capital Suva.',
        populationExposed: '135,000 residents across Vanua Levu and Koro Sea islands',
        recommendedMitigation: 'Pre-positioned disaster relief containers in each district, satellite VSAT internet emergency backup in remote schools.'
      },
      {
        id: 'fj-yasawa-mamanuca',
        rank: 3,
        name: 'Yasawa & Mamanuca Island Chains',
        region: 'Western Division (Offshore)',
        country: 'Fiji & South Pacific',
        coordinates: { lat: -16.92, lon: 177.38 },
        impactRadiusKm: 50,
        primaryHazard: 'surge',
        hazardTypes: ['cyclone', 'surge'],
        riskScore: 90,
        riskLevel: 'extreme',
        recordPeakEvent: '2020 Cyclone Harold (Category 5, 270 km/h wind) & 2012 Cyclone Evan',
        whyHighestRisk: 'Extremely thin, low-lying volcanic and sand-cay islands completely exposed to open ocean swells. Lacks any mountain buffers or mainland elevation; storm surges can wash completely across narrow island strips.',
        keyDisasters: [
          {
            eventName: 'Severe Tropical Cyclone Harold',
            year: 2020,
            intensityOrMagnitude: 'Category 5 (270 km/h wind, 912 hPa, 5m storm surge waves)',
            casualties: '1 fatality in Fiji (30+ in Solomon Islands/Vanuatu)',
            economicLoss: '$30 Million USD (hotel & village destruction)',
            summary: 'Destroyed beachfront bungalows, solar water systems, and coastal piers across the tourist island chains.'
          },
          {
            eventName: 'Cyclone Mick',
            year: 2009,
            intensityOrMagnitude: 'Category 2 (110 km/h, 975 hPa)',
            casualties: '4 fatalities',
            economicLoss: '$25 Million USD',
            summary: 'Battered the Yasawa islands before striking western Viti Levu.'
          },
          {
            eventName: 'Cyclone Daman',
            year: 2007,
            intensityOrMagnitude: 'Category 4 (185 km/h, 925 hPa)',
            casualties: 'Zero casualties due to cave evacuations',
            economicLoss: '$10 Million USD',
            summary: 'Direct core eye transit over Cikobia island.'
          }
        ],
        geologicalOrClimaticFactor: 'Direct unshielded open-ocean swell run-up + vulnerable coral reef reef-top wave energy dissipation limits.',
        populationExposed: '25,000 residents and thousands of tourists in island resorts',
        recommendedMitigation: 'Traditional reinforced Bure/concrete safe room shelters, solar desalinator protection, marine vessel evacuation protocols.'
      }
    ]
  }
];

export const HAZARD_TYPE_META: Record<string, { label: string; icon: string; color: string; badgeClass: string }> = {
  cyclone: {
    label: 'Tropical Cyclone & Hurricane',
    icon: '🌀',
    color: '#0284c7',
    badgeClass: 'badge-cyclone'
  },
  earthquake: {
    label: 'Megathrust Earthquake & Seismicity',
    icon: '⚡',
    color: '#e11d48',
    badgeClass: 'badge-earthquake'
  },
  tsunami: {
    label: 'Tsunami & Marine Inundation',
    icon: '🌊',
    color: '#06b6d4',
    badgeClass: 'badge-tsunami'
  },
  surge: {
    label: 'Storm Surge & Coastal Inundation',
    icon: '🌊',
    color: '#0284c7',
    badgeClass: 'badge-surge'
  },
  multi_hazard: {
    label: 'Compound Multi-Hazard Hotspot',
    icon: '⚠️',
    color: '#f59e0b',
    badgeClass: 'badge-multi'
  }
};

export const RISK_LEVEL_META: Record<string, { label: string; color: string; bgColor: string; borderColor: string }> = {
  critical: {
    label: 'CRITICAL RISK',
    color: '#ef4444',
    bgColor: 'rgba(239, 68, 68, 0.12)',
    borderColor: '#ef4444'
  },
  extreme: {
    label: 'EXTREME RISK',
    color: '#f97316',
    bgColor: 'rgba(249, 115, 22, 0.12)',
    borderColor: '#f97316'
  },
  high: {
    label: 'ELEVATED RISK',
    color: '#eab308',
    bgColor: 'rgba(234, 179, 8, 0.12)',
    borderColor: '#eab308'
  },
  elevated: {
    label: 'MODERATE RISK',
    color: '#10b981',
    bgColor: 'rgba(16, 185, 129, 0.12)',
    borderColor: '#10b981'
  }
};
