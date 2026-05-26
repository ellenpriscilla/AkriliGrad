export type Role = 'STUDENT' | 'VENDOR' | 'SUPER_ADMIN';

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  avatar?: string;
}

export interface Product {
  id: string;
  vendorId: string;
  name: string;
  description: string;
  price: number;
  image: string;
  size: string;
  color: string;
  stock: number;
  availability: boolean;
  vendorName: string;
}

export type OrderStatus = 'PENDING_PAYMENT' | 'PROCESSING' | 'READY_FOR_PICKUP' | 'IN_USE' | 'RETURNED' | 'COMPLETED';

export interface Order {
  id: string;
  studentId: string;
  productId: string;
  productName: string;
  vendorId: string;
  vendorName: string;
  totalPrice: number;
  status: OrderStatus;
  orderDate: string;
  rentalDate: string;
  
  // Customization fields
  studentName: string;
  graduateName: string;
  major: string;
  faculty: string;
  message: string;
  pickupMethod: 'PICKUP' | 'DELIVERY';
  notes?: string;
}

export interface Vendor {
  id: string;
  name: string;
  email: string;
  totalOrders: number;
  totalRevenue: number;
  subscriptionStatus: 'ACTIVE' | 'EXPIRED';
  joinDate: string;
}

export interface SaaSMetrics {
  totalVendors: number;
  totalUsers: number;
  totalTransactions: number;
  mrr: number; // Monthly Recurring Revenue
  arpu: number; // Average Revenue Per User
  churnRate: number;
  totalCommission: number;
}
