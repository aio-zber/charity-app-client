# Charity App Frontend

A React TypeScript frontend built with Vite and Tailwind CSS for the Charity App platform.

## Features

- **User Authentication**: Login, register, profile management
- **Donation System**: Make donations with secure processing
- **Admin Dashboard**: Comprehensive admin panel with analytics
- **User Management**: Admin tools for managing users
- **Responsive Design**: Modern, mobile-friendly UI with Tailwind CSS
- **Protected Routes**: Role-based access control

## Tech Stack

- **React 18** with **TypeScript**
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **React Router** for navigation
- **Axios** for HTTP requests
- **Lucide React** for icons

## Pages

### Public Pages
- **Home** (`/`) - Landing page with app overview
- **About** (`/about`) - About the charity platform
- **Contact** (`/contact`) - Contact form and information
- **Login** (`/login`) - User and admin login
- **Register** (`/register`) - User registration
- **Forgot Password** (`/forgot-password`) - Password reset request

### User Pages (Protected)
- **Profile** (`/profile`) - View and edit user profile
- **Donate** (`/donate`) - Make donations with amount selection

### Admin Pages (Protected)
- **Dashboard** (`/admin/dashboard`) - Analytics and overview
- **User Management** (`/admin/users`) - View and manage users
- **Donations Management** (`/admin/donations`) - View all donations
- **Admin Management** (`/admin/admins`) - Create new admins
- **Add User** (`/admin/add-user`) - Create new user account
- **Add Donation** (`/admin/add-donation`) - Record donations for users

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set up environment variables in `.env`:
   ```
   VITE_API_BASE_URL=http://localhost:5000/api
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Build for production:
   ```bash
   npm run build
   ```

## Authentication

The app supports two types of users:
- **Users**: Can register, login, make donations, and manage their profile
- **Admins**: Can access admin dashboard, manage users, view all donations, and create other admins

Authentication is handled via JWT tokens stored in localStorage.

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Layout.tsx      # Main app layout with navigation
│   └── ProtectedRoute.tsx # Route protection wrapper
├── contexts/           # React contexts
│   └── AuthContext.tsx # Authentication state management
├── pages/              # Page components
│   ├── admin/          # Admin-only pages
│   └── [other pages]   # Public and user pages
├── types/              # TypeScript type definitions
├── utils/              # Utility functions
│   └── api.ts          # Axios configuration
└── App.tsx             # Main app component with routing
```

## Features

### User Features
- Username-based authentication (no email required)
- Age-based registration (13+ requirement)
- Profile management with username, age, and password updates
- Secure donation processing
- Donation history tracking

### Admin Features
- Comprehensive dashboard with donation analytics (daily, weekly, monthly, annual)
- User management with search, pagination, and CRUD operations
- Donation management with detailed transaction views
- Admin account creation
- Manual donation recording for offline donations

### UI/UX Features
- Responsive design for mobile and desktop
- Modern, clean interface with Tailwind CSS
- Loading states and error handling
- Form validation and user feedback
- Protected routes with role-based access
- Intuitive navigation and breadcrumbs