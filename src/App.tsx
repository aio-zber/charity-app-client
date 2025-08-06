
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Layout from './components/Layout';
import AdminLayout from './components/AdminLayout';
import ProtectedRoute from './components/ProtectedRoute';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import AdminLogin from './pages/AdminLogin';
import Register from './pages/Register';
import About from './pages/About';
import Contact from './pages/Contact';
import Profile from './pages/Profile';
import Donate from './pages/Donate';
import ForgotPassword from './pages/ForgotPassword';

// Admin Pages
import AdminDashboard from './pages/admin/Dashboard';
import UserManagement from './pages/admin/UserManagement';
import DonationsManagement from './pages/admin/DonationsManagement';
import AdminManagement from './pages/admin/AdminManagement';
import AddUser from './pages/admin/AddUser';
import AddDonation from './pages/admin/AddDonation';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            {/* Public Routes */}
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="admin/login" element={<AdminLogin />} />
            <Route path="register" element={<Register />} />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
            <Route path="forgot-password" element={<ForgotPassword />} />

            {/* User Protected Routes */}
            <Route
              path="profile"
              element={
                <ProtectedRoute requiredUserType="user">
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="donate"
              element={
                <ProtectedRoute requiredUserType="user">
                  <Donate />
                </ProtectedRoute>
              }
            />

          </Route>
          
          {/* Admin Portal - Separate Layout */}
          <Route 
            path="/admin" 
            element={
              <ProtectedRoute requiredUserType="admin">
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="users" element={<UserManagement />} />
            <Route path="donations" element={<DonationsManagement />} />
            <Route path="admins" element={<AdminManagement />} />
            <Route path="add-user" element={<AddUser />} />
            <Route path="add-donation" element={<AddDonation />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
