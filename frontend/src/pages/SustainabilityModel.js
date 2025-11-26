import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { BackgroundPattern } from '../components/Icons';

const SustainabilityModel = () => {
  const { isDarkMode } = useTheme();
  const revenueStreams = [
    {
      title: "Transaction Fees",
      description: "Small percentage fee (1-2%) on successful funding applications",
      potential: "R50,000 - R200,000 per month",
      implementation: "Immediate"
    },
    {
      title: "Premium Subscriptions",
      description: "Advanced features for SMMEs: priority matching, detailed analytics",
      potential: "R500 - R2,000 per SMME per month",
      implementation: "Phase 2"
    },
    {
      title: "Funder Partnership Fees",
      description: "Annual partnership fees from funding organizations",
      potential: "R100,000 - R500,000 per partner",
      implementation: "Immediate"
    },
    {
      title: "Data Analytics Services",
      description: "Anonymized market insights and reports for funders",
      potential: "R50,000 - R150,000 per report",
      implementation: "Phase 3"
    },
    {
      title: "Training & Consultation",
      description: "Business development services and application assistance",
      potential: "R5,000 - R15,000 per session",
      implementation: "Phase 2"
    }
  ];

  const costStructure = [
    { category: "Technology Infrastructure", monthly: 25000, description: "Cloud hosting, security, maintenance" },
    { category: "Staff Salaries", monthly: 180000, description: "Development, support, sales team" },
    { category: "Marketing & Sales", monthly: 50000, description: "User acquisition, partnerships" },
    { category: "Legal & Compliance", monthly: 15000, description: "Regulatory compliance, contracts" },
    { category: "Operations", monthly: 30000, description: "Office, utilities, admin costs" }
  ];

  const totalMonthlyCosts = costStructure.reduce((sum, cost) => sum + cost.monthly, 0);

  return (
    <BackgroundPattern isDarkMode={isDarkMode}>
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="bg-slate-800/90 backdrop-blur-sm rounded-2xl shadow-xl border border-slate-700/50 p-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-orange-400 bg-clip-text text-transparent mb-4">Sustainable Self-Funding Model</h1>
            <div className="bg-orange-900/30 border border-orange-700/50 p-4 rounded-lg">
              <p className="text-orange-300">
                SmartFund AI is designed to be financially sustainable through multiple revenue streams 
                while maintaining affordability for SMMEs and value for funding partners.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div>
              <h2 className="text-2xl font-bold text-white mb-6">Revenue Streams</h2>
              <div className="space-y-4">
                {revenueStreams.map((stream, index) => (
                  <div key={index} className="border border-slate-600 bg-slate-700/50 rounded-lg p-4 hover:bg-slate-700/70 transition-colors duration-200">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-white">{stream.title}</h3>
                      <span className="bg-blue-900/50 text-blue-300 border border-blue-700/50 px-2 py-1 rounded-full text-xs font-medium">
                        {stream.implementation}
                      </span>
                    </div>
                    <p className="text-gray-300 text-sm mb-2">{stream.description}</p>
                    <p className="font-medium text-orange-400">{stream.potential}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white mb-6">Cost Structure</h2>
              <div className="space-y-4 mb-6">
                {costStructure.map((cost, index) => (
                  <div key={index} className="flex justify-between items-center p-3 bg-slate-700/50 rounded-lg hover:bg-slate-700/70 transition-colors duration-200">
                    <div>
                      <h3 className="font-medium text-white">{cost.category}</h3>
                      <p className="text-sm text-gray-300">{cost.description}</p>
                    </div>
                    <span className="font-semibold text-orange-400">R{cost.monthly.toLocaleString()}</span>
                  </div>
                ))}
              </div>
              
              <div className="bg-blue-900/30 border border-blue-700/50 p-4 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-blue-300">Total Monthly Costs:</span>
                  <span className="font-bold text-blue-400 text-lg">R{totalMonthlyCosts.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-blue-900/30 border border-blue-700/50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-blue-300 mb-2">Break-even Point</h3>
              <p className="text-2xl font-bold text-blue-400">6-9 months</p>
              <p className="text-sm text-blue-300">With 500+ active SMMEs</p>
            </div>
            
            <div className="bg-orange-900/30 border border-orange-700/50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-orange-300 mb-2">Projected ROI</h3>
              <p className="text-2xl font-bold text-orange-400">250-400%</p>
              <p className="text-sm text-orange-300">Within 24 months</p>
            </div>
            
            <div className="bg-blue-900/30 border border-blue-700/50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-blue-300 mb-2">Market Potential</h3>
              <p className="text-2xl font-bold text-blue-400">R50M+</p>
              <p className="text-sm text-blue-300">Annual addressable market</p>
            </div>
          </div>

          <div className="bg-slate-700/50 border border-slate-600 p-6 rounded-lg">
            <h3 className="text-xl font-semibold text-white mb-4">Implementation Phases</h3>
            
            <div className="space-y-4">
              <div className="flex items-start space-x-4">
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">1</div>
                <div>
                  <h4 className="font-semibold text-white">Phase 1: Foundation (Months 1-6)</h4>
                  <p className="text-gray-300">Launch with transaction fees and partnership fees. Focus on user acquisition.</p>
                  <p className="text-sm text-orange-400 font-medium">Target: Break-even by month 6</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">2</div>
                <div>
                  <h4 className="font-semibold text-white">Phase 2: Growth (Months 7-18)</h4>
                  <p className="text-gray-300">Introduce premium subscriptions and training services. Scale operations.</p>
                  <p className="text-sm text-orange-400 font-medium">Target: 200% revenue growth</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="bg-gradient-to-r from-blue-500 to-orange-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">3</div>
                <div>
                  <h4 className="font-semibold text-white">Phase 3: Expansion (Months 19+)</h4>
                  <p className="text-gray-300">Launch data analytics services. Expand to other African markets.</p>
                  <p className="text-sm text-blue-400 font-medium">Target: Market leadership position</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </BackgroundPattern>
  );
};

export default SustainabilityModel;