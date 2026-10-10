import React from 'react';
import { Gamepad2, ListOrdered, Grid3X3, Radio } from 'lucide-react';
import { soundManager } from '../utils/soundEffects';

interface MobileBottomNavProps {
  currentView: 'quiz' | 'all' | 'directory';
  onViewChange: (view: 'quiz' | 'all' | 'directory') => void;
  onOpenLiveScoreboard: () => void;
  answeredCount: number;
  totalQuestions: number;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  currentView,
  onViewChange,
  onOpenLiveScoreboard,
  answeredCount,
  totalQuestions,
}) => {
  return (
    <nav
      aria-label="Navegación móvil inferior"
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-neutral-950/95 backdrop-blur-lg border-t border-neutral-800 px-2 py-1 shadow-2xl"
    >
      <div className="grid grid-cols-4 items-center h-14">
        {/* Tab 1: Quiz Interactivo */}
        <button
          onClick={() => {
            soundManager.playSelect();
            onViewChange('quiz');
          }}
          className={`min-h-[44px] flex flex-col items-center justify-center transition-colors cursor-pointer ${
            currentView === 'quiz' ? 'text-red-500 font-bold' : 'text-neutral-400 hover:text-neutral-200'
          }`}
        >
          <Gamepad2 className="w-5 h-5 mb-0.5" />
          <span className="text-[10px] font-mono tracking-tight">Quiz</span>
        </button>

        {/* Tab 2: Lista Completa */}
        <button
          onClick={() => {
            soundManager.playSelect();
            onViewChange('all');
          }}
          className={`min-h-[44px] flex flex-col items-center justify-center transition-colors cursor-pointer ${
            currentView === 'all' ? 'text-red-500 font-bold' : 'text-neutral-400 hover:text-neutral-200'
          }`}
        >
          <ListOrdered className="w-5 h-5 mb-0.5" />
          <span className="text-[10px] font-mono tracking-tight">Lista 100</span>
        </button>

        {/* Tab 3: Índice de Archivos */}
        <button
          onClick={() => {
            soundManager.playSelect();
            onViewChange('directory');
          }}
          className={`min-h-[44px] flex flex-col items-center justify-center transition-colors relative cursor-pointer ${
            currentView === 'directory' ? 'text-red-500 font-bold' : 'text-neutral-400 hover:text-neutral-200'
          }`}
        >
          <div className="relative">
            <Grid3X3 className="w-5 h-5 mb-0.5" />
            <span className="absolute -top-1 -right-2 text-[8px] font-mono font-bold bg-neutral-800 text-neutral-300 rounded-full px-1 border border-neutral-700">
              {answeredCount}
            </span>
          </div>
          <span className="text-[10px] font-mono tracking-tight">Índice</span>
        </button>

        {/* Tab 4: Marcador en Vivo */}
        <button
          onClick={() => {
            soundManager.playSelect();
            onOpenLiveScoreboard();
          }}
          className="min-h-[44px] flex flex-col items-center justify-center transition-colors cursor-pointer text-neutral-400 hover:text-red-400"
        >
          <div className="relative">
            <Radio className="w-5 h-5 mb-0.5 text-red-500 animate-pulse" />
            <span className="absolute -top-0.5 -right-1 w-2 h-2 rounded-full bg-red-600 animate-ping" />
          </div>
          <span className="text-[10px] font-mono tracking-tight text-red-400 font-medium">Marcador</span>
        </button>
      </div>
    </nav>
  );
};
