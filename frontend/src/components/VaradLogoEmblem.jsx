import React from 'react';

/**
 * HD Vector Logo & Emblem for Varad Netralaya
 * Recreates the exact emblem: Blue V-frame holding the Orange Spiral Eye Icon
 */
export const VaradEyeEmblem = ({ className = "w-10 h-10" }) => {
  return (
    <svg 
      className={className} 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Left Blue V Arm */}
      <path 
        d="M20 32 L38 32 L50 68 L40 68 Z" 
        fill="#0B5ED7" 
      />
      
      {/* Right Blue V Arm */}
      <path 
        d="M80 32 L62 32 L50 68 L60 68 Z" 
        fill="#0B5ED7" 
      />
      
      {/* Bottom Blue V Point Triangle */}
      <path 
        d="M44 68 L56 68 L50 78 Z" 
        fill="#0B5ED7" 
      />

      {/* Main Orange Outer Circle */}
      <circle 
        cx="50" 
        cy="40" 
        r="18" 
        fill="#F97316" 
      />

      {/* White Spiral Swirl inside Orange Circle */}
      <path 
        d="M48 26 C57 26 62 33 60 41 C58 48 50 51 44 47 C39 43 40 36 46 34 C50 32 54 36 53 40 C52 42 49 43 47 41" 
        stroke="white" 
        strokeWidth="3.5" 
        strokeLinecap="round" 
        fill="none" 
      />
      
      {/* Eye pupil white highlight dot */}
      <circle cx="43" cy="34" r="2.5" fill="white" />
    </svg>
  );
};

export const VaradLogoBadge = ({ size = "md", showTagline = true, variant = "horizontal" }) => {
  return (
    <div className={`flex items-center gap-3 font-poppins ${variant === 'vertical' ? 'flex-col text-center' : ''}`}>
      {/* HD Logo Image & Vector Emblem Container */}
      <div className="relative group flex-shrink-0">
        <div className="absolute -inset-1 rounded-2xl bg-gradient-to-tr from-blue-600 via-amber-400 to-teal-400 opacity-60 blur-sm group-hover:opacity-100 transition-opacity"></div>
        
        <div className="relative rounded-2xl bg-white dark:bg-slate-900 border-2 border-amber-400/80 p-2 shadow-md flex items-center justify-center overflow-hidden">
          <img 
            src="/Varadlogo.png" 
            alt="Varad Netralaya Logo" 
            className={`${
              size === 'sm' ? 'h-9 w-auto' : size === 'lg' ? 'h-24 w-auto' : 'h-11 sm:h-12 w-auto'
            } object-contain transition-transform duration-300 group-hover:scale-105`} 
          />
        </div>
      </div>

      {/* Typography Label */}
      <div className={variant === 'vertical' ? 'mt-2' : ''}>
        <div className="flex items-center tracking-tight">
          <span className="text-xl sm:text-2xl font-black text-blue-900 dark:text-white">VARAD</span>
          <span className="text-xl sm:text-2xl font-light text-teal-600 dark:text-teal-400 ml-1.5">NETRALAYA</span>
        </div>
        <p className="text-[11px] font-bold text-amber-600 dark:text-amber-400 tracking-wider uppercase">
          वरद नेत्रालय • सावेडी, अहिल्यानगर
        </p>
        {showTagline && (
          <p className="text-[10px] font-medium text-slate-500 dark:text-slate-400 italic">
            — नेत्रसेवेचा आधुनिक दृष्टिकोन —
          </p>
        )}
      </div>
    </div>
  );
};

export default VaradLogoBadge;
