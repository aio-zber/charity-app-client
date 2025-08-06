import React, { useState, useEffect } from 'react';
import { DollarSign, ArrowLeft, CheckCircle, AlertCircle, Search } from 'lucide-react';
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
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Link
            to="/admin/donations"
            className="inline-flex items-center text-primary-600 hover:text-primary-500 mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Donations Management
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center">
            <DollarSign className="h-8 w-8 mr-3" />
            Add New Donation
          </h1>
          <p className="text-gray-600">Record a donation for a user</p>
        </div>

        {/* Form */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">Donation Details</h2>
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
              {/* User Selection */}
              <div>
                <label htmlFor="user" className="block text-sm font-medium text-gray-700 mb-2">
                  Select User
                </label>
                <div className="relative">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search for a user..."
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
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                    />
                  </div>
                  
                  {showUserDropdown && !loadingUsers && (
                    <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
                      {filteredUsers.length === 0 ? (
                        <div className="p-3 text-gray-500 text-center">No users found</div>
                      ) : (
                        filteredUsers.slice(0, 10).map((user) => (
                          <button
                            key={user.id}
                            type="button"
                            onClick={() => handleUserSelect(user)}
                            className="w-full text-left p-3 hover:bg-gray-50 focus:bg-gray-50 focus:outline-none"
                          >
                            <div className="flex items-center">
                              <div className="bg-primary-100 h-8 w-8 rounded-full flex items-center justify-center mr-3">
                                <span className="text-primary-600 font-medium text-sm">
                                  {user.username.charAt(0).toUpperCase()}
                                </span>
                              </div>
                              <div>
                                <div className="font-medium text-gray-900">{user.username}</div>
                                <div className="text-sm text-gray-500">
                                  {user.age} years old • ID: {user.id}
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
                  <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-md">
                    <div className="flex items-center">
                      <div className="bg-green-100 h-8 w-8 rounded-full flex items-center justify-center mr-3">
                        <span className="text-green-600 font-medium text-sm">
                          {selectedUser.username.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <div className="font-medium text-green-900">Selected: {selectedUser.username}</div>
                        <div className="text-sm text-green-700">
                          {selectedUser.age} years old • User ID: {selectedUser.id}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                <p className="mt-1 text-sm text-gray-500">
                  Search and select the user for whom you want to record a donation.
                </p>
              </div>

              {/* Amount */}
              <div>
                <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-2">
                  Donation Amount
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 sm:text-sm">$</span>
                  </div>
                  <input
                    type="number"
                    id="amount"
                    min="0.01"
                    step="0.01"
                    required
                    value={formData.amount}
                    onChange={handleAmountChange}
                    className="block w-full pl-7 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                    placeholder="0.00"
                  />
                </div>
                <p className="mt-1 text-sm text-gray-500">
                  Enter the donation amount in USD. Minimum amount is $0.01.
                </p>
              </div>

              <div className="flex justify-end space-x-4">
                <Link
                  to="/admin/donations"
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </Link>
                <button
                  type="submit"
                  disabled={loading || !selectedUser || !formData.amount}
                  className="bg-primary-600 text-white px-6 py-2 rounded-md font-medium hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                >
                  <DollarSign className="h-4 w-4" />
                  <span>{loading ? 'Recording Donation...' : 'Record Donation'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Info Section */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-medium text-blue-900 mb-2">Recording Donations</h3>
          <ul className="text-blue-800 space-y-1 text-sm">
            <li>• This feature allows admins to record donations made outside the platform</li>
            <li>• The donation will be associated with the selected user's account</li>
            <li>• Users will see this donation in their donation history</li>
            <li>• All recorded donations are included in analytics and reporting</li>
            <li>• Ensure accuracy when recording donation amounts and user selection</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AddDonation;