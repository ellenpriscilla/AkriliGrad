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

  // Role detection
  const isStudent = currentPath.startsWith('/student');
  const isVendor = currentPath.startsWith('/vendor');
  const isAdmin = currentPath.startsWith('/admin');

  // Profile data
  const profile = isStudent 
    ? { name: 'Ellen Priscilla', role: 'Mahasiswa', type: 'STUDENT', avatar: 'https://i.pravatar.cc/150?u=ellen' }
    : isVendor
    ? { name: 'GradCraft Vendor', role: 'SaaS Vendor', type: 'VENDOR', avatar: 'https://i.pravatar.cc/150?u=gradcraft' }
    : { name: 'SaaS Administrator', role: 'Super Admin', type: 'SUPER_ADMIN', avatar: 'https://i.pravatar.cc/150?u=admin' };

  return (
    <div className="min-h-screen bg-beige flex font-sans selection:bg-gold/30 selection:text-navy">
      {/* Sidebar */}
      <aside className="w-72 bg-navy border-r border-navy/50 p-6 flex flex-col fixed h-full z-20 text-white">
        <div className="flex items-center gap-3 mb-12">
          <div className="w-10 h-10 bg-gold rounded-xl flex items-center justify-center text-navy font-bold text-xl shadow-lg shadow-gold/20">A</div>
          <div>
            <span className="font-extrabold text-2xl tracking-tight text-white border-b-2 border-gold pb-0.5">AkriliGrad</span>
            <div className="text-[8px] text-gold font-bold tracking-widest uppercase mt-0.5">SaaS Platform</div>
          </div>
        </div>

        <nav className="flex-1 space-y-2">
          {isStudent && (
            <>
              <div className="text-[10px] font-extrabold text-slate-500 uppercase tracking-[0.2em] mb-4 px-4">Menu Mahasiswa</div>
              <SidebarItem icon={LayoutDashboard} label="Dashboard" href="/student/dashboard" active={currentPath === '/student/dashboard'} />
              <SidebarItem icon={ShoppingBag} label="Katalog Rental" href="/student/catalog" active={currentPath.startsWith('/student/catalog')} />
            </>
          )}

          {isVendor && (
            <>
              <div className="text-[10px] font-extrabold text-slate-500 uppercase tracking-[0.2em] mb-4 px-4">Menu Vendor</div>
              <SidebarItem icon={LayoutDashboard} label="Dashboard Performa" href="/vendor/dashboard" active={currentPath === '/vendor/dashboard'} />
            </>
          )}

          {isAdmin && (
            <>
              <div className="text-[10px] font-extrabold text-slate-500 uppercase tracking-[0.2em] mb-4 px-4">Menu Platfom Owner</div>
              <SidebarItem icon={ShieldCheck} label="Platform Hub" href="/admin/dashboard" active={currentPath === '/admin/dashboard'} />
            </>
          )}
          
          <div className="text-[10px] font-extrabold text-slate-500 uppercase tracking-[0.2em] mt-10 mb-4 px-4">SaaS Info</div>
          <div className="px-4 py-3 bg-white/5 rounded-2xl border border-white/10 text-[11px] text-slate-300">
             <div className="font-bold text-gold">Sub Vendor:</div>
             <div className="text-[10px] text-white/70 mt-0.5 leading-relaxed">Tarif: Rp50k / bulan • Komisi 10% terhitung otomatis.</div>
          </div>
        </nav>

        <button 
          onClick={() => navigate('/')}
          className="flex items-center gap-3 px-4 py-3.5 text-slate-400 hover:text-gold hover:bg-white/5 rounded-2xl transition-all font-bold text-sm mt-auto"
        >
          <LogOut className="w-5 h-5" />
          Keluar ke Home
        </button>
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
               SaaS Mode: {profile.type}
            </div>
            
            <button className="p-2.5 text-slate-400 hover:text-navy hover:bg-beige rounded-xl transition-all relative">
              <Bell className="w-5 h-5" />
              <div className="absolute top-2 right-2 w-2 h-2 bg-gold rounded-full border-2 border-white" />
            </button>
            <div className="h-8 w-px bg-beige mx-2" />
            
            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <div className="text-xs font-bold text-navy leading-none">{profile.name}</div>
                <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-1">{profile.role}</div>
              </div>
              <div className="w-10 h-10 bg-beige rounded-xl overflow-hidden border-2 border-gold shadow-sm">
                 <img src={profile.avatar} alt="Avatar" />
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
