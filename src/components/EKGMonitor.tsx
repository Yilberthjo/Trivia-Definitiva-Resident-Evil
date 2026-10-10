import React from 'react';
import { Activity, Flame, HeartPulse } from 'lucide-react';

export type VitalStatus = 'FINE' | 'CAUTION' | 'DANGER' | 'POISON' | 'DEAD';

interface EKGMonitorProps {
  score: number;
  totalAnswered: number;
  streak: number;
  healthRemaining?: number; // for sudden death / survival mode
  gameMode: string;
}

export const EKGMonitor: React.FC<EKGMonitorProps> = ({
  score,
  totalAnswered,
  streak,
  healthRemaining,
  gameMode,
}) => {
  // Determine vital status
  let status: VitalStatus = 'FINE';

  if (gameMode === 'infection' && healthRemaining !== undefined) {
    if (healthRemaining <= 0) status = 'DEAD';
    else if (healthRemaining === 1) status = 'DANGER';
    else if (healthRemaining === 2) status = 'CAUTION';
    else status = 'FINE';
  } else if (totalAnswered > 0) {
    const accuracy = (score / totalAnswered) * 100;
    if (accuracy >= 75) status = 'FINE';
    else if (accuracy >= 50) status = 'CAUTION';
    else status = 'DANGER';
  }

  const statusConfig = {
    FINE: {
      label: 'ESTADO: FINE',
      colorText: 'text-emerald-400',
      bgColor: 'bg-emerald-950/40 border-emerald-800/60',
      strokeColor: '#10b981',
      pulseClass: 'text-emerald-400',
    },
    CAUTION: {
      label: 'ESTADO: CAUTION',
      colorText: 'text-amber-400',
      bgColor: 'bg-amber-950/40 border-amber-800/60',
      strokeColor: '#f59e0b',
      pulseClass: 'text-amber-400 animate-pulse',
    },
    DANGER: {
      label: 'ESTADO: DANGER',
      colorText: 'text-red-500',
      bgColor: 'bg-red-950/40 border-red-800/60',
      strokeColor: '#ef4444',
      pulseClass: 'text-red-500 animate-pulse',
    },
    POISON: {
      label: 'ESTADO: POISON',
      colorText: 'text-purple-400',
      bgColor: 'bg-purple-950/40 border-purple-800/60',
      strokeColor: '#c084fc',
      pulseClass: 'text-purple-400 animate-pulse',
    },
    DEAD: {
      label: 'ESTADO: MUERTO',
      colorText: 'text-neutral-500',
      bgColor: 'bg-neutral-900 border-neutral-700',
      strokeColor: '#737373',
      pulseClass: 'text-neutral-500',
    },
  }[status];

  return (
    <div className={`p-3 rounded-lg border ${statusConfig.bgColor} flex flex-wrap items-center justify-between gap-4 transition-all duration-300`}>
      {/* Left: EKG Line Visual */}
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded bg-neutral-950 border border-neutral-800 flex items-center justify-center shrink-0">
          <HeartPulse className={`w-5 h-5 ${statusConfig.pulseClass}`} />
        </div>

        <div>
          <div className="flex items-center gap-2">
            <span className={`font-heading text-lg font-bold tracking-wider ${statusConfig.colorText}`}>
              {statusConfig.label}
            </span>
            {streak >= 3 && (
              <span className="flex items-center gap-1 text-xs font-semibold text-orange-400 tracking-wide">
                <Flame className="w-3.5 h-3.5 fill-orange-500" />
                Racha {streak}x
              </span>
            )}
          </div>
          <div className="text-xs text-neutral-400 font-mono">
            {gameMode === 'infection'
              ? `Vidas Bioquímicas: ${healthRemaining}/3`
              : `Precisión: ${totalAnswered > 0 ? Math.round((score / totalAnswered) * 100) : 100}%`}
          </div>
        </div>
      </div>

      {/* Center: Simulated Heartbeat Oscilloscope */}
      <div className="hidden sm:flex items-center w-48 h-8 bg-neutral-950/90 rounded border border-neutral-800/80 px-2 overflow-hidden relative">
        <svg
          className="w-[200%] h-full animate-ekg shrink-0"
          viewBox="0 0 300 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {status !== 'DEAD' ? (
            <path
              d="M0 20 L50 20 L58 10 L64 32 L72 4 L78 26 L84 20 L150 20 L200 20 L208 10 L214 32 L222 4 L228 26 L234 20 L300 20"
              stroke={statusConfig.strokeColor}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          ) : (
            <line x1="0" y1="20" x2="300" y2="20" stroke={statusConfig.strokeColor} strokeWidth="2" />
          )}
        </svg>
      </div>

      {/* Right: Score Counter */}
      <div className="flex items-center gap-4 text-right ml-auto">
        <div>
          <div className="text-xs text-neutral-400 uppercase tracking-widest font-heading font-medium">
            Puntuación
          </div>
          <div className="font-heading text-2xl font-black text-neutral-100 tabular-nums">
            <span className="text-red-500">{score}</span>
            <span className="text-neutral-500 text-lg"> / {totalAnswered > 0 ? totalAnswered : 100}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
