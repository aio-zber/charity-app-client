export interface User {
  id: number;
  username: string;
  age: number;
  createdAt: string;
  updatedAt?: string;
}

export interface Admin {
  id: number;
  username: string;
  createdAt: string;
  updatedAt?: string;
}

export interface Donation {
  id: number;
  amount: number;
  userId: number;
  user?: User;
  createdAt: string;
  updatedAt?: string;
}

export interface AuthResponse {
  message: string;
  token: string;
  user?: User;
  admin?: Admin;
}

export interface DashboardStats {
  daily: {
    amount: number;
    count: number;
  };
  weekly: {
    amount: number;
    count: number;
  };
  monthly: {
    amount: number;
    count: number;
  };
  annual: {
    amount: number;
    count: number;
  };
  totalUsers: number;
  totalDonations: {
    amount: number;
    count: number;
  };
}

export interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface ApiResponse<T> {
  data?: T;
  message?: string;
  errors?: any[];
  pagination?: PaginationMeta;
}