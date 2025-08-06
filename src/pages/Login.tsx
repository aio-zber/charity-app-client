import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Heart, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import api from '../utils/api';
import type { AuthResponse } from '../types';

const Login: React.FC = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await api.post<AuthResponse>('/users/login', {
        username: formData.username,
        password: formData.password,
      });

      const { token, user } = response.data;
      
      login(token, user!, 'user');
      navigate(from, { replace: true });
    } catch (err: any) {
      setError(err.response?.data?.message || 'Login failed');
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
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-cyan-500/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-pink-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }}></div>
      </div>

      <div className="max-w-md w-full space-y-8 relative z-10">
        <div className="text-center animate-slide-in-up">
          <div className="mx-auto h-16 w-16 flex items-center justify-center mb-6">
            <div className="relative">
              <Heart className="h-16 w-16 text-cyan-400 animate-pulse-neon" />
              <div className="absolute inset-0 bg-cyan-400/20 rounded-full blur-lg"></div>
            </div>
          </div>
          <h2 className="text-4xl font-bold gradient-text mb-4">
            Access Portal
          </h2>
          <p className="text-gray-400">
            Initialize neural connection to the network
          </p>
          <div className="flex items-center justify-center space-x-2 mt-4">
            <span className="text-sm text-gray-500">New agent?</span>
            <Link
              to="/register"
              className="font-medium text-cyan-400 hover:text-cyan-300 transition-colors duration-300"
            >
              Deploy Profile
            </Link>
          </div>
          <div className="mt-4">
            <Link
              to="/admin/login"
              className="text-sm text-purple-400 hover:text-purple-300 transition-colors duration-300"
            >
              Admin Nexus →
            </Link>
          </div>
        </div>

        <div className="glass-dark p-8 rounded-2xl border border-cyan-500/30 animate-fade-in-scale">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="glass p-4 rounded-xl border border-red-500/30 bg-red-500/10">
                <div className="text-sm text-red-400 flex items-center space-x-2">
                  <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse-neon"></div>
                  <span>{error}</span>
                </div>
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-cyan-300 mb-2">
                  Agent Identifier
                </label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  className="w-full px-4 py-3 glass rounded-xl border border-cyan-500/30 bg-transparent text-white placeholder-gray-400 focus-neon transition-all duration-300"
                  placeholder="Enter your agent ID"
                  value={formData.username}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-cyan-300 mb-2">
                  Neural Key
                </label>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    className="w-full px-4 py-3 pr-12 glass rounded-xl border border-cyan-500/30 bg-transparent text-white placeholder-gray-400 focus-neon transition-all duration-300"
                    placeholder="Enter your neural key"
                    value={formData.password}
                    onChange={handleChange}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-cyan-400 transition-colors duration-300"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <Link
                to="/forgot-password"
                className="text-sm text-gray-400 hover:text-cyan-400 transition-colors duration-300"
              >
                Neural key recovery?
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-cyan-500 to-purple-600 text-white py-3 px-6 rounded-xl font-bold hover:from-cyan-400 hover:to-purple-500 transition-all duration-300 neon-glow-sm transform hover:scale-105 disabled:opacity-50 disabled:transform-none flex items-center justify-center space-x-2"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Initializing...</span>
                </>
              ) : (
                <>
                  <span>INITIALIZE CONNECTION</span>
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse-neon"></div>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Status Indicators */}
        <div className="flex justify-center space-x-6 text-xs">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse-neon"></div>
            <span className="text-gray-400">Network Online</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse-neon"></div>
            <span className="text-gray-400">Portal Active</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse-neon"></div>
            <span className="text-gray-400">Secure Link</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;