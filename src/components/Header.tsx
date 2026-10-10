import React from 'react';
import { Volume2, VolumeX, RotateCcw, ShieldAlert, Radio } from 'lucide-react';
import { soundManager } from '../utils/soundEffects';

interface HeaderProps {
  currentView: 'quiz' | 'all' | 'directory';
  onViewChange: (view: 'quiz' | 'all' | 'directory') => void;
  onResetQuiz: () => void;
  isMuted: boolean;
  onToggleMute: () => void;
  answeredCount: number;
  totalQuestions: number;
  onOpenLiveScoreboard: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  onViewChange,
  onResetQuiz,
  isMuted,
  onToggleMute,
  answeredCount,
  totalQuestions,
  onOpenLiveScoreboard,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-neutral-950/90 backdrop-blur-md border-b border-neutral-800">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-8 px-4 sm:px-6 py-3">
        {/* Zone 1: Brand title wordmark & Author */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => {
              soundManager.playSelect();
              onViewChange('quiz');
            }}
            className="flex items-center gap-2 text-left group cursor-pointer shrink-0"
          >
            <div className="w-7 h-7 rounded bg-red-950/80 border border-red-700/60 flex items-center justify-center text-red-500 group-hover:text-red-400 group-hover:border-red-500 transition-colors">
              <ShieldAlert className="w-4 h-4" />
            </div>
            <span className="font-heading text-xl sm:text-2xl font-black uppercase tracking-wider text-neutral-100 group-hover:text-red-400 transition-colors whitespace-nowrap">
              Resident Evil <span className="text-red-600">100 Trivia</span>
            </span>
          </button>

          {/* Author Badge in Header */}
          <div className="hidden lg:flex items-center gap-1.5 px-2 py-0.5 rounded bg-neutral-900/90 border border-neutral-800 text-xs">
            <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 font-bold">Autor:</span>
            <span className="font-re-title font-black uppercase inline-flex items-baseline">
              <span className="text-red-600 font-black text-sm drop-shadow-[0_0_6px_rgba(220,38,38,0.8)]">Y</span>
              <span className="text-neutral-100 font-black text-xs tracking-wider">IL</span>
            </span>
            <span className="text-xs">💕</span>
          </div>
        </div>

        {/* Zone 2: Navigation links */}
        <nav className="hidden md:flex items-center gap-6 text-xs sm:text-sm font-medium text-neutral-400">
          <button
            onClick={() => {
              soundManager.playSelect();
              onViewChange('quiz');
            }}
            className={`transition-colors whitespace-nowrap shrink-0 hover:text-white cursor-pointer ${
              currentView === 'quiz' ? 'text-red-400 font-semibold underline underline-offset-4' : ''
            }`}
          >
            Modo Interactivo
          </button>
          <button
            onClick={() => {
              soundManager.playSelect();
              onViewChange('all');
            }}
            className={`transition-colors whitespace-nowrap shrink-0 hover:text-white cursor-pointer ${
              currentView === 'all' ? 'text-red-400 font-semibold underline underline-offset-4' : ''
            }`}
          >
            Modo Lista Completa
          </button>
          <button
            onClick={() => {
              soundManager.playSelect();
              onViewChange('directory');
            }}
            className={`transition-colors whitespace-nowrap shrink-0 hover:text-white cursor-pointer ${
              currentView === 'directory' ? 'text-red-400 font-semibold underline underline-offset-4' : ''
            }`}
          >
            Índice ({answeredCount}/{totalQuestions})
          </button>
        </nav>

        {/* Zone 3: Actions */}
        <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
          <button
            onClick={() => {
              soundManager.playSelect();
              onOpenLiveScoreboard();
            }}
            title="Marcador y Registro en Vivo"
            className="hidden sm:flex items-center gap-1.5 px-3 py-2 text-xs font-semibold uppercase tracking-wider text-red-300 bg-red-950/60 hover:bg-red-900/60 border border-red-800/80 rounded transition-colors whitespace-nowrap shrink-0 cursor-pointer shadow-sm min-h-[40px]"
          >
            <Radio className="w-3.5 h-3.5 text-red-400 animate-pulse" />
            <span>Marcador en Vivo</span>
          </button>

          <button
            onClick={() => {
              soundManager.playTypewriter();
              onToggleMute();
            }}
            title={isMuted ? 'Activar Sonidos' : 'Silenciar'}
            className="p-2.5 rounded bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-neutral-100 hover:border-neutral-700 transition-colors cursor-pointer min-h-[40px] min-w-[40px] flex items-center justify-center"
            aria-label="Alternar audio"
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-neutral-500" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
          </button>

          <button
            onClick={() => {
              soundManager.playTypewriter();
              onResetQuiz();
            }}
            title="Reiniciar cuestionario"
            className="flex items-center gap-1.5 px-2.5 sm:px-3 py-2 text-xs font-semibold uppercase tracking-wider text-neutral-300 bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 hover:border-red-900 rounded transition-colors whitespace-nowrap shrink-0 cursor-pointer min-h-[40px]"
          >
            <RotateCcw className="w-3.5 h-3.5 text-red-500" />
            <span className="hidden sm:inline">Reiniciar</span>
          </button>
        </div>
      </div>
    </header>
  );
};
