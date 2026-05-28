import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Star, 
  Sparkles, 
  CheckCircle2, 
  ShoppingCart, 
  Ruler, 
  Palette, 
  Type,
  User,
  GraduationCap,
  Calendar as CalendarIcon,
  MessageSquare,
  Building2,
  Phone
} from 'lucide-react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useDemoData } from '../../context/DemoContext';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, placeOrder, currentStudent } = useDemoData();
  
  // Find product from dynamic context state
  const product = products.find(p => p.id === id) || products[0] || {
    id: 'p1',
    vendorId: 'v1',
    vendorName: 'GradCraft Bangka',
    name: 'Standing Akrilik Bulat',
    description: 'Papan akrilik bulat wisuda estetik dengan tripod kayu premium.',
    price: 70000,
    imageUrl: 'https://media.karousell.com/media/photos/products/2024/6/19/paket_usaha_papan_akrilik_1718797062_1b65e9df_progressive.jpg',
    stock: 5,
    size: '40x60 cm',
    color: 'Emas'
  };

  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedSize, setSelectedSize] = useState(product.size || '40x60 cm');
  const [selectedColor, setSelectedColor] = useState(product.color || 'Emas');
  const [successMsg, setSuccessMsg] = useState(false);

  // Student specific parameters
  const [studentDetails, setStudentDetails] = useState({
    studentName: currentStudent ? currentStudent.name : 'Ellen Priscilla',
    whatsapp: '082188992211',
    university: 'Universitas Bangka Belitung',
    pickupDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 2 days from now
    returnDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 5 days from now
    notes: 'Mohon dirangkai dengan tripod kayu kokoh warna cokelat bersih.'
  });

  const [formData, setFormData] = useState({
    greeting: 'Happy Graduation',
    name: currentStudent ? `${currentStudent.name}, S.Bns` : 'Ellen Priscilla, S.Bns',
    major: currentStudent ? currentStudent.occupation : 'Bisnis Digital',
    year: 'Angkatan 2023'
  });

  // Local AI emulation (no external API crash risk)
  const generateAI = () => {
    if (!formData.name) return;
    setIsGenerating(true);
    setTimeout(() => {
      const templates = [
        `Selamat Atas Kelulusan Terbaik, ${formData.name}!`,
        `Happy Graduation! Proud of you, ${formData.name}`,
        `Congratulations on Your Well-Deserved Success, ${formData.name}!`,
      ];
      const randomTpl = templates[Math.floor(Math.random() * templates.length)];
      setFormData(prev => ({
        ...prev,
        greeting: randomTpl
      }));
      setIsGenerating(false);
    }, 800);
  };

  const formatIDR = (num: number) => {
    return `Rp${num.toLocaleString('id-ID')}`;
  };

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();

    const customTextText = `${formData.greeting} \n${formData.name} \n${formData.major} \n${formData.year}`;

    // Place order in memory/localStorage context
    placeOrder({
      studentName: studentDetails.studentName,
      graduateName: formData.name,
      university: studentDetails.university,
      whatsapp: studentDetails.whatsapp,
      productId: product.id,
      productName: product.name,
      price: product.price,
      vendorId: product.vendorId,
      vendorName: product.vendorName || 'Vendor Terkait',
      pickupDate: studentDetails.pickupDate,
      returnDate: studentDetails.returnDate,
      size: selectedSize,
      customText: customTextText,
      notes: studentDetails.notes
    });

    setSuccessMsg(true);
    setTimeout(() => {
      navigate('/student/dashboard');
    }, 1800);
  };

  return (
    <div className="space-y-6">
      <Link to="/student/catalog" className="inline-flex items-center gap-2 text-[#B8860B] font-black text-xs uppercase tracking-widest hover:bg-[#FFF8E7] transition-all bg-white px-5 py-2 rounded-xl border border-[#D4AF37]/20">
        <ArrowLeft className="w-4 h-4 text-[#D4AF37]" /> Kembali ke Katalog
      </Link>

      <div className="grid md:grid-cols-2 gap-12 items-start">
        {/* Left: Product Image & Digital Mockup Preview */}
        <div className="space-y-6">
          <div className="bg-white p-4 rounded-[48px] border border-beige shadow-xl relative group">
            <div className="aspect-[4/5] rounded-[40px] overflow-hidden bg-slate-100 relative">
               <img 
                 src={product.imageUrl || product.image} 
                 className={`w-full h-full object-cover transition-transform duration-500 ${product.id === 'p4' ? 'origin-top scale-[1.18] group-hover:scale-[1.22]' : 'group-hover:scale-102'}`}
                 alt="Product board" 
               />
               
               {/* Translucent Mockup Overlay representing the customized text preview */}
               <div className="absolute inset-0 bg-slate-900/40 flex flex-col items-center justify-center p-8 text-center text-white backdrop-blur-[1px]">
                  <div className="border border-white/40 rounded-2xl p-6 w-full max-w-[280px] bg-black/60 shadow-2xl space-y-3 relative overflow-hidden backdrop-blur-md">
                     <div className="absolute top-2 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-slate-600" />
                     <div className="text-[10px] font-black tracking-widest text-[#D4AF37] uppercase">{formData.greeting}</div>
                     <div className="h-0.5 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent w-full" />
                     <div className="text-sm font-black text-white tracking-tight uppercase leading-snug">{formData.name}</div>
                     <div className="text-[10px] text-slate-300 font-bold tracking-wider">{formData.major}</div>
                     <div className="text-[9px] text-[#D4AF37] font-bold uppercase tracking-widest">{formData.year}</div>
                  </div>
                  <span className="absolute bottom-4 text-[9px] font-black text-white bg-gold/90 text-slate-950 px-3 py-1 rounded-full uppercase tracking-wider">
                     Live Mockup Preview Belitong
                  </span>
               </div>
            </div>
          </div>
          
          <div className="bg-white/80 border border-beige rounded-2xl p-5 text-left">
             <h4 className="text-xs font-black uppercase text-navy tracking-wider mb-2">💡 Deskripsi Produk:</h4>
             <p className="text-xs text-slate-500 font-medium leading-relaxed">{product.description}</p>
          </div>
        </div>

        {/* Right: Configurator Form & Checkout Details */}
        <div className="space-y-8">
          <div className="space-y-3 text-left">
            <div className="flex items-center gap-2 text-[10px] font-black text-gold uppercase tracking-widest bg-beige border border-yellow-200 px-3 py-1 rounded-full w-max">
              Mitra Vendor: <span className="text-[#0B3D91] underline">{product.vendorName || product.vendorId}</span>
            </div>
            <h1 className="text-3xl font-black text-navy tracking-tight uppercase">{product.name}</h1>
            <div className="flex items-center gap-6">
              <div className="text-2xl font-black text-navy">{formatIDR(product.price)} <span className="text-xs text-[#0B3D91] font-bold">/3 Hari Sewa</span></div>
              <div className="flex items-center gap-1 bg-yellow-50 text-gold px-3 py-1 rounded-full border border-gold/10">
                <Star className="w-3.5 h-3.5 fill-current" />
                <span className="text-xs font-black">4.9</span>
              </div>
            </div>
          </div>

          <form onSubmit={handleCheckout} className="space-y-6 text-left">
            {/* Customization Options */}
            <div className="bg-white p-6 rounded-[32px] border border-beige space-y-6">
              <div className="text-xs font-black uppercase text-navy tracking-wider border-b border-beige pb-3">
                 1. Desain Dan Tulisan Papan
              </div>

              {/* Sizes list selector */}
              <div className="space-y-3">
                <label className="text-[10px] font-black text-navy/40 uppercase tracking-widest flex items-center gap-2">
                  <Ruler className="w-3.5 h-3.5" /> Pilih Ukuran Ukiran
                </label>
                <div className="flex flex-wrap gap-2">
                  {['40x60 cm', '50x70 cm', '60x90 cm'].map(size => (
                    <button 
                      type="button"
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-5 py-2 rounded-xl font-black text-[10px] uppercase tracking-widest border transition-all ${
                        selectedSize === size 
                          ? 'bg-[#D4AF37] text-white border-[#D4AF37] shadow-md shadow-gold/15' 
                          : 'bg-white text-[#1F2937] border-beige hover:border-[#D4AF37]'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Teks Inputs */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-[10px] font-black text-navy/40 uppercase tracking-widest flex items-center gap-2">
                    <Type className="w-3.5 h-3.5" /> Sesuaikan Ucapan Graduation
                  </label>
                  <button 
                    type="button"
                    onClick={generateAI}
                    disabled={isGenerating}
                    className="text-[9px] flex items-center gap-1.5 px-3 py-1.5 bg-gold text-slate-950 font-black uppercase tracking-widest rounded-lg shadow-lg shadow-gold/10 hover:brightness-110 transition-all disabled:opacity-50"
                  >
                    {isGenerating ? <div className="w-3 h-3 border-2 border-slate-950 border-t-transparent animate-spin rounded-full" /> : <Sparkles className="w-3 h-3 text-slate-950" />}
                    Template AI Cerdas
                  </button>
                </div>
                
                <div className="space-y-3">
                  <input 
                    type="text"
                    required
                    value={formData.greeting}
                    onChange={e => setFormData({ ...formData, greeting: e.target.value })}
                    placeholder="Ucapan Utama (Misal: Happy Graduation)" 
                    className="w-full bg-slate-50 border border-beige rounded-xl py-2.5 px-4 text-xs font-bold focus:bg-white focus:border-gold outline-none transition-all text-navy" 
                  />

                  <input 
                    type="text"
                    required
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Nama Lengkap & Gelar Wisudawan" 
                    className="w-full bg-slate-50 border border-beige rounded-xl py-2.5 px-4 text-xs font-bold focus:bg-white focus:border-gold outline-none transition-all text-navy" 
                  />

                  <div className="grid grid-cols-2 gap-3">
                    <input 
                      type="text"
                      required
                      value={formData.major}
                      onChange={e => setFormData({ ...formData, major: e.target.value })}
                      placeholder="Fakultas / Program Studi" 
                      className="w-full bg-slate-50 border border-beige rounded-xl py-2.5 px-4 text-xs font-bold focus:bg-white focus:border-gold outline-none transition-all text-navy" 
                    />
                    <input 
                      type="text"
                      required
                      value={formData.year}
                      onChange={e => setFormData({ ...formData, year: e.target.value })}
                      placeholder="Angkatan (Misal: Class of 2024)" 
                      className="w-full bg-slate-50 border border-beige rounded-xl py-2.5 px-4 text-xs font-bold focus:bg-white focus:border-gold outline-none transition-all text-navy" 
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Student metadata, dates and university */}
            <div className="bg-white p-6 rounded-[32px] border border-beige space-y-6">
              <div className="text-xs font-black uppercase text-[#0B3D91] tracking-wider border-b border-beige pb-3">
                 2. Universitas & Jadwal Pengambilan (Bangka)
              </div>

              <div className="space-y-4">
                {/* School selector */}
                <div className="space-y-2">
                   <label className="text-[10px] font-black text-navy/40 uppercase tracking-widest flex items-center gap-1.5">
                     <Building2 className="w-3.5 h-3.5" /> Universitas Tujuan Bangka Belitung
                   </label>
                   <select 
                     value={studentDetails.university}
                     onChange={e => setStudentDetails({ ...studentDetails, university: e.target.value })}
                     className="w-full bg-slate-50 border border-beige rounded-xl py-2.5 px-4 text-xs font-bold text-navy outline-none focus:bg-white focus:border-gold"
                   >
                     <option value="Universitas Bangka Belitung">Universitas Bangka Belitung</option>
                     <option value="Poltekes Bangka">Poltekes Bangka</option>
                     <option value="Polman Babel">Polman Babel</option>
                   </select>
                </div>

                {/* Name of order taker */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                     <label className="text-[10px] font-black text-navy/40 uppercase tracking-widest">
                       Nama Penyewa (Anda)
                     </label>
                     <input 
                       type="text"
                       required
                       value={studentDetails.studentName}
                       onChange={e => setStudentDetails({ ...studentDetails, studentName: e.target.value })}
                       placeholder="Misal: Ellen Priscilla" 
                       className="w-full bg-slate-50 border border-beige rounded-xl py-2.5 px-4 text-xs font-bold text-navy focus:bg-white" 
                     />
                  </div>
                  <div className="space-y-2">
                     <label className="text-[10px] font-black text-navy/40 uppercase tracking-widest flex items-center gap-1">
                       <Phone className="w-3 h-3" /> No WA Aktif
                     </label>
                     <input 
                       type="text"
                       required
                       value={studentDetails.whatsapp}
                       onChange={e => setStudentDetails({ ...studentDetails, whatsapp: e.target.value })}
                       placeholder="Contoh: 082188..." 
                       className="w-full bg-slate-50 border border-beige rounded-xl py-2.5 px-4 text-xs font-bold text-navy focus:bg-white" 
                     />
                  </div>
                </div>

                {/* Pickup & return date scheduler */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                     <label className="text-[10px] font-black text-navy/40 uppercase tracking-widest flex items-center gap-1">
                       <CalendarIcon className="w-3 h-3" /> Tanggal Ambil
                     </label>
                     <input 
                       type="date"
                       required
                       value={studentDetails.pickupDate}
                       onChange={e => setStudentDetails({ ...studentDetails, pickupDate: e.target.value })}
                       className="w-full bg-slate-50 border border-beige rounded-xl py-2.5 px-4 text-xs font-bold text-navy focus:border-gold outline-none" 
                     />
                  </div>
                  <div className="space-y-2">
                     <label className="text-[10px] font-black text-navy/40 uppercase tracking-widest flex items-center gap-1">
                       <CalendarIcon className="w-3 h-3" /> Tanggal Balik
                     </label>
                     <input 
                       type="date"
                       required
                       value={studentDetails.returnDate}
                       onChange={e => setStudentDetails({ ...studentDetails, returnDate: e.target.value })}
                       className="w-full bg-slate-50 border border-beige rounded-xl py-2.5 px-4 text-xs font-bold text-navy focus:border-gold outline-none" 
                     />
                  </div>
                </div>

                {/* Booking comments */}
                <div className="space-y-2">
                   <label className="text-[10px] font-black text-navy/40 uppercase tracking-widest">
                     Catatan / Request Tambahan
                   </label>
                   <textarea
                     rows={2}
                     value={studentDetails.notes}
                     onChange={e => setStudentDetails({ ...studentDetails, notes: e.target.value })}
                     placeholder="Beri tahu vendor detail tripod, pita, atau request dekorasi bunga tambahan."
                     className="w-full bg-slate-50 border border-beige rounded-xl p-3 text-xs font-bold text-navy focus:bg-white"
                   />
                </div>
              </div>
            </div>

            {successMsg && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-emerald-50 border border-emerald-450 p-4 rounded-2xl flex items-center gap-3 text-emerald-800"
              >
                <CheckCircle2 className="w-6 h-6 text-emerald-500 shrink-0" />
                <div>
                   <div className="font-extrabold text-sm uppercase">Pesanan Sewa Berhasil Dibuat!</div>
                   <div className="text-[10px] font-bold">Mengarahkan Anda ke dashboard pesanan saya...</div>
                </div>
              </motion.div>
            )}

            <button 
              type="submit"
              className="w-full py-5 bg-[#D4AF37] hover:bg-[#B8860B] text-white rounded-[24px] font-black text-sm uppercase tracking-widest shadow-2xl shadow-gold/20 flex items-center justify-center gap-3 hover:-translate-y-1 transition-all active:scale-[0.98]"
            >
               <ShoppingCart className="w-5 h-5 text-[#D4AF37]" /> Konfirmasi & Pesan Papan
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
