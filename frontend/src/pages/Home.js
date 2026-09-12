import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Home = ({ user }) => {
  const [loaded, setLoaded] = useState(false);
  const [profile, setProfile] = useState(null);
  const [matchCount, setMatchCount] = useState(0);

  useEffect(() => {
    setLoaded(true);
    const p = localStorage.getItem('businessProfile');
    if (p) setProfile(JSON.parse(p));
    const m = localStorage.getItem('matchedOpportunities');
    if (m) setMatchCount(JSON.parse(m).length);
  }, []);

  const businessName = user?.companyData?.companyName || profile?.business_name || user?.username || 'Business Owner';

  const quickActions = [
    { title: 'Business Profile',   desc: 'Complete your funding profile',      path: '/profile',               color: 'var(--blue)',  bg: 'var(--blue-50)',  icon: '🏢', badge: profile ? '✓ Complete' : 'Action required', badgeColor: profile ? 'var(--green)' : 'var(--gold)' },
    { title: 'Funding Matches',    desc: 'AI-matched funding opportunities',    path: '/funding-opportunities', color: 'var(--green)', bg: 'var(--green-50)', icon: '🎯', badge: matchCount > 0 ? `${matchCount} matches` : 'Find matches', badgeColor: matchCount > 0 ? 'var(--green)' : 'var(--blue)' },
    { title: 'My Applications',    desc: 'Track application status',            path: '/application-status',    color: 'var(--gold)',  bg: 'var(--gold-pale)', icon: '📋', badge: 'View status', badgeColor: 'var(--gold)' },
    { title: 'Documents',          desc: 'Upload required documents',           path: '/documents',             color: '#7c3aed',      bg: '#f5f3ff',          icon: '📁', badge: 'Manage docs', badgeColor: '#7c3aed' },
  ];

  const steps = [
    { n: '1', title: 'Complete Profile',  desc: 'Enter your business details and funding requirements', done: !!profile },
    { n: '2', title: 'AI Matching',       desc: 'Our engine matches you with relevant government programmes', done: matchCount > 0 },
    { n: '3', title: 'Apply & Track',     desc: 'Submit applications and track progress in real time', done: false },
  ];

  return (
    <div style={{ minHeight: '100vh', background: 'var(--gray-50)', fontFamily: 'var(--font)' }}>

      {/* ── Welcome hero ── */}
      <div className="gov-hero" style={{ padding: '2.5rem 2rem 5rem' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1.5rem' }}>
            <div>
              <span className="gov-badge gov-badge-gold" style={{ marginBottom: '1rem', display: 'inline-flex' }}>SMME Portal</span>
              <h1 style={{ fontSize: 'clamp(1.5rem,3vw,2.25rem)', fontWeight: 800, color: 'white', marginBottom: '0.5rem', letterSpacing: '-0.02em' }}>
                Welcome, {businessName}
              </h1>
              <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '0.9375rem', maxWidth: 480 }}>
                Government Funding Intelligence & Access Platform — Find, assess and apply for government funding.
              </p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 'var(--r-xl)', padding: '0.75rem 1.25rem' }}>
              <span className="pulse-dot" />
              <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.8125rem', fontWeight: 500 }}>AI System Active</span>
            </div>
          </div>

          {!profile && (
            <div className="anim-fade-up delay-200" style={{ marginTop: '1.5rem', background: 'rgba(200,146,42,0.15)', border: '1px solid rgba(200,146,42,0.35)', borderRadius: 'var(--r-xl)', padding: '1rem 1.5rem', display: 'inline-flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
              <span style={{ color: '#fbbf24', fontSize: '0.9rem', fontWeight: 600 }}>⚠ Complete your business profile to unlock AI funding matching</span>
              <Link to="/profile" className="gov-btn gov-btn-gold" style={{ padding: '0.4rem 1rem', fontSize: '0.8125rem' }}>Start →</Link>
            </div>
          )}
        </div>
      </div>

      <div style={{ maxWidth: 1200, margin: '-3rem auto 0', padding: '0 2rem 3rem', position: 'relative', zIndex: 10 }}>

        {/* ── Quick action cards ── */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: '1rem', marginBottom: '2rem' }}>
          {quickActions.map((a, i) => (
            <Link
              key={a.title}
              to={a.path}
              className={`gov-card anim-fade-up ${loaded ? '' : 'opacity-0'}`}
              style={{ padding: '1.5rem', textDecoration: 'none', borderTop: `3px solid ${a.color}`, animationDelay: `${i * 80}ms` }}
            >
              <div style={{ fontSize: '1.875rem', marginBottom: '0.875rem' }}>{a.icon}</div>
              <div style={{ fontWeight: 700, color: 'var(--navy)', marginBottom: '0.25rem', fontSize: '0.9375rem' }}>{a.title}</div>
              <div style={{ color: 'var(--gray-500)', fontSize: '0.8125rem', marginBottom: '0.875rem', lineHeight: 1.5 }}>{a.desc}</div>
              <span style={{ background: a.bg, color: a.badgeColor, padding: '0.2rem 0.625rem', borderRadius: 'var(--r-full)', fontSize: '0.75rem', fontWeight: 700 }}>{a.badge}</span>
            </Link>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '1.5rem', alignItems: 'start' }}>

          {/* ── Funding journey ── */}
          <div className="gov-card" style={{ padding: '2rem' }}>
            <div className="section-header">
              <div className="section-header-icon">
                <span style={{ color: 'white', fontSize: '0.875rem' }}>🗺</span>
              </div>
              <div>
                <div className="section-title">Your Funding Journey</div>
                <div className="section-sub">Three steps to securing government funding</div>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {steps.map((s, i) => (
                <div key={s.n} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', paddingBottom: i < steps.length - 1 ? '1.25rem' : 0, borderBottom: i < steps.length - 1 ? '1px solid var(--gray-100)' : 'none' }}>
                  <div style={{ width: 40, height: 40, borderRadius: '50%', background: s.done ? 'var(--grad-green)' : 'var(--grad-blue)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '0.9rem', flexShrink: 0, boxShadow: s.done ? 'var(--shadow-green)' : 'var(--shadow-blue)' }}>
                    {s.done ? '✓' : s.n}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 700, color: 'var(--navy)', fontSize: '0.9375rem', marginBottom: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      {s.title}
                      {s.done && <span className="gov-badge gov-badge-success" style={{ fontSize: '0.65rem' }}>Done</span>}
                    </div>
                    <div style={{ color: 'var(--gray-500)', fontSize: '0.8125rem', lineHeight: 1.55 }}>{s.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── AI CTA ── */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div className="gov-card-navy" style={{ padding: '1.75rem' }}>
              <div style={{ color: 'var(--gold)', fontWeight: 700, fontSize: '0.7rem', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>AI-Assisted Matching</div>
              <div style={{ color: 'white', fontWeight: 700, fontSize: '1.0625rem', lineHeight: 1.4, marginBottom: '0.625rem' }}>
                Matched against 8+ government funding programmes
              </div>
              <div style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.8125rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                Explainable recommendations — you always know why a programme was matched and what gaps exist.
              </div>
              <Link to="/funding-opportunities" className="gov-btn gov-btn-gold" style={{ width: '100%', justifyContent: 'center' }}>
                Find My Matches →
              </Link>
            </div>

            <div className="gov-card" style={{ padding: '1.5rem' }}>
              <div style={{ fontWeight: 700, color: 'var(--navy)', fontSize: '0.9375rem', marginBottom: '0.875rem' }}>Quick Links</div>
              {[
                { label: 'Upload Documents', path: '/documents', icon: '📄' },
                { label: 'Check Notifications', path: '/notifications', icon: '🔔' },
                { label: 'Get Help & Support', path: '/support', icon: '💬' },
              ].map(l => (
                <Link key={l.path} to={l.path} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.625rem 0', borderBottom: '1px solid var(--gray-100)', textDecoration: 'none', color: 'var(--gray-600)', fontSize: '0.875rem', fontWeight: 500, transition: 'color 0.15s' }}
                  onMouseEnter={e => e.currentTarget.style.color = 'var(--blue)'}
                  onMouseLeave={e => e.currentTarget.style.color = 'var(--gray-600)'}
                >
                  <span>{l.icon}</span> {l.label}
                  <span style={{ marginLeft: 'auto', color: 'var(--gray-300)' }}>→</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
