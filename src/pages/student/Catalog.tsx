import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Star, Heart, Store } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useDemoData } from '../../context/DemoContext';

export default function Catalog() {
  const { products } = useDemoData();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('Semua');

  // Categories/Tags from current products
  const filters = ['Semua', 'Convex', 'Bulat', 'Oval', 'Persegi Panjang', 'Transparan', 'Mirror'];

  const filteredProducts = products.filter(p => {
    const nameLower = p.name.toLowerCase();
    const descLower = p.description ? p.description.toLowerCase() : '';
    const colorLower = p.color ? p.color.toLowerCase() : '';

    const matchesSearch = nameLower.includes(searchTerm.toLowerCase()) || 
                          p.vendorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          p.vendorId.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (!matchesSearch) return false;
    if (selectedFilter === 'Semua') return true;

    const filterLower = selectedFilter.toLowerCase();

    // Specific filter mappings
    if (filterLower === 'convex' || filterLower === 'convex mirror') {
      return nameLower.includes('convex') || descLower.includes('convex') || descLower.includes('cembung');
    }

    if (filterLower === 'transparan') {
      return nameLower.includes('standing akrilik transparan');
    }

    if (filterLower === 'mirror') {
      return nameLower.includes('mirror') || descLower.includes('mirror') || colorLower.includes('mirror') || nameLower.includes('cermin');
    }

    return nameLower.includes(filterLower);
  });

  const formatIDR = (num: number) => {
    return `Rp${num.toLocaleString('id-ID')}`;
  };

  return (
    <div className="space-y-8">
      {/* Header banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-navy/10">
        <div>
          <h1 className="text-3xl font-black text-navy tracking-tight uppercase">Katalog Papan Akrilik Wisuda</h1>
          <p className="text-navy/50 font-semibold tracking-tight mt-1 uppercase text-[10px] tracking-widest text-[#D4AF37]">
            Pilih Desain Kreatif & Custom Teks Kelulusan Anda Secara Instan
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Cari akrilik wisuda..." 
              className="bg-white border border-beige rounded-xl py-2.5 pl-10 pr-4 text-sm focus:ring-2 focus:ring-gold/20 outline-none w-64 transition-all" 
            />
          </div>
        </div>
      </div>

      {/* Filter Category Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {filters.map((filter, i) => (
          <button 
            key={i} 
            onClick={() => setSelectedFilter(filter)}
            className={`px-6 py-2 rounded-full font-black text-[10px] uppercase tracking-widest transition-all whitespace-nowrap ${
              selectedFilter === filter 
                ? 'bg-gold text-slate-950 font-black shadow-lg shadow-gold/20' 
                : 'bg-white text-navy border border-beige hover:bg-beige'
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* No results prompt */}
      {filteredProducts.length === 0 && (
        <div className="bg-white rounded-3xl border border-beige p-12 text-center max-w-sm mx-auto">
          <Store className="w-12 h-12 text-[#D4AF37] mx-auto mb-4" />
          <h3 className="text-sm font-black text-navy uppercase">Produk Tidak Ditemukan</h3>
          <p className="text-xs text-slate-400 font-semibold mt-1">Coba bersihkan filter pencarian atau ketik kata kunci lain.</p>
        </div>
      )}

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProducts.map((p, i) => (
          <Link to={`/student/catalog/${p.id}`} key={p.id} className="block group">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
              className="bg-white rounded-[40px] border border-beige overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-navy/5 hover:-translate-y-1.5 transition-all p-2.5"
            >
              <div className="aspect-[4/5] relative overflow-hidden rounded-[32px] bg-slate-50">
                 <img 
                   src={p.image || p.imageUrl} 
                   alt={p.name} 
                   className={`w-full h-full object-cover transition-transform duration-700 ${
                     p.id === 'p4' 
                       ? 'origin-top scale-[1.18] group-hover:scale-[1.24]' 
                       : 'group-hover:scale-105'
                   }`} 
                 />
                 
                 <div className="absolute top-4 right-4">
                    <button className="p-2.5 bg-white/95 backdrop-blur-md text-[#D4AF37] rounded-2xl shadow-lg hover:bg-white">
                      <Heart className="w-4 h-4 fill-current" />
                    </button>
                 </div>
                 
                 <div className="absolute bottom-4 left-4">
                    <div className="bg-gold text-slate-950 px-3.5 py-1 rounded-full text-[9px] font-black uppercase tracking-widest shadow-lg">
                      Stok Ready: {p.stock}
                    </div>
                 </div>
              </div>
              
              <div className="p-5 text-left">
                <div className="flex items-center justify-between mb-2">
                   <div className="text-[10px] font-black text-[#0B3D91] uppercase tracking-widest flex items-center gap-1">
                     <Store className="w-3.5 h-3.5 text-[#D4AF37]" /> {p.vendorName || p.vendorId}
                   </div>
                   <div className="flex items-center gap-1.5 bg-yellow-50 text-gold px-2 py-0.5 rounded-lg">
                     <Star className="w-3 h-3 fill-current" />
                     <span className="text-[9px] font-black tracking-widest">4.9</span>
                   </div>
                </div>
                
                <h3 className="font-extrabold text-navy text-lg tracking-tight group-hover:text-[#0B3D91] transition-colors uppercase leading-snug mb-4">{p.name}</h3>
                
                <div className="flex items-center justify-between gap-3 pt-2 border-t border-beige">
                   <div>
                     <div className="text-[9px] text-slate-400 font-bold uppercase tracking-widest leading-none mb-1">Tarif Sewa</div>
                     <div className="text-navy font-black text-xl tracking-tight">{formatIDR(p.price)}</div>
                   </div>
                   <div className="px-3 py-1.5 bg-navy text-[#FFF8E7] text-[9px] font-extrabold uppercase tracking-widest rounded-lg group-hover:bg-gold group-hover:text-navy transition-all shrink-0 cursor-pointer">
                      Sewa Sekarang
                   </div>
                </div>
              </div>
            </motion.div>
          </Link>
        ))}
      </div>
    </div>
  );
}
