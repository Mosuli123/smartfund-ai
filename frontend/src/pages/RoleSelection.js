import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ModernIcons } from '../components/ModernIcons';

const STATS = [
  { value: '8', label: 'Funding Programmes' },
  { value: 'R8.4B+', label: 'Demand Tracked' },
  { value: '4,872', label: 'Applications' },
  { value: '9', label: 'Provinces' },
];

const ROLES = [
  {
    id: 'smme',
    title: 'SMME Business Owner',
    subtitle: 'Find & Apply for Funding',
    desc: 'Discover government funding programmes matched to your business profile using AI-powered eligibility assessment.',
    color: '#1a4f8a',
    grad: 'linear-gradient(135deg,#1a4f8a,#2d6cc0)',
    bg: '#eff6ff',
    border: '#bfdbfe',
    icon: 'Building',
    features: ['AI-powered funding matching', 'CIPC business verification', 'Application tracking', 'Document management'],
    primary: { label: 'Verify & Register Business', to: '/cipc-verification' },
    secondary: { label: 'Login — Verified Users', to: '/smme/login' },
    delay: 'delay-200',
  },
  {
    id: 'gov',
    title: 'Government Intelligence',
    subtitle: 'Policy & Analytics Portal',
    desc: 'Access funding demand analytics, sector insights, geographic gap analysis and programme performance intelligence.',
    color: '#1a7a4a',
    grad: 'linear-gradient(135deg,#1a7a4a,#22a05a)',
    bg: '#f0fdf4',
    border: '#bbf7d0',
    icon: 'Chart',
    features: ['Sector demand intelligence', 'Geographic gap analysis', 'Programme performance', 'Eligibility barrier insights'],
    primary: { label: 'Government Intelligence Portal', to: '/gov/login' },
    delay: 'delay-300',
  },
  {
    id: 'admin',
    title: 'Funding Programme Admin',
    subtitle: 'Programme Management',
    desc: 'Manage national funding programmes, review applications with AI scoring, and administer the platform ecosystem.',
    color: '#c8922a',
    grad: 'linear-gradient(135deg,#c8922a,#e8a830)',
    bg: '#fffbeb',
    border: '#fde68a',
    icon: 'Briefcase',
    features: ['Manage 8 national programmes', 'AI-scored application review', 'Approve / decline workflow', 'Performance reports'],
    primary: { label: 'Funding Provider Login', to: '/admin/login' },
    secondary: { label: 'SITA System Administrator', to: '/sita-admin/login' },
    delay: 'delay-400',
  },
];

const RoleSelection = () => {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { const t = setTimeout(() => setLoaded(true), 80); return () => clearTimeout(t); }, []);

  return (
    <div style={{ minHeight: '100vh', fontFamily: 'var(--font)', background: 'var(--gray-50)' }}>

      {/* ── Top bar ── */}
      <div style={{ background: 'var(--navy-deep)', borderBottom: '1px solid rgba(255,255,255,0.06)', padding: '0.5rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.75rem', letterSpacing: '0.04em' }}>SITA GovTech Hackathon 2026</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span className="pulse-dot" />
          <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.75rem' }}>AI System Active</span>
        </div>
      </div>

      {/* ── Hero ── */}
      <div className="gov-hero" style={{ padding: '5rem 1.5rem 7rem' }}>
        <div style={{ maxWidth: 860, margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>

          {/* Logo mark */}
          <div className={`anim-scale-in ${loaded ? '' : 'opacity-0'}`} style={{ display: 'inline-flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem', background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 'var(--r-2xl)', padding: '0.75rem 1.5rem' }}>
            <div style={{ width: 44, height: 44, background: 'var(--grad-blue)', borderRadius: 'var(--r-lg)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: 'var(--shadow-blue)' }}>
              <span style={{ color: 'var(--gold)', fontWeight: 900, fontSize: '1.25rem' }}>G</span>
            </div>
            <div style={{ textAlign: 'left' }}>
              <div style={{ color: 'white', fontWeight: 700, fontSize: '0.9375rem', lineHeight: 1.2 }}>Government Funding Intelligence</div>
              <div style={{ color: 'var(--gold)', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Four Horsemen Technologies</div>
            </div>
          </div>

          <div className={`anim-fade-up delay-100 ${loaded ? '' : 'opacity-0'}`}>
            <span className="gov-badge gov-badge-gold" style={{ marginBottom: '1.5rem', display: 'inline-flex' }}>
              SITA GovTech Hackathon 2026
            </span>
          </div>

          <h1 className={`anim-fade-up delay-200 ${loaded ? '' : 'opacity-0'}`} style={{ fontSize: 'clamp(2rem,5vw,3.25rem)', fontWeight: 900, color: 'white', lineHeight: 1.1, marginBottom: '1.25rem', letterSpacing: '-0.02em' }}>
            Government Funding<br />
            <span style={{ background: 'linear-gradient(90deg,#c8922a,#e8a830)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              Intelligence & Access
            </span>
          </h1>

          <p className={`anim-fade-up delay-300 ${loaded ? '' : 'opacity-0'}`} style={{ fontSize: '1.125rem', color: 'rgba(255,255,255,0.72)', maxWidth: 560, margin: '0 auto 2.5rem', lineHeight: 1.75 }}>
            Access for SMMEs. Intelligence for Government.<br />Better Decisions for South Africa.
          </p>

          {/* Stats strip */}
          <div className={`anim-fade-up delay-400 ${loaded ? '' : 'opacity-0'}`} style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0.75rem' }}>
            {STATS.map(s => (
              <div key={s.label} style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 'var(--r-xl)', padding: '0.875rem 1.5rem', textAlign: 'center', minWidth: 110 }}>
                <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--gold)', lineHeight: 1 }}>{s.value}</div>
                <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.55)', marginTop: '0.25rem' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Role Cards ── */}
      <div style={{ maxWidth: 1160, margin: '-4rem auto 0', padding: '0 1.5rem 5rem', position: 'relative', zIndex: 10 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(320px,1fr))', gap: '1.5rem' }}>
          {ROLES.map(role => (
            <div
              key={role.id}
              className={`gov-card anim-fade-up ${role.delay} ${loaded ? '' : 'opacity-0'}`}
              style={{ borderTop: `4px solid ${role.color}`, padding: '2rem', display: 'flex', flexDirection: 'column' }}
            >
              {/* Icon + title */}
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', marginBottom: '1.25rem' }}>
                <div style={{ width: 52, height: 52, background: role.bg, border: `1px solid ${role.border}`, borderRadius: 'var(--r-xl)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  {ModernIcons[role.icon] && React.createElement(ModernIcons[role.icon], { color: role.color, className: 'w-6 h-6' })}
                </div>
                <div>
                  <div style={{ fontSize: '0.7rem', fontWeight: 700, color: role.color, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.25rem' }}>{role.subtitle}</div>
                  <h2 style={{ fontSize: '1.1875rem', fontWeight: 700, color: 'var(--navy)', lineHeight: 1.2 }}>{role.title}</h2>
                </div>
              </div>

              <p style={{ color: 'var(--gray-500)', fontSize: '0.9rem', lineHeight: 1.65, marginBottom: '1.25rem' }}>{role.desc}</p>

              {/* Features */}
              <div style={{ background: 'var(--gray-50)', borderRadius: 'var(--r-lg)', padding: '1rem', marginBottom: '1.5rem', flex: 1 }}>
                {role.features.map(f => (
                  <div key={f} style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', marginBottom: '0.5rem', color: 'var(--gray-600)', fontSize: '0.875rem' }}>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <circle cx="7" cy="7" r="7" fill={role.bg} />
                      <path d="M4 7l2 2 4-4" stroke={role.color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    {f}
                  </div>
                ))}
              </div>

              {/* CTAs */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <Link to={role.primary.to} className="gov-btn" style={{ background: role.grad, color: 'white', boxShadow: `0 4px 16px ${role.color}33` }}>
                  {role.primary.label}
                </Link>
                {role.secondary && (
                  <Link to={role.secondary.to} style={{ background: 'white', color: 'var(--gray-500)', border: '1.5px solid var(--gray-200)', padding: '0.65rem 1.25rem', borderRadius: 'var(--r-lg)', textDecoration: 'none', fontWeight: 500, fontSize: '0.875rem', textAlign: 'center', transition: 'border-color 0.15s, color 0.15s' }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = role.color; e.currentTarget.style.color = role.color; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--gray-200)'; e.currentTarget.style.color = 'var(--gray-500)'; }}
                  >
                    {role.secondary.label}
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* ── Feedback loop strip ── */}
        <div className={`anim-fade-up delay-500 ${loaded ? '' : 'opacity-0'}`} style={{ marginTop: '2.5rem', background: 'var(--grad-navy)', borderRadius: 'var(--r-2xl)', padding: '1.75rem 2rem', boxShadow: 'var(--shadow-xl)' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '1.5rem' }}>
            <div>
              <div style={{ color: 'var(--gold)', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.375rem' }}>The Intelligence Feedback Loop</div>
              <div style={{ color: 'white', fontWeight: 700, fontSize: '1rem' }}>Every SMME interaction generates intelligence that improves government decisions</div>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.375rem' }}>
              {['Programmes','→','Discovery','→','Applications','→','Data','→','Intelligence','→','Better Policy'].map((item, i) => (
                <span key={i} style={{
                  color: item === '→' ? 'var(--gold)' : 'white',
                  fontWeight: item === '→' ? 400 : 600,
                  fontSize: item === '→' ? '1rem' : '0.8rem',
                  background: item === '→' ? 'transparent' : 'rgba(255,255,255,0.1)',
                  padding: item === '→' ? '0' : '0.25rem 0.625rem',
                  borderRadius: 'var(--r-md)',
                }}>{item}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Footer note */}
        <p style={{ textAlign: 'center', marginTop: '2rem', color: 'var(--gray-400)', fontSize: '0.8125rem' }}>
          Developed by <strong style={{ color: 'var(--navy)' }}>Four Horsemen Technologies</strong> for the <strong style={{ color: 'var(--navy)' }}>SITA GovTech Hackathon 2026</strong> — Prototype demonstration. Not an official government platform.
        </p>
      </div>
    </div>
  );
};

export default RoleSelection;
