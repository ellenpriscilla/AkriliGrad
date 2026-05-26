import React, { useState } from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
} from 'recharts';
import { 
  Users, 
  Store, 
  CreditCard, 
  TrendingUp,
  LayoutDashboard,
  ShieldCheck,
  Zap,
  Target,
  ToggleLeft,
  ToggleRight,
  UserCheck,
  Sparkles,
  AlertTriangle
} from 'lucide-react';
import { useDemoData } from '../../context/DemoContext';

const AdminStat = ({ label, value, diff, icon: Icon, color }: any) => (
  <div className="bg-white p-6 rounded-[32px] border border-beige shadow-sm hover:shadow-xl hover:shadow-navy/5 transition-all space-y-4 text-left">
     <div className="flex items-center justify-between">
        <div className={`p-3 rounded-2xl ${color} bg-opacity-10 text-opacity-100 shadow-sm`}>
           <Icon className="w-5 h-5" />
        </div>
        <div className="text-[10px] font-black tracking-widest uppercase py-1 px-3 rounded-full bg-emerald-50 text-emerald-600">
           {diff}
        </div>
     </div>
     <div>
        <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{label}</div>
        <div className="text-2xl font-black text-navy tracking-tight">{value}</div>
     </div>
  </div>
);

export default function SuperAdminDashboard() {
  const { vendors, orders, metrics, toggleVendorSubscription } = useDemoData();
  const [activeTab, setActiveTab] = useState<'overview' | 'vendors'>('overview');

  // Calculate live platform indicators
  const totalVendorsCount = vendors.length;
  const activeVendorsCount = vendors.filter(v => v.subscriptionStatus === 'ACTIVE').length;
  const totalTransactionsCount = orders.length;

  const mrrValue = activeVendorsCount * 50000; // Rp50.000 / active vendor subscription
  
  // Platform Commission calculated as 10% of order prices
  const commissionRevenueValue = orders
    .filter(o => o.status !== 'Waiting for Payment')
    .reduce((sum, o) => sum + (o.price * 0.1), 0);

  const formatIDR = (num: number) => {
    return `Rp${num.toLocaleString('id-ID')}`;
  };

  const revenueData = [
    { name: 'Jan', value: 45000 },
    { name: 'Feb', value: 90000 },
    { name: 'Mar', value: 120000 },
    { name: 'Apr', value: mrrValue - 20000 },
    { name: 'Mei', value: mrrValue },
  ];

  const transactionData = [
    { name: 'Jan', value: 4 },
    { name: 'Feb', value: 12 },
    { name: 'Mar', value: 19 },
    { name: 'Apr', value: totalTransactionsCount - 2 },
    { name: 'Mei', value: totalTransactionsCount },
  ];

  return (
    <div className="space-y-8 max-w-[1600px] mx-auto text-left">
      {/* Header Panel */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-navy/10">
         <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-[#0B3D91] rounded-2xl flex items-center justify-center text-white shadow-xl shadow-blue-900/10">
               <ShieldCheck className="w-8 h-8 text-[#D4AF37]" />
            </div>
            <div>
               <h1 className="text-3xl font-black text-navy tracking-tight uppercase">Super Admin Hub</h1>
               <p className="text-[#D4AF37] font-black uppercase tracking-widest text-[9px] mt-0.5">Situs Pusat Manajemen SaaS AkriliGrad</p>
            </div>
         </div>
         <div className="flex bg-white p-1 rounded-2xl border border-beige">
            <button 
              onClick={() => setActiveTab('overview')}
              className={`px-5 py-2 rounded-xl font-black text-[9px] uppercase tracking-widest transition-all ${activeTab === 'overview' ? 'bg-navy text-white shadow-lg' : 'text-slate-400 hover:text-navy'}`}
            >
              IKHTISAR GLOBAL
            </button>
            <button 
              onClick={() => setActiveTab('vendors')}
              className={`px-5 py-2 rounded-xl font-black text-[9px] uppercase tracking-widest transition-all ${activeTab === 'vendors' ? 'bg-navy text-white shadow-lg' : 'text-slate-400 hover:text-navy'}`}
            >
              KELOLA LISENSI VENDOR ({totalVendorsCount})
            </button>
         </div>
      </div>

      {activeTab === 'overview' && (
        <div className="space-y-8">
          {/* Top Row stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <AdminStat label="Total Mitra Vendor" value={`${totalVendorsCount} Tenant`} diff="+1 Baru" icon={Store} color="bg-navy text-navy" />
            <AdminStat label="SaaS MRR License" value={formatIDR(mrrValue)} diff="Aktif" icon={Users} color="bg-gold text-gold" />
            <AdminStat label="Transaksi Masuk" value={`${totalTransactionsCount} Rental`} diff="+4 Baru" icon={Zap} color="bg-amber-500 text-amber-600" />
            <AdminStat label="Komisi Platform (10%)" value={formatIDR(commissionRevenueValue)} diff="Real-time" icon={CreditCard} color="bg-emerald-500 text-emerald-600" />
          </div>

          {/* SaaS metrics indicator boxes */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { label: "Biaya Subscription", value: "Rp50.000 /bln per vendor", desc: "Tarif standard non-premium", icon: ShieldCheck },
              { label: "Kompensasi Jasa", value: "10% dari sewa akrilik", desc: "Komisi per transaksi sukses", icon: Sparkles },
              { label: "Vendor Aktif Berlisensi", value: `${activeVendorsCount} / ${totalVendorsCount}`, desc: "Siap melayani mahasiswa", icon: UserCheck },
              { label: "Sisa Kuota Server", value: "98.4% Beroperasi", desc: "Cloud Run Sandbox server", icon: Target },
            ].map((m, i) => (
              <div key={i} className="bg-white p-5 rounded-[24px] border border-beige shadow-sm flex flex-col justify-between hover:bg-slate-50 transition-colors">
                 <div className="flex items-center gap-2 mb-2 text-gold">
                    <m.icon className="w-4 h-4" />
                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{m.label}</span>
                 </div>
                 <div className="text-sm font-extrabold text-navy uppercase">{m.value}</div>
                 <div className="text-[10px] text-slate-400 font-bold mt-1">{m.desc}</div>
              </div>
            ))}
          </div>

          {/* Charts Row */}
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-[40px] border border-beige shadow-sm">
               <div className="flex items-center justify-between mb-8 border-b border-beige pb-4">
                  <h3 className="text-base font-black text-navy uppercase">Pendapatan Subscription Bulanan (MRR)</h3>
                  <div className="w-8 h-8 bg-navy/5 rounded-xl flex items-center justify-center"><TrendingUp className="w-4 h-4 text-navy" /></div>
               </div>
               <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                     <BarChart data={revenueData}>
                        <XAxis dataKey="name" fontSize={9} fontWeight="bold" axisLine={false} tickLine={false} />
                        <Tooltip cursor={{ fill: '#F4EAE1' }} />
                        <Bar dataKey="value" fill="#0B2545" radius={[10,14,0,0]} barSize={35} />
                     </BarChart>
                  </ResponsiveContainer>
               </div>
            </div>

            <div className="bg-navy p-8 rounded-[40px] shadow-2xl">
               <div className="flex items-center justify-between mb-8 text-white border-b border-white/10 pb-4">
                  <h3 className="text-base font-black uppercase text-gold">Volume Transaksi Rental</h3>
                  <div className="w-8 h-8 bg-white/10 rounded-xl flex items-center justify-center"><Zap className="w-4 h-4 text-gold" /></div>
               </div>
               <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                     <LineChart data={transactionData}>
                        <XAxis dataKey="name" fontSize={9} fontWeight="bold" stroke="#fff" axisLine={false} tickLine={false} />
                        <Tooltip contentStyle={{ borderRadius: '12px' }} />
                        <Line type="monotone" dataKey="value" stroke="#D4AF37" strokeWidth={4} dot={{ r: 4 }} />
                     </LineChart>
                  </ResponsiveContainer>
               </div>
            </div>
          </div>
        </div>
      )}

      {/* Vendors Subscription SaaS Management list */}
      {activeTab === 'vendors' && (
        <div className="bg-white rounded-[32px] border border-beige p-8 shadow-sm">
           <div className="pb-4 border-b border-beige mb-6">
              <h3 className="text-lg font-black text-navy uppercase">Kelola Lisensi Kedai Vendor (SaaS)</h3>
              <p className="text-slate-400 text-[10px] font-black uppercase tracking-wider">
                 Sebagai Super Admin, Anda memiliki kontrol penuh atas lisensi Rp50,000/bulan untuk mengakses database persewaan
              </p>
           </div>

           <div className="overflow-x-auto">
              <table className="w-full text-left">
                 <thead>
                    <tr className="text-[9px] font-black text-navy/30 uppercase tracking-[0.2em] border-b border-beige">
                       <th className="pb-4">Nama Vendor / Email</th>
                       <th className="pb-4">Tanggal Gabung</th>
                       <th className="pb-4 text-center">Pesanan Terjawab</th>
                       <th className="pb-4 text-center">Akumulasi Omset</th>
                       <th className="pb-4 text-center">Status Berlangganan SaaS</th>
                       <th className="pb-4 text-right">Opsi Lisensi</th>
                    </tr>
                 </thead>
                 <tbody className="divide-y divide-beige text-xs font-bold text-navy">
                    {vendors.map((vendor) => (
                      <tr key={vendor.id} className="hover:bg-slate-50 transition-colors">
                         <td className="py-5 text-left">
                            <div className="font-extrabold uppercase text-sm">{vendor.name}</div>
                            <div className="text-[10px] text-slate-400 font-medium font-mono">{vendor.email}</div>
                         </td>
                         <td className="py-5 text-left text-slate-400 font-mono text-[10px]">
                            {vendor.joinDate}
                         </td>
                         <td className="py-5 text-center">
                            {vendor.totalOrders} Transaksi
                         </td>
                         <td className="py-5 text-center text-[#0B3D91] font-black">
                            {formatIDR(vendor.totalRevenue)}
                         </td>
                         <td className="py-5 text-center">
                            <span className={`px-3.5 py-1 rounded-full text-[8px] font-black uppercase tracking-widest border inline-block ${vendor.subscriptionStatus === 'ACTIVE' ? 'bg-emerald-50 text-emerald-700 border-emerald-250 border-emerald-200' : 'bg-rose-50 text-rose-700 border-rose-200'}`}>
                               {vendor.subscriptionStatus}
                            </span>
                         </td>
                         <td className="py-5 text-right">
                            <button
                              onClick={() => toggleVendorSubscription(vendor.id)}
                              className={`px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${
                                 vendor.subscriptionStatus === 'ACTIVE'
                                   ? 'bg-rose-50 text-rose-600 hover:bg-rose-100 border border-rose-200'
                                   : 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100 border border-emerald-200'
                              }`}
                            >
                               {vendor.subscriptionStatus === 'ACTIVE' ? 'Suspend Lisensi' : 'Aktifkan Lisensi'}
                            </button>
                         </td>
                      </tr>
                    ))}
                 </tbody>
              </table>
           </div>

           {/* Security note card */}
           <div className="mt-8 bg-yellow-50/50 border border-yellow-100 p-4 rounded-2xl flex gap-3 text-slate-500">
              <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0" />
              <div className="space-y-1">
                 <div className="text-[10px] uppercase font-black text-navy">Catatan Keamanan Sandbox:</div>
                 <p className="text-[11px] font-medium leading-relaxed">
                    Penghentian (Suspend) lisensi di atas secara otomatis akan memblokir rendering portal katalog vendor, produknya tidak akan muncul bagi mahasiswa, dan login dashboard mereka akan menampilkan status kadaluarsa.
                 </p>
              </div>
           </div>
        </div>
      )}
    </div>
  );
}
