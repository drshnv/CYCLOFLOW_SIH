import { initializeApp, getApps, type FirebaseApp } from 'firebase/app';
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut as fbSignOut, 
  type Auth
} from 'firebase/auth';
import { 
  getFirestore, 
  collection, 
  addDoc, 
  getDocs, 
  query, 
  orderBy, 
  limit, 
  type Firestore 
} from 'firebase/firestore';
import type { FirebaseCustomConfig, UserProfile, AIAnalysisResult } from '../types/cyclone';

const DEFAULT_FIREBASE_CONFIG: FirebaseCustomConfig = {
  apiKey: "AIzaSyD-cyclone-ai-demo-key-2026-meteorology",
  authDomain: "cyclone-ai-sih.firebaseapp.com",
  projectId: "cyclone-ai-sih",
  storageBucket: "cyclone-ai-sih.appspot.com",
  messagingSenderId: "987654321012",
  appId: "1:987654321012:web:a1b2c3d4e5f67890"
};

const STORAGE_KEY_CONFIG = "cyclone_ai_firebase_config";
const STORAGE_KEY_USER = "cyclone_ai_demo_user";
const STORAGE_KEY_HISTORY = "cyclone_ai_diagnostic_history";

export const getSavedFirebaseConfig = (): FirebaseCustomConfig => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY_CONFIG);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (e) {
    console.warn("Could not read custom Firebase config from localStorage", e);
  }
  return DEFAULT_FIREBASE_CONFIG;
};

export const saveFirebaseConfig = (config: FirebaseCustomConfig): void => {
  localStorage.setItem(STORAGE_KEY_CONFIG, JSON.stringify(config));
};

let app: FirebaseApp | null = null;
let auth: Auth | null = null;
let db: Firestore | null = null;
let isConnectedToLiveCloud = false;

export const initFirebase = () => {
  const config = getSavedFirebaseConfig();
  try {
    if (!getApps().length) {
      app = initializeApp(config);
    } else {
      app = getApps()[0];
    }
    auth = getAuth(app);
    db = getFirestore(app);
    // Real cloud connection verified if user supplied real keys
    if (config.apiKey && !config.apiKey.includes("demo-key")) {
      isConnectedToLiveCloud = true;
    } else {
      isConnectedToLiveCloud = false;
    }
  } catch (e) {
    console.info("Running in Operational Meteorological Simulation Mode (Local Fallback)", e);
    isConnectedToLiveCloud = false;
  }
  return { app, auth, db, isConnectedToLiveCloud };
};

// Initialize on module load
initFirebase();

export const isFirebaseCloudConnected = (): boolean => {
  return isConnectedToLiveCloud;
};

// --- Authentication Operations ---

export const meteorologistDemoLogin = async (): Promise<UserProfile> => {
  const demoProfile: UserProfile = {
    uid: "met-analyst-imd-09",
    email: "analyst.dr-sharma@imd.gov.in",
    displayName: "Dr. K. Sharma (IMD Chief Forecaster)",
    role: "Senior Meteorologist",
    station: "National Cyclone Warning Centre, New Delhi",
    isDemo: true
  };
  localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(demoProfile));
  return demoProfile;
};

export const getStoredUser = (): UserProfile | null => {
  try {
    const data = localStorage.getItem(STORAGE_KEY_USER);
    if (data) return JSON.parse(data);
  } catch (e) {
    console.error("Failed to parse stored user", e);
  }
  return null;
};

export const logoutUser = async (): Promise<void> => {
  localStorage.removeItem(STORAGE_KEY_USER);
  if (auth && isConnectedToLiveCloud) {
    try {
      await fbSignOut(auth);
    } catch (e) {
      console.warn("Firebase signout warning:", e);
    }
  }
};

export const loginWithEmail = async (email: string, pass: string): Promise<UserProfile> => {
  if (isConnectedToLiveCloud && auth) {
    try {
      const userCred = await signInWithEmailAndPassword(auth, email, pass);
      const u = userCred.user;
      const profile: UserProfile = {
        uid: u.uid,
        email: u.email || email,
        displayName: u.displayName || email.split('@')[0],
        role: "Senior Meteorologist",
        station: "Regional Specialized Meteorological Centre (RSMC)"
      };
      localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(profile));
      return profile;
    } catch (err: any) {
      throw new Error(err.message || "Firebase Cloud Authentication failed");
    }
  } else {
    // Immediate simulated authenticated user
    const profile: UserProfile = {
      uid: "usr-" + Math.random().toString(36).substr(2, 9),
      email: email,
      displayName: email.split('@')[0].toUpperCase(),
      role: "Senior Meteorologist",
      station: "Cyclone Warning Division (RSMC)"
    };
    localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(profile));
    return profile;
  }
};

export const registerWithEmail = async (email: string, pass: string, name: string): Promise<UserProfile> => {
  if (isConnectedToLiveCloud && auth) {
    try {
      const userCred = await createUserWithEmailAndPassword(auth, email, pass);
      const u = userCred.user;
      const profile: UserProfile = {
        uid: u.uid,
        email: u.email || email,
        displayName: name || u.displayName || email.split('@')[0],
        role: "Disaster Response Officer",
        station: "State Emergency Operations Centre (SEOC)"
      };
      localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(profile));
      return profile;
    } catch (err: any) {
      throw new Error(err.message || "Firebase Cloud Registration failed");
    }
  } else {
    const profile: UserProfile = {
      uid: "usr-" + Math.random().toString(36).substr(2, 9),
      email: email,
      displayName: name || email.split('@')[0],
      role: "Disaster Response Officer",
      station: "State Emergency Operations Centre (SEOC)"
    };
    localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(profile));
    return profile;
  }
};

// --- Firestore Sync & Diagnostics Telemetry ---

export interface DiagnosticRecord {
  id?: string;
  storm_name: string;
  timestamp: string;
  pattern: string;
  t_number: number;
  msw_knots: number;
  pressure_hpa: number;
  imd_category: string;
  eye_coordinates: { x: number; y: number };
  user_email: string;
}

export const logDiagnosticToCloud = async (
  result: AIAnalysisResult, 
  userEmail: string, 
  stormName: string
): Promise<void> => {
  const record: DiagnosticRecord = {
    storm_name: stormName,
    timestamp: new Date().toISOString(),
    pattern: result.classification.primary_pattern,
    t_number: result.intensity.dvorak_t_number,
    msw_knots: result.intensity.msw_knots,
    pressure_hpa: result.intensity.central_pressure_hpa,
    imd_category: result.intensity.imd_category,
    eye_coordinates: { x: result.eye.x, y: result.eye.y },
    user_email: userEmail
  };

  // 1. Always save in local storage history cache
  try {
    const raw = localStorage.getItem(STORAGE_KEY_HISTORY);
    const history: DiagnosticRecord[] = raw ? JSON.parse(raw) : [];
    history.unshift({ ...record, id: "loc-" + Date.now() });
    if (history.length > 25) history.pop();
    localStorage.setItem(STORAGE_KEY_HISTORY, JSON.stringify(history));
  } catch (e) {
    console.warn("Failed to update local diagnostic cache", e);
  }

  // 2. If connected to live Firestore, sync cloud document
  if (isConnectedToLiveCloud && db) {
    try {
      await addDoc(collection(db, "ai_diagnostics"), record);
      console.log("Synced diagnostic report to Firebase Firestore collection 'ai_diagnostics'");
    } catch (e) {
      console.warn("Firestore sync deferred to local cache:", e);
    }
  }
};

export const getDiagnosticHistory = async (): Promise<DiagnosticRecord[]> => {
  // Try Firestore if live
  if (isConnectedToLiveCloud && db) {
    try {
      const q = query(collection(db, "ai_diagnostics"), orderBy("timestamp", "desc"), limit(10));
      const querySnapshot = await getDocs(q);
      const list: DiagnosticRecord[] = [];
      querySnapshot.forEach((doc) => {
        list.push({ id: doc.id, ...(doc.data() as DiagnosticRecord) });
      });
      if (list.length > 0) return list;
    } catch (e) {
      console.warn("Firestore fetch fallback to local history:", e);
    }
  }

  // Fallback to local storage
  try {
    const raw = localStorage.getItem(STORAGE_KEY_HISTORY);
    if (raw) return JSON.parse(raw);
  } catch (e) {}

  // Preload historical sample diagnostics
  return [
    {
      id: "hist-01",
      storm_name: "Cyclone Amphan (2020)",
      timestamp: "2026-09-08T22:30:00Z",
      pattern: "Eye Pattern",
      t_number: 7.0,
      msw_knots: 185,
      pressure_hpa: 907.0,
      imd_category: "Super Cyclonic Storm (SuCS)",
      eye_coordinates: { x: 256, y: 256 },
      user_email: "analyst.dr-sharma@imd.gov.in"
    },
    {
      id: "hist-02",
      storm_name: "Cyclone Biparjoy (2023)",
      timestamp: "2026-09-08T21:15:00Z",
      pattern: "Curved Band Pattern",
      t_number: 5.5,
      msw_knots: 105,
      pressure_hpa: 955.0,
      imd_category: "Extremely Severe Cyclonic Storm (ESCS)",
      eye_coordinates: { x: 248, y: 260 },
      user_email: "analyst.dr-sharma@imd.gov.in"
    }
  ];
};
