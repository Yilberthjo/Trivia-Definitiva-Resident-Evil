import React from 'react';
import { Question } from '../data/questions';
import { X, CheckCircle2, XCircle, HelpCircle, Bookmark } from 'lucide-react';
import { soundManager } from '../utils/soundEffects';

interface QuestionDirectoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  questions: Question[];
  userAnswers: Record<number, number>;
  currentIndex: number;
  onJumpToQuestion: (index: number) => void;
  bookmarks: number[];
}

export const QuestionDirectoryModal: React.FC<QuestionDirectoryModalProps> = ({
  isOpen,
  onClose,
  questions,
  userAnswers,
  currentIndex,
  onJumpToQuestion,
  bookmarks,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-neutral-900 border border-neutral-800 rounded-2xl w-full max-w-4xl max-h-[85vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Modal Header */}
        <div className="p-5 border-b border-neutral-800 flex items-center justify-between">
          <div>
            <h2 className="font-heading text-xl font-bold uppercase tracking-wider text-neutral-100">
              Índice de Archivos S.T.A.R.S. (1 - 100)
            </h2>
            <div className="text-xs text-neutral-400 mt-0.5">
              Haz clic en cualquier número para saltar directamente a ese expediente
            </div>
          </div>
          <button
            onClick={() => {
              soundManager.playSelect();
              onClose();
            }}
            className="p-2 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Legend */}
        <div className="px-5 py-3 bg-neutral-950/60 border-b border-neutral-800/80 flex items-center gap-4 text-xs text-neutral-400 flex-wrap">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-emerald-700"></span>
            <span>Acierto</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-red-700"></span>
            <span>Fallo</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-neutral-800 border border-neutral-700"></span>
            <span>Pendiente</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Bookmark className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
            <span>Destacado</span>
          </div>
        </div>

        {/* 100 Questions Grid */}
        <div className="p-6 overflow-y-auto flex-1">
          <div className="grid grid-cols-5 sm:grid-cols-10 gap-2.5">
            {questions.map((q, idx) => {
              const answer = userAnswers[q.id];
              const isAnswered = answer !== undefined;
              const isCorrect = isAnswered && answer === q.correct;
              const isCurrent = idx === currentIndex;
              const isBookmarked = bookmarks.includes(q.id);

              let style = 'bg-neutral-950 hover:bg-neutral-800 border-neutral-800 text-neutral-400';
              if (isAnswered) {
                if (isCorrect) {
                  style = 'bg-emerald-950 border-emerald-600/80 text-emerald-200 font-bold';
                } else {
                  style = 'bg-red-950 border-red-600/80 text-red-200 font-bold';
                }
              }

              return (
                <button
                  key={q.id}
                  onClick={() => {
                    soundManager.playSelect();
                    onJumpToQuestion(idx);
                    onClose();
                  }}
                  className={`h-11 rounded-lg border flex flex-col items-center justify-center relative transition-all text-xs font-mono cursor-pointer ${style} ${
                    isCurrent ? 'ring-2 ring-red-500 scale-105 shadow-md shadow-red-950' : ''
                  }`}
                >
                  <span className="tabular-nums font-semibold">{q.id}</span>
                  {isBookmarked && (
                    <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-amber-400" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-neutral-950/80 border-t border-neutral-800 flex justify-end">
          <button
            onClick={() => {
              soundManager.playSelect();
              onClose();
            }}
            className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-medium rounded-lg transition-colors cursor-pointer"
          >
            Cerrar Expediente
          </button>
        </div>
      </div>
    </div>
  );
};
