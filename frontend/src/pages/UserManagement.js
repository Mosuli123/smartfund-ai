import React, { useState, useEffect } from 'react';
import { AdminIcons } from '../components/AdminIcons';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = () => {
    const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
    const admins = JSON.parse(localStorage.getItem('registeredAdmins') || '[]');
    
    // Add demo users
    const demoUsers = [
      {
        username: 'demo',
        role: 'smme',
        status: 'Active',
        registrationDate: '2024-01-15',
        lastLogin: '2024-01-20',
        cipcData: { companyName: 'Demo Tech Ltd', industry: 'Technology' }
      }
    ];

    const allUsers = [
      ...demoUsers,
      ...registeredUsers.map(u => ({ ...u, role: 'smme' })),
      ...admins.map(a => ({ ...a, role: 'admin' }))
    ];

    setUsers(allUsers);
  };

  const filteredUsers = users.filter(user => {
    const matchesFilter = filter === 'all' || user.role === filter || user.status === filter;
    const matchesSearch = user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (user.cipcData?.companyName || '').toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const updateUserStatus = (username, newStatus) => {
    const updatedUsers = users.map(user => 
      user.username === username ? { ...user, status: newStatus } : user
    );
    setUsers(updatedUsers);
    
    // Update localStorage
    const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
    const updatedRegistered = registeredUsers.map(user => 
      user.username === username ? { ...user, status: newStatus } : user
    );
    localStorage.setItem('registeredUsers', JSON.stringify(updatedRegistered));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Suspended': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRoleColor = (role) => {
    switch (role) {
      case 'smme': return 'bg-blue-100 text-blue-800';
      case 'admin': return 'bg-purple-100 text-purple-800';
      case 'sita_admin': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-200 to-blue-200 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-4 flex items-center gap-3">
            <AdminIcons.Users className="w-8 h-8" />
            User Management
          </h1>
          
          <div className="bg-white bg-opacity-20 p-4 rounded-lg mb-6">
            <div className="flex flex-wrap gap-4 items-center">
              <div>
                <input
                  type="text"
                  placeholder="Search users..."
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <div>
                <select
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                >
                  <option value="all">All Users</option>
                  <option value="smme">SMMEs Only</option>
                  <option value="admin">Admins Only</option>
                  <option value="Active">Active Users</option>
                  <option value="Pending">Pending Approval</option>
                  <option value="Suspended">Suspended Users</option>
                </select>
              </div>
              
              <div className="text-white font-medium">
                Total: {filteredUsers.length} users
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Registration
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Last Login
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredUsers.map((user, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {user.username}
                        </div>
                        <div className="text-sm text-gray-500">
                          {user.cipcData?.companyName || user.fullName || 'N/A'}
                        </div>
                        <div className="text-xs text-gray-400">
                          {user.cipcData?.industry || 'N/A'}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getRoleColor(user.role)}`}>
                        {user.role.toUpperCase()}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(user.status)}`}>
                        {user.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {user.registrationDate || 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {user.lastLogin || 'Never'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                      {user.status === 'Pending' && (
                        <>
                          <button
                            onClick={() => updateUserStatus(user.username, 'Active')}
                            className="text-green-600 hover:text-green-900 px-2 py-1 bg-green-100 rounded"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => updateUserStatus(user.username, 'Suspended')}
                            className="text-red-600 hover:text-red-900 px-2 py-1 bg-red-100 rounded"
                          >
                            Decline
                          </button>
                        </>
                      )}
                      {user.status === 'Active' && (
                        <button
                          onClick={() => updateUserStatus(user.username, 'Suspended')}
                          className="text-red-600 hover:text-red-900 px-2 py-1 bg-red-100 rounded"
                        >
                          Suspend
                        </button>
                      )}
                      {user.status === 'Suspended' && (
                        <button
                          onClick={() => updateUserStatus(user.username, 'Active')}
                          className="text-green-600 hover:text-green-900 px-2 py-1 bg-green-100 rounded"
                        >
                          Reactivate
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

export default UserManagement;