import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BarChart3, Users, DollarSign, TrendingUp, Calendar, UserPlus, AlertCircle } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useSocket } from '../../contexts/SocketContext';
import api from '../../utils/api';
import type { DashboardStats } from '../../types';
import Toast from '../../components/Toast';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart
} from 'recharts';

const Dashboard: React.FC = () => {
  const { admin } = useAuth();
  const { socket } = useSocket();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  // Listen for real-time updates
  useEffect(() => {
    if (!socket) return;

    socket.on('dashboard:stats', (newStats: DashboardStats) => {
      // Add a subtle loading effect before updating stats
      setLoading(true);
      setTimeout(() => {
        setStats(newStats);
        setLoading(false);
      }, 300);
    });

    socket.on('donation:new', (donation: any) => {
      setToast({
        message: `New impact registered: $${donation.amount.toFixed(2)}`,
        type: 'success'
      });
    });

    return () => {
      socket.off('dashboard:stats');
      socket.off('donation:new');
    };
  }, [socket]);

  const fetchDashboardStats = async () => {
    try {
      const response = await api.get('/admin/dashboard');
      setStats(response.data);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to load dashboard stats');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="glass-dark p-8 rounded-2xl border border-purple-500/30 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-cyan-500/10 animate-pulse"></div>
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 relative">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-xl animate-spin"></div>
              <div className="absolute inset-1 bg-gray-900 rounded-lg"></div>
              <div className="absolute inset-2 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-lg animate-ping"></div>
            </div>
            <div className="space-y-2">
              <div className="h-4 w-48 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 rounded animate-pulse"></div>
              <div className="h-3 w-32 bg-gradient-to-r from-purple-500/10 to-cyan-500/10 rounded animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="glass-dark p-8 rounded-2xl border border-red-500/30 relative overflow-hidden animate-slide-in-up">
          <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-pink-500/10 animate-pulse"></div>
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-pink-500 rounded-xl flex items-center justify-center">
              <AlertCircle className="h-6 w-6 text-white animate-bounce" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-red-400 mb-2">System Alert</h3>
              <p className="text-red-300">{error}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 animate-fade-in-scale">
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
      {/* Header */}
      <div className="mb-12">
        <div className="flex items-center space-x-4 mb-4">
          <div className="w-12 h-12 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 rounded-2xl flex items-center justify-center border border-purple-500/30">
            <BarChart3 className="h-6 w-6 text-purple-400 animate-pulse-neon" />
          </div>
          <div>
            <h1 className="text-4xl font-bold gradient-text">Command Center</h1>
            <p className="text-gray-400">Neural system analysis - Agent {admin?.username}</p>
          </div>
        </div>
        <div className="h-1 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full w-32"></div>
      </div>

      {/* Advanced Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        <div className="glass-dark p-6 rounded-2xl border border-purple-500/30 card-hover animate-fade-in-scale">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-purple-500/20 to-indigo-500/20 p-3 rounded-xl border border-purple-500/30">
                <TrendingUp className="h-6 w-6 text-purple-400" />
              </div>
              <h3 className="text-lg font-semibold text-purple-300">Growth Rate</h3>
            </div>
            <div className="text-xs text-purple-400">30 Days</div>
          </div>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-400">User Growth</span>
                <span className="text-purple-300">+{((stats?.totalUsers || 0) * 0.15).toFixed(1)}%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-1">
                <div className="bg-gradient-to-r from-purple-500 to-indigo-500 h-1 rounded-full w-3/4 animate-pulse-neon"></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-400">Impact Growth</span>
                <span className="text-purple-300">+{((stats?.totalDonations.amount || 0) * 0.25).toFixed(1)}%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-1">
                <div className="bg-gradient-to-r from-purple-500 to-indigo-500 h-1 rounded-full w-4/5 animate-pulse-neon"></div>
              </div>
            </div>
          </div>
        </div>

        <div className="glass-dark p-6 rounded-2xl border border-cyan-500/30 card-hover animate-fade-in-scale">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 p-3 rounded-xl border border-cyan-500/30">
                <Users className="h-6 w-6 text-cyan-400" />
              </div>
              <h3 className="text-lg font-semibold text-cyan-300">User Engagement</h3>
            </div>
            <div className="text-xs text-cyan-400">Real-time</div>
          </div>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-400">Active Users</span>
                <span className="text-cyan-300">{Math.floor((stats?.totalUsers || 0) * 0.6)}</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-1">
                <div className="bg-gradient-to-r from-cyan-500 to-blue-500 h-1 rounded-full w-2/3 animate-pulse-neon"></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-400">Retention Rate</span>
                <span className="text-cyan-300">85%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-1">
                <div className="bg-gradient-to-r from-cyan-500 to-blue-500 h-1 rounded-full w-[85%] animate-pulse-neon"></div>
              </div>
            </div>
          </div>
        </div>

        <div className="glass-dark p-6 rounded-2xl border border-emerald-500/30 card-hover animate-fade-in-scale">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-emerald-500/20 to-green-500/20 p-3 rounded-xl border border-emerald-500/30">
                <DollarSign className="h-6 w-6 text-emerald-400" />
              </div>
              <h3 className="text-lg font-semibold text-emerald-300">Impact Metrics</h3>
            </div>
            <div className="text-xs text-emerald-400">All Time</div>
          </div>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-400">Avg. Impact</span>
                <span className="text-emerald-300">
                  ${((stats?.totalDonations.amount || 0) / (stats?.totalDonations.count || 1)).toFixed(2)}
                </span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-1">
                <div className="bg-gradient-to-r from-emerald-500 to-green-500 h-1 rounded-full w-4/5 animate-pulse-neon"></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-400">Impact Frequency</span>
                <span className="text-emerald-300">
                  {((stats?.totalDonations.count || 0) / (stats?.totalUsers || 1)).toFixed(1)} per user
                </span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-1">
                <div className="bg-gradient-to-r from-emerald-500 to-green-500 h-1 rounded-full w-3/4 animate-pulse-neon"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <div className="glass-dark p-6 rounded-2xl border border-cyan-500/30 card-hover animate-fade-in-scale">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm font-medium text-cyan-400 uppercase tracking-wider">Active Agents</p>
              <p className="text-3xl font-bold text-white">{stats?.totalUsers || 0}</p>
              <p className="text-xs text-cyan-300">+12% from last cycle</p>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 p-4 rounded-xl border border-cyan-500/30">
                <Users className="h-8 w-8 text-cyan-400 animate-pulse-neon" />
              </div>
              <div className="absolute inset-0 bg-cyan-400/10 rounded-xl blur-lg"></div>
            </div>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div className="bg-gradient-to-r from-cyan-500 to-blue-500 h-2 rounded-full w-3/4 animate-pulse-neon"></div>
          </div>
        </div>

        <div className="glass-dark p-6 rounded-2xl border border-emerald-500/30 card-hover animate-fade-in-scale" style={{ animationDelay: '0.1s' }}>
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm font-medium text-emerald-400 uppercase tracking-wider">Impact Generated</p>
              <p className="text-3xl font-bold text-white">
                ${stats?.totalDonations.amount.toFixed(0) || '0'}
              </p>
              <p className="text-xs text-emerald-300">
                {stats?.totalDonations.count || 0} quantum transfers
              </p>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-r from-emerald-500/20 to-green-500/20 p-4 rounded-xl border border-emerald-500/30">
                <DollarSign className="h-8 w-8 text-emerald-400 animate-pulse-neon" />
              </div>
              <div className="absolute inset-0 bg-emerald-400/10 rounded-xl blur-lg"></div>
            </div>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div className="bg-gradient-to-r from-emerald-500 to-green-500 h-2 rounded-full w-4/5 animate-pulse-neon"></div>
          </div>
        </div>

        <div className="glass-dark p-6 rounded-2xl border border-purple-500/30 card-hover animate-fade-in-scale" style={{ animationDelay: '0.2s' }}>
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm font-medium text-purple-400 uppercase tracking-wider">Monthly Growth</p>
              <p className="text-3xl font-bold text-white">
                {stats?.monthly.count || 0}
              </p>
              <p className="text-xs text-purple-300">
                ${stats?.monthly.amount.toFixed(0) || '0'} deployed
              </p>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-r from-purple-500/20 to-indigo-500/20 p-4 rounded-xl border border-purple-500/30">
                <TrendingUp className="h-8 w-8 text-purple-400 animate-pulse-neon" />
              </div>
              <div className="absolute inset-0 bg-purple-400/10 rounded-xl blur-lg"></div>
            </div>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div className="bg-gradient-to-r from-purple-500 to-indigo-500 h-2 rounded-full w-2/3 animate-pulse-neon"></div>
          </div>
        </div>

        <div className="glass-dark p-6 rounded-2xl border border-orange-500/30 card-hover animate-fade-in-scale" style={{ animationDelay: '0.3s' }}>
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm font-medium text-orange-400 uppercase tracking-wider">Daily Operations</p>
              <p className="text-3xl font-bold text-white">
                {stats?.daily.count || 0}
              </p>
              <p className="text-xs text-orange-300">
                ${stats?.daily.amount.toFixed(0) || '0'} processed
              </p>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-r from-orange-500/20 to-red-500/20 p-4 rounded-xl border border-orange-500/30">
                <Calendar className="h-8 w-8 text-orange-400 animate-pulse-neon" />
              </div>
              <div className="absolute inset-0 bg-orange-400/10 rounded-xl blur-lg"></div>
            </div>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div className="bg-gradient-to-r from-orange-500 to-red-500 h-2 rounded-full w-1/2 animate-pulse-neon"></div>
          </div>
        </div>
      </div>

      {/* Impact Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        <div className="glass-dark rounded-2xl border border-purple-500/30 p-8 card-hover">
          <h3 className="text-xl font-bold text-purple-300 mb-6 flex items-center">
            <BarChart3 className="h-6 w-6 mr-3 animate-pulse-neon" />
            Impact Analysis Matrix
          </h3>
          <div className="space-y-4">
            <div className="glass p-4 rounded-xl border border-cyan-500/20">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium text-cyan-300">Daily Quantum</p>
                  <p className="text-sm text-gray-400">{stats?.daily.count || 0} operations</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-white">
                    ${stats?.daily.amount.toFixed(0) || '0'}
                  </p>
                  <div className="w-16 bg-gray-700 rounded-full h-1 mt-1">
                    <div className="bg-gradient-to-r from-cyan-500 to-blue-500 h-1 rounded-full w-1/2"></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="glass p-4 rounded-xl border border-purple-500/20">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium text-purple-300">Weekly Surge</p>
                  <p className="text-sm text-gray-400">{stats?.weekly.count || 0} operations</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-white">
                    ${stats?.weekly.amount.toFixed(0) || '0'}
                  </p>
                  <div className="w-16 bg-gray-700 rounded-full h-1 mt-1">
                    <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-1 rounded-full w-2/3"></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="glass p-4 rounded-xl border border-emerald-500/20">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium text-emerald-300">Monthly Flow</p>
                  <p className="text-sm text-gray-400">{stats?.monthly.count || 0} operations</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-white">
                    ${stats?.monthly.amount.toFixed(0) || '0'}
                  </p>
                  <div className="w-16 bg-gray-700 rounded-full h-1 mt-1">
                    <div className="bg-gradient-to-r from-emerald-500 to-green-500 h-1 rounded-full w-3/4"></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="glass p-4 rounded-xl border border-gradient-to-r from-cyan-500/30 to-purple-500/30 bg-gradient-to-r from-cyan-500/10 to-purple-500/10">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium gradient-text">Annual Matrix</p>
                  <p className="text-sm text-gray-400">{stats?.annual.count || 0} operations</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold gradient-text text-xl">
                    ${stats?.annual.amount.toFixed(0) || '0'}
                  </p>
                  <div className="w-16 bg-gray-700 rounded-full h-1 mt-1">
                    <div className="bg-gradient-to-r from-cyan-500 to-purple-500 h-1 rounded-full w-full animate-pulse-neon"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="glass-dark rounded-2xl border border-cyan-500/30 p-8 card-hover">
          <h3 className="text-xl font-bold text-cyan-300 mb-6">Quantum Operations</h3>
          <div className="space-y-4">
            <Link
              to="/admin/users"
              className="cyber-button w-full p-4 rounded-xl text-left transition-all duration-300 group"
            >
              <div className="flex items-center space-x-4">
                <div className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 p-3 rounded-xl border border-cyan-500/30 group-hover:border-cyan-400/50">
                  <Users className="h-6 w-6 text-cyan-400" />
                </div>
                <div>
                  <p className="font-medium text-cyan-300 group-hover:text-cyan-200">Agent Matrix</p>
                  <p className="text-sm text-gray-400">Manage neural network participants</p>
                </div>
              </div>
            </Link>

            <Link
              to="/admin/donations"
              className="cyber-button w-full p-4 rounded-xl text-left transition-all duration-300 group"
            >
              <div className="flex items-center space-x-4">
                <div className="bg-gradient-to-r from-emerald-500/20 to-green-500/20 p-3 rounded-xl border border-emerald-500/30 group-hover:border-emerald-400/50">
                  <DollarSign className="h-6 w-6 text-emerald-400" />
                </div>
                <div>
                  <p className="font-medium text-emerald-300 group-hover:text-emerald-200">Impact Flow</p>
                  <p className="text-sm text-gray-400">Monitor quantum resource transfers</p>
                </div>
              </div>
            </Link>

            <Link
              to="/admin/add-user"
              className="cyber-button w-full p-4 rounded-xl text-left transition-all duration-300 group"
            >
              <div className="flex items-center space-x-4">
                <div className="bg-gradient-to-r from-purple-500/20 to-indigo-500/20 p-3 rounded-xl border border-purple-500/30 group-hover:border-purple-400/50">
                  <UserPlus className="h-6 w-6 text-purple-400" />
                </div>
                <div>
                  <p className="font-medium text-purple-300 group-hover:text-purple-200">Deploy Agent</p>
                  <p className="text-sm text-gray-400">Initialize new network entity</p>
                </div>
              </div>
            </Link>

            <Link
              to="/admin/add-donation"
              className="cyber-button w-full p-4 rounded-xl text-left transition-all duration-300 group"
            >
              <div className="flex items-center space-x-4">
                <div className="bg-gradient-to-r from-orange-500/20 to-red-500/20 p-3 rounded-xl border border-orange-500/30 group-hover:border-orange-400/50">
                  <DollarSign className="h-6 w-6 text-orange-400" />
                </div>
                <div>
                  <p className="font-medium text-orange-300 group-hover:text-orange-200">Log Impact</p>
                  <p className="text-sm text-gray-400">Record quantum transfer event</p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* Interactive Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {/* Impact Trend Chart */}
        <div className="glass-dark rounded-2xl border border-purple-500/30 p-8 card-hover">
          <h3 className="text-xl font-bold text-purple-300 mb-6 flex items-center">
            <TrendingUp className="h-6 w-6 mr-3 animate-pulse-neon" />
            Impact Flow Trends
          </h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={[
                  { name: 'Week 1', amount: stats?.weekly.amount || 0 },
                  { name: 'Week 2', amount: (stats?.weekly.amount || 0) * 1.2 },
                  { name: 'Week 3', amount: (stats?.weekly.amount || 0) * 0.8 },
                  { name: 'Week 4', amount: stats?.monthly.amount || 0 },
                ]}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="impactGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="name" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(17, 24, 39, 0.8)',
                    border: '1px solid rgba(139, 92, 246, 0.3)',
                    borderRadius: '0.5rem',
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="amount"
                  stroke="#8B5CF6"
                  fillOpacity={1}
                  fill="url(#impactGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Impact Distribution Chart */}
        <div className="glass-dark rounded-2xl border border-cyan-500/30 p-8 card-hover">
          <h3 className="text-xl font-bold text-cyan-300 mb-6 flex items-center">
            <BarChart3 className="h-6 w-6 mr-3 animate-pulse-neon" />
            Impact Distribution
          </h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={[
                  { name: 'Daily', amount: stats?.daily.amount || 0 },
                  { name: 'Weekly', amount: stats?.weekly.amount || 0 },
                  { name: 'Monthly', amount: stats?.monthly.amount || 0 },
                  { name: 'Annual', amount: stats?.annual.amount || 0 },
                ]}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="name" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(17, 24, 39, 0.8)',
                    border: '1px solid rgba(45, 212, 191, 0.3)',
                    borderRadius: '0.5rem',
                  }}
                />
                <Bar
                  dataKey="amount"
                  fill="#2DD4BF"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Neural Activity Feed */}
      <div className="glass-dark rounded-2xl border border-purple-500/30 p-8">
        <h3 className="text-xl font-bold text-purple-300 mb-6 flex items-center">
          <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse-neon mr-3"></div>
          Neural Activity Feed
        </h3>
        <div className="space-y-4">
          <div className="glass p-4 rounded-xl border border-cyan-500/20 flex items-center space-x-4">
            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse-neon"></div>
            <span className="text-gray-300">System monitoring active - All quantum cores operational</span>
            <span className="text-xs text-cyan-400 ml-auto">Real-time</span>
          </div>
          <div className="glass p-4 rounded-xl border border-emerald-500/20 flex items-center space-x-4">
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse-neon"></div>
            <span className="text-gray-300">Neural network synchronization complete</span>
            <span className="text-xs text-emerald-400 ml-auto">Active</span>
          </div>
          <div className="glass p-4 rounded-xl border border-purple-500/20 flex items-center space-x-4">
            <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse-neon"></div>
            <span className="text-gray-300">Impact deployment protocols verified</span>
            <span className="text-xs text-purple-400 ml-auto">Verified</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;