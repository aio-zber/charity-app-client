import React, { useState, useEffect } from 'react';
import { Users, Edit3, Trash2, Plus, Search, DollarSign, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import api from '../../utils/api';
import type { User, PaginationMeta } from '../../types';

interface UserWithStats extends User {
  totalDonations: number;
  donationCount: number;
}

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<UserWithStats[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [pagination, setPagination] = useState<PaginationMeta>({
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 0,
  });

  useEffect(() => {
    fetchUsers();
  }, [pagination.page]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/admin/users?page=${pagination.page}&limit=${pagination.limit}`);
      setUsers(response.data.users || []);
      setPagination(response.data.pagination);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to load users');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (userId: number, username: string) => {
    if (!window.confirm(`Are you sure you want to delete user "${username}"? This action cannot be undone.`)) {
      return;
    }

    try {
      await api.delete(`/admin/users/${userId}`);
      fetchUsers(); // Refresh the list
    } catch (err: any) {
      alert(err.response?.data?.message || 'Failed to delete user');
    }
  };

  const filteredUsers = users.filter(user =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handlePageChange = (newPage: number) => {
    setPagination(prev => ({ ...prev, page: newPage }));
  };

  return (
    <div className="min-h-screen py-8 animate-fade-in-scale">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 rounded-2xl flex items-center justify-center border border-purple-500/30">
              <Users className="h-6 w-6 text-purple-400 animate-pulse-neon" />
            </div>
            <div>
              <h1 className="text-4xl font-bold gradient-text">Agent Matrix</h1>
              <p className="text-gray-400">Neural network participant management</p>
            </div>
          </div>
          <div className="h-1 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full w-32"></div>
        </div>

        {/* Quick Actions */}
        <div className="flex justify-between items-center mb-8">
          <Link
            to="/admin/add-user"
            className="glass-dark px-6 py-3 rounded-2xl border border-cyan-500/30 flex items-center space-x-3 hover:border-cyan-400/50 transition-all duration-300 group"
          >
            <Plus className="h-5 w-5 text-cyan-400 group-hover:animate-pulse-neon" />
            <span className="text-cyan-300">Deploy New Agent</span>
          </Link>
        </div>

        {/* Search */}
        <div className="glass-dark rounded-2xl border border-purple-500/30 p-6 mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-purple-400" />
            <input
              type="text"
              placeholder="Search neural network agents..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 glass border border-purple-500/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-400/50 focus:ring-0 transition-all duration-300"
            />
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="glass-dark p-6 rounded-2xl border border-red-500/30 mb-8">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-red-500/20 to-pink-500/20 rounded-xl flex items-center justify-center border border-red-500/30">
                <AlertCircle className="h-5 w-5 text-red-400" />
              </div>
              <p className="text-red-400">{error}</p>
            </div>
          </div>
        )}

        {/* Users Table */}
        <div className="glass-dark rounded-2xl border border-purple-500/30 overflow-hidden">
          <div className="px-6 py-4 border-b border-purple-500/20">
            <h2 className="text-xl font-bold text-purple-300 flex items-center space-x-3">
              <Users className="h-6 w-6 text-purple-400 animate-pulse-neon" />
              <span>Neural Network Agents ({pagination.total})</span>
            </h2>
          </div>

          {loading ? (
            <div className="p-8 text-center">
              <div className="w-12 h-12 relative mx-auto">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-xl animate-spin"></div>
                <div className="absolute inset-1 bg-gray-900 rounded-lg"></div>
                <div className="absolute inset-2 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-lg animate-ping"></div>
              </div>
            </div>
          ) : filteredUsers.length === 0 ? (
            <div className="p-8 text-center">
              <Users className="h-16 w-16 text-purple-400 mx-auto mb-4 animate-pulse-neon" />
              <p className="text-gray-400">
                {searchTerm ? 'No agents found matching your search.' : 'No agents found in the neural network.'}
              </p>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr className="border-b border-purple-500/20">
                      <th className="px-6 py-4 text-left text-xs font-medium text-purple-300 uppercase tracking-wider">
                        Agent
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-purple-300 uppercase tracking-wider">
                        Age
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-purple-300 uppercase tracking-wider">
                        Total Impact
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-purple-300 uppercase tracking-wider">
                        Operations
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-purple-300 uppercase tracking-wider">
                        Initialized
                      </th>
                      <th className="px-6 py-4 text-right text-xs font-medium text-purple-300 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-purple-500/10">
                    {filteredUsers.map((user) => (
                      <tr key={user.id} className="hover:bg-purple-500/5 transition-colors duration-150">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center space-x-4">
                            <div className="bg-gradient-to-br from-purple-500/20 to-cyan-500/20 h-12 w-12 rounded-xl flex items-center justify-center border border-purple-500/30">
                              <span className="text-purple-300 font-bold text-lg">
                                {user.username.charAt(0).toUpperCase()}
                              </span>
                            </div>
                            <div>
                              <div className="text-white font-medium">
                                {user.username}
                              </div>
                              <div className="text-sm text-purple-400">
                                ID: {user.id}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="text-cyan-300">{user.age} cycles</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center space-x-2">
                            <div className="bg-gradient-to-r from-emerald-500/20 to-green-500/20 p-2 rounded-lg border border-emerald-500/30">
                              <DollarSign className="h-4 w-4 text-emerald-400" />
                            </div>
                            <span className="text-emerald-300 font-medium">
                              ${user.totalDonations.toFixed(2)}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="text-purple-300">{user.donationCount}</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="text-gray-400">{new Date(user.createdAt).toLocaleDateString()}</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right">
                          <div className="flex space-x-3 justify-end">
                            <button
                              onClick={() => {
                                alert(`Edit functionality for ${user.username} would be implemented here.`);
                              }}
                              className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 p-2 rounded-lg border border-cyan-500/30 hover:border-cyan-400/50 transition-all duration-300"
                              title="Edit agent"
                            >
                              <Edit3 className="h-4 w-4 text-cyan-400" />
                            </button>
                            <button
                              onClick={() => handleDeleteUser(user.id, user.username)}
                              className="bg-gradient-to-r from-red-500/20 to-pink-500/20 p-2 rounded-lg border border-red-500/30 hover:border-red-400/50 transition-all duration-300"
                              title="Delete agent"
                            >
                              <Trash2 className="h-4 w-4 text-red-400" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {pagination.totalPages > 1 && (
                <div className="px-6 py-4 border-t border-purple-500/20 flex items-center justify-between">
                  <div className="text-sm text-purple-300">
                    Showing {((pagination.page - 1) * pagination.limit) + 1} to{' '}
                    {Math.min(pagination.page * pagination.limit, pagination.total)} of{' '}
                    {pagination.total} agents
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handlePageChange(pagination.page - 1)}
                      disabled={pagination.page === 1}
                      className="glass-dark px-4 py-2 rounded-xl border border-purple-500/30 text-sm font-medium text-purple-300 hover:border-purple-400/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                    >
                      Previous
                    </button>
                    
                    {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((page) => (
                      <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`glass-dark px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                          page === pagination.page
                            ? 'border border-cyan-500/50 text-cyan-300 bg-cyan-500/10'
                            : 'border border-purple-500/30 text-purple-300 hover:border-purple-400/50'
                        }`}
                      >
                        {page}
                      </button>
                    ))}
                    
                    <button
                      onClick={() => handlePageChange(pagination.page + 1)}
                      disabled={pagination.page === pagination.totalPages}
                      className="glass-dark px-4 py-2 rounded-xl border border-purple-500/30 text-sm font-medium text-purple-300 hover:border-purple-400/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserManagement;