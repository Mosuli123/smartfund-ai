// ─────────────────────────────────────────────────────────────
// Shared Application Store
// Single source of truth for applications across all tiers:
//   SMME Portal  →  submits to APPLICATIONS_KEY
//   Funding Admin →  reads + updates from APPLICATIONS_KEY
//   Gov Dashboard →  reads counts from APPLICATIONS_KEY
// ─────────────────────────────────────────────────────────────

export const APPLICATIONS_KEY = 'submittedApplications';

// Seed applications that are always present for the demo
const SEED_APPLICATIONS = [
  {
    id: 'APP-SEED-001',
    company: 'Thabo Tech Solutions (Pty) Ltd',
    cipc: '2021/345678/07',
    programme: 'SEDA SMME Growth Fund',
    provider: 'SEDA',
    opportunityId: 1,
    amount: 250000,
    submitted: '2025-01-18',
    status: 'Pending',
    score: 87,
    industry: 'Technology',
    province: 'Gauteng',
    employees: 12,
    turnover: 1800000,
    yearsOp: 3,
    email: 'thabo@thabotechsolutions.co.za',
    purpose: 'Expand software development capacity and hire 5 additional developers',
    criteriaMatches: ['Industry match: Technology ✓', 'Funding range: within R50K–R500K ✓', 'Business age: 3 years ✓'],
    gaps: ['Tax clearance certificate not yet uploaded'],
    isSeed: true,
  },
  {
    id: 'APP-SEED-002',
    company: 'Nomvula Agri-Processing CC',
    cipc: '2019/876543/23',
    programme: 'DAFF Agricultural Development Grant',
    provider: 'DAFF',
    opportunityId: 4,
    amount: 480000,
    submitted: '2025-01-17',
    status: 'Under Review',
    score: 91,
    industry: 'Agriculture',
    province: 'KwaZulu-Natal',
    employees: 28,
    turnover: 3200000,
    yearsOp: 5,
    email: 'nomvula@agriprocessing.co.za',
    purpose: 'Purchase cold storage equipment and expand processing facility',
    criteriaMatches: ['Industry match: Agriculture ✓', 'Funding range: within R75K–R1M ✓', 'Location: KZN eligible ✓', 'Business age: 5 years ✓'],
    gaps: [],
    isSeed: true,
  },
  {
    id: 'APP-SEED-003',
    company: 'Green Horizon Energy (Pty) Ltd',
    cipc: '2020/112233/07',
    programme: 'DBSA Green Economy Fund',
    provider: 'DBSA',
    opportunityId: 6,
    amount: 1200000,
    submitted: '2025-01-15',
    status: 'Approved',
    score: 94,
    industry: 'Renewable Energy',
    province: 'Western Cape',
    employees: 35,
    turnover: 8500000,
    yearsOp: 6,
    email: 'info@greenhorizon.co.za',
    purpose: 'Install 500kW solar farm serving 3 rural communities',
    criteriaMatches: ['Industry match: Renewable Energy ✓', 'Funding range: within R300K–R8M ✓', 'Impact: rural communities ✓', 'Business age: 6 years ✓'],
    gaps: [],
    isSeed: true,
  },
  {
    id: 'APP-SEED-004',
    company: 'Sipho Digital Services CC',
    cipc: 'CK2022445566',
    programme: 'TIA Technology Innovation Fund',
    provider: 'TIA',
    opportunityId: 3,
    amount: 175000,
    submitted: '2025-01-14',
    status: 'Pending',
    score: 79,
    industry: 'ICT',
    province: 'Eastern Cape',
    employees: 6,
    turnover: 950000,
    yearsOp: 2,
    email: 'sipho@siphodigital.co.za',
    purpose: 'Develop AI-powered inventory management system for township retailers',
    criteriaMatches: ['Industry match: ICT ✓', 'Innovation criteria: AI application ✓'],
    gaps: ['Business plan needs more detail on commercialisation', 'Prototype not yet demonstrated'],
    isSeed: true,
  },
  {
    id: 'APP-SEED-005',
    company: 'Ubuntu Manufacturing Ltd',
    cipc: '2018/667788/07',
    programme: 'IDC Manufacturing Competitiveness Fund',
    provider: 'IDC',
    opportunityId: 2,
    amount: 3500000,
    submitted: '2025-01-12',
    status: 'Under Review',
    score: 83,
    industry: 'Manufacturing',
    province: 'Limpopo',
    employees: 62,
    turnover: 14000000,
    yearsOp: 7,
    email: 'finance@ubuntumfg.co.za',
    purpose: 'Upgrade production line machinery and expand into SADC export markets',
    criteriaMatches: ['Industry match: Manufacturing ✓', 'Funding range: within IDC range ✓', 'Export potential ✓', 'Job creation: 20 new jobs ✓'],
    gaps: ['Audited financials for 2024 still pending'],
    isSeed: true,
  },
  {
    id: 'APP-SEED-006',
    company: 'Lerato Youth Ventures CC',
    cipc: 'CK2023998877',
    programme: 'Youth Enterprise Development Fund',
    provider: 'NYDA',
    opportunityId: 8,
    amount: 45000,
    submitted: '2025-01-10',
    status: 'Rejected',
    score: 52,
    industry: 'Retail',
    province: 'North West',
    employees: 2,
    turnover: 180000,
    yearsOp: 1,
    email: 'lerato@leratolife.co.za',
    purpose: 'Stock a spaza shop and purchase delivery bicycle',
    criteriaMatches: ['Age criteria: 24 years ✓'],
    gaps: ['Business plan incomplete', 'No proof of trading address', 'Turnover below minimum threshold'],
    isSeed: true,
  },
];

// ── Read all applications (seeds + user-submitted) ──────────
export const getApplications = () => {
  const stored = JSON.parse(localStorage.getItem(APPLICATIONS_KEY) || '[]');
  // Ensure seeds are always present
  const seedIds = SEED_APPLICATIONS.map(s => s.id);
  const userApps = stored.filter(a => !seedIds.includes(a.id));
  // Merge: stored seeds (may have updated statuses) + any new user apps
  const storedSeeds = SEED_APPLICATIONS.map(seed => {
    const updated = stored.find(s => s.id === seed.id);
    return updated || seed;
  });
  return [...storedSeeds, ...userApps];
};

// ── Submit a new application from the SMME portal ───────────
export const submitApplication = (opportunityData, profileData, applicationDraft, signature) => {
  const all = getApplications();
  const newApp = {
    id: `APP-${Date.now()}`,
    company: profileData.business_name || profileData.companyName || 'Your Business',
    cipc: profileData.cipc_registration_number || profileData.cipc || 'N/A',
    programme: opportunityData.name,
    provider: opportunityData.funding_company?.split('(')[0]?.trim() || opportunityData.funding_company || 'Government Programme',
    opportunityId: opportunityData.id,
    amount: parseInt(profileData.funding_amount) || opportunityData.min_amount,
    submitted: new Date().toISOString().split('T')[0],
    status: 'Pending',
    score: opportunityData.match_score || 75,
    industry: profileData.industry || 'General',
    province: profileData.location || 'South Africa',
    employees: parseInt(profileData.employee_count) || 0,
    turnover: parseInt(profileData.annual_turnover) || 0,
    yearsOp: parseInt(profileData.years_in_operation) || 0,
    email: profileData.email || 'applicant@business.co.za',
    purpose: profileData.funding_purpose || applicationDraft?.useOfFunds || 'Business growth and expansion',
    criteriaMatches: (opportunityData.criteriaMatches || []).filter(c => c.met).map(c => `${c.criteria}: ${c.detail} ✓`),
    gaps: opportunityData.gaps || [],
    applicationDraft,
    signature,
    isSeed: false,
    // Also store in SMME-friendly format for Applications.js
    opportunity_name: opportunityData.name,
    funding_company: opportunityData.funding_company,
    amount_requested: parseInt(profileData.funding_amount) || opportunityData.min_amount,
    match_score: opportunityData.match_score || 75,
    contact_email: opportunityData.contact_email,
    status_message: 'Application received and queued for initial review by the funding provider.',
    submission_date: new Date().toISOString().split('T')[0],
    last_updated: new Date().toISOString().split('T')[0],
    timeline: [{ date: new Date().toISOString().split('T')[0], status: 'Submitted', description: 'Application submitted successfully' }],
  };

  const updated = [...all, newApp];
  localStorage.setItem(APPLICATIONS_KEY, JSON.stringify(updated));
  return newApp;
};

// ── Update application status (from Funding Admin) ──────────
export const updateApplicationStatus = (id, newStatus, reviewNote) => {
  const all = getApplications();
  const updated = all.map(a =>
    a.id === id
      ? { ...a, status: newStatus, reviewNote, reviewDate: new Date().toISOString().split('T')[0], last_updated: new Date().toISOString().split('T')[0],
          status_message: STATUS_MESSAGES[newStatus] || a.status_message }
      : a
  );
  localStorage.setItem(APPLICATIONS_KEY, JSON.stringify(updated));
  return updated;
};

// ── Get applications for a specific SMME user ───────────────
export const getUserApplications = (username) => {
  return getApplications().filter(a => !a.isSeed || a.username === username);
};

// ── Stats for Admin Dashboard ────────────────────────────────
export const getAdminStats = () => {
  const all = getApplications();
  return {
    total: all.length,
    pending: all.filter(a => a.status === 'Pending').length,
    underReview: all.filter(a => a.status === 'Under Review').length,
    approved: all.filter(a => a.status === 'Approved').length,
    rejected: all.filter(a => a.status === 'Rejected').length,
  };
};

const STATUS_MESSAGES = {
  'Approved': 'Congratulations! Your application has been approved. A funding agreement will be sent within 5 business days.',
  'Rejected': 'Unfortunately your application was not successful at this time. Please review the feedback and consider reapplying.',
  'Under Review': 'Your application is currently under review by the funding committee.',
  'Pending': 'Application received and queued for initial review.',
};
