import React, { useState } from 'react';
import type { UserProfile, FirebaseCustomConfig } from '../../types/cyclone';
import {
  meteorologistDemoLogin,
  loginWithEmail,
  registerWithEmail,
  getSavedFirebaseConfig,
  saveFirebaseConfig,
  initFirebase,
  isFirebaseCloudConnected
} from '../../services/firebase';
import { Shield, KeyRound, Cloud, CheckCircle, AlertCircle, X, Sparkles } from 'lucide-react';

interface FirebaseAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: UserProfile) => void;
}

export const FirebaseAuthModal: React.FC<FirebaseAuthModalProps> = ({ isOpen, onClose, onLoginSuccess }) => {
  const [activeTab, setActiveTab] = useState<'auth' | 'config'>('auth');
  const [isRegister, setIsRegister] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [authError, setAuthError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Config tab state
  const [fbConfig, setFbConfig] = useState<FirebaseCustomConfig>(getSavedFirebaseConfig());
  const [configSavedNotice, setConfigSavedNotice] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleDemoLogin = async () => {
    setIsLoading(true);
    try {
      const user = await meteorologistDemoLogin();
      onLoginSuccess(user);
      onClose();
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setAuthError("Please fill in email and password");
      return;
    }
    setAuthError(null);
    setIsLoading(true);

    try {
      let user: UserProfile;
      if (isRegister) {
        user = await registerWithEmail(email, password, displayName);
      } else {
        user = await loginWithEmail(email, password);
      }
      onLoginSuccess(user);
      onClose();
    } catch (err: any) {
      setAuthError(err.message || "Authentication failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveConfig = () => {
    saveFirebaseConfig(fbConfig);
    initFirebase();
    setConfigSavedNotice("Firebase credentials updated and re-initialized!");
    setTimeout(() => setConfigSavedNotice(null), 4000);
  };

  return (
    <div className="modal-backdrop" id="firebase-auth-modal">
      <div className="modal-card">
        {/* Modal Header */}
        <div className="modal-header">
          <div className="flex items-center gap-2">
            <div className="icon-badge">
              <Shield className="w-5 h-5 text-cyan-400" />
            </div>
            <div>
              <h3 className="modal-title">FIREBASE AUTHENTICATION & CLOUD SYNC</h3>
              <p className="modal-subtitle">Operational Meteorological Access Control & Telemetry Sync</p>
            </div>
          </div>
          <button className="close-btn" onClick={onClose} id="close-auth-modal-btn">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="modal-tabs">
          <button
            className={`modal-tab ${activeTab === 'auth' ? 'active' : ''}`}
            onClick={() => setActiveTab('auth')}
            id="tab-auth-btn"
          >
            <KeyRound className="w-4 h-4 inline mr-1.5" />
            Meteorologist Login
          </button>
          <button
            className={`modal-tab ${activeTab === 'config' ? 'active' : ''}`}
            onClick={() => setActiveTab('config')}
            id="tab-config-btn"
          >
            <Cloud className="w-4 h-4 inline mr-1.5" />
            Firebase Config Manager
          </button>
        </div>

        {/* Tab 1: Auth */}
        {activeTab === 'auth' && (
          <div className="modal-body">
            {/* Fast-Track Meteorologist Demo Access */}
            <div className="demo-box">
              <div className="demo-badge">
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span className="font-semibold text-amber-200">1-Click Fast-Track Demo Access</span>
              </div>
              <p className="demo-desc">
                Instantly authenticate as Senior Meteorologist Dr. K. Sharma at RSMC New Delhi with full operational clearance.
              </p>
              <button
                className="demo-btn"
                onClick={handleDemoLogin}
                disabled={isLoading}
                id="demo-login-btn"
              >
                Launch Meteorologist Demo Session
              </button>
            </div>

            <div className="divider-row">
              <span>OR ENTER CREDENTIALS</span>
            </div>

            <form onSubmit={handleEmailAuth} className="auth-form">
              {isRegister && (
                <div className="form-group">
                  <label>Full Officer Name</label>
                  <input
                    type="text"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    placeholder="e.g. Dr. Rajesh Verma"
                    className="form-input"
                    id="register-name-input"
                  />
                </div>
              )}

              <div className="form-group">
                <label>Official Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="analyst@imd.gov.in"
                  className="form-input"
                  id="auth-email-input"
                  required
                />
              </div>

              <div className="form-group">
                <label>Access Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="form-input"
                  id="auth-password-input"
                  required
                />
              </div>

              {authError && (
                <div className="auth-error-msg">
                  <AlertCircle className="w-4 h-4 text-rose-400 inline mr-1" />
                  {authError}
                </div>
              )}

              <button
                type="submit"
                className="auth-submit-btn"
                disabled={isLoading}
                id="auth-submit-btn"
              >
                {isLoading ? 'Authenticating...' : (isRegister ? 'Register Officer Account' : 'Sign In with Firebase')}
              </button>

              <div className="switch-auth-mode">
                {isRegister ? (
                  <span>Already have an account? <button type="button" onClick={() => setIsRegister(false)}>Sign In</button></span>
                ) : (
                  <span>New meteorological analyst? <button type="button" onClick={() => setIsRegister(true)}>Create Account</button></span>
                )}
              </div>
            </form>
          </div>
        )}

        {/* Tab 2: Firebase Configuration Manager */}
        {activeTab === 'config' && (
          <div className="modal-body">
            <div className="config-status-card">
              <div className="flex items-center gap-2">
                <div className={`status-dot ${isFirebaseCloudConnected() ? 'live' : 'sim'}`}></div>
                <span className="font-semibold text-sm">
                  {isFirebaseCloudConnected() ? 'Connected to Live Firebase Cloud Project' : 'Running in Active Operational Simulation Sandbox'}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Supply your Firebase Web App credentials below. When provided, the app securely synchronizes cyclone diagnostic records directly to your live Firestore database (`ai_diagnostics`).
              </p>
            </div>

            {configSavedNotice && (
              <div className="config-success-banner">
                <CheckCircle className="w-4 h-4 text-emerald-400 inline mr-1.5" />
                {configSavedNotice}
              </div>
            )}

            <div className="config-grid">
              <div className="form-group">
                <label>API Key (`apiKey`)</label>
                <input
                  type="text"
                  value={fbConfig.apiKey}
                  onChange={(e) => setFbConfig({ ...fbConfig, apiKey: e.target.value })}
                  className="form-input font-mono text-xs"
                  id="cfg-api-key"
                />
              </div>
              <div className="form-group">
                <label>Auth Domain (`authDomain`)</label>
                <input
                  type="text"
                  value={fbConfig.authDomain}
                  onChange={(e) => setFbConfig({ ...fbConfig, authDomain: e.target.value })}
                  className="form-input font-mono text-xs"
                  id="cfg-auth-domain"
                />
              </div>
              <div className="form-group">
                <label>Project ID (`projectId`)</label>
                <input
                  type="text"
                  value={fbConfig.projectId}
                  onChange={(e) => setFbConfig({ ...fbConfig, projectId: e.target.value })}
                  className="form-input font-mono text-xs"
                  id="cfg-project-id"
                />
              </div>
              <div className="form-group">
                <label>Storage Bucket (`storageBucket`)</label>
                <input
                  type="text"
                  value={fbConfig.storageBucket}
                  onChange={(e) => setFbConfig({ ...fbConfig, storageBucket: e.target.value })}
                  className="form-input font-mono text-xs"
                  id="cfg-storage-bucket"
                />
              </div>
              <div className="form-group">
                <label>App ID (`appId`)</label>
                <input
                  type="text"
                  value={fbConfig.appId}
                  onChange={(e) => setFbConfig({ ...fbConfig, appId: e.target.value })}
                  className="form-input font-mono text-xs"
                  id="cfg-app-id"
                />
              </div>
              <div className="form-group">
                <label>Messaging Sender ID (`messagingSenderId`)</label>
                <input
                  type="text"
                  value={fbConfig.messagingSenderId}
                  onChange={(e) => setFbConfig({ ...fbConfig, messagingSenderId: e.target.value })}
                  className="form-input font-mono text-xs"
                  id="cfg-messaging-sender-id"
                />
              </div>
            </div>

            <div className="config-btn-row">
              <button
                className="config-save-btn"
                onClick={handleSaveConfig}
                id="save-firebase-config-btn"
              >
                Apply & Save Configuration
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
