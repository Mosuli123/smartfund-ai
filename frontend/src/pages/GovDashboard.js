import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// ── Demo data ──────────────────────────────────────────────────────────────
const KPI_DATA = [
  { label: 'Funding Programmes', value: '8', sub: 'Active & open', color: '#1a4f8a', bg: '#eff6ff' },
  { label: 'Total Applications', value: '4,872', sub: '+18% this quarter', color: '#1a7a4a', bg: '#f0fdf4' },
  { label: 'Applications This Month', value: '412', sub: 'Oct 2025', color: '#c8922a', bg: '#fffbeb' },
  { label: 'Approved Applications', value: '2,341', sub: '48% approval rate', color: '#1a4f8a', bg: '#eff6ff' },
  { label: 'Pending Review', value: '687', sub: 'Avg 12 days processing', color: '#92400e', bg: '#fef9c3' },
  { label: 'Funding Demand', value: 'R8.4B', sub: 'Total requested', color: '#1a7a4a', bg: '#f0fdf4' },
  { label: 'Funding Disbursed', value: 'R3.1B', sub: '37% of demand met', color: '#c8922a', bg: '#fffbeb' },
  { label: 'SMMEs Assisted', value: '2,341', sub: 'Funded to date', color: '#1a4f8a', bg: '#eff6ff' },
];

const SECTOR_DATA = [
  { sector: 'Manufacturing', applications: 1240, demand: 2100, pct: 82 },
  { sector: 'Agriculture', applications: 980, demand: 1650, pct: 74 },
  { sector: 'Technology / ICT', applications: 760, demand: 1200, pct: 68 },
  { sector: 'Green Economy', applications: 540, demand: 980, pct: 55 },
  { sector: 'Tourism', applications: 420, demand: 720, pct: 48 },
  { sector: 'Retail & Services', applications: 380, demand: 640, pct: 42 },
  { sector: 'Construction', applications: 290, demand: 510, pct: 35 },
  { sector: 'Agro-processing', applications: 262, demand: 480, pct: 32 },
];

const GEO_DATA = [
  { province: 'Gauteng', applications: 1420, demand: 'R2.4B', gap: 'High', pct: 88 },
  { province: 'KwaZulu-Natal', applications: 890, demand: 'R1.5B', gap: 'Medium', pct: 62 },
  { province: 'Eastern Cape', applications: 720, demand: 'R1.2B', gap: 'High', pct: 55 },
  { province: 'Western Cape', applications: 680, demand: 'R1.1B', gap: 'Low', pct: 52 },
  { province: 'Limpopo', applications: 340, demand: 'R580M', gap: 'Critical', pct: 28 },
  { province: 'Mpumalanga', applications: 290, demand: 'R490M', gap: 'High', pct: 24 },
  { province: 'North West', applications: 220, demand: 'R370M', gap: 'Critical', pct: 18 },
  { province: 'Free State', applications: 190, demand: 'R320M', gap: 'High', pct: 16 },
  { province: 'Northern Cape', applications: 122, demand: 'R210M', gap: 'Critical', pct: 10 },
];

const PROGRAMME_DATA = [
  { name: 'SEDA SMME Growth Fund', apps: 1240, approved: 620, rejected: 310, pending: 310, rate: 50, allocated: 'R620M', disbursed: 'R480M' },
  { name: 'IDC Manufacturing Fund', apps: 890, approved: 534, rejected: 178, pending: 178, rate: 60, allocated: 'R2.1B', disbursed: 'R1.6B' },
  { name: 'TIA Technology Fund', apps: 760, approved: 380, rejected: 228, pending: 152, rate: 50, allocated: 'R760M', disbursed: 'R520M' },
  { name: 'DAFF Agricultural Grant', apps: 680, approved: 408, rejected: 136, pending: 136, rate: 60, allocated: 'R408M', disbursed: 'R310M' },
  { name: 'NEF Black Industrialists', apps: 540, approved: 216, rejected: 216, pending: 108, rate: 40, allocated: 'R1.1B', disbursed: 'R720M' },
  { name: 'Youth Enterprise Fund', apps: 420, approved: 252, rejected: 84, pending: 84, rate: 60, allocated: 'R105M', disbursed: 'R82M' },
];

const BARRIER_DATA = [
  { barrier: 'Insufficient documentation', count: 1240, pct: 38 },
  { barrier: 'Business age requirements not met', count: 820, pct: 25 },
  { barrier: 'Turnover / revenue requirements', count: 680, pct: 21 },
  { barrier: 'Sector restrictions', count: 490, pct: 15 },
  { barrier: 'Credit / compliance requirements', count: 380, pct: 12 },
  { barrier: 'Incomplete applications', count: 310, pct: 10 },
  { barrier: 'Geographic restrictions', count: 240, pct: 7 },
];

const gapColor = g => ({ Critical: ['#fef2f2', '#991b1b'], High: ['#fffbeb', '#92400e'], Medium: ['#fef9c3', '#854d0e'], Low: ['#f0fdf4', '#166634'] }[g] || ['#f1f5f9', '#475569']);

// ── Programme insights (derived from PROGRAMME_DATA) ───────────────────────
const best    = [...PROGRAMME_DATA].sort((a, b) => b.rate - a.rate)[0];
const worst   = [...PROGRAMME_DATA].sort((a, b) => a.rate - b.rate)[0];
const totalPending = PROGRAMME_DATA.reduce((s, p) => s + p.pending, 0);
const totalApps    = PROGRAMME_DATA.reduce((s, p) => s + p.apps, 0);
const totalApproved = PROGRAMME_DATA.reduce((s, p) => s + p.approved, 0);
const avgRate = Math.round(PROGRAMME_DATA.reduce((s, p) => s + p.rate, 0) / PROGRAMME_DATA.length);
const highPending  = [...PROGRAMME_DATA].sort((a, b) => b.pending - a.pending)[0];
const pendingPct   = Math.round((totalPending / totalApps) * 100);
const aboveAvg     = PROGRAMME_DATA.filter(p => p.rate >= avgRate).length;

const PROG_INSIGHTS = [
  {
    icon: '🏆', label: 'Best Performing Programme',
    color: '#166534', bg: '#f0fdf4', border: '#bbf7d0',
    title: best.name,
    body: `Leads the portfolio with a ${best.rate}% approval rate — ${best.approved.toLocaleString()} of ${best.apps.toLocaleString()} applications approved. ${best.disbursed} disbursed against ${best.allocated} allocated, indicating strong execution capacity.`,
    rec: `Use ${best.name} as the benchmark model. Replicate its eligibility criteria design and processing workflow across lower-performing programmes.`
  },
  {
    icon: '⚠️', label: 'Needs Attention',
    color: '#92400e', bg: '#fffbeb', border: '#fde68a',
    title: `${worst.name} — lowest approval rate at ${worst.rate}%`,
    body: `${worst.rejected.toLocaleString()} applications rejected out of ${worst.apps.toLocaleString()} total. High rejection volume suggests eligibility criteria may be misaligned with the actual SMME applicant pool reaching this programme.`,
    rec: `Conduct an eligibility audit for ${worst.name}. Consider introducing a pre-screening tool to reduce ineligible submissions and improve applicant experience.`
  },
  {
    icon: '⏳', label: 'Pending Backlog Alert',
    color: '#1e40af', bg: '#eff6ff', border: '#bfdbfe',
    title: `${totalPending.toLocaleString()} applications pending across all programmes (${pendingPct}% of total)`,
    body: `${highPending.name} carries the largest single backlog with ${highPending.pending.toLocaleString()} pending decisions. Prolonged backlogs reduce SMME confidence and increase drop-off rates post-submission.`,
    rec: `Prioritise clearing the ${highPending.name} backlog. Introduce automated pre-screening to accelerate initial triage and set a 10-day SLA target for first-response decisions.`
  },
  {
    icon: '📊', label: 'Portfolio Summary',
    color: '#0a2240', bg: '#f8fafc', border: '#e2e8f0',
    title: `Platform-wide average approval rate: ${avgRate}% across ${PROGRAMME_DATA.length} programmes`,
    body: `${totalApproved.toLocaleString()} applications approved from ${totalApps.toLocaleString()} total submissions. ${aboveAvg} of ${PROGRAMME_DATA.length} programmes perform at or above the ${avgRate}% average. Three programmes share the highest rate of 60%, suggesting a replicable model exists.`,
    rec: `Set a platform-wide target of 60% approval rate. Programmes below this threshold should undergo quarterly eligibility and process reviews with findings shared across all programme administrators.`
  },
];

const ProgrammePerformanceTab = ({ Bar }) => (
  <>
    <div style={{ marginBottom: '1.5rem' }}>
      <h1 style={{ fontSize: '1.375rem', fontWeight: 700, color: '#0a2240', marginBottom: '0.25rem' }}>Programme Performance Intelligence</h1>
      <p style={{ color: '#64748b', fontSize: '0.9375rem' }}>Application outcomes and funding utilisation by programme · Prototype demonstration data</p>
    </div>

    {/* Performance table */}
    <div style={{ background: 'white', borderRadius: '0.75rem', border: '1px solid #e2e8f0', overflow: 'hidden', marginBottom: '2rem' }}>
      <div style={{ padding: '1rem 1.5rem', borderBottom: '1px solid #e2e8f0', display: 'grid', gridTemplateColumns: '2.5fr 70px 80px 80px 80px 120px 1fr 1fr', gap: '0.75rem', fontSize: '0.7rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
        <span>Programme</span><span>Apps</span><span>Approved</span><span>Rejected</span><span>Pending</span><span>Approval Rate</span><span>Allocated</span><span>Disbursed</span>
      </div>
      {PROGRAMME_DATA.map((p, i) => (
        <div key={p.name} style={{ padding: '1rem 1.5rem', borderBottom: i < PROGRAMME_DATA.length - 1 ? '1px solid #f1f5f9' : 'none', display: 'grid', gridTemplateColumns: '2.5fr 70px 80px 80px 80px 120px 1fr 1fr', gap: '0.75rem', alignItems: 'center', fontSize: '0.875rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            {p.rate === best.rate && <span title="Best performer">🏆</span>}
            {p.rate === worst.rate && p.name === worst.name && <span title="Needs attention">⚠️</span>}
            <span style={{ fontWeight: 600, color: '#0a2240' }}>{p.name}</span>
          </div>
          <div style={{ color: '#475569' }}>{p.apps.toLocaleString()}</div>
          <div style={{ color: '#166534', fontWeight: 600 }}>{p.approved.toLocaleString()}</div>
          <div style={{ color: '#991b1b' }}>{p.rejected.toLocaleString()}</div>
          <div style={{ color: '#92400e' }}>{p.pending.toLocaleString()}</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Bar pct={p.rate} color={p.rate >= avgRate ? '#1a7a4a' : '#c8922a'} />
            <span style={{ fontWeight: 700, color: p.rate >= avgRate ? '#166534' : '#92400e', minWidth: 32, fontSize: '0.8125rem' }}>{p.rate}%</span>
          </div>
          <div style={{ color: '#475569' }}>{p.allocated}</div>
          <div style={{ color: '#1a4f8a', fontWeight: 600 }}>{p.disbursed}</div>
        </div>
      ))}
      <div style={{ padding: '0.75rem 1.5rem', background: '#f8fafc', borderTop: '1px solid #e2e8f0', display: 'grid', gridTemplateColumns: '2.5fr 70px 80px 80px 80px 120px 1fr 1fr', gap: '0.75rem', fontSize: '0.8125rem', fontWeight: 700, color: '#0a2240' }}>
        <span>Totals / Average</span>
        <span>{totalApps.toLocaleString()}</span>
        <span style={{ color: '#166534' }}>{totalApproved.toLocaleString()}</span>
        <span style={{ color: '#991b1b' }}>{PROGRAMME_DATA.reduce((s,p)=>s+p.rejected,0).toLocaleString()}</span>
        <span style={{ color: '#92400e' }}>{totalPending.toLocaleString()}</span>
        <span style={{ color: avgRate >= 55 ? '#166534' : '#92400e' }}>{avgRate}% avg</span>
        <span style={{ color: '#475569' }}>—</span>
        <span style={{ color: '#1a4f8a' }}>—</span>
      </div>
    </div>

    {/* AI Insights header */}
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', marginBottom: '1rem' }}>
      <div style={{ width: 28, height: 28, background: 'linear-gradient(135deg,#1a4f8a,#2d6cc0)', borderRadius: '0.375rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <span style={{ color: 'white', fontSize: '0.875rem' }}>✦</span>
      </div>
      <h2 style={{ fontSize: '1.0625rem', fontWeight: 700, color: '#0a2240', margin: 0 }}>AI-Generated Programme Insights</h2>
      <span style={{ background: '#eff6ff', color: '#1a4f8a', fontSize: '0.6875rem', fontWeight: 700, padding: '0.2rem 0.5rem', borderRadius: '9999px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Derived from data</span>
    </div>

    {/* Insight cards */}
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(320px,1fr))', gap: '1rem' }}>
      {PROG_INSIGHTS.map((ins, i) => (
        <div key={i} style={{ background: ins.bg, border: `1px solid ${ins.border}`, borderRadius: '0.75rem', padding: '1.25rem', borderLeft: `4px solid ${ins.color}` }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.625rem' }}>
            <span style={{ fontSize: '1.125rem' }}>{ins.icon}</span>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: ins.color, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{ins.label}</span>
          </div>
          <div style={{ fontWeight: 700, color: '#0a2240', fontSize: '0.9375rem', marginBottom: '0.5rem', lineHeight: 1.4 }}>{ins.title}</div>
          <p style={{ color: '#475569', fontSize: '0.8125rem', lineHeight: 1.6, marginBottom: '0.75rem', margin: '0 0 0.75rem' }}>{ins.body}</p>
          <div style={{ background: 'rgba(255,255,255,0.75)', borderRadius: '0.375rem', padding: '0.625rem 0.75rem', fontSize: '0.8125rem', color: ins.color, fontWeight: 600, borderLeft: `3px solid ${ins.color}` }}>
            💡 Recommendation: {ins.rec}
          </div>
        </div>
      ))}
    </div>
  </>
);

// ── Component ──────────────────────────────────────────────────────────────
const GovDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const govUser = JSON.parse(localStorage.getItem('govUser') || '{}');

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'sector', label: 'Sector Intelligence' },
    { id: 'geographic', label: 'Geographic Intelligence' },
    { id: 'programmes', label: 'Programme Performance' },
    { id: 'barriers', label: 'Eligibility Barriers' },
  ];

  const Bar = ({ pct, color = '#1a4f8a' }) => (
    <div style={{ height: 8, background: '#e2e8f0', borderRadius: 4, overflow: 'hidden', flex: 1 }}>
      <div style={{ height: '100%', width: `${pct}%`, background: color, borderRadius: 4, transition: 'width 0.6s ease' }} />
    </div>
  );

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc', fontFamily: 'Inter, sans-serif' }}>
      {/* Header */}
      <header style={{ background: '#0a2240', borderBottom: '3px solid #1a7a4a', padding: '0 1.5rem' }}>
        <div style={{ maxWidth: 1300, margin: '0 auto', height: '4rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ width: 32, height: 32, background: 'linear-gradient(135deg,#1a7a4a,#22a05a)', borderRadius: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ color: 'white', fontWeight: 800, fontSize: '0.875rem' }}>G</span>
            </div>
            <div>
              <div style={{ color: 'white', fontWeight: 700, fontSize: '0.875rem' }}>Government Intelligence Portal</div>
              <div style={{ color: '#4ade80', fontSize: '0.625rem', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase' }}>Funding Demand Analytics · Prototype Demonstration Data</div>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
            <div style={{ textAlign: 'right' }}>
              <div style={{ color: 'white', fontSize: '0.8125rem', fontWeight: 600 }}>{govUser.name || 'Government User'}</div>
              <div style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.7rem' }}>{govUser.dept || 'Government Department'}</div>
            </div>
            <Link to="/" onClick={() => { localStorage.removeItem('govToken'); localStorage.removeItem('govUser'); }}
              style={{ background: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.8)', padding: '0.375rem 0.875rem', borderRadius: '0.375rem', fontSize: '0.8125rem', textDecoration: 'none' }}>
              Sign Out
            </Link>
          </div>
        </div>
      </header>

      {/* Sub-nav tabs */}
      <div style={{ background: 'white', borderBottom: '1px solid #e2e8f0', padding: '0 1.5rem' }}>
        <div style={{ maxWidth: 1300, margin: '0 auto', display: 'flex', gap: '0', overflowX: 'auto' }}>
          {tabs.map(t => (
            <button key={t.id} onClick={() => setActiveTab(t.id)}
              style={{ padding: '1rem 1.25rem', border: 'none', background: 'none', cursor: 'pointer', fontWeight: activeTab === t.id ? 700 : 500, color: activeTab === t.id ? '#1a7a4a' : '#64748b', borderBottom: activeTab === t.id ? '3px solid #1a7a4a' : '3px solid transparent', fontSize: '0.875rem', whiteSpace: 'nowrap', transition: 'color 0.15s' }}>
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: 1300, margin: '0 auto', padding: '2rem 1.5rem' }}>

        {/* ── OVERVIEW ── */}
        {activeTab === 'overview' && (
          <>
            <div style={{ marginBottom: '1.5rem' }}>
              <h1 style={{ fontSize: '1.375rem', fontWeight: 700, color: '#0a2240', marginBottom: '0.25rem' }}>Funding Ecosystem Overview</h1>
              <p style={{ color: '#64748b', fontSize: '0.9375rem' }}>National government funding demand intelligence · October 2025 · Prototype demonstration dataset</p>
            </div>

            {/* KPI grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: '1rem', marginBottom: '2rem' }}>
              {KPI_DATA.map(k => (
                <div key={k.label} style={{ background: 'white', borderRadius: '0.75rem', border: '1px solid #e2e8f0', padding: '1.25rem', borderTop: `3px solid ${k.color}` }}>
                  <div style={{ fontSize: '1.75rem', fontWeight: 800, color: k.color, lineHeight: 1 }}>{k.value}</div>
                  <div style={{ fontWeight: 600, color: '#0a2240', fontSize: '0.875rem', marginTop: '0.375rem' }}>{k.label}</div>
                  <div style={{ color: '#94a3b8', fontSize: '0.75rem', marginTop: '0.25rem' }}>{k.sub}</div>
                </div>
              ))}
            </div>

            {/* Feedback loop */}
            <div style={{ background: 'linear-gradient(135deg,#0a2240,#1a4f8a)', borderRadius: '0.75rem', padding: '1.75rem 2rem', marginBottom: '2rem' }}>
              <h2 style={{ color: 'white', fontWeight: 700, fontSize: '1rem', marginBottom: '0.5rem' }}>The Intelligence Feedback Loop</h2>
              <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.875rem', marginBottom: '1.25rem' }}>
                Every SMME interaction on the platform generates intelligence that helps government understand the funding ecosystem and improve programmes.
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.5rem' }}>
                {['Government Programmes', '→', 'SMME Discovery', '→', 'Applications', '→', 'Outcomes', '→', 'Data', '→', 'Intelligence', '→', 'Better Decisions', '→', 'Improved Programmes'].map((item, i) => (
                  <span key={i} style={{
                    color: item === '→' ? '#c8922a' : 'white',
                    fontWeight: item === '→' ? 400 : 600,
                    fontSize: item === '→' ? '1.125rem' : '0.8125rem',
                    background: item === '→' ? 'transparent' : 'rgba(255,255,255,0.1)',
                    padding: item === '→' ? 0 : '0.3rem 0.625rem',
                    borderRadius: '0.375rem'
                  }}>{item}</span>
                ))}
              </div>
            </div>

            {/* Quick insight cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: '1rem' }}>
              {[
                { title: 'Top Demand Sector', value: 'Manufacturing', detail: '1,240 applications · R2.1B demand', color: '#1a4f8a', icon: '🏭' },
                { title: 'Highest Funding Gap', value: 'Northern Cape', detail: 'Critical gap · Only 10% of demand met', color: '#991b1b', icon: '📍' },
                { title: 'Top Barrier', value: 'Documentation', detail: '38% of incomplete applications', color: '#92400e', icon: '📋' },
                { title: 'Best Performing Programme', value: 'IDC Manufacturing', detail: '60% approval rate · R1.6B disbursed', color: '#1a7a4a', icon: '🏆' },
              ].map(c => (
                <div key={c.title} style={{ background: 'white', borderRadius: '0.75rem', border: '1px solid #e2e8f0', padding: '1.25rem', display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                  <div style={{ fontSize: '1.75rem' }}>{c.icon}</div>
                  <div>
                    <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.25rem' }}>{c.title}</div>
                    <div style={{ fontWeight: 700, color: c.color, fontSize: '1rem', marginBottom: '0.25rem' }}>{c.value}</div>
                    <div style={{ color: '#64748b', fontSize: '0.8125rem' }}>{c.detail}</div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* ── SECTOR INTELLIGENCE ── */}
        {activeTab === 'sector' && (
          <>
            <div style={{ marginBottom: '1.5rem' }}>
              <h1 style={{ fontSize: '1.375rem', fontWeight: 700, color: '#0a2240', marginBottom: '0.25rem' }}>Sector Demand Intelligence</h1>
              <p style={{ color: '#64748b', fontSize: '0.9375rem' }}>Funding demand by industry sector · Prototype demonstration data</p>
            </div>
            <div style={{ background: 'white', borderRadius: '0.75rem', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
              <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid #e2e8f0', display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 80px', gap: '1rem', fontSize: '0.75rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                <span>Sector</span><span>Applications</span><span>Demand (R millions)</span><span>Demand %</span>
              </div>
              {SECTOR_DATA.map((s, i) => (
                <div key={s.sector} style={{ padding: '1rem 1.5rem', borderBottom: i < SECTOR_DATA.length - 1 ? '1px solid #f1f5f9' : 'none', display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 80px', gap: '1rem', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{ fontWeight: 600, color: '#0a2240', fontSize: '0.9375rem' }}>{s.sector}</div>
                  </div>
                  <div style={{ color: '#475569', fontWeight: 600 }}>{s.applications.toLocaleString()}</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <Bar pct={s.pct} color="#1a4f8a" />
                    <span style={{ color: '#475569', fontSize: '0.875rem', minWidth: 40 }}>R{s.demand}M</span>
                  </div>
                  <div style={{ fontWeight: 700, color: s.pct > 60 ? '#1a4f8a' : '#92400e', fontSize: '0.9375rem' }}>{s.pct}%</div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: '1.25rem', padding: '1rem 1.25rem', background: '#eff6ff', borderRadius: '0.5rem', border: '1px solid #bfdbfe', fontSize: '0.875rem', color: '#1e40af' }}>
              <strong>Intelligence insight:</strong> Manufacturing and Agriculture sectors show the highest funding demand. Green Economy is an emerging high-growth sector with significant unmet demand. Consider expanding programme capacity in these areas.
            </div>
          </>
        )}

        {/* ── GEOGRAPHIC INTELLIGENCE ── */}
        {activeTab === 'geographic' && (
          <>
            <div style={{ marginBottom: '1.5rem' }}>
              <h1 style={{ fontSize: '1.375rem', fontWeight: 700, color: '#0a2240', marginBottom: '0.25rem' }}>Geographic Demand Intelligence</h1>
              <p style={{ color: '#64748b', fontSize: '0.9375rem' }}>Funding demand and access gaps by province · Prototype demonstration data</p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
              {GEO_DATA.map(g => {
                const [gbg, gc] = gapColor(g.gap);
                return (
                  <div key={g.province} style={{ background: 'white', borderRadius: '0.75rem', border: '1px solid #e2e8f0', padding: '1.25rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.875rem' }}>
                      <div style={{ fontWeight: 700, color: '#0a2240', fontSize: '0.9375rem' }}>{g.province}</div>
                      <span style={{ background: gbg, color: gc, padding: '0.2rem 0.625rem', borderRadius: 9999, fontSize: '0.7rem', fontWeight: 700 }}>{g.gap} Gap</span>
                    </div>
                    <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '0.875rem' }}>
                      <div>
                        <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginBottom: '0.125rem' }}>Applications</div>
                        <div style={{ fontWeight: 700, color: '#0a2240' }}>{g.applications.toLocaleString()}</div>
                      </div>
                      <div>
                        <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginBottom: '0.125rem' }}>Demand</div>
                        <div style={{ fontWeight: 700, color: '#0a2240' }}>{g.demand}</div>
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <Bar pct={g.pct} color={g.pct > 60 ? '#1a7a4a' : g.pct > 30 ? '#c8922a' : '#dc2626'} />
                      <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: '#475569', minWidth: 32 }}>{g.pct}%</span>
                    </div>
                    <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '0.375rem' }}>of demand met</div>
                  </div>
                );
              })}
            </div>
            <div style={{ padding: '1rem 1.25rem', background: '#fef2f2', borderRadius: '0.5rem', border: '1px solid #fecaca', fontSize: '0.875rem', color: '#991b1b' }}>
              <strong>Critical gap alert:</strong> Northern Cape, North West and Limpopo show critical funding access gaps with less than 30% of demand being met. These provinces require targeted programme expansion and outreach.
            </div>
          </>
        )}

        {/* ── PROGRAMME PERFORMANCE ── */}
        {activeTab === 'programmes' && (
          <ProgrammePerformanceTab Bar={Bar} />
        )}

        {/* ── ELIGIBILITY BARRIERS ── */}
        {activeTab === 'barriers' && (
          <>
            <div style={{ marginBottom: '1.5rem' }}>
              <h1 style={{ fontSize: '1.375rem', fontWeight: 700, color: '#0a2240', marginBottom: '0.25rem' }}>Eligibility Barrier Intelligence</h1>
              <p style={{ color: '#64748b', fontSize: '0.9375rem' }}>Recurring barriers preventing applications from progressing · Prototype demonstration data</p>
            </div>
            <div style={{ background: 'white', borderRadius: '0.75rem', border: '1px solid #e2e8f0', padding: '1.5rem', marginBottom: '1.25rem' }}>
              {BARRIER_DATA.map((b, i) => (
                <div key={b.barrier} style={{ marginBottom: i < BARRIER_DATA.length - 1 ? '1.25rem' : 0 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.375rem' }}>
                    <span style={{ fontWeight: 600, color: '#0a2240', fontSize: '0.9375rem' }}>{b.barrier}</span>
                    <span style={{ fontWeight: 700, color: '#1a4f8a', fontSize: '0.9375rem' }}>{b.count.toLocaleString()} cases ({b.pct}%)</span>
                  </div>
                  <div style={{ height: 10, background: '#e2e8f0', borderRadius: 5, overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${(b.pct / 38) * 100}%`, background: `linear-gradient(90deg, #1a4f8a, #2d6cc0)`, borderRadius: 5, transition: 'width 0.6s ease' }} />
                  </div>
                </div>
              ))}
            </div>
            <div style={{ padding: '1rem 1.25rem', background: '#eff6ff', borderRadius: '0.5rem', border: '1px solid #bfdbfe', fontSize: '0.875rem', color: '#1e40af' }}>
              <strong>Policy recommendation:</strong> Documentation requirements are the single largest barrier (38%). Simplifying document requirements or providing pre-application support could significantly increase successful application rates.
            </div>
          </>
        )}

        {/* Footer note */}
        <div style={{ marginTop: '2.5rem', padding: '1rem 1.25rem', background: 'white', borderRadius: '0.5rem', border: '1px solid #e2e8f0', textAlign: 'center' }}>
          <p style={{ color: '#94a3b8', fontSize: '0.8125rem', margin: 0 }}>
            <strong style={{ color: '#0a2240' }}>Prototype Demonstration Data</strong> — Developed by Four Horsemen Technologies for the SITA GovTech Hackathon 2026. Not an official government platform.
          </p>
        </div>
      </div>
    </div>
  );
};

export default GovDashboard;
