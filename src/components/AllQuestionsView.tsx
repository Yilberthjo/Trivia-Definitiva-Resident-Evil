import React from 'react';
import { Question } from '../data/questions';
import { CheckCircle2, XCircle, Search, Filter } from 'lucide-react';
import { soundManager } from '../utils/soundEffects';

interface AllQuestionsViewProps {
  questions: Question[];
  userAnswers: Record<number, number>;
  onSelectAnswer: (questionId: number, optionIndex: number) => void;
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  categories: readonly string[];
}

export const AllQuestionsView: React.FC<AllQuestionsViewProps> = ({
  questions,
  userAnswers,
  onSelectAnswer,
  selectedCategory,
  onSelectCategory,
  categories,
}) => {
  const [searchQuery, setSearchQuery] = React.useState('');

  const filteredQuestions = questions.filter((q) => {
    const matchesCategory =
      selectedCategory === 'Todas las Categorías' || q.category === selectedCategory;
    const matchesSearch =
      searchQuery.trim() === '' ||
      q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.options.some((opt) => opt.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const optionLetters = ['A', 'B', 'C', 'D'];

  return (
    <div className="space-y-6">
      {/* Search and Category Filter Toolbar */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-4 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar por palabra clave, boss, arma o personaje..."
            className="w-full bg-neutral-950 border border-neutral-800 rounded-lg pl-10 pr-4 py-2 text-sm text-neutral-200 placeholder-neutral-500 focus:outline-none focus:border-red-600 transition-colors"
          />
        </div>

        {/* Category Selector */}
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-neutral-400 shrink-0" />
          <select
            value={selectedCategory}
            onChange={(e) => {
              soundManager.playSelect();
              onSelectCategory(e.target.value);
            }}
            aria-label="Filtrar por categoría"
            className="bg-neutral-950 border border-neutral-800 text-neutral-200 rounded-lg px-3 py-2 text-xs sm:text-sm focus:outline-none focus:border-red-600 cursor-pointer"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="text-xs text-neutral-400 flex items-center justify-between px-1">
        <span>Mostrando {filteredQuestions.length} de {questions.length} preguntas</span>
        <span>Modo Lista Continua</span>
      </div>

      {/* Questions List */}
      <div className="space-y-5">
        {filteredQuestions.map((q) => {
          const selectedIdx = userAnswers[q.id];
          const isAnswered = selectedIdx !== undefined;
          const isCorrect = isAnswered && selectedIdx === q.correct;

          return (
            <div
              key={q.id}
              className="bg-neutral-900/90 border border-neutral-800 rounded-xl p-6 transition-all hover:border-neutral-700/80"
            >
              {/* Question Header */}
              <div className="flex items-start justify-between gap-4 mb-3">
                <div className="flex items-center gap-2 text-xs text-neutral-400 flex-wrap">
                  <span className="font-semibold text-red-500">#{q.id}</span>
                  <span aria-hidden="true" className="text-neutral-600">·</span>
                  <span>{q.category}</span>
                  <span aria-hidden="true" className="text-neutral-600">·</span>
                  <span>{q.era}</span>
                </div>

                {isAnswered && (
                  <div className="flex items-center gap-1.5 text-xs font-semibold shrink-0">
                    {isCorrect ? (
                      <span className="text-emerald-400 flex items-center gap-1">
                        <CheckCircle2 className="w-4 h-4" /> Correcto
                      </span>
                    ) : (
                      <span className="text-red-400 flex items-center gap-1">
                        <XCircle className="w-4 h-4" /> Incorrecto
                      </span>
                    )}
                  </div>
                )}
              </div>

              <h3 className="text-base sm:text-lg font-bold text-neutral-100 mb-4 leading-snug">
                {q.question}
              </h3>

              {/* Options */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {q.options.map((opt, optIdx) => {
                  let btnColor = 'bg-neutral-950/80 hover:bg-neutral-800/80 border-neutral-800 text-neutral-300';
                  let badgeColor = 'bg-neutral-900 text-neutral-400';

                  if (isAnswered) {
                    if (optIdx === q.correct) {
                      btnColor = 'bg-emerald-950/80 border-emerald-600 text-emerald-200 font-medium';
                      badgeColor = 'bg-emerald-800 text-white font-bold';
                    } else if (optIdx === selectedIdx) {
                      btnColor = 'bg-red-950/80 border-red-600 text-red-200';
                      badgeColor = 'bg-red-800 text-white font-bold';
                    } else {
                      btnColor = 'bg-neutral-950/40 border-neutral-850 text-neutral-500 opacity-50';
                      badgeColor = 'bg-neutral-900 text-neutral-600';
                    }
                  }

                  return (
                    <button
                      key={optIdx}
                      disabled={isAnswered}
                      onClick={() => {
                        onSelectAnswer(q.id, optIdx);
                        if (optIdx === q.correct) {
                          soundManager.playCorrect();
                        } else {
                          soundManager.playIncorrect();
                        }
                      }}
                      className={`p-3 rounded-lg border text-left flex items-start gap-2.5 transition-all text-xs sm:text-sm ${btnColor} ${
                        !isAnswered ? 'cursor-pointer' : 'cursor-default'
                      }`}
                    >
                      <span className={`w-5 h-5 rounded flex items-center justify-center text-[10px] font-mono shrink-0 mt-0.5 ${badgeColor}`}>
                        {optionLetters[optIdx]}
                      </span>
                      <span className="leading-tight pt-0.5">{opt}</span>
                    </button>
                  );
                })}
              </div>

              {/* Explanation Note when answered */}
              {isAnswered && (
                <div className="mt-4 pt-3 border-t border-neutral-800/80 text-xs text-neutral-400 leading-relaxed font-sans">
                  <strong className="text-neutral-200 font-semibold">Expediente de Lore: </strong>
                  {q.explanation}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
