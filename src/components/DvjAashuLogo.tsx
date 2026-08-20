import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'light' | 'dark' | 'glass';
  animated?: boolean;
}

export const DvjAashuLogo: React.FC<LogoProps> = ({
  size = 'md',
  variant = 'dark',
  animated = false,
}) => {
  const dimensions = {
    sm: { icon: 'w-7 h-7', text: 'text-sm', sub: 'text-[8px]', gap: 'gap-2' },
    md: { icon: 'w-9 h-9', text: 'text-base', sub: 'text-[9px]', gap: 'gap-2.5' },
    lg: { icon: 'w-12 h-12', text: 'text-xl', sub: 'text-[11px]', gap: 'gap-3' },
    xl: { icon: 'w-16 h-16', text: 'text-2xl', sub: 'text-xs', gap: 'gap-3.5' },
  }[size];

  const textColor = variant === 'light' ? 'text-white' : 'text-[var(--text-primary)]';
  const subColor = variant === 'light' ? 'text-white/70' : 'text-[var(--text-secondary)]';

  return (
    <div className={`flex items-center ${dimensions.gap} select-none group`}>
      {/* Vinyl + Audio Wave Crest Icon */}
      <div className={`relative ${dimensions.icon} rounded-xl bg-gradient-to-br from-[#1D1D1F] via-[#2C2C32] to-[#0071E3] p-[1.5px] shadow-md group-hover:shadow-[#0071E3]/20 transition-all duration-300 flex-shrink-0`}>
        <div className="w-full h-full rounded-[10px] bg-[#0E0E12] flex items-center justify-center relative overflow-hidden">
          
          {/* Subtle Radial Glow */}
          <div className="absolute inset-0 bg-gradient-to-tr from-[#0071E3]/30 to-transparent opacity-60" />

          {/* SVG DJ Audio-Visual Emblem */}
          <svg
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={`w-3/4 h-3/4 relative z-10 ${animated ? 'animate-pulse' : ''}`}
          >
            {/* Turntable Outer Ring */}
            <circle cx="20" cy="20" r="16" stroke="#0071E3" strokeWidth="1.5" strokeDasharray="4 2" className="opacity-80" />
            <circle cx="20" cy="20" r="11" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
            
            {/* Center Vinyl Core */}
            <circle cx="20" cy="20" r="4.5" fill="#0071E3" />
            <circle cx="20" cy="20" r="1.8" fill="#FFFFFF" />

            {/* Dynamic Equalizer Bars Overlay */}
            <path d="M7 20v-2M10 20v-4M13 20v-7M27 20v-7M30 20v-4M33 20v-2" stroke="#00C7BE" strokeWidth="1.8" strokeLinecap="round" />
          </svg>

          {/* Active Soundwave Indicator */}
          {animated && (
            <div className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-[#00C7BE] animate-ping" />
          )}
        </div>
      </div>

      {/* Typography Brand Block */}
      <div className="flex flex-col text-left">
        <div className="flex items-center gap-1.5">
          <span className={`font-headline font-extrabold tracking-tight ${dimensions.text} ${textColor} leading-none`}>
            DVJ AASHU
          </span>
          <span className="px-1.5 py-0.5 rounded bg-[#0071E3]/15 text-[#0071E3] text-[9px] font-mono font-bold tracking-wider uppercase border border-[#0071E3]/20">
            PRO
          </span>
        </div>
        <span className={`font-mono font-medium ${dimensions.sub} ${subColor} uppercase tracking-wider mt-0.5`}>
          Audio-Visual DJ & Producer
        </span>
      </div>
    </div>
  );
};
