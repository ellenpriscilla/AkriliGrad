import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDemoData } from '../context/DemoContext';
import { 
  ShieldCheck, 
  Store, 
  ShoppingBag, 
  User, 
  Globe, 
  Sparkles,
  ChevronDown
} from 'lucide-react';

export default function SaaSSimulatorBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;
  const { vendors, selectedVendorId, setSelectedVendorId, orders } = useDemoData();

  const [showVendorDropdown, setShowVendorDropdown] = React.useState(false);

  const activeVendor = vendors.find(v => v.id === selectedVendorId) || vendors[0];

  const roles = [
    { 
      id: 'landing', 
      label: '1. Landing Page (SaaS)', 
      path: '/', 
      icon: Globe,
      color: 'bg-indigo-500', 
      desc: 'Pemasaran SaaS untuk Vendor'
    },
    { 
      id: 'catalog', 
      label: '2. Student Catalog', 
      path: '/student/catalog', 
      icon: ShoppingBag,
      color: 'bg-emerald-500', 
      desc: 'Katalog Sewa Akrilik Wisuda'
    },
    { 
      id: 'student_dashboard', 
      label: '3. Student Dashboard', 
      path: '/student/dashboard', 
      icon: User,
      color: 'bg-amber-500', 
      desc: 'Cek Status & Progress Sewa'
    },
    { 
      id: 'vendor', 
      label: '4. Vendor Dashboard', 
      path: '/vendor/dashboard', 
      icon: Store,
      color: 'bg-blue-600', 
      desc: 'Manajemen Keuangan & Jadwal'
    },
    { 
      id: 'super_admin', 
      label: '5. Super Admin API Hub', 
      path: '/admin/dashboard', 
      icon: ShieldCheck,
      color: 'bg-gold', 
      desc: 'SaaS Platform Owner Metrics'
    }
  ];

  return (
    <div className="bg-slate-900 text-white border-b-2 border-gold/40 sticky top-0 z-50 shadow-2xl font-sans selection:bg-gold/30 selection:text-white">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 py-2.5 flex flex-wrap gap-4 items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gold text-slate-900 flex items-center justify-center font-black text-sm shadow-md animate-pulse">⚡</div>
          <div>
             <div className="text-xs font-black tracking-widest text-gold uppercase leading-none">AkriliGrad SaaS</div>
             <div className="text-[9px] font-bold text-slate-400 uppercase leading-none mt-1">Simulasi 3 Peran & Real State Flow</div>
          </div>
        </div>

        {/* Roles navigation */}
        <div className="flex flex-wrap items-center gap-1.5 bg-slate-800/80 p-1 rounded-xl border border-slate-700">
          {roles.map((role) => {
            const isActive = currentPath === role.path || (role.id === 'catalog' && currentPath.startsWith('/student/catalog'));
            return (
              <button
                key={role.id}
                onClick={() => navigate(role.path)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 ${
                  isActive 
                    ? 'bg-gold text-slate-950 shadow-md transform scale-[1.02]' 
                    : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
                }`}
              >
                <role.icon className="w-3.5 h-3.5" />
                <span>{role.label.split('. ')[1]}</span>
              </button>
            );
          })}
        </div>

        {/* Simulated parameters: Like swapping simulated Vendor */}
        <div className="flex items-center gap-3">
          {currentPath.includes('/vendor') && (
            <div className="relative">
              <button 
                onClick={() => setShowVendorDropdown(!showVendorDropdown)}
                className="bg-slate-800 border border-slate-700 text-white rounded-xl px-3 py-1.5 text-xs font-bold leading-none flex items-center gap-2 hover:bg-slate-700 transition-all"
              >
                <span>Simulasi Vendor: <strong className="text-gold">{activeVendor.name}</strong></span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {showVendorDropdown && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-slate-200 py-1.5 z-50 text-slate-800 animate-slide-up">
                  <div className="px-3 py-1.5 text-[10px] uppercase font-black tracking-widest text-slate-400 border-b border-slate-100">
                    Ganti Vendor Simulasi
                  </div>
                  {vendors.map(v => (
                    <button
                      key={v.id}
                      onClick={() => {
                        setSelectedVendorId(v.id);
                        setShowVendorDropdown(false);
                      }}
                      className={`w-full text-left px-4 py-2 text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-between ${
                        v.id === selectedVendorId 
                          ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-600' 
                          : 'hover:bg-slate-50 text-slate-700'
                      }`}
                    >
                      <span>{v.name}</span>
                      <span className="text-[10px] text-slate-400 font-medium">({v.totalOrders} order)</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Quick Stats Pill */}
          <div className="hidden lg:flex items-center gap-2 bg-slate-800 border border-slate-700 rounded-xl px-3 py-1 text-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span className="font-bold text-slate-300 text-[10px] uppercase tracking-wider">
              Live Database: <span className="text-white font-extrabold">{orders.length} Orders</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
