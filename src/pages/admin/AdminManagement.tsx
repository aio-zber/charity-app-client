import React, { useState } from 'react';
import { Shield, CheckCircle, AlertCircle, Star, Sparkles, Eye, EyeOff, Lock, UserPlus } from 'lucide-react';
import api from '../../utils/api';

const AdminManagement: React.FC = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    if (formData.password.length < 8) {
      setError('Admin password must be at least 8 characters long');
      setLoading(false);
      return;
    }

    try {
      await api.post('/admin/register', {
        username: formData.username,
        password: formData.password,
      });

      setSuccess(`Admin "${formData.username}" has been created successfully!`);
      setFormData({ username: '', password: '', confirmPassword: '' });
    } catch (err: any) {
      if (err.response?.data?.errors) {
        setError(err.response.data.errors.map((e: any) => e.msg).join(', '));
      } else {
        setError(err.response?.data?.message || 'Failed to create admin');
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

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-500/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-orange-500/8 rounded-full blur-3xl animate-float stagger-2"></div>
        <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-float stagger-4"></div>
        <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-pink-500/8 rounded-full blur-3xl animate-float stagger-6"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Enhanced Header */}
        <div className="text-center mb-16 animate-slide-in-up">
          <div className="mb-8">
            <span className="inline-flex items-center px-6 py-3 rounded-full text-sm font-semibold bg-gradient-to-r from-red-500/20 to-orange-500/20 border border-red-500/30 text-red-300 backdrop-blur-sm">
              <Shield className="h-4 w-4 mr-2 animate-pulse-glow" />
              Admin Control Center
              <Sparkles className="h-4 w-4 ml-2" />
            </span>
          </div>
          <h1 className="text-6xl md:text-7xl font-black mb-6 leading-tight">
            <span className="gradient-text text-shadow">Admin</span>
            <br />
            <span className="text-red-400 text-shadow">Management</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-slate-300 max-w-3xl mx-auto leading-relaxed font-medium">
            Create and manage high-security administrator access to the CharityFlow network
          </p>
        </div>

        {/* Enhanced Create Admin Form */}
        <div className="card p-8 rounded-3xl animate-slide-in-up stagger-1">
          <div className="mb-8">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/20 text-orange-300 text-sm font-semibold mb-4">
              <UserPlus className="h-4 w-4 mr-2" />
              New Admin Access
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Create Administrator</h2>
            <p className="text-slate-400">Initialize a new high-security administrator profile</p>
          </div>

          {/* Success Message */}
          {success && (
            <div className="card p-6 rounded-2xl border border-green-500/20 bg-gradient-to-r from-green-500/10 to-emerald-500/10 mb-8 animate-slide-in-up">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-500 rounded-2xl flex items-center justify-center">
                  <CheckCircle className="h-6 w-6 text-white" />
                </div>
                <div>
                  <div className="text-green-300 font-semibold mb-1">Admin Initialization Complete!</div>
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
                  <div className="text-red-300 font-semibold mb-1">Admin Initialization Failed</div>
                  <div className="text-red-200 text-sm">{error}</div>
                </div>
              </div>
            </div>
          )}

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Enhanced Username Input */}
              <div className="animate-slide-in-up stagger-2">
                <div className="mb-6">
                  <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-red-500/10 to-orange-500/10 border border-red-500/20 text-red-300 text-sm font-semibold mb-4">
                    <Shield className="h-4 w-4 mr-2" />
                    Admin Identifier
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Username</h3>
                  <p className="text-slate-400">Choose a unique identifier for the admin profile</p>
                </div>

                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Shield className="h-5 w-5 text-slate-400" />
                  </div>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    required
                    value={formData.username}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-4 glass-dark border border-red-500/20 rounded-2xl text-white placeholder-slate-400 focus:outline-none focus:border-red-400 focus:ring-0 transition-all duration-300"
                    placeholder="Enter admin identifier"
                  />
                </div>
                <p className="mt-3 text-sm text-slate-500">
                  Identifier must be 3-20 characters using letters, numbers, and underscores only.
                </p>
              </div>

              {/* Enhanced Password Input */}
              <div className="animate-slide-in-up stagger-3">
                <div className="mb-6">
                  <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/20 text-orange-300 text-sm font-semibold mb-4">
                    <Lock className="h-4 w-4 mr-2" />
                    Security Protocol
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Admin Password</h3>
                  <p className="text-slate-400">Set the high-security access protocol</p>
                </div>

                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-slate-400" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full pl-12 pr-12 py-4 glass-dark border border-red-500/20 rounded-2xl text-white placeholder-slate-400 focus:outline-none focus:border-red-400 focus:ring-0 transition-all duration-300"
                    placeholder="Enter admin password"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-red-400 transition-colors duration-300"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                <p className="mt-3 text-sm text-slate-500">
                  Password must be at least 8 characters for quantum-grade security.
                </p>
              </div>

              {/* Enhanced Confirm Password Input */}
              <div className="animate-slide-in-up stagger-4">
                <div className="mb-6">
                  <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-red-500/10 to-pink-500/10 border border-red-500/20 text-red-300 text-sm font-semibold mb-4">
                    <Lock className="h-4 w-4 mr-2" />
                    Verify Protocol
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Confirm Password</h3>
                  <p className="text-slate-400">Verify the security protocol for accuracy</p>
                </div>

                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-slate-400" />
                  </div>
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    id="confirmPassword"
                    name="confirmPassword"
                    required
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full pl-12 pr-12 py-4 glass-dark border border-red-500/20 rounded-2xl text-white placeholder-slate-400 focus:outline-none focus:border-red-400 focus:ring-0 transition-all duration-300"
                    placeholder="Confirm admin password"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-red-400 transition-colors duration-300"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              <div className="flex justify-end pt-6 animate-slide-in-up stagger-5">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-red-500 to-orange-500 text-white py-4 rounded-2xl font-bold hover:from-red-400 hover:to-orange-400 transition-all duration-300 glow-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-3 group"
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Initializing Admin...</span>
                    </>
                  ) : (
                    <>
                      <Shield className="h-5 w-5 group-hover:animate-pulse-glow" />
                      <span>Create Admin Access</span>
                      <Sparkles className="h-5 w-5 group-hover:animate-bounce-gentle" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

        {/* Enhanced Security Notice */}
        <div className="card p-8 rounded-3xl border border-red-500/20 bg-gradient-to-r from-red-500/5 to-orange-500/5 mt-12 animate-slide-in-up stagger-6">
          <div className="flex items-start space-x-6">
            <div className="w-16 h-16 bg-gradient-to-br from-red-400 to-orange-500 rounded-2xl flex items-center justify-center">
              <Shield className="h-8 w-8 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-red-300 mb-4">Quantum Security Protocols</h3>
              <ul className="space-y-3">
                <li className="flex items-center text-red-200">
                  <Star className="h-4 w-4 mr-3 text-red-400" />
                  <span>Full system access with elevated privileges</span>
                </li>
                <li className="flex items-center text-red-200">
                  <Star className="h-4 w-4 mr-3 text-red-400" />
                  <span>Military-grade encryption for admin credentials</span>
                </li>
                <li className="flex items-center text-red-200">
                  <Star className="h-4 w-4 mr-3 text-red-400" />
                  <span>Restricted access to verified personnel only</span>
                </li>
                <li className="flex items-center text-red-200">
                  <Star className="h-4 w-4 mr-3 text-red-400" />
                  <span>Continuous monitoring and audit logging</span>
                </li>
                <li className="flex items-center text-red-200">
                  <Star className="h-4 w-4 mr-3 text-red-400" />
                  <span>Neural key verification with quantum security</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Enhanced Current Admin Info */}
        <div className="card p-8 rounded-3xl border border-orange-500/20 bg-gradient-to-r from-orange-500/5 to-red-500/5 mt-8 animate-slide-in-up stagger-7">
          <div className="flex items-start space-x-6">
            <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-red-500 rounded-2xl flex items-center justify-center">
              <Lock className="h-8 w-8 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-orange-300 mb-4">Admin Neural Interface</h3>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse-glow"></div>
                <span className="text-green-400 text-sm font-medium">Admin session active</span>
              </div>
              <p className="text-orange-200/80 mb-4">
                Your neural link grants access to the following system protocols:
              </p>
              <ul className="space-y-3">
                <li className="flex items-center text-orange-200">
                  <Star className="h-4 w-4 mr-3 text-orange-400" />
                  <span>Neural agent profile management</span>
                </li>
                <li className="flex items-center text-orange-200">
                  <Star className="h-4 w-4 mr-3 text-orange-400" />
                  <span>Impact metrics and quantum analytics</span>
                </li>
                <li className="flex items-center text-orange-200">
                  <Star className="h-4 w-4 mr-3 text-orange-400" />
                  <span>Admin access control protocols</span>
                </li>
                <li className="flex items-center text-orange-200">
                  <Star className="h-4 w-4 mr-3 text-orange-400" />
                  <span>Impact contribution management</span>
                </li>
                <li className="flex items-center text-orange-200">
                  <Star className="h-4 w-4 mr-3 text-orange-400" />
                  <span>Advanced system analytics interface</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminManagement;