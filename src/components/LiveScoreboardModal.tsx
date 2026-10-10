import React, { useState } from 'react';
import { ResidentEvilName } from './ResidentEvilName';
import {
  X,
  Search,
  CheckCircle2,
  XCircle,
  Radio,
  ChevronDown,
  ChevronUp,
  Award,
  RefreshCw,
  Clock,
  Trash2
} from 'lucide-react';
import { soundManager } from '../utils/soundEffects';

export interface ScoreSubmission {
  id: string;
  username: string;
  score: number;
  totalAnswered: number;
  percentage: number;
  rank: string;
  rankTitle: string;
  gameMode: string;
  correctQuestionIds: number[];
  incorrectQuestionDetails: {
    questionId: number;
    questionTitle: string;
    selectedOptionText: string;
    correctOptionText: string;
    category: string;
  }[];
  createdAt: string;
}

interface LiveScoreboardModalProps {
  isOpen: boolean;
  onClose: () => void;
  scores: ScoreSubmission[];
  isLoading: boolean;
  onRefresh: () => void;
  onDeleteScore?: (id: string) => void;
}

export const LiveScoreboardModal: React.FC<LiveScoreboardModalProps> = ({
  isOpen,
  onClose,
  scores,
  isLoading,
  onRefresh,
  onDeleteScore,
}) => {
  const [selectedRecordId, setSelectedRecordId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterMode, setFilterMode] = useState<'all' | 'mistakes'>('all');
  const [mobileTab, setMobileTab] = useState<'list' | 'detail'>('list');

  React.useEffect(() => {
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

  const filteredScores = scores.filter((s) => {
    return s.username.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const selectedRecord = scores.find((s) => s.id === selectedRecordId);

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          soundManager.playSelect();
          onClose();
        }
      }}
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-5"
    >
      <div className="bg-neutral-900 border border-neutral-800 rounded-2xl w-full max-w-5xl h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Modal Top Header */}
        <div className="p-4 sm:p-5 border-b border-neutral-800 flex items-center justify-between gap-4 bg-neutral-950/60">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-red-950/80 border border-red-700/60 flex items-center justify-center text-red-500">
              <Radio className="w-4 h-4 animate-pulse text-red-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-heading text-lg sm:text-xl font-bold uppercase tracking-wider text-neutral-100">
                  Panel de Monitoreo de Respuestas y Puntuaciones
                </h2>
                <span className="text-[10px] font-mono font-bold bg-red-950 text-red-400 border border-red-800 px-2 py-0.5 rounded uppercase tracking-wider flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping inline-block" />
                  En Vivo
                </span>
              </div>
              <div className="text-xs text-neutral-400">
                Supervisión en tiempo real de participantes, aciertos y preguntas falladas
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                soundManager.playSelect();
                onRefresh();
              }}
              title="Recargar datos"
              className="p-2 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition-colors cursor-pointer"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
            </button>
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
        </div>

        {/* Search and Filters Bar */}
        <div className="px-5 py-3 border-b border-neutral-800/80 bg-neutral-900/60 flex flex-wrap items-center justify-between gap-3">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="w-3.5 h-3.5 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar participante por nombre..."
              className="w-full bg-neutral-950 border border-neutral-800 rounded-lg pl-9 pr-3 py-1.5 text-xs text-neutral-200 placeholder-neutral-500 focus:outline-none focus:border-red-600 transition-colors"
            />
          </div>

          <div className="text-xs text-neutral-400 font-mono">
            Total de intentos registrados: <strong className="text-neutral-200">{scores.length}</strong>
          </div>
        </div>

        {/* Mobile Tab Switcher */}
        <div className="flex md:hidden border-b border-neutral-800 bg-neutral-950 p-2 gap-2">
          <button
            type="button"
            onClick={() => setMobileTab('list')}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-colors ${
              mobileTab === 'list'
                ? 'bg-red-950 text-red-200 border border-red-800'
                : 'bg-neutral-900 text-neutral-400 hover:text-neutral-200'
            }`}
          >
            Lista de Agentes ({filteredScores.length})
          </button>
          <button
            type="button"
            onClick={() => setMobileTab('detail')}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-colors ${
              mobileTab === 'detail'
                ? 'bg-red-950 text-red-200 border border-red-800'
                : 'bg-neutral-900 text-neutral-400 hover:text-neutral-200'
            }`}
          >
            Inspeccionar Respuestas {selectedRecord ? `(${selectedRecord.username})` : ''}
          </button>
        </div>

        {/* Main Content: Split View on Laptops, Tabbed View on Mobile */}
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden divide-y md:divide-y-0 md:divide-x divide-neutral-800">
          {/* Left: Scoreboard List */}
          <div className={`${mobileTab === 'detail' ? 'hidden md:block' : 'block'} w-full md:w-5/12 overflow-y-auto p-3 sm:p-4 space-y-2.5`}>
            {filteredScores.length === 0 ? (
              <div className="text-center py-12 text-neutral-500 text-xs">
                No hay intentos registrados aún. Completa el quiz e introduce un nombre de usuario para registrar la puntuación.
              </div>
            ) : (
              filteredScores.map((record) => {
                const isSelected = selectedRecordId === record.id;
                const formattedDate = new Date(record.createdAt).toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                  second: '2-digit',
                });

                return (
                  <div
                    key={record.id}
                    onClick={() => {
                      soundManager.playSelect();
                      setSelectedRecordId(record.id);
                      setMobileTab('detail');
                    }}
                    className={`p-3.5 rounded-xl border transition-all cursor-pointer relative group ${
                      isSelected
                        ? 'bg-neutral-800/90 border-red-700 shadow-md ring-1 ring-red-600/50'
                        : 'bg-neutral-950/60 hover:bg-neutral-800/50 border-neutral-800'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        {/* RE Styled Username */}
                        <div className="flex items-center gap-1.5">
                          <ResidentEvilName name={record.username} size="md" />
                          <span className="text-[10px] text-neutral-500 font-mono">
                            ({record.gameMode})
                          </span>
                        </div>

                        <div className="flex items-center gap-2 mt-1.5 text-xs text-neutral-400">
                          <span className="flex items-center gap-1 text-emerald-400 font-mono">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            {record.score} aciertos
                          </span>
                          <span aria-hidden="true" className="text-neutral-700">·</span>
                          <span className="flex items-center gap-1 text-red-400 font-mono">
                            <XCircle className="w-3.5 h-3.5" />
                            {record.incorrectQuestionDetails.length} fallos
                          </span>
                        </div>
                      </div>

                      {/* Rank Badge & Score */}
                      <div className="text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <span className="font-heading font-black text-xl text-neutral-100 tabular-nums">
                            {record.score}
                            <span className="text-neutral-500 text-xs">/{record.totalAnswered}</span>
                          </span>
                          <span
                            className={`w-6 h-6 rounded flex items-center justify-center font-heading font-black text-xs border ${
                              record.rank === 'S'
                                ? 'bg-amber-950 border-amber-600 text-amber-300'
                                : record.rank === 'A'
                                ? 'bg-red-950 border-red-600 text-red-300'
                                : record.rank === 'B'
                                ? 'bg-blue-950 border-blue-600 text-blue-300'
                                : 'bg-neutral-900 border-neutral-700 text-neutral-300'
                            }`}
                          >
                            {record.rank}
                          </span>
                        </div>
                        <div className="text-[10px] font-mono text-neutral-500 mt-1 flex items-center justify-end gap-1">
                          <Clock className="w-2.5 h-2.5" />
                          {formattedDate}
                        </div>
                      </div>
                    </div>

                    <div className="mt-2 pt-2 border-t border-neutral-800/80 flex items-center justify-between text-[11px] text-neutral-400">
                      <span className="text-red-400/90 group-hover:underline">
                        {isSelected ? 'Ocultar desglose ▲' : 'Ver detalle de fallos ▼'}
                      </span>
                      {onDeleteScore && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onDeleteScore(record.id);
                          }}
                          title="Eliminar registro"
                          className="text-neutral-600 hover:text-red-400 p-0.5 rounded transition-colors"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Right: Detailed Questions & Answers Inspector */}
          <div className="w-full md:w-7/12 overflow-y-auto p-4 sm:p-6 bg-neutral-950/40">
            {selectedRecord ? (
              <div className="space-y-5">
                {/* User Summary Header */}
                <div className="p-4 rounded-xl bg-neutral-900 border border-neutral-800 flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <div className="text-xs text-neutral-400 uppercase tracking-widest font-heading">
                      Expediente de Evaluación
                    </div>
                    <div className="mt-1">
                      <ResidentEvilName name={selectedRecord.username} size="lg" />
                    </div>
                    <div className="text-xs text-neutral-400 mt-0.5">
                      Rango asignado: <strong className="text-neutral-200">{selectedRecord.rankTitle}</strong> ({selectedRecord.percentage}%)
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="text-center px-3 py-1.5 bg-neutral-950 rounded-lg border border-neutral-800">
                      <div className="text-[10px] text-emerald-400 font-mono uppercase">Aciertos</div>
                      <div className="font-heading font-black text-lg text-emerald-400">
                        {selectedRecord.score}
                      </div>
                    </div>
                    <div className="text-center px-3 py-1.5 bg-neutral-950 rounded-lg border border-neutral-800">
                      <div className="text-[10px] text-red-400 font-mono uppercase">Fallos</div>
                      <div className="font-heading font-black text-lg text-red-400">
                        {selectedRecord.incorrectQuestionDetails.length}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Filter toggle: Mistakes only vs All */}
                <div className="flex items-center justify-between gap-2 border-b border-neutral-800 pb-2">
                  <h3 className="font-heading text-base font-bold text-neutral-200 uppercase tracking-wider flex items-center gap-2">
                    <XCircle className="w-4 h-4 text-red-400" />
                    Preguntas Falladas ({selectedRecord.incorrectQuestionDetails.length})
                  </h3>
                  <span className="text-xs text-neutral-500">
                    Modo: {selectedRecord.gameMode}
                  </span>
                </div>

                {/* List of failed questions with what the user chose and correct answer */}
                {selectedRecord.incorrectQuestionDetails.length === 0 ? (
                  <div className="p-6 rounded-xl bg-emerald-950/30 border border-emerald-800/60 text-center">
                    <Award className="w-10 h-10 text-emerald-400 mx-auto mb-2" />
                    <div className="font-heading text-lg font-bold text-emerald-200">
                      ¡Supervivencia Perfecta!
                    </div>
                    <div className="text-xs text-neutral-400 mt-1">
                      Este participante no cometió ningún error en las preguntas respondidas.
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3.5">
                    {selectedRecord.incorrectQuestionDetails.map((item, idx) => (
                      <div
                        key={idx}
                        className="p-4 rounded-xl bg-neutral-900 border border-neutral-800 space-y-2.5"
                      >
                        <div className="flex items-start justify-between gap-2 text-xs text-neutral-400">
                          <span className="font-bold text-red-500 font-mono">
                            Pregunta #{item.questionId}
                          </span>
                          <span className="text-[11px] text-neutral-500">
                            {item.category}
                          </span>
                        </div>

                        <div className="text-sm font-semibold text-neutral-100 leading-snug">
                          {item.questionTitle}
                        </div>

                        {/* Choices comparison */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs pt-1">
                          {/* What user answered */}
                          <div className="p-2.5 rounded-lg bg-red-950/50 border border-red-800/70 text-red-200">
                            <div className="text-[10px] text-red-400 font-mono uppercase font-bold flex items-center gap-1 mb-1">
                              <XCircle className="w-3 h-3" />
                              Respuesta del Usuario (Incorrecta):
                            </div>
                            <span className="leading-tight">{item.selectedOptionText}</span>
                          </div>

                          {/* Correct option */}
                          <div className="p-2.5 rounded-lg bg-emerald-950/50 border border-emerald-800/70 text-emerald-200">
                            <div className="text-[10px] text-emerald-400 font-mono uppercase font-bold flex items-center gap-1 mb-1">
                              <CheckCircle2 className="w-3 h-3" />
                              Respuesta Correcta:
                            </div>
                            <span className="leading-tight">{item.correctOptionText}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 text-neutral-500">
                <Search className="w-10 h-10 mb-3 text-neutral-600" />
                <div className="font-heading text-lg font-bold text-neutral-300 uppercase">
                  Selecciona un participante
                </div>
                <p className="text-xs text-neutral-500 max-w-sm mt-1">
                  Haz clic en cualquier participante de la columna izquierda para inspeccionar exactamente qué preguntas acertó y cuáles falló.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
