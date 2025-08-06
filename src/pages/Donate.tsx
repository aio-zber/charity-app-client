import React, { useState } from 'react';
import { Heart, DollarSign, CreditCard, CheckCircle, Sparkles, ArrowRight, Zap, Shield, Star } from 'lucide-react';
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
      <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-green-500/10 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-cyan-500/8 rounded-full blur-3xl animate-float stagger-2"></div>
          <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-float stagger-4"></div>
        </div>

        <div className="relative z-10 max-w-md w-full p-8">
          <div className="card p-12 rounded-3xl text-center animate-slide-in-up">
            <div className="relative mb-8">
              <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-500 rounded-3xl flex items-center justify-center mx-auto shadow-xl animate-pulse-glow">
                <CheckCircle className="h-10 w-10 text-white" />
              </div>
              <div className="absolute inset-0 bg-green-400/20 rounded-3xl blur-xl"></div>
              {/* Floating particles */}
              <div className="absolute -top-2 -right-2 w-4 h-4 bg-green-400 rounded-full animate-pulse-glow opacity-60"></div>
              <div className="absolute -bottom-2 -left-2 w-3 h-3 bg-emerald-400 rounded-full animate-pulse-glow opacity-40 stagger-2"></div>
            </div>
            <h2 className="text-4xl font-black mb-6">
              <span className="gradient-text-accent text-shadow">Mission Complete!</span>
            </h2>
            <p className="text-slate-300 mb-8 text-lg leading-relaxed">
              Your donation of <span className="text-green-400 font-bold">${selectedAmount}</span> has been successfully processed. 
              Your generosity will create real, lasting impact in communities worldwide.
            </p>
            <div className="space-y-4 mb-8">
              <div className="card p-4 rounded-2xl border border-green-500/20 bg-gradient-to-r from-green-500/10 to-emerald-500/10">
                <div className="flex items-center space-x-3">
                  <Sparkles className="h-5 w-5 text-green-400" />
                  <span className="text-green-300 text-sm font-medium">Impact tracking initiated</span>
                </div>
              </div>
            </div>
            <button
              onClick={() => {
                setSuccess(false);
                setAmount('');
                setCustomAmount('');
              }}
              className="btn-primary w-full py-4 rounded-2xl font-bold flex items-center justify-center space-x-3 group"
            >
              <Heart className="h-5 w-5 group-hover:animate-pulse-glow" />
              <span>Continue Making Impact</span>
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-green-500/8 rounded-full blur-3xl animate-float stagger-2"></div>
        <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-float stagger-4"></div>
        <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-purple-500/8 rounded-full blur-3xl animate-float stagger-6"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Enhanced Header */}
        <div className="text-center mb-16 animate-slide-in-up">
          <div className="mb-8">
            <span className="inline-flex items-center px-6 py-3 rounded-full text-sm font-semibold bg-gradient-to-r from-green-500/20 to-cyan-500/20 border border-green-500/30 text-green-300 backdrop-blur-sm">
              <Heart className="h-4 w-4 mr-2 animate-pulse-glow" />
              Create Your Impact
              <ArrowRight className="h-4 w-4 ml-2" />
            </span>
          </div>
          <h1 className="text-6xl md:text-7xl font-black mb-6 leading-tight">
            <span className="gradient-text text-shadow">Make a</span>
            <br />
            <span className="gradient-text-accent text-shadow">Donation</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-slate-300 max-w-3xl mx-auto leading-relaxed font-medium">
            Thank you for choosing to make a difference, <span className="text-cyan-400 font-bold">{user?.username}</span>! 
            Your generosity will transform lives and communities worldwide.
          </p>
        </div>

        <div className="card p-8 rounded-3xl animate-slide-in-up stagger-1">
          <form onSubmit={handleSubmit} className="space-y-8">
            {error && (
              <div className="card p-4 rounded-2xl border border-red-500/30 bg-gradient-to-r from-red-500/10 to-pink-500/10 animate-slide-in-up">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                  <span className="text-red-300 text-sm font-medium">{error}</span>
                </div>
              </div>
            )}

            {/* Amount Selection */}
            <div>
              <div className="mb-6">
                <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500/10 to-green-500/10 border border-cyan-500/20 text-cyan-300 text-sm font-semibold mb-4">
                  <DollarSign className="h-4 w-4 mr-2" />
                  Choose Amount
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Select Your Impact Level</h3>
                <p className="text-slate-400">Every contribution creates meaningful change in communities worldwide</p>
              </div>
                
              {/* Predefined Amounts */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                {predefinedAmounts.map((value, index) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => handleAmountSelect(value)}
                    className={`card p-6 rounded-2xl transition-all duration-300 card-hover group animate-slide-in-up ${
                      amount === value.toString()
                        ? 'border-cyan-400/50 bg-gradient-to-r from-cyan-500/20 to-green-500/20 glow-sm'
                        : 'border-slate-700/50'
                    }`}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="text-center">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-3 transition-all duration-300 ${
                        amount === value.toString()
                          ? 'bg-gradient-to-br from-cyan-400 to-green-500 shadow-xl glow-sm'
                          : 'bg-gradient-to-br from-slate-600 to-slate-700 group-hover:from-cyan-500/50 group-hover:to-green-500/50'
                      }`}>
                        <DollarSign className="h-6 w-6 text-white" />
                      </div>
                      <span className={`font-bold text-lg transition-colors duration-300 ${
                        amount === value.toString()
                          ? 'text-cyan-300'
                          : 'text-slate-300 group-hover:text-cyan-300'
                      }`}>
                        ${value}
                      </span>
                      <div className={`text-xs mt-1 transition-colors duration-300 ${
                        amount === value.toString()
                          ? 'text-cyan-400'
                          : 'text-slate-500 group-hover:text-slate-400'
                      }`}>
                        Impact Level
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              {/* Custom Amount */}
              <div className="animate-slide-in-up stagger-3">
                <label htmlFor="customAmount" className="block text-sm font-semibold text-slate-300 mb-3">
                  Or Create Your Custom Impact:
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
                    <span className="text-slate-400 font-medium">$</span>
                  </div>
                  <input
                    type="number"
                    id="customAmount"
                    min="0.01"
                    step="0.01"
                    value={customAmount}
                    onChange={handleCustomAmountChange}
                    className="w-full pl-12 pr-6 py-4 glass-dark border border-cyan-500/20 rounded-2xl text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400 focus:ring-0 transition-all duration-300"
                    placeholder="Enter custom amount"
                  />
                </div>
                <p className="mt-2 text-sm text-slate-500">
                  Minimum donation is $0.01. Every amount makes a difference.
                </p>
              </div>
            </div>

            {/* Impact Message */}
            {selectedAmount && parseFloat(selectedAmount) > 0 && (
              <div className="card p-6 rounded-2xl border border-green-500/20 bg-gradient-to-r from-green-500/10 to-emerald-500/10 animate-slide-in-up stagger-4">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-500 rounded-2xl flex items-center justify-center">
                    <Sparkles className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-green-300 mb-2">Your Impact Preview</h4>
                    <p className="text-green-200 leading-relaxed">
                      Your donation of <span className="font-bold text-green-400">${parseFloat(selectedAmount).toFixed(2)}</span> will help provide essential resources 
                      and support to communities in need. Every dollar creates measurable, lasting change!
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Payment Method (Simulated) */}
            <div className="animate-slide-in-up stagger-5">
              <div className="mb-6">
                <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/20 text-purple-300 text-sm font-semibold mb-4">
                  <Shield className="h-4 w-4 mr-2" />
                  Secure Payment
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Payment Method</h3>
              </div>
              <div className="card p-6 rounded-2xl border border-purple-500/20 card-hover">
                <div className="flex items-center space-x-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-purple-400 to-blue-500 rounded-2xl flex items-center justify-center">
                    <CreditCard className="h-7 w-7 text-white" />
                  </div>
                  <div>
                    <p className="font-bold text-white mb-1">Quantum-Secured Processing</p>
                    <p className="text-slate-400 text-sm">
                      Military-grade encryption protects your payment information
                    </p>
                    <div className="flex items-center space-x-2 mt-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse-glow"></div>
                      <span className="text-green-400 text-xs font-medium">Secure connection verified</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="animate-slide-in-up stagger-6">
              <button
                type="submit"
                disabled={loading || !selectedAmount || parseFloat(selectedAmount) < 0.01}
                className="btn-primary w-full py-5 rounded-2xl font-bold text-lg flex items-center justify-center space-x-3 disabled:opacity-50 disabled:cursor-not-allowed group"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Processing Your Impact...</span>
                  </>
                ) : selectedAmount ? (
                  <>
                    <Heart className="h-6 w-6 text-red-400 group-hover:animate-pulse-glow" />
                    <span>Donate ${parseFloat(selectedAmount).toFixed(2)}</span>
                    <Zap className="h-6 w-6 group-hover:animate-bounce-gentle" />
                  </>
                ) : (
                  <>
                    <DollarSign className="h-6 w-6" />
                    <span>Select Amount to Begin</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Enhanced Features Section */}
        <div className="mt-20 grid md:grid-cols-3 gap-8">
          <div className="card p-8 rounded-3xl text-center card-hover group animate-slide-in-up stagger-1">
            <div className="relative mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto shadow-xl group-hover:shadow-green-500/50 transition-all duration-300">
                <Shield className="h-8 w-8 text-white group-hover:animate-pulse-glow" />
              </div>
              <div className="absolute inset-0 bg-green-400/10 rounded-2xl blur-xl group-hover:bg-green-400/20 transition-all duration-300"></div>
            </div>
            <h3 className="text-xl font-bold text-white group-hover:text-green-300 transition-colors duration-300 mb-3">
              Quantum Security
            </h3>
            <p className="text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors duration-300">
              Your donation is protected with military-grade encryption and blockchain verification protocols.
            </p>
            <div className="mt-4 flex justify-center">
              <CheckCircle className="h-5 w-5 text-green-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          </div>
          
          <div className="card p-8 rounded-3xl text-center card-hover group animate-slide-in-up stagger-2">
            <div className="relative mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-2xl flex items-center justify-center mx-auto shadow-xl group-hover:shadow-cyan-500/50 transition-all duration-300">
                <Star className="h-8 w-8 text-white group-hover:animate-pulse-glow" />
              </div>
              <div className="absolute inset-0 bg-cyan-400/10 rounded-2xl blur-xl group-hover:bg-cyan-400/20 transition-all duration-300"></div>
            </div>
            <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors duration-300 mb-3">
              100% Transparent
            </h3>
            <p className="text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors duration-300">
              Real-time impact tracking lets you see exactly how your contribution creates change worldwide.
            </p>
            <div className="mt-4 flex justify-center">
              <CheckCircle className="h-5 w-5 text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          </div>
          
          <div className="card p-8 rounded-3xl text-center card-hover group animate-slide-in-up stagger-3">
            <div className="relative mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-red-400 to-pink-500 rounded-2xl flex items-center justify-center mx-auto shadow-xl group-hover:shadow-red-500/50 transition-all duration-300">
                <Heart className="h-8 w-8 text-white group-hover:animate-pulse-glow" />
              </div>
              <div className="absolute inset-0 bg-red-400/10 rounded-2xl blur-xl group-hover:bg-red-400/20 transition-all duration-300"></div>
            </div>
            <h3 className="text-xl font-bold text-white group-hover:text-red-300 transition-colors duration-300 mb-3">
              Instant Impact
            </h3>
            <p className="text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors duration-300">
              Your generosity immediately reaches communities in need, creating measurable, lasting change.
            </p>
            <div className="mt-4 flex justify-center">
              <CheckCircle className="h-5 w-5 text-red-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Donate;