import React, { useState } from 'react';
import { Heart, DollarSign, CreditCard, CheckCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import api from '../utils/api';

const Donate: React.FC = () => {
  const { user } = useAuth();
  const [amount, setAmount] = useState('');
  const [customAmount, setCustomAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const predefinedAmounts = [5, 10, 25, 50, 100, 250];

  const handleAmountSelect = (value: number) => {
    setAmount(value.toString());
    setCustomAmount('');
  };

  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomAmount(e.target.value);
    setAmount('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const donationAmount = amount || customAmount;
    
    if (!donationAmount || parseFloat(donationAmount) < 0.01) {
      setError('Please enter a valid donation amount (minimum $0.01)');
      setLoading(false);
      return;
    }

    try {
      await api.post('/donations', {
        amount: parseFloat(donationAmount),
      });

      setSuccess(true);
      setAmount('');
      setCustomAmount('');
    } catch (err: any) {
      if (err.response?.data?.errors) {
        setError(err.response.data.errors.map((e: any) => e.msg).join(', '));
      } else {
        setError(err.response?.data?.message || 'Donation failed');
      }
    } finally {
      setLoading(false);
    }
  };

  const selectedAmount = amount || customAmount;

  if (success) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full">
          <div className="bg-white shadow rounded-lg p-8 text-center">
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-6">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Thank You!</h2>
            <p className="text-gray-600 mb-6">
              Your donation of ${selectedAmount} has been successfully processed. 
              Your generosity will make a real difference in the world.
            </p>
            <button
              onClick={() => {
                setSuccess(false);
                setAmount('');
                setCustomAmount('');
              }}
              className="w-full bg-primary-600 text-white px-6 py-3 rounded-md font-medium hover:bg-primary-700"
            >
              Make Another Donation
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="bg-primary-100 p-4 rounded-full">
              <Heart className="h-12 w-12 text-primary-600" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Make a Donation</h1>
          <p className="text-xl text-gray-600">
            Thank you for choosing to make a difference, {user?.username}!
          </p>
        </div>

        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="px-6 py-8">
            <form onSubmit={handleSubmit}>
              {error && (
                <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                  {error}
                </div>
              )}

              {/* Amount Selection */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Choose Donation Amount</h3>
                
                {/* Predefined Amounts */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
                  {predefinedAmounts.map((value) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() => handleAmountSelect(value)}
                      className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                        amount === value.toString()
                          ? 'border-primary-600 bg-primary-50 text-primary-600'
                          : 'border-gray-200 hover:border-primary-300 text-gray-700'
                      }`}
                    >
                      <div className="text-center">
                        <DollarSign className="h-5 w-5 mx-auto mb-1" />
                        <span className="font-semibold">${value}</span>
                      </div>
                    </button>
                  ))}
                </div>

                {/* Custom Amount */}
                <div>
                  <label htmlFor="customAmount" className="block text-sm font-medium text-gray-700 mb-2">
                    Or enter a custom amount:
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-500 sm:text-sm">$</span>
                    </div>
                    <input
                      type="number"
                      id="customAmount"
                      min="0.01"
                      step="0.01"
                      value={customAmount}
                      onChange={handleCustomAmountChange}
                      className="block w-full pl-7 pr-3 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                      placeholder="0.00"
                    />
                  </div>
                </div>
              </div>

              {/* Impact Message */}
              {selectedAmount && parseFloat(selectedAmount) > 0 && (
                <div className="mb-8 p-4 bg-primary-50 rounded-lg">
                  <h4 className="font-semibold text-primary-900 mb-2">Your Impact</h4>
                  <p className="text-primary-700">
                    Your donation of ${parseFloat(selectedAmount).toFixed(2)} will help provide essential resources 
                    and support to those in need. Every dollar makes a difference!
                  </p>
                </div>
              )}

              {/* Payment Method (Simulated) */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Method</h3>
                <div className="border-2 border-gray-200 rounded-lg p-4">
                  <div className="flex items-center space-x-3">
                    <CreditCard className="h-6 w-6 text-gray-400" />
                    <div>
                      <p className="font-medium text-gray-900">Secure Payment Processing</p>
                      <p className="text-sm text-gray-500">
                        Your payment information is encrypted and secure
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading || !selectedAmount || parseFloat(selectedAmount) < 0.01}
                className="w-full bg-primary-600 text-white px-6 py-4 rounded-md font-semibold hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                <Heart className="h-5 w-5" />
                <span>
                  {loading 
                    ? 'Processing...' 
                    : selectedAmount 
                      ? `Donate $${parseFloat(selectedAmount).toFixed(2)}` 
                      : 'Select Amount to Donate'
                  }
                </span>
              </button>
            </form>
          </div>
        </div>

        {/* Additional Information */}
        <div className="mt-12 grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="bg-primary-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
              <CheckCircle className="h-6 w-6 text-primary-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Secure & Safe</h3>
            <p className="text-sm text-gray-600">
              Your donation is processed securely with industry-standard encryption.
            </p>
          </div>
          
          <div className="text-center">
            <div className="bg-primary-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
              <DollarSign className="h-6 w-6 text-primary-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">100% Transparent</h3>
            <p className="text-sm text-gray-600">
              Track your donations and see exactly how your money is being used.
            </p>
          </div>
          
          <div className="text-center">
            <div className="bg-primary-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
              <Heart className="h-6 w-6 text-primary-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Real Impact</h3>
            <p className="text-sm text-gray-600">
              Your generosity directly supports communities and causes in need.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Donate;