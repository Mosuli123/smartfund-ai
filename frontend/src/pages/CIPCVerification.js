import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const CIPCVerification = () => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    cipcRegistrationNumber: '2019/123456/07',
    directorIdNumber: '8501015800083'
  });
  const [verificationResult, setVerificationResult] = useState(null);
  const [currentStep, setCurrentStep] = useState('');
  const [verificationSteps, setVerificationSteps] = useState([]);
  const navigate = useNavigate();

  const handleInputChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleVerification = async e => {
    e.preventDefault();
    setLoading(true);
    setVerificationSteps([]);

    const steps = [
      [800, '🔍 Connecting to CIPC Database...', '🔍 Initiating CIPC Database connection...'],
      [600, '✅ Connected to CIPC Database', '✅ Connected to CIPC Database'],
      [700, '🔎 Querying company registration records...', '🔎 Querying company registration records...'],
      [600, '🆔 Cross-referencing director ID number...', '🆔 Cross-referencing director ID number...'],
      [500, '✅ CIPC Verification Completed', null],
    ];

    for (const [delay, label, log] of steps) {
      await new Promise(r => setTimeout(r, delay));
      setCurrentStep(label);
      if (log) setVerificationSteps(prev => [...prev, log]);
    }

    setVerificationSteps(prev => [
      ...prev,
      '✅ Registration number found and verified',
      '✅ Company status: Active',
      '✅ Director ID verified in company records',
      '✅ Verification completed successfully'
    ]);

    await new Promise(r => setTimeout(r, 400));

    const demoData = {
      registrationNumber: formData.cipcRegistrationNumber,
      companyName: 'AutoTech Manufacturing (Pty) Ltd',
      status: 'Active',
      registrationDate: '2019-05-15',
      businessType: 'Private Company',
      industry: 'Manufacturing',
      registeredAddress: 'East London Industrial Development Zone, Eastern Cape',
      verifiedDirector: { name: 'John Smith', idNumber: formData.directorIdNumber, role: 'CEO' }
    };

    const username = demoData.registrationNumber.replace(/[^a-zA-Z0-9]/g, '');
    const tempPassword = 'temp123';

    const users = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
    users.push({ username, role: 'smme', cipcData: demoData, registrationDate: new Date().toISOString(), status: 'Active' });
    localStorage.setItem('registeredUsers', JSON.stringify(users));

    const credentials = JSON.parse(localStorage.getItem('userCredentials') || '{}');
    credentials[username] = { password: tempPassword, role: 'smme', cipcData: demoData };
    localStorage.setItem('userCredentials', JSON.stringify(credentials));

    setVerificationResult({ cipcData: demoData, username, tempPassword });
    setStep(2);
    setLoading(false);
  };

  const header = (
    <header style={{ background: '#0a2240', borderBottom: '3px solid #c8922a', padding: '0 1.5rem' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', height: '4rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ width: 32, height: 32, background: 'linear-gradient(135deg,#1a4f8a,#2d6cc0)', borderRadius: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ color: '#c8922a', fontWeight: 800, fontSize: '0.875rem' }}>G</span>
          </div>
          <div>
            <div style={{ color: 'white', fontWeight: 700, fontSize: '0.875rem' }}>Government Funding Intelligence & Access Platform</div>
            <div style={{ color: '#c8922a', fontSize: '0.625rem', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase' }}>Four Horsemen Technologies | SITA GovTech Hackathon 2026</div>
          </div>
        </div>
        <Link to="/" style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.875rem', textDecoration: 'none' }}>← Back</Link>
      </div>
    </header>
  );

  if (step === 2) {
    return (
      <div style={{ minHeight: '100vh', background: '#f8fafc', fontFamily: 'Inter, sans-serif' }}>
        {header}
        <div style={{ maxWidth: 640, margin: '3rem auto', padding: '0 1rem' }}>
          <div style={{ background: 'white', borderRadius: '0.75rem', border: '1px solid #e2e8f0', boxShadow: '0 4px 16px rgba(10,34,64,0.08)', padding: '2.5rem' }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
              <div style={{ width: 72, height: 72, background: '#f0fdf4', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem', border: '2px solid #bbf7d0' }}>
                <svg width="36" height="36" fill="none" stroke="#1a7a4a" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#166534', marginBottom: '0.375rem' }}>CIPC Verification Successful</h1>
              <p style={{ color: '#64748b' }}>Your business is now verified and registered in the platform</p>
            </div>

            {verificationResult && (
              <>
                <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '0.5rem', padding: '1.25rem', marginBottom: '1.25rem' }}>
                  <p style={{ fontWeight: 600, color: '#166534', marginBottom: '0.75rem', fontSize: '0.9375rem' }}>✅ Verified Business Information</p>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', fontSize: '0.875rem' }}>
                    {[
                      ['Company', verificationResult.cipcData.companyName],
                      ['Registration', verificationResult.cipcData.registrationNumber],
                      ['Industry', verificationResult.cipcData.industry],
                      ['Status', verificationResult.cipcData.status]
                    ].map(([k, v]) => (
                      <div key={k} style={{ background: 'white', borderRadius: '0.375rem', padding: '0.625rem' }}>
                        <div style={{ color: '#64748b', fontSize: '0.75rem', marginBottom: '0.25rem' }}>{k}</div>
                        <div style={{ fontWeight: 600, color: '#0a2240' }}>{v}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div style={{ background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '0.5rem', padding: '1.25rem', marginBottom: '1.5rem' }}>
                  <p style={{ fontWeight: 600, color: '#1e40af', marginBottom: '0.75rem', fontSize: '0.9375rem' }}>🔑 Account Access Created</p>
                  <div style={{ background: 'white', borderRadius: '0.375rem', padding: '0.875rem', fontFamily: 'monospace', fontSize: '0.875rem' }}>
                    <div style={{ marginBottom: '0.375rem' }}><strong>Username:</strong> {verificationResult.username}</div>
                    <div><strong>Password:</strong> {verificationResult.tempPassword}</div>
                  </div>
                  <p style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '0.5rem' }}>Save these credentials. You can update your password after logging in.</p>
                </div>

                <button
                  onClick={() => navigate('/smme/login')}
                  style={{ width: '100%', background: 'linear-gradient(135deg,#1a4f8a,#2d6cc0)', color: 'white', border: 'none', borderRadius: '0.5rem', padding: '0.875rem', fontWeight: 600, fontSize: '1rem', cursor: 'pointer' }}
                >
                  Access SMME Dashboard →
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc', fontFamily: 'Inter, sans-serif' }}>
      {header}
      <div style={{ maxWidth: 580, margin: '3rem auto', padding: '0 1rem' }}>
        <div style={{ background: 'white', borderRadius: '0.75rem', border: '1px solid #e2e8f0', boxShadow: '0 4px 16px rgba(10,34,64,0.08)', padding: '2.5rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <div style={{ width: 56, height: 56, background: 'linear-gradient(135deg,#1a4f8a,#2d6cc0)', borderRadius: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
              <svg width="24" height="24" fill="none" stroke="white" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#0a2240', marginBottom: '0.375rem' }}>CIPC Business Verification</h1>
            <p style={{ color: '#64748b' }}>Verify your business registration to access government funding opportunities</p>
          </div>

          <div style={{ background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '0.5rem', padding: '1rem', marginBottom: '1.5rem', fontSize: '0.875rem', color: '#1e40af' }}>
            <strong>Demo mode:</strong> Fields are pre-filled. Click verify to experience the CIPC verification flow.
          </div>

          {loading && (
            <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '0.5rem', padding: '1rem', marginBottom: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                <div className="loading-spinner" style={{ borderColor: 'rgba(26,122,74,0.3)', borderTopColor: '#1a7a4a' }} />
                <span style={{ fontWeight: 600, color: '#166534', fontSize: '0.875rem' }}>{currentStep}</span>
              </div>
              {verificationSteps.map((s, i) => (
                <div key={i} style={{ fontSize: '0.8125rem', color: '#166534', paddingLeft: '2rem' }}>• {s}</div>
              ))}
            </div>
          )}

          <form onSubmit={handleVerification} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: '#334155', marginBottom: '0.5rem' }}>CIPC Registration Number *</label>
              <input
                type="text"
                name="cipcRegistrationNumber"
                required
                className="modern-input"
                style={{ textAlign: 'center', fontWeight: 600 }}
                value={formData.cipcRegistrationNumber}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: '#334155', marginBottom: '0.5rem' }}>Director ID Number *</label>
              <input
                type="text"
                name="directorIdNumber"
                required
                maxLength="13"
                className="modern-input"
                style={{ textAlign: 'center', fontWeight: 600 }}
                value={formData.directorIdNumber}
                onChange={handleInputChange}
              />
              <p style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '0.375rem', textAlign: 'center' }}>ID number of a registered company director</p>
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{ background: 'linear-gradient(135deg,#1a4f8a,#2d6cc0)', color: 'white', border: 'none', borderRadius: '0.5rem', padding: '0.875rem', fontWeight: 600, fontSize: '0.9375rem', cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.7 : 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
            >
              {loading && <span className="loading-spinner" />}
              {loading ? currentStep || 'Verifying...' : 'Verify Business Registration'}
            </button>
          </form>

          <div style={{ textAlign: 'center', marginTop: '1.25rem' }}>
            <Link to="/smme/login" style={{ color: '#1a4f8a', fontSize: '0.875rem', textDecoration: 'none', fontWeight: 500 }}>
              Already verified? Login here →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CIPCVerification;
