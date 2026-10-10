import React, { useState, useEffect } from 'react';
import { Question } from '../data/questions';
import { ResidentEvilName } from './ResidentEvilName';
import {
  Award,
  RotateCcw,
  Share2,
  Check,
  AlertCircle,
  Radio,
  Send,
  UserCheck,
  X,
  HelpCircle,
  BookOpen,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { soundManager } from '../utils/soundEffects';

interface SummaryModalProps {
  isOpen: boolean;
  onClose: () => void;
  questions: Question[];
  userAnswers: Record<number, number>;
  onRestart: () => void;
  onReviewMistakes: () => void;
  onOpenLiveScoreboard: () => void;
  gameMode: string;
}

export const SummaryModal: React.FC<SummaryModalProps> = ({
  isOpen,
  onClose,
  questions,
  userAnswers,
  onRestart,
  onReviewMistakes,
  onOpenLiveScoreboard,
  gameMode,
}) => {
  const [copied, setCopied] = useState(false);
  const [username, setUsername] = useState(() => {
    return localStorage.getItem('re_player_username') || '';
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [showTutorial, setShowTutorial] = useState<boolean>(true);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Calculate stats
  const answeredTotal = Object.keys(userAnswers).length;
  let correctCount = 0;
  const incorrectQuestions: Question[] = [];
  const correctQuestionIds: number[] = [];

  questions.forEach((q) => {
    const userChoice = userAnswers[q.id];
    if (userChoice !== undefined) {
      if (userChoice === q.correct) {
        correctCount++;
        correctQuestionIds.push(q.id);
      } else {
        incorrectQuestions.push(q);
      }
    }
  });

  const percentage = answeredTotal > 0 ? Math.round((correctCount / answeredTotal) * 100) : 0;

  // Compute Rank
  let rank = 'D';
  let rankTitle = 'Víctima de la Mansión Spencer';
  let rankBadgeColor = 'text-neutral-400 border-neutral-700 bg-neutral-900';

  if (percentage >= 90) {
    rank = 'S';
    rankTitle = 'Agente de Élite S.T.A.R.S. / DSO';
    rankBadgeColor = 'text-amber-400 border-amber-500/80 bg-amber-950/40';
  } else if (percentage >= 75) {
    rank = 'A';
    rankTitle = 'Superviviente Veterano de Raccoon City';
    rankBadgeColor = 'text-red-400 border-red-500/80 bg-red-950/40';
  } else if (percentage >= 60) {
    rank = 'B';
    rankTitle = 'Agente Táctico de la B.S.A.A.';
    rankBadgeColor = 'text-blue-400 border-blue-500/80 bg-blue-950/40';
  } else if (percentage >= 40) {
    rank = 'C';
    rankTitle = 'Oficial Novato del R.P.D.';
    rankBadgeColor = 'text-emerald-400 border-emerald-500/80 bg-emerald-950/40';
  }

  const handleShare = () => {
    soundManager.playSelect();
    const text = `☣️ Desafío Resident Evil: Obtuve Rango ${rank} (${correctCount}/${answeredTotal} aciertos, ${percentage}%) en la Trivia Definitiva de 100 Preguntas. ¿Puedes sobrevivir?`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleRegisterScore = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim() || isSubmitting) return;

    try {
      setIsSubmitting(true);
      localStorage.setItem('re_player_username', username.trim());

      const payload = {
        username: username.trim(),
        score: correctCount,
        totalAnswered: answeredTotal,
        percentage,
        rank,
        rankTitle,
        gameMode,
        correctQuestionIds,
        incorrectQuestionDetails: incorrectQuestions.map((q) => ({
          questionId: q.id,
          questionTitle: q.question,
          selectedOptionText: q.options[userAnswers[q.id]] || 'Sin respuesta',
          correctOptionText: q.options[q.correct],
          category: q.category,
        })),
      };

      const res = await fetch('/api/scores', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        soundManager.playCorrect();
        setSubmitted(true);
      }
    } catch (err) {
      console.error('Failed to register score:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          soundManager.playSelect();
          onClose();
        }
      }}
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4"
    >
      <div className="bg-neutral-900 border border-neutral-800 rounded-2xl w-full max-w-2xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden relative">
        {/* Header */}
        <div className="p-5 border-b border-neutral-800 text-center relative bg-gradient-to-b from-neutral-850 to-neutral-900">
          <button
            onClick={() => {
              soundManager.playSelect();
              onClose();
            }}
            title="Salir de la ventana de puntuación"
            className="absolute right-3.5 top-3.5 p-2 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors cursor-pointer"
            aria-label="Cerrar ventana"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="text-xs uppercase tracking-widest text-red-500 font-heading font-semibold mb-1">
            Evaluación Oficial de Supervivencia
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-100 font-heading tracking-wide">
            INFORME DE MISIÓN CUMPLIDA
          </h2>
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-7 overflow-y-auto space-y-5">
          {/* Big Rank Badge Display */}
          <div className={`p-5 rounded-xl border ${rankBadgeColor} flex flex-col sm:flex-row items-center justify-between gap-5`}>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-neutral-950 border border-current flex items-center justify-center shadow-lg shrink-0">
                <span className="font-heading text-5xl sm:text-6xl font-black">{rank}</span>
              </div>
              <div>
                <div className="text-xs uppercase tracking-wider text-neutral-400 font-medium">
                  Rango Asignado
                </div>
                <div className="text-lg sm:text-xl font-bold text-neutral-100 font-heading leading-tight">
                  {rankTitle}
                </div>
                <div className="text-xs text-neutral-400 mt-1">
                  Evaluación basada en {answeredTotal} preguntas respondidas
                </div>
              </div>
            </div>

            <div className="text-right sm:border-l sm:border-neutral-800 sm:pl-5 w-full sm:w-auto">
              <div className="text-xs text-neutral-400 uppercase tracking-widest font-heading">
                Puntuación Final
              </div>
              <div className="text-3xl sm:text-4xl font-black font-heading text-neutral-100 tabular-nums">
                <span className="text-red-500">{correctCount}</span>
                <span className="text-neutral-500 text-xl"> / {answeredTotal}</span>
              </div>
              <div className="text-xs font-mono text-neutral-400 mt-0.5">
                Precisión: {percentage}%
              </div>
            </div>
          </div>

          {/* User Registration Form for Real-time Scoreboard */}
          <div className="p-4 sm:p-5 rounded-xl bg-neutral-950 border border-neutral-800 space-y-3">
            <div className="flex items-center justify-between gap-2 flex-wrap">
              <div className="flex items-center gap-2">
                <UserCheck className="w-4 h-4 text-red-500" />
                <h3 className="font-heading text-sm sm:text-base font-bold text-neutral-200 uppercase tracking-wider">
                  Registrar Expediente en el Marcador
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    soundManager.playSelect();
                    setShowTutorial(!showTutorial);
                  }}
                  className="flex items-center gap-1 text-xs text-red-400 hover:text-red-300 bg-red-950/40 hover:bg-red-950 border border-red-900/60 px-2 py-1 rounded transition-colors cursor-pointer"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>{showTutorial ? 'Ocultar Tutorial' : '¿Cómo registrarte? (Tutorial)'}</span>
                  {showTutorial ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                </button>
                {username.trim() && (
                  <div className="flex items-center gap-1 text-xs">
                    <span className="text-neutral-500 text-[11px] font-mono">Diseño:</span>
                    <ResidentEvilName name={username} size="sm" />
                  </div>
                )}
              </div>
            </div>

            {/* Step-by-Step Tutorial Box */}
            {showTutorial && (
              <div className="p-4 rounded-lg bg-neutral-900/90 border border-red-900/50 space-y-3 transition-all animate-fadeIn">
                <div className="flex items-center gap-2 text-xs font-heading font-bold uppercase tracking-wider text-red-400 border-b border-neutral-800 pb-1.5">
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span>Guía Rápida: Cómo Registrar tu Puntuación</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-neutral-300 font-sans">
                  {/* Step 1 */}
                  <div className="p-2.5 rounded bg-neutral-950/80 border border-neutral-800 space-y-1">
                    <div className="font-mono text-red-500 font-bold text-[11px] flex items-center gap-1">
                      <span>PASO 1</span>
                    </div>
                    <div className="font-semibold text-neutral-100">Introduce tu Nombre</div>
                    <p className="text-[11px] text-neutral-400 leading-tight">
                      Escribe tu alias (ej. <em>Leon, Jill, Claire</em>). La <strong>primera letra</strong> saldrá en rojo sangre Resident Evil.
                    </p>
                  </div>

                  {/* Step 2 */}
                  <div className="p-2.5 rounded bg-neutral-950/80 border border-neutral-800 space-y-1">
                    <div className="font-mono text-red-500 font-bold text-[11px] flex items-center gap-1">
                      <span>PASO 2</span>
                    </div>
                    <div className="font-semibold text-neutral-100">Pulsa Guardar</div>
                    <p className="text-[11px] text-neutral-400 leading-tight">
                      Presiona <strong>"Guardar Puntuación"</strong>. Se enviarán tus aciertos, fallos y rango en tiempo real.
                    </p>
                  </div>

                  {/* Step 3 */}
                  <div className="p-2.5 rounded bg-neutral-950/80 border border-neutral-800 space-y-1">
                    <div className="font-mono text-red-500 font-bold text-[11px] flex items-center gap-1">
                      <span>PASO 3</span>
                    </div>
                    <div className="font-semibold text-neutral-100">Monitoreo en Vivo</div>
                    <p className="text-[11px] text-neutral-400 leading-tight">
                      El autor (<span className="font-re-title font-black uppercase inline-flex items-baseline"><span className="text-red-500 font-black">Y</span><span className="text-neutral-100 font-black">IL</span> <span className="text-xs">💕</span></span>) y tú podrán ver en directo tu puesto y desglosar las preguntas que fallaste.
                    </p>
                  </div>
                </div>
              </div>
            )}

            <p className="text-xs text-neutral-400 leading-relaxed font-sans">
              Introduce tu nombre de usuario para que quede registrado en tiempo real en la base de datos de expedientes junto a tus aciertos y fallos:
            </p>

            <form onSubmit={handleRegisterScore} className="flex flex-col sm:flex-row gap-2 pt-1">
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Escribe tu nombre de agente aquí..."
                maxLength={30}
                disabled={submitted}
                className="flex-1 bg-neutral-900 border border-neutral-700 rounded-lg px-3.5 py-2 text-sm text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-red-600 font-sans disabled:opacity-60"
              />
              <button
                type="submit"
                disabled={!username.trim() || isSubmitting || submitted}
                className="px-4 py-2 bg-red-700 hover:bg-red-600 disabled:opacity-40 disabled:pointer-events-none text-white text-xs font-bold uppercase tracking-wider rounded-lg transition-colors flex items-center justify-center gap-1.5 whitespace-nowrap cursor-pointer shadow-md shadow-red-950"
              >
                {submitted ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>¡Registrado!</span>
                  </>
                ) : isSubmitting ? (
                  <span>Registrando...</span>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    <span>Guardar Puntuación</span>
                  </>
                )}
              </button>
            </form>

            {submitted && (
              <div className="flex items-center justify-between text-xs text-emerald-400 pt-1">
                <span>Tu récord y desglose de preguntas ya está guardado en el servidor.</span>
                <button
                  type="button"
                  onClick={() => {
                    soundManager.playSelect();
                    onOpenLiveScoreboard();
                  }}
                  className="underline font-semibold hover:text-emerald-300 cursor-pointer"
                >
                  Ver Marcador en Vivo →
                </button>
              </div>
            )}
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="p-3 rounded-lg bg-neutral-950 border border-neutral-800">
              <div className="text-xs text-neutral-400">Aciertos</div>
              <div className="font-heading text-2xl font-bold text-emerald-400 tabular-nums">
                {correctCount}
              </div>
            </div>
            <div className="p-3 rounded-lg bg-neutral-950 border border-neutral-800">
              <div className="text-xs text-neutral-400">Fallos</div>
              <div className="font-heading text-2xl font-bold text-red-400 tabular-nums">
                {incorrectQuestions.length}
              </div>
            </div>
            <div className="p-3 rounded-lg bg-neutral-950 border border-neutral-800">
              <div className="text-xs text-neutral-400">Respondidas</div>
              <div className="font-heading text-2xl font-bold text-neutral-200 tabular-nums">
                {answeredTotal}
              </div>
            </div>
          </div>

          {/* Review Mistakes Notice if any */}
          {incorrectQuestions.length > 0 && (
            <div className="p-3.5 rounded-lg bg-red-950/30 border border-red-900/60 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
              <div className="text-xs text-neutral-300 leading-relaxed">
                Tuviste <strong className="text-red-300">{incorrectQuestions.length} respuestas incorrectas</strong>.
                Puedes revisarlas para estudiar los expedientes y lore completo de Resident Evil.
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-4 sm:p-5 bg-neutral-950/80 border-t border-neutral-800 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-xs font-medium text-neutral-200 transition-colors whitespace-nowrap cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copiado' : 'Compartir'}</span>
            </button>

            <button
              onClick={() => {
                soundManager.playSelect();
                onOpenLiveScoreboard();
              }}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-xs font-medium text-neutral-200 transition-colors whitespace-nowrap cursor-pointer"
            >
              <Radio className="w-3.5 h-3.5 text-red-400" />
              <span>Ver Marcador en Vivo</span>
            </button>

            {incorrectQuestions.length > 0 && (
              <button
                onClick={() => {
                  soundManager.playSelect();
                  onReviewMistakes();
                }}
                className="px-3 py-2 rounded-lg bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-xs font-medium text-neutral-200 transition-colors whitespace-nowrap cursor-pointer"
              >
                Revisar Fallos ({incorrectQuestions.length})
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                soundManager.playSelect();
                onClose();
              }}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-xs font-semibold uppercase tracking-wider text-neutral-300 hover:text-white transition-colors whitespace-nowrap cursor-pointer"
            >
              <X className="w-3.5 h-3.5 text-neutral-400" />
              <span>Salir / Volver</span>
            </button>

            <button
              onClick={() => {
                soundManager.playTypewriter();
                onRestart();
              }}
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-red-700 hover:bg-red-600 text-white text-xs font-bold uppercase tracking-wider transition-colors whitespace-nowrap cursor-pointer shadow-lg shadow-red-950/50"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Jugar de Nuevo</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
