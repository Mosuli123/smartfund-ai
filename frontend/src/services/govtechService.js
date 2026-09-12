// govtechService.js
// Government Funding Intelligence & Access Platform
// Four Horsemen Technologies | SITA GovTech Hackathon 2026

const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:8600/api';

const headers = () => {
  const token = localStorage.getItem('govtech_token');
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {})
  };
};

const request = async (method, path, body = null) => {
  try {
    const res = await fetch(`${API_BASE}${path}`, {
      method,
      headers: headers(),
      ...(body ? { body: JSON.stringify(body) } : {})
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({ detail: 'Request failed' }));
      throw new Error(err.detail || 'Request failed');
    }
    return res.json();
  } catch (error) {
    console.error(`API ${method} ${path}:`, error.message);
    throw error;
  }
};

// ── Auth ──────────────────────────────────────────────────────────────────────
export const login = async (username, password) => {
  const data = await request('POST', '/auth/login', { username, password });
  if (data.success) {
    localStorage.setItem('govtech_token', data.token);
    localStorage.setItem('govtech_user', JSON.stringify(data.user));
  }
  return data;
};

export const logout = () => {
  localStorage.removeItem('govtech_token');
  localStorage.removeItem('govtech_user');
  localStorage.removeItem('govtech_profile');
};

export const getCurrentUser = () => {
  try {
    const u = localStorage.getItem('govtech_user');
    return u ? JSON.parse(u) : null;
  } catch { return null; }
};

export const isAuthenticated = () => !!localStorage.getItem('govtech_token');

// ── Profile ───────────────────────────────────────────────────────────────────
export const saveProfile = async (profile) => {
  const data = await request('POST', '/profile', profile);
  localStorage.setItem('govtech_profile', JSON.stringify(profile));
  return data;
};

export const getProfile = (userId = 'demo_user') =>
  request('GET', `/profile/${userId}`);

export const getStoredProfile = () => {
  try {
    const p = localStorage.getItem('govtech_profile');
    return p ? JSON.parse(p) : null;
  } catch { return null; }
};

// ── Funding Programmes ────────────────────────────────────────────────────────
export const getProgrammes = () => request('GET', '/funding-programmes');

export const getProgramme = (id) => request('GET', `/funding-programmes/${id}`);

// ── AI Matching ───────────────────────────────────────────────────────────────
export const matchFunding = async (profile) => {
  const data = await request('POST', '/match-funding', profile);
  if (data.matches) {
    localStorage.setItem('govtech_matches', JSON.stringify(data.matches));
  }
  return data;
};

export const getStoredMatches = () => {
  try {
    const m = localStorage.getItem('govtech_matches');
    return m ? JSON.parse(m) : [];
  } catch { return []; }
};

// ── Applications ──────────────────────────────────────────────────────────────
export const submitApplication = (data) =>
  request('POST', '/applications/submit', data);

export const getApplications = (userId = 'demo_user') =>
  request('GET', `/applications?user_id=${userId}`);

// ── Government Intelligence ───────────────────────────────────────────────────
export const getIntelligenceOverview = () =>
  request('GET', '/intelligence/overview');

// ── PDF Generation ────────────────────────────────────────────────────────────
export const generateApplicationPDF = (profile) =>
  request('POST', '/generate-application', profile);

export const downloadPDF = (base64Data, filename) => {
  try {
    const bytes = atob(base64Data);
    const arr = new Uint8Array(bytes.length);
    for (let i = 0; i < bytes.length; i++) arr[i] = bytes.charCodeAt(i);
    const blob = new Blob([arr], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = filename; a.click();
    URL.revokeObjectURL(url);
  } catch (e) {
    console.error('PDF download failed:', e);
  }
};

// ── Health ────────────────────────────────────────────────────────────────────
export const healthCheck = () => request('GET', '/health');

// ── Utilities ─────────────────────────────────────────────────────────────────
export const formatCurrency = (amount) =>
  new Intl.NumberFormat('en-ZA', { style: 'currency', currency: 'ZAR', maximumFractionDigits: 0 }).format(amount);

export const formatNumber = (n) =>
  new Intl.NumberFormat('en-ZA').format(n);

export const getMatchClass = (score) => {
  if (score >= 75) return 'gov-match-high';
  if (score >= 50) return 'gov-match-medium';
  return 'gov-match-low';
};
