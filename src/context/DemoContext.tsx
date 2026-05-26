import React, { createContext, useContext, useState, useEffect } from 'react';

export type OrderStatus = 
  | 'Waiting for Payment' 
  | 'Confirmed' 
  | 'In Process' 
  | 'Ready for Pickup' 
  | 'Currently Rented' 
  | 'Completed';

export interface Product {
  id: string;
  vendorId: string;
  vendorName: string;
  name: string;
  description: string;
  price: number;
  image: string;
  size: string;
  color: string;
  stock: number;
  availability: boolean;
}

export interface Order {
  id: string;
  studentName: string;
  graduateName: string;
  university: 'Universitas Bangka Belitung' | 'Poltekes Bangka' | 'Polman Babel' | string;
  whatsapp: string;
  productId: string;
  productName: string;
  price: number;
  vendorId: string;
  vendorName: string;
  pickupDate: string;
  returnDate: string;
  size: string;
  notes?: string;
  customText: string;
  status: OrderStatus;
  orderDate: string;
}

export interface Vendor {
  id: string;
  name: string;
  email: string;
  totalOrders: number;
  totalRevenue: number;
  subscriptionStatus: 'ACTIVE' | 'EXPIRED';
  joinDate: string;
  subscriptionFee: number; // monthly fee: Rp50.000
}

export interface SuperAdminMetrics {
  totalVendors: number;
  totalStudents: number;
  totalTransactions: number;
  mrr: number; // 50.000 * active vendors
  commissionRevenue: number; // 10% of completed/active transactions
  commissionRate: number; // 10%
}

interface DemoContextType {
  products: Product[];
  orders: Order[];
  vendors: Vendor[];
  metrics: SuperAdminMetrics;
  selectedVendorId: string;
  setSelectedVendorId: (id: string) => void;
  // Product actions
  addProduct: (product: Omit<Product, 'id' | 'vendorId' | 'vendorName'>) => void;
  editProduct: (id: string, updatedProduct: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  // Order actions
  placeOrder: (orderData: Omit<Order, 'id' | 'status' | 'orderDate'>) => Order;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  verifyOrderPayment: (orderId: string) => void;
  // Vendor actions
  toggleVendorSubscription: (vendorId: string) => void;
}

const DemoContext = createContext<DemoContextType | undefined>(undefined);

// Core Seed Data
const DEFAULT_VENDORS: Vendor[] = [
  { id: 'v1', name: 'GradCraft Bangka', email: 'hello@gradcraftbangka.com', totalOrders: 24, totalRevenue: 1680000, subscriptionStatus: 'ACTIVE', joinDate: '2026-01-10', subscriptionFee: 50000 },
  { id: 'v2', name: 'Bangka Acrylic Art', email: 'owner@bangkaacrylic.com', totalOrders: 18, totalRevenue: 1260000, subscriptionStatus: 'ACTIVE', joinDate: '2026-02-15', subscriptionFee: 50000 },
  { id: 'v3', name: 'Sinar Wisuda Babel', email: 'info@sinarwisudababel.com', totalOrders: 13, totalRevenue: 910000, subscriptionStatus: 'ACTIVE', joinDate: '2026-03-20', subscriptionFee: 50000 }
];

const DEFAULT_PRODUCTS: Product[] = [
  {
    id: 'p1',
    vendorId: 'v1',
    vendorName: 'GradCraft Bangka',
    name: 'Standing Akrilik Bulat',
    description: 'Papan akrilik bulat wisuda estetik dengan tripod kayu premium. Cocok untuk semua tema kelulusan.',
    price: 70000,
    image: 'https://images.unsplash.com/photo-1523050853063-880c6934a415?auto=format&fit=crop&q=80&w=400',
    size: '40x60 cm',
    color: 'Emas Jernih',
    stock: 5,
    availability: true
  },
  {
    id: 'p2',
    vendorId: 'v2',
    vendorName: 'Bangka Acrylic Art',
    name: 'Standing Akrilik Konveksi Mirror',
    description: 'Papan akrilik cermin mewah berwarna emas/rose gold yang memantulkan kebahagiaan hari wisudamu.',
    price: 150000,
    image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=400',
    size: '40x60 cm',
    color: 'Gold Mirror',
    stock: 3,
    availability: true
  },
  {
    id: 'p3',
    vendorId: 'v3',
    vendorName: 'Sinar Wisuda Babel',
    name: 'Standing Akrilik Oval',
    description: 'Bentuk oval modern berkelas dengan hiasan bunga kering estetik di sudut tiangnya.',
    price: 100000,
    image: 'https://images.unsplash.com/photo-1519311965067-36d3e5f33d39?auto=format&fit=crop&q=80&w=400',
    size: '50x70 cm',
    color: 'Clear Oval',
    stock: 4,
    availability: true
  },
  {
    id: 'p4',
    vendorId: 'v1',
    vendorName: 'GradCraft Bangka',
    name: 'Standing Akrilik Persegi Panjang',
    description: 'Desain minimalis persegi panjang klasik yang memaksimalkan pembacaan nama dan kehormatan gelar.',
    price: 90000,
    image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=400',
    size: '40x60 cm',
    color: 'White Acrylic',
    stock: 6,
    availability: true
  },
  {
    id: 'p5',
    vendorId: 'v2',
    vendorName: 'Bangka Acrylic Art',
    name: 'Standing Akrilik Hexagon Clear',
    description: 'Geometris hexagon modern yang mencuri perhatian banyak pasang mata di tempat upacara.',
    price: 85000,
    image: 'https://images.unsplash.com/photo-1490261232029-77b1d3e1146c?auto=format&fit=crop&q=80&w=400',
    size: '40x60 cm',
    color: 'Hexagonal Clear',
    stock: 4,
    availability: true
  },
  {
    id: 'p6',
    vendorId: 'v3',
    vendorName: 'Sinar Wisuda Babel',
    name: 'Standing Akrilik Arch Aesthetic',
    description: 'Bentuk kubah lengkung (Arch) mediterania yang sangat tren untuk dekorasi wisuda masa kini.',
    price: 120000,
    image: 'https://images.unsplash.com/photo-1541339907198-e08756ebafe3?auto=format&fit=crop&q=80&w=400',
    size: '50x70 cm',
    color: 'Arch Frosted',
    stock: 5,
    availability: true
  }
];

const DEFAULT_ORDERS: Order[] = [
  {
    id: 'ORD-001',
    studentName: 'Ellen Priscilla',
    graduateName: 'Ellen Priscilla, S.Kom',
    university: 'Universitas Bangka Belitung',
    whatsapp: '082173456789',
    productId: 'p1',
    productName: 'Standing Akrilik Bulat',
    price: 70000,
    vendorId: 'v1',
    vendorName: 'GradCraft Bangka',
    pickupDate: '2026-05-27',
    returnDate: '2026-05-30',
    size: '40x60 cm',
    notes: 'Mohon tripod kayunya dipastikan kokoh ya kak, terimakasih!',
    customText: 'Selamat Wisuda Ellen Priscilla, S.Kom! Dari sahabat terbaikmu yang selalu bangga.',
    status: 'Ready for Pickup',
    orderDate: '2026-05-20'
  },
  {
    id: 'ORD-002',
    studentName: 'Rizky Maulana',
    graduateName: 'Rizky Maulana, A.Md.Keb',
    university: 'Poltekes Bangka',
    whatsapp: '081923456789',
    productId: 'p2',
    productName: 'Standing Akrilik Konveksi Mirror',
    price: 150000,
    vendorId: 'v2',
    vendorName: 'Bangka Acrylic Art',
    pickupDate: '2026-05-28',
    returnDate: '2026-05-31',
    size: '40x60 cm',
    notes: 'Kirim pagi-pagi sekali ya kak',
    customText: 'Congrats Rizky Maulana, A.Md.Keb! Sukses pengabdian profesinya.',
    status: 'In Process',
    orderDate: '2026-05-22'
  },
  {
    id: 'ORD-003',
    studentName: 'Sarah Kartika',
    graduateName: 'Sarah Kartika, S.Tr.T',
    university: 'Polman Babel',
    whatsapp: '081234567890',
    productId: 'p3',
    productName: 'Standing Akrilik Oval',
    price: 100000,
    vendorId: 'v3',
    vendorName: 'Sinar Wisuda Babel',
    pickupDate: '2026-05-29',
    returnDate: '2026-06-01',
    size: '50x70 cm',
    notes: 'Warna pita tolong diganti kuning emas jika ada',
    customText: 'Happy Graduation Sarah Kartika, S.Tr.T! Proud of your achievement.',
    status: 'Waiting for Payment',
    orderDate: '2026-05-24'
  },
  {
    id: 'ORD-004',
    studentName: 'Budi Santoso',
    graduateName: 'Budi Santoso, S.Kom',
    university: 'Universitas Bangka Belitung',
    whatsapp: '081122334455',
    productId: 'p4',
    productName: 'Standing Akrilik Persegi Panjang',
    price: 90000,
    vendorId: 'v1',
    vendorName: 'GradCraft Bangka',
    pickupDate: '2026-05-15',
    returnDate: '2026-05-18',
    size: '40x60 cm',
    notes: 'Ambil langsung ke alamat workshop',
    customText: 'Congrats Bro Budi Santoso, S.Kom! Welcome to the real world.',
    status: 'Completed',
    orderDate: '2026-05-14'
  },
  {
    id: 'ORD-005',
    studentName: 'Dewi Lestari',
    graduateName: 'Dewi Lestari, A.Md.Kep',
    university: 'Poltekes Bangka',
    whatsapp: '085566778899',
    productId: 'p5',
    productName: 'Standing Akrilik Hexagon Clear',
    price: 85000,
    vendorId: 'v2',
    vendorName: 'Bangka Acrylic Art',
    pickupDate: '2026-05-25',
    returnDate: '2026-05-28',
    size: '40x60 cm',
    notes: 'Harap dikemas rapi ya',
    customText: 'Selamat & Sukses atas pelantikan profesimu Dewi Lestari, A.Md.Kep!',
    status: 'Currently Rented',
    orderDate: '2026-05-18'
  }
];

export const DemoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('akriligrad_products');
    return saved ? JSON.parse(saved) : DEFAULT_PRODUCTS;
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('akriligrad_orders');
    return saved ? JSON.parse(saved) : DEFAULT_ORDERS;
  });

  const [vendors, setVendors] = useState<Vendor[]>(() => {
    const saved = localStorage.getItem('akriligrad_vendors');
    return saved ? JSON.parse(saved) : DEFAULT_VENDORS;
  });

  const [selectedVendorId, setSelectedVendorId] = useState<string>(() => {
    return localStorage.getItem('akriligrad_selected_vendor') || 'v1';
  });

  const [metrics, setMetrics] = useState<SuperAdminMetrics>({
    totalVendors: 3,
    totalStudents: 5,
    totalTransactions: 5,
    mrr: 150000,
    commissionRevenue: 0,
    commissionRate: 0.1
  });

  // Keep localStorage up to date
  useEffect(() => {
    localStorage.setItem('akriligrad_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('akriligrad_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('akriligrad_vendors', JSON.stringify(vendors));
  }, [vendors]);

  useEffect(() => {
    localStorage.setItem('akriligrad_selected_vendor', selectedVendorId);
  }, [selectedVendorId]);

  // Recalculate metrics on data changes
  useEffect(() => {
    const activeVendors = vendors.filter(v => v.subscriptionStatus === 'ACTIVE');
    const mrr = activeVendors.length * 50000;
    
    // Total transactions is order length
    const totalTransactions = orders.length;
    
    // Unique students
    const uniqueStudents = new Set(orders.map(o => o.studentName)).size;
    
    // 10% commission from transactions
    // In our model: commission is 10% of total transactions volume
    const totalTransactionsVolume = orders.reduce((sum, o) => sum + o.price, 0);
    const commissionRevenue = totalTransactionsVolume * 0.1;

    setMetrics({
      totalVendors: vendors.length,
      totalStudents: uniqueStudents || 5,
      totalTransactions,
      mrr,
      commissionRevenue,
      commissionRate: 0.1
    });

    // Also sync back Vendor stats dynamically!
    // For each vendor, calculate its totalOrders and totalRevenue based on actual orders
    const updatedVendors = vendors.map(v => {
      const vendorOrders = orders.filter(o => o.vendorId === v.id);
      const totalRevenue = vendorOrders.reduce((sum, o) => sum + o.price, 0);
      return {
        ...v,
        totalOrders: vendorOrders.length,
        totalRevenue
      };
    });

    // Only update if there is an actual difference to avoid infinite loop
    if (JSON.stringify(updatedVendors) !== JSON.stringify(vendors)) {
      setVendors(updatedVendors);
    }
  }, [orders, vendors.length]);

  // Context Actions
  const addProduct = (productData: Omit<Product, 'id' | 'vendorId' | 'vendorName'>) => {
    const activeVendor = vendors.find(v => v.id === selectedVendorId) || vendors[0];
    const newProduct: Product = {
      ...productData,
      id: `p-${Date.now()}`,
      vendorId: activeVendor.id,
      vendorName: activeVendor.name
    };
    setProducts(prev => [newProduct, ...prev]);
  };

  const editProduct = (id: string, updatedProduct: Partial<Product>) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, ...updatedProduct } : p));
  };

  const deleteProduct = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  const placeOrder = (orderData: Omit<Order, 'id' | 'status' | 'orderDate'>) => {
    const orderId = `ORD-${Math.floor(100 + Math.random() * 900)}`;
    const newOrder: Order = {
      ...orderData,
      id: orderId,
      status: 'Waiting for Payment',
      orderDate: new Date().toISOString().split('T')[0]
    };
    setOrders(prev => [newOrder, ...prev]);
    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status } : o));
  };

  const verifyOrderPayment = (orderId: string) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: 'Confirmed' } : o));
  };

  const toggleVendorSubscription = (vendorId: string) => {
    setVendors(prev => prev.map(v => {
      if (v.id === vendorId) {
        return {
          ...v,
          subscriptionStatus: v.subscriptionStatus === 'ACTIVE' ? 'EXPIRED' : 'ACTIVE'
        };
      }
      return v;
    }));
  };

  return (
    <DemoContext.Provider value={{
      products,
      orders,
      vendors,
      metrics,
      selectedVendorId,
      setSelectedVendorId,
      addProduct,
      editProduct,
      deleteProduct,
      placeOrder,
      updateOrderStatus,
      verifyOrderPayment,
      toggleVendorSubscription
    }}>
      {children}
    </DemoContext.Provider>
  );
};

export const useDemoData = () => {
  const context = useContext(DemoContext);
  if (!context) {
    throw new Error('useDemoData must be used within a DemoProvider');
  }
  return context;
};
