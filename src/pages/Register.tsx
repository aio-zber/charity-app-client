import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Heart, Eye, EyeOff, UserPlus, ArrowRight, CheckCircle, Zap, Shield } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import api from '../utils/api';
import type { AuthResponse } from '../types';

const Register: React.FC = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    age: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      const response = await api.post<AuthResponse>('/users/register', {
        username: formData.username,
        password: formData.password,
        age: parseInt(formData.age),
      });

      const { token, user } = response.data;
      login(token, user!, 'user');
      navigate('/');
    } catch (err: any) {
      if (err.response?.data?.errors) {
        setError(err.response.data.errors.map((e: any) => e.msg).join(', '));
      } else {
        setError(err.response?.data?.message || 'Registration failed');
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
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/8 rounded-full blur-3xl animate-float stagger-2"></div>
        <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-float stagger-4"></div>
      </div>

      <div className="relative z-10 max-w-md w-full p-8">
        <div className="card p-8 rounded-3xl animate-slide-in-up">
          <div className="text-center mb-8">
            <div className="mb-6">
              <div className="w-16 h-16 mx-auto rounded-3xl bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center shadow-xl animate-pulse-glow">
                <UserPlus className="h-8 w-8 text-white" />
              </div>
            </div>
            <h2 className="text-4xl font-black mb-4">
              <span className="gradient-text text-shadow">Join CharityFlow</span>
            </h2>
            <p className="text-slate-300 mb-6">
              Start your journey of creating meaningful impact today
            </p>
            <div className="flex items-center justify-center space-x-2 text-sm">
              <span className="text-slate-400">Already have an account?</span>
              <Link
                to="/login"
                className="font-semibold text-cyan-400 hover:text-cyan-300 transition-colors duration-300 flex items-center space-x-1"
              >
                <span>Sign in</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        
          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="card p-4 rounded-2xl border border-red-500/30 bg-gradient-to-r from-red-500/10 to-pink-500/10 animate-slide-in-up">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                  <span className="text-red-300 text-sm font-medium">{error}</span>
                </div>
              </div>
            )}
          
          <div className="space-y-4">
            <div>
              <label htmlFor="username" className="block text-sm font-semibold text-slate-300 mb-2">
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                required
                value={formData.username}
                onChange={handleChange}
                className="w-full px-4 py-3 glass-dark border border-cyan-500/20 rounded-2xl text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400 focus:ring-0 transition-all duration-300"
                placeholder="Choose a unique username"
              />
            </div>

            <div>
              <label htmlFor="age" className="block text-sm font-semibold text-slate-300 mb-2">
                Age
              </label>
              <input
                id="age"
                name="age"
                type="number"
                min="13"
                max="120"
                required
                value={formData.age}
                onChange={handleChange}
                className="w-full px-4 py-3 glass-dark border border-cyan-500/20 rounded-2xl text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400 focus:ring-0 transition-all duration-300"
                placeholder="Enter your age"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-slate-300 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-3 pr-12 glass-dark border border-cyan-500/20 rounded-2xl text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400 focus:ring-0 transition-all duration-300"
                  placeholder="Create a secure password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-cyan-400 transition-colors duration-300"
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

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-semibold text-slate-300 mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full px-4 py-3 pr-12 glass-dark border border-cyan-500/20 rounded-2xl text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400 focus:ring-0 transition-all duration-300"
                  placeholder="Confirm your password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-cyan-400 transition-colors duration-300"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>
          </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full py-4 rounded-2xl font-bold flex items-center justify-center space-x-3 disabled:opacity-50 disabled:cursor-not-allowed group mt-8"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Creating Your Account...</span>
                </>
              ) : (
                <>
                  <Zap className="h-5 w-5 group-hover:animate-pulse-glow" />
                  <span>Create Account</span>
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                </>
              )}
            </button>
            
            {/* Security Notice */}
            <div className="card p-4 rounded-2xl border border-green-500/20 bg-gradient-to-r from-green-500/5 to-emerald-500/5 mt-6">
              <div className="flex items-start space-x-3">
                <Shield className="h-5 w-5 text-green-400 mt-0.5" />
                <div>
                  <div className="text-green-300 text-sm font-semibold mb-1">Secure & Private</div>
                  <div className="text-green-400/80 text-xs">
                    Your data is protected with military-grade encryption. We never share your information.
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;