import React from 'react';

interface LogoProps {
  className?: string;
  size?: number;
  textColor?: 'dark' | 'light' | 'none';
  showSubText?: boolean;
}

export function AkriliGradLogo({ 
  className = '', 
  size = 120, 
  textColor = 'dark',
  showSubText = false 
}: LogoProps) {
  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <svg
        width={size}
        height={size * 1.05}
        viewBox="0 0 200 210"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-lg"
      >
        <defs>
          {/* Gold metallic gradients */}
          <linearGradient id="gold-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFF2B2" />
            <stop offset="30%" stopColor="#D4AF37" />
            <stop offset="70%" stopColor="#AA7C11" />
            <stop offset="100%" stopColor="#F3E5AB" />
          </linearGradient>
          <linearGradient id="gold-base" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#AA7C11" />
            <stop offset="30%" stopColor="#FFF2B2" />
            <stop offset="50%" stopColor="#D4AF37" />
            <stop offset="75%" stopColor="#AA7C11" />
            <stop offset="100%" stopColor="#FFF2B2" />
          </linearGradient>
          <linearGradient id="acrylic-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(255, 255, 255, 0.55)" />
            <stop offset="100%" stopColor="rgba(212, 175, 55, 0.12)" />
          </linearGradient>
        </defs>

        {/* 1. Acrylic Board Shadow & Background */}
        <rect
          x="35"
          y="15"
          width="130"
          height="170"
          rx="18"
          fill="url(#acrylic-grad)"
          stroke="url(#gold-grad)"
          strokeWidth="4.5"
          strokeLinecap="round"
        />

        {/* Highlight sheen for 3D acrylic look */}
        <path
          d="M 40 30 Q 100 22 160 30"
          stroke="rgba(255, 255, 255, 0.7)"
          strokeWidth="3.5"
          strokeLinecap="round"
          fill="none"
        />

        {/* 2. Stand/Base at the bottom */}
        <path
          d="M 25 180 L 175 180 C 178 180, 180 181.5, 180 183 L 178 190 C 178 191.5, 176 193, 172 193 L 28 193 C 24 193, 22 191.5, 22 190 L 20 183 C 20 181.5, 22 180, 25 180 Z"
          fill="url(#gold-base)"
          stroke="#8A660E"
          strokeWidth="1"
        />
        {/* Shadow under the base */}
        <ellipse cx="100" cy="196" rx="72" ry="4" fill="rgba(0, 0, 0, 0.25)" />

        {/* 3. Decorative Metal Screws (bottom left and right) */}
        <circle cx="50" cy="168" r="4.5" fill="url(#gold-grad)" stroke="#8A660E" strokeWidth="1" />
        <circle cx="50" cy="168" r="1.5" fill="#FFF2B2" />
        <circle cx="150" cy="168" r="4.5" fill="url(#gold-grad)" stroke="#8A660E" strokeWidth="1" />
        <circle cx="150" cy="168" r="1.5" fill="#FFF2B2" />

        {/* 4. Graduation Cap (Top inside the board) */}
        {/* Cap diamond */}
        <path
          d="M 100 45 L 140 57 L 100 69 L 60 57 Z"
          fill="url(#gold-grad)"
        />
        {/* Cap bottom skull cap */}
        <path
          d="M 78 59.5 C 78 68, 122 68, 122 59.5"
          stroke="url(#gold-grad)"
          strokeWidth="4"
          strokeLinecap="round"
          fill="none"
        />
        {/* Tassel line */}
        <path
          d="M 100 57 L 132 68 L 132 77.5"
          stroke="#AA7C11"
          strokeWidth="2.2"
          strokeLinecap="round"
          fill="none"
        />
        {/* Tassel fringe */}
        <rect x="130" y="76.5" width="4.5" height="7" rx="0.5" fill="url(#gold-grad)" />

        {/* 5. Intertwined "AG" Logo (Center inside the board) */}
        {/* Custom stylized A inside G path */}
        <path
          d="M 75 145 L 100 85 L 125 145"
          stroke="url(#gold-grad)"
          strokeWidth="8.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        {/* Crossbar of A */}
        <path
          d="M 86 126 L 98 126"
          stroke="url(#gold-grad)"
          strokeWidth="5"
          strokeLinecap="round"
          fill="none"
        />
        {/* Loop of G, swooping outer curve from the right arm of A */}
        <path
          d="M 112 119 C 132 119, 142 131, 131 145 C 122 153, 102 152, 93 145"
          stroke="url(#gold-grad)"
          strokeWidth="8.5"
          strokeLinecap="round"
          fill="none"
        />
        {/* The inner bar of G */}
        <path
          d="M 124 135 L 136 135"
          stroke="url(#gold-grad)"
          strokeWidth="6.5"
          strokeLinecap="round"
          fill="none"
        />
      </svg>

      {textColor !== 'none' && (
        <div className="mt-3 text-center font-sans tracking-tight">
          <span className={`text-2xl font-black ${textColor === 'dark' ? 'text-slate-800' : 'text-white'}`}>
            Akri
          </span>
          <span className="text-2xl font-black text-[#D4AF37]">
            Grad
          </span>
          {showSubText && (
            <p className={`text-[9px] font-bold tracking-widest uppercase mt-1 ${textColor === 'dark' ? 'text-slate-400' : 'text-slate-300'}`}>
              Acrylic Board Rental
            </p>
          )}
        </div>
      )}
    </div>
  );
}
