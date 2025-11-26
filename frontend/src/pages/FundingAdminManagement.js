import React, { useState, useEffect } from 'react';

const FundingAdminManagement = () => {
  const [admins, setAdmins] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newAdmin, setNewAdmin] = useState({
    username: '',
    fullName: '',
    organization: '',
    email: '',
    focusAreas: [],
    status: 'Active'
  });

  useEffect(() => {
    loadFundingAdmins();
  }, []);

  const loadFundingAdmins = () => {
    const mockAdmins = [
      {
        id: 1,
        username: 'elidz_funding',
        fullName: 'Dr. Thabo Mthembu',
        organization: 'ELIDZ Funding Division',
        email: 'thabo.mthembu@elidz.co.za',
        focusAreas: ['Manufacturing', 'Automotive'],
        status: 'Active',
        lastLogin: '2024-01-20',
        applicationsManaged: 45,
        approvalRate: 78
      },
      {
        id: 2,
        username: 'aidc_admin',
        fullName: 'Sarah Williams',
        organization: 'Automotive Industry Development Centre',
        email: 'sarah.williams@aidc.co.za',
        focusAreas: ['Automotive', 'Manufacturing'],
        status: 'Active',
        lastLogin: '2024-01-19',
        applicationsManaged: 32,
        approvalRate: 82
      },
      {
        id: 3,
        username: 'tia_funding',
        fullName: 'Prof. Michael Johnson',
        organization: 'Technology Innovation Agency',
        email: 'michael.johnson@tia.org.za',
        focusAreas: ['ICT and Electronics', 'Renewable Energy'],
        status: 'Active',
        lastLogin: '2024-01-18',
        applicationsManaged: 28,
        approvalRate: 75
      },
      {
        id: 4,
        username: 'agri_dev',
        fullName: 'Nomsa Dlamini',
        organization: 'Agricultural Development Agency',
        email: 'nomsa.dlamini@ada.gov.za',
        focusAreas: ['Agriculture'],
        status: 'Suspended',
        lastLogin: '2024-01-10',
        applicationsManaged: 15,
        approvalRate: 65
      }
    ];
    setAdmins(mockAdmins);
  };

  const handleAddAdmin = (e) => {
    e.preventDefault();
    const admin = {
      id: Date.now(),
      ...newAdmin,
      lastLogin: 'Never',
      applicationsManaged: 0,
      approvalRate: 0
    };
    setAdmins([...admins, admin]);
    setNewAdmin({
      username: '',
      fullName: '',
      organization: '',
      email: '',
      focusAreas: [],
      status: 'Active'
    });
    setShowAddForm(false);
  };

  const updateAdminStatus = (adminId, newStatus) => {
    setAdmins(prev => prev.map(admin => 
      admin.id === adminId ? { ...admin, status: newStatus } : admin
    ));
  };

  const getStatusColor = (status) => {
    return status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-200 to-blue-200 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-4">👨💼 Funding Admin Management</h1>
          <div className="bg-white bg-opacity-20 p-4 rounded-lg flex justify-between items-center">
            <p className="text-white">Manage funding administrators and their permissions</p>
            <button
              onClick={() => setShowAddForm(true)}
              className="px-4 py-2 bg-white text-green-600 rounded-lg hover:bg-gray-100 font-medium"
            >
              + Add New Admin
            </button>
          </div>
        </div>

        {showAddForm && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Add New Funding Administrator</h2>
            <form onSubmit={handleAddAdmin} className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                <input
                  type="text"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  value={newAdmin.username}
                  onChange={(e) => setNewAdmin({...newAdmin, username: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  value={newAdmin.fullName}
                  onChange={(e) => setNewAdmin({...newAdmin, fullName: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Organization</label>
                <input
                  type="text"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  value={newAdmin.organization}
                  onChange={(e) => setNewAdmin({...newAdmin, organization: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  value={newAdmin.email}
                  onChange={(e) => setNewAdmin({...newAdmin, email: e.target.value})}
                />
              </div>
              <div className="md:col-span-2 flex space-x-4">
                <button
                  type="submit"
                  className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                >
                  Add Administrator
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="px-6 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-green-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-green-900 uppercase tracking-wider">
                    Administrator
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-green-900 uppercase tracking-wider">
                    Organization
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-green-900 uppercase tracking-wider">
                    Focus Areas
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-green-900 uppercase tracking-wider">
                    Performance
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-green-900 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-green-900 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {admins.map((admin) => (
                  <tr key={admin.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{admin.fullName}</div>
                        <div className="text-sm text-gray-500">{admin.username}</div>
                        <div className="text-xs text-gray-400">{admin.email}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {admin.organization}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-wrap gap-1">
                        {admin.focusAreas.map((area, index) => (
                          <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                            {area}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div>
                        <div>{admin.applicationsManaged} applications</div>
                        <div className="text-xs">{admin.approvalRate}% approval rate</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(admin.status)}`}>
                        {admin.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                      {admin.status === 'Active' ? (
                        <button
                          onClick={() => updateAdminStatus(admin.id, 'Suspended')}
                          className="text-red-600 hover:text-red-900 px-2 py-1 bg-red-100 rounded"
                        >
                          Suspend
                        </button>
                      ) : (
                        <button
                          onClick={() => updateAdminStatus(admin.id, 'Active')}
                          className="text-green-600 hover:text-green-900 px-2 py-1 bg-green-100 rounded"
                        >
                          Activate
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FundingAdminManagement;