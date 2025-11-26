import { fundingOpportunities, calculateMatch } from '../data/mockData';

export const getMatchedOpportunities = (profile) => {
  if (!profile) return [];

  // Get both default and custom opportunities
  const customOpportunities = JSON.parse(localStorage.getItem('customOpportunities') || '[]');
  const allOpportunities = [...fundingOpportunities, ...customOpportunities];

  // Calculate matches for all opportunities
  const matches = allOpportunities
    .map(opportunity => calculateMatch(profile, opportunity))
    .filter(match => match.match_score >= 25) // Slightly lower threshold for better coverage
    .sort((a, b) => b.match_score - a.match_score); // Sort by highest match first

  return matches;
};

export const saveMatchedOpportunities = (matches) => {
  localStorage.setItem('matchedOpportunities', JSON.stringify(matches));
  localStorage.setItem('lastMatchDate', new Date().toISOString());
};

export const getStoredMatches = () => {
  const stored = localStorage.getItem('matchedOpportunities');
  return stored ? JSON.parse(stored) : [];
};