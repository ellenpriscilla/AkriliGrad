import React from 'react';
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Clock, 
  User, 
  LogOut, 
  ChevronRight,
  Bell,
  Search,
  Settings,
  Store,
  ShieldCheck,
  Calendar,
  Layers
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDemoData } from '../../context/DemoContext';

interface SidebarItemProps {
  icon: React.ElementType;
  label: string;
  href: string;
  active?: boolean;
}

const SidebarItem = ({ icon: Icon, label, href, active }: SidebarItemProps) => (
  <Link to={href}>
    <div className={`flex items-center gap-3 px-4 py-3.5 rounded-2xl transition-all group ${
      active 
        ? 'bg-gold text-slate-900 shadow-lg shadow-gold/20 font-black' 
        : 'text-slate-400 hover:bg-white/5 hover:text-gold'
    }`}>
      <Icon className={`w-5 h-5 ${active ? 'text-slate-905' : 'group-hover:text-gold'}`} />
      <span className="text-sm tracking-tight">{label}</span>
      {active && <ChevronRight className="w-4 h-4 ml-auto" />}
    </div>
  </Link>
);

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const currentPath = location.pathname;
  const navigate = useNavigate();

  const { 
    currentStudent, loginStudent, logoutStudent,
    currentVendor, loginVendor, logoutVendor,
    currentAdmin, loginAdmin, logoutAdmin 
  } = useDemoData();

  // Student Login Form Form states
  const [loginName, setLoginName] = React.useState('');
  const [loginOccupation, setLoginOccupation] = React.useState('');
  const [loginEmail, setLoginEmail] = React.useState('');
  const [loginPassword, setLoginPassword] = React.useState('');
  const [loginError, setLoginError] = React.useState('');

  const handleStudentLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginName.trim() || !loginOccupation.trim() || !loginEmail.trim() || !loginPassword.trim()) {
      setLoginError('Harap lengkapi semua data form!');
      return;
    }
    setLoginError('');
    loginStudent(loginName.trim(), loginOccupation.trim(), loginEmail.trim());
  };

  // Vendor login handler states
  const [vendorLoginName, setVendorLoginName] = React.useState('');
  const [vendorLoginEmail, setVendorLoginEmail] = React.useState('');
  const [vendorLoginPassword, setVendorLoginPassword] = React.useState('');
  const [vendorLoginError, setVendorLoginError] = React.useState('');

  const handleVendorLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!vendorLoginName.trim() || !vendorLoginEmail.trim() || !vendorLoginPassword.trim()) {
      setVendorLoginError('Harap lengkapi seluruh kolom!');
      return;
    }
    setVendorLoginError('');
    loginVendor(vendorLoginName.trim(), vendorLoginEmail.trim());
  };

  // Admin login handler states
  const [adminUsername, setAdminUsername] = React.useState('');
  const [adminPassword, setAdminPassword] = React.useState('');
  const [adminLoginError, setAdminLoginError] = React.useState('');

  const handleAdminLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!adminUsername.trim() || !adminPassword.trim()) {
      setAdminLoginError('Harap masukkan Username dan Password!');
      return;
    }
    setAdminLoginError('');
    loginAdmin(adminUsername.trim());
  };

  // Role detection
  const isStudent = currentPath.startsWith('/student');
  const isVendor = currentPath.startsWith('/vendor');
  const isAdmin = currentPath.startsWith('/admin');

  // Profile data
  const profile = isStudent 
    ? { name: currentStudent ? currentStudent.name : 'Ellen Priscilla', role: currentStudent ? currentStudent.occupation : 'Mahasiswa', type: 'STUDENT', avatar: 'https://smb.telkomuniversity.ac.id/wp-content/uploads/2025/03/Thumbnail-Artikel-Updated-27.jpg' }
    : isVendor
    ? { name: currentVendor ? currentVendor.name : 'GradCraft Vendor', role: 'Vendor Terdaftar', type: 'VENDOR', avatar: 'https://citraflorist.com/wp-content/uploads/2020/10/model_bouquet_citra_florist-removebg-preview.png' }
    : { name: currentAdmin ? `Admin @${currentAdmin.username}` : 'Platform Administrator', role: 'Super Admin', type: 'SUPER_ADMIN', avatar: 'https://midtrans-website.al-mp-id-p.cdn.gtflabs.io/uploads/2023/02/85eafd75754e9e3c0a5e0a309c1db2eb_ac13cf8cd9adc83fe8ebde29673a77b3_compressed.jpg' };

  // Notification state
  const [showNotifications, setShowNotifications] = React.useState(false);
  const [unreadCount, setUnreadCount] = React.useState(3);

  const getNotifications = () => {
    if (isStudent) {
      return [
        {
          id: 'n1',
          title: 'Siap Diambil (Ready for Pickup)',
          desc: 'Pesanan ORD-001 (Standing Akrilik Bulat) Anda sudah siap diambil di gerai vendor!',
          time: 'Baru saja',
          unread: true,
          type: 'success'
        },
        {
          id: 'n2',
          title: 'Nama Wisudawan Berubah',
          desc: 'Nama wisudawan berhasil diubah menjadi Ocha Monicha, S.Bns oleh sistem.',
          time: '5 menit yang lalu',
          unread: true,
          type: 'info'
        },
        {
          id: 'n3',
          title: 'E-Wallet Terverifikasi',
          desc: 'Pembayaran deposit sewa Rp 70.000 terverifikasi secara instant.',
          time: '1 jam yang lalu',
          unread: true,
          type: 'payment'
        }
      ];
    } else if (isVendor) {
      return [
        {
          id: 'n1',
          title: 'Pesanan Baru Masuk!',
          desc: 'ORD-001 atas nama wisudawan Ocha Monicha, S.Bns menunggu persetujuan pickup.',
          time: 'Baru saja',
          unread: true,
          type: 'success'
        },
        {
          id: 'n2',
          title: 'Aktivasi Paket Premium',
          desc: 'Pendaftaran Vendor berhasil! Selamat bergabung di SaaS AkriliGrad.',
          time: '10 menit yang lalu',
          unread: true,
          type: 'info'
        },
        {
          id: 'n3',
          title: 'Komisi Platform Tercatat',
          desc: 'Biaya platform 10% (Rp 7.000) otomatis terpotong dari pesanan ORD-001.',
          time: '1 jam yang lalu',
          unread: true,
          type: 'payment'
        }
      ];
    } else {
      // Admin
      return [
        {
          id: 'n1',
          title: 'Registrasi Vendor Baru',
          desc: 'GradCraft Vendor berhasil diverifikasi dan melunasi biaya berlangganan Rp 50.000.',
          time: 'Baru saja',
          unread: true,
          type: 'success'
        },
        {
          id: 'n2',
          title: 'Komisi Masuk Sukses',
          desc: 'Komisi sewa 10% (Rp 7.000) dari transaksi ORD-001 berhasil masuk kas platform.',
          time: '1 jam yang lalu',
          unread: true,
          type: 'payment'
        },
        {
          id: 'n3',
          title: 'Sistem Sinkronisasi Berhasil',
          desc: 'Database penyewaan akrilik wilayah Bangka berhasil diperbarui tanpa kendala.',
          time: '2 jam yang lalu',
          unread: true,
          type: 'info'
        }
      ];
    }
  };

  const [notifications, setNotifications] = React.useState(getNotifications());

  // Reset notifications when route changes / type changes
  React.useEffect(() => {
    setNotifications(getNotifications());
    setUnreadCount(3);
  }, [profile.type]);

  const handleMarkAsRead = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, unread: false } : n));
    setUnreadCount(prev => Math.max(0, prev - 1));
  };

  const handleClearAll = (e: React.MouseEvent) => {
    e.stopPropagation();
    setNotifications([]);
    setUnreadCount(0);
  };


  // Gating Student login
  if (isStudent && !currentStudent) {
    return (
      <div className="min-h-screen bg-beige/40 flex items-center justify-center p-6 font-sans relative overflow-hidden text-left w-full">
        {/* Ambient background decoration */}
        <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-[#D4AF37]/5 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-[#0B3D91]/5 blur-[120px] pointer-events-none" />

        <div className="max-w-md w-full bg-white rounded-[40px] border border-beige p-8 md:p-10 shadow-2xl relative z-10 space-y-8 animate-in fade-in zoom-in-95 duration-200">
          <div className="text-center space-y-3">
            {/* Logo area */}
            <div className="inline-flex items-center justify-center w-14 h-14 bg-navy rounded-2xl shadow-xl shadow-navy/10 text-white font-extrabold text-2xl tracking-tight border-2 border-gold mb-1">
              A
            </div>
            <div className="space-y-1">
              <span className="text-[10px] font-black text-gold uppercase tracking-[0.2em]">PORTAL WISUDAWAN & PEMESAN</span>
              <h2 className="text-2xl font-black text-navy uppercase tracking-tight">Masuk AkriliGrad</h2>
            </div>
            <p className="text-slate-500 font-semibold text-xs leading-relaxed max-w-sm mx-auto">
              Silakan isi kredensial di bawah ini untuk mengakses dashboard persewaan papan akrilik wisuda premium.
            </p>
          </div>

          <form onSubmit={handleStudentLoginSubmit} className="space-y-5">
            {loginError && (
              <div className="p-4 bg-red-50 border border-red-200 text-red-600 rounded-2xl text-xs font-bold uppercase tracking-wide">
                ⚠️ {loginError}
              </div>
            )}

            <div className="space-y-1.5 text-left">
              <label className="text-[10px] font-black uppercase text-slate-400 tracking-wider block">NAMA LENGKAP</label>
              <input
                type="text"
                value={loginName}
                onChange={(e) => setLoginName(e.target.value)}
                placeholder="Misal: Ellen Priscilla, S.Bns"
                className="w-full px-5 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl text-xs font-semibold focus:bg-white focus:border-gold outline-none transition-all placeholder:text-slate-400 text-slate-800"
              />
            </div>

            <div className="space-y-1.5 text-left">
              <label className="text-[10px] font-black uppercase text-slate-400 tracking-wider block">PEKERJAAN / JURUSAN</label>
              <input
                type="text"
                value={loginOccupation}
                onChange={(e) => setLoginOccupation(e.target.value)}
                placeholder="Misal: Mahasiswa Bisnis Digital / Wirausaha"
                className="w-full px-5 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl text-xs font-semibold focus:bg-white focus:border-gold outline-none transition-all placeholder:text-slate-400 text-slate-800"
              />
            </div>

            <div className="space-y-1.5 text-left">
              <label className="text-[10px] font-black uppercase text-slate-400 tracking-wider block">EMAIL AKTIF</label>
              <input
                type="email"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                placeholder="Misal: ellen@gmail.com"
                className="w-full px-5 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl text-xs font-semibold focus:bg-white focus:border-gold outline-none transition-all placeholder:text-slate-400 text-slate-800"
              />
            </div>

            <div className="space-y-1.5 text-left">
              <label className="text-[10px] font-black uppercase text-slate-400 tracking-wider block">PASSWORD</label>
              <input
                type="password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                placeholder="Minimal 6 karakter"
                className="w-full px-5 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl text-xs font-semibold focus:bg-white focus:border-gold outline-none transition-all placeholder:text-slate-400 text-slate-800"
              />
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-[#D4AF37] hover:brightness-110 active:scale-98 text-slate-950 font-black rounded-2xl text-xs uppercase tracking-widest shadow-xl shadow-[#D4AF37]/20 transition-all cursor-pointer block mt-6"
            >
              Masuk & Lanjutkan Booking ✨
            </button>
          </form>

          <div className="pt-2 text-center">
            <button
              type="button"
              onClick={() => navigate('/')}
              className="inline-flex items-center gap-2 text-[10px] font-black text-[#0B3D91] hover:underline uppercase tracking-wider cursor-pointer font-sans"
            >
              ← Kembali ke Beranda Utama
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Gating Vendor login
  if (isVendor && !currentVendor) {
    return (
      <div className="min-h-screen bg-navy flex items-center justify-center p-6 font-sans relative overflow-hidden text-left w-full">
        {/* Ambient background decoration */}
        <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-[#D4AF37]/5 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-[#0B3D91]/5 blur-[120px] pointer-events-none" />

        <div className="max-w-md w-full bg-slate-900 rounded-[40px] border border-white/5 p-8 md:p-10 shadow-2xl relative z-10 space-y-8 animate-in fade-in zoom-in-95 duration-200 text-white">
          <div className="text-center space-y-3">
            {/* Logo area */}
            <div className="inline-flex items-center justify-center w-14 h-14 bg-navy rounded-2xl shadow-xl shadow-navy/10 text-white font-extrabold text-2xl tracking-tight border-2 border-gold mb-1">
              A
            </div>
            <div className="space-y-1">
              <span className="text-[10px] font-black text-gold uppercase tracking-[0.2em]">SISTEM SAAS VENDOR MITRA</span>
              <h2 className="text-2xl font-black text-white uppercase tracking-tight">Login Vendor AkriliGrad</h2>
            </div>
            <p className="text-slate-400 font-semibold text-xs leading-relaxed max-w-sm mx-auto">
              Kelola persewaan, monitor inventaris, dan komisi platform dalam satu cloud terintegrasi.
            </p>
          </div>

          <form onSubmit={handleVendorLoginSubmit} className="space-y-5">
            {vendorLoginError && (
              <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-2xl text-xs font-bold uppercase tracking-wide">
                ⚠️ {vendorLoginError}
              </div>
            )}

            <div className="space-y-1.5 text-left">
              <label className="text-[10px] font-black uppercase text-slate-400 tracking-wider block">NAMA VENDOR / BRAND</label>
              <input
                type="text"
                value={vendorLoginName}
                onChange={(e) => setVendorLoginName(e.target.value)}
                placeholder="Misal: GradCraft Vendor / Bangka Acrylic Art"
                className="w-full px-5 py-3.5 bg-white/5 border border-white/5 rounded-2xl text-xs font-semibold focus:bg-white/10 focus:border-gold outline-none transition-all placeholder:text-slate-500 text-white"
              />
            </div>

            <div className="space-y-1.5 text-left">
              <label className="text-[10px] font-black uppercase text-slate-400 tracking-wider block">EMAIL AKTIF</label>
              <input
                type="email"
                value={vendorLoginEmail}
                onChange={(e) => setVendorLoginEmail(e.target.value)}
                placeholder="Misal: owner@bangkaacrylic.com"
                className="w-full px-5 py-3.5 bg-white/5 border border-white/5 rounded-2xl text-xs font-semibold focus:bg-white/10 focus:border-gold outline-none transition-all placeholder:text-slate-500 text-white"
              />
            </div>

            <div className="space-y-1.5 text-left">
              <label className="text-[10px] font-black uppercase text-slate-400 tracking-wider block">PASSWORD</label>
              <input
                type="password"
                value={vendorLoginPassword}
                onChange={(e) => setVendorLoginPassword(e.target.value)}
                placeholder="Kata sandi akses vendor"
                className="w-full px-5 py-3.5 bg-white/5 border border-white/5 rounded-2xl text-xs font-semibold focus:bg-white/10 focus:border-gold outline-none transition-all placeholder:text-slate-500 text-white"
              />
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-[#D4AF37] hover:brightness-110 active:scale-98 text-slate-950 font-black rounded-2xl text-xs uppercase tracking-widest shadow-xl shadow-[#D4AF37]/20 transition-all cursor-pointer block mt-6"
            >
              Masuk Dashboard Vendor Terintegrasi ✨
            </button>
          </form>

          <div className="pt-2 text-center">
            <button
              type="button"
              onClick={() => navigate('/')}
              className="inline-flex items-center gap-2 text-[10px] font-black text-gold hover:underline uppercase tracking-wider cursor-pointer font-sans"
            >
              ← Kembali ke Beranda Utama
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Gating Admin login
  if (isAdmin && !currentAdmin) {
    return (
      <div className="min-h-screen bg-[#0C1E36] flex items-center justify-center p-6 font-sans relative overflow-hidden text-left w-full">
        {/* Ambient background decoration */}
        <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-[#D4AF37]/5 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-[#0B3D91]/5 blur-[120px] pointer-events-none" />

        <div className="max-w-md w-full bg-slate-900 rounded-[40px] border border-white/5 p-8 md:p-10 shadow-2xl relative z-10 space-y-8 animate-in fade-in zoom-in-95 duration-200 text-white">
          <div className="text-center space-y-3">
            {/* Logo area */}
            <div className="inline-flex items-center justify-center w-14 h-14 bg-navy rounded-2xl shadow-xl shadow-navy/10 text-white font-extrabold text-2xl tracking-tight border-2 border-gold mb-1">
              A
            </div>
            <div className="space-y-1">
              <span className="text-[10px] font-black text-gold uppercase tracking-[0.2em]">PORTAL KONTROL UTAMA PLATFORM</span>
              <h2 className="text-2xl font-black text-white uppercase tracking-tight">Platform Owner Admin</h2>
            </div>
            <p className="text-slate-400 font-semibold text-xs leading-relaxed max-w-sm mx-auto">
              Masuk dengan kredensial Administrator utama untuk memonitor SaaS MRR dan bagi hasil komisi platform.
            </p>
          </div>

          <form onSubmit={handleAdminLoginSubmit} className="space-y-5">
            {adminLoginError && (
              <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-2xl text-xs font-bold uppercase tracking-wide">
                ⚠️ {adminLoginError}
              </div>
            )}

            <div className="space-y-1.5 text-left">
              <label className="text-[10px] font-black uppercase text-slate-400 tracking-wider block">Username Administrator</label>
              <input
                type="text"
                value={adminUsername}
                onChange={(e) => setAdminUsername(e.target.value)}
                placeholder="Masukkan username admin"
                className="w-full px-5 py-3.5 bg-white/5 border border-white/5 rounded-2xl text-xs font-semibold focus:bg-white/10 focus:border-gold outline-none transition-all placeholder:text-slate-500 text-white"
              />
            </div>

            <div className="space-y-1.5 text-left">
              <label className="text-[10px] font-black uppercase text-slate-400 tracking-wider block">Password Admin</label>
              <input
                type="password"
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
                placeholder="Masukkan kata sandi admin"
                className="w-full px-5 py-3.5 bg-white/5 border border-white/5 rounded-2xl text-xs font-semibold focus:bg-white/10 focus:border-gold outline-none transition-all placeholder:text-slate-500 text-white"
              />
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-[#D4AF37] hover:brightness-110 active:scale-98 text-slate-950 font-black rounded-2xl text-xs uppercase tracking-widest shadow-xl shadow-[#D4AF37]/20 transition-all cursor-pointer block mt-6"
            >
              Masuk Portal Kontrol Utama ⚙️
            </button>
          </form>

          <div className="pt-2 text-center">
            <button
              type="button"
              onClick={() => navigate('/')}
              className="inline-flex items-center gap-2 text-[10px] font-black text-gold hover:underline uppercase tracking-wider cursor-pointer font-sans"
            >
              ← Kembali ke Beranda Utama
            </button>
          </div>
        </div>
      </div>
    );
  }



  return (
    <div className="min-h-screen bg-beige flex font-sans selection:bg-gold/30 selection:text-navy">
      {/* Sidebar */}
      <aside className="w-72 bg-navy border-r border-navy/50 p-6 flex flex-col fixed h-full z-20 text-white overflow-y-auto scrollbar-thin">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-gold rounded-xl flex items-center justify-center text-navy font-bold text-xl shadow-lg shadow-gold/20">A</div>
          <div className="flex flex-col">
            <span className="font-extrabold text-2xl tracking-tight text-white border-b-2 border-gold pb-1 block leading-none">AkriliGrad</span>
            <div className="text-[8px] text-gold font-bold tracking-widest uppercase mt-1.5">Platform</div>
          </div>
        </div>

        <nav className="flex-1 space-y-2">
          {isStudent && (
            <>
              <div className="text-[10px] font-extrabold text-slate-500 uppercase tracking-[0.2em] mb-3 px-4">Menu Mahasiswa</div>
              <SidebarItem icon={LayoutDashboard} label="Dashboard" href="/student/dashboard" active={currentPath === '/student/dashboard'} />
              <SidebarItem icon={ShoppingBag} label="Katalog Rental" href="/student/catalog" active={currentPath.startsWith('/student/catalog')} />
            </>
          )}

          {isVendor && (
            <>
              <div className="text-[10px] font-extrabold text-slate-500 uppercase tracking-[0.2em] mb-3 px-4">Menu Vendor</div>
              <SidebarItem icon={LayoutDashboard} label="Dashboard Performa" href="/vendor/dashboard" active={currentPath === '/vendor/dashboard'} />
            </>
          )}

          {isAdmin && (
            <>
              <div className="text-[10px] font-extrabold text-slate-500 uppercase tracking-[0.2em] mb-3 px-4">Menu Platfom Owner</div>
              <SidebarItem icon={ShieldCheck} label="Platform Hub" href="/admin/dashboard" active={currentPath === '/admin/dashboard'} />
            </>
          )}
          
          <div className="text-[10px] font-extrabold text-slate-500 uppercase tracking-[0.2em] mt-6 mb-3 px-4">System Info</div>
          <div className="px-4 py-3 bg-white/5 rounded-2xl border border-white/10 text-[11px] text-slate-300">
             <div className="font-bold text-gold">Sub Vendor:</div>
             <div className="text-[10px] text-white/70 mt-0.5 leading-relaxed">Tarif: Rp50k / bulan • Komisi 10% terhitung otomatis.</div>
          </div>
        </nav>

        <div className="mt-6 pt-5 border-t border-white/10 space-y-3">
          <div className="px-4 text-[9px] text-slate-500 font-bold uppercase tracking-widest leading-none">
            Sesi Pengguna Aktif
          </div>
          <button 
            onClick={() => {
              if (isStudent) {
                logoutStudent();
              } else if (isVendor) {
                logoutVendor();
              } else if (isAdmin) {
                logoutAdmin();
              }
              navigate('/');
            }}
            className="w-full flex items-center gap-3 px-4 py-3 bg-red-500/10 hover:bg-red-500/20 text-red-500 hover:text-red-400 rounded-2xl transition-all font-black text-xs uppercase tracking-wider cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            LOGOUT
          </button>
        </div>
        
        {/* Bottom spacer to prevent overflow cutoff */}
        <div className="h-16 pb-12 shrink-0" />
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-72">
        {/* Header */}
        <header className="h-20 bg-white border-b border-beige px-8 flex items-center justify-between sticky top-0 z-10">
          <div className="relative w-96 max-w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Cari desain, transaksi, pesanan..." 
              className="w-full bg-slate-50 border border-beige rounded-xl py-2.5 pl-12 pr-4 text-sm focus:ring-2 focus:ring-gold/20 outline-none transition-all"
            />
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden lg:flex items-center gap-2 bg-beige border border-gold/20 px-4 py-1.5 rounded-full text-[10px] font-black uppercase text-gold tracking-widest">
               Portal Mode: {profile.type}
            </div>
            
            <div className="relative">
              <button 
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-2.5 text-slate-400 hover:text-navy hover:bg-beige rounded-xl transition-all relative cursor-pointer flex items-center justify-center"
              >
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                  <div className="absolute top-2 right-2 w-2.5 h-2.5 bg-gold rounded-full border border-white" />
                )}
              </button>

              {showNotifications && (
                <>
                  {/* Backdrop for easy closing */}
                  <div className="fixed inset-0 z-30" onClick={() => setShowNotifications(false)} />
                  
                  <div className="absolute right-0 mt-3 w-96 bg-white border border-beige shadow-2xl rounded-2xl z-40 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-150">
                    <div className="p-4 bg-slate-50 border-b border-beige flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Bell className="w-4 h-4 text-gold" />
                        <span className="font-extrabold text-xs text-slate-800 uppercase tracking-widest">Riwayat Notifikasi</span>
                      </div>
                      {notifications.length > 0 && (
                        <button 
                          onClick={handleClearAll}
                          className="text-[10px] text-slate-400 hover:text-red-500 font-bold uppercase transition-colors"
                        >
                          Hapus Semua
                        </button>
                      )}
                    </div>

                    <div className="max-h-80 overflow-y-auto divide-y divide-beige/40">
                      {notifications.length === 0 ? (
                        <div className="p-8 text-center text-slate-400 space-y-2">
                          <Bell className="w-8 h-8 mx-auto opacity-30" />
                          <p className="text-xs font-semibold">Tidak ada notifikasi baru</p>
                        </div>
                      ) : (
                        notifications.map((n) => (
                          <div 
                            key={n.id} 
                            onClick={(e) => handleMarkAsRead(n.id, e)}
                            className={`p-4 transition-all text-left cursor-pointer hover:bg-slate-50/80 flex gap-3 relative ${
                              n.unread ? 'bg-amber-50/10' : 'opacity-75'
                            }`}
                          >
                            <span className="relative flex h-2 w-2 mt-1.5 shrink-0">
                              {n.unread && (
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold opacity-75"></span>
                              )}
                              <span className={`relative inline-flex rounded-full h-2 w-2 ${
                                n.type === 'success' ? 'bg-emerald-500' : n.type === 'info' ? 'bg-blue-400' : 'bg-gold'
                              }`}></span>
                            </span>
                            <div className="flex-1 min-w-0 space-y-1">
                              <div className="flex justify-between items-start">
                                <h4 className="font-bold text-xs text-slate-800 pr-4 leading-normal">{n.title}</h4>
                                <span className="text-[9px] text-slate-400 font-medium whitespace-nowrap mt-0.5">{n.time}</span>
                              </div>
                              <p className="text-[11px] text-slate-500 font-medium leading-relaxed font-sans">{n.desc}</p>
                              {n.unread && (
                                <button
                                  type="button"
                                  className="text-[9px] text-gold font-bold hover:underline"
                                >
                                  Tandai telah dibaca
                                </button>
                              )}
                            </div>
                            {n.unread && (
                              <div className="absolute right-3.5 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-gold rounded-full" />
                            )}
                          </div>
                        ))
                      )}
                    </div>
                    
                    <div className="p-3 bg-slate-50 border-t border-beige text-center">
                      <p className="text-[9px] text-slate-400 font-extrabold uppercase tracking-widest font-mono">AkriliGrad Smart OS System • Online</p>
                    </div>
                  </div>
                </>
              )}
            </div>
            <div className="h-8 w-px bg-beige mx-2" />
            
            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block font-sans">
                <div className="text-xs font-bold text-navy leading-none">{profile.name}</div>
                <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-1">{profile.role}</div>
              </div>
              <div className="w-10 h-10 bg-beige rounded-xl overflow-hidden border-2 border-gold shadow-sm select-none">
                 <img src={profile.avatar} alt="Avatar" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </header>

        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
