import React, { useState, useEffect } from 'react';
import { User, Edit3, Save, X, DollarSign, Calendar, Heart, Sparkles, Shield, ArrowRight, Star, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import api from '../utils/api';
import type { Donation } from '../types';

const Profile: React.FC = () => {
  const { user, login } = useAuth();
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [donations, setDonations] = useState<Donation[]>([]);
  const [loadingDonations, setLoadingDonations] = useState(true);
  const [formData, setFormData] = useState({
    username: user?.username || '',
    age: user?.age?.toString() || '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (user) {
      setFormData({
        username: user.username,
        age: user.age.toString(),
        password: '',
        confirmPassword: '',
      });
    }
    fetchDonations();
  }, [user]);

  const fetchDonations = async () => {
    try {
      const response = await api.get('/donations/my-donations');
      setDonations(response.data.donations || []);
    } catch (error) {
      console.error('Error fetching donations:', error);
    } finally {
      setLoadingDonations(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    if (formData.password && formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      const updateData: any = {
        username: formData.username,
        age: parseInt(formData.age),
      };

      if (formData.password) {
        updateData.password = formData.password;
      }

      const response = await api.put('/users/profile', updateData);
      
      // Update auth context with new user data
      if (user) {
        const token = localStorage.getItem('token')!;
        login(token, response.data.user, 'user');
      }
      
      setSuccess('Profile updated successfully');
      setEditing(false);
      setFormData(prev => ({ ...prev, password: '', confirmPassword: '' }));
    } catch (err: any) {
      if (err.response?.data?.errors) {
        setError(err.response.data.errors.map((e: any) => e.msg).join(', '));
      } else {
        setError(err.response?.data?.message || 'Update failed');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleCancel = () => {
    setEditing(false);
    setError('');
    setSuccess('');
    setFormData({
      username: user?.username || '',
      age: user?.age?.toString() || '',
      password: '',
      confirmPassword: '',
    });
  };

  const totalDonated = donations.reduce((sum, donation) => sum + donation.amount, 0);

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-purple-500/8 rounded-full blur-3xl animate-float stagger-2"></div>
        <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-float stagger-4"></div>
        <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-green-500/8 rounded-full blur-3xl animate-float stagger-6"></div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Enhanced Header */}
        <div className="text-center mb-16 animate-slide-in-up">
          <div className="mb-8">
            <span className="inline-flex items-center px-6 py-3 rounded-full text-sm font-semibold bg-gradient-to-r from-purple-500/20 to-cyan-500/20 border border-purple-500/30 text-purple-300 backdrop-blur-sm">
              <User className="h-4 w-4 mr-2 animate-pulse-glow" />
              Agent Profile
              <ArrowRight className="h-4 w-4 ml-2" />
            </span>
          </div>
          <h1 className="text-6xl md:text-7xl font-black mb-6 leading-tight">
            <span className="gradient-text text-shadow">Welcome,</span>
            <br />
            <span className="gradient-text-secondary text-shadow">{user?.username}</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-slate-300 max-w-3xl mx-auto leading-relaxed font-medium">
            Manage your account settings, track your impact, and view your complete donation history
          </p>
        </div>

        <div className="card p-8 rounded-3xl animate-slide-in-up stagger-1">
          {/* Profile Header */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8 p-6 bg-gradient-to-r from-purple-500/10 to-cyan-500/10 rounded-2xl border border-purple-500/20">
            <div className="flex items-center space-x-6 mb-4 lg:mb-0">
              <div className="relative">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-400 to-cyan-500 rounded-3xl flex items-center justify-center shadow-xl">
                  <User className="h-10 w-10 text-white" />
                </div>
                <div className="absolute inset-0 bg-purple-400/20 rounded-3xl blur-xl"></div>
                {/* Status indicator */}
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-400 rounded-full border-2 border-slate-900 flex items-center justify-center">
                  <div className="w-3 h-3 bg-green-300 rounded-full animate-pulse-glow"></div>
                </div>
              </div>
              <div>
                <h2 className="text-3xl font-bold text-white mb-2">Agent Profile</h2>
                <p className="text-slate-300">Neural network interface and impact tracking dashboard</p>
                <div className="flex items-center space-x-2 mt-2">
                  <Shield className="h-4 w-4 text-green-400" />
                  <span className="text-green-400 text-sm font-medium">Verified Agent</span>
                </div>
              </div>
            </div>
            {!editing && (
              <button
                onClick={() => setEditing(true)}
                className="btn-secondary px-6 py-3 rounded-2xl font-medium flex items-center space-x-3 group"
              >
                <Edit3 className="h-5 w-5 group-hover:animate-pulse-glow" />
                <span>Modify Profile</span>
                <Sparkles className="h-5 w-5 group-hover:animate-bounce-gentle" />
              </button>
            )}
          </div>

          {/* Profile Information */}
          <div className="space-y-8">
            {(error || success) && (
              <div className={`card p-4 rounded-2xl border animate-slide-in-up ${
                error 
                  ? 'border-red-500/30 bg-gradient-to-r from-red-500/10 to-pink-500/10' 
                  : 'border-green-500/30 bg-gradient-to-r from-green-500/10 to-emerald-500/10'
              }`}>
                <div className="flex items-center space-x-2">
                  <div className={`w-2 h-2 rounded-full ${error ? 'bg-red-400' : 'bg-green-400'}`}></div>
                  <span className={`text-sm font-medium ${error ? 'text-red-300' : 'text-green-300'}`}>
                    {error || success}
                  </span>
                </div>
              </div>
            )}

            {editing ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                      Username
                    </label>
                    <input
                      type="text"
                      id="username"
                      name="username"
                      required
                      value={formData.username}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                    />
                  </div>

                  <div>
                    <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-2">
                      Age
                    </label>
                    <input
                      type="number"
                      id="age"
                      name="age"
                      min="13"
                      max="120"
                      required
                      value={formData.age}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                    />
                  </div>

                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                      New Password (optional)
                    </label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                      placeholder="Leave blank to keep current password"
                    />
                  </div>

                  <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      id="confirmPassword"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                      placeholder="Confirm new password"
                    />
                  </div>
                </div>

                <div className="flex space-x-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className="bg-primary-600 text-white px-6 py-2 rounded-md font-medium hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                  >
                    <Save className="h-4 w-4" />
                    <span>{loading ? 'Saving...' : 'Save Changes'}</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="bg-gray-300 text-gray-700 px-6 py-2 rounded-md font-medium hover:bg-gray-400 flex items-center space-x-2"
                  >
                    <X className="h-4 w-4" />
                    <span>Cancel</span>
                  </button>
                </div>
              </form>
            ) : (
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-purple-300 mb-2">Username</label>
                  <p className="text-lg text-cyan-300">{user?.username}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-purple-300 mb-2">Age</label>
                  <p className="text-lg text-cyan-300">{user?.age} cycles</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-purple-300 mb-2">Member Since</label>
                  <p className="text-lg text-cyan-300">
                    {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-purple-300 mb-2">Total Impact</label>
                  <p className="text-lg text-cyan-300 font-semibold">${totalDonated.toFixed(2)}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Donation History */}
        <div className="mt-8 glass-dark rounded-2xl border border-purple-500/30 overflow-hidden">
          <div className="px-6 py-4 border-b border-purple-500/20">
            <h2 className="text-xl font-bold text-purple-300 flex items-center space-x-3">
              <DollarSign className="h-6 w-6 text-purple-400 animate-pulse-neon" />
              <span>Impact History</span>
            </h2>
          </div>
          
          <div className="px-6 py-4">
            {loadingDonations ? (
              <div className="text-center py-8">
                <div className="w-12 h-12 relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-xl animate-spin"></div>
                  <div className="absolute inset-1 bg-gray-900 rounded-lg"></div>
                  <div className="absolute inset-2 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-lg animate-ping"></div>
                </div>
              </div>
            ) : donations.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-400">No impact records yet. Start making a difference today!</p>
              </div>
            ) : (
              <div className="space-y-4">
                {donations.map((donation) => (
                  <div key={donation.id} className="glass p-4 rounded-xl border border-cyan-500/20 flex items-center justify-between card-hover">
                    <div className="flex items-center space-x-4">
                      <div className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 p-3 rounded-xl border border-cyan-500/30">
                        <DollarSign className="h-5 w-5 text-cyan-400 animate-pulse-neon" />
                      </div>
                      <div>
                        <p className="font-medium text-cyan-300 text-lg">${donation.amount.toFixed(2)}</p>
                        <p className="text-sm text-gray-400 flex items-center space-x-2">
                          <Calendar className="h-4 w-4 text-gray-500" />
                          <span>{new Date(donation.createdAt).toLocaleDateString()}</span>
                        </p>
                      </div>
                    </div>
                    <div className="text-xs text-cyan-400">Quantum Transfer</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;