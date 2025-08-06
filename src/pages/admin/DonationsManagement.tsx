import React, { useState, useEffect } from 'react';
import { DollarSign, Search, Calendar, User, Plus, Heart, Sparkles, ArrowRight, ChevronLeft, ChevronRight, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import api from '../../utils/api';
import type { Donation, PaginationMeta } from '../../types';

interface DonationWithUser extends Donation {
  user: {
    id: number;
    username: string;
    age: number;
    createdAt: string;
  };
}

const DonationsManagement: React.FC = () => {
  const [donations, setDonations] = useState<DonationWithUser[]>([]);
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
    fetchDonations();
  }, [pagination.page]);

  const fetchDonations = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/donations/all?page=${pagination.page}&limit=${pagination.limit}`);
      setDonations(response.data.donations || []);
      setPagination(response.data.pagination);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to load donations');
    } finally {
      setLoading(false);
    }
  };

  const filteredDonations = donations.filter(donation =>
    donation.user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handlePageChange = (newPage: number) => {
    setPagination(prev => ({ ...prev, page: newPage }));
  };

  const totalAmount = donations.reduce((sum, donation) => sum + donation.amount, 0);

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-green-500/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-cyan-500/8 rounded-full blur-3xl animate-float stagger-2"></div>
        <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-float stagger-4"></div>
        <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-blue-500/8 rounded-full blur-3xl animate-float stagger-6"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Enhanced Header */}
        <div className="text-center mb-16 animate-slide-in-up">
          <div className="mb-8">
            <span className="inline-flex items-center px-6 py-3 rounded-full text-sm font-semibold bg-gradient-to-r from-green-500/20 to-cyan-500/20 border border-green-500/30 text-green-300 backdrop-blur-sm">
              <Heart className="h-4 w-4 mr-2 animate-pulse-glow" />
              Impact Management
              <Sparkles className="h-4 w-4 ml-2" />
            </span>
          </div>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-6xl md:text-7xl font-black mb-6 leading-tight">
                <span className="gradient-text text-shadow">Donation</span>
                <br />
                <span className="gradient-text-accent text-shadow">Analytics</span>
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-slate-300 max-w-3xl leading-relaxed font-medium">
                Track and manage impact contributions across the CharityFlow network
              </p>
            </div>
            <div className="md:ml-8">
              <Link
                to="/admin/add-donation"
                className="btn-primary px-8 py-4 rounded-2xl font-bold inline-flex items-center space-x-3 group"
              >
                <Plus className="h-5 w-5 group-hover:animate-pulse-glow" />
                <span>Record Impact</span>
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </div>
          </div>
        </div>

        {/* Enhanced Stats Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 animate-slide-in-up stagger-1">
          <div className="card p-6 rounded-2xl border border-green-500/20 bg-gradient-to-r from-green-500/5 to-emerald-500/5 card-hover group">
            <div className="flex items-center space-x-6">
              <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-500 rounded-2xl flex items-center justify-center shadow-xl group-hover:shadow-green-500/50 transition-all duration-300">
                <DollarSign className="h-8 w-8 text-white group-hover:animate-pulse-glow" />
              </div>
              <div>
                <p className="text-green-300 font-medium mb-1">Total Impact Value</p>
                <p className="text-3xl font-black text-white">
                  <span className="text-green-400">${totalAmount.toFixed(2)}</span>
                </p>
                <div className="flex items-center space-x-2 mt-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse-glow"></div>
                  <span className="text-green-400 text-xs font-medium">Current page total</span>
                </div>
              </div>
            </div>
          </div>

          <div className="card p-6 rounded-2xl border border-cyan-500/20 bg-gradient-to-r from-cyan-500/5 to-blue-500/5 card-hover group">
            <div className="flex items-center space-x-6">
              <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-2xl flex items-center justify-center shadow-xl group-hover:shadow-cyan-500/50 transition-all duration-300">
                <Calendar className="h-8 w-8 text-white group-hover:animate-pulse-glow" />
              </div>
              <div>
                <p className="text-cyan-300 font-medium mb-1">Impact Events</p>
                <p className="text-3xl font-black text-white">
                  <span className="text-cyan-400">{donations.length}</span>
                </p>
                <div className="flex items-center space-x-2 mt-2">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse-glow"></div>
                  <span className="text-cyan-400 text-xs font-medium">Active contributions</span>
                </div>
              </div>
            </div>
          </div>

          <div className="card p-6 rounded-2xl border border-purple-500/20 bg-gradient-to-r from-purple-500/5 to-pink-500/5 card-hover group">
            <div className="flex items-center space-x-6">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-500 rounded-2xl flex items-center justify-center shadow-xl group-hover:shadow-purple-500/50 transition-all duration-300">
                <User className="h-8 w-8 text-white group-hover:animate-pulse-glow" />
              </div>
              <div>
                <p className="text-purple-300 font-medium mb-1">Total Records</p>
                <p className="text-3xl font-black text-white">
                  <span className="text-purple-400">{pagination.total}</span>
                </p>
                <div className="flex items-center space-x-2 mt-2">
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse-glow"></div>
                  <span className="text-purple-400 text-xs font-medium">Global impact data</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Search */}
        <div className="card p-6 rounded-2xl border border-cyan-500/20 bg-gradient-to-r from-cyan-500/5 to-blue-500/5 mb-8 animate-slide-in-up stagger-2">
          <div className="mb-4">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 text-cyan-300 text-sm font-semibold">
              <Search className="h-4 w-4 mr-2" />
              Search Impact Data
            </div>
          </div>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-slate-400" />
            </div>
            <input
              type="text"
              placeholder="Search by agent identifier..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 glass-dark border border-cyan-500/20 rounded-2xl text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400 focus:ring-0 transition-all duration-300"
            />
          </div>
        </div>

        {/* Enhanced Error Message */}
        {error && (
          <div className="card p-6 rounded-2xl border border-red-500/20 bg-gradient-to-r from-red-500/10 to-pink-500/10 mb-8 animate-slide-in-up">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-red-400 to-pink-500 rounded-2xl flex items-center justify-center">
                <AlertCircle className="h-6 w-6 text-white" />
              </div>
              <div>
                <div className="text-red-300 font-semibold mb-1">Data Retrieval Error</div>
                <div className="text-red-200 text-sm">{error}</div>
              </div>
            </div>
          </div>
        )}

        {/* Enhanced Donations Table */}
        <div className="card p-8 rounded-3xl animate-slide-in-up stagger-3">
          <div className="mb-8">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 text-purple-300 text-sm font-semibold mb-4">
              <Heart className="h-4 w-4 mr-2" />
              Impact Records
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">
              Global Contributions <span className="text-purple-400">({pagination.total})</span>
            </h2>
            <p className="text-slate-400">Complete record of all impact events in the network</p>
          </div>

          {loading ? (
            <div className="p-8 text-center">
              <div className="w-12 h-12 relative mx-auto">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-xl animate-spin"></div>
                <div className="absolute inset-1 bg-gray-900 rounded-lg"></div>
                <div className="absolute inset-2 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-lg animate-ping"></div>
              </div>
            </div>
          ) : filteredDonations.length === 0 ? (
            <div className="p-8 text-center">
              <DollarSign className="h-16 w-16 text-purple-400 mx-auto mb-4 animate-pulse-neon" />
              <p className="text-gray-400">
                {searchTerm ? 'No impact records found matching your search.' : 'No impact records found in the network.'}
              </p>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr className="border-b border-purple-500/20">
                      <th className="px-6 py-4 text-left text-xs font-medium text-purple-300 uppercase tracking-wider">
                        Impact ID
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-purple-300 uppercase tracking-wider">
                        Value
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-purple-300 uppercase tracking-wider">
                        Agent
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-purple-300 uppercase tracking-wider">
                        Age
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-purple-300 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-purple-300 uppercase tracking-wider">
                        Time
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-purple-500/10">
                    {filteredDonations.map((donation) => (
                      <tr key={donation.id} className="hover:bg-purple-500/5 transition-colors duration-150">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="text-cyan-300 font-medium">#{donation.id}</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center space-x-2">
                            <div className="bg-gradient-to-r from-emerald-500/20 to-green-500/20 p-2 rounded-lg border border-emerald-500/30">
                              <DollarSign className="h-4 w-4 text-emerald-400" />
                            </div>
                            <span className="text-emerald-300 font-medium text-lg">
                              ${donation.amount.toFixed(2)}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center space-x-4">
                            <div className="bg-gradient-to-br from-purple-500/20 to-cyan-500/20 h-10 w-10 rounded-xl flex items-center justify-center border border-purple-500/30">
                              <span className="text-purple-300 font-bold">
                                {donation.user.username.charAt(0).toUpperCase()}
                              </span>
                            </div>
                            <div>
                              <div className="text-white font-medium">
                                {donation.user.username}
                              </div>
                              <div className="text-sm text-purple-400">
                                ID: {donation.user.id}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="text-cyan-300">{donation.user.age} cycles</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="text-gray-400">{new Date(donation.createdAt).toLocaleDateString()}</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="text-gray-400">{new Date(donation.createdAt).toLocaleTimeString()}</span>
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
                    {pagination.total} impact records
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handlePageChange(pagination.page - 1)}
                      disabled={pagination.page === 1}
                      className="glass-dark px-4 py-2 rounded-xl border border-purple-500/30 text-sm font-medium text-purple-300 hover:border-purple-400/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </button>
                    
                    {Array.from({ length: Math.min(pagination.totalPages, 5) }, (_, i) => {
                      const page = Math.max(1, pagination.page - 2) + i;
                      if (page > pagination.totalPages) return null;
                      return (
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
                      );
                    })}
                    
                    <button
                      onClick={() => handlePageChange(pagination.page + 1)}
                      disabled={pagination.page === pagination.totalPages}
                      className="glass-dark px-4 py-2 rounded-xl border border-purple-500/30 text-sm font-medium text-purple-300 hover:border-purple-400/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                    >
                      <ChevronRight className="h-4 w-4" />
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

export default DonationsManagement;