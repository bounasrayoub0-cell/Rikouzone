import React, { useState } from 'react';

interface RkoCoinLogoProps {
  className?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  withGlow?: boolean;
  alt?: string;
}

const sizeMap = {
  xs: 'w-4 h-4',
  sm: 'w-5 h-5',
  md: 'w-7 h-7',
  lg: 'w-10 h-10',
  xl: 'w-14 h-14',
  '2xl': 'w-20 h-20'
};

export const RkoCoinLogo: React.FC<RkoCoinLogoProps> = ({
  className = '',
  size = 'md',
  withGlow = false,
  alt = 'RKO Virtual Coin'
}) => {
  const [imageError, setImageError] = useState(false);
  const sizeClass = sizeMap[size] || sizeMap.md;

  return (
    <div className={`relative inline-flex items-center justify-center shrink-0 select-none ${className}`}>
      {withGlow && (
        <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-amber-500/40 via-yellow-400/40 to-amber-600/40 blur-sm pointer-events-none" />
      )}

      {!imageError ? (
        <img
          src="/assets/aistudio/file_000000000fe481f490bf3799e77d25b8_d1fc8772.png"
          onError={(e) => {
            if (e.currentTarget.src.includes('aistudio')) {
              e.currentTarget.src = '/assets/rko-coin.png';
            } else {
              setImageError(true);
            }
          }}
          alt={alt}
          className={`relative ${sizeClass} rounded-full object-contain shrink-0`}
          loading="eager"
        />
      ) : (
        /* High-fidelity Vector Fallback Coin with Metallic Gold Finish */
        <svg
          viewBox="0 0 100 100"
          className={`relative ${sizeClass} rounded-full shadow-md shadow-amber-950/30`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="rkoGoldGradOuter" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFF2A7" />
              <stop offset="25%" stopColor="#F59E0B" />
              <stop offset="50%" stopColor="#D97706" />
              <stop offset="75%" stopColor="#78350F" />
              <stop offset="100%" stopColor="#FBBF24" />
            </linearGradient>
            <linearGradient id="rkoGoldGradInner" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1C1917" />
              <stop offset="50%" stopColor="#0C0A09" />
              <stop offset="100%" stopColor="#292524" />
            </linearGradient>
            <linearGradient id="rkoTextGold" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FEF08A" />
              <stop offset="50%" stopColor="#F59E0B" />
              <stop offset="100%" stopColor="#D97706" />
            </linearGradient>
          </defs>

          {/* Outer Ring with ridges */}
          <circle cx="50" cy="50" r="48" stroke="url(#rkoGoldGradOuter)" strokeWidth="3.5" fill="#18181B" />
          <circle cx="50" cy="50" r="44" stroke="#D97706" strokeWidth="1" strokeDasharray="3 2" fill="none" />
          
          {/* Inner Coin Body */}
          <circle cx="50" cy="50" r="40" fill="url(#rkoGoldGradInner)" stroke="#F59E0B" strokeWidth="1.5" />

          {/* Top & Bottom Stars */}
          <polygon points="50,15 51.5,18 55,18 52,20 53.5,23 50,21 46.5,23 48,20 45,18 48.5,18" fill="#FBBF24" />
          <polygon points="50,85 51.5,82 55,82 52,80 53.5,77 50,79 46.5,77 48,80 45,82 48.5,82" fill="#FBBF24" />

          {/* Bold RKO Center typography */}
          <text
            x="50"
            y="56"
            textAnchor="middle"
            fontFamily="system-ui, -apple-system, sans-serif"
            fontWeight="900"
            fontSize="22"
            letterSpacing="1"
            fill="url(#rkoTextGold)"
            stroke="#78350F"
            strokeWidth="0.5"
          >
            RKO
          </text>
          
          <text
            x="50"
            y="69"
            textAnchor="middle"
            fontFamily="system-ui, sans-serif"
            fontWeight="700"
            fontSize="6"
            letterSpacing="1.5"
            fill="#FBBF24"
          >
            VIRTUAL
          </text>
        </svg>
      )}
    </div>
  );
};
