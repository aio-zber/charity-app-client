import React, { useState, useEffect } from 'react';
import { DollarSign, ArrowLeft, CheckCircle, AlertCircle, Search, Sparkles, Heart, Star, Shield, Zap, User as UserIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import api from '../../utils/api';
import type { User } from '../../types';

const AddDonation: React.FC = () => {
  const [formData, setFormData] = useState({
    userId: '',
    amount: '',
  });
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    const filtered = users.filter(user =>
      user.username.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredUsers(filtered);
  }, [searchTerm, users]);

  const fetchUsers = async () => {
    try {
      const response = await api.get('/admin/users?limit=100'); // Get more users for selection
      setUsers(response.data.users || []);
      setFilteredUsers(response.data.users || []);
    } catch (err: any) {
      setError('Failed to load users');
    } finally {
      setLoadingUsers(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    if (!selectedUser) {
      setError('Please select a user');
      setLoading(false);
      return;
    }

    if (!formData.amount || parseFloat(formData.amount) < 0.01) {
      setError('Please enter a valid donation amount (minimum $0.01)');
      setLoading(false);
      return;
    }

    try {
      await api.post('/donations/admin', {
        userId: selectedUser.id,
        amount: parseFloat(formData.amount),
      });

      setSuccess(`Donation of $${parseFloat(formData.amount).toFixed(2)} has been recorded for ${selectedUser.username}!`);
      setFormData({ userId: '', amount: '' });
      setSelectedUser(null);
      setSearchTerm('');
    } catch (err: any) {
      if (err.response?.data?.errors) {
        setError(err.response.data.errors.map((e: any) => e.msg).join(', '));
      } else {
        setError(err.response?.data?.message || 'Failed to create donation');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleUserSelect = (user: User) => {
    setSelectedUser(user);
    setSearchTerm(user.username);
    setShowUserDropdown(false);
    setFormData(prev => ({ ...prev, userId: user.id.toString() }));
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, amount: e.target.value }));
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-green-500/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-cyan-500/8 rounded-full blur-3xl animate-float stagger-2"></div>
        <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-float stagger-4"></div>
        <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-blue-500/8 rounded-full blur-3xl animate-float stagger-6"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Enhanced Header */}
        <div className="text-center mb-16 animate-slide-in-up">
          <Link
            to="/admin/donations"
            className="btn-ghost px-6 py-3 rounded-2xl font-medium inline-flex items-center space-x-3 group mb-8"
          >
            <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform duration-300" />
            <span>Donations Management</span>
          </Link>
          
          <div className="mb-8">
            <span className="inline-flex items-center px-6 py-3 rounded-full text-sm font-semibold bg-gradient-to-r from-green-500/20 to-cyan-500/20 border border-green-500/30 text-green-300 backdrop-blur-sm">
              <DollarSign className="h-4 w-4 mr-2 animate-pulse-glow" />
              Record Impact
              <Sparkles className="h-4 w-4 ml-2" />
            </span>
          </div>
          <h1 className="text-6xl md:text-7xl font-black mb-6 leading-tight">
            <span className="gradient-text text-shadow">Add New</span>
            <br />
            <span className="gradient-text-accent text-shadow">Donation</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-slate-300 max-w-3xl mx-auto leading-relaxed font-medium">
            Record and track donations to measure real-world impact and community transformation
          </p>
        </div>

        {/* Enhanced Form */}
        <div className="card p-8 rounded-3xl animate-slide-in-up stagger-1">
          <div className="mb-8">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/20 text-cyan-300 text-sm font-semibold mb-4">
              <Star className="h-4 w-4 mr-2" />
              Impact Details
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Donation Information</h2>
            <p className="text-slate-400">Record and verify donation details for impact tracking</p>
          </div>

          {/* Success Message */}
          {success && (
            <div className="card p-6 rounded-2xl border border-green-500/20 bg-gradient-to-r from-green-500/10 to-emerald-500/10 mb-8 animate-slide-in-up">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-500 rounded-2xl flex items-center justify-center">
                  <CheckCircle className="h-6 w-6 text-white" />
                </div>
                <div>
                  <div className="text-green-300 font-semibold mb-1">Impact Recorded Successfully!</div>
                  <div className="text-green-200 text-sm">{success}</div>
                </div>
              </div>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="card p-6 rounded-2xl border border-red-500/20 bg-gradient-to-r from-red-500/10 to-pink-500/10 mb-8 animate-slide-in-up">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-red-400 to-pink-500 rounded-2xl flex items-center justify-center">
                  <AlertCircle className="h-6 w-6 text-white" />
                </div>
                <div>
                  <div className="text-red-300 font-semibold mb-1">Impact Recording Failed</div>
                  <div className="text-red-200 text-sm">{error}</div>
                </div>
              </div>
            </div>
          )}

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Enhanced User Selection */}
              <div className="animate-slide-in-up stagger-2">
                <div className="mb-6">
                  <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 text-purple-300 text-sm font-semibold mb-4">
                    <UserIcon className="h-4 w-4 mr-2" />
                    Select Agent
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Choose Impact Recipient</h3>
                  <p className="text-slate-400">Select the user who will receive the donation impact</p>
                </div>

                <div className="relative">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Search className="h-5 w-5 text-slate-400" />
                    </div>
                    <input
                      type="text"
                      placeholder="Search agents by identifier..."
                      value={searchTerm}
                      onChange={(e) => {
                        setSearchTerm(e.target.value);
                        setShowUserDropdown(true);
                        if (!e.target.value) {
                          setSelectedUser(null);
                          setFormData(prev => ({ ...prev, userId: '' }));
                        }
                      }}
                      onFocus={() => setShowUserDropdown(true)}
                      className="w-full pl-12 pr-4 py-4 glass-dark border border-cyan-500/20 rounded-2xl text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400 focus:ring-0 transition-all duration-300"
                    />
                  </div>
                  
                  {showUserDropdown && !loadingUsers && (
                    <div className="absolute z-10 w-full mt-2 card border border-cyan-500/20 rounded-2xl shadow-2xl max-h-80 overflow-y-auto animate-slide-in-down">
                      {filteredUsers.length === 0 ? (
                        <div className="p-6 text-slate-400 text-center">
                          <UserIcon className="h-8 w-8 mx-auto mb-2 opacity-50" />
                          No agents found matching your search
                        </div>
                      ) : (
                        filteredUsers.slice(0, 10).map((user) => (
                          <button
                            key={user.id}
                            type="button"
                            onClick={() => handleUserSelect(user)}
                            className="w-full text-left p-4 hover:bg-cyan-500/5 focus:bg-cyan-500/5 focus:outline-none transition-colors duration-300"
                          >
                            <div className="flex items-center">
                              <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-2xl flex items-center justify-center mr-4">
                                <span className="text-white font-bold text-lg">
                                  {user.username.charAt(0).toUpperCase()}
                                </span>
                              </div>
                              <div>
                                <div className="font-bold text-white mb-1">{user.username}</div>
                                <div className="text-sm text-slate-400">
                                  Age: {user.age} • Agent ID: {user.id}
                                </div>
                              </div>
                            </div>
                          </button>
                        ))
                      )}
                    </div>
                  )}
                </div>
                
                {selectedUser && (
                  <div className="mt-4 card p-4 rounded-2xl border border-green-500/20 bg-gradient-to-r from-green-500/10 to-emerald-500/10 animate-slide-in-up">
                    <div className="flex items-center space-x-4">
                      <div className="w-14 h-14 bg-gradient-to-br from-green-400 to-emerald-500 rounded-2xl flex items-center justify-center">
                        <span className="text-white font-bold text-xl">
                          {selectedUser.username.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <div className="text-green-300 font-bold mb-1">Selected Agent: {selectedUser.username}</div>
                        <div className="text-green-200/80 text-sm">
                          Age: {selectedUser.age} • Neural ID: {selectedUser.id}
                        </div>
                        <div className="flex items-center space-x-2 mt-2">
                          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse-glow"></div>
                          <span className="text-green-400 text-xs font-medium">Agent verified</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                <p className="mt-3 text-sm text-slate-500">
                  Search and select an agent to record their impact contribution
                </p>
              </div>

              {/* Enhanced Amount Input */}
              <div className="animate-slide-in-up stagger-3">
                <div className="mb-6">
                  <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 text-green-300 text-sm font-semibold mb-4">
                    <DollarSign className="h-4 w-4 mr-2" />
                    Impact Value
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Donation Amount</h3>
                  <p className="text-slate-400">Specify the monetary value of the impact contribution</p>
                </div>

                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
                    <span className="text-slate-400 font-medium">$</span>
                  </div>
                  <input
                    type="number"
                    id="amount"
                    min="0.01"
                    step="0.01"
                    required
                    value={formData.amount}
                    onChange={handleAmountChange}
                    className="w-full pl-12 pr-6 py-4 glass-dark border border-cyan-500/20 rounded-2xl text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400 focus:ring-0 transition-all duration-300"
                    placeholder="Enter impact value"
                  />
                </div>
                <p className="mt-3 text-sm text-slate-500">
                  Minimum impact value is $0.01 USD. Enter the exact contribution amount.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-4 pt-6 animate-slide-in-up stagger-4">
                <Link
                  to="/admin/donations"
                  className="btn-ghost px-6 py-3 rounded-2xl font-medium flex items-center justify-center space-x-3 group"
                >
                  <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform duration-300" />
                  <span>Cancel Process</span>
                </Link>
                <button
                  type="submit"
                  disabled={loading || !selectedUser || !formData.amount}
                  className="btn-primary px-8 py-3 rounded-2xl font-bold flex items-center justify-center space-x-3 disabled:opacity-50 disabled:cursor-not-allowed group"
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Recording Impact...</span>
                    </>
                  ) : (
                    <>
                      <Heart className="h-5 w-5 group-hover:animate-pulse-glow" />
                      <span>Record Impact</span>
                      <Sparkles className="h-5 w-5 group-hover:animate-bounce-gentle" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Enhanced Info Section */}
          <div className="card p-8 rounded-3xl border border-blue-500/20 bg-gradient-to-r from-blue-500/5 to-cyan-500/5 mt-12 animate-slide-in-up stagger-5">
            <div className="flex items-start space-x-6">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-2xl flex items-center justify-center">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-blue-300 mb-4">Impact Recording Protocol</h3>
                <ul className="space-y-3">
                  <li className="flex items-center text-blue-200">
                    <Star className="h-4 w-4 mr-3 text-blue-400" />
                    <span>Record external donations through secure admin interface</span>
                  </li>
                  <li className="flex items-center text-blue-200">
                    <Star className="h-4 w-4 mr-3 text-blue-400" />
                    <span>Impact metrics are linked to agent's neural profile</span>
                  </li>
                  <li className="flex items-center text-blue-200">
                    <Star className="h-4 w-4 mr-3 text-blue-400" />
                    <span>Contributions appear in agent's impact history</span>
                  </li>
                  <li className="flex items-center text-blue-200">
                    <Star className="h-4 w-4 mr-3 text-blue-400" />
                    <span>All impact data is included in quantum analytics</span>
                  </li>
                  <li className="flex items-center text-blue-200">
                    <Star className="h-4 w-4 mr-3 text-blue-400" />
                    <span>Verify agent and value accuracy before recording</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
      </div>
    </div>
  );
};

export default AddDonation;