import React, { useState } from 'react';
import { Shield, Plus, CheckCircle, AlertCircle } from 'lucide-react';
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
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center">
            <Shield className="h-8 w-8 mr-3" />
            Admin Management
          </h1>
          <p className="text-gray-600">Create new administrator accounts</p>
        </div>

        {/* Create Admin Form */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900 flex items-center">
              <Plus className="h-5 w-5 mr-2" />
              Create New Admin
            </h2>
          </div>

          <div className="p-6">
            {/* Success Message */}
            {success && (
              <div className="mb-6 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded flex items-center">
                <CheckCircle className="h-5 w-5 mr-2" />
                {success}
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded flex items-center">
                <AlertCircle className="h-5 w-5 mr-2" />
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                  Admin Username
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  required
                  value={formData.username}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Enter admin username"
                />
                <p className="mt-1 text-sm text-gray-500">
                  Username must be 3-20 characters and contain only letters, numbers, and underscores.
                </p>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Enter admin password"
                />
                <p className="mt-1 text-sm text-gray-500">
                  Password must be at least 8 characters long for security.
                </p>
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Confirm admin password"
                />
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-primary-600 text-white px-6 py-2 rounded-md font-medium hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                >
                  <Shield className="h-4 w-4" />
                  <span>{loading ? 'Creating Admin...' : 'Create Admin'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Security Notice */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <div className="flex items-start">
            <Shield className="h-6 w-6 text-blue-600 mr-3 mt-0.5" />
            <div>
              <h3 className="text-lg font-medium text-blue-900 mb-2">Security Guidelines</h3>
              <ul className="text-blue-800 space-y-1 text-sm">
                <li>• Admin accounts have full access to the system</li>
                <li>• Use strong, unique passwords for admin accounts</li>
                <li>• Only create admin accounts for trusted personnel</li>
                <li>• Regularly review and audit admin account usage</li>
                <li>• Consider implementing two-factor authentication for additional security</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Current Admin Info */}
        <div className="mt-8 bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Current Session</h3>
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-sm text-gray-600">
              You are currently logged in as an administrator. Admin accounts can:
            </p>
            <ul className="mt-2 text-sm text-gray-600 space-y-1">
              <li>• View and manage all users</li>
              <li>• Access donation records and analytics</li>
              <li>• Create and manage other admin accounts</li>
              <li>• Add donations on behalf of users</li>
              <li>• Access comprehensive dashboard statistics</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminManagement;