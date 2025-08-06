import React, { useState } from 'react';
import { UserPlus, ArrowLeft, CheckCircle, AlertCircle, Shield, Star, Sparkles, Eye, EyeOff, User as UserIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import api from '../../utils/api';

const AddUser: React.FC = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    age: '',
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

    try {
      await api.post('/admin/users', {
        username: formData.username,
        password: formData.password,
        age: parseInt(formData.age),
      });

      setSuccess(`User "${formData.username}" has been created successfully!`);
      setFormData({ username: '', password: '', confirmPassword: '', age: '' });
    } catch (err: any) {
      if (err.response?.data?.errors) {
        setError(err.response.data.errors.map((e: any) => e.msg).join(', '));
      } else {
        setError(err.response?.data?.message || 'Failed to create user');
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
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-cyan-500/8 rounded-full blur-3xl animate-float stagger-2"></div>
        <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-float stagger-4"></div>
        <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-pink-500/8 rounded-full blur-3xl animate-float stagger-6"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Enhanced Header */}
        <div className="text-center mb-16 animate-slide-in-up">
          <Link
            to="/admin/users"
            className="btn-ghost px-6 py-3 rounded-2xl font-medium inline-flex items-center space-x-3 group mb-8"
          >
            <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform duration-300" />
            <span>User Management</span>
          </Link>
          
          <div className="mb-8">
            <span className="inline-flex items-center px-6 py-3 rounded-full text-sm font-semibold bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 text-purple-300 backdrop-blur-sm">
              <UserPlus className="h-4 w-4 mr-2 animate-pulse-glow" />
              New Agent Registration
              <Sparkles className="h-4 w-4 ml-2" />
            </span>
          </div>
          <h1 className="text-6xl md:text-7xl font-black mb-6 leading-tight">
            <span className="gradient-text text-shadow">Add New</span>
            <br />
            <span className="gradient-text-secondary text-shadow">Agent</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-slate-300 max-w-3xl mx-auto leading-relaxed font-medium">
            Create and initialize a new agent profile in the CharityFlow network
          </p>
        </div>

        {/* Enhanced Form */}
        <div className="card p-8 rounded-3xl animate-slide-in-up stagger-1">
          <div className="mb-8">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/20 text-cyan-300 text-sm font-semibold mb-4">
              <UserIcon className="h-4 w-4 mr-2" />
              Agent Details
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Neural Profile Information</h2>
            <p className="text-slate-400">Configure the new agent's core identity parameters</p>
          </div>

          {/* Success Message */}
          {success && (
            <div className="card p-6 rounded-2xl border border-green-500/20 bg-gradient-to-r from-green-500/10 to-emerald-500/10 mb-8 animate-slide-in-up">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-500 rounded-2xl flex items-center justify-center">
                  <CheckCircle className="h-6 w-6 text-white" />
                </div>
                <div>
                  <div className="text-green-300 font-semibold mb-1">Agent Initialization Complete!</div>
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
                  <div className="text-red-300 font-semibold mb-1">Agent Initialization Failed</div>
                  <div className="text-red-200 text-sm">{error}</div>
                </div>
              </div>
            </div>
          )}

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Enhanced Username Input */}
              <div className="animate-slide-in-up stagger-2">
                <div className="mb-6">
                  <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 text-purple-300 text-sm font-semibold mb-4">
                    <UserIcon className="h-4 w-4 mr-2" />
                    Agent Identifier
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Username</h3>
                  <p className="text-slate-400">Choose a unique identifier for the new agent</p>
                </div>

                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <UserIcon className="h-5 w-5 text-slate-400" />
                  </div>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    required
                    value={formData.username}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-4 glass-dark border border-cyan-500/20 rounded-2xl text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400 focus:ring-0 transition-all duration-300"
                    placeholder="Enter agent identifier"
                  />
                </div>
                <p className="mt-3 text-sm text-slate-500">
                  Identifier must be 3-20 characters using letters, numbers, and underscores only.
                </p>
              </div>

              {/* Enhanced Age Input */}
              <div className="animate-slide-in-up stagger-3">
                <div className="mb-6">
                  <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 text-cyan-300 text-sm font-semibold mb-4">
                    <Star className="h-4 w-4 mr-2" />
                    Age Parameter
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Agent Age</h3>
                  <p className="text-slate-400">Specify the agent's chronological parameter</p>
                </div>

                <div className="relative">
                  <input
                    type="number"
                    id="age"
                    name="age"
                    min="13"
                    max="120"
                    required
                    value={formData.age}
                    onChange={handleChange}
                    className="w-full px-6 py-4 glass-dark border border-cyan-500/20 rounded-2xl text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400 focus:ring-0 transition-all duration-300"
                    placeholder="Enter agent age"
                  />
                </div>
                <p className="mt-3 text-sm text-slate-500">
                  Age parameter must be between 13 and 120 cycles.
                </p>
              </div>

              {/* Enhanced Password Input */}
              <div className="animate-slide-in-up stagger-4">
                <div className="mb-6">
                  <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 text-green-300 text-sm font-semibold mb-4">
                    <Shield className="h-4 w-4 mr-2" />
                    Neural Key
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Security Password</h3>
                  <p className="text-slate-400">Set the agent's primary security protocol</p>
                </div>

                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Shield className="h-5 w-5 text-slate-400" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full pl-12 pr-12 py-4 glass-dark border border-cyan-500/20 rounded-2xl text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400 focus:ring-0 transition-all duration-300"
                    placeholder="Enter neural key"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-cyan-400 transition-colors duration-300"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                <p className="mt-3 text-sm text-slate-500">
                  Neural key must be at least 6 characters for quantum security.
                </p>
              </div>

              {/* Enhanced Confirm Password Input */}
              <div className="animate-slide-in-up stagger-5">
                <div className="mb-6">
                  <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 text-purple-300 text-sm font-semibold mb-4">
                    <Shield className="h-4 w-4 mr-2" />
                    Verify Key
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Confirm Neural Key</h3>
                  <p className="text-slate-400">Verify the security protocol for accuracy</p>
                </div>

                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Shield className="h-5 w-5 text-slate-400" />
                  </div>
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    id="confirmPassword"
                    name="confirmPassword"
                    required
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full pl-12 pr-12 py-4 glass-dark border border-cyan-500/20 rounded-2xl text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400 focus:ring-0 transition-all duration-300"
                    placeholder="Confirm neural key"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-cyan-400 transition-colors duration-300"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-4 pt-6 animate-slide-in-up stagger-6">
                <Link
                  to="/admin/users"
                  className="btn-ghost px-6 py-3 rounded-2xl font-medium flex items-center justify-center space-x-3 group"
                >
                  <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform duration-300" />
                  <span>Cancel Process</span>
                </Link>
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary px-8 py-3 rounded-2xl font-bold flex items-center justify-center space-x-3 disabled:opacity-50 disabled:cursor-not-allowed group"
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Initializing Agent...</span>
                    </>
                  ) : (
                    <>
                      <UserPlus className="h-5 w-5 group-hover:animate-pulse-glow" />
                      <span>Initialize Agent</span>
                      <Sparkles className="h-5 w-5 group-hover:animate-bounce-gentle" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

        {/* Enhanced Info Section */}
        <div className="card p-8 rounded-3xl border border-blue-500/20 bg-gradient-to-r from-blue-500/5 to-cyan-500/5 mt-12 animate-slide-in-up stagger-7">
          <div className="flex items-start space-x-6">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-2xl flex items-center justify-center">
              <Shield className="h-8 w-8 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-blue-300 mb-4">Agent Protocol Guidelines</h3>
              <ul className="space-y-3">
                <li className="flex items-center text-blue-200">
                  <Star className="h-4 w-4 mr-3 text-blue-400" />
                  <span>Neural authentication via identifier and security key</span>
                </li>
                <li className="flex items-center text-blue-200">
                  <Star className="h-4 w-4 mr-3 text-blue-400" />
                  <span>Profile parameters can be updated post-initialization</span>
                </li>
                <li className="flex items-center text-blue-200">
                  <Star className="h-4 w-4 mr-3 text-blue-400" />
                  <span>Impact tracking and contribution history enabled</span>
                </li>
                <li className="flex items-center text-blue-200">
                  <Star className="h-4 w-4 mr-3 text-blue-400" />
                  <span>Neural network terms of service compliance required</span>
                </li>
                <li className="flex items-center text-blue-200">
                  <Star className="h-4 w-4 mr-3 text-blue-400" />
                  <span>Minimum agent age requirement: 13 cycles</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddUser;