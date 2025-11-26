import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fundingOpportunities, calculateMatch } from '../data/mockData';
import { getStoredMatches, getMatchedOpportunities, saveMatchedOpportunities } from '../services/matchingService';

const FundingOpportunities = ({ user }) => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    loadProfile();
    loadStoredMatches();
  }, []);

  const loadStoredMatches = () => {
    const storedMatches = getStoredMatches();
    if (storedMatches.length > 0) {
      setMatches(storedMatches);
    }
  };

  const loadProfile = () => {
    const savedProfile = localStorage.getItem('businessProfile');
    if (savedProfile) {
      setProfile(JSON.parse(savedProfile));
    } else {
      setError('Please complete your business profile first.');
    }
  };

  const findMatches = () => {
    if (!profile) {
      setError('Please complete your business profile first.');
      return;
    }

    setLoading(true);
    setError('');

    // Simulate API delay
    setTimeout(() => {
      const matchedOpportunities = getMatchedOpportunities(profile);
      saveMatchedOpportunities(matchedOpportunities);
      setMatches(matchedOpportunities);
      setLoading(false);
    }, 1500);
  };

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-600 bg-green-100';
    if (score >= 60) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'Grant': return 'bg-green-100 text-green-800';
      case 'Loan': return 'bg-blue-100 text-blue-800';
      case 'Equity': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen py-8" style={{background: 'linear-gradient(135deg, #fef7f0 0%, #f0f4f8 100%)'}}>
      <div className="max-w-6xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="heading-1" style={{color: '#1e3a5f'}}>Funding Opportunities</h1>
        
        {profile ? (
          <div className="modern-card p-4 mb-6">
            <h3 className="font-semibold mb-2" style={{color: '#1e3a5f'}}>Your Profile Summary:</h3>
            <p className="text-sm" style={{color: '#64748b'}}>
              <strong>{profile.business_name}</strong> (CIPC: {profile.cipc_registration_number}) | {profile.industry} | 
              R{profile.funding_amount?.toLocaleString()} | {profile.location} | 
              {profile.years_in_operation} years | {profile.employee_count} employees
            </p>
            {matches.length > 0 && (
              <div className="mt-2 text-sm font-medium" style={{color: '#10b981'}}>
                ✓ {matches.length} pre-filtered opportunities found based on your profile
              </div>
            )}
          </div>
        ) : (
          <div className="p-4 rounded-xl mb-6 border" style={{background: 'rgba(231, 126, 34, 0.1)', borderColor: '#e67e22'}}>
            <p style={{color: '#b8470f'}}>
              Complete your business profile to get personalized funding matches.
            </p>
          </div>
        )}

        <div className="flex space-x-4">
          <button
            onClick={findMatches}
            disabled={loading || !profile}
            className="btn-primary px-6 py-3 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <div className="flex items-center">
                <div className="loading-spinner mr-2"></div>
                Refreshing Matches...
              </div>
            ) : (
              'Refresh Matches'
            )}
          </button>
          
          {matches.length > 0 && (
            <div className="flex items-center font-medium" style={{color: '#10b981'}}>
              ✓ {matches.length} opportunities automatically filtered for you
            </div>
          )}
        </div>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}

      {matches.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="heading-2" style={{color: '#1e3a5f'}}>
              {matches.length} Best Funding Matches
            </h2>
            <div className="text-sm" style={{color: '#64748b'}}>
              Automatically filtered based on your profile
            </div>
          </div>
          
          <div className="space-y-6">
            {matches.map((match) => (
              <div key={match.id} className="modern-card p-6 border-l-4" style={{borderColor: '#4180be'}}>
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-semibold mb-2" style={{color: '#1e3a5f'}}>
                      {match.name}
                    </h3>
                    <div className="flex items-center space-x-3 mb-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(match.type)}`}>
                        {match.type}
                      </span>
                      <span className="text-sm" style={{color: '#64748b'}}>
                        R{match.min_amount?.toLocaleString()} - R{match.max_amount?.toLocaleString()}
                      </span>
                    </div>
                  </div>
                  
                  <div className={`px-3 py-2 rounded-lg font-bold text-lg ${getScoreColor(match.match_score)}`}>
                    {match.match_score}% Match
                  </div>
                </div>

                <p className="mb-4" style={{color: '#475569'}}>{match.description}</p>

                <div className="p-4 rounded-xl mb-4" style={{background: 'rgba(248, 250, 252, 0.8)'}}>
                  <h4 className="font-semibold mb-2" style={{color: '#1e3a5f'}}>Why This Matches:</h4>
                  <p className="text-sm" style={{color: '#475569'}}>{match.explanation}</p>
                  
                  <div className="mt-3 pt-3 border-t border-gray-200">
                    <h5 className="font-medium mb-1" style={{color: '#1e3a5f'}}>Funding Provider:</h5>
                    <p className="text-sm" style={{color: '#475569'}}>
                      <strong>{match.funding_company}</strong> ({match.funding_industry})
                    </p>
                    <p className="text-xs" style={{color: '#64748b'}}>Contact: {match.contact_email}</p>
                  </div>
                </div>

                <div className="flex justify-end space-x-3">
                  <button className="btn-secondary px-4 py-2">
                    Learn More
                  </button>
                  <button 
                    onClick={() => {
                      localStorage.setItem('selectedOpportunity', JSON.stringify(match));
                      navigate('/application-review');
                    }}
                    className="px-4 py-2 text-white rounded-lg font-medium transition-all" style={{background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)'}}
                  >
                    Apply Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {matches.length === 0 && !loading && !error && profile && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold mb-2" style={{color: '#1e3a5f'}}>No Matches Found</h3>
          <p style={{color: '#64748b'}}>Update your profile or click "Refresh Matches" to find new opportunities.</p>
        </div>
      )}
    </div>
    </div>
  );
};

export default FundingOpportunities;