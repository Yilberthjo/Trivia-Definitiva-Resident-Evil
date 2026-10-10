import React from 'react';
import { Question } from '../data/questions';
import { CheckCircle2, XCircle, Info, ChevronRight, ChevronLeft, Bookmark } from 'lucide-react';
import { soundManager } from '../utils/soundEffects';

interface QuestionCardProps {
  question: Question;
  currentIndex: number;
  totalQuestions: number;
  selectedOption: number | null;
  onSelectOption: (optionIndex: number) => void;
  onNext: () => void;
  onPrev: () => void;
  isBookmarked: boolean;
  onToggleBookmark: () => void;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  currentIndex,
  totalQuestions,
  selectedOption,
  onSelectOption,
  onNext,
  onPrev,
  isBookmarked,
  onToggleBookmark,
}) => {
  const isAnswered = selectedOption !== null;
  const isCorrect = isAnswered && selectedOption === question.correct;

  const optionLetters = ['A', 'B', 'C', 'D'];

  const handleSelect = (idx: number) => {
    if (isAnswered) return;
    onSelectOption(idx);
    if (idx === question.correct) {
      soundManager.playCorrect();
    } else {
      soundManager.playIncorrect();
    }
  };

  return (
    <div className="bg-neutral-900/90 border border-neutral-800 rounded-xl overflow-hidden shadow-2xl transition-all">
      {/* Top clean metadata bar - strictly unboxed text with typographic separators */}
      <div className="px-6 py-4 border-b border-neutral-800 flex items-center justify-between gap-4 text-xs text-neutral-400">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-semibold text-red-400">Expediente #{question.id}</span>
          <span aria-hidden="true" className="text-neutral-600">·</span>
          <span>{question.category}</span>
          <span aria-hidden="true" className="text-neutral-600">·</span>
          <span>Era: {question.era}</span>
          <span aria-hidden="true" className="text-neutral-600">·</span>
          <span className="text-neutral-300">Dificultad: {question.difficulty}</span>
        </div>

        <button
          onClick={() => {
            soundManager.playSelect();
            onToggleBookmark();
          }}
          className={`flex items-center gap-1.5 p-1.5 rounded hover:bg-neutral-800 transition-colors cursor-pointer ${
            isBookmarked ? 'text-amber-400' : 'text-neutral-500 hover:text-neutral-300'
          }`}
          title={isBookmarked ? 'Guardada en destacados' : 'Guardar en destacados'}
        >
          <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-amber-400' : ''}`} />
          <span className="hidden sm:inline text-xs font-medium">
            {isBookmarked ? 'Destacada' : 'Guardar'}
          </span>
        </button>
      </div>

      {/* Main Question Body */}
      <div className="p-6 sm:p-8">
        <h2 className="text-xl sm:text-2xl font-bold text-neutral-100 leading-snug tracking-tight mb-6">
          {question.question}
        </h2>

        {/* Options List */}
        <div className="space-y-3">
          {question.options.map((option, idx) => {
            let buttonStyle = 'bg-neutral-950/80 hover:bg-neutral-800/80 border-neutral-800 text-neutral-200';
            let badgeStyle = 'bg-neutral-900 border-neutral-700 text-neutral-400';

            if (isAnswered) {
              if (idx === question.correct) {
                // Correct answer
                buttonStyle = 'bg-emerald-950/80 border-emerald-600 text-emerald-100 font-semibold ring-1 ring-emerald-500/50';
                badgeStyle = 'bg-emerald-800 border-emerald-600 text-white font-bold';
              } else if (idx === selectedOption) {
                // Incorrect answer selected
                buttonStyle = 'bg-red-950/80 border-red-600 text-red-200 ring-1 ring-red-500/50';
                badgeStyle = 'bg-red-800 border-red-600 text-white font-bold';
              } else {
                // Dim other answers
                buttonStyle = 'bg-neutral-950/40 border-neutral-850 text-neutral-500 opacity-60';
                badgeStyle = 'bg-neutral-900 border-neutral-800 text-neutral-600';
              }
            }

            return (
              <button
                key={idx}
                disabled={isAnswered}
                onClick={() => handleSelect(idx)}
                className={`w-full p-4 rounded-lg border text-left flex items-start gap-3.5 transition-all duration-200 ${buttonStyle} ${
                  !isAnswered ? 'hover:border-neutral-700 cursor-pointer active:scale-[0.99]' : 'cursor-default'
                }`}
              >
                <span
                  className={`w-7 h-7 rounded flex items-center justify-center text-xs font-mono border shrink-0 mt-0.5 transition-colors ${badgeStyle}`}
                >
                  {optionLetters[idx]}
                </span>
                <span className="text-sm sm:text-base pt-0.5 leading-relaxed flex-1">
                  {option}
                </span>

                {isAnswered && idx === question.correct && (
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-1" />
                )}
                {isAnswered && idx === selectedOption && idx !== question.correct && (
                  <XCircle className="w-5 h-5 text-red-400 shrink-0 mt-1" />
                )}
              </button>
            );
          })}
        </div>

        {/* Immediate Feedback & Lore Dossier */}
        {isAnswered && (
          <div className="mt-6 pt-6 border-t border-neutral-800 space-y-4">
            <div
              className={`p-4 rounded-lg border ${
                isCorrect
                  ? 'bg-emerald-950/40 border-emerald-800/80 text-emerald-300'
                  : 'bg-red-950/40 border-red-800/80 text-red-300'
              }`}
            >
              <div className="flex items-center gap-2 font-heading font-bold text-base uppercase tracking-wider mb-1">
                {isCorrect ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>¡Correcto! Informe Bioquímico Aprobado</span>
                  </>
                ) : (
                  <>
                    <XCircle className="w-4 h-4 text-red-400" />
                    <span>Incorrecto — Amenaza no neutralizada</span>
                  </>
                )}
              </div>
              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-sans">
                {question.explanation}
              </p>
            </div>
          </div>
        )}

        {/* Card Navigation Footer */}
        <div className="mt-8 flex items-center justify-between gap-4 pt-4 border-t border-neutral-800">
          <button
            onClick={() => {
              soundManager.playSelect();
              onPrev();
            }}
            disabled={currentIndex === 0}
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-neutral-900 border border-neutral-800 text-sm font-medium text-neutral-300 hover:text-white hover:bg-neutral-800 disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Anterior</span>
          </button>

          <div className="text-xs text-neutral-400 font-mono tabular-nums">
            Pregunta {currentIndex + 1} de {totalQuestions}
          </div>

          <button
            onClick={() => {
              soundManager.playSelect();
              onNext();
            }}
            disabled={currentIndex === totalQuestions - 1}
            className="flex items-center gap-1.5 px-5 py-2 rounded-lg bg-red-700 hover:bg-red-600 text-sm font-semibold text-white disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer shadow-lg shadow-red-950/40"
          >
            <span>Siguiente</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
