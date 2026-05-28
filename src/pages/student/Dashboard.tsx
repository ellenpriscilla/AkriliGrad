import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Package, 
  CheckCircle2, 
  Wallet,
  ArrowUpRight,
  Clock,
  ChevronRight,
  UploadCloud,
  Store,
  Calendar,
  Eye
} from 'lucide-react';
import { useDemoData, Order } from '../../context/DemoContext';

const StatCard = ({ label, value, icon: Icon, color }: { label: string, value: string, icon: any, color: string }) => (
  <div className="bg-white p-6 rounded-[32px] border border-beige shadow-sm flex items-center justify-between group hover:shadow-xl hover:shadow-navy/5 transition-all">
    <div className="space-y-1">
      <div className="text-[10px] font-black text-navy/30 uppercase tracking-[0.2em]">{label}</div>
      <div className="text-3xl font-black text-navy tracking-tighter">{value}</div>
    </div>
    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl shadow-lg ${color} group-hover:scale-110 transition-transform`}>
      <Icon className="w-5 h-5" />
    </div>
  </div>
);

export default function StudentDashboard() {
  const { orders, products, verifyOrderPayment, currentStudent } = useDemoData();
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [uploadProgress, setUploadProgress] = useState<string | null>(null);

  const studentLocalName = currentStudent ? currentStudent.name : 'Ellen Priscilla';

  // Filter orders for the logged-in student (or default Ellen Priscilla)
  const myOrders = orders.filter(o => o.studentName === studentLocalName);

  // Compute metrics
  const activeCount = myOrders.filter(o => o.status !== 'Completed').length;
  const completedCount = myOrders.filter(o => o.status === 'Completed').length;
  const totalSpend = myOrders.reduce((sum, o) => sum + o.price, 0);

  const formatIDR = (num: number) => {
    return `Rp${num.toLocaleString('id-ID')}`;
  };

  const handleSimulatePayment = (orderId: string) => {
    setUploadProgress(orderId);
    setTimeout(() => {
      verifyOrderPayment(orderId);
      setUploadProgress(null);
    }, 1200);
  };

  const getStatusStyle = (status: string) => {
    switch(status) {
      case 'Waiting for Payment':
        return 'bg-amber-50 text-amber-600 border-amber-205';
      case 'Confirmed':
        return 'bg-blue-50 text-blue-600 border-blue-200';
      case 'In Process':
        return 'bg-purple-50 text-purple-600 border-purple-200';
      case 'Ready for Pickup':
        return 'bg-pink-50 text-pink-600 border-pink-200';
      case 'Currently Rented':
        return 'bg-indigo-50 text-indigo-600 border-indigo-200';
      case 'Completed':
        return 'bg-emerald-50 text-emerald-600 border-emerald-200';
      default:
        return 'bg-slate-50 text-slate-600 border-slate-200';
    }
  };

  // Find image helper from catalog products
  const getProductImage = (productId: string) => {
    const prod = products.find(p => p.id === productId);
    return prod ? prod.imageUrl : 'https://images.unsplash.com/photo-1523050853063-880c6934a415?auto=format&fit=crop&q=80&w=200';
  };

  return (
    <div className="space-y-8 text-left">
      {/* Welcome Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-navy/10">
        <div>
          <div className="flex items-center gap-2 mb-1">
             <span className="text-2xl">🎓</span>
             <h1 className="text-3xl font-black text-navy tracking-tight uppercase">Dashboard Mahasiswa</h1>
          </div>
          <p className="text-navy/40 font-black text-[10px] uppercase tracking-widest text-[#D4AF37]">
             Pemesan Aktif: {studentLocalName} • Kampus Bangka Belitong
          </p>
        </div>
        <div className="flex items-center gap-2 text-[10px] font-black text-gold bg-white px-4 py-2 rounded-xl border border-beige shadow-sm uppercase tracking-widest">
           Sewa Papan Akrilik Mandiri
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard label="Pesanan Aktif" value={activeCount.toString()} icon={Package} color="bg-[#0B3D91] text-white" />
        <StatCard label="Pesan Selesai" value={completedCount.toString()} icon={CheckCircle2} color="bg-gold text-slate-950" />
        <StatCard label="Total Pengeluaran" value={formatIDR(totalSpend)} icon={Wallet} color="bg-emerald-500 text-white" />
      </div>

      {/* Main Order Workspace */}
      <div className="grid lg:grid-cols-3 gap-8 items-start">
        {/* Left 2 Columns: Orders Tracker list */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-[40px] border border-beige p-8 shadow-sm">
            <div className="flex items-center justify-between mb-8 border-b border-beige pb-4">
              <div>
                <h2 className="text-xl font-black text-navy tracking-tight uppercase">Daftar Transaksi Saya</h2>
                <p className="text-slate-400 text-[9px] font-bold uppercase tracking-widest">Lacak pengukiran, pembayaran, dan jadwal sewa</p>
              </div>
              <Link to="/student/catalog" className="flex items-center gap-1.5 text-xs text-[#0B3D91] font-black uppercase tracking-wider hover:text-gold transition-colors">
                 Sewa Papan Baru <ArrowUpRight className="w-4 h-4 text-gold" />
              </Link>
            </div>

            {myOrders.length === 0 ? (
              <div className="p-8 text-center border-2 border-dashed border-beige rounded-2xl">
                 <Package className="w-10 h-10 text-slate-300 mx-auto mb-3" />
                 <h4 className="text-xs font-black text-navy uppercase">Belum Ada Persewaan Papan</h4>
                 <p className="text-[11px] text-slate-400 font-medium mt-1">Gunakan tombol 'Sewa Papan Baru' di kanan atas untuk browsing katalog.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {myOrders.map((order) => (
                  <div 
                    key={order.id}
                    onClick={() => setSelectedOrder(order)}
                    className={`flex flex-col sm:flex-row items-center gap-5 p-5 rounded-3xl border transition-all cursor-pointer text-left ${
                      selectedOrder?.id === order.id 
                        ? 'border-[#D4AF37] bg-yellow-50/10 shadow-lg' 
                        : 'border-beige hover:bg-slate-50'
                    }`}
                  >
                    <div className="w-20 h-20 rounded-2xl overflow-hidden border border-beige shrink-0 bg-slate-100">
                      <img 
                        src={getProductImage(order.productId)} 
                        alt={order.productName} 
                        className="w-full h-full object-cover" 
                      />
                    </div>
                    
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[9px] font-black text-slate-400 tracking-wider font-mono">{order.id}</span>
                        <div className="w-1.5 h-1.5 rounded-full bg-gold" />
                        <span className="text-[9px] font-black text-[#0B3D91] uppercase tracking-widest flex items-center gap-1">
                           <Store className="w-3.5 h-3.5" /> {order.vendorName}
                        </span>
                      </div>
                      
                      <h3 className="font-extrabold text-navy text-base tracking-tight uppercase leading-snug">{order.productName}</h3>
                      
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[10px] text-slate-500 font-bold uppercase tracking-wider">
                         <div className="flex items-center gap-1">
                           <Calendar className="w-3.5 h-3.5 text-gold" /> Pinjam: {order.pickupDate}
                         </div>
                         <div>Tarif: <strong className="text-navy">{formatIDR(order.price)}</strong></div>
                      </div>
                    </div>

                    <div className="flex flex-col items-stretch sm:items-end gap-2 shrink-0">
                       <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border text-center ${getStatusStyle(order.status)}`}>
                         {order.status}
                       </span>

                       {order.status === 'Waiting for Payment' && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleSimulatePayment(order.id);
                            }}
                            disabled={uploadProgress === order.id}
                            className="text-[9px] px-3 py-1 bg-amber-500 hover:bg-amber-600 text-white font-black uppercase tracking-widest rounded-lg flex items-center gap-1 transition-all"
                          >
                            {uploadProgress === order.id ? (
                               <span className="animate-pulse">Uploading...</span>
                            ) : (
                               <>
                                 <UploadCloud className="w-3.5 h-3.5" /> Upload Bukti Pembayaran
                               </>
                            )}
                          </button>
                       )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Dynamic Timeline View details */}
        <div>
          <div className="bg-white rounded-[40px] border border-beige p-6 shadow-sm sticky top-24 space-y-6">
            <div className="border-b border-beige pb-4">
               <h3 className="text-sm font-black text-navy uppercase tracking-widest">Detail Pelacakan Papan</h3>
               <p className="text-[10px] text-slate-400 font-semibold uppercase mt-0.5">Pilih salah satu transaksi untuk melihat detail pesanan</p>
            </div>

            {selectedOrder ? (
              <div className="space-y-6 text-xs text-slate-700 font-semibold leading-relaxed">
                 <div className="bg-beige/40 p-4 rounded-2xl border border-gold/10 space-y-2">
                    <div className="text-[9px] text-[#D4AF37] font-black uppercase">Pratinjau Kustom Kelulusan</div>
                    <div className="p-3.5 bg-white rounded-xl border border-beige text-center space-y-1.5 border-l-4 border-l-gold font-mono">
                       <pre className="text-[10px] whitespace-pre-line font-bold text-navy uppercase leading-relaxed font-sans">{selectedOrder.customText}</pre>
                    </div>
                 </div>

                 <div className="space-y-3.5">
                    <div>
                      <div className="text-[9px] uppercase text-slate-400 font-black">Kampus Tujuan:</div>
                      <div className="text-navy font-extrabold">{selectedOrder.university}</div>
                    </div>
                    <div>
                      <div className="text-[9px] uppercase text-slate-400 font-black">Atas Nama Wisudawan:</div>
                      <div className="text-navy font-extrabold">{selectedOrder.graduateName}</div>
                    </div>
                    <div>
                      <div className="text-[9px] uppercase text-slate-400 font-black">Kontak WhatsApp:</div>
                      <div className="text-[#0B3D91] font-black">{selectedOrder.whatsapp}</div>
                    </div>
                    <div>
                      <div className="text-[9px] uppercase text-slate-400 font-black">Jadwal Rental:</div>
                      <div className="text-navy font-extrabold font-mono text-[10px]">
                         Ambil: {selectedOrder.pickupDate} <br />
                         Balik: {selectedOrder.returnDate}
                      </div>
                    </div>
                    <div>
                      <div className="text-[9px] uppercase text-slate-400 font-black">Catatan untuk Vendor:</div>
                      <div className="bg-slate-50 p-2.5 rounded-lg border border-beige italic text-slate-500 font-medium">"{selectedOrder.notes || 'Tidak ada catatan khusus.'}"</div>
                    </div>
                 </div>

                 <div className="pt-4 border-t border-beige">
                    <div className="text-[11px] font-black uppercase text-navy mb-3">Timeline Progress:</div>
                    <div className="space-y-4 relative pl-4 border-l border-beige">
                       {[
                         { step: 'Kirim Pesanan', desc: 'Detail di-input mahasiswa', done: true },
                         { step: 'Lunas', desc: 'Simulasi bayar / verifikasi admin', done: ['Confirmed', 'In Process', 'Ready for Pickup', 'Currently Rented', 'Completed'].includes(selectedOrder.status) },
                         { step: 'Pickup', desc: 'Siap diambil di gerai', done: ['Ready for Pickup', 'Currently Rented', 'Completed'].includes(selectedOrder.status) },
                         { step: 'Selesai', desc: 'Papan telah kembali utuh', done: selectedOrder.status === 'Completed' }
                       ].map((tl, index) => (
                         <div key={index} className="relative space-y-0.5">
                            <div className={`absolute -left-[21px] top-0.5 w-3 h-3 rounded-full border-2 ${tl.done ? 'bg-gold border-gold scale-110 shadow-lg' : 'bg-white border-beige'}`} />
                            <div className={`font-black uppercase text-[10px] ${tl.done ? 'text-navy' : 'text-slate-400'}`}>{tl.step}</div>
                            <div className="text-[9px] text-slate-400 font-semibold leading-none">{tl.desc}</div>
                         </div>
                       ))}
                    </div>
                 </div>
              </div>
            ) : (
              <div className="py-12 text-center text-slate-400">
                 <Eye className="w-10 h-10 text-slate-200 mx-auto mb-3" />
                 <p className="text-xs font-semibold">Klik salah satu baris transaksi untuk menampilkan kustomisasi papan, log timeline, dan detail.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
