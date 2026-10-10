/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { QUESTIONS, CATEGORIES, Question } from './data/questions';
import { ASSET_IMAGES } from './assets/images';
import { soundManager } from './utils/soundEffects';
import { Header } from './components/Header';
import { EKGMonitor } from './components/EKGMonitor';
import { QuestionCard } from './components/QuestionCard';
import { AllQuestionsView } from './components/AllQuestionsView';
import { QuestionDirectoryModal } from './components/QuestionDirectoryModal';
import { SummaryModal } from './components/SummaryModal';
import { LiveScoreboardModal, ScoreSubmission } from './components/LiveScoreboardModal';
import { RegistrationTutorialModal } from './components/RegistrationTutorialModal';
import { AuthorCornerBadge } from './components/AuthorCornerBadge';
import { MobileBottomNav } from './components/MobileBottomNav';
import {
  Skull,
  Award,
  Zap,
  Layers,
  ChevronRight,
  Flame,
  Shield,
  HelpCircle,
  FolderOpen,
  Image as ImageIcon,
  Sparkles,
  Radio,
  BookOpen
} from 'lucide-react';

type GameMode = 'marathon' | 'quick' | 'infection' | 'category';

export default function App() {
  // Navigation & View State
  const [currentView, setCurrentView] = useState<'quiz' | 'all' | 'directory'>('quiz');
  const [gameMode, setGameMode] = useState<GameMode>('marathon');
  const [selectedCategory, setSelectedCategory] = useState<string>('Todas las Categorías');

  // Question selection & index
  const [activeQuestions, setActiveQuestions] = useState<Question[]>(QUESTIONS);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  // User answers { questionId: selectedOptionIndex }
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>(() => {
    try {
      const saved = localStorage.getItem('re_quiz_answers');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Bookmarks
  const [bookmarks, setBookmarks] = useState<number[]>(() => {
    try {
      const saved = localStorage.getItem('re_quiz_bookmarks');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Infection / Survival Mode Health (3 lives)
  const [healthRemaining, setHealthRemaining] = useState<number>(3);

  // Audio mute
  const [isMuted, setIsMuted] = useState<boolean>(soundManager.getMuted());

  // Modals
  const [isDirectoryOpen, setIsDirectoryOpen] = useState<boolean>(false);
  const [isSummaryOpen, setIsSummaryOpen] = useState<boolean>(false);
  const [isScoreboardOpen, setIsScoreboardOpen] = useState<boolean>(false);
  const [isTutorialOpen, setIsTutorialOpen] = useState<boolean>(false);
  const [isResetConfirmOpen, setIsResetConfirmOpen] = useState<boolean>(false);

  // Real-time live scores from server
  const [liveScores, setLiveScores] = useState<ScoreSubmission[]>([]);
  const [isLoadingScores, setIsLoadingScores] = useState<boolean>(false);

  // Background Theme
  const [bgTheme, setBgTheme] = useState<'mansion' | 'lab' | 'city' | 'plain'>('mansion');

  // Streak counter
  const [streak, setStreak] = useState<number>(0);

  // Synchronize localStorage
  useEffect(() => {
    try {
      localStorage.setItem('re_quiz_answers', JSON.stringify(userAnswers));
    } catch {
      // ignore storage quota issues
    }
  }, [userAnswers]);

  useEffect(() => {
    try {
      localStorage.setItem('re_quiz_bookmarks', JSON.stringify(bookmarks));
    } catch {
      // ignore
    }
  }, [bookmarks]);

  // Fetch initial scores & connect to real-time SSE
  const fetchScores = async () => {
    try {
      setIsLoadingScores(true);
      const res = await fetch('/api/scores');
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data.scores)) {
          setLiveScores(data.scores);
        }
      }
    } catch (err) {
      console.error('Error loading scores:', err);
    } finally {
      setIsLoadingScores(false);
    }
  };

  useEffect(() => {
    fetchScores();

    let eventSource: EventSource | null = null;
    try {
      eventSource = new EventSource('/api/scores/live');
      eventSource.onmessage = (event) => {
        try {
          const payload = JSON.parse(event.data);
          if (payload.type === 'SNAPSHOT' && Array.isArray(payload.scores)) {
            setLiveScores(payload.scores);
          } else if (payload.type === 'NEW_SUBMISSION' && payload.record) {
            setLiveScores((prev) => [payload.record, ...prev.filter((r) => r.id !== payload.record.id)]);
          }
        } catch (e) {
          console.error('SSE parse error:', e);
        }
      };
    } catch (e) {
      console.error('SSE initialization error:', e);
    }

    return () => {
      if (eventSource) eventSource.close();
    };
  }, []);

  const handleDeleteScore = async (id: string) => {
    try {
      const res = await fetch(`/api/scores/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setLiveScores((prev) => prev.filter((s) => s.id !== id));
      }
    } catch (err) {
      console.error('Failed to delete score:', err);
    }
  };

  // Adjust active questions based on mode & category
  const setupQuestionsForMode = (mode: GameMode, cat: string = selectedCategory) => {
    if (mode === 'marathon') {
      setActiveQuestions(QUESTIONS);
      setCurrentIndex(0);
    } else if (mode === 'quick') {
      // Pick 20 randomized questions across the 100
      const shuffled = [...QUESTIONS].sort(() => 0.5 - Math.random()).slice(0, 20);
      setActiveQuestions(shuffled);
      setCurrentIndex(0);
    } else if (mode === 'infection') {
      const shuffled = [...QUESTIONS].sort(() => 0.5 - Math.random());
      setActiveQuestions(shuffled);
      setCurrentIndex(0);
      setHealthRemaining(3);
    } else if (mode === 'category') {
      if (cat === 'Todas las Categorías') {
        setActiveQuestions(QUESTIONS);
      } else {
        const filtered = QUESTIONS.filter((q) => q.category === cat);
        setActiveQuestions(filtered.length > 0 ? filtered : QUESTIONS);
      }
      setCurrentIndex(0);
    }
  };

  const handleModeChange = (newMode: GameMode) => {
    soundManager.playSelect();
    setGameMode(newMode);
    setupQuestionsForMode(newMode, selectedCategory);
  };

  const handleCategoryFilter = (cat: string) => {
    setSelectedCategory(cat);
    if (gameMode === 'category') {
      setupQuestionsForMode('category', cat);
    }
  };

  // Answer handler
  const handleSelectOption = (questionId: number, optionIndex: number) => {
    if (userAnswers[questionId] !== undefined) return;

    setUserAnswers((prev) => ({
      ...prev,
      [questionId]: optionIndex,
    }));

    const q = QUESTIONS.find((item) => item.id === questionId);
    if (q) {
      if (optionIndex === q.correct) {
        setStreak((prev) => prev + 1);
      } else {
        setStreak(0);
        if (gameMode === 'infection') {
          setHealthRemaining((prev) => {
            const nextHealth = Math.max(0, prev - 1);
            if (nextHealth === 0) {
              setTimeout(() => {
                handleQuizComplete();
              }, 1200);
            }
            return nextHealth;
          });
        }
      }
    }
  };

  // Quiz completion trigger: automatically shows tutorial if not seen, or opens summary
  const handleQuizComplete = () => {
    soundManager.playVictory();
    const tutorialSeen = localStorage.getItem('re_tutorial_seen') === 'true';
    if (!tutorialSeen) {
      setIsTutorialOpen(true);
    } else {
      setIsSummaryOpen(true);
    }
  };

  const handleToggleBookmark = (id: number) => {
    setBookmarks((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Request reset confirmation
  const handleResetQuiz = () => {
    setIsResetConfirmOpen(true);
  };

  const executeResetQuiz = () => {
    setUserAnswers({});
    setStreak(0);
    setHealthRemaining(3);
    setCurrentIndex(0);
    setupQuestionsForMode(gameMode, selectedCategory);
    soundManager.playTypewriter();
    setIsResetConfirmOpen(false);
  };

  // Review mistakes
  const handleReviewMistakes = () => {
    setIsSummaryOpen(false);
    // Find first incorrect question index
    const mistakeIndex = activeQuestions.findIndex(
      (q) => userAnswers[q.id] !== undefined && userAnswers[q.id] !== q.correct
    );
    if (mistakeIndex !== -1) {
      setCurrentIndex(mistakeIndex);
      setCurrentView('quiz');
    }
  };

  // Calculate score & answered count
  const score = useMemo(() => {
    return Object.entries(userAnswers).reduce((acc, [qId, ans]) => {
      const q = QUESTIONS.find((item) => item.id === Number(qId));
      return q && q.correct === ans ? acc + 1 : acc;
    }, 0);
  }, [userAnswers]);

  const answeredCount = Object.keys(userAnswers).length;

  const currentQuestion = activeQuestions[currentIndex] || activeQuestions[0];

  // Background style
  const bgImageSrc = {
    mansion: ASSET_IMAGES.mansionFoyer,
    lab: ASSET_IMAGES.umbrellaLab,
    city: ASSET_IMAGES.raccoonNight,
    plain: '',
  }[bgTheme];

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col relative selection:bg-red-900 selection:text-white">
      {/* Dynamic Background Backdrop */}
      {bgTheme !== 'plain' && (
        <div className="fixed inset-0 pointer-events-none z-0">
          <img
            src={bgImageSrc}
            alt="Ambiente Resident Evil"
            className="w-full h-full object-cover object-center opacity-25 filter brightness-50"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/80 to-neutral-950/90" />
          <div className="absolute inset-0 crt-scanlines pointer-events-none opacity-30" />
        </div>
      )}

      {/* Top Header */}
      <Header
        currentView={currentView}
        onViewChange={(v) => {
          if (v === 'directory') setIsDirectoryOpen(true);
          else setCurrentView(v);
        }}
        onResetQuiz={handleResetQuiz}
        isMuted={isMuted}
        onToggleMute={() => {
          const next = soundManager.toggleMute();
          setIsMuted(next);
        }}
        answeredCount={answeredCount}
        totalQuestions={QUESTIONS.length}
        onOpenLiveScoreboard={() => setIsScoreboardOpen(true)}
      />

      {/* Main Content Area */}
      <main className="relative z-10 flex-1 max-w-5xl mx-auto w-full px-4 sm:px-6 py-6 sm:py-8 space-y-6 pb-24 md:pb-12">
        {/* Game Mode Selector & Atmospheric Toolbar */}
        <div className="bg-neutral-900/80 backdrop-blur-md border border-neutral-800 rounded-xl p-3 sm:p-4 flex flex-wrap items-center justify-between gap-4">
          {/* Game Modes Segmented Controls */}
          <div className="flex items-center gap-1.5 p-1 bg-neutral-950 rounded-lg border border-neutral-800/80 flex-wrap">
            <button
              onClick={() => handleModeChange('marathon')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all whitespace-nowrap cursor-pointer ${
                gameMode === 'marathon'
                  ? 'bg-red-800 text-white shadow-sm'
                  : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              Maratón 100
            </button>
            <button
              onClick={() => handleModeChange('quick')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all whitespace-nowrap cursor-pointer ${
                gameMode === 'quick'
                  ? 'bg-red-800 text-white shadow-sm'
                  : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              Rápida (20)
            </button>
            <button
              onClick={() => handleModeChange('infection')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all whitespace-nowrap cursor-pointer flex items-center gap-1 ${
                gameMode === 'infection'
                  ? 'bg-red-800 text-white shadow-sm'
                  : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              <Skull className="w-3.5 h-3.5" />
              <span>Infección (3 Vidas)</span>
            </button>
            <button
              onClick={() => handleModeChange('category')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all whitespace-nowrap cursor-pointer ${
                gameMode === 'category'
                  ? 'bg-red-800 text-white shadow-sm'
                  : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              Por Categoría
            </button>
          </div>

          {/* Quick Actions (Live Scoreboard, Directory & Summary) */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                soundManager.playSelect();
                setIsScoreboardOpen(true);
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-950/80 border border-red-800/90 hover:bg-red-900 text-xs font-semibold text-red-200 transition-colors whitespace-nowrap cursor-pointer shadow-sm"
            >
              <Radio className="w-3.5 h-3.5 text-red-400 animate-pulse" />
              <span>Marcador ({liveScores.length})</span>
            </button>

            {/* Atmosphere theme selector */}
            <div className="hidden sm:flex items-center gap-1 bg-neutral-950 border border-neutral-800 rounded-lg p-1 text-xs text-neutral-400">
              <span className="px-2 text-[11px] font-mono text-neutral-500">Escenario:</span>
              <button
                onClick={() => setBgTheme('mansion')}
                className={`px-2 py-0.5 rounded transition-colors cursor-pointer ${
                  bgTheme === 'mansion' ? 'bg-neutral-800 text-neutral-100 font-medium' : 'hover:text-neutral-200'
                }`}
              >
                Mansión
              </button>
              <button
                onClick={() => setBgTheme('city')}
                className={`px-2 py-0.5 rounded transition-colors cursor-pointer ${
                  bgTheme === 'city' ? 'bg-neutral-800 text-neutral-100 font-medium' : 'hover:text-neutral-200'
                }`}
              >
                Raccoon
              </button>
              <button
                onClick={() => setBgTheme('lab')}
                className={`px-2 py-0.5 rounded transition-colors cursor-pointer ${
                  bgTheme === 'lab' ? 'bg-neutral-800 text-neutral-100 font-medium' : 'hover:text-neutral-200'
                }`}
              >
                Laboratorio
              </button>
            </div>

            <button
              onClick={() => {
                soundManager.playSelect();
                setIsTutorialOpen(true);
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-950 border border-neutral-800 hover:border-red-900/80 text-xs font-semibold text-neutral-300 hover:text-red-300 transition-colors whitespace-nowrap cursor-pointer shadow-sm"
            >
              <BookOpen className="w-3.5 h-3.5 text-red-500" />
              <span>Tutorial</span>
            </button>

            <button
              onClick={() => {
                soundManager.playSelect();
                setIsDirectoryOpen(true);
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-950 border border-neutral-800 hover:border-neutral-700 text-xs font-medium text-neutral-300 transition-colors whitespace-nowrap cursor-pointer"
            >
              <FolderOpen className="w-3.5 h-3.5 text-neutral-400" />
              <span>Índice 1-100</span>
            </button>

            <button
              onClick={() => {
                handleQuizComplete();
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-950/70 border border-red-800/80 hover:bg-red-900/80 text-xs font-semibold text-red-300 hover:text-white transition-colors whitespace-nowrap cursor-pointer shadow-sm"
            >
              <Award className="w-3.5 h-3.5 text-red-400" />
              <span>Ver Rango</span>
            </button>
          </div>
        </div>

        {/* EKG Monitor Status Bar */}
        <EKGMonitor
          score={score}
          totalAnswered={answeredCount}
          streak={streak}
          healthRemaining={healthRemaining}
          gameMode={gameMode}
        />

        {/* Category Picker if in Category Mode */}
        {gameMode === 'category' && (
          <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-4 flex items-center justify-between gap-4 flex-wrap">
            <span className="text-xs uppercase tracking-wider text-neutral-400 font-heading">
              Seleccionar Categoría del Archivo:
            </span>
            <select
              value={selectedCategory}
              onChange={(e) => handleCategoryFilter(e.target.value)}
              aria-label="Filtrar por categoría del archivo"
              className="bg-neutral-950 border border-neutral-700 rounded-lg px-3 py-1.5 text-xs sm:text-sm text-neutral-200 focus:outline-none focus:border-red-600 cursor-pointer"
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Main Display: Interactive Card Mode or All Questions List Mode */}
        {currentView === 'quiz' ? (
          <div>
            {currentQuestion ? (
              <QuestionCard
                question={currentQuestion}
                currentIndex={currentIndex}
                totalQuestions={activeQuestions.length}
                selectedOption={userAnswers[currentQuestion.id] ?? null}
                onSelectOption={(idx) => handleSelectOption(currentQuestion.id, idx)}
                onNext={() => {
                  if (currentIndex < activeQuestions.length - 1) {
                    setCurrentIndex(currentIndex + 1);
                  } else {
                    handleQuizComplete();
                  }
                }}
                onPrev={() => {
                  if (currentIndex > 0) {
                    setCurrentIndex(currentIndex - 1);
                  }
                }}
                isBookmarked={bookmarks.includes(currentQuestion.id)}
                onToggleBookmark={() => handleToggleBookmark(currentQuestion.id)}
              />
            ) : (
              <div className="text-center py-12 text-neutral-400">
                No hay preguntas disponibles para este filtro.
              </div>
            )}
          </div>
        ) : (
          <AllQuestionsView
            questions={QUESTIONS}
            userAnswers={userAnswers}
            onSelectAnswer={handleSelectOption}
            selectedCategory={selectedCategory}
            onSelectCategory={handleCategoryFilter}
            categories={CATEGORIES}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-neutral-800/80 bg-neutral-950/80 backdrop-blur-sm py-4 px-6 text-center text-xs text-neutral-500 pb-20 md:pb-4">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-red-500 font-bold font-heading">BIOHAZARD DATA ARCHIVE</span>
            <span aria-hidden="true">·</span>
            <span>100 Preguntas de la Saga Resident Evil</span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <span className="text-neutral-400 font-mono text-[11px] uppercase tracking-wider">Autor del Proyecto:</span>
            <span className="font-re-title font-black tracking-widest uppercase inline-flex items-baseline">
              <span className="text-red-600 text-lg font-black drop-shadow-[0_0_8px_rgba(220,38,38,0.7)]">Y</span>
              <span className="text-neutral-100 font-black text-sm tracking-wider">IL</span>
            </span>
            <span className="text-sm select-none">💕</span>
          </div>
        </div>
      </footer>

      {/* Floating Corner Author Badge (Mobile & Laptop adaptive with RE title typography) */}
      <AuthorCornerBadge />

      {/* Mobile Bottom Navigation Bar */}
      <MobileBottomNav
        currentView={currentView}
        onViewChange={setCurrentView}
        onOpenLiveScoreboard={() => setIsScoreboardOpen(true)}
        answeredCount={answeredCount}
        totalQuestions={QUESTIONS.length}
      />

      {/* Directory Modal */}
      <QuestionDirectoryModal
        isOpen={isDirectoryOpen}
        onClose={() => setIsDirectoryOpen(false)}
        questions={QUESTIONS}
        userAnswers={userAnswers}
        currentIndex={currentIndex}
        onJumpToQuestion={(idx) => {
          setCurrentIndex(idx);
          setCurrentView('quiz');
        }}
        bookmarks={bookmarks}
      />

      {/* Summary Modal */}
      <SummaryModal
        isOpen={isSummaryOpen}
        onClose={() => setIsSummaryOpen(false)}
        questions={QUESTIONS}
        userAnswers={userAnswers}
        onRestart={() => {
          setIsSummaryOpen(false);
          handleResetQuiz();
        }}
        onReviewMistakes={handleReviewMistakes}
        onOpenLiveScoreboard={() => {
          setIsSummaryOpen(false);
          setIsScoreboardOpen(true);
        }}
        gameMode={gameMode}
      />

      {/* Live Scoreboard & Errors Inspector Modal */}
      <LiveScoreboardModal
        isOpen={isScoreboardOpen}
        onClose={() => setIsScoreboardOpen(false)}
        scores={liveScores}
        isLoading={isLoadingScores}
        onRefresh={fetchScores}
        onDeleteScore={handleDeleteScore}
      />

      {/* Registration Tutorial Modal */}
      <RegistrationTutorialModal
        isOpen={isTutorialOpen}
        onClose={() => setIsTutorialOpen(false)}
        onProceedToRegister={() => {
          setIsTutorialOpen(false);
          setIsSummaryOpen(true);
        }}
      />

      {/* Reset Confirmation Modal */}
      {isResetConfirmOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl w-full max-w-md p-6 shadow-2xl space-y-4">
            <h3 className="font-heading text-xl font-bold uppercase tracking-wider text-red-500">
              Reiniciar Registro de Supervivencia
            </h3>
            <p className="text-sm text-neutral-300 leading-relaxed font-sans">
              ¿Estás seguro de que deseas reiniciar todos tus expedientes y comenzar el cuestionario desde cero? Esta acción no se puede deshacer.
            </p>
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setIsResetConfirmOpen(false)}
                className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-semibold rounded-lg transition-colors cursor-pointer"
              >
                Cancelar
              </button>
              <button
                onClick={executeResetQuiz}
                className="px-4 py-2 bg-red-700 hover:bg-red-600 text-white text-xs font-bold rounded-lg transition-colors cursor-pointer shadow-lg shadow-red-950/40"
              >
                Confirmar y Reiniciar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
