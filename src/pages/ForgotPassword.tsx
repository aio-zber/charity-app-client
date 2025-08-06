import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ArrowLeft, Mail, CheckCircle, Sparkles, Shield } from 'lucide-react';

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Simulate password reset request
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
    }, 1000);
  };

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
              <span className="gradient-text-accent text-shadow">Check Your Inbox</span>
            </h2>
            <div className="card p-6 rounded-2xl border border-green-500/20 bg-gradient-to-r from-green-500/10 to-emerald-500/10 mb-8">
              <div className="flex items-start space-x-3">
                <Mail className="h-6 w-6 text-green-400 mt-1" />
                <div className="text-left">
                  <div className="text-green-300 font-semibold mb-2">Neural Recovery Initiated</div>
                  <p className="text-green-200 text-sm leading-relaxed">
                    If an account with that email exists in the CharityFlow network, we've transmitted a secure recovery link to your inbox.
                  </p>
                </div>
              </div>
            </div>
            <Link
              to="/login"
              className="btn-ghost px-8 py-3 rounded-2xl font-medium flex items-center justify-center space-x-3 group"
            >
              <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform duration-300" />
              <span>Return to Portal</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

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
                <Heart className="h-8 w-8 text-white" />
              </div>
            </div>
            <h2 className="text-4xl font-black mb-4">
              <span className="gradient-text text-shadow">Neural Recovery</span>
            </h2>
            <p className="text-slate-300 leading-relaxed">
              Enter your registered email to initiate secure neural key recovery protocols.
            </p>
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
            
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-slate-300 mb-3">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 glass-dark border border-cyan-500/20 rounded-2xl text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400 focus:ring-0 transition-all duration-300"
                  placeholder="your.email@domain.com"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full py-4 rounded-2xl font-bold flex items-center justify-center space-x-3 disabled:opacity-50 disabled:cursor-not-allowed group"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Transmitting Recovery...</span>
                </>
              ) : (
                <>
                  <Shield className="h-5 w-5 group-hover:animate-pulse-glow" />
                  <span>Send Recovery Link</span>
                  <Sparkles className="h-5 w-5 group-hover:animate-bounce-gentle" />
                </>
              )}
            </button>

            <div className="text-center pt-4">
              <Link
                to="/login"
                className="btn-ghost px-6 py-3 rounded-2xl font-medium flex items-center justify-center space-x-3 group"
              >
                <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform duration-300" />
                <span>Back to Portal</span>
              </Link>
            </div>
          </form>
          
          {/* Security Notice */}
          <div className="card p-4 rounded-2xl border border-blue-500/20 bg-gradient-to-r from-blue-500/5 to-cyan-500/5 mt-6">
            <div className="flex items-start space-x-3">
              <Shield className="h-5 w-5 text-blue-400 mt-0.5" />
              <div>
                <div className="text-blue-300 text-sm font-semibold mb-1">Secure Recovery Protocol</div>
                <div className="text-blue-400/80 text-xs">
                  Recovery links expire in 15 minutes and can only be used once for maximum security.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;