// Government Funding Intelligence & Access Platform — Demo Dataset
// Prototype data for SITA GovTech Hackathon 2026 demonstration

export const fundingOpportunities = [
  {
    id: 1,
    name: 'SEDA SMME Growth Fund',
    type: 'Grant',
    description: 'Supporting small and medium enterprises across South Africa with growth capital for business expansion, equipment and working capital.',
    min_amount: 50000,
    max_amount: 500000,
    sectors: ['Manufacturing', 'Agriculture', 'Retail', 'Services', 'Tourism'],
    eligible_regions: ['Gauteng', 'KwaZulu-Natal', 'Eastern Cape', 'Western Cape', 'Limpopo', 'Mpumalanga', 'North West', 'Free State', 'Northern Cape', 'South Africa'],
    min_years_operation: 1,
    max_years_operation: 10,
    requires_cipc: true,
    max_employees: 50,
    max_turnover: 10000000,
    funding_company: 'Small Enterprise Development Agency (SEDA)',
    funding_entity: 'Department of Small Business Development',
    contact_email: 'info@seda.org.za',
    application_deadline: '2026-06-30',
    status: 'Open'
  },
  {
    id: 2,
    name: 'IDC Manufacturing Competitiveness Fund',
    type: 'Loan',
    description: 'Low-interest financing for manufacturing enterprises to upgrade production capacity, acquire equipment and improve competitiveness.',
    min_amount: 200000,
    max_amount: 5000000,
    sectors: ['Manufacturing', 'Automotive', 'Agro-processing', 'Green Economy'],
    eligible_regions: ['Gauteng', 'KwaZulu-Natal', 'Eastern Cape', 'Western Cape', 'Mpumalanga', 'South Africa'],
    min_years_operation: 2,
    max_years_operation: 20,
    requires_cipc: true,
    max_employees: 200,
    max_turnover: 50000000,
    funding_company: 'Industrial Development Corporation (IDC)',
    funding_entity: 'Department of Trade, Industry and Competition',
    contact_email: 'callcentre@idc.co.za',
    application_deadline: '2026-09-30',
    status: 'Open'
  },
  {
    id: 3,
    name: 'TIA Technology Innovation Fund',
    type: 'Grant',
    description: 'Supporting technology and innovation-driven SMMEs developing solutions for Industry 4.0, digital transformation and emerging technologies.',
    min_amount: 100000,
    max_amount: 2000000,
    sectors: ['Technology', 'ICT', 'Green Economy', 'Manufacturing'],
    eligible_regions: ['Gauteng', 'Western Cape', 'KwaZulu-Natal', 'Eastern Cape', 'South Africa'],
    min_years_operation: 0,
    max_years_operation: 8,
    requires_cipc: true,
    max_employees: 50,
    max_turnover: 15000000,
    funding_company: 'Technology Innovation Agency (TIA)',
    funding_entity: 'Department of Science and Innovation',
    contact_email: 'info@tia.org.za',
    application_deadline: '2026-07-31',
    status: 'Open'
  },
  {
    id: 4,
    name: 'DAFF Agricultural Development Grant',
    type: 'Grant',
    description: 'Supporting agricultural enterprises and agro-processors with production infrastructure, technology adoption and market access development.',
    min_amount: 75000,
    max_amount: 1000000,
    sectors: ['Agriculture', 'Agro-processing', 'Food Processing'],
    eligible_regions: ['Eastern Cape', 'Limpopo', 'Mpumalanga', 'North West', 'Free State', 'KwaZulu-Natal', 'Northern Cape', 'South Africa'],
    min_years_operation: 1,
    max_years_operation: 15,
    requires_cipc: true,
    max_employees: 100,
    max_turnover: 20000000,
    funding_company: 'Department of Agriculture, Land Reform and Rural Development',
    funding_entity: 'DALRRD',
    contact_email: 'info@dalrrd.gov.za',
    application_deadline: '2026-05-31',
    status: 'Open'
  },
  {
    id: 5,
    name: 'NEF Black Industrialists Programme',
    type: 'Equity',
    description: 'Equity and quasi-equity funding for black-owned and black-managed enterprises in productive sectors of the economy.',
    min_amount: 500000,
    max_amount: 10000000,
    sectors: ['Manufacturing', 'Agriculture', 'Technology', 'Tourism', 'Services', 'Green Economy'],
    eligible_regions: ['Gauteng', 'KwaZulu-Natal', 'Eastern Cape', 'Western Cape', 'Limpopo', 'Mpumalanga', 'North West', 'Free State', 'Northern Cape', 'South Africa'],
    min_years_operation: 1,
    max_years_operation: 20,
    requires_cipc: true,
    max_employees: 200,
    max_turnover: 50000000,
    funding_company: 'National Empowerment Fund (NEF)',
    funding_entity: 'Department of Trade, Industry and Competition',
    contact_email: 'info@nef.org.za',
    application_deadline: '2026-12-31',
    status: 'Open'
  },
  {
    id: 6,
    name: 'DBSA Green Economy Fund',
    type: 'Loan',
    description: 'Financing for enterprises developing renewable energy, energy efficiency, waste management and green infrastructure solutions.',
    min_amount: 300000,
    max_amount: 8000000,
    sectors: ['Green Economy', 'Renewable Energy', 'Manufacturing', 'Technology'],
    eligible_regions: ['Gauteng', 'Western Cape', 'Northern Cape', 'Eastern Cape', 'KwaZulu-Natal', 'South Africa'],
    min_years_operation: 1,
    max_years_operation: 15,
    requires_cipc: true,
    max_employees: 150,
    max_turnover: 40000000,
    funding_company: 'Development Bank of Southern Africa (DBSA)',
    funding_entity: 'DBSA',
    contact_email: 'info@dbsa.org',
    application_deadline: '2026-08-31',
    status: 'Open'
  },
  {
    id: 7,
    name: 'Tourism Enterprise Partnership Fund',
    type: 'Grant',
    description: 'Supporting tourism SMMEs with business development, infrastructure improvement and market access in South African tourism destinations.',
    min_amount: 50000,
    max_amount: 750000,
    sectors: ['Tourism', 'Hospitality', 'Services'],
    eligible_regions: ['Western Cape', 'KwaZulu-Natal', 'Limpopo', 'Mpumalanga', 'Eastern Cape', 'Gauteng', 'South Africa'],
    min_years_operation: 1,
    max_years_operation: 12,
    requires_cipc: true,
    max_employees: 50,
    max_turnover: 10000000,
    funding_company: 'Tourism Enterprise Partnership (TEP)',
    funding_entity: 'Department of Tourism',
    contact_email: 'info@tep.co.za',
    application_deadline: '2026-06-30',
    status: 'Open'
  },
  {
    id: 8,
    name: 'Youth Enterprise Development Fund',
    type: 'Grant',
    description: 'Dedicated funding for youth-owned enterprises (18–35 years) across all sectors to stimulate youth entrepreneurship and job creation.',
    min_amount: 25000,
    max_amount: 250000,
    sectors: ['Manufacturing', 'Agriculture', 'Technology', 'Retail', 'Services', 'Tourism', 'Green Economy'],
    eligible_regions: ['Gauteng', 'KwaZulu-Natal', 'Eastern Cape', 'Western Cape', 'Limpopo', 'Mpumalanga', 'North West', 'Free State', 'Northern Cape', 'South Africa'],
    min_years_operation: 0,
    max_years_operation: 5,
    requires_cipc: true,
    max_employees: 20,
    max_turnover: 5000000,
    funding_company: 'National Youth Development Agency (NYDA)',
    funding_entity: 'NYDA',
    contact_email: 'info@nyda.gov.za',
    application_deadline: '2026-10-31',
    status: 'Open'
  }
];

// Enhanced AI-powered matching algorithm with explainable scoring
export const calculateMatch = (profile, opportunity) => {
  let score = 0;
  const criteriaMatches = [];
  const explanations = [];
  const gaps = [];

  // CIPC Registration (mandatory gate)
  if (!profile.cipc_registration_number) {
    return {
      ...opportunity,
      match_score: 0,
      explanation: 'CIPC registration number required for eligibility assessment.',
      criteriaMatches: [],
      gaps: ['CIPC registration number required']
    };
  }

  // Industry/Sector match — 35% weight
  const sectorMatch = opportunity.sectors.some(s =>
    s.toLowerCase() === (profile.industry || '').toLowerCase()
  );
  if (sectorMatch) {
    score += 35;
    explanations.push(`✓ Sector aligned: ${profile.industry}`);
    criteriaMatches.push({ criteria: 'Sector', met: true, detail: `${profile.industry} is a target sector` });
  } else {
    score += 5;
    gaps.push(`Sector (${profile.industry}) not in primary target sectors`);
    criteriaMatches.push({ criteria: 'Sector', met: false, detail: `Target sectors: ${opportunity.sectors.join(', ')}` });
  }

  // Funding amount — 25% weight
  const amount = parseInt(profile.funding_amount) || 0;
  if (amount >= opportunity.min_amount && amount <= opportunity.max_amount) {
    score += 25;
    explanations.push(`✓ Funding requirement (R${amount.toLocaleString()}) within programme range`);
    criteriaMatches.push({ criteria: 'Funding Amount', met: true, detail: `R${opportunity.min_amount.toLocaleString()} – R${opportunity.max_amount.toLocaleString()}` });
  } else if (amount < opportunity.min_amount) {
    score += 10;
    gaps.push(`Requested amount below minimum (R${opportunity.min_amount.toLocaleString()})`);
    criteriaMatches.push({ criteria: 'Funding Amount', met: false, detail: `Minimum: R${opportunity.min_amount.toLocaleString()}` });
  } else {
    score += 5;
    gaps.push(`Requested amount exceeds maximum (R${opportunity.max_amount.toLocaleString()})`);
    criteriaMatches.push({ criteria: 'Funding Amount', met: false, detail: `Maximum: R${opportunity.max_amount.toLocaleString()}` });
  }

  // Geographic eligibility — 20% weight
  const locationMatch = opportunity.eligible_regions.some(r =>
    r.toLowerCase() === (profile.location || '').toLowerCase() || r === 'South Africa'
  );
  if (locationMatch) {
    score += 20;
    explanations.push(`✓ Geographic eligibility confirmed: ${profile.location}`);
    criteriaMatches.push({ criteria: 'Location', met: true, detail: `${profile.location} is eligible` });
  } else {
    score += 3;
    gaps.push(`Location (${profile.location}) not in eligible regions`);
    criteriaMatches.push({ criteria: 'Location', met: false, detail: `Eligible: ${opportunity.eligible_regions.slice(0, 3).join(', ')}...` });
  }

  // Business age — 10% weight
  const years = parseInt(profile.years_in_operation) || 0;
  if (years >= opportunity.min_years_operation && years <= opportunity.max_years_operation) {
    score += 10;
    explanations.push(`✓ Business age (${years} years) meets requirements`);
    criteriaMatches.push({ criteria: 'Business Age', met: true, detail: `${opportunity.min_years_operation}–${opportunity.max_years_operation} years required` });
  } else {
    score += 2;
    gaps.push(`Business age (${years} years) outside required range (${opportunity.min_years_operation}–${opportunity.max_years_operation} years)`);
    criteriaMatches.push({ criteria: 'Business Age', met: false, detail: `Required: ${opportunity.min_years_operation}–${opportunity.max_years_operation} years` });
  }

  // SMME size — 10% weight
  const employees = parseInt(profile.employee_count) || 0;
  const turnover = parseInt(profile.annual_turnover) || 0;
  if (employees <= opportunity.max_employees && turnover <= opportunity.max_turnover) {
    score += 10;
    explanations.push(`✓ Qualifies as SMME (${employees} employees, R${turnover.toLocaleString()} turnover)`);
    criteriaMatches.push({ criteria: 'SMME Eligibility', met: true, detail: `Within size thresholds` });
  } else {
    score += 2;
    gaps.push('Business size may exceed SMME thresholds for this programme');
    criteriaMatches.push({ criteria: 'SMME Eligibility', met: false, detail: `Max ${opportunity.max_employees} employees / R${opportunity.max_turnover.toLocaleString()} turnover` });
  }

  const matchScore = Math.min(score, 100);
  const primaryReason = explanations.length > 0
    ? `Your business was matched because ${explanations.slice(0, 2).map(e => e.replace('✓ ', '')).join(' and ')}.`
    : 'Partial match based on available profile information.';

  return {
    ...opportunity,
    match_score: matchScore,
    explanation: explanations.join(' • '),
    primaryReason,
    criteriaMatches,
    gaps,
    nextAction: gaps.length === 0
      ? 'Your profile meets all key criteria. Proceed to application.'
      : `Address the following before applying: ${gaps[0]}`
  };
};

// Mock authentication
export const mockLogin = (username, password) => {
  if (username === 'demo' && password === 'password123') {
    return {
      success: true,
      data: { user_id: 'demo_user', username: 'demo', token: 'mock_token_' + Date.now() }
    };
  }
  return { success: false, error: 'Invalid credentials' };
};
