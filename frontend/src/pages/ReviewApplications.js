import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

const ReviewApplications = () => {
  const [applications, setApplications] = useState([]);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [filter, setFilter] = useState('All');
  const [loading, setLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const opportunityId = searchParams.get('opportunityId');

  useEffect(() => {
    loadApplications();
  }, []);

  const loadApplications = () => {
    // Mock applications data
    const mockApplications = [
      {
        id: 1,
        companyName: 'Tech Innovations (Pty) Ltd',
        cipcNumber: '2019/123456/07',
        opportunityId: 'default-1',
        opportunityName: 'Small Business Innovation Grant',
        fundingCompany: 'Small Enterprise Development Agency (SEDA)',
        fundingIndustry: 'Government Development',
        requestedAmount: 250000,
        submissionDate: '2024-01-15',
        status: 'Pending',
        matchScore: 85,
        contactEmail: 'info@techinnovations.co.za',
        industry: 'Technology',
        employees: 15,
        turnover: 2500000
      },
      {
        id: 2,
        companyName: 'Green Energy Solutions CC',
        cipcNumber: '2020/654321/23',
        opportunityId: 'default-6',
        opportunityName: 'Green Energy Initiative',
        fundingCompany: 'National Empowerment Fund (NEF)',
        fundingIndustry: 'Development Finance',
        requestedAmount: 500000,
        submissionDate: '2024-01-14',
        status: 'Under Review',
        matchScore: 92,
        contactEmail: 'contact@greenenergy.co.za',
        industry: 'Energy',
        employees: 25,
        turnover: 4200000
      },
      {
        id: 3,
        companyName: 'Digital Marketing Hub (Pty) Ltd',
        cipcNumber: 'CK2021789012',
        opportunityId: 'default-3',
        opportunityName: 'Tech Startup Accelerator',
        fundingCompany: 'Ithala Development Finance Corporation',
        fundingIndustry: 'Financial Services',
        requestedAmount: 150000,
        submissionDate: '2024-01-13',
        status: 'Approved',
        matchScore: 78,
        contactEmail: 'hello@digitalmarketing.co.za',
        industry: 'Technology',
        employees: 8,
        turnover: 1800000
      }
    ];

    setApplications(mockApplications);
  };

  const filteredApplications = applications.filter(app => {
    const statusMatch = filter === 'All' || app.status === filter;
    const opportunityMatch = !opportunityId || app.opportunityId === opportunityId;
    return statusMatch && opportunityMatch;
  });

  const handleStatusChange = (applicationId, newStatus) => {
    setLoading(true);
    setTimeout(() => {
      setApplications(prev => 
        prev.map(app => 
          app.id === applicationId 
            ? { ...app, status: newStatus, reviewDate: new Date().toISOString() }
            : app
        )
      );
      setLoading(false);
    }, 1000);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Under Review': return 'bg-blue-100 text-blue-800';
      case 'Approved': return 'bg-green-100 text-green-800';
      case 'Rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-200 to-blue-200 py-8">
      <div className="max-w-7xl mx-auto px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Review Applications
          {opportunityId && (
            <span className="text-lg font-normal text-gray-600 ml-2">
              - {filteredApplications[0]?.opportunityName || 'Specific Opportunity'}
            </span>
          )}
        </h1>
        
        <div className="flex space-x-4 mb-6">
          {['All', 'Pending', 'Under Review', 'Approved', 'Rejected'].map(status => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 rounded-lg ${
                filter === status 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {status} ({status === 'All' ? filteredApplications.length : filteredApplications.filter(app => app.status === status).length})
            </button>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold">Applications ({filteredApplications.length})</h2>
            </div>
            
            <div className="divide-y divide-gray-200">
              {filteredApplications.map(application => (
                <div 
                  key={application.id}
                  className={`p-6 cursor-pointer hover:bg-gray-50 ${
                    selectedApplication?.id === application.id ? 'bg-blue-50' : ''
                  }`}
                  onClick={() => setSelectedApplication(application)}
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-semibold text-lg">{application.companyName}</h3>
                      <p className="text-gray-600 text-sm">CIPC: {application.cipcNumber}</p>
                    </div>
                    <div className="text-right">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(application.status)}`}>
                        {application.status}
                      </span>
                      <p className={`text-sm font-semibold mt-1 ${getScoreColor(application.matchScore)}`}>
                        {application.matchScore}% Match
                      </p>
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-600">
                    <div>
                      <strong>Opportunity:</strong> {application.opportunityName}
                    </div>
                    <div>
                      <strong>Amount:</strong> R{application.requestedAmount.toLocaleString()}
                    </div>
                    <div>
                      <strong>Industry:</strong> {application.industry}
                    </div>
                    <div>
                      <strong>Funding Provider:</strong> {application.fundingCompany}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          {selectedApplication ? (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold mb-4">Application Details</h3>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-900">Company Information</h4>
                  <div className="mt-2 text-sm space-y-1">
                    <p><strong>Name:</strong> {selectedApplication.companyName}</p>
                    <p><strong>CIPC:</strong> {selectedApplication.cipcNumber}</p>
                    <p><strong>Industry:</strong> {selectedApplication.industry}</p>
                    <p><strong>Employees:</strong> {selectedApplication.employees}</p>
                    <p><strong>Turnover:</strong> R{selectedApplication.turnover.toLocaleString()}</p>
                    <p><strong>Email:</strong> {selectedApplication.contactEmail}</p>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900">Funding Request</h4>
                  <div className="mt-2 text-sm space-y-1">
                    <p><strong>Opportunity:</strong> {selectedApplication.opportunityName}</p>
                    <p><strong>Funding Provider:</strong> {selectedApplication.fundingCompany}</p>
                    <p><strong>Provider Industry:</strong> {selectedApplication.fundingIndustry}</p>
                    <p><strong>Amount:</strong> R{selectedApplication.requestedAmount.toLocaleString()}</p>
                    <p><strong>Match Score:</strong> 
                      <span className={`font-semibold ml-1 ${getScoreColor(selectedApplication.matchScore)}`}>
                        {selectedApplication.matchScore}%
                      </span>
                    </p>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900">Application Status</h4>
                  <div className="mt-2">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedApplication.status)}`}>
                      {selectedApplication.status}
                    </span>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <h4 className="font-semibold text-gray-900 mb-3">Actions</h4>
                  <div className="space-y-2">
                    {selectedApplication.status === 'Pending' && (
                      <>
                        <button
                          onClick={() => handleStatusChange(selectedApplication.id, 'Under Review')}
                          disabled={loading}
                          className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
                        >
                          Start Review
                        </button>
                        <button
                          onClick={() => handleStatusChange(selectedApplication.id, 'Rejected')}
                          disabled={loading}
                          className="w-full px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50"
                        >
                          Reject Application
                        </button>
                      </>
                    )}
                    
                    {selectedApplication.status === 'Under Review' && (
                      <>
                        <button
                          onClick={() => handleStatusChange(selectedApplication.id, 'Approved')}
                          disabled={loading}
                          className="w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50"
                        >
                          Approve Application
                        </button>
                        <button
                          onClick={() => handleStatusChange(selectedApplication.id, 'Rejected')}
                          disabled={loading}
                          className="w-full px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50"
                        >
                          Reject Application
                        </button>
                      </>
                    )}

                    <button className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50">
                      Download Application
                    </button>
                    <button className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50">
                      Contact Applicant
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-md p-6 text-center text-gray-500">
              <p>Select an application to view details</p>
            </div>
          )}
        </div>
      </div>
      </div>
    </div>
  );
};

export default ReviewApplications;