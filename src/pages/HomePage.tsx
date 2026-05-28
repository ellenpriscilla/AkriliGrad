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
  Store,
  Mail
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { AkriliGradLogo } from '../components/AkriliGradLogo';

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="absolute top-0 left-0 right-0 bg-transparent z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/')}>
            <AkriliGradLogo textColor="none" size={42} className="-my-1" />
            <span className="font-black text-2xl tracking-tight text-[#0B3D91] border-b-2 border-[#D4AF37] pb-0.5">AkriliGrad</span>
          </div>
        </div>
      </div>
    </nav>
  );
};

const Hero = ({ 
  onOpenGateway
}: { 
  onOpenGateway: () => void;
}) => {
  const navigate = useNavigate();
  return (
    <section className="pt-24 pb-20 px-4 overflow-hidden relative">
      {/* Premium Background Image with Elegant Glass Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('https://img.lazcdn.com/g/p/6ed6912d650dc4e69f909d12a95061cd.jpg_960x960q80.jpg_.webp')" }}
      />
      <div className="absolute inset-0 bg-white/85 backdrop-blur-[2px]" />
      
      <div className="max-w-4xl mx-auto text-center flex flex-col items-center space-y-7 relative z-10">
        
        <motion.h1 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-6xl font-extrabold tracking-tight text-[#1F2937] leading-tight text-center"
        >
          AkriliGrad — <span className="text-[#D4AF37]">Platform for Graduation Acrylic Board</span> Rental Vendors
        </motion.h1>
         
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-base text-[#1F2937]/75 leading-relaxed max-w-2xl font-medium text-center"
        >
          Manage rental orders, product catalogs, schedules, customers, and revenue in one simple cloud-based system.
        </motion.p>
        
        <div className="flex flex-col items-center gap-4.5 w-full">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full sm:w-auto"
          >
            <button 
              type="button"
              onClick={onOpenGateway} 
              className="w-full sm:w-auto px-10 py-4.5 bg-[#0B3D91] hover:bg-[#D4AF37] text-white hover:text-slate-950 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-blue-900/20 transition-all hover:-translate-y-0.5 active:scale-95 pointer-events-auto flex items-center justify-center gap-2 cursor-pointer"
            >
              Select Demo Role 🎓
            </button>
          </motion.div>
        </div>
        
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 pt-8 border-t border-[#FFF8E7] w-full">
          {[
            { label: "Digital Catalog", icon: ShoppingBag },
            { label: "Automatic Schedule", icon: Clock },
            { label: "Product Management", icon: LayoutGrid },
            { label: "Safe Commission Sync", icon: ShieldCheck },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className="p-1.5 bg-[#FFF8E7] rounded-lg border border-[#D4AF37]/20">
                <item.icon className="w-3.5 h-3.5 text-[#D4AF37]" />
              </div>
              <span className="text-[10px] font-black text-[#1F2937]/60 uppercase tracking-widest">{item.label}</span>
            </div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="w-full max-w-3xl pt-6 relative"
        >
          <p className="font-elegant font-light italic text-slate-700 text-lg md:text-2xl lg:text-[26px] tracking-wide text-center leading-relaxed">
            “Platform pemesanan papan akrilik wisuda yang praktis, cepat, dan terorganisir dalam satu aplikasi.”
          </p>
        </motion.div>
      </div>
      <div className="absolute -top-20 -right-20 w-80 h-80 bg-[#D4AF37]/10 rounded-full blur-3xl" />
      <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-[#FFF8E7]/40 rounded-full blur-3xl" />
    </section>
  );
};

const Problems = () => (
  <section id="problems" className="py-24 px-4 bg-[#F5F5F5] border-t border-[#FFF8E7]">
    <div className="max-w-7xl mx-auto">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="text-[#D4AF37] font-black tracking-widest uppercase text-xs">Vendor Problems</span>
        <h2 className="text-3xl md:text-5xl font-black text-[#1F2937] mt-3 tracking-tight">
          3 Masalah Klasik Penyewaan Papan Akrilik Wisuda
        </h2>
        <div className="h-1 w-20 bg-[#D4AF37] mx-auto mt-6" />
      </div>
      
      <div className="grid md:grid-cols-3 gap-8">
        {[
          {
            num: "01",
            title: "Pemesanan manual lewat WhatsApp atau Instagram",
            desc: "Penerimaan pesanan dan konfirmasi desain manual lewat chat sangat memakan waktu, sering miskomunikasi, and pembeli rawan kabur sebelum deal."
          },
          {
            num: "02",
            title: "Manajemen jadwal sewa yang sulit",
            desc: "Sangat sulit melacak tanggal sewa (pickup & return) antarmahasiswa secara manual di buku sehingga rentan terjadi overbooking atau papan tertukar."
          },
          {
            num: "03",
            title: "Data pelanggan, pembayaran, dan keuangan tidak terorganisir",
            desc: "Pencatatan keuangan yang acak-acakan menyulitkan vendor melihat keuntungan bersih, piutang sewa wisudawan, hingga performa produk pilar."
          }
        ].map((p, i) => (
          <div key={i} className="bg-white p-8 rounded-[32px] border border-[#FFF8E7] flex flex-col justify-between shadow-sm group hover:border-[#D4AF37] hover:shadow-md transition-all">
            <div className="text-[#D4AF37] font-extrabold text-3xl leading-none">{p.num}</div>
            <div className="mt-8">
              <h3 className="text-base font-black text-[#1F2937] uppercase tracking-tight mb-2 flex items-center gap-1.5 leading-tight">
                <AlertTriangle className="w-4 h-4 text-[#D4AF37] shrink-0" /> {p.title}
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
  <section id="solutions" className="py-24 px-4 bg-white border-t border-[#FFF8E7]">
    <div className="max-w-7xl mx-auto">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="text-[#B8860B] font-black tracking-widest uppercase text-xs">AkriliGrad Solutions</span>
        <h2 className="text-3xl md:text-5xl font-black text-[#1F2937] mt-3 tracking-tight">
          3 Solusi Digital Unggulan dari AkriliGrad
        </h2>
        <p className="text-[#1F2937]/60 font-medium mt-4">Sistem awan mandiri yang didesain khusus mempercepat kemajuan bisnis rental akrilik wisuda Anda.</p>
        <div className="h-1 w-20 bg-[#D4AF37] mx-auto mt-6" />
      </div>
      
      <div className="grid md:grid-cols-3 gap-8">
        {[
          {
            title: "Manajemen pesanan digital",
            desc: "Mahasiswa langsung memilih model papan, mengisi custom teks wisuda secara interaktif, and memesan secara mandiri di halaman katalog digital vendor.",
            icon: ShoppingBag,
            badge: "Katalog Dinamis & Formulir Kustom"
          },
          {
            title: "Pelacakan jadwal sewa otomatis",
            desc: "Sistem cerdas melacak jadwal masuk dan keluar sewa secara otomatis di kalender terintegrasi, mencegah tabrakan pemesanan antarmahasiswa.",
            icon: Clock,
            badge: "Bebas Catatan Kalender Manual"
          },
          {
            title: "Dasbor pendapatan praktis",
            desc: "Dashboard keuangan canggih dan sederhana untuk memantau pendapatan kotor, setoran komisi platform, pendeteksi tagihan tertunda, dan omzet bersih real-time.",
            icon: TrendingUp,
            badge: "Analisis Pendapatan Transparan"
          }
        ].map((s, i) => (
          <div key={i} className="p-8 rounded-[40px] bg-[#FFF8E7]/30 border border-[#FFF8E7] hover:border-[#D4AF37] hover:shadow-xl transition-all flex flex-col justify-between group relative overflow-hidden">
            <div className="space-y-6">
              <div className="w-14 h-14 bg-[#FFF8E7] rounded-2xl flex items-center justify-center text-[#D4AF37]">
                <s.icon className="w-7 h-7" />
              </div>
              <div>
                <span className="text-[9px] font-black text-[#B8860B] uppercase tracking-wider">{s.badge}</span>
                <h3 className="text-xl font-black text-[#1F2937] tracking-tight mt-1 mb-3 leading-tight uppercase">{s.title}</h3>
                <p className="text-[#1F2937]/75 leading-relaxed text-sm font-semibold">{s.desc}</p>
              </div>
            </div>
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-[#FFF8E7] to-transparent rounded-bl-full -z-10 opacity-50" />
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
        { name: "Standing Akrilik Bulat", price: "Rp 70.000", tag: "Terpopuler", img: "https://media.karousell.com/media/photos/products/2024/6/19/paket_usaha_papan_akrilik_1718797062_1b65e9df_progressive.jpg" },
        { name: "Standing Akrilik Convex Mirror", price: "Rp 150.000", tag: "Premium Glass", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4ZoU_YA5xJmwu6IQI73g1LgO4WMn204LMaw&s" },
        { name: "Standing Akrilik Oval", price: "Rp 100.000", tag: "Best Seller", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTgDfzSYaudj2IhSdlvjWTFYWEIbMGisY6Cg&s" },
        { name: "Standing Akrilik Persegi Panjang", price: "Rp 90.000", tag: "Klasik Elegan", img: "https://floristnasional.com/wp-content/uploads/2025/08/Bunga-Papan-Akrilik-Bandung-FNPAB-007-640x640.jpg-1-430x430.png.webp" },
      ].map((p, i) => (
        <div key={i} className="group bg-white rounded-[32px] border border-beige overflow-hidden shadow-xl shadow-beige/50 hover:-translate-y-2 transition-all">
          <div className="aspect-[4/5] relative overflow-hidden bg-slate-100">
             <img 
               src={p.img} 
               alt={p.name} 
               className={`w-full h-full object-cover transition-transform duration-700 ${
                 p.name.includes('Persegi Panjang') 
                   ? 'origin-top scale-[1.18] group-hover:scale-[1.24]' 
                   : 'group-hover:scale-110'
               }`} 
             />
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

const Pricing = ({ 
  onOpenRegister,
  onOpenTerms
}: { 
  onOpenRegister: () => void;
  onOpenTerms: () => void;
}) => (
  <section id="pricing" className="py-24 px-4 bg-slate-900 text-white relative overflow-hidden">
    <div className="absolute -top-32 -left-32 w-96 h-96 bg-[#0B3D91]/20 rounded-full blur-3xl" />
    <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-3xl" />

    <div className="max-w-7xl mx-auto relative z-10 text-center">
      <div className="max-w-3xl mx-auto mb-16">
        <span className="text-[#D4AF37] font-black tracking-widest uppercase text-xs">MODEL BISNIS TRANSPARAN</span>
        <h2 className="text-3xl md:text-5xl font-black text-white mt-3 tracking-tight">
          Paket Berlangganan & Komisi AkriliGrad
        </h2>
        <p className="text-slate-400 font-medium mt-4">Kami tumbuh bersama bisnis sewa Anda. Biaya berlangganan terjangkau, dirancang khusus untuk memajukan UKM lokal di Bangka.</p>
        <div className="h-1 w-20 bg-[#D4AF37] mx-auto mt-6" />
      </div>

      <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto items-stretch">
        {/* Vendor subscription card */}
        <div id="vendor-subscription" className="bg-slate-800/80 p-10 rounded-[48px] border border-slate-700 flex flex-col justify-between text-left space-y-8 shadow-2xl">
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
          <button 
            type="button"
            onClick={onOpenRegister}
            className="w-full py-4 mt-4 bg-[#D4AF37] hover:bg-[#B8860B] text-slate-950 font-black rounded-2xl text-xs uppercase tracking-widest shadow-xl shadow-[#D4AF37]/20 transition-all text-center cursor-pointer pointer-events-auto"
          >
            Daftar Sekarang 🤝
          </button>
        </div>

        {/* Transaction fee card */}
        <div id="transaction-commission" className="bg-[#0B3D91]/30 p-10 rounded-[48px] border border-[#0B3D91]/50 flex flex-col justify-between text-left space-y-8 shadow-2xl relative">
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
              <div className="text-[10px] font-black text-[#D4AF37] uppercase tracking-wider">Mekanisme Perhitungan</div>
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
          <button 
            type="button"
            onClick={onOpenTerms}
            className="w-full py-4 mt-4 bg-[#0B3D91] hover:bg-[#D4AF37]/80 text-white hover:text-slate-950 font-black rounded-2xl text-xs uppercase tracking-widest shadow-xl shadow-blue-900/20 transition-all text-center cursor-pointer pointer-events-auto"
          >
            Pelajari Syarat & Ketentuan 📋
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
            <strong className="text-[#0B3D91]">AkriliGrad</strong> hadir menjadi solusi teknologi untuk merapikan ekosistem sewa dekorasi papan akrilik wisuda premium pertama and terpercaya di wilayah <strong className="text-[#D4AF37]">Bangka</strong>.
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
                title: "Software Cloud Mandiri", 
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
        <div className="flex items-center gap-3">
          <AkriliGradLogo textColor="none" size={56} className="items-start drop-shadow-md" />
          <div className="flex flex-col text-left">
            <div className="font-sans tracking-tight leading-none">
              <span className="text-2xl font-black text-white">Akrili</span>
              <span className="text-2xl font-black text-[#D4AF37]">Grad</span>
            </div>
          </div>
        </div>
        <p className="text-white/60 leading-relaxed font-semibold text-sm">
          Platform manajemen persewaan papan akrilik wisuda premium, terjadwal, digital dan terintegrasi di Pulau Bangka.
        </p>
      </div>
      
      <div>
        <h4 className="font-bold text-sm mb-8 text-[#D4AF37] uppercase tracking-widest">AkriliGrad Menu</h4>
        <div className="space-y-4">
           {['Home', 'Problems', 'Fitur Solutions', 'Katalog Contoh', 'Pricing'].map(item => {
             let href = '#';
             if (item === 'Problems') href = '#problems';
             if (item === 'Fitur Solutions') href = '#solutions';
             if (item === 'Katalog Contoh') href = '#katalog';
             if (item === 'Pricing') href = '#pricing';
             return (
               <a 
                 key={item} 
                 href={href} 
                 className="block text-white/60 hover:text-gold transition-colors font-semibold text-sm"
               >
                 {item}
               </a>
             );
           })}
        </div>
      </div>

      <div>
        <h4 className="font-bold text-sm mb-8 text-[#D4AF37] uppercase tracking-widest">Subscription</h4>
        <div className="space-y-4">
          <a href="#vendor-subscription" className="block text-white/60 hover:text-gold transition-colors font-semibold text-sm">Registrasi Vendor</a>
          <a href="/student/catalog" className="block text-white/60 hover:text-gold transition-colors font-semibold text-sm">Lihat Demo Mahasiswa</a>
          <a href="#transaction-commission" className="block text-white/60 hover:text-gold transition-colors font-semibold text-sm">Kebijakan Privasi</a>
        </div>
      </div>

      <div className="space-y-6">
        <h4 className="font-bold text-sm mb-4 text-[#D4AF37] uppercase tracking-widest">Media Sosial AkriliGrad</h4>
        <p className="text-xs text-white/60 font-medium leading-relaxed">Dapatkan pembaruan sistem reguler & fitur AI template ucapan graduation.</p>
        <div className="flex gap-4">
          <a href="https://wa.me/6282112345678" target="_blank" rel="noreferrer" className="w-12 h-12 bg-white/5 hover:bg-[#D4AF37] hover:text-slate-950 transition-all rounded-full flex items-center justify-center cursor-pointer border border-white/10 hover:border-[#D4AF37]">
            <MessageCircle className="w-6 h-6" />
          </a>
          <a href="https://instagram.com/akriligrad" target="_blank" rel="noreferrer" className="w-12 h-12 bg-white/5 hover:bg-[#D4AF37] hover:text-slate-950 transition-all rounded-full flex items-center justify-center cursor-pointer border border-white/10 hover:border-[#D4AF37]">
            <Camera className="w-6 h-6" />
          </a>
        </div>
      </div>
    </div>
    
    <div className="max-w-7xl mx-auto pt-12 border-t border-white/5 text-center text-white/20 text-[10px] font-bold uppercase tracking-[0.2em]">
      &copy; 2026 AkriliGrad. All rights reserved. Platform Mitra Vendor Bangka.
    </div>
  </footer>
);

export default function HomePage() {
  const [showGateway, setShowGateway] = useState(false);
  const [showVendorRegister, setShowVendorRegister] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  
  const [vendorName, setVendorName] = useState('');
  const [vendorEmail, setVendorEmail] = useState('');
  const [vendorPassword, setVendorPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [registerSuccess, setRegisterSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [registerStep, setRegisterStep] = useState<'info' | 'payment'>('info');
  const [paymentMethod, setPaymentMethod] = useState<'qris' | 'transfer'>('qris');

  const navigate = useNavigate();

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!vendorName.trim() || !vendorEmail.trim() || !vendorPassword.trim()) {
      setErrorMsg('Semua kolom pendaftaran wajib diisi secara lengkap.');
      return;
    }
    setErrorMsg('');
    setRegisterStep('payment');
  };

  const handleConfirmPayment = () => {
    setErrorMsg('');
    setIsRegistering(true);
    
    // Simulate premium cloud-registration process with 50rb payment processing
    setTimeout(() => {
      setIsRegistering(false);
      setRegisterSuccess(true);
      
      // Navigate to dashboard after success feedback
      setTimeout(() => {
        setShowVendorRegister(false);
        setRegisterStep('info');
        navigate('/vendor/dashboard');
      }, 1500);
    }, 1500);
  };

  return (
    <div className="min-h-screen font-sans bg-white selection:bg-[#D4AF37]/30 selection:text-slate-950 overflow-x-hidden w-full relative">
      <Navbar />
      <Hero onOpenGateway={() => setShowGateway(true)} />
      <Problems />
      <Solutions />
      <PopularDesigns />
      <Pricing onOpenRegister={() => setShowVendorRegister(true)} onOpenTerms={() => setShowTerms(true)} />
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
                <span className="text-[#D4AF37] font-black text-[10px] uppercase tracking-widest font-mono">Demo Role Selection</span>
                <h3 className="text-3xl font-extrabold text-[#1F2937] uppercase">Pilih Peran Demo</h3>
                <p className="text-slate-500 font-semibold text-xs max-w-md mx-auto leading-relaxed">
                  Lecturer / Tester can switch roles in one click. Data is synchronized instantly.
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

              <div className="text-center mt-6 border-t border-slate-100 pt-6">
                <button
                  type="button"
                  onClick={() => {
                    setShowGateway(false);
                    setShowVendorRegister(true);
                  }}
                  className="text-xs font-black text-[#0B3D91] hover:text-[#D4AF37] transition-all uppercase tracking-wider underline cursor-pointer"
                >
                  Belum Punya Akun? Registrasi Vendor Baru 🤝
                </button>
              </div>

              <div className="text-center mt-4 text-[10px] uppercase tracking-widest text-slate-400 font-bold">
                 Sistem Aktif • AkriliGrad Bangka 2026
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Vendor Registration Modal */}
      <AnimatePresence>
        {showVendorRegister && (
          <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-[40px] border-2 border-[#D4AF37]/30 p-8 md:p-10 max-w-md w-full shadow-2xl relative overflow-hidden"
            >
              {/* Gold light circle accent */}
              <div className="absolute -top-12 -right-12 w-24 h-24 bg-[#D4AF37]/10 rounded-full blur-xl" />

              <button 
                type="button"
                onClick={() => {
                  if (!isRegistering && !registerSuccess) {
                    setShowVendorRegister(false);
                    setVendorName('');
                    setVendorPassword('');
                    setErrorMsg('');
                    setRegisterStep('info');
                  }
                }}
                disabled={isRegistering || registerSuccess}
                className="absolute top-6 right-6 p-2 text-slate-400 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-full transition-colors disabled:opacity-55"
              >
                <X className="w-5 h-5" />
              </button>

              {registerSuccess ? (
                <div className="text-center py-8 space-y-4">
                  <div className="w-16 h-16 bg-emerald-100 border border-emerald-300 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <span className="text-[#D4AF37] font-black text-[10px] uppercase tracking-widest font-mono">REGISTRASI BERHASIL</span>
                  <h3 className="text-2xl font-extrabold text-[#1F2937] uppercase">Selamat Bergabung!</h3>
                  <p className="text-slate-500 font-semibold text-xs leading-relaxed">
                    Pembayaran berhasil dikonfirmasi. Sistem sedang memproses database dan mengarahkan Anda ke <span className="text-[#0B3D91] font-bold">Vendor Dashboard OS</span>...
                  </p>
                </div>
              ) : registerStep === 'payment' ? (
                <div className="space-y-6">
                  <div className="text-center space-y-2">
                    <span className="text-[#D4AF37] font-black text-[10px] uppercase tracking-widest font-mono">LANGKAH 2: METODE PEMBAYARAN</span>
                    <h3 className="text-2xl font-extrabold text-[#1F2937] uppercase">Aktivasi OS Vendor</h3>
                    <p className="text-slate-500 font-semibold text-xs leading-relaxed">
                      Biaya Berlangganan: <span className="text-slate-800 font-bold">Rp 50.000</span> / bulan
                    </p>
                  </div>

                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase text-slate-400 tracking-wider block text-left">PILIH METODE PEMBAYARAN</label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => setPaymentMethod('qris')}
                        className={`p-4 rounded-2xl border-2 text-left transition-all ${
                          paymentMethod === 'qris' 
                            ? 'border-[#D4AF37] bg-[#FFF8E7]/30 text-slate-900' 
                            : 'border-slate-100 hover:border-slate-200 text-slate-500'
                        }`}
                      >
                        <div className="font-extrabold text-sm">QRIS</div>
                        <div className="text-[10px] opacity-75">Otomatis & Instan</div>
                      </button>
                      <button
                        type="button"
                        onClick={() => setPaymentMethod('transfer')}
                        className={`p-4 rounded-2xl border-2 text-left transition-all ${
                          paymentMethod === 'transfer' 
                            ? 'border-[#D4AF37] bg-[#FFF8E7]/30 text-slate-900' 
                            : 'border-slate-100 hover:border-slate-200 text-slate-500'
                        }`}
                      >
                        <div className="font-extrabold text-sm">Transfer Bank</div>
                        <div className="text-[10px] opacity-75">BCA / Mandiri / BNI</div>
                      </button>
                    </div>
                  </div>

                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-3 text-left">
                    {paymentMethod === 'qris' ? (
                      <div className="text-center py-2 space-y-3">
                        {/* Simulation of a premium QRIS Code using CSS */}
                        <div className="w-32 h-32 bg-white p-2 mx-auto border border-slate-200 rounded-xl relative flex items-center justify-center">
                          <div className="grid grid-cols-8 gap-1.5 w-full h-full opacity-80">
                            {Array.from({ length: 64 }).map((_, i) => (
                              <div 
                                key={i} 
                                className={`rounded-sm ${(i % 3 === 0 || i % 7 === 0 || (i > 10 && i < 20) || i < 8 || i % 8 === 0 || i > 56) && i !== 28 && i !== 36 ? 'bg-slate-900' : 'bg-transparent'}`} 
                              />
                            ))}
                          </div>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="bg-white px-2 py-0.5 text-[8px] font-black text-[#D4AF37] border border-[#D4AF37]/40 rounded-full tracking-widest uppercase">QRIS</span>
                          </div>
                        </div>
                        <p className="text-[10px] text-slate-500 font-semibold">Scan QR di atas sebesar <span className="text-slate-800 font-bold">Rp 50.000</span> dengan E-Wallet atau Mobile Banking.</p>
                      </div>
                    ) : (
                      <div className="space-y-2 text-xs font-semibold text-slate-600">
                        <div className="flex justify-between items-center bg-white p-2.5 rounded-xl border border-slate-105 shadow-sm">
                          <div>
                            <div className="text-[9px] text-slate-400 font-bold uppercase">BANK BCA</div>
                            <div className="font-black text-slate-800">023-839-2811</div>
                          </div>
                          <span className="text-[10px] text-[#D4AF37] font-black uppercase">A.N AkriliGrad</span>
                        </div>
                        <div className="flex justify-between items-center bg-white p-2.5 rounded-xl border border-slate-105 shadow-sm">
                          <div>
                            <div className="text-[9px] text-slate-400 font-bold uppercase">BANK MANDIRI</div>
                            <div className="font-black text-slate-800">169-00-0238-3921</div>
                          </div>
                          <span className="text-[10px] text-[#D4AF37] font-black uppercase">A.N AkriliGrad</span>
                        </div>
                        <p className="text-[10px] text-slate-400 text-center font-semibold pt-1">Harap transfer sebesar <span className="text-slate-800 font-bold">Rp 50.000</span> dengan menyertakan nama vendor Anda.</p>
                      </div>
                    )}
                  </div>

                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => setRegisterStep('info')}
                      disabled={isRegistering}
                      className="flex-1 py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-black rounded-2xl text-xs uppercase tracking-widest transition-all disabled:opacity-60 cursor-pointer"
                    >
                      Kembali
                    </button>
                    <button
                      type="button"
                      onClick={handleConfirmPayment}
                      disabled={isRegistering}
                      className="flex-[2] py-3.5 bg-[#D4AF37] hover:brightness-110 text-slate-950 font-black rounded-2xl text-xs uppercase tracking-widest shadow-xl shadow-[#D4AF37]/20 transition-all flex items-center justify-center gap-2 disabled:opacity-60 cursor-pointer"
                    >
                      {isRegistering ? (
                        <span className="flex items-center gap-2">
                          <svg className="animate-spin h-4.5 w-4.5 text-slate-950" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                          </svg>
                          Memvalidasi...
                        </span>
                      ) : (
                        <span className="flex items-center gap-2">
                          Konfirmasi Bayar <CheckCircle2 className="w-4 h-4" />
                        </span>
                      )}
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleRegisterSubmit} className="space-y-6">
                  <div className="text-center space-y-2">
                    <span className="text-[#D4AF37] font-black text-[10px] uppercase tracking-widest font-mono">MITRA VENDOR AKRILIGRAD RESMI</span>
                    <h3 className="text-2xl font-extrabold text-[#1F2937] uppercase">Daftar Akun Vendor</h3>
                    <p className="text-slate-500 font-semibold text-xs leading-relaxed">
                      Lengkapi data registrasi untuk langsung menerbitkan katalog rental papan akrilik milik Anda.
                    </p>
                  </div>

                  {errorMsg && (
                    <div className="p-3.5 bg-red-50 border border-red-200 rounded-2xl flex items-center gap-2.5 text-red-600 text-xs font-semibold">
                      <AlertTriangle className="w-4 h-4 shrink-0" />
                      <span>{errorMsg}</span>
                    </div>
                  )}

                  <div className="space-y-4">
                    <div className="space-y-1.5 text-left">
                      <label className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Nama Vendor / Toko</label>
                      <div className="relative">
                        <span className="absolute left-4.5 top-1/2 -translate-y-1/2 text-slate-400">
                          <Store className="w-4 h-4" />
                        </span>
                        <input 
                          type="text" 
                          placeholder="Contoh: Bangka Florist" 
                          value={vendorName}
                          onChange={(e) => setVendorName(e.target.value)}
                          disabled={isRegistering}
                          className="w-full bg-slate-50 hover:bg-slate-100/80 focus:bg-white border-2 border-slate-100 focus:border-[#D4AF37] rounded-2xl py-3.5 pl-11 pr-4 text-xs font-semibold text-slate-800 outline-none transition-colors disabled:opacity-60"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5 text-left">
                      <label className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Email Vendor</label>
                      <div className="relative">
                        <span className="absolute left-4.5 top-1/2 -translate-y-1/2 text-slate-400">
                          <Mail className="w-4 h-4" />
                        </span>
                        <input 
                          type="email" 
                          placeholder="Contoh: hello@bangkaflorist.com" 
                          value={vendorEmail}
                          onChange={(e) => setVendorEmail(e.target.value)}
                          disabled={isRegistering}
                          className="w-full bg-slate-50 hover:bg-slate-100/80 focus:bg-white border-2 border-slate-100 focus:border-[#D4AF37] rounded-2xl py-3.5 pl-11 pr-4 text-xs font-semibold text-slate-800 outline-none transition-colors disabled:opacity-60"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5 text-left">
                      <label className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Password Akses</label>
                      <div className="relative">
                        <span className="absolute left-4.5 top-1/2 -translate-y-1/2 text-slate-400">
                          <Lock className="w-4 h-4" />
                        </span>
                        <input 
                          type="password" 
                          placeholder="••••••••" 
                          value={vendorPassword}
                          onChange={(e) => setVendorPassword(e.target.value)}
                          disabled={isRegistering}
                          className="w-full bg-slate-50 hover:bg-slate-100/80 focus:bg-white border-2 border-slate-100 focus:border-[#D4AF37] rounded-2xl py-3.5 pl-11 pr-4 text-xs font-semibold text-slate-800 outline-none transition-colors disabled:opacity-60"
                        />
                      </div>
                    </div>
                  </div>

                  <button 
                    type="submit"
                    disabled={isRegistering}
                    className="w-full py-4 bg-[#D4AF37] hover:brightness-110 active:scale-98 text-slate-950 font-black rounded-2xl text-xs uppercase tracking-widest shadow-xl shadow-[#D4AF37]/20 transition-all flex items-center justify-center gap-2 disabled:opacity-60 cursor-pointer"
                  >
                    Lanjut Pembayaran Rp 50.000 <Sparkles className="w-4 h-4" />
                  </button>

                  <div className="text-center text-[9px] uppercase tracking-widest text-[#0B3D91] font-black">
                    TERINTEGRASI MITRA KAMPUS BANGKA
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Terms & Conditions Modal */}
      <AnimatePresence>
        {showTerms && (
          <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-[40px] border-2 border-[#D4AF37]/30 p-6 md:p-10 max-w-2xl w-full shadow-2xl relative max-h-[85vh] flex flex-col text-left overflow-hidden"
            >
              <button 
                onClick={() => setShowTerms(false)}
                className="absolute top-6 right-6 p-2 text-slate-400 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-full transition-colors z-10"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="mb-6 space-y-1">
                <span className="text-[#D4AF37] font-black text-[10px] uppercase tracking-widest font-mono">Official Guidelines</span>
                <h3 className="text-2xl md:text-3xl font-extrabold text-[#1F2937] uppercase flex items-center gap-2">
                  <ShieldCheck className="w-7 h-7 text-[#D4AF37]" /> Syarat & Ketentuan
                </h3>
                <p className="text-slate-500 font-semibold text-xs leading-relaxed">
                  Harap membaca panduan dan regulasi sistem sewa premium AkriliGrad.
                </p>
              </div>

              {/* Scrollable Area */}
              <div className="flex-1 overflow-y-auto pr-2 space-y-6 scrollbar-thin scrollbar-thumb-gold/20 scrollbar-track-transparent">
                <div className="p-4 bg-[#FFF8E7]/50 border border-[#D4AF37]/20 rounded-2xl flex gap-3 text-[#B8860B] text-xs font-semibold leading-relaxed">
                  <Sparkles className="w-5 h-5 shrink-0 text-[#D4AF37]" />
                  <span>
                    Seluruh transaksi, pencatatan stok, dan persetujuan custom kata ucapan dilindungi oleh sistem automasi cloud AkriliGrad Bangka untuk memastikan kenyamanan bersama.
                  </span>
                </div>

                <div className="space-y-4 text-xs md:text-sm text-slate-700 font-medium leading-relaxed">
                  <section className="space-y-2 border-b border-slate-100 pb-3">
                    <h4 className="font-extrabold text-slate-900 uppercase tracking-tight text-xs flex items-center gap-1.5">
                      <span className="px-2 py-0.5 bg-[#FFF8E7] text-[#B8860B] rounded-md font-mono text-[10px]">1</span>
                      Definisi & Peran Platform
                    </h4>
                    <p className="text-slate-600 pl-6 text-xs font-semibold">
                      AkriliGrad berfungsi sebagai sistem penghubung digital (SaaS) antara pihak dospem/wisudawan di Bangka dengan para pengusaha mikro (UKM) penyedia sewa hiasan papan akrilik wisuda premium.
                    </p>
                  </section>

                  <section className="space-y-2 border-b border-slate-100 pb-3">
                    <h4 className="font-extrabold text-slate-900 uppercase tracking-tight text-xs flex items-center gap-1.5">
                      <span className="px-2 py-0.5 bg-[#FFF8E7] text-[#B8860B] rounded-md font-mono text-[10px]">2</span>
                      Kustomisasi & Desain
                    </h4>
                    <p className="text-slate-600 pl-6 text-xs font-semibold">
                      Pelanggan wajib mengisikan kata-kata ucapan wisuda secara teliti di kolom formulir interaktif. Atribut font, tata letak, dan dekorasi bunga akan diproses oleh vendor persis sesuai mockup digital yang dipilih. Pembeli bertanggung jawab penuh atas kesalahan ketik (typo) setelah pesanan dikonfirmasi.
                    </p>
                  </section>

                  <section className="space-y-2 border-b border-slate-100 pb-3">
                    <h4 className="font-extrabold text-slate-900 uppercase tracking-tight text-xs flex items-center gap-1.5">
                      <span className="px-2 py-0.5 bg-[#FFF8E7] text-[#B8860B] rounded-md font-mono text-[10px]">3</span>
                      Jadwal Pengambilan & Pengembalian
                    </h4>
                    <p className="text-slate-600 pl-6 text-xs font-semibold">
                      Demi kerapian administrasi bersama, proses penyerahan (pickup) dan pengembalian (return) dikendalikan otomatis oleh sistem kalender terpadu. Keterlambatan pengembalian tanpa konfirmasi akan dikenai denda harian sesuai ketentuan masing-masing vendor guna menjaga hak penyewa berikutnya.
                    </p>
                  </section>

                  <section className="space-y-2 border-b border-slate-100 pb-3">
                    <h4 className="font-extrabold text-slate-900 uppercase tracking-tight text-xs flex items-center gap-1.5">
                      <span className="px-2 py-0.5 bg-[#FFF8E7] text-[#B8860B] rounded-md font-mono text-[10px]">4</span>
                      Tanggung Jawab Fisik & Kerusakan
                    </h4>
                    <p className="text-slate-600 pl-6 text-xs font-semibold">
                      Pelanggan bertanggung jawab penuh menjaga keutuhan papan akrilik, tripod penyangga hiasan, serta rangkaian bunga artifisial. Kerusakan fisik parah (patah, retak mendalam) atau hilangnya perlengkapan sewa mewajibkan penyewa menanggung biaya ganti rugi sesuai yang dicantumkan oleh vendor mitra terkait.
                    </p>
                  </section>

                  <section className="space-y-2 pb-1">
                    <h4 className="font-extrabold text-slate-900 uppercase tracking-tight text-xs flex items-center gap-1.5">
                      <span className="px-2 py-0.5 bg-[#FFF8E7] text-[#B8860B] rounded-md font-mono text-[10px]">5</span>
                      Komisi & Biaya Layanan
                    </h4>
                    <p className="text-slate-600 pl-6 text-xs font-semibold">
                      Sistem AkriliGrad secara transparan memotong komisi tetap sebesar 10% dari setiap pesanan yang berhasil diselesaikan di platform, yang dialokasikan langsung untuk pemeliharaan server cloud, pembaruan template, serta optimasi pemasaran bersama.
                    </p>
                  </section>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between shrink-0">
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest font-mono">
                  AkriliGrad Legal • 2026
                </span>
                <button
                  type="button"
                  onClick={() => setShowTerms(false)}
                  className="px-6 py-2.5 bg-[#0B3D91] hover:bg-[#D4AF37] text-white hover:text-slate-950 text-xs font-black uppercase tracking-widest rounded-xl transition-all shadow shadow-blue-900/10 hover:shadow-gold/20 cursor-pointer pointer-events-auto"
                >
                  Saya Mengerti
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
