import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Shield, Eye, EyeOff, Zap, ArrowLeft, Sparkles, Lock } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import api from '../utils/api';
import type { AuthResponse } from '../types';

const AdminLogin: React.FC = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await api.post<AuthResponse>('/admin/login', {
        username: formData.username,
        password: formData.password,
      });

      const { token, admin } = response.data;
      
      login(token, admin!, 'admin');
      navigate('/admin/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Admin login failed');
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
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Enhanced Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-500/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/8 rounded-full blur-3xl animate-float stagger-2"></div>
        <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-orange-500/10 rounded-full blur-3xl animate-float stagger-4"></div>
      </div>

      <div className="relative z-10 max-w-md w-full p-8">
        <div className="card p-8 rounded-3xl animate-slide-in-up">
          <div className="text-center mb-8">
            <div className="mb-6">
              <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-br from-red-400 to-orange-500 flex items-center justify-center shadow-xl animate-pulse-glow">
                <Shield className="h-10 w-10 text-white" />
              </div>
              <div className="absolute inset-0 bg-red-400/20 rounded-3xl blur-xl"></div>
            </div>
            <h2 className="text-4xl font-black mb-4">
              <span className="text-red-400 text-shadow">Admin</span>
              <br />
              <span className="gradient-text text-shadow">Nexus</span>
            </h2>
            <p className="text-slate-300 mb-6 leading-relaxed">
              High-security administrative neural interface for system control operations
            </p>
            <Link
              to="/login"
              className="btn-ghost px-4 py-2 rounded-2xl text-sm font-medium flex items-center justify-center space-x-2 mx-auto max-w-fit group"
            >
              <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform duration-300" />
              <span>User Portal</span>
            </Link>
          </div>
          
          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="card p-4 rounded-2xl border border-red-500/30 bg-gradient-to-r from-red-500/10 to-orange-500/10 animate-slide-in-up">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                  <span className="text-red-300 text-sm font-medium">{error}</span>
                </div>
              </div>
            )}
            
            <div className="space-y-6">
              <div className="animate-slide-in-up stagger-1">
                <label htmlFor="username" className="block text-sm font-semibold text-slate-300 mb-3">
                  Admin Identifier
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Shield className="h-5 w-5 text-slate-400" />
                  </div>
                  <input
                    id="username"
                    name="username"
                    type="text"
                    required
                    value={formData.username}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-4 glass-dark border border-red-500/20 rounded-2xl text-white placeholder-slate-400 focus:outline-none focus:border-red-400 focus:ring-0 transition-all duration-300"
                    placeholder="Enter admin credentials"
                  />
                </div>
              </div>

              <div className="animate-slide-in-up stagger-2">
                <label htmlFor="password" className="block text-sm font-semibold text-slate-300 mb-3">
                  Security Key
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-slate-400" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full pl-12 pr-12 py-4 glass-dark border border-red-500/20 rounded-2xl text-white placeholder-slate-400 focus:outline-none focus:border-red-400 focus:ring-0 transition-all duration-300"
                    placeholder="Enter security key"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-red-400 transition-colors duration-300"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>
            </div>

            <div className="animate-slide-in-up stagger-3">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-red-500 to-orange-500 text-white py-4 rounded-2xl font-bold hover:from-red-400 hover:to-orange-400 transition-all duration-300 glow-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-3 group"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Authenticating Neural Link...</span>
                  </>
                ) : (
                  <>
                    <Shield className="h-6 w-6 group-hover:animate-pulse-glow" />
                    <span>ACCESS ADMIN NEXUS</span>
                    <Zap className="h-6 w-6 group-hover:animate-bounce-gentle" />
                  </>
                )}
              </button>
            </div>
          </form>
          
          {/* Security Notice */}
          <div className="card p-4 rounded-2xl border border-orange-500/20 bg-gradient-to-r from-orange-500/5 to-red-500/5 mt-6">
            <div className="flex items-start space-x-3">
              <Sparkles className="h-5 w-5 text-orange-400 mt-0.5" />
              <div>
                <div className="text-orange-300 text-sm font-semibold mb-1">Secure Admin Protocol</div>
                <div className="text-orange-400/80 text-xs leading-relaxed">
                  Authorized personnel only. All administrative actions are monitored, logged, and encrypted using quantum security protocols.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;