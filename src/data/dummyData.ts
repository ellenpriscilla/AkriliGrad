import { Product, Order, Vendor, SaaSMetrics, User } from '../types';

export const currentUser: User = {
  id: 'u1',
  name: 'Budi Santoso',
  email: 'budi@example.com',
  role: 'STUDENT',
  avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=100'
};

export const vendors: Vendor[] = [
  { id: 'v1', name: 'GradCraft', email: 'gradcraft@example.com', totalOrders: 154, totalRevenue: 10780000, subscriptionStatus: 'ACTIVE', joinDate: '2025-01-10' },
  { id: 'v2', name: 'Wisuda Acrylic ID', email: 'wisudaacrylic@example.com', totalOrders: 89, totalRevenue: 6230000, subscriptionStatus: 'ACTIVE', joinDate: '2025-02-15' },
  { id: 'v3', name: 'PapanSelebrasi', email: 'papanseleb@example.com', totalOrders: 42, totalRevenue: 2940000, subscriptionStatus: 'ACTIVE', joinDate: '2025-03-20' },
];

export const products: Product[] = [
  {
    id: 'p1',
    vendorId: 'v1',
    vendorName: 'GradCraft',
    name: 'Classic Gold Graduation Board',
    description: 'A timeless design featuring gold accents on a clear acrylic background. Perfect for any graduation theme.',
    price: 70000,
    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=400',
    size: '60x40cm',
    color: 'Gold/Clear',
    stock: 5,
    availability: true
  },
  {
    id: 'p2',
    vendorId: 'v2',
    vendorName: 'Wisuda Acrylic ID',
    name: 'Minimalist White Acrylic',
    description: 'Clean and modern white acrylic board with elegant black typography. Ideal for minimalist aesthetic.',
    price: 70000,
    image: 'https://images.unsplash.com/photo-1589330694653-909247ea5025?auto=format&fit=crop&q=80&w=400',
    size: '50x50cm',
    color: 'White/Black',
    stock: 12,
    availability: true
  },
  {
    id: 'p3',
    vendorId: 'v1',
    vendorName: 'GradCraft',
    name: 'Elegant Blue Graduation Board',
    description: 'Deep navy blue acrylic with silver lettering. Adds a touch of sophistication to your special day.',
    price: 70000,
    image: 'https://images.unsplash.com/photo-1541339907198-e08756ebafe3?auto=format&fit=crop&q=80&w=400',
    size: '60x40cm',
    color: 'Navy/Silver',
    stock: 3,
    availability: true
  },
  {
    id: 'p4',
    vendorId: 'v3',
    vendorName: 'PapanSelebrasi',
    name: 'Custom Campus Edition',
    description: 'Can be customized with your university logo and colors. Durable and high-quality material.',
    price: 70000,
    image: 'https://images.unsplash.com/photo-1541345023926-55d6e08bb369?auto=format&fit=crop&q=80&w=400',
    size: '60x45cm',
    color: 'Custom',
    stock: 8,
    availability: true
  }
];

export const orders: Order[] = [
  {
    id: 'ord1',
    studentId: 'u1',
    productId: 'p1',
    productName: 'Classic Gold Graduation Board',
    vendorId: 'v1',
    vendorName: 'GradCraft',
    totalPrice: 70000,
    status: 'PROCESSING',
    orderDate: '2025-05-10',
    rentalDate: '2025-05-25',
    studentName: 'Budi Santoso',
    graduateName: 'Budi Santoso, S.Kom',
    major: 'Informatika',
    faculty: 'FSM',
    message: 'Happy Graduation!',
    pickupMethod: 'PICKUP'
  },
  {
    id: 'ord2',
    studentId: 'u1',
    productId: 'p2',
    productName: 'Minimalist White Acrylic',
    vendorId: 'v2',
    vendorName: 'Wisuda Acrylic ID',
    totalPrice: 70000,
    status: 'COMPLETED',
    orderDate: '2025-04-15',
    rentalDate: '2025-04-20',
    studentName: 'Budi Santoso',
    graduateName: 'Ani Wijaya, S.Pd',
    major: 'Pendidikan Bahasa Inggris',
    faculty: 'FKIP',
    message: 'Selamat wisuda sahabat!',
    pickupMethod: 'DELIVERY'
  }
];

export const saasMetrics: SaaSMetrics = {
  totalVendors: 12,
  totalUsers: 450,
  totalTransactions: 890,
  mrr: 600000, // 12 vendors * 50.000
  arpu: 50000,
  churnRate: 2.5,
  totalCommission: 6230000 // Cumulative commission from orders
};
