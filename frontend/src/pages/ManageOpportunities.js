import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const DEFAULT_PROGRAMMES = [
  { id: 'gov-1', title: 'SEDA Technology Programme (STP)', provider: 'Small Enterprise Development Agency', amount: 'R50,000 – R500,000', deadline: '2025-06-30', sectors: ['Technology', 'Manufacturing', 'Agro-processing'], status: 'Active', applications: 34, type: 'National' },
  { id: 'gov-2', title: 'IDC Industrial Financing', provider: 'Industrial Development Corporation', amount: 'R1,000,000 – R1,000,000,000', deadline: '2025-12-31', sectors: ['Manufacturing', 'Mining', 'Agro-processing', 'Green Economy'], status: 'Active', applications: 18, type: 'National' },
  { id: 'gov-3', title: 'TIA Innovation Bridge Fund', provider: 'Technology Innovation Agency', amount: 'R100,000 – R5,000,000', deadline: '2025-09-30', sectors: ['Technology', 'Biotechnology', 'ICT', 'Clean Energy'], status: 'Active', applications: 27, type: 'National' },
  { id: 'gov-4', title: 'DAFF Agro-Processing Support Scheme', provider: 'Dept. of Agriculture, Forestry & Fisheries', amount: 'R75,000 – R750,000', deadline: '2025-07-31', sectors: ['Agriculture', 'Food Processing', 'Aquaculture'], status: 'Active', applications: 15, type: 'National' },
  { id: 'gov-5', title: 'NEF Iqhaza Lwabisebenzi Fund', provider: 'National Empowerment Fund', amount: 'R250,000 – R75,000,000', deadline: '2025-12-31', sectors: ['Any (BEE-compliant)'], status: 'Active', applications: 22, type: 'National' },
  { id: 'gov-6', title: 'DBSA Green Economy Fund', provider: 'Development Bank of Southern Africa', amount: 'R500,000 – R500,000,000', deadline: '2025-10-31', sectors: ['Renewable Energy', 'Water', 'Waste Management', 'Green Transport'], status: 'Active', applications: 9, type: 'National' },
  { id: 'gov-7', title: 'TEP Tourism Enterprise Programme', provider: 'Tourism Enterprise Partnership', amount: 'R10,000 – R200,000', deadline: '2025-08-31', sectors: ['Tourism', 'Hospitality', 'Craft'], status: 'Active', applications: 41, type: 'National' },
  { id: 'gov-8', title: 'NYDA Youth Business Grant', provider: 'National Youth Development Agency', amount: 'R1,000 – R100,000', deadline: '2025-12-31', sectors: ['Any (18–35 years)'], status: 'Active', applications: 67, type: 'National' },
];

const ManageOpportunities = () => {
  const [programmes, setProgrammes] = useState([]);
  const [filter, setFilter] = useState('All');
  const navigate = useNavigate();

  useEffect(() => {
    const custom = JSON.parse(localStorage.getItem('customOpportunities') || '[]');
    setProgrammes([...DEFAULT_PROGRAMMES, ...custom]);
  }, []);

  const filtered = filter === 'All' ? programmes : programmes.filter(p => p.status === filter);
  const totalApplications = programmes.reduce((s, p) => s + (p.applications || 0), 0);

  const statusStyle = (status) => {
    if (status === 'Active') return { background: '#dcfce7', color: '#166534' };
    if (status === 'Draft') return { background: '#fef9c3', color: '#854d0e' };
    return { background: '#f1f5f9', color: '#475569' };
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f1f5f9', fontFamily: 'Inter, sans-serif' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '2rem 1.5rem' }}>

        {/* Header */}
        <div style={{ marginBottom: '1.5rem' }}>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0a2240', marginBottom: '0.25rem' }}>Funding Programme Management</h1>
          <p style={{ color: '#64748b', fontSize: '0.9375rem' }}>Manage national government funding programmes and monitor applications</p>
        </div>

        {/* KPIs */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
          {[
            { label: 'Total Programmes', value: programmes.length, color: '#1a4f8a' },
            { label: 'Active', value: programmes.filter(p => p.status === 'Active').length, color: '#166534' },
            { label: 'Total Applications', value: totalApplications, color: '#0a2240' },
            { label: 'Custom Added', value: programmes.filter(p => !DEFAULT_PROGRAMMES.find(d => d.id === p.id)).length, color: '#c8922a' },
          ].map((k, i) => (
            <div key={i} style={{ background: 'white', borderRadius: '0.625rem', padding: '1.25rem', boxShadow: '0 1px 3px rgba(0,0,0,0.07)', borderLeft: `4px solid ${k.color}` }}>
              <div style={{ fontSize: '1.875rem', fontWeight: 800, color: k.color }}>{k.value}</div>
              <div style={{ fontSize: '0.8125rem', color: '#64748b', fontWeight: 500 }}>{k.label}</div>
            </div>
          ))}
        </div>

        {/* Actions + Filter */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            {['All', 'Active', 'Draft', 'Closed'].map(f => (
              <button key={f} onClick={() => setFilter(f)}
                style={{ padding: '0.5rem 1rem', borderRadius: '0.5rem', border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: '0.875rem',
                  background: filter === f ? '#0a2240' : 'white', color: filter === f ? 'white' : '#475569',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
                {f}
              </button>
            ))}
          </div>
          <Link to="/admin/create-opportunity"
            style={{ background: 'linear-gradient(135deg,#c8922a,#e8a830)', color: 'white', padding: '0.625rem 1.25rem', borderRadius: '0.5rem', textDecoration: 'none', fontWeight: 700, fontSize: '0.875rem' }}>
            + Add Programme
          </Link>
        </div>

        {/* Programmes List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {filtered.map(prog => (
            <div key={prog.id} style={{ background: 'white', borderRadius: '0.75rem', padding: '1.5rem', boxShadow: '0 1px 4px rgba(0,0,0,0.07)', borderLeft: '4px solid #1a4f8a' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '0.5rem' }}>
                    <h3 style={{ fontSize: '1.0625rem', fontWeight: 700, color: '#0a2240', margin: 0 }}>{prog.title}</h3>
                    <span style={{ ...statusStyle(prog.status), padding: '0.2rem 0.625rem', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: 600 }}>{prog.status}</span>
                    <span style={{ background: '#eff6ff', color: '#1a4f8a', padding: '0.2rem 0.625rem', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: 600 }}>{prog.type || 'National'}</span>
                  </div>
                  <p style={{ color: '#c8922a', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.75rem' }}>Provider: {prog.provider}</p>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.5rem', fontSize: '0.8125rem', color: '#475569' }}>
                    <div><span style={{ fontWeight: 600, color: '#334155' }}>Funding Range:</span> {prog.amount}</div>
                    <div><span style={{ fontWeight: 600, color: '#334155' }}>Deadline:</span> {prog.deadline}</div>
                    <div><span style={{ fontWeight: 600, color: '#334155' }}>Applications:</span> <span style={{ color: '#1a4f8a', fontWeight: 700 }}>{prog.applications || 0} received</span></div>
                  </div>
                  <div style={{ marginTop: '0.75rem', display: 'flex', flexWrap: 'wrap', gap: '0.375rem' }}>
                    {prog.sectors?.map((s, i) => (
                      <span key={i} style={{ background: '#f0f4f8', color: '#334155', padding: '0.2rem 0.5rem', borderRadius: '0.375rem', fontSize: '0.75rem', fontWeight: 500 }}>{s}</span>
                    ))}
                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', minWidth: 160 }}>
                  <button onClick={() => navigate(`/admin/edit-opportunity/${prog.id}`)}
                    style={{ background: '#1a4f8a', color: 'white', border: 'none', borderRadius: '0.5rem', padding: '0.5rem 1rem', fontWeight: 600, fontSize: '0.8125rem', cursor: 'pointer' }}>
                    Edit Programme
                  </button>
                  <button onClick={() => navigate(`/admin/review-applications?opportunityId=${prog.id}`)}
                    style={{ background: prog.applications > 0 ? '#c8922a' : '#e2e8f0', color: prog.applications > 0 ? 'white' : '#94a3b8', border: 'none', borderRadius: '0.5rem', padding: '0.5rem 1rem', fontWeight: 600, fontSize: '0.8125rem', cursor: 'pointer' }}>
                    Applications ({prog.applications || 0})
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default ManageOpportunities;
