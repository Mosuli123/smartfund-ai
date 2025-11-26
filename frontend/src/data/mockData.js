// Mock funding opportunities data for ELIDZ partner industries
export const fundingOpportunities = [
  {
    id: 1,
    name: "ELIDZ Manufacturing Excellence Grant",
    type: "Grant",
    description: "Supporting manufacturing companies in the East London IDZ with advanced production capabilities and export potential.",
    min_amount: 100000,
    max_amount: 1000000,
    sectors: ["Manufacturing", "Automotive"],
    eligible_regions: ["Eastern Cape", "Buffalo City", "Nelson Mandela Bay"],
    min_years_operation: 2,
    max_years_operation: 15,
    requires_cipc: true,
    max_employees: 100,
    max_turnover: 25000000,
    funding_company: "East London Industrial Development Zone (ELIDZ)",
    funding_industry: "Industrial Development",
    contact_email: "funding@elidz.co.za"
  },
  {
    id: 2,
    name: "Automotive Supplier Development Fund",
    type: "Loan",
    description: "Low-interest financing for automotive component manufacturers and suppliers to enhance production capacity.",
    min_amount: 200000,
    max_amount: 2000000,
    sectors: ["Automotive", "Manufacturing"],
    eligible_regions: ["Eastern Cape", "Buffalo City", "OR Tambo District"],
    min_years_operation: 1,
    max_years_operation: 20,
    requires_cipc: true,
    max_employees: 150,
    max_turnover: 40000000,
    funding_company: "Automotive Industry Development Centre (AIDC)",
    funding_industry: "Automotive Development",
    contact_email: "funding@aidc.co.za"
  },
  {
    id: 3,
    name: "ICT Innovation Accelerator",
    type: "Equity",
    description: "Equity investment for ICT and electronics companies developing innovative solutions for Industry 4.0.",
    min_amount: 150000,
    max_amount: 1500000,
    sectors: ["ICT and Electronics", "Manufacturing"],
    eligible_regions: ["Eastern Cape", "Buffalo City"],
    min_years_operation: 0,
    max_years_operation: 8,
    requires_cipc: true,
    max_employees: 50,
    max_turnover: 10000000,
    funding_company: "Technology Innovation Agency (TIA)",
    funding_industry: "Technology Development",
    contact_email: "funding@tia.org.za"
  },
  {
    id: 4,
    name: "Smart Agriculture Technology Fund",
    type: "Grant",
    description: "Supporting agricultural technology companies developing smart farming solutions and agri-processing innovations.",
    min_amount: 75000,
    max_amount: 750000,
    sectors: ["Agriculture", "ICT and Electronics"],
    eligible_regions: ["Eastern Cape", "Chris Hani District", "Amathole District"],
    min_years_operation: 1,
    max_years_operation: 12,
    requires_cipc: true,
    max_employees: 75,
    max_turnover: 20000000,
    funding_company: "East London Industrial Development Zone (ELIDZ)",
    funding_industry: "Industrial Development",
    contact_email: "agritech@elidz.co.za"
  },
  {
    id: 5,
    name: "Renewable Energy Innovation Fund",
    type: "Grant",
    description: "Supporting renewable energy companies developing solar, wind, and energy storage solutions for industrial applications.",
    min_amount: 250000,
    max_amount: 2500000,
    sectors: ["Renewable Energy", "Manufacturing"],
    eligible_regions: ["Eastern Cape", "Buffalo City", "Nelson Mandela Bay"],
    min_years_operation: 1,
    max_years_operation: 10,
    requires_cipc: true,
    max_employees: 100,
    max_turnover: 30000000,
    funding_company: "Technology Innovation Agency (TIA)",
    funding_industry: "Technology Development",
    contact_email: "renewable@tia.org.za"
  },
  {
    id: 6,
    name: "Electronics Manufacturing Incentive",
    type: "Subsidy",
    description: "Manufacturing incentives for electronics companies producing components for automotive, renewable energy, and ICT sectors.",
    min_amount: 100000,
    max_amount: 1000000,
    sectors: ["ICT and Electronics", "Automotive"],
    eligible_regions: ["Eastern Cape", "Buffalo City"],
    min_years_operation: 2,
    max_years_operation: 15,
    requires_cipc: true,
    max_employees: 80,
    max_turnover: 25000000,
    funding_company: "Automotive Industry Development Centre (AIDC)",
    funding_industry: "Automotive Development",
    contact_email: "electronics@aidc.co.za"
  }
];

// Enhanced AI-powered matching algorithm
export const calculateMatch = (profile, opportunity) => {
  let score = 0;
  let explanations = [];
  let criteriaMatches = [];

  // CIPC Registration verification (mandatory)
  if (!profile.cipc_registration_number) {
    return {
      ...opportunity,
      match_score: 0,
      explanation: 'CIPC registration number required for SMME verification',
      criteriaMatches: []
    };
  }

  // Industry match (35% weight)
  if (opportunity.sectors.includes(profile.industry)) {
    score += 35;
    explanations.push(`✓ Perfect industry match: ${profile.industry}`);
    criteriaMatches.push({ criteria: 'Industry', match: true, weight: 35 });
  } else {
    score += 8;
    explanations.push(`⚠ Industry not directly matched, but opportunity accepts various sectors`);
    criteriaMatches.push({ criteria: 'Industry', match: false, weight: 35 });
  }

  // Funding amount match (25% weight)
  const requestedAmount = parseInt(profile.funding_amount);
  if (requestedAmount >= opportunity.min_amount && requestedAmount <= opportunity.max_amount) {
    score += 25;
    explanations.push(`✓ Funding amount (R${requestedAmount.toLocaleString()}) fits perfectly within range`);
    criteriaMatches.push({ criteria: 'Funding Amount', match: true, weight: 25 });
  } else if (requestedAmount < opportunity.min_amount) {
    score += 12;
    explanations.push(`⚠ Requested amount below minimum, consider applying for R${opportunity.min_amount.toLocaleString()}`);
    criteriaMatches.push({ criteria: 'Funding Amount', match: false, weight: 25 });
  } else {
    score += 5;
    explanations.push(`⚠ Requested amount exceeds maximum of R${opportunity.max_amount.toLocaleString()}`);
    criteriaMatches.push({ criteria: 'Funding Amount', match: false, weight: 25 });
  }

  // Location match (20% weight)
  if (opportunity.eligible_regions.includes(profile.location)) {
    score += 20;
    explanations.push(`✓ Location eligibility confirmed: ${profile.location}`);
    criteriaMatches.push({ criteria: 'Location', match: true, weight: 20 });
  } else {
    score += 5;
    explanations.push(`⚠ Location eligibility uncertain, verify requirements for ${profile.location}`);
    criteriaMatches.push({ criteria: 'Location', match: false, weight: 20 });
  }

  // Business age match (10% weight)
  const yearsInOperation = parseInt(profile.years_in_operation);
  if (yearsInOperation >= opportunity.min_years_operation && yearsInOperation <= opportunity.max_years_operation) {
    score += 10;
    explanations.push(`✓ Business age (${yearsInOperation} years) meets requirements`);
    criteriaMatches.push({ criteria: 'Business Age', match: true, weight: 10 });
  } else {
    score += 3;
    explanations.push(`⚠ Business age may not fully meet requirements (${yearsInOperation} years)`);
    criteriaMatches.push({ criteria: 'Business Age', match: false, weight: 10 });
  }

  // SMME size verification (10% weight)
  const employeeCount = parseInt(profile.employee_count);
  const annualTurnover = parseInt(profile.annual_turnover);
  
  // SMME criteria: < 200 employees and < R50M turnover
  if (employeeCount < 200 && annualTurnover < 50000000) {
    score += 10;
    explanations.push(`✓ Qualifies as SMME (${employeeCount} employees, R${annualTurnover.toLocaleString()} turnover)`);
    criteriaMatches.push({ criteria: 'SMME Status', match: true, weight: 10 });
  } else {
    score += 2;
    explanations.push(`⚠ May not qualify as SMME based on size criteria`);
    criteriaMatches.push({ criteria: 'SMME Status', match: false, weight: 10 });
  }

  return {
    ...opportunity,
    match_score: Math.min(score, 100),
    explanation: explanations.join(' • '),
    criteriaMatches,
    fundingPurposeMatch: profile.funding_purpose
  };
};

// Mock user authentication
export const mockLogin = (username, password) => {
  if (username === 'demo' && password === 'password123') {
    return {
      success: true,
      data: {
        user_id: 'demo_user',
        username: 'demo',
        token: 'mock_token_' + Date.now()
      }
    };
  }
  return {
    success: false,
    error: 'Invalid credentials'
  };
};