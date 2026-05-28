import React, { useState } from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';
import { 
  Package, 
  TrendingUp, 
  ArrowUpRight,
  Monitor,
  Plus,
  Trash2,
  Check,
  RefreshCw,
  Clock,
  Inbox,
  CalendarDays,
  Store,
  CheckCircle2,
  DollarSign,
  Users,
  FileText
} from 'lucide-react';
import { useDemoData, OrderStatus } from '../../context/DemoContext';
import { motion } from 'motion/react';

export default function VendorDashboard() {
  const { 
    orders, 
    products, 
    vendors, 
    selectedVendorId, 
    addProduct, 
    editProduct, 
    deleteProduct, 
    updateOrderStatus 
  } = useDemoData();

  const [activeTab, setActiveTab] = useState<'overview' | 'products' | 'orders' | 'customers' | 'revenue'>('overview');
  
  // New Product Modal states
  const [showAddModal, setShowAddModal] = useState(false);
  const [newProdName, setNewProdName] = useState('');
  const [newProdPrice, setNewProdPrice] = useState('85000');
  const [newProdStock, setNewProdStock] = useState('5');
  const [newProdDesc, setNewProdDesc] = useState('');
  
  // Find current active vendor detail
  const currentVendor = vendors.find(v => v.id === selectedVendorId) || vendors[0];
  const vendorProducts = products.filter(p => p.vendorId === selectedVendorId);
  const vendorOrders = orders.filter(o => o.vendorId === selectedVendorId);

  // Growth Chart simulator
  const chartData = [
    { name: 'Minggu 1', value: vendorOrders.slice(0, 3).reduce((sum, o) => sum + o.price, 0) || 120000 },
    { name: 'Minggu 2', value: vendorOrders.slice(0, 5).reduce((sum, o) => sum + o.price, 0) || 280000 },
    { name: 'Minggu 3', value: vendorOrders.slice(0, 8).reduce((sum, o) => sum + o.price, 0) || 450000 },
    { name: 'Minggu 4', value: currentVendor.totalRevenue },
  ];

  // Computations
  const completedOrders = vendorOrders.filter(o => o.status === 'Completed');
  const activeOrdersCount = vendorOrders.filter(o => o.status !== 'Completed').length;
  const activeRentalsCount = vendorOrders.filter(o => o.status === 'Currently Rented').length;
  const pendingPaymentsCount = vendorOrders.filter(o => o.status === 'Waiting for Payment').length;
  const earningsSum = vendorOrders
    .filter(o => o.status !== 'Waiting for Payment')
    .reduce((sum, o) => sum + o.price, 0);

  // Unique Customer Records for Customer Data Section
  const uniqueCustomerRecords = Array.from(new Set(vendorOrders.map(o => o.studentName))).map(name => {
    const studentOrders = vendorOrders.filter(o => o.studentName === name);
    const latest = studentOrders[studentOrders.length - 1];
    return {
      studentName: name,
      university: latest?.university || 'Universitas Bangka Belitung',
      whatsapp: latest?.whatsapp || 'N/A',
      totalOrders: studentOrders.length,
      latestProduct: latest?.productName || 'N/A',
      lastOrderDate: latest?.orderDate || 'N/A'
    };
  });

  const formatIDR = (num: number) => {
    return `Rp${num.toLocaleString('id-ID')}`;
  };

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProdName) return;

    addProduct({
      name: newProdName,
      price: parseInt(newProdPrice) || 85000,
      stock: parseInt(newProdStock) || 5,
      description: newProdDesc || 'Papan hias akrilik wisuda premium, dipasang di tripod.',
      image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=400',
      size: '40x60 cm',
      color: 'Emas',
      availability: true
    });

    setNewProdName('');
    setNewProdDesc('');
    setShowAddModal(false);
  };

  const nextStatusMap: Record<OrderStatus, OrderStatus | null> = {
    'Waiting for Payment': 'Confirmed',
    'Confirmed': 'In Process',
    'In Process': 'Ready for Pickup',
    'Ready for Pickup': 'Currently Rented',
    'Currently Rented': 'Completed',
    'Completed': null
  };

  const getStatusButtonLabel = (status: OrderStatus) => {
    switch (status) {
      case 'Waiting for Payment': return 'Sms Verifikasi Bayar';
      case 'Confirmed': return 'Mulai Proses Ukir';
      case 'In Process': return 'Selesai & Siap Ambil';
      case 'Ready for Pickup': return 'Serahkan ke Wisudawan';
      case 'Currently Rented': return 'Konfirmasi Pengembalian';
      default: return 'Selesai';
    }
  };

  const getStatusBadgeClass = (status: OrderStatus) => {
    switch (status) {
      case 'Waiting for Payment': return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'Confirmed': return 'bg-blue-105 bg-blue-50 text-blue-700 border-blue-200';
      case 'In Process': return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'Ready for Pickup': return 'bg-pink-50 text-pink-700 border-pink-200';
      case 'Currently Rented': return 'bg-indigo-50 text-indigo-750 border-indigo-200';
      case 'Completed': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      default: return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="space-y-8 text-left">
      {/* Dynamic Vendor Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-navy/10">
        <div>
          <div className="flex items-center gap-2 text-[10px] font-black tracking-widest text-[#D4AF37] uppercase bg-slate-150 bg-slate-100 px-3.5 py-1 rounded-full w-max mb-1">
             <Store className="w-3.5 h-3.5" /> Mitra Terdaftar
          </div>
          <h1 className="text-3xl font-black text-navy tracking-tight uppercase">{currentVendor.name}</h1>
          <p className="text-navy/40 font-bold uppercase tracking-widest text-[9px] mt-0.5">
             Portal Pengelolaan Persewaan Akrilik Wisuda di Bangka
          </p>
        </div>
        <div className="flex gap-2">
           <button 
             onClick={() => setShowAddModal(prev => !prev)}
             className="px-5 py-2.5 bg-gold text-slate-950 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-lg shadow-gold/20 hover:brightness-110 active:scale-95 transition-all flex items-center gap-1"
           >
              <Plus className="w-3.5 h-3.5" /> Tambah Produk Akrilik
           </button>
        </div>
      </div>

      {/* Navigation tabs */}
      <div className="flex border-b border-[#FFF8E7] flex-wrap gap-2 pt-2">
        <button 
          onClick={() => setActiveTab('overview')}
          className={`px-5 py-3 font-black text-[10px] tracking-widest uppercase border-b-2 transition-all ${activeTab === 'overview' ? 'border-[#D4AF37] text-[#D4AF37]' : 'border-transparent text-slate-400 hover:text-[#1F2937]'}`}
        >
          Ringkasan Performa
        </button>
        <button 
          onClick={() => setActiveTab('products')}
          className={`px-5 py-3 font-black text-[10px] tracking-widest uppercase border-b-2 transition-all ${activeTab === 'products' ? 'border-[#D4AF37] text-[#D4AF37]' : 'border-transparent text-slate-400 hover:text-[#1F2937]'}`}
        >
          Product Catalog ({vendorProducts.length})
        </button>
        <button 
          onClick={() => setActiveTab('orders')}
          className={`px-5 py-3 font-black text-[10px] tracking-widest uppercase border-b-2 transition-all ${activeTab === 'orders' ? 'border-[#D4AF37] text-[#D4AF37]' : 'border-transparent text-slate-400 hover:text-[#1F2937]'}`}
        >
          Order & Rental Schedule ({vendorOrders.length})
        </button>
        <button 
          onClick={() => setActiveTab('customers')}
          className={`px-5 py-3 font-black text-[10px] tracking-widest uppercase border-b-2 transition-all ${activeTab === 'customers' ? 'border-[#D4AF37] text-[#D4AF37]' : 'border-transparent text-slate-400 hover:text-[#1F2937]'}`}
        >
          Data Pelanggan ({uniqueCustomerRecords.length})
        </button>
        <button 
          onClick={() => setActiveTab('revenue')}
          className={`px-5 py-3 font-black text-[10px] tracking-widest uppercase border-b-2 transition-all ${activeTab === 'revenue' ? 'border-[#D4AF37] text-[#D4AF37]' : 'border-transparent text-slate-400 hover:text-[#1F2937]'}`}
        >
          Revenue Report
        </button>
      </div>

      {/* Overview Dashboard Tab */}
      {activeTab === 'overview' && (
        <div className="space-y-8">
          {/* Simple Menu Cards Section */}
          <div className="space-y-3">
             <h3 className="text-[10px] font-black text-[#D4AF37] uppercase tracking-[0.2em] text-left">Menu Cards</h3>
             <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
               <button 
                 onClick={() => setActiveTab('products')}
                 className="bg-white hover:bg-[#FFF8E7]/40 p-6 rounded-3xl border border-[#FFF8E7] hover:border-[#D4AF37] transition-all text-left flex flex-col justify-between h-36 group shadow-sm hover:shadow-md"
               >
                 <div className="w-10 h-10 rounded-xl bg-[#FFF8E7] text-[#D4AF37] flex items-center justify-center group-hover:scale-110 transition-transform">
                   <Package className="w-5 h-5" />
                 </div>
                 <div>
                   <h4 className="text-sm font-black text-[#1F2937] uppercase tracking-tight">Product Catalog</h4>
                   <p className="text-[10px] text-slate-400 font-semibold mt-0.5">Kelola foto & tarif akrilik</p>
                 </div>
               </button>
               <button 
                 onClick={() => setActiveTab('orders')}
                 className="bg-white hover:bg-[#FFF8E7]/40 p-6 rounded-3xl border border-[#FFF8E7] hover:border-[#D4AF37] transition-all text-left flex flex-col justify-between h-36 group shadow-sm hover:shadow-md"
               >
                 <div className="w-10 h-10 rounded-xl bg-[#FFF8E7] text-[#D4AF37] flex items-center justify-center group-hover:scale-110 transition-transform">
                   <FileText className="w-5 h-5" />
                 </div>
                 <div>
                   <h4 className="text-sm font-black text-[#1F2937] uppercase tracking-tight">Order Management</h4>
                   <p className="text-[10px] text-slate-400 font-semibold mt-0.5">Konfirmasi alur sewa</p>
                 </div>
               </button>
               <button 
                 onClick={() => setActiveTab('orders')}
                 className="bg-white hover:bg-[#FFF8E7]/40 p-6 rounded-3xl border border-[#FFF8E7] hover:border-[#D4AF37] transition-all text-left flex flex-col justify-between h-36 group shadow-sm hover:shadow-md"
               >
                 <div className="w-10 h-10 rounded-xl bg-[#FFF8E7] text-[#D4AF37] flex items-center justify-center group-hover:scale-110 transition-transform">
                   <CalendarDays className="w-5 h-5" />
                 </div>
                 <div>
                   <h4 className="text-sm font-black text-[#1F2937] uppercase tracking-tight">Rental Schedule</h4>
                   <p className="text-[10px] text-slate-400 font-semibold mt-0.5">Pantau kalender sewa</p>
                 </div>
               </button>
               <button 
                 onClick={() => setActiveTab('revenue')}
                 className="bg-white hover:bg-[#FFF8E7]/40 p-6 rounded-3xl border border-[#FFF8E7] hover:border-[#D4AF37] transition-all text-left flex flex-col justify-between h-36 group shadow-sm hover:shadow-md"
               >
                 <div className="w-10 h-10 rounded-xl bg-[#FFF8E7] text-[#D4AF37] flex items-center justify-center group-hover:scale-110 transition-transform">
                   <TrendingUp className="w-5 h-5" />
                 </div>
                 <div>
                   <h4 className="text-sm font-black text-[#1F2937] uppercase tracking-tight">Revenue Report</h4>
                   <p className="text-[10px] text-slate-400 font-semibold mt-0.5">Lihat bagi hasil & omzet</p>
                 </div>
               </button>
             </div>
          </div>

          {/* Simple Dashboard Cards */}
          <div className="space-y-3">
            <h3 className="text-[10px] font-black text-[#D4AF37] uppercase tracking-[0.2em] text-left">Simple Dashboard Cards</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-[32px] border border-[#FFF8E7] shadow-sm hover:border-[#D4AF37] transition-all">
                  <div className="w-10 h-10 bg-[#FFF8E7] text-[#D4AF37] rounded-xl flex items-center justify-center mb-4"><Package className="w-5 h-5" /></div>
                  <div className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">Total Orders</div>
                  <div className="text-2xl font-black text-[#1F2937]">{vendorOrders.length} Pesanan</div>
              </div>
              <div className="bg-white p-6 rounded-[32px] border border-[#FFF8E7] shadow-sm hover:border-[#D4AF37] transition-all">
                  <div className="w-10 h-10 bg-[#FFF8E7] text-gold rounded-xl flex items-center justify-center mb-4"><Inbox className="w-5 h-5 text-[#D4AF37]" /></div>
                  <div className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">Active Rentals</div>
                  <div className="text-2xl font-black text-[#1F2937]">{activeRentalsCount} Unit Sewa</div>
              </div>
              <div className="bg-white p-6 rounded-[32px] border border-[#FFF8E7] shadow-sm hover:border-[#D4AF37] transition-all">
                  <div className="w-10 h-10 bg-red-50 text-red-650 rounded-xl flex items-center justify-center mb-4"><Clock className="w-5 h-5 text-red-500" /></div>
                  <div className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">Pending Payments</div>
                  <div className="text-2xl font-black text-red-600">{pendingPaymentsCount} Menunggu</div>
              </div>
              <div className="bg-white p-6 rounded-[32px] border border-[#FFF8E7] shadow-sm hover:border-[#D4AF37] transition-all">
                  <div className="w-10 h-10 bg-[#FFF8E7] text-emerald-600 rounded-xl flex items-center justify-center mb-4"><DollarSign className="w-5 h-5 text-emerald-500" /></div>
                  <div className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">Total Revenue</div>
                  <div className="text-2xl font-black text-[#1F2937]">{formatIDR(earningsSum)}</div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Sales Chart */}
            <div className="md:col-span-2 bg-white p-8 rounded-[40px] border border-beige shadow-sm">
              <div className="flex items-center justify-between mb-8 border-b border-beige pb-4">
                <div>
                  <h2 className="text-xl font-black text-navy tracking-tight uppercase">Penjualan Akrilik</h2>
                  <p className="text-slate-400 text-[9px] font-bold uppercase tracking-widest">Akumulasi pendapatan real-time</p>
                </div>
                <div className="text-right">
                  <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Subscription</div>
                  <div className="text-xs text-gold font-bold">Mitra Platinum</div>
                </div>
              </div>
              <div className="h-60">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData}>
                    <defs>
                      <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#D4AF37" stopOpacity={0.15}/>
                        <stop offset="95%" stopColor="#D4AF37" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F4EAE1" />
                    <XAxis dataKey="name" fontSize={9} fontWeight="bold" stroke="#000" axisLine={false} tickLine={false} />
                    <YAxis fontSize={9} fontWeight="bold" hide />
                    <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid beige' }} />
                    <Area type="monotone" dataKey="value" stroke="#D4AF37" strokeWidth={3} fillOpacity={1} fill="url(#colorVal)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Pickup Schedule card */}
            <div className="bg-navy text-white p-8 rounded-[40px] shadow-2xl relative overflow-hidden flex flex-col justify-between">
              <div>
                <h2 className="text-lg font-black tracking-tight uppercase text-gold mb-6">Agenda Pickup</h2>
                <div className="space-y-4">
                  {vendorOrders.slice(0, 3).map((order, i) => (
                    <div key={i} className="flex gap-4 border-l border-white/10 pl-4 relative">
                      <div className="absolute -left-[4.5px] top-1 w-2 h-2 rounded-full bg-gold ring-4 ring-gold/15" />
                      <div className="text-left">
                         <div className="text-[10px] font-bold text-slate-300">{order.pickupDate}</div>
                         <div className="text-xs font-black text-white">{order.studentName}</div>
                         <div className="text-[9px] text-gold uppercase tracking-wider">{order.productName}</div>
                      </div>
                    </div>
                  ))}
                  {vendorOrders.length === 0 && (
                    <div className="text-center text-xs text-white/40 py-8">Belum ada jadwal pengambilan sewa.</div>
                  )}
                </div>
              </div>
              <button 
                onClick={() => setActiveTab('orders')}
                className="w-full py-3.5 border border-white/10 rounded-xl text-[10px] font-black text-white/60 uppercase tracking-widest hover:bg-white/5 transition-colors mt-6"
              >
                 Atur Semua Jadwal sewa
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Catalog & Inventory Portfolio */}
      {activeTab === 'products' && (
        <div className="space-y-6">
          <div className="bg-white rounded-[32px] border border-beige p-8 shadow-sm">
             <div className="flex justify-between items-center pb-4 border-b border-beige mb-6">
                <div>
                   <h3 className="text-lg font-black text-navy uppercase">Etalase Penyewaan Anda</h3>
                   <p className="text-slate-400 text-[10px] font-black uppercase tracking-wider">Kelola harga sewa, ketersediaan unit, dan deskripsi produk</p>
                </div>
                <button 
                  onClick={() => setShowAddModal(true)}
                  className="px-4 py-2 bg-navy text-white hover:bg-gold hover:text-slate-950 font-black text-[9px] uppercase tracking-widest rounded-xl transition-all"
                >
                  Tambah Baru
                </button>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {vendorProducts.map((p) => (
                  <div key={p.id} className="border border-beige rounded-2xl p-4 bg-slate-50 relative group">
                     <div className="aspect-[4/5] overflow-hidden rounded-xl bg-slate-200 mb-4">
                        <img 
                          src={p.imageUrl || p.image} 
                          alt={p.name} 
                          className={`w-full h-full object-cover transition-transform duration-700 ${
                            p.id === 'p4' 
                              ? 'origin-top scale-[1.18]' 
                              : ''
                          }`} 
                        />
                     </div>
                     <span className="absolute top-6 left-6 bg-[#0B3D91] text-white font-mono text-[8px] font-black px-2 py-0.5 rounded-md uppercase">
                        ID: {p.id}
                     </span>
                     
                     <div className="space-y-1 text-left">
                        <h4 className="font-extrabold text-navy uppercase text-sm">{p.name}</h4>
                        <div className="text-sm font-black text-gold">{formatIDR(p.price)}</div>
                        <div className="text-[10px] text-slate-400 font-bold mb-3">{p.description}</div>
                        
                        <div className="flex items-center justify-between pt-3 border-t border-beige">
                           <div className="text-[9px] font-black text-navy/40 uppercase">Stok: <strong>{p.stock} Unit</strong></div>
                           <button 
                             onClick={() => deleteProduct(p.id)}
                             className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"
                           >
                              <Trash2 className="w-4 h-4" />
                           </button>
                        </div>
                     </div>
                  </div>
                ))}
                {vendorProducts.length === 0 && (
                  <div className="col-span-full py-12 text-center text-slate-400 border border-dashed border-beige bg-white rounded-2xl">
                     <Package className="w-8 h-8 mx-auto text-slate-300 mb-2" />
                     <p className="text-sm font-black text-navy uppercase">Belum Ada Produk Terdaftar</p>
                  </div>
                )}
             </div>
          </div>
        </div>
      )}

      {/* Orders flow management */}
      {activeTab === 'orders' && (
        <div className="bg-white rounded-[32px] border border-beige p-8 shadow-sm">
           <div className="pb-4 border-b border-beige mb-6">
              <h3 className="text-lg font-black text-[#1F2937] uppercase">Order & Workflow Alur Sewa</h3>
              <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">Situs Manajemen Sewa (Pipa Alur Konfirmasi Papan Akrilik)</p>
           </div>

           <div className="overflow-x-auto">
             <table className="w-full text-left">
               <thead>
                 <tr className="text-[9px] font-black text-navy/30 uppercase tracking-[0.2em] border-b border-beige">
                   <th className="pb-4">Customer Name</th>
                   <th className="pb-4">Product</th>
                   <th className="pb-4">Pickup Date</th>
                   <th className="pb-4 text-center">Return Date</th>
                   <th className="pb-4 text-center">Payment Status</th>
                   <th className="pb-4 text-right">Order Status</th>
                 </tr>
               </thead>
               <tbody className="divide-y divide-beige text-xs font-bold text-navy">
                 {vendorOrders.map((o) => (
                   <tr key={o.id} className="hover:bg-slate-50/50 transition-colors">
                     <td className="py-4 font-mono font-black text-navy">
                        <div className="font-extrabold uppercase text-[#1F2937]">{o.studentName}</div>
                        <div className="text-[10px] text-[#D4AF37] font-mono">{o.whatsapp}</div>
                     </td>
                     <td className="py-4">
                        <div className="text-xs uppercase font-extrabold">{o.productName}</div>
                        <div className="text-[10px] text-slate-400 font-mono italic mt-0.5 max-w-[140px] truncate">"{o.customText || 'No custom text'}"</div>
                     </td>
                     <td className="py-4">
                        <div className="font-mono text-slate-600 font-bold">{o.pickupDate}</div>
                        <div className="text-[10px] text-slate-400 font-bold">{o.university}</div>
                     </td>
                     <td className="py-4 text-center font-mono text-[10px]">
                        <div className="font-mono text-slate-600 font-bold">{o.returnDate}</div>
                        <div className="text-[9px] text-emerald-600 font-sans">10% Platform Sync</div>
                     </td>
                     <td className="py-4 text-center">
                        <span className={`px-2.5 py-1 rounded-md text-[8px] font-black uppercase tracking-widest border inline-block ${o.status === 'Waiting for Payment' ? 'bg-red-50 border-red-200 text-red-600' : 'bg-emerald-50 border-[#D4AF37]/40 text-[#B8860B]'}`}>
                           {o.status}
                        </span>
                     </td>
                     <td className="py-4 text-right">
                        {nextStatusMap[o.status] ? (
                          <button
                            onClick={() => updateOrderStatus(o.id, nextStatusMap[o.status]!)}
                            className="bg-navy hover:bg-gold hover:text-slate-950 text-white font-black text-[9px] uppercase tracking-widest px-3 py-1.5 rounded-lg shadow-md transition-all flex items-center gap-1.5 ml-auto"
                          >
                             <RefreshCw className="w-3 h-3 text-[#D4AF37] animate-spin" style={{ animationDuration: '4s' }} />
                             {getStatusButtonLabel(o.status)}
                          </button>
                        ) : (
                          <span className="text-[9px] font-black text-emerald-500 uppercase tracking-widest flex items-center justify-end gap-1"><CheckCircle2 className="w-4 h-4" /> Transaksi Selesai</span>
                        )}
                     </td>
                   </tr>
                 ))}
                 {vendorOrders.length === 0 && (
                   <tr>
                     <td colSpan={6} className="py-8 text-center text-slate-400 italic">Pesanan wisuda belum masuk untuk gerai Anda.</td>
                   </tr>
                 )}
               </tbody>
             </table>
           </div>
        </div>
      )}

      {/* Customer Data Tab */}
      {activeTab === 'customers' && (
        <div className="bg-white rounded-[32px] border border-beige p-8 shadow-sm">
          <div className="pb-4 border-b border-beige mb-6">
            <h3 className="text-lg font-black text-navy uppercase">Customer Data (Data Pelanggan)</h3>
            <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">Daftar mahasiswa wisuda yang telah menyewa di gerai Anda</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left font-sans">
              <thead>
                <tr className="text-[9px] font-black text-navy/30 uppercase tracking-[0.2em] border-b border-beige">
                  <th className="pb-4">Nama Pelanggan</th>
                  <th className="pb-4">Universitas</th>
                  <th className="pb-4">No. WhatsApp</th>
                  <th className="pb-4 text-center">Frekuensi Sewa</th>
                  <th className="pb-4 text-center">Terakhir Menyewa</th>
                  <th className="pb-4 text-right">Produk Terakhir</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-beige text-xs font-bold text-navy">
                {uniqueCustomerRecords.map((c, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-4 font-extrabold uppercase text-navy">
                      {c.studentName}
                    </td>
                    <td className="py-4 text-[#0B3D91]">
                      {c.university}
                    </td>
                    <td className="py-4 text-[#D4AF37] font-mono">
                      {c.whatsapp}
                    </td>
                    <td className="py-4 text-center text-slate-500 font-mono">
                      {c.totalOrders} Kali
                    </td>
                    <td className="py-4 text-center font-mono text-[10px] text-slate-400">
                      {c.lastOrderDate}
                    </td>
                    <td className="py-4 text-right text-navy font-bold uppercase text-[11px]">
                      {c.latestProduct}
                    </td>
                  </tr>
                ))}
                {uniqueCustomerRecords.length === 0 && (
                  <tr>
                    <td colSpan={6} className="py-8 text-center text-slate-400 italic font-medium">Belum ada data pelanggan wisudawan terdaftar.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Revenue Report Tab */}
      {activeTab === 'revenue' && (
        <div className="space-y-6">
          <div className="bg-white rounded-[32px] border border-beige p-8 shadow-sm">
            <div className="pb-4 border-b border-beige mb-6">
              <h3 className="text-lg font-black text-navy uppercase">Laporan & Rincian Pendapatan (Revenue Report)</h3>
              <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">Analisis pembagian komisi 10% dengan AkriliGrad</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-slate-50 p-6 rounded-2xl border border-beige">
                <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Gross Revenue (Pendapatan Kotor)</div>
                <div className="text-2xl font-black text-navy">{formatIDR(earningsSum)}</div>
                <p className="text-[10px] text-slate-400 mt-2 font-semibold font-sans">Total nilai sewa dari pesanan terbayar.</p>
              </div>
              <div className="bg-blue-50/50 p-6 rounded-2xl border border-blue-100">
                <div className="text-[9px] font-black text-[#0B3D91] uppercase tracking-widest mb-1">AkriliGrad Commission (Commission 10%)</div>
                <div className="text-2xl font-black text-[#D4AF37]">{formatIDR(earningsSum * 0.1)}</div>
                <p className="text-[10px] text-slate-400 mt-2 font-semibold font-sans">Komisi 10% otomatis yang disetorkan ke platform.</p>
              </div>
              <div className="bg-emerald-50/50 p-6 rounded-2xl border border-emerald-100">
                <div className="text-[9px] font-black text-emerald-700 uppercase tracking-widest mb-1">Net Revenue (Penerimaan Bersih Vendor)</div>
                <div className="text-2xl font-black text-emerald-600">{formatIDR(earningsSum * 0.9)}</div>
                <p className="text-[10px] text-emerald-600/70 mt-2 font-semibold font-sans">Sisa pendapatan setelah dipotong komisi platform.</p>
              </div>
            </div>

            <div className="bg-slate-50 rounded-2xl p-6 border border-beige">
              <h4 className="text-sm font-black text-navy uppercase mb-4">Skema Potongan Langsung Transaksi</h4>
              <div className="space-y-4 text-xs text-slate-600 font-semibold leading-relaxed font-sans">
                <p>
                  Sesuai dengan kebijakan AkriliGrad, vendor dikenai biaya langganan bulanan sebesar <strong className="text-[#0B3D91]">Rp50.000</strong> serta komisi bagi hasil sebesar <strong className="text-[#0B3D91]">10% per transaksi sewa yang sukses</strong>.
                </p>
                <div className="border-t border-beige pt-4">
                  <div className="text-[10px] font-black text-slate-400 uppercase tracking-wider mb-2 font-sans">Rincian Real-Time Aliran Dana Per Transaksi</div>
                  <table className="w-full text-left font-mono text-navy">
                    <thead>
                      <tr className="text-[9px] font-black text-navy/30 uppercase font-sans">
                        <th className="pb-2">ID Booking</th>
                        <th className="pb-2 font-sans">Pemesan</th>
                        <th className="pb-2 font-sans">Nilai Sewa</th>
                        <th className="pb-2 font-sans">Subkomisi Platform (10%)</th>
                        <th className="pb-2 text-right font-bold text-emerald-700 font-sans">Diterima Vendor (90%)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-beige/50 text-xs">
                      {vendorOrders.filter(o => o.status !== 'Waiting for Payment').map((o) => (
                        <tr key={o.id} className="text-xs">
                          <td className="py-2.5 font-mono">{o.id}</td>
                          <td className="py-2.5 font-sans uppercase font-bold">{o.studentName}</td>
                          <td className="py-2.5 font-mono">{formatIDR(o.price)}</td>
                          <td className="py-2.5 font-mono text-[#D4AF37]">{formatIDR(o.price * 0.1)}</td>
                          <td className="py-2.5 text-right font-mono font-bold text-emerald-600">{formatIDR(o.price * 0.9)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Product Modal Overlay */}
      {showAddModal && (
        <div className="fixed inset-0 bg-navy/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-[32px] border border-beige max-w-md w-full p-8 shadow-2xl relative"
          >
             <h3 className="text-xl font-black text-navy uppercase mb-1">Daftarkan Produk Baru</h3>
             <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-6">Tambahkan koleksi akrilik tripod ke etalase</p>

             <form onSubmit={handleCreateProduct} className="space-y-4 text-xs font-bold text-navy">
                <div className="space-y-1">
                   <label className="text-[9px] uppercase text-navy/40 tracking-wider">Nama Standing Akrilik</label>
                   <input 
                     type="text" 
                     required
                     value={newProdName}
                     onChange={e => setNewProdName(e.target.value)}
                     placeholder="Misal: Standing Akrilik Convex Mirror" 
                     className="w-full bg-slate-50 border border-beige p-3 rounded-xl focus:bg-white"
                   />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                     <label className="text-[9px] uppercase text-navy/40 tracking-wider">Tarif Sewa (Rp)</label>
                     <input 
                       type="number" 
                       required
                       value={newProdPrice}
                       onChange={e => setNewProdPrice(e.target.value)}
                       placeholder="150000" 
                       className="w-full bg-slate-50 border border-beige p-3 rounded-xl focus:bg-white"
                     />
                  </div>
                  <div className="space-y-1">
                     <label className="text-[9px] uppercase text-navy/40 tracking-wider">Jumlah Stok Papan</label>
                     <input 
                       type="number" 
                       required
                       value={newProdStock}
                       onChange={e => setNewProdStock(e.target.value)}
                       placeholder="5" 
                       className="w-full bg-slate-50 border border-beige p-3 rounded-xl focus:bg-white"
                     />
                  </div>
                </div>

                <div className="space-y-1">
                   <label className="text-[9px] uppercase text-navy/40 tracking-wider">Deskripsi & Kelengkapan Paket</label>
                   <textarea 
                     rows={3}
                     value={newProdDesc}
                     onChange={e => setNewProdDesc(e.target.value)}
                     placeholder="Paket sewa tripod kayu premium, free custom pita dan bunga kering..." 
                     className="w-full bg-slate-50 border border-beige p-3 rounded-xl focus:bg-white"
                   />
                </div>

                <div className="flex gap-3 pt-4">
                   <button 
                     type="button" 
                     onClick={() => setShowAddModal(false)}
                     className="flex-1 py-3 bg-slate-100 hover:bg-slate-200 text-navy uppercase text-[10px] font-black tracking-widest rounded-xl transition-all"
                   >
                     Batalkan
                   </button>
                   <button 
                     type="submit" 
                     className="flex-1 py-3 bg-gold text-slate-950 uppercase text-[10px] font-black tracking-widest rounded-xl transition-all shadow-md shadow-gold/20"
                   >
                     Simpan Produk
                   </button>
                </div>
             </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}
