import React, { useState } from 'react';
import { 
  Sparkles, 
  MapPin, 
  ShoppingBag, 
  Clock, 
  ChevronRight, 
  Star, 
  CheckCircle2, 
  Menu, 
  X,
  CreditCard,
  LayoutGrid,
  ShieldCheck,
  TrendingUp,
  Camera,
  MessageCircle,
  Database,
  Lock,
  Layers,
  ArrowUpRight,
  HelpCircle,
  AlertTriangle,
  Store
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ onOpenGateway }: { onOpenGateway: () => void }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-md z-40 border-b border-beige">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
            <div className="w-10 h-10 bg-[#0B3D91] rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-blue-900/10">A</div>
            <div>
              <span className="font-black text-2xl tracking-tight text-[#0B3D91] border-b-2 border-[#D4AF37] pb-0.5">AkriliGrad</span>
              <div className="text-[8px] text-[#D4AF37] font-black tracking-widest uppercase">SaaS System Platform</div>
            </div>
          </div>
          
          <div className="hidden md:flex items-center gap-8">
            <a href="#" className="text-[#1F2937] hover:text-[#D4AF37] font-bold transition-colors text-sm uppercase tracking-wider">Home</a>
            <a href="#problems" className="text-[#1F2937] hover:text-[#D4AF37] font-bold transition-colors text-sm uppercase tracking-wider">Masalah Vendor</a>
            <a href="#solutions" className="text-[#1F2937] hover:text-[#D4AF37] font-bold transition-colors text-sm uppercase tracking-wider">Fitur SaaS</a>
            <a href="#katalog" className="text-[#1F2937] hover:text-[#D4AF37] font-bold transition-colors text-sm uppercase tracking-wider">Katalog Contoh</a>
            <a href="#pricing" className="text-[#1F2937] hover:text-[#D4AF37] font-bold transition-colors text-sm uppercase tracking-wider">Pricing</a>
            <a href="#tentang" className="text-[#1F2937] hover:text-[#D4AF37] font-bold transition-colors text-sm uppercase tracking-wider">Tentang Kami</a>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <button 
              onClick={() => navigate('/student/catalog')} 
              className="text-[#0B3D91] font-black text-xs uppercase tracking-widest hover:text-[#D4AF37] transition-colors border-2 border-[#0B3D91]/20 px-4 py-2 rounded-xl"
            >
              Untuk Mahasiswa 🎓
            </button>
            <button 
              onClick={onOpenGateway} 
              className="px-6 py-2.5 bg-[#0B3D91] text-white rounded-xl font-black text-xs uppercase tracking-widest shadow-lg shadow-blue-900/20 hover:brightness-110 transition-all active:scale-[0.98]"
            >
              Masuk Demo Hub
            </button>
          </div>

          <button className="md:hidden text-[#0B3D91]" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-[#0B3D91]/10 p-6 space-y-4 shadow-xl">
          <a href="#" onClick={() => setIsOpen(false)} className="block text-[#1F2937] font-bold text-sm">Home</a>
          <a href="#problems" onClick={() => setIsOpen(false)} className="block text-[#1F2937] font-bold text-sm">Masalah Vendor</a>
          <a href="#solutions" onClick={() => setIsOpen(false)} className="block text-[#1F2937] font-bold text-sm">Fitur SaaS</a>
          <a href="#katalog" onClick={() => setIsOpen(false)} className="block text-[#1F2937] font-bold text-sm">Katalog Contoh</a>
          <a href="#pricing" onClick={() => setIsOpen(false)} className="block text-[#1F2937] font-bold text-sm">Berlangganan & Tarif</a>
          <div className="pt-4 flex flex-col gap-2 border-t border-beige">
            <button 
              onClick={() => { setIsOpen(false); navigate('/student/catalog'); }} 
              className="w-full py-3 text-[#0B3D91] border border-[#0B3D91]/20 rounded-xl font-bold"
            >
              Untuk Mahasiswa 🎓
            </button>
            <button 
              onClick={() => { setIsOpen(false); onOpenGateway(); }} 
              className="w-full py-3 bg-[#0B3D91] text-white rounded-xl font-bold text-xs uppercase tracking-widest"
            >
              Masuk Demo Hub
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

const Hero = ({ onOpenGateway }: { onOpenGateway: () => void }) => {
  const navigate = useNavigate();
  return (
    <section className="pt-36 pb-20 px-4 overflow-hidden bg-gradient-to-br from-[#EAF2FF] via-[#FFFFFF] to-white relative">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">
        <div className="flex-1 space-y-8 text-left">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#EAF2FF] border border-[#0B3D91]/20 rounded-full text-[#0B3D91] text-xs font-black uppercase tracking-wider"
          >
             <Sparkles className="w-4 h-4 text-[#D4AF37]" /> SaaS Platform Khusus Vendor Akrilik Wisuda
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-extrabold tracking-tight text-[#1F2937] leading-tight"
          >
            Sistem Manajemen Digital Bisnis Sewa <span className="text-[#0B3D91]">Papan Akrilik</span> <span className="text-[#D4AF37]">Wisuda</span> di Bangka
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-base text-[#1F2937]/70 leading-relaxed max-w-xl font-medium"
          >
            AkriliGrad adalah ekosistem manajemen berbasis cloud pertama yang membantu vendor lokal di Bangka mendigitalisasi operasional persewaan, memanage stok, melacak jadwal sewa otomatis, serta menyediakan katalog online premium bagi mahasiswa tanpa chat manual WhatsApp!
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <button 
              onClick={onOpenGateway} 
              className="px-10 py-4.5 bg-[#0B3D91] text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-2xl shadow-blue-900/30 hover:brightness-110 transition-all hover:-translate-y-0.5"
            >
              Mulai sebagai Vendor
            </button>
            <button 
              onClick={() => navigate('/student/catalog')} 
              className="px-10 py-4.5 bg-white text-[#1F2937] border-2 border-beige rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-50 transition-all shadow-sm flex items-center justify-center gap-2"
            >
              Lihat Demo Mahasiswa <ArrowUpRight className="w-4 h-4 text-[#D4AF37]" />
            </button>
          </motion.div>
          
          <div className="flex flex-wrap gap-x-8 gap-y-3 pt-8 border-t border-beige">
            {[
              { label: "Dashboard Keuangan", icon: CreditCard },
              { label: "Penjadwalan Otomatis", icon: Clock },
              { label: "Manajemen Produk", icon: LayoutGrid },
              { label: "Komisi 10% Integrasi", icon: ShieldCheck },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="p-1.5 bg-[#EAF2FF] rounded-lg border border-[#0B3D91]/10">
                  <item.icon className="w-3.5 h-3.5 text-[#0B3D91]" />
                </div>
                <span className="text-[10px] font-black text-[#1F2937]/60 uppercase tracking-widest">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex-1 relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="relative z-10"
          >
            <img 
              src="https://images.unsplash.com/photo-1523050853063-880c6934a415?auto=format&fit=crop&q=80&w=800" 
              alt="Acrylic Papan Wisuda SaaS"
              className="w-full rounded-[40px] shadow-2xl shadow-blue-900/10 border-8 border-white"
            />
            
            {/* SaaS Interactive badge */}
            <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-3xl shadow-xl border border-beige z-20">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#EAF2FF] text-[#0B3D91] rounded-2xl flex items-center justify-center">
                  <Database className="w-6 h-6" />
                </div>
                <div className="text-left">
                  <div className="text-sm font-black text-[#1F2937] uppercase tracking-tight">SaaS Cloud Aktif</div>
                  <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Sync Real-time 100%</div>
                </div>
              </div>
            </div>
          </motion.div>
          <div className="absolute -top-20 -right-20 w-80 h-80 bg-[#D4AF37]/10 rounded-full blur-3xl -z-10" />
          <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-[#0B3D91]/5 rounded-full blur-3xl -z-10" />
        </div>
      </div>
    </section>
  );
};

const Problems = () => (
  <section id="problems" className="py-24 px-4 bg-white border-t border-beige">
    <div className="max-w-7xl mx-auto">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="text-[#D4AF37] font-black tracking-widest uppercase text-xs">Masa Lalu Vendor</span>
        <h2 className="text-3xl md:text-5xl font-black text-[#1F2937] mt-3 tracking-tight">
          Masalah Klasik Penyewaan Papan Akrilik Wisuda di Bangka
        </h2>
        <div className="h-1 w-20 bg-[#D4AF37] mx-auto mt-6" />
      </div>
      
      <div className="grid md:grid-cols-5 gap-6">
        {[
          {
            num: "01",
            title: "WhatsApp & IG Manual",
            desc: "Penerimaan pesanan dan tawar-menawar harga masih lewat chat manual, menyebabkan banyak calon customer terabaikan."
          },
          {
            num: "02",
            title: "Tabrakan Jadwal Sewa",
            desc: "Kesulitan mencatat tanggal sewa (pickup & return) antarmahasiswa secara manual di buku sehingga rentan overbooking."
          },
          {
            num: "03",
            title: "Stok Tidak Terlihat",
            desc: "Pelanggan tidak bisa tahu papan mana yang ready atau booked secara langsung tanpa harus menanyakannya satu-persatu."
          },
          {
            num: "04",
            title: "Laporan Keuangan Kacau",
            desc: "Pendapatan, piutang, dan sewa aktif pusing dicatat, menyulitkan pemilik memantau keuntungan murni usaha."
          },
          {
            num: "05",
            title: "Nir Catalog Profesional",
            desc: "Babel vendors kekurangan web katalog canggih dengan dynamic customization formulir nama/gelar mahasiswa wisuda."
          }
        ].map((p, i) => (
          <div key={i} className="bg-red-50/50 p-8 rounded-[32px] border border-red-100 flex flex-col justify-between group hover:border-red-200 hover:bg-red-50 transition-all">
            <div className="text-red-400 font-extrabold text-3xl leading-none">{p.num}</div>
            <div className="mt-8">
              <h3 className="text-base font-black text-[#1F2937] uppercase tracking-tight mb-2 flex items-center gap-1.5 leading-tight">
                <AlertTriangle className="w-4 h-4 text-red-500 shrink-0" /> {p.title}
              </h3>
              <p className="text-slate-600 text-xs leading-relaxed font-semibold">{p.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const Solutions = () => (
  <section id="solutions" className="py-24 px-4 bg-[#EAF2FF]/50 border-t border-beige">
    <div className="max-w-7xl mx-auto">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="text-[#0B3D91] font-black tracking-widest uppercase text-xs">AkriliGrad Solusi</span>
        <h2 className="text-3xl md:text-5xl font-black text-[#1F2937] mt-3 tracking-tight">
          Bagaimana AkriliGrad SaaS Mengubah Bisnis Anda
        </h2>
        <p className="text-[#1F2937]/60 font-medium mt-4">Platform lengkap yang menaruh manajemen sewa papan akrilik di dalam genggaman digital.</p>
        <div className="h-1 w-20 bg-[#0B3D91] mx-auto mt-6" />
      </div>
      
      <div className="grid md:grid-cols-3 gap-8">
        {[
          {
            title: "Katalog Online Instan untuk Vendor",
            desc: "Setiap vendor mendapatkan halaman katalog publik yang didedikasikan sepenuhnya untuk menampilkan model akrilik bulat, oval, mirror, lengkap dengan info stok real-time.",
            icon: ShoppingBag,
            badge: "Vendor Catalog"
          },
          {
            title: "Formulir Kustom Teks Interaktif",
            desc: "Mahasiswa langsung mengisi nama lengkap, gelar akademik, fakultas, WhatsApp, tanggal sewa, serta custom ucapan selamat kelulusan di dalam form checkout interaktif.",
            icon: Sparkles,
            badge: "Student customization"
          },
          {
            title: "Sistem Jadwal Sewa & Status Otomatis",
            desc: "Lacak status dari menunggu pembayaran, dikonfirmasi, diproses, siap diambil, sedang disewa, hingga selesai tanpa ribet. Tidak ada konflik jadwal.",
            icon: Clock,
            badge: "Automated Logging"
          },
          {
            title: "Pelacakan Keuangan & Dashboard Grafik",
            desc: "Visualisasikan pendapatan bulanan, pesanan mingguan, tagihan yang tertunda, dengan grafik interaktif Recharts penunjang performa bisnis yang bersih.",
            icon: TrendingUp,
            badge: "Analytics"
          },
          {
            title: "Verifikasi Pembayaran & Riwayat",
            desc: "Ucapkan selamat tinggal pada struk palsu. Vendor memverifikasi setoran secara sistemik dan melacak histori sewa mahasiswa.",
            icon: CreditCard,
            badge: "Finance Security"
          },
          {
            title: "Server & Storage Database Terkoneksi",
            desc: "Dijalankan sepenuhnya di awan (Cloud Base SaaS). Semua update status pesanan mahasiswa langsung nampak seketika pada layar admin vendor.",
            icon: Database,
            badge: "Cloud SaaS Synced"
          }
        ].map((s, i) => (
          <div key={i} className="p-8 rounded-[40px] bg-white border border-beige hover:shadow-2xl hover:shadow-blue-900/5 transition-all flex flex-col justify-between group relative overflow-hidden">
            <div className="space-y-6">
              <div className="w-14 h-14 bg-[#EAF2FF] rounded-2xl flex items-center justify-center text-[#0B3D91]">
                <s.icon className="w-7 h-7" />
              </div>
              <div>
                <span className="text-[9px] font-black text-[#D4AF37] uppercase tracking-wider">{s.badge}</span>
                <h3 className="text-xl font-black text-[#1F2937] tracking-tight mt-1 mb-3 leading-tight">{s.title}</h3>
                <p className="text-[#1F2937]/60 leading-relaxed text-sm font-semibold">{s.desc}</p>
              </div>
            </div>
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-[#EAF2FF] to-transparent rounded-bl-full -z-10 opacity-50" />
          </div>
        ))}
      </div>
    </div>
  </section>
);

const PopularDesigns = () => (
  <section id="katalog" className="py-24 px-4 bg-white border-t border-beige">
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
      <div>
        <span className="text-[#D4AF37] font-black tracking-widest uppercase text-xs">CONTOH DESAIN BOARD</span>
        <h2 className="text-4xl font-extrabold text-[#1F2937] mt-1">Stok & Desain Akrilik Populer</h2>
        <p className="text-slate-500 font-medium">Bermutu tinggi, premium, dan paling diminati mahasiswa wisudawan Bangka Belitung.</p>
      </div>
      <a href="/student/catalog" className="flex items-center gap-2 text-[#0B3D91] font-black hover:gap-3 transition-all text-sm uppercase tracking-wider">
        Pesan di Katalog Mahasiswa <ChevronRight className="w-5 h-5 text-[#D4AF37]" />
      </a>
    </div>
    
    <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-8">
      {[
        { name: "Standing Akrilik Bulat", price: "Rp 70.000", tag: "Terpopuler", img: "https://images.unsplash.com/photo-1523050853063-880c6934a415?auto=format&fit=crop&q=80&w=400" },
        { name: "Standing Akrilik Konveksi Mirror", price: "Rp 150.000", tag: "Premium Glass", img: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=400" },
        { name: "Standing Akrilik Oval", price: "Rp 100.000", tag: "Best Seller", img: "https://images.unsplash.com/photo-1519311965067-36d3e5f33d39?auto=format&fit=crop&q=80&w=400" },
        { name: "Standing Akrilik Persegi Panjang", price: "Rp 90.000", tag: "Klasik Elegan", img: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=400" },
      ].map((p, i) => (
        <div key={i} className="group bg-white rounded-[32px] border border-beige overflow-hidden shadow-xl shadow-beige/50 hover:-translate-y-2 transition-all">
          <div className="aspect-[4/5] relative overflow-hidden bg-slate-100">
             <img src={p.img} alt={p.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
             <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full shadow-lg text-[9px] font-black uppercase tracking-widest text-[#0B3D91]">
                {p.tag}
             </div>
          </div>
          <div className="p-6">
            <h3 className="font-extrabold text-[#1F2937] text-base mb-1 truncate leading-snug">{p.name}</h3>
            <div className="flex items-center justify-between">
              <div className="text-[#0B3D91] font-black text-lg">{p.price} <span className="text-[10px] text-slate-400 font-bold">/Sewa</span></div>
              <div className="flex items-center gap-1.5 px-2 py-0.5 bg-yellow-50 rounded-lg text-emerald-600 font-black text-[10px]">
                Active
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </section>
);

const Pricing = () => (
  <section id="pricing" className="py-24 px-4 bg-slate-900 text-white relative overflow-hidden">
    <div className="absolute -top-32 -left-32 w-96 h-96 bg-[#0B3D91]/20 rounded-full blur-3xl" />
    <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-3xl" />

    <div className="max-w-7xl mx-auto relative z-10 text-center">
      <div className="max-w-3xl mx-auto mb-16">
        <span className="text-[#D4AF37] font-black tracking-widest uppercase text-xs">MODEL BISNIS SAAS TRANSPARAN</span>
        <h2 className="text-3xl md:text-5xl font-black text-white mt-3 tracking-tight">
          Paket Berlangganan & Komisi AkriliGrad
        </h2>
        <p className="text-slate-400 font-medium mt-4">Kami tumbuh bersama bisnis sewa Anda. Biaya berlangganan terjangkau, dirancang khusus untuk memajukan UKM lokal di Bangka.</p>
        <div className="h-1 w-20 bg-[#D4AF37] mx-auto mt-6" />
      </div>

      <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto items-stretch">
        {/* Vendor subscription card */}
        <div className="bg-slate-800/80 p-10 rounded-[48px] border border-slate-700 flex flex-col justify-between text-left space-y-8 shadow-2xl">
          <div className="space-y-6">
            <div className="inline-block px-3.5 py-1 bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/20 rounded-full text-[10px] font-black uppercase tracking-widest">
              Biaya Bulanan Tetap
            </div>
            <div>
              <h3 className="text-2xl font-black text-white uppercase tracking-tight">Vendor Subscription</h3>
              <p className="text-slate-400 text-xs font-semibold mt-1">Akses penuh ke seluruh sistem manajemen berbasis Cloud Cloud OS.</p>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl md:text-5xl font-black text-white">Rp 50.000</span>
              <span className="text-slate-400 text-sm font-semibold">/ Vendor / Bulan</span>
            </div>
            <div className="h-px bg-slate-700" />
            
            <ul className="space-y-3.5 text-xs text-slate-300 font-semibold">
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Custom Sub-Domain & Katalog Online Profesional</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Upload & Manage Produk Tanpa Batas</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Laporan Grafik Keuangan Bulanan Komprehensif</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Fitur Kalender Jadwal Sewa (Pickup & Return)</span>
              </li>
            </ul>
          </div>
          <button className="w-full py-4.5 bg-[#D4AF37] text-slate-950 font-black rounded-2xl text-xs uppercase tracking-widest shadow-xl shadow-[#D4AF37]/10 hover:brightness-110 active:scale-95 transition-all">
            Daftar Vendor Sekarang
          </button>
        </div>

        {/* Transaction fee card */}
        <div className="bg-[#0B3D91]/30 p-10 rounded-[48px] border border-[#0B3D91]/50 flex flex-col justify-between text-left space-y-8 shadow-2xl relative">
          <div className="absolute top-6 right-6 px-3 py-1 bg-blue-500 text-white rounded-full text-[9px] font-black uppercase tracking-wider">
             Pay-As-You-Earn
          </div>
          <div className="space-y-6">
            <div className="inline-block px-3.5 py-1 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-full text-[10px] font-black uppercase tracking-widest">
              Bagi Hasil Transaksi
            </div>
            <div>
              <h3 className="text-2xl font-black text-white uppercase tracking-tight">Transaction Commission</h3>
              <p className="text-slate-400 text-xs font-semibold mt-1">Hanya dipotong dari transaksi sewa mahasiswa yang berhasil masuk via web.</p>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl md:text-5xl font-black text-white">10%</span>
              <span className="text-slate-400 text-sm font-semibold">/ Per Sewa Transaksi</span>
            </div>
            <div className="h-px bg-[#0B3D91]/65" />
            
            <div className="bg-[#0B3D91]/20 p-5 rounded-2xl border border-[#0B3D91]/40 space-y-2">
              <div className="text-[10px] font-black text-[#D4AF37] uppercase tracking-wider">Mekanisme Simulasi</div>
              <p className="text-[11px] text-slate-300 leading-relaxed font-semibold">
                Jika pelanggan menyewa papan akrilik seharga <span className="text-white font-extrabold">Rp 70.000</span>, maka:
              </p>
              <div className="flex justify-between text-xs text-white/95 pt-1.5 font-bold">
                 <span>Platform Fee (10%):</span>
                 <span className="text-[#D4AF37]">Rp 7.000 (Otomatis)</span>
              </div>
              <div className="flex justify-between text-xs text-white/95 font-bold">
                 <span>Pendapatan Vendor:</span>
                 <span className="text-emerald-400">Rp 63.000 (Transfer)</span>
              </div>
            </div>
            
            <ul className="space-y-3 text-[11px] text-slate-300 font-semibold list-disc pl-4">
              <li>Mencegah pungutan di muka sebelum berhasil menyewakan produk.</li>
              <li>Sistem invoice otomatis untuk mahasiswa.</li>
              <li>Rekonsiliasi transaksi aman & cepat.</li>
            </ul>
          </div>
          <button className="w-full py-4.5 bg-white text-[#0B3D91] font-black rounded-2xl text-xs uppercase tracking-widest hover:bg-slate-50 active:scale-95 transition-all">
            Pelajari Syarat & Ketentuan
          </button>
        </div>
      </div>
    </div>
  </section>
);

const Testimonials = () => (
  <section id="testimoni" className="py-24 px-4 bg-beige border-t border-beige">
    <div className="max-w-7xl mx-auto">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <span className="text-[#0B3D91] font-black tracking-widest uppercase text-xs">TESTIMONI</span>
        <h2 className="text-3xl md:text-5xl font-black text-navy mt-1 tracking-tight">Komentar Mahasiswa Babel</h2>
        <p className="text-slate-500 font-medium">Pengalaman mahasiswa dari berbagai universitas di Bangka.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {[
          { name: "Nadia A.", univ: "Universitas Bangka Belitung", text: "Pemesanan super mudah, pilih desain ngga perlu chat WA bolak-balik. Desain papan bulat AkriliGrad emang estetik and berkelas banget buat wisudaku!" },
          { name: "Rizky M.", univ: "Poltekes Bangka", text: "Sistemnya super rapi. Harganya jelas ngga dimonopoli, and proses pickupnya terjadwal sangat rapi tanpa antrean numpuk." },
          { name: "Sarah K.", univ: "Polman Babel", text: "Gampang banget ngetik custom kata ucapan wisudanya di web, harganya Rp90.000 buat akrilik persegi panjang beneran bersahabat di kantung mahasiswa." },
        ].map((t, i) => (
          <div key={i} className="bg-white p-10 rounded-[40px] shadow-xl shadow-gold/5 border border-white relative">
            <div className="text-gold mb-6">
              <Star className="w-6 h-6 fill-gold inline-block mx-0.5" />
              <Star className="w-6 h-6 fill-gold inline-block mx-0.5" />
              <Star className="w-6 h-6 fill-gold inline-block mx-0.5" />
              <Star className="w-6 h-6 fill-gold inline-block mx-0.5" />
              <Star className="w-6 h-6 fill-gold inline-block mx-0.5" />
            </div>
            <p className="text-[#1F2937]/80 text-base italic leading-relaxed mb-8 font-medium">"{t.text}"</p>
            <div className="flex items-center gap-4 border-t border-slate-100 pt-6">
              <div className="w-12 h-12 bg-[#EAF2FF] rounded-full flex items-center justify-center font-black text-[#0B3D91]">
                {t.name.substring(0,2)}
              </div>
              <div className="text-left">
                <div className="font-extrabold text-[#1F2937]">{t.name}</div>
                <div className="text-[10px] text-[#D4AF37] font-black uppercase tracking-widest">{t.univ}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const AboutUs = () => (
  <section id="tentang" className="py-24 px-4 bg-white border-t border-beige">
    <div className="max-w-7xl mx-auto">
      <div className="grid md:grid-cols-2 gap-16 items-center">
        {/* Left column: Visuals/Illustration or Beautiful Info Card */}
        <div className="space-y-6 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-gold/10 rounded-full border border-gold/20 text-[10px] font-black uppercase text-gold tracking-widest">
            <Sparkles className="w-3.5 h-3.5" /> Mengenai AkriliGrad
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#0B3D91] tracking-tight leading-none uppercase">
            Platform Penyewaan Akrilik Wisuda di Bangka
          </h2>
          <p className="text-slate-600 leading-relaxed text-base font-semibold">
            <strong className="text-[#0B3D91]">AkriliGrad</strong> hadir menjadi solusi teknologi (SaaS) untuk merapikan ekosistem sewa dekorasi papan akrilik wisuda premium pertama and terpercaya di wilayah <strong className="text-[#D4AF37]">Bangka</strong>.
          </p>
          <p className="text-slate-600 leading-relaxed text-sm font-semibold">
            Bukan sekadar satu gerai biasa, AkriliGrad memadukan seluruh UKM vendor akrilik lokal terbaik di Bangka ke dalam platform cloud pintar. Kami menyediakan software inventaris dan pesanan yang andal bagi vendor, serta memudahkan wisudawan memesan akrilik impian tanpa bising nego chat manual.
          </p>
          
          <div className="flex flex-wrap gap-4 pt-4">
            <a 
              href="https://wa.me/6282112345678" 
              target="_blank" 
              rel="noreferrer"
              className="inline-flex items-center gap-3 px-6 py-4 bg-[#0B3D91] text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-blue-900/10 hover:bg-[#D4AF37] hover:text-slate-950 transition-all hover:-translate-y-1"
            >
              <MessageCircle className="w-5 h-5" /> Chat WA Admin
            </a>
            <a 
              href="https://instagram.com/akriligrad" 
              target="_blank" 
              rel="noreferrer"
              className="inline-flex items-center gap-3 px-6 py-4 bg-white border border-beige text-[#0B3D91] rounded-2xl font-black text-xs uppercase tracking-widest hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all hover:-translate-y-1 hover:shadow-lg shadow-gold/5"
            >
              <Camera className="w-5 h-5" /> Instagram: @akriligrad
            </a>
          </div>
        </div>

        {/* Right column: Highlights and Local Connection */}
        <div className="bg-[#EAF2FF] rounded-[48px] p-10 md:p-12 border border-white shadow-2xl relative overflow-hidden text-left">
          <div className="absolute top-0 right-0 w-40 h-40 bg-[#D4AF37]/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl" />
          <h3 className="text-2xl font-extrabold text-[#0B3D91] uppercase mb-8 tracking-tight">Keuntungan Untuk Vendor</h3>
          <div className="space-y-8">
            {[
              { 
                title: "Khusus Wilayah Bangka", 
                desc: "Fokus mendongkrak omzet vendor lokal di Universitas Bangka Belitung, Poltekes Bangka, Polman Babel, dll.",
                icon: MapPin 
              },
              { 
                title: "Software SaaS Cloud Mandiri", 
                desc: "Kelola pesanan, verifikasi pembayaran dengan komisi 10% aman dan data pelanggan yang rapi.",
                icon: Database 
              },
              { 
                title: "Tanpa Konflik Jadwal", 
                desc: "Sistem mengontrol ketersediaan tanggal pickup/return otomatis sehingga tidak ada lagi papan tertukar.",
                icon: Clock 
              }
            ].map((item, i) => (
              <div key={i} className="flex gap-4 items-start">
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-[#D4AF37] shadow-md shrink-0 border border-gold/10">
                  <item.icon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-[#1F2937] text-lg mb-1 leading-snug">{item.title}</h4>
                  <p className="text-[#1F2937]/60 text-xs font-semibold leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="bg-slate-950 text-white pt-24 pb-12 px-4 border-t border-slate-900 text-left">
    <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12 mb-20">
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-gold rounded-xl flex items-center justify-center text-slate-950 font-bold text-xl">A</div>
          <span className="font-black text-2xl tracking-tight text-white border-b-2 border-[#D4AF37] pb-1">AkriliGrad</span>
        </div>
        <p className="text-white/60 leading-relaxed font-semibold text-sm">
          SaaS platform manajemen persewaan papan akrilik wisuda premium, terjadwal, digital dan terintegrasi di Pulau Bangka.
        </p>
        <div className="flex gap-4">
          <a href="https://instagram.com/akriligrad" target="_blank" rel="noreferrer" className="w-10 h-10 bg-white/5 rounded-full hover:bg-gold hover:text-slate-950 transition-all flex items-center justify-center cursor-pointer">
            <Camera className="w-5 h-5" />
          </a>
          <a href="https://wa.me/6282112345678" target="_blank" rel="noreferrer" className="w-10 h-10 bg-white/5 rounded-full hover:bg-gold hover:text-slate-950 transition-all flex items-center justify-center cursor-pointer">
            <MessageCircle className="w-5 h-5" />
          </a>
        </div>
      </div>
      
      <div>
        <h4 className="font-bold text-sm mb-8 text-[#D4AF37] uppercase tracking-widest">AkriliGrad Menu</h4>
        <div className="space-y-4">
           {['Home', 'Problems', 'Fitur Solutions', 'Katalog Contoh', 'Pricing'].map(item => (
             <a 
               key={item} 
               href={item === 'Home' ? '#' : `#${item.toLowerCase().replace(' ', '-')}`} 
               className="block text-white/60 hover:text-gold transition-colors font-semibold text-sm"
             >
               {item}
             </a>
           ))}
        </div>
      </div>

      <div>
        <h4 className="font-bold text-sm mb-8 text-[#D4AF37] uppercase tracking-widest">SaaS Subscription</h4>
        <div className="space-y-4">
           {['Registrasi Vendor', 'Ketentuan Komisi 10%', 'Sewa Demo Mahasiswa', 'Kebijakan Privasi'].map(item => (
             <a key={item} href="#" className="block text-white/60 hover:text-gold transition-colors font-semibold text-sm">{item}</a>
           ))}
        </div>
      </div>

      <div className="space-y-6">
        <h4 className="font-bold text-sm mb-4 text-[#D4AF37] uppercase tracking-widest">News & Babel UKM Info</h4>
        <p className="text-xs text-white/60 font-medium leading-relaxed">Dapatkan pembaruan sistem SaaS reguler & fitur AI template ucapan graduation.</p>
        <div className="flex gap-2 p-1.5 bg-white/5 rounded-2xl border border-white/10">
          <input type="email" placeholder="Email vendor" className="bg-transparent border-none outline-none flex-1 px-4 text-xs" />
          <button className="bg-gold text-slate-950 px-6 py-2 rounded-xl text-xs font-black uppercase tracking-widest shadow-lg shadow-gold/20">Daftar</button>
        </div>
      </div>
    </div>
    
    <div className="max-w-7xl mx-auto pt-12 border-t border-white/5 text-center text-white/20 text-[10px] font-bold uppercase tracking-[0.2em]">
      &copy; 2026 AkriliGrad SaaS. All rights reserved. Platform Mitra Vendor Bangka.
    </div>
  </footer>
);

export default function LandingPage() {
  const [showGateway, setShowGateway] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen font-sans bg-white selection:bg-[#D4AF37]/30 selection:text-slate-950">
      <Navbar onOpenGateway={() => setShowGateway(true)} />
      <Hero onOpenGateway={() => setShowGateway(true)} />
      <Problems />
      <Solutions />
      <PopularDesigns />
      <Pricing />
      <Testimonials />
      <AboutUs />
      <Footer />

      {/* Modern Gateway Dialog */}
      <AnimatePresence>
        {showGateway && (
          <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-[40px] border-2 border-[#D4AF37]/30 p-8 md:p-10 max-w-2xl w-full shadow-2xl relative"
            >
              <button 
                onClick={() => setShowGateway(false)}
                className="absolute top-6 right-6 p-2 text-slate-400 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="text-center mb-8 space-y-2">
                <span className="text-[#D4AF37] font-black text-[10px] uppercase tracking-widest">SaaS Login Simulation</span>
                <h3 className="text-3xl font-extrabold text-[#1F2937] uppercase">Pilih Peran Simulasi</h3>
                <p className="text-slate-500 font-semibold text-xs max-w-md mx-auto leading-relaxed">
                  Lecturer / Tester can switch roles in one click. Simulated data is synchronized instantly.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                {/* Option 1: Student */}
                <button
                  onClick={() => {
                    setShowGateway(false);
                    navigate('/student/catalog');
                  }}
                  className="p-6 rounded-3xl border border-beige hover:border-[#D4AF37] bg-slate-50 hover:bg-gold/5 text-center flex flex-col items-center justify-between group transition-all hover:-translate-y-1 shadow-sm"
                >
                  <div className="w-12 h-12 bg-[#EAF2FF] text-[#0B3D91] rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <ShoppingBag className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-[#1F2937] text-sm uppercase">1. Mahasiswa</h4>
                    <p className="text-[10px] text-slate-500 font-semibold mt-1 leading-snug">Browse katalog, custom teks wisuda, checkout.</p>
                  </div>
                </button>

                {/* Option 2: Vendor */}
                <button
                  onClick={() => {
                    setShowGateway(false);
                    navigate('/vendor/dashboard');
                  }}
                  className="p-6 rounded-3xl border border-[#0B3D91]/20 hover:border-[#0B3D91] bg-[#0B3D91]/5 hover:bg-blue-50 text-center flex flex-col items-center justify-between group transition-all hover:-translate-y-1 shadow-sm"
                >
                  <div className="w-12 h-12 bg-blue-100 text-[#0B3D91] rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Store className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-[#0B3D91] text-sm uppercase">2. Vendor Panel</h4>
                    <p className="text-[10px] text-slate-500 font-semibold mt-1 leading-snug">Kelola stok papan, status sewa, tagihan, kalender.</p>
                  </div>
                </button>

                {/* Option 3: Super Admin */}
                <button
                  onClick={() => {
                    setShowGateway(false);
                    navigate('/admin/dashboard');
                  }}
                  className="p-6 rounded-3xl border border-gold/40 hover:border-[#D4AF37] bg-yellow-50/50 hover:bg-amber-50 text-center flex flex-col items-center justify-between group transition-all hover:-translate-y-1 shadow-sm"
                >
                  <div className="w-12 h-12 bg-amber-100 text-amber-700 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <ShieldCheck className="w-6 h-6 text-[#D4AF37]" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-amber-800 text-sm uppercase">3. Platform Owner</h4>
                    <p className="text-[10px] text-slate-500 font-semibold mt-1 leading-snug">MRR sub, total fee komisi 10% terhitung otomatis.</p>
                  </div>
                </button>
              </div>

              <div className="text-center mt-8 text-[10px] uppercase tracking-widest text-slate-400 font-bold border-t border-slate-100 pt-6">
                 Simulasi Aktif • AkriliGrad SaaS Bangka 2026
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
