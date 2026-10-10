import React from 'react';

interface AuthorCornerBadgeProps {
  className?: string;
}

export const AuthorCornerBadge: React.FC<AuthorCornerBadgeProps> = ({ className = '' }) => {
  return (
    <aside
      aria-label="Autor del sitio"
      className={`fixed bottom-18 right-3 md:bottom-5 md:right-5 z-40 pointer-events-auto transition-transform ${className}`}
    >
      <div
        className="bg-neutral-950/95 backdrop-blur-md border border-neutral-800 hover:border-red-700/80 rounded-xl px-3.5 py-2 shadow-[0_8px_25px_rgba(0,0,0,0.85),0_0_15px_rgba(220,38,38,0.25)] flex items-center gap-2.5 transition-all duration-300 hover:scale-105 group select-none"
        title="Autor del Proyecto: Yil 💕"
      >
        {/* Biohazard crimson accent bar */}
        <span className="w-1.5 h-6 bg-red-600 rounded-full shadow-[0_0_8px_rgba(220,38,38,0.85)] group-hover:bg-red-500 transition-colors" />

        {/* Tactical author label */}
        <span className="text-[10px] sm:text-[11px] font-mono tracking-widest uppercase text-neutral-400 group-hover:text-red-400 transition-colors font-bold">
          AUTOR:
        </span>

        {/* Resident Evil styled typography for 'Yil' */}
        <span className="font-re-title font-black uppercase inline-flex items-baseline">
          <span className="text-red-600 text-xl sm:text-2xl font-black drop-shadow-[0_0_12px_rgba(220,38,38,0.9)] group-hover:text-red-500 transition-colors">
            Y
          </span>
          <span className="text-neutral-100 text-base sm:text-lg font-black tracking-wider group-hover:text-white transition-colors">
            IL
          </span>
        </span>

        {/* Heart emoji */}
        <span
          className="text-base select-none transition-transform duration-200 group-hover:scale-125 inline-block"
          role="img"
          aria-label="corazón con cariño"
        >
          💕
        </span>
      </div>
    </aside>
  );
};
