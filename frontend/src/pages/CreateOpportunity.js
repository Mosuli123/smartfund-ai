import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateOpportunity = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  
  // Get admin company info
  const admin = JSON.parse(localStorage.getItem('admin') || '{}');
  const [formData, setFormData] = useState({
    name: '',
    type: 'Grant',
    description: '',
    min_amount: '',
    max_amount: '',
    sectors: [],
    eligible_regions: [],
    min_years_operation: '',
    max_years_operation: '',
    max_employees: '',
    max_turnover: '',
    application_deadline: '',
    requirements: '',
    eligibility_criteria: {
      business_registration_required: true,
      minimum_credit_score: '',
      required_documents: [],
      industry_experience_years: '',
      geographic_restrictions: [],
      funding_purpose_allowed: [],
      collateral_required: false,
      guarantor_required: false
    },
    evaluation_criteria: {
      financial_stability_weight: 30,
      business_plan_weight: 25,
      market_potential_weight: 20,
      management_experience_weight: 15,
      innovation_factor_weight: 10
    },
    contact_email: '',
    status: 'Active'
  });

  const fundingTypes = ['Grant', 'Loan', 'Equity', 'Subsidy'];
  const sectors = [
    'Manufacturing', 'Automotive', 'Agriculture', 'ICT and Electronics', 'Renewable Energy'
  ];
  const regions = ['South Africa', 'Kenya', 'Nigeria', 'Ghana', 'Botswana', 'Namibia'];
  const requiredDocuments = [
    'CIPC Registration Certificate', 'Tax Clearance Certificate', 'Bank Statements (6 months)',
    'Financial Statements', 'Business Plan', 'ID Documents', 'Proof of Address',
    'BEE Certificate', 'VAT Registration', 'UIF Certificate'
  ];
  const fundingPurposes = [
    'Working Capital', 'Equipment Purchase', 'Business Expansion', 'Technology Upgrade',
    'Marketing & Sales', 'Staff Training', 'Research & Development', 'Export Development',
    'Inventory Purchase', 'Debt Consolidation'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleMultiSelect = (name, value) => {
    setFormData(prev => ({
      ...prev,
      [name]: prev[name].includes(value)
        ? prev[name].filter(item => item !== value)
        : [...prev[name], value]
    }));
  };

  const handleCriteriaChange = (section, field, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handleCriteriaMultiSelect = (section, field, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: prev[section][field].includes(value)
          ? prev[section][field].filter(item => item !== value)
          : [...prev[section][field], value]
      }
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      const opportunity = {
        ...formData,
        id: Date.now(),
        min_amount: parseInt(formData.min_amount),
        max_amount: parseInt(formData.max_amount),
        min_years_operation: parseInt(formData.min_years_operation),
        max_years_operation: parseInt(formData.max_years_operation),
        max_employees: parseInt(formData.max_employees),
        max_turnover: parseInt(formData.max_turnover),
        created_date: new Date().toISOString(),
        created_by: admin.username,
        funding_company: admin.companyName,
        funding_industry: admin.industry,
        funding_contact: admin.contactEmail
      };

      const existingOpportunities = JSON.parse(localStorage.getItem('customOpportunities') || '[]');
      existingOpportunities.push(opportunity);
      localStorage.setItem('customOpportunities', JSON.stringify(existingOpportunities));

      setLoading(false);
      navigate('/admin/manage-opportunities');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-200 to-blue-200 py-8">
      <div className="max-w-4xl mx-auto px-4">
      <div className="bg-white rounded-lg shadow-md p-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Create Funding Opportunity</h1>
          <div className="bg-blue-50 p-3 rounded">
            <p className="text-blue-900 font-medium">{admin.companyName}</p>
            <p className="text-blue-700 text-sm">Industry: {admin.industry}</p>
            <p className="text-blue-600 text-xs">Partner Organization - Focus: {admin.focusAreas?.join(', ')}</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Opportunity Name *
              </label>
              <input
                type="text"
                name="name"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.name}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Funding Type *
              </label>
              <select
                name="type"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.type}
                onChange={handleInputChange}
              >
                {fundingTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description *
              </label>
              <textarea
                name="description"
                required
                rows="4"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.description}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Minimum Amount (R) *
              </label>
              <input
                type="number"
                name="min_amount"
                required
                min="1000"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.min_amount}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Maximum Amount (R) *
              </label>
              <input
                type="number"
                name="max_amount"
                required
                min="1000"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.max_amount}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Application Deadline *
              </label>
              <input
                type="date"
                name="application_deadline"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.application_deadline}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Contact Email *
              </label>
              <input
                type="email"
                name="contact_email"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.contact_email || admin.contactEmail}
                onChange={handleInputChange}
                placeholder={admin.contactEmail}
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Eligible Sectors *
              </label>
              <div className="max-h-40 overflow-y-auto border border-gray-300 rounded-md p-3">
                {sectors.map(sector => (
                  <label key={sector} className="flex items-center mb-2">
                    <input
                      type="checkbox"
                      checked={formData.sectors.includes(sector)}
                      onChange={() => handleMultiSelect('sectors', sector)}
                      className="mr-2"
                    />
                    {sector}
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Eligible Regions *
              </label>
              <div className="max-h-40 overflow-y-auto border border-gray-300 rounded-md p-3">
                {regions.map(region => (
                  <label key={region} className="flex items-center mb-2">
                    <input
                      type="checkbox"
                      checked={formData.eligible_regions.includes(region)}
                      onChange={() => handleMultiSelect('eligible_regions', region)}
                      className="mr-2"
                    />
                    {region}
                  </label>
                ))}
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Min Years Operation
              </label>
              <input
                type="number"
                name="min_years_operation"
                min="0"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.min_years_operation}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Max Years Operation
              </label>
              <input
                type="number"
                name="max_years_operation"
                min="0"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.max_years_operation}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Max Employees
              </label>
              <input
                type="number"
                name="max_employees"
                min="1"
                max="200"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.max_employees}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Max Turnover (R)
              </label>
              <input
                type="number"
                name="max_turnover"
                min="0"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.max_turnover}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Eligibility Criteria</h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Minimum Credit Score
                </label>
                <input
                  type="number"
                  min="300"
                  max="850"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.eligibility_criteria.minimum_credit_score}
                  onChange={(e) => handleCriteriaChange('eligibility_criteria', 'minimum_credit_score', e.target.value)}
                  placeholder="e.g., 600"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Industry Experience (Years)
                </label>
                <input
                  type="number"
                  min="0"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.eligibility_criteria.industry_experience_years}
                  onChange={(e) => handleCriteriaChange('eligibility_criteria', 'industry_experience_years', e.target.value)}
                  placeholder="e.g., 2"
                />
              </div>
            </div>
            
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Required Documents
              </label>
              <div className="grid md:grid-cols-2 gap-2 max-h-40 overflow-y-auto border border-gray-300 rounded-md p-3">
                {requiredDocuments.map(doc => (
                  <label key={doc} className="flex items-center mb-1">
                    <input
                      type="checkbox"
                      checked={formData.eligibility_criteria.required_documents.includes(doc)}
                      onChange={() => handleCriteriaMultiSelect('eligibility_criteria', 'required_documents', doc)}
                      className="mr-2"
                    />
                    <span className="text-sm">{doc}</span>
                  </label>
                ))}
              </div>
            </div>
            
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Allowed Funding Purposes
              </label>
              <div className="grid md:grid-cols-2 gap-2 max-h-32 overflow-y-auto border border-gray-300 rounded-md p-3">
                {fundingPurposes.map(purpose => (
                  <label key={purpose} className="flex items-center mb-1">
                    <input
                      type="checkbox"
                      checked={formData.eligibility_criteria.funding_purpose_allowed.includes(purpose)}
                      onChange={() => handleCriteriaMultiSelect('eligibility_criteria', 'funding_purpose_allowed', purpose)}
                      className="mr-2"
                    />
                    <span className="text-sm">{purpose}</span>
                  </label>
                ))}
              </div>
            </div>
            
            <div className="mt-4 grid md:grid-cols-2 gap-6">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.eligibility_criteria.collateral_required}
                  onChange={(e) => handleCriteriaChange('eligibility_criteria', 'collateral_required', e.target.checked)}
                  className="mr-2"
                />
                Collateral Required
              </label>
              
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.eligibility_criteria.guarantor_required}
                  onChange={(e) => handleCriteriaChange('eligibility_criteria', 'guarantor_required', e.target.checked)}
                  className="mr-2"
                />
                Guarantor Required
              </label>
            </div>
          </div>
          
          <div className="bg-blue-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Evaluation Criteria (Weights %)</h3>
            
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Financial Stability
                </label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.evaluation_criteria.financial_stability_weight}
                  onChange={(e) => handleCriteriaChange('evaluation_criteria', 'financial_stability_weight', parseInt(e.target.value))}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Business Plan Quality
                </label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.evaluation_criteria.business_plan_weight}
                  onChange={(e) => handleCriteriaChange('evaluation_criteria', 'business_plan_weight', parseInt(e.target.value))}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Market Potential
                </label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.evaluation_criteria.market_potential_weight}
                  onChange={(e) => handleCriteriaChange('evaluation_criteria', 'market_potential_weight', parseInt(e.target.value))}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Management Experience
                </label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.evaluation_criteria.management_experience_weight}
                  onChange={(e) => handleCriteriaChange('evaluation_criteria', 'management_experience_weight', parseInt(e.target.value))}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Innovation Factor
                </label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.evaluation_criteria.innovation_factor_weight}
                  onChange={(e) => handleCriteriaChange('evaluation_criteria', 'innovation_factor_weight', parseInt(e.target.value))}
                />
              </div>
            </div>
            
            <div className="mt-3 text-sm text-blue-700">
              Total Weight: {Object.values(formData.evaluation_criteria).reduce((sum, weight) => sum + (weight || 0), 0)}% 
              {Object.values(formData.evaluation_criteria).reduce((sum, weight) => sum + (weight || 0), 0) !== 100 && 
                <span className="text-red-600 ml-2">⚠ Should total 100%</span>
              }
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Additional Requirements & Notes
            </label>
            <textarea
              name="requirements"
              rows="3"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.requirements}
              onChange={handleInputChange}
              placeholder="Any additional requirements, special conditions, or notes for applicants..."
            />
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => navigate('/admin/dashboard')}
              className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? 'Creating...' : 'Create Opportunity'}
            </button>
          </div>
        </form>
      </div>
      </div>
    </div>
  );
};

export default CreateOpportunity;