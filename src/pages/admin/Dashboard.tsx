import React, { useState, useEffect } from 'react';
import { BarChart3, Users, DollarSign, TrendingUp, Calendar } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import api from '../../utils/api';
import type { DashboardStats } from '../../types';

const Dashboard: React.FC = () => {
  const { admin } = useAuth();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchDashboardStats();
  }, []);

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
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-lg">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600">Welcome back, {admin?.username}!</p>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Users</p>
                <p className="text-2xl font-bold text-gray-900">{stats?.totalUsers || 0}</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Donations</p>
                <p className="text-2xl font-bold text-gray-900">
                  ${stats?.totalDonations.amount.toFixed(2) || '0.00'}
                </p>
                <p className="text-xs text-gray-500">
                  {stats?.totalDonations.count || 0} donations
                </p>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <DollarSign className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Monthly Growth</p>
                <p className="text-2xl font-bold text-gray-900">
                  {stats?.monthly.count || 0}
                </p>
                <p className="text-xs text-green-600">
                  ${stats?.monthly.amount.toFixed(2) || '0.00'}
                </p>
              </div>
              <div className="bg-purple-100 p-3 rounded-full">
                <TrendingUp className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Daily Donations</p>
                <p className="text-2xl font-bold text-gray-900">
                  {stats?.daily.count || 0}
                </p>
                <p className="text-xs text-gray-500">
                  ${stats?.daily.amount.toFixed(2) || '0.00'}
                </p>
              </div>
              <div className="bg-orange-100 p-3 rounded-full">
                <Calendar className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Donation Period Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <BarChart3 className="h-5 w-5 mr-2" />
              Donation Overview
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                <div>
                  <p className="font-medium text-gray-900">Daily</p>
                  <p className="text-sm text-gray-600">{stats?.daily.count || 0} donations</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">
                    ${stats?.daily.amount.toFixed(2) || '0.00'}
                  </p>
                </div>
              </div>

              <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                <div>
                  <p className="font-medium text-gray-900">Weekly</p>
                  <p className="text-sm text-gray-600">{stats?.weekly.count || 0} donations</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">
                    ${stats?.weekly.amount.toFixed(2) || '0.00'}
                  </p>
                </div>
              </div>

              <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                <div>
                  <p className="font-medium text-gray-900">Monthly</p>
                  <p className="text-sm text-gray-600">{stats?.monthly.count || 0} donations</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">
                    ${stats?.monthly.amount.toFixed(2) || '0.00'}
                  </p>
                </div>
              </div>

              <div className="flex justify-between items-center p-3 bg-primary-50 rounded border border-primary-200">
                <div>
                  <p className="font-medium text-primary-900">Annual</p>
                  <p className="text-sm text-primary-700">{stats?.annual.count || 0} donations</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-primary-900">
                    ${stats?.annual.amount.toFixed(2) || '0.00'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <a
                href="/admin/users"
                className="block w-full text-left p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors duration-200"
              >
                <div className="flex items-center space-x-3">
                  <Users className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="font-medium text-blue-900">Manage Users</p>
                    <p className="text-sm text-blue-700">View and manage user accounts</p>
                  </div>
                </div>
              </a>

              <a
                href="/admin/donations"
                className="block w-full text-left p-4 bg-green-50 hover:bg-green-100 rounded-lg transition-colors duration-200"
              >
                <div className="flex items-center space-x-3">
                  <DollarSign className="h-5 w-5 text-green-600" />
                  <div>
                    <p className="font-medium text-green-900">View Donations</p>
                    <p className="text-sm text-green-700">Browse all donation records</p>
                  </div>
                </div>
              </a>

              <a
                href="/admin/add-user"
                className="block w-full text-left p-4 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors duration-200"
              >
                <div className="flex items-center space-x-3">
                  <Users className="h-5 w-5 text-purple-600" />
                  <div>
                    <p className="font-medium text-purple-900">Add New User</p>
                    <p className="text-sm text-purple-700">Create a new user account</p>
                  </div>
                </div>
              </a>

              <a
                href="/admin/add-donation"
                className="block w-full text-left p-4 bg-orange-50 hover:bg-orange-100 rounded-lg transition-colors duration-200"
              >
                <div className="flex items-center space-x-3">
                  <DollarSign className="h-5 w-5 text-orange-600" />
                  <div>
                    <p className="font-medium text-orange-900">Add Donation</p>
                    <p className="text-sm text-orange-700">Record a new donation</p>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* Recent Activity Placeholder */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
          <p className="text-gray-600">
            Recent user registrations, donations, and system activities will be displayed here.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;