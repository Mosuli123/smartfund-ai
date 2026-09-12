import React from 'react';
import { Link } from 'react-router-dom';

const GovHome = () => (
  <div style={{ fontFamily: 'Inter, sans-serif' }}>

    {/* Hero */}
    <section style={{ background: 'linear-gradient(135deg, #0a2240 0%, #1a4f8a 60%, #2d6cc0 100%)', padding: '5rem 1.5rem 4rem' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
          <span style={{ background: '#c8922a', color: 'white', padding: '0.25rem 0.75rem', borderRadius: 9999, fontSize: '0.75rem', fontWeight: 700 }}>
            SITA GOVTECH HACKATHON 2026
          </span>
          <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.8125rem' }}>Four Horsemen Technologies</span>
        </div>
        <h1 style={{ fontSize: 'clamp(1.75rem,4vw,3rem)', fontWeight: 800, color: 'white', lineHeight: 1.15, marginBottom: '1.25rem', maxWidth: 700 }}>
          Government Funding Intelligence<br />& Access Platform
        </h1>
        <p style={{ fontSize: '1.125rem', color: 'rgba(255,255,255,0.8)', maxWidth: 580, lineHeight: 1.7, marginBottom: '2.5rem' }}>
          Connecting South African SMMEs to relevant government funding while transforming funding data into actionable intelligence for better government decisions.
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginBottom: '3rem' }}>
          <Link to="/smme/login" style={{ background: '#c8922a', color: 'white', padding: '0.875rem 2rem', borderRadius: '0.5rem', fontWeight: 700, fontSize: '1rem', textDecoration: 'none' }}>
            🔍 Find Funding
          </Link>
          <Link to="/gov/login" style={{ background: 'rgba(255,255,255,0.12)', color: 'white', border: '1.5px solid rgba(255,255,255,0.3)', padding: '0.875rem 2rem', borderRadius: '0.5rem', fontWeight: 600, fontSize: '1rem', textDecoration: 'none' }}>
            📊 Government Intelligence
          </Link>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2.5rem' }}>
          {[['8', 'Funding Programmes'], ['R8.4B+', 'Funding Demand Tracked'], ['4,872', 'Applications Processed'], ['9', 'Provinces Covered']].map(([v, l]) => (
            <div key={l}>
              <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#c8922a' }}>{v}</div>
              <div style={{ fontSize: '0.8125rem', color: 'rgba(255,255,255,0.6)' }}>{l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Value Props */}
    <section style={{ background: 'white', padding: '4rem 1.5rem', borderBottom: '1px solid #e2e8f0' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '1.875rem', fontWeight: 700, color: '#0a2240', marginBottom: '1rem' }}>Two Connected Experiences</h2>
          <p style={{ color: '#475569', maxWidth: 600, margin: '0 auto', lineHeight: 1.7 }}>
            SMMEs get intelligent access to funding. Government gets the intelligence to improve the funding ecosystem.
          </p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px,1fr))', gap: '1.5rem' }}>
          {[
            { icon: '🏢', title: 'For SMMEs', color: '#1a4f8a', bg: '#eff6ff', points: ['Discover relevant government funding', 'AI-powered eligibility assessment', 'Explainable funding recommendations', 'Real-time application tracking'] },
            { icon: '🏛️', title: 'For Government', color: '#1a7a4a', bg: '#f0fdf4', points: ['Understand funding demand by sector', 'Identify geographic funding gaps', 'Monitor programme performance', 'Make data-driven policy decisions'] }
          ].map(c => (
            <div key={c.title} style={{ background: c.bg, border: `1px solid ${c.color}22`, borderRadius: '0.75rem', padding: '2rem' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{c.icon}</div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: c.color, marginBottom: '1rem' }}>{c.title}</h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {c.points.map(p => (
                  <li key={p} style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.625rem', color: '#475569', fontSize: '0.9375rem' }}>
                    <span style={{ color: c.color }}>✓</span> {p}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Feedback Loop */}
    <section style={{ background: '#0a2240', padding: '4rem 1.5rem' }}>
      <div style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center' }}>
        <h2 style={{ fontSize: '1.875rem', fontWeight: 700, color: 'white', marginBottom: '1rem' }}>The Intelligence Feedback Loop</h2>
        <p style={{ color: 'rgba(255,255,255,0.7)', marginBottom: '2.5rem', lineHeight: 1.7 }}>
          Every SMME interaction creates intelligence that helps government understand the funding ecosystem and improve programmes.
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', gap: '0.5rem' }}>
          {['Government Programmes', '→', 'SMME Discovery', '→', 'Applications', '→', 'Data', '→', 'Intelligence', '→', 'Better Decisions', '→', 'Improved Programmes'].map((item, i) => (
            <span key={i} style={{
              color: item === '→' ? '#c8922a' : 'white',
              fontWeight: item === '→' ? 400 : 600,
              fontSize: item === '→' ? '1.25rem' : '0.875rem',
              background: item === '→' ? 'transparent' : 'rgba(255,255,255,0.08)',
              padding: item === '→' ? 0 : '0.375rem 0.75rem',
              borderRadius: '0.375rem'
            }}>{item}</span>
          ))}
        </div>
      </div>
    </section>

    {/* CTA */}
    <section style={{ background: 'white', padding: '4rem 1.5rem', textAlign: 'center' }}>
      <div style={{ maxWidth: 600, margin: '0 auto' }}>
        <h2 style={{ fontSize: '1.875rem', fontWeight: 700, color: '#0a2240', marginBottom: '1rem' }}>
          Access for SMMEs.<br />Intelligence for Government.<br />Better Decisions for South Africa.
        </h2>
        <p style={{ color: '#475569', marginBottom: '2rem', lineHeight: 1.7 }}>Experience the platform from both perspectives.</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center' }}>
          <Link to="/smme/login" style={{ background: '#1a4f8a', color: 'white', padding: '0.875rem 2rem', borderRadius: '0.5rem', fontWeight: 700, textDecoration: 'none' }}>SMME Portal →</Link>
          <Link to="/gov/login" style={{ background: '#1a7a4a', color: 'white', padding: '0.875rem 2rem', borderRadius: '0.5rem', fontWeight: 700, textDecoration: 'none' }}>Government Intelligence →</Link>
        </div>
      </div>
    </section>

    {/* Footer */}
    <footer style={{ background: '#0a2240', borderTop: '3px solid #c8922a', padding: '2rem 1.5rem' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '1rem' }}>
        <div>
          <div style={{ color: 'white', fontWeight: 700, marginBottom: '0.25rem' }}>Government Funding Intelligence & Access Platform</div>
          <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.8125rem' }}>Developed by Four Horsemen Technologies | SITA GovTech Hackathon 2026</div>
        </div>
        <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.75rem', textAlign: 'right' }}>
          <div>Prototype — Not an official government platform</div>
          <div>Access for SMMEs. Intelligence for Government. Better Decisions for South Africa.</div>
        </div>
      </div>
    </footer>
  </div>
);

export default GovHome;
