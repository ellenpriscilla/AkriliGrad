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

export interface StudentUser {
  name: string;
  occupation: string;
  email: string;
}

export interface VendorUser {
  name: string;
  email: string;
}

export interface AdminUser {
  username: string;
}

interface DemoContextType {
  products: Product[];
  orders: Order[];
  vendors: Vendor[];
  metrics: SuperAdminMetrics;
  selectedVendorId: string;
  setSelectedVendorId: (id: string) => void;
  // Student Auth
  currentStudent: StudentUser | null;
  loginStudent: (name: string, occupation: string, email: string) => void;
  logoutStudent: () => void;
  // Vendor Auth
  currentVendor: VendorUser | null;
  loginVendor: (name: string, email: string) => void;
  logoutVendor: () => void;
  // Admin Auth
  currentAdmin: AdminUser | null;
  loginAdmin: (username: string) => void;
  logoutAdmin: () => void;
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
    description: 'Papan akrilik bulat wisuda estetik dengan tripod kayu premium. Ditopang kayu jati kokoh dan dihias jajaran bunga mawar pastel yang melingkar anggun.',
    price: 70000,
    image: 'https://media.karousell.com/media/photos/products/2024/6/19/paket_usaha_papan_akrilik_1718797062_1b65e9df_progressive.jpg',
    size: '40x60 cm',
    color: 'Emas Jernih',
    stock: 5,
    availability: true
  },
  {
    id: 'p2',
    vendorId: 'v2',
    vendorName: 'Bangka Acrylic Art',
    name: 'Standing Akrilik Convex Mirror',
    description: 'Desain cermin cembung (convex mirror) berbentuk lingkaran pink estetik kustom, dilengkapi papan kustom berbentuk bintang/bunga pastel, dihiasi rangkaian bunga mawar merah muda-putih segar pada bagian tiang dan dudukan dekoratif rumput sintetis premium.',
    price: 150000,
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4ZoU_YA5xJmwu6IQI73g1LgO4WMn204LMaw&s',
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
    description: 'Desain oval mewah dengan kelir merah muda (pink) gradien yang romantis, rumbai kain tulle sifon, dan dihiasi rangkaian bunga mawar merah muda lebat pada tiang melingkar (arch frame) putih premium.',
    price: 100000,
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTgDfzSYaudj2IhSdlvjWTFYWEIbMGisY6Cg&s',
    size: '50x70 cm',
    color: 'Pink Gradient & White Arch',
    stock: 4,
    availability: true
  },
  {
    id: 'p4',
    vendorId: 'v1',
    vendorName: 'GradCraft Bangka',
    name: 'Standing Akrilik Persegi Panjang',
    description: 'Papan akrilik persegi panjang kokoh transparan berhias emas mewah, ditopang easel tripod, dibingkai rangkaian bunga mawar putih dan dedaunan eucalyptus cantik untuk mempertegas kebanggaan gelar Anda.',
    price: 90000,
    image: 'https://floristnasional.com/wp-content/uploads/2025/08/Bunga-Papan-Akrilik-Bandung-FNPAB-007-640x640.jpg-1-430x430.png.webp',
    size: '40x60 cm',
    color: 'White Acrylic',
    stock: 6,
    availability: true
  },
  {
    id: 'p5',
    vendorId: 'v2',
    vendorName: 'Bangka Acrylic Art',
    name: 'Standing Mirror Akrilik',
    description: 'Standing ucapan mirror yang menarik hati.',
    price: 85000,
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSx6i7sQvoquztIEReDYFthE_-w_FHd6OSEGg&s',
    size: '40x60 cm',
    color: 'Mirror Clear',
    stock: 4,
    availability: true
  },
  {
    id: 'p6',
    vendorId: 'v3',
    vendorName: 'Sinar Wisuda Babel',
    name: 'Standing Akrilik Transparan',
    description: 'Desain standing akrilik bening yang menawan.',
    price: 80000,
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTn7HGJhNCI0qJbC6X4PWax8SLrYo_qw5KCgQ&s',
    size: '50x70 cm',
    color: 'Clear Aesthetic',
    stock: 5,
    availability: true
  }
];

const DEFAULT_ORDERS: Order[] = [
  {
    id: 'ORD-001',
    studentName: 'Ellen Priscilla',
    graduateName: 'Ocha Monicha, S.Bns',
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
    customText: 'Selamat Wisuda Ocha Monicha, S.Bns! Dari sahabat terbaikmu yang selalu bangga.',
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
    productName: 'Standing Akrilik Convex Mirror',
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
    studentName: 'Ocha Monicha',
    graduateName: 'Ocha Monicha, S.Kom',
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
    customText: 'Congrats Bro Ocha Monicha, S.Kom! Welcome to the real world.',
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
    productName: 'Standing Mirror Akrilik',
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
    if (saved) {
      try {
        const parsed: Product[] = JSON.parse(saved);
        const merged = [...parsed];
        DEFAULT_PRODUCTS.forEach(dp => {
          if (!merged.some(p => p.id === dp.id)) {
            merged.push(dp);
          }
        });
        return merged.map(p => {
          if (p.id === 'p1') {
            return {
              ...p,
              image: 'https://media.karousell.com/media/photos/products/2024/6/19/paket_usaha_papan_akrilik_1718797062_1b65e9df_progressive.jpg',
              imageUrl: 'https://media.karousell.com/media/photos/products/2024/6/19/paket_usaha_papan_akrilik_1718797062_1b65e9df_progressive.jpg'
            };
          }
          if (p.id === 'p2') {
            return {
              ...p,
              name: 'Standing Akrilik Convex Mirror',
              image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4ZoU_YA5xJmwu6IQI73g1LgO4WMn204LMaw&s',
              imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4ZoU_YA5xJmwu6IQI73g1LgO4WMn204LMaw&s'
            };
          }
          if (p.id === 'p3') {
            return {
              ...p,
              image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTgDfzSYaudj2IhSdlvjWTFYWEIbMGisY6Cg&s',
              imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTgDfzSYaudj2IhSdlvjWTFYWEIbMGisY6Cg&s'
            };
          }
          if (p.id === 'p4') {
            return {
              ...p,
              image: 'https://floristnasional.com/wp-content/uploads/2025/08/Bunga-Papan-Akrilik-Bandung-FNPAB-007-640x640.jpg-1-430x430.png.webp',
              imageUrl: 'https://floristnasional.com/wp-content/uploads/2025/08/Bunga-Papan-Akrilik-Bandung-FNPAB-007-640x640.jpg-1-430x430.png.webp'
            };
          }
          if (p.id === 'p5') {
            return {
              ...p,
              name: 'Standing Mirror Akrilik',
              image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSx6i7sQvoquztIEReDYFthE_-w_FHd6OSEGg&s',
              imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSx6i7sQvoquztIEReDYFthE_-w_FHd6OSEGg&s'
            };
          }
          if (p.id === 'p6') {
            return {
              ...p,
              name: 'Standing Akrilik Transparan',
              price: 80000,
              image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTn7HGJhNCI0qJbC6X4PWax8SLrYo_qw5KCgQ&s',
              imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTn7HGJhNCI0qJbC6X4PWax8SLrYo_qw5KCgQ&s'
            };
          }
          return p;
        });
      } catch (err) {
        return DEFAULT_PRODUCTS;
      }
    }
    return DEFAULT_PRODUCTS;
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('akriligrad_orders');
    if (saved) {
      try {
        const parsed: Order[] = JSON.parse(saved);
        return parsed.map(o => {
          let updated = { ...o };
          if (updated.studentName === 'Budi Santoso') {
            updated.studentName = 'Ocha Monicha';
          }
          if (updated.graduateName?.includes('Budi Santoso')) {
            updated.graduateName = updated.graduateName.replace(/Budi Santoso/g, 'Ocha Monicha');
          }
          if (updated.customText?.includes('Budi Santoso')) {
            updated.customText = updated.customText.replace(/Budi Santoso/g, 'Ocha Monicha');
          }
          if (updated.id === 'ORD-001') {
            updated.graduateName = 'Ocha Monicha, S.Bns';
            updated.customText = 'Selamat Wisuda Ocha Monicha, S.Bns! Dari sahabat terbaikmu yang selalu bangga.';
          }
          return updated;
        });
      } catch (err) {
        return DEFAULT_ORDERS;
      }
    }
    return DEFAULT_ORDERS;
  });

  const [vendors, setVendors] = useState<Vendor[]>(() => {
    const saved = localStorage.getItem('akriligrad_vendors');
    return saved ? JSON.parse(saved) : DEFAULT_VENDORS;
  });

  const [selectedVendorId, setSelectedVendorId] = useState<string>(() => {
    return localStorage.getItem('akriligrad_selected_vendor') || 'v1';
  });

  const [currentStudent, setCurrentStudent] = useState<StudentUser | null>(() => {
    const saved = localStorage.getItem('akriligrad_current_student');
    return saved ? JSON.parse(saved) : null;
  });

  const loginStudent = (name: string, occupation: string, email: string) => {
    const student = { name, occupation, email };
    setCurrentStudent(student);
    localStorage.setItem('akriligrad_current_student', JSON.stringify(student));
  };

  const logoutStudent = () => {
    setCurrentStudent(null);
    localStorage.removeItem('akriligrad_current_student');
  };

  const [currentVendor, setCurrentVendor] = useState<VendorUser | null>(() => {
    const saved = localStorage.getItem('akriligrad_current_vendor');
    return saved ? JSON.parse(saved) : null;
  });

  const loginVendor = (name: string, email: string) => {
    const vendor = { name, email };
    setCurrentVendor(vendor);
    localStorage.setItem('akriligrad_current_vendor', JSON.stringify(vendor));
  };

  const logoutVendor = () => {
    setCurrentVendor(null);
    localStorage.removeItem('akriligrad_current_vendor');
  };

  const [currentAdmin, setCurrentAdmin] = useState<AdminUser | null>(() => {
    const saved = localStorage.getItem('akriligrad_current_admin');
    return saved ? JSON.parse(saved) : null;
  });

  const loginAdmin = (username: string) => {
    const admin = { username };
    setCurrentAdmin(admin);
    localStorage.setItem('akriligrad_current_admin', JSON.stringify(admin));
  };

  const logoutAdmin = () => {
    setCurrentAdmin(null);
    localStorage.removeItem('akriligrad_current_admin');
  };

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
      currentStudent,
      loginStudent,
      logoutStudent,
      currentVendor,
      loginVendor,
      logoutVendor,
      currentAdmin,
      loginAdmin,
      logoutAdmin,
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
