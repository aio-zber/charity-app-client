import React, { useState, useEffect } from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Heart, LogOut, User, Home, Info, Mail, Menu, X, Zap, Shield, ChevronDown, Star, Users, Globe } from 'lucide-react';

const Layout: React.FC = () => {
  const { isAuthenticated, userType, logout, user, admin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMobileMenuOpen(false);
  };

  const isActivePath = (path: string) => location.pathname === path;

  const navItems = [
    { path: '/', icon: Home, label: 'Home', description: 'Transform Lives Today' },
    { path: '/about', icon: Info, label: 'Our Mission', description: 'Making Global Impact' },
    { path: '/contact', icon: Mail, label: 'Connect', description: 'Join The Movement' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white relative">
      {/* Enhanced Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-cyan-500/8 rounded-full blur-3xl animate-float"></div>
        <div className="absolute top-1/2 -left-40 w-80 h-80 bg-blue-500/6 rounded-full blur-3xl animate-float stagger-2"></div>
        <div className="absolute -bottom-40 right-1/4 w-72 h-72 bg-purple-500/8 rounded-full blur-3xl animate-float stagger-4"></div>
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-pink-500/6 rounded-full blur-3xl animate-float stagger-6"></div>
        {/* Noise texture overlay */}
        <div className="absolute inset-0 bg-noise opacity-20"></div>
      </div>

      {/* Enhanced Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'glass-dark border-b border-cyan-500/20' : 'bg-transparent border-b border-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20">
            {/* Enhanced Logo */}
            <div className="flex items-center">
              <Link to="/" className="flex items-center space-x-4 group">
                <div className="relative">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center shadow-xl group-hover:shadow-cyan-500/50 transition-all duration-300">
                    <Heart className="h-6 w-6 text-white" />
                  </div>
                  <div className="absolute inset-0 bg-cyan-400/20 rounded-2xl blur-lg group-hover:bg-cyan-400/40 transition-all duration-300"></div>
                  {/* Floating particles */}
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-cyan-400 rounded-full animate-pulse-glow opacity-60"></div>
                  <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-blue-400 rounded-full animate-pulse-glow opacity-40 stagger-2"></div>
                </div>
                <div className="flex flex-col">
                  <span className="text-2xl font-bold gradient-text text-shadow">CharityFlow</span>
                  <span className="text-xs text-slate-400 tracking-wider font-medium">Powering Global Change</span>
                </div>
              </Link>
            </div>

            {/* Enhanced Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              {navItems.map((item, index) => {
                const Icon = item.icon;
                const isActive = isActivePath(item.path);
                
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`group relative px-6 py-3 rounded-2xl text-sm font-semibold transition-all duration-300 ${
                      isActive
                        ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-white border border-cyan-400/30 glow-sm'
                        : 'text-slate-300 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <Icon className={`h-4 w-4 transition-colors duration-300 ${
                        isActive ? 'text-cyan-400' : 'text-slate-400 group-hover:text-cyan-400'
                      }`} />
                      <div className="flex flex-col">
                        <span>{item.label}</span>
                        <span className="text-xs text-slate-500 group-hover:text-slate-400 transition-colors duration-300">
                          {item.description}
                        </span>
                      </div>
                    </div>
                    {!isActive && (
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    )}
                  </Link>
                );
              })}
            </div>

            {/* Auth Section */}
            <div className="hidden lg:flex items-center space-x-4">
              {isAuthenticated ? (
                <div className="flex items-center space-x-4">
                  <div className="glass-dark px-4 py-2 rounded-2xl border border-cyan-500/20">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse-glow"></div>
                      <span className="text-sm font-medium text-slate-200">
                        {user?.username || admin?.username}
                      </span>
                      <div className="text-xs text-slate-400">Online</div>
                    </div>
                  </div>
                  
                  {userType === 'user' && (
                    <>
                      <Link
                        to="/profile"
                        className="btn-ghost px-4 py-2 rounded-2xl text-sm font-medium flex items-center space-x-2"
                      >
                        <User className="h-4 w-4" />
                        <span>Profile</span>
                      </Link>
                      <Link
                        to="/donate"
                        className="btn-primary px-6 py-3 rounded-2xl text-sm font-bold flex items-center space-x-2 shadow-lg"
                      >
                        <Zap className="h-4 w-4" />
                        <span>Donate Now</span>
                      </Link>
                    </>
                  )}

                  {userType === 'admin' && (
                    <Link
                      to="/admin/dashboard"
                      className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-2xl text-sm font-bold hover:from-purple-400 hover:to-pink-400 transition-all duration-300 glow-purple flex items-center space-x-2 shadow-lg"
                    >
                      <Shield className="h-4 w-4" />
                      <span>Admin Panel</span>
                    </Link>
                  )}
                  
                  {/* Profile Dropdown */}
                  <div className="relative">
                    <button
                      onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                      className="btn-ghost p-3 rounded-2xl flex items-center space-x-1"
                    >
                      <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${isProfileDropdownOpen ? 'rotate-180' : ''}`} />
                    </button>
                    
                    {isProfileDropdownOpen && (
                      <div className="absolute right-0 mt-2 w-48 glass-dark border border-cyan-500/20 rounded-2xl shadow-2xl animate-slide-in-down">
                        <div className="p-4 space-y-2">
                          <button
                            onClick={handleLogout}
                            className="w-full btn-ghost px-3 py-2 rounded-xl text-sm font-medium flex items-center space-x-2 text-red-400 hover:text-red-300"
                          >
                            <LogOut className="h-4 w-4" />
                            <span>Sign Out</span>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="flex items-center space-x-3">
                  <Link
                    to="/login"
                    className="btn-ghost px-6 py-3 rounded-2xl text-sm font-medium"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/register"
                    className="btn-primary px-6 py-3 rounded-2xl text-sm font-bold"
                  >
                    Get Started
                  </Link>
                </div>
              )}
            </div>

            {/* Enhanced Mobile Menu Button */}
            <div className="lg:hidden flex items-center">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="btn-ghost p-3 rounded-2xl text-cyan-300 relative"
              >
                <div className={`transition-all duration-300 ${isMobileMenuOpen ? 'rotate-90' : ''}`}>
                  {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Enhanced Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden glass-dark border-t border-cyan-500/20 animate-slide-in-down backdrop-blur-strong">
            <div className="px-6 py-8 space-y-6">
              {/* Navigation Items */}
              <div className="space-y-3">
                {navItems.map((item, index) => {
                  const Icon = item.icon;
                  const isActive = isActivePath(item.path);
                  
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`card w-full p-4 rounded-2xl text-sm font-semibold flex items-center space-x-4 transition-all duration-300 animate-slide-in-right stagger-${index + 1} ${
                        isActive
                          ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border-cyan-400/30 text-white glow-sm'
                          : 'text-slate-300 hover:text-white card-hover'
                      }`}
                    >
                      <Icon className={`h-5 w-5 ${isActive ? 'text-cyan-400' : 'text-slate-400'}`} />
                      <div className="flex flex-col">
                        <span>{item.label}</span>
                        <span className="text-xs text-slate-500">{item.description}</span>
                      </div>
                    </Link>
                  );
                })}
              </div>
              
              {/* Auth Section */}
              {isAuthenticated ? (
                <div className="space-y-3 pt-6 border-t border-cyan-500/20">
                  {userType === 'user' && (
                    <>
                      <Link
                        to="/profile"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="card w-full p-4 rounded-2xl text-sm font-medium flex items-center space-x-4 text-slate-300 card-hover"
                      >
                        <User className="h-5 w-5 text-slate-400" />
                        <span>Profile</span>
                      </Link>
                      <Link
                        to="/donate"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="btn-primary w-full p-4 rounded-2xl text-sm font-bold flex items-center space-x-4 justify-center"
                      >
                        <Zap className="h-5 w-5" />
                        <span>Donate Now</span>
                      </Link>
                    </>
                  )}
                  <button
                    onClick={handleLogout}
                    className="card w-full p-4 rounded-2xl text-sm font-medium flex items-center space-x-4 text-red-400 hover:text-red-300 card-hover"
                  >
                    <LogOut className="h-5 w-5" />
                    <span>Sign Out</span>
                  </button>
                </div>
              ) : (
                <div className="space-y-3 pt-6 border-t border-cyan-500/20">
                  <Link
                    to="/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="btn-ghost w-full p-4 rounded-2xl text-sm font-medium flex items-center justify-center"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="btn-primary w-full p-4 rounded-2xl text-sm font-bold flex items-center justify-center"
                  >
                    Get Started
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* Enhanced Main Content */}
      <main className="relative z-10 flex-1 pt-20">
        <div className="min-h-screen">
          <Outlet />
        </div>
      </main>

      {/* Futuristic Footer */}
      <footer className="relative z-10 glass-dark border-t border-cyan-500/20 mt-20">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Logo & Description */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Heart className="h-8 w-8 text-cyan-400 animate-pulse-neon" />
                <span className="text-xl font-bold gradient-text">CharityFlow</span>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                The future of charitable giving. Powered by technology, driven by compassion, 
                creating a better tomorrow for everyone.
              </p>
              <div className="flex space-x-4">
                <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse-neon"></div>
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse-neon" style={{ animationDelay: '0.5s' }}></div>
                <div className="w-2 h-2 bg-pink-400 rounded-full animate-pulse-neon" style={{ animationDelay: '1s' }}></div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-cyan-300">Quick Access</h3>
              <div className="space-y-2">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className="block text-gray-400 hover:text-cyan-300 text-sm transition-colors duration-300"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* System Status */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-cyan-300">System Status</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse-neon"></div>
                  <span className="text-sm text-gray-400">Platform Online</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse-neon"></div>
                  <span className="text-sm text-gray-400">Secure Transactions</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-cyan-400 rounded-full animate-pulse-neon"></div>
                  <span className="text-sm text-gray-400">Global Network Active</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-cyan-500/20 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <div className="text-sm text-gray-400">
              © 2024 CharityApp. Making a difference across dimensions.
            </div>
            <div className="flex items-center space-x-2 mt-4 md:mt-0">
              <span className="text-xs text-gray-500">Powered by</span>
              <span className="text-xs gradient-text font-semibold">Future Tech</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;