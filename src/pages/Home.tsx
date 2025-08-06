import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Users, Target, Award, Zap, Globe, Shield, TrendingUp, Sparkles, ArrowRight, PlayCircle, CheckCircle, Star } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Home: React.FC = () => {
  const { isAuthenticated, userType } = useAuth();

  return (
    <div className="min-h-screen">
      {/* Enhanced Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Dynamic animated background */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-float"></div>
          <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-blue-500/8 rounded-full blur-3xl animate-float stagger-2"></div>
          <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-float stagger-4"></div>
          <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-pink-500/8 rounded-full blur-3xl animate-float stagger-6"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            {/* Announcement Badge */}
            <div className="mb-8 animate-slide-in-down">
              <span className="inline-flex items-center px-6 py-3 rounded-full text-sm font-semibold bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 text-cyan-300 backdrop-blur-sm">
                <Sparkles className="h-4 w-4 mr-2 animate-pulse-glow" />
                Revolutionizing Global Impact
                <ArrowRight className="h-4 w-4 ml-2" />
              </span>
            </div>
            
            {/* Main Headline */}
            <div className="animate-slide-in-up stagger-1">
              <h1 className="text-6xl md:text-8xl font-black mb-6 leading-tight">
                <span className="gradient-text text-shadow">Create</span>
                <br />
                <span className="text-white text-shadow">Meaningful</span>
                <br />
                <span className="gradient-text-secondary text-shadow">Impact</span>
              </h1>
            </div>
            
            {/* Subtitle */}
            <div className="animate-slide-in-up stagger-2">
              <p className="text-xl md:text-2xl mb-12 text-slate-300 max-w-4xl mx-auto leading-relaxed font-medium">
                Join thousands of changemakers using innovative technology to transform lives, 
                communities, and create lasting positive change worldwide
              </p>
            </div>
            
            {/* CTA Buttons */}
            <div className="animate-slide-in-up stagger-3">
              {!isAuthenticated ? (
                <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
                  <Link
                    to="/register"
                    className="btn-primary px-12 py-5 rounded-3xl font-bold text-lg flex items-center space-x-3 shadow-2xl group"
                  >
                    <Zap className="h-5 w-5 group-hover:animate-bounce-gentle" />
                    <span>Start Your Journey</span>
                    <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <Link
                    to="/login"
                    className="btn-secondary px-12 py-5 rounded-3xl font-bold text-lg flex items-center space-x-3"
                  >
                    <PlayCircle className="h-5 w-5" />
                    <span>Watch Demo</span>
                  </Link>
                </div>
              ) : userType === 'user' ? (
                <div className="mb-16">
                  <Link
                    to="/donate"
                    className="btn-primary px-16 py-6 rounded-3xl font-bold text-xl flex items-center space-x-4 shadow-2xl mx-auto max-w-fit group"
                  >
                    <Heart className="h-6 w-6 text-red-400 group-hover:animate-pulse-glow" />
                    <span>Make a Donation</span>
                    <Sparkles className="h-6 w-6 group-hover:animate-bounce-gentle" />
                  </Link>
                </div>
              ) : (
                <div className="mb-16">
                  <Link
                    to="/admin/dashboard"
                    className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-16 py-6 rounded-3xl font-bold text-xl hover:from-purple-400 hover:to-pink-400 transition-all duration-300 glow-purple flex items-center space-x-4 shadow-2xl mx-auto max-w-fit group"
                  >
                    <Shield className="h-6 w-6 group-hover:animate-pulse-glow" />
                    <span>Admin Dashboard</span>
                  </Link>
                </div>
              )}
            </div>

            {/* Enhanced Impact Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 animate-slide-in-up stagger-4">
              <div className="card p-8 rounded-3xl text-center card-hover">
                <div className="text-5xl font-black gradient-text mb-3">50K+</div>
                <div className="text-slate-400 font-medium">Lives Transformed</div>
                <div className="flex items-center justify-center mt-4">
                  <div className="w-12 h-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"></div>
                </div>
              </div>
              <div className="card p-8 rounded-3xl text-center card-hover animate-fade-in-scale stagger-2">
                <div className="text-5xl font-black gradient-text-secondary mb-3">500+</div>
                <div className="text-slate-400 font-medium">Global Partners</div>
                <div className="flex items-center justify-center mt-4">
                  <div className="w-12 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
                </div>
              </div>
              <div className="card p-8 rounded-3xl text-center card-hover animate-fade-in-scale stagger-4">
                <div className="text-5xl font-black gradient-text-accent mb-3">25+</div>
                <div className="text-slate-400 font-medium">Impact Areas</div>
                <div className="flex items-center justify-center mt-4">
                  <div className="w-12 h-1 bg-gradient-to-r from-green-500 to-cyan-500 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-32 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20 animate-slide-in-up">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 text-cyan-300 text-sm font-semibold mb-6">
              <Star className="h-4 w-4 mr-2" />
              Platform Features
            </div>
            <h2 className="text-5xl md:text-6xl font-black mb-6">
              <span className="gradient-text text-shadow">Why Choose</span>
              <br />
              <span className="text-white text-shadow">CharityFlow</span>
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
              Experience the future of charitable giving with cutting-edge technology, 
              unmatched transparency, and global impact measurement
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="card p-8 rounded-3xl text-center card-hover group animate-slide-in-up stagger-1">
              <div className="relative mb-8">
                <div className="w-20 h-20 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-3xl flex items-center justify-center mx-auto shadow-xl group-hover:shadow-cyan-500/50 transition-all duration-300">
                  <Heart className="h-10 w-10 text-white group-hover:animate-pulse-glow" />
                </div>
                <div className="absolute inset-0 bg-cyan-400/10 rounded-3xl blur-xl group-hover:bg-cyan-400/20 transition-all duration-300"></div>
              </div>
              <h3 className="text-xl font-bold mb-4 text-white group-hover:text-cyan-300 transition-colors duration-300">
                Instant Impact
              </h3>
              <p className="text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors duration-300">
                Lightning-fast donations with real-time impact tracking and immediate confirmation
              </p>
              <div className="mt-6 flex justify-center">
                <CheckCircle className="h-5 w-5 text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </div>
            
            <div className="card p-8 rounded-3xl text-center card-hover group animate-slide-in-up stagger-2">
              <div className="relative mb-8">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-400 to-indigo-500 rounded-3xl flex items-center justify-center mx-auto shadow-xl group-hover:shadow-purple-500/50 transition-all duration-300">
                  <Users className="h-10 w-10 text-white group-hover:animate-pulse-glow" />
                </div>
                <div className="absolute inset-0 bg-purple-400/10 rounded-3xl blur-xl group-hover:bg-purple-400/20 transition-all duration-300"></div>
              </div>
              <h3 className="text-xl font-bold mb-4 text-white group-hover:text-purple-300 transition-colors duration-300">
                Global Community
              </h3>
              <p className="text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors duration-300">
                Connect with millions of changemakers worldwide and amplify your positive impact
              </p>
              <div className="mt-6 flex justify-center">
                <CheckCircle className="h-5 w-5 text-purple-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </div>
            
            <div className="glass-dark p-8 rounded-2xl border border-pink-500/30 text-center card-hover animate-fade-in-scale" style={{ animationDelay: '0.2s' }}>
              <div className="relative mb-6">
                <div className="w-20 h-20 bg-gradient-to-r from-pink-500/20 to-rose-500/20 rounded-2xl flex items-center justify-center mx-auto border border-pink-500/30">
                  <Target className="h-10 w-10 text-pink-400 animate-pulse-neon" />
                </div>
                <div className="absolute inset-0 bg-pink-400/10 rounded-2xl blur-xl"></div>
              </div>
              <h3 className="text-xl font-bold mb-4 text-pink-300">Hyper Transparency</h3>
              <p className="text-gray-400 leading-relaxed">
                Real-time impact tracking with blockchain-verified transparency protocols
              </p>
            </div>
            
            <div className="glass-dark p-8 rounded-2xl border border-emerald-500/30 text-center card-hover animate-fade-in-scale" style={{ animationDelay: '0.3s' }}>
              <div className="relative mb-6">
                <div className="w-20 h-20 bg-gradient-to-r from-emerald-500/20 to-green-500/20 rounded-2xl flex items-center justify-center mx-auto border border-emerald-500/30">
                  <Award className="h-10 w-10 text-emerald-400 animate-pulse-neon" />
                </div>
                <div className="absolute inset-0 bg-emerald-400/10 rounded-2xl blur-xl"></div>
              </div>
              <h3 className="text-xl font-bold mb-4 text-emerald-300">Quantum Security</h3>
              <p className="text-gray-400 leading-relaxed">
                Military-grade protection trusted by millions across the metaverse
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Visualization */}
      <section className="py-32 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-purple-500/5"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="gradient-text">Global Impact Matrix</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Real-time visualization of our collective impact across the globe
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="glass-dark p-8 rounded-2xl border border-cyan-500/30 text-center card-hover">
              <div className="flex items-center justify-center mb-4">
                <Globe className="h-12 w-12 text-cyan-400 animate-pulse-neon" />
              </div>
              <div className="text-5xl font-bold gradient-text mb-4">$50K+</div>
              <div className="text-gray-300 text-lg mb-2">Total Impact Deployed</div>
              <div className="text-sm text-cyan-400">+15.3% this quantum cycle</div>
              <div className="w-full bg-gray-700 rounded-full h-2 mt-4">
                <div className="bg-gradient-to-r from-cyan-500 to-blue-500 h-2 rounded-full w-3/4 animate-pulse-neon"></div>
              </div>
            </div>
            
            <div className="glass-dark p-8 rounded-2xl border border-purple-500/30 text-center card-hover">
              <div className="flex items-center justify-center mb-4">
                <TrendingUp className="h-12 w-12 text-purple-400 animate-pulse-neon" />
              </div>
              <div className="text-5xl font-bold gradient-text mb-4">500+</div>
              <div className="text-gray-300 text-lg mb-2">Active Change Agents</div>
              <div className="text-sm text-purple-400">+28.7% this cycle</div>
              <div className="w-full bg-gray-700 rounded-full h-2 mt-4">
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full w-4/5 animate-pulse-neon"></div>
              </div>
            </div>
            
            <div className="glass-dark p-8 rounded-2xl border border-pink-500/30 text-center card-hover">
              <div className="flex items-center justify-center mb-4">
                <Sparkles className="h-12 w-12 text-pink-400 animate-pulse-neon" />
              </div>
              <div className="text-5xl font-bold gradient-text mb-4">25+</div>
              <div className="text-gray-300 text-lg mb-2">Mission Sectors</div>
              <div className="text-sm text-pink-400">+8 new sectors online</div>
              <div className="w-full bg-gray-700 rounded-full h-2 mt-4">
                <div className="bg-gradient-to-r from-pink-500 to-rose-500 h-2 rounded-full w-2/3 animate-pulse-neon"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900"></div>
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 -left-20 w-64 h-64 bg-cyan-500/20 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-8">
            <span className="gradient-text">Ready to Reshape Reality?</span>
          </h2>
          <p className="text-xl md:text-2xl mb-12 text-gray-300 leading-relaxed">
            Join the quantum revolution of giving and become part of the most advanced 
            charitable network in the multiverse
          </p>
          
          {!isAuthenticated && (
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link
                to="/register"
                className="group bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-12 py-5 rounded-2xl font-bold text-xl hover:from-cyan-400 hover:to-purple-500 transition-all duration-300 neon-glow transform hover:scale-105 flex items-center space-x-3"
              >
                <Zap className="h-6 w-6" />
                <span>ACTIVATE PROTOCOL</span>
                <Sparkles className="h-6 w-6 animate-pulse-neon" />
              </Link>
              <div className="text-sm text-gray-400">
                <span className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse-neon"></div>
                  <span>Quantum systems online</span>
                </span>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;