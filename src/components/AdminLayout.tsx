import React, { useState } from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { 
  Shield, 
  LogOut, 
  LayoutDashboard, 
  Users, 
  DollarSign, 
  UserPlus, 
  Settings,
  Menu,
  X,
  Activity,
  Zap,
  Home,
  ChevronDown
} from 'lucide-react';

const AdminLayout: React.FC = () => {
  const { logout, admin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const isActivePath = (path: string) => {
    return location.pathname === path;
  };

  const navItems = [
    { path: '/admin/dashboard', icon: LayoutDashboard, label: 'Command Center', description: 'System Overview' },
    { path: '/admin/users', icon: Users, label: 'User Matrix', description: 'Agent Management' },
    { path: '/admin/donations', icon: DollarSign, label: 'Impact Flow', description: 'Resource Tracking' },
    { path: '/admin/admins', icon: Settings, label: 'Core Access', description: 'Admin Control' },
  ];

  const quickActions = [
    { path: '/admin/add-user', icon: UserPlus, label: 'Deploy Agent', color: 'cyan' },
    { path: '/admin/add-donation', icon: Zap, label: 'Log Impact', color: 'purple' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse-neon"></div>
        <div className="absolute top-1/2 -left-40 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute -bottom-40 right-1/3 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl animate-pulse-neon" style={{ animationDelay: '1s' }}></div>
      </div>

      {/* Enhanced Admin Header */}
      <header className="relative z-50 glass-dark border-b border-purple-500/20 backdrop-blur-md">
        <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Left Section - Logo & Toggle */}
            <div className="flex items-center space-x-6">
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="cyber-button p-3 rounded-xl text-purple-300 lg:hidden"
              >
                {isSidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
              
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Shield className="h-10 w-10 text-purple-400 animate-pulse-neon" />
                  <div className="absolute inset-0 bg-purple-400/20 rounded-full blur-lg"></div>
                </div>
                <div className="flex flex-col">
                  <span className="text-2xl font-bold gradient-text">ADMIN NEXUS</span>
                  <span className="text-xs text-purple-400/70 tracking-wider">QUANTUM CONTROL SYSTEM</span>
                </div>
              </div>
            </div>

            {/* Center Section - System Status */}
            <div className="hidden md:flex items-center space-x-6">
              <div className="glass px-4 py-2 rounded-xl border border-green-500/30">
                <div className="flex items-center space-x-2">
                  <Activity className="h-4 w-4 text-green-400 animate-pulse-neon" />
                  <span className="text-sm text-green-300">Systems Online</span>
                </div>
              </div>
              <div className="glass px-4 py-2 rounded-xl border border-cyan-500/30">
                <div className="flex items-center space-x-2">
                  <Zap className="h-4 w-4 text-cyan-400 animate-pulse-neon" />
                  <span className="text-sm text-cyan-300">Neural Link Active</span>
                </div>
              </div>
            </div>
            
            {/* Right Section - Admin Profile */}
            <div className="flex items-center space-x-4">
              <div className="relative">
                <button
                  onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                  className="glass px-4 py-2 rounded-xl border border-purple-500/30 flex items-center space-x-3 hover:border-purple-400/50 transition-all duration-300"
                >
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse-neon"></div>
                    <span className="text-sm text-purple-300 font-medium">
                      {admin?.username}
                    </span>
                  </div>
                  <ChevronDown className={`h-4 w-4 text-purple-400 transition-transform duration-300 ${isProfileDropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {/* Profile Dropdown */}
                {isProfileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-64 glass-dark border border-purple-500/30 rounded-2xl shadow-2xl animate-slide-in-up">
                    <div className="p-4">
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl flex items-center justify-center border border-purple-500/30">
                          <Shield className="h-6 w-6 text-purple-400" />
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-purple-300">{admin?.username}</div>
                          <div className="text-xs text-gray-400">System Administrator</div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Link
                          to="/"
                          className="cyber-button w-full px-3 py-2 rounded-xl text-sm font-medium flex items-center space-x-2 text-gray-300 hover:text-cyan-300"
                        >
                          <Home className="h-4 w-4" />
                          <span>User Portal</span>
                        </Link>
                        <button
                          onClick={handleLogout}
                          className="cyber-button w-full px-3 py-2 rounded-xl text-sm font-medium flex items-center space-x-2 text-gray-300 hover:text-red-400 hover:border-red-400/50"
                        >
                          <LogOut className="h-4 w-4" />
                          <span>Disconnect</span>
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex relative">
        {/* Enhanced Sidebar Navigation */}
        <nav className={`fixed lg:relative z-40 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'} w-80 glass-dark border-r border-purple-500/20 min-h-screen transition-transform duration-300 ease-in-out`}>
          <div className="p-6">
            {/* Quick Actions */}
            <div className="mb-8">
              <h3 className="text-xs font-semibold text-purple-400 uppercase tracking-wider mb-4">Quick Deploy</h3>
              <div className="grid grid-cols-2 gap-3">
                {quickActions.map((action) => {
                  const Icon = action.icon;
                  return (
                    <Link
                      key={action.path}
                      to={action.path}
                      className={`glass p-4 rounded-xl border ${
                        action.color === 'cyan' 
                          ? 'border-cyan-500/30 hover:border-cyan-400/50' 
                          : 'border-purple-500/30 hover:border-purple-400/50'
                      } text-center card-hover transition-all duration-300`}
                    >
                      <Icon className={`h-6 w-6 mx-auto mb-2 ${
                        action.color === 'cyan' ? 'text-cyan-400' : 'text-purple-400'
                      } animate-pulse-neon`} />
                      <div className="text-xs font-medium text-gray-300">{action.label}</div>
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Main Navigation */}
            <div className="space-y-3">
              <h3 className="text-xs font-semibold text-purple-400 uppercase tracking-wider mb-4">Control Modules</h3>
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = isActivePath(item.path);
                
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsSidebarOpen(false)}
                    className={`group flex flex-col p-4 rounded-xl transition-all duration-300 ${
                      isActive
                        ? 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-400/50 neon-glow-sm'
                        : 'glass border border-purple-500/20 hover:border-purple-400/40 card-hover'
                    }`}
                  >
                    <div className="flex items-center space-x-3 mb-2">
                      <Icon className={`h-6 w-6 ${
                        isActive ? 'text-purple-300 animate-pulse-neon' : 'text-gray-400 group-hover:text-purple-400'
                      } transition-colors duration-300`} />
                      <span className={`font-semibold ${
                        isActive ? 'text-purple-200' : 'text-gray-300 group-hover:text-purple-300'
                      } transition-colors duration-300`}>
                        {item.label}
                      </span>
                    </div>
                    <div className={`text-xs ${
                      isActive ? 'text-purple-400' : 'text-gray-500 group-hover:text-purple-500'
                    } transition-colors duration-300 ml-9`}>
                      {item.description}
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
          
          {/* System Info Footer */}
          <div className="absolute bottom-6 left-6 right-6">
            <div className="glass p-4 rounded-xl border border-purple-500/20">
              <div className="text-xs text-purple-400 mb-2">System Status</div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-400">Neural Network</span>
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse-neon"></div>
                    <span className="text-green-400">Online</span>
                  </div>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-400">Quantum Cores</span>
                  <span className="text-cyan-400">8/8 Active</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-400">Security Level</span>
                  <span className="text-purple-400">Maximum</span>
                </div>
              </div>
            </div>
          </div>
        </nav>

        {/* Overlay for mobile */}
        {isSidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/50 z-30 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          ></div>
        )}

        {/* Main Content Area */}
        <main className="flex-1 relative z-10 min-h-screen">
          <div className="p-6 lg:p-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;