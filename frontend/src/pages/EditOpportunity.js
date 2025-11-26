import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import { BackgroundPattern } from '../components/Icons';

const EditOpportunity = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();
  const [isLoaded, setIsLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    amount: '',
    deadline: '',
    sectors: [],
    status: 'Active'
  });

  useEffect(() => {
    setIsLoaded(true);
    loadOpportunity();
  }, [id]);

  const loadOpportunity = () => {
    // Load opportunity data
    const customOpportunities = JSON.parse(localStorage.getItem('customOpportunities') || '[]');
    const defaultOpportunities = [
      {
        id: 'default-1',
        title: 'Small Business Innovation Grant',
        description: 'Supporting innovative small businesses in technology and healthcare sectors',
        amount: 'R50,000 - R500,000',
        deadline: '2024-03-31',
        sectors: ['Technology', 'Healthcare', 'Manufacturing'],
        status: 'Active'
      },
      {
        id: 'default-2',
        title: 'Women Entrepreneur Fund',
        description: 'Empowering women-led businesses across various industries',
        amount: 'R25,000 - R250,000',
        deadline: '2024-04-15',
        sectors: ['Retail', 'Services', 'Agriculture'],
        status: 'Active'
      }
    ];

    const allOpportunities = [...defaultOpportunities, ...customOpportunities];
    const opportunity = allOpportunities.find(opp => opp.id === id);
    
    if (opportunity) {
      setFormData({
        title: opportunity.title,
        description: opportunity.description,
        amount: opportunity.amount,
        deadline: opportunity.deadline,
        sectors: opportunity.sectors || [],
        status: opportunity.status
      });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSectorToggle = (sector) => {
    setFormData(prev => ({
      ...prev,
      sectors: prev.sectors.includes(sector)
        ? prev.sectors.filter(s => s !== sector)
        : [...prev.sectors, sector]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Update opportunity
      const customOpportunities = JSON.parse(localStorage.getItem('customOpportunities') || '[]');
      const updatedOpportunities = customOpportunities.map(opp => 
        opp.id === id ? { ...opp, ...formData } : opp
      );
      
      localStorage.setItem('customOpportunities', JSON.stringify(updatedOpportunities));
      
      setTimeout(() => {
        setLoading(false);
        navigate('/admin/manage-opportunities');
      }, 1000);
    } catch (error) {
      setLoading(false);
      console.error('Error updating opportunity:', error);
    }
  };

  const availableSectors = [
    'Technology', 'Healthcare', 'Manufacturing', 'Retail', 'Services', 
    'Agriculture', 'Fintech', 'Energy', 'Food Processing', 'Education'
  ];

  return (
    <BackgroundPattern isDarkMode={isDarkMode}>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className={`mb-8 transform transition-all duration-1000 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <h1 className={`text-4xl font-bold mb-4 ${
            isDarkMode 
              ? 'bg-gradient-to-r from-blue-400 to-orange-400 bg-clip-text text-transparent'
              : 'bg-gradient-to-r from-blue-600 to-orange-600 bg-clip-text text-transparent'
          }`}>
            Edit Funding Opportunity
          </h1>
          <p className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Update the funding opportunity details
          </p>
        </div>

        <div className={`backdrop-blur-sm rounded-2xl shadow-xl border p-8 ${
          isDarkMode 
            ? 'bg-slate-800/90 border-slate-700/50' 
            : 'bg-white/90 border-white/20'
        } ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Opportunity Title
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
                className={`w-full px-4 py-3 rounded-lg border transition-colors duration-200 ${
                  isDarkMode 
                    ? 'bg-slate-700 border-slate-600 text-white focus:border-blue-500' 
                    : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
                } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
              />
            </div>

            <div>
              <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                required
                rows={4}
                className={`w-full px-4 py-3 rounded-lg border transition-colors duration-200 ${
                  isDarkMode 
                    ? 'bg-slate-700 border-slate-600 text-white focus:border-blue-500' 
                    : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
                } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Funding Amount Range
                </label>
                <input
                  type="text"
                  name="amount"
                  value={formData.amount}
                  onChange={handleInputChange}
                  placeholder="e.g., R50,000 - R500,000"
                  required
                  className={`w-full px-4 py-3 rounded-lg border transition-colors duration-200 ${
                    isDarkMode 
                      ? 'bg-slate-700 border-slate-600 text-white focus:border-blue-500' 
                      : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
                  } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                />
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Application Deadline
                </label>
                <input
                  type="date"
                  name="deadline"
                  value={formData.deadline}
                  onChange={handleInputChange}
                  required
                  className={`w-full px-4 py-3 rounded-lg border transition-colors duration-200 ${
                    isDarkMode 
                      ? 'bg-slate-700 border-slate-600 text-white focus:border-blue-500' 
                      : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
                  } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                />
              </div>
            </div>

            <div>
              <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Status
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 rounded-lg border transition-colors duration-200 ${
                  isDarkMode 
                    ? 'bg-slate-700 border-slate-600 text-white focus:border-blue-500' 
                    : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
                } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
              >
                <option value="Active">Active</option>
                <option value="Draft">Draft</option>
                <option value="Closed">Closed</option>
              </select>
            </div>

            <div>
              <label className={`block text-sm font-medium mb-3 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Target Sectors
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {availableSectors.map((sector) => (
                  <label key={sector} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.sectors.includes(sector)}
                      onChange={() => handleSectorToggle(sector)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      {sector}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <div className="flex space-x-4 pt-6">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-6 rounded-lg font-medium hover:from-blue-700 hover:to-blue-800 transform transition-all duration-200 hover:scale-105 shadow-lg disabled:opacity-50"
              >
                {loading ? 'Updating...' : 'Update Opportunity'}
              </button>
              <button
                type="button"
                onClick={() => navigate('/admin/manage-opportunities')}
                className={`px-6 py-3 rounded-lg font-medium transition-colors duration-200 ${
                  isDarkMode 
                    ? 'bg-slate-700 hover:bg-slate-600 text-white' 
                    : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
                }`}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </BackgroundPattern>
  );
};

export default EditOpportunity;