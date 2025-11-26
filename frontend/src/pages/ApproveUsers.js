import React, { useState, useEffect } from 'react';

const ApproveUsers = () => {
  const [pendingUsers, setPendingUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadPendingUsers();
  }, []);

  const loadPendingUsers = () => {
    // Mock pending users data
    const mockPendingUsers = [
      {
        id: 1,
        username: 'techstart2024',
        companyName: 'TechStart Solutions (Pty) Ltd',
        cipcNumber: '2024/123456/07',
        industry: 'ICT and Electronics',
        directorName: 'Sarah Johnson',
        directorId: '8901234567890',
        submissionDate: '2024-01-18',
        fundingAmount: 250000,
        location: 'Eastern Cape',
        status: 'Pending'
      },
      {
        id: 2,
        username: 'greenpower',
        companyName: 'Green Power Innovations CC',
        cipcNumber: 'CK2024567890',
        industry: 'Renewable Energy',
        directorName: 'Michael Chen',
        directorId: '7812345678901',
        submissionDate: '2024-01-17',
        fundingAmount: 500000,
        location: 'Eastern Cape',
        status: 'Pending'
      },
      {
        id: 3,
        username: 'agritech',
        companyName: 'AgriTech Farming Solutions',
        cipcNumber: '2024/789012/07',
        industry: 'Agriculture',
        directorName: 'Nomsa Mthembu',
        directorId: '8512345678902',
        submissionDate: '2024-01-16',
        fundingAmount: 150000,
        location: 'Eastern Cape',
        status: 'Pending'
      }
    ];
    setPendingUsers(mockPendingUsers);
  };

  const handleApproval = (userId, action) => {
    setLoading(true);
    setTimeout(() => {
      setPendingUsers(prev => prev.map(user => 
        user.id === userId ? { ...user, status: action === 'approve' ? 'Approved' : 'Rejected' } : user
      ));
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-200 to-blue-200 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-4">✅ User Approval Management</h1>
          <div className="bg-white bg-opacity-20 p-4 rounded-lg">
            <p className="text-white">Review and approve/decline SMME registration requests</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6 bg-green-50 border-b">
            <h2 className="text-xl font-bold text-green-900">
              Pending Approvals ({pendingUsers.filter(u => u.status === 'Pending').length})
            </h2>
          </div>

          <div className="divide-y divide-gray-200">
            {pendingUsers.map((user) => (
              <div key={user.id} className="p-6">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                          {user.companyName}
                        </h3>
                        <div className="space-y-1 text-sm text-gray-600">
                          <p><strong>Username:</strong> {user.username}</p>
                          <p><strong>CIPC Number:</strong> {user.cipcNumber}</p>
                          <p><strong>Industry:</strong> {user.industry}</p>
                          <p><strong>Location:</strong> {user.location}</p>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">Director Information</h4>
                        <div className="space-y-1 text-sm text-gray-600">
                          <p><strong>Name:</strong> {user.directorName}</p>
                          <p><strong>ID Number:</strong> {user.directorId}</p>
                          <p><strong>Funding Amount:</strong> R{user.fundingAmount.toLocaleString()}</p>
                          <p><strong>Submitted:</strong> {user.submissionDate}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="ml-6 flex flex-col space-y-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      user.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                      user.status === 'Approved' ? 'bg-green-100 text-green-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {user.status}
                    </span>
                    
                    {user.status === 'Pending' && (
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleApproval(user.id, 'approve')}
                          disabled={loading}
                          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
                        >
                          ✅ Approve
                        </button>
                        <button
                          onClick={() => handleApproval(user.id, 'reject')}
                          disabled={loading}
                          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50"
                        >
                          ❌ Reject
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApproveUsers;