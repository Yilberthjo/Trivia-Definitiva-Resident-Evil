import React, { useState } from 'react';
import { ResidentEvilName } from './ResidentEvilName';
import {
  ShieldAlert,
  X,
  UserCheck,
  Send,
  Radio,
  CheckCircle2,
  ChevronRight,
  Sparkles,
  BookOpen
} from 'lucide-react';
import { soundManager } from '../utils/soundEffects';

interface RegistrationTutorialModalProps {
  isOpen: boolean;
  onClose: () => void;
  onProceedToRegister: () => void;
}

export const RegistrationTutorialModal: React.FC<RegistrationTutorialModalProps> = ({
  isOpen,
  onClose,
  onProceedToRegister,
}) => {
  const [demoName, setDemoName] = useState('LEON');
  const [dontShowAgain, setDontShowAgain] = useState(false);

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

  const handleFinish = () => {
    soundManager.playSelect();
    if (dontShowAgain) {
      localStorage.setItem('re_tutorial_seen', 'true');
    }
    onProceedToRegister();
  };

  const handleClose = () => {
    soundManager.playSelect();
    if (dontShowAgain) {
      localStorage.setItem('re_tutorial_seen', 'true');
    }
    onClose();
  };

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          handleClose();
        }
      }}
      className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-5"
    >
      <div className="bg-neutral-900 border border-red-900/80 rounded-2xl w-full max-w-2xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden relative">
        {/* Top Header */}
        <div className="p-5 border-b border-neutral-800 bg-neutral-950/80 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded bg-red-950 border border-red-700/80 flex items-center justify-center text-red-500 shadow-md shadow-red-950">
              <ShieldAlert className="w-5 h-5 text-red-500 animate-pulse" />
            </div>
            <div>
              <div className="text-[10px] uppercase font-mono tracking-widest text-red-500 font-bold">
                PROTOCOLO S.T.A.R.S. // ARCHIVO OFICIAL
              </div>
              <h2 className="font-heading text-lg sm:text-xl font-bold uppercase tracking-wider text-neutral-100">
                Tutorial de Registro en el Marcador Global
              </h2>
            </div>
          </div>

          <button
            onClick={handleClose}
            title="Cerrar tutorial"
            className="p-2 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-7 overflow-y-auto space-y-5">
          <div className="p-3.5 rounded-xl bg-red-950/30 border border-red-900/50 flex items-start gap-3">
            <BookOpen className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
            <p className="text-xs text-neutral-300 leading-relaxed font-sans">
              ¡Has completado el cuestionario de Resident Evil! Sigue este manual de 3 pasos para ingresar tu nombre y registrar tu rango y respuestas en la base de datos central en tiempo real.
            </p>
          </div>

          {/* Step 1 */}
          <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 space-y-2.5">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded bg-red-900 text-white font-mono font-bold text-xs flex items-center justify-center">
                1
              </span>
              <h3 className="font-heading text-base font-bold text-neutral-100 uppercase tracking-wide flex items-center gap-2">
                <UserCheck className="w-4 h-4 text-red-400" />
                Ingresa tu Nombre de Agente
              </h3>
            </div>
            <p className="text-xs text-neutral-400 leading-relaxed pl-8">
              En la pantalla de resultados, escribe tu nombre o alias en el campo de texto. Nuestro sistema aplicará de inmediato el diseño oficial de Resident Evil: la <strong>primera letra en rojo sangre</strong> con tipografía militar condensada.
            </p>

            {/* Interactive Preview Simulator */}
            <div className="pl-8 pt-1">
              <div className="p-3 rounded-lg bg-neutral-900 border border-neutral-800 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] text-neutral-500 font-mono">Prueba aquí:</span>
                  <input
                    type="text"
                    value={demoName}
                    onChange={(e) => setDemoName(e.target.value.toUpperCase())}
                    maxLength={15}
                    placeholder="Escribe un nombre..."
                    className="w-28 bg-neutral-950 border border-neutral-700 rounded px-2 py-1 text-xs text-neutral-100 uppercase font-mono focus:outline-none focus:border-red-600"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] text-neutral-500 font-mono">Resultado:</span>
                  <ResidentEvilName name={demoName || 'AGENTE'} size="md" badge />
                </div>
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 space-y-2.5">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded bg-red-900 text-white font-mono font-bold text-xs flex items-center justify-center">
                2
              </span>
              <h3 className="font-heading text-base font-bold text-neutral-100 uppercase tracking-wide flex items-center gap-2">
                <Send className="w-4 h-4 text-red-400" />
                Presiona "Guardar Puntuación"
              </h3>
            </div>
            <p className="text-xs text-neutral-400 leading-relaxed pl-8">
              Al hacer clic en el botón rojo, tus datos se transmitirán instantáneamente al servidor central:
            </p>
            <ul className="text-xs text-neutral-400 space-y-1.5 pl-12 list-disc">
              <li>Tu <strong>Puntuación final</strong> y <strong>Rango obtenido</strong> (S, A, B, C o D).</li>
              <li>Tu lista de <strong>preguntas acertadas</strong>.</li>
              <li>El <strong>desglose exacto de cada fallo</strong> con la opción que elegiste y la correcta.</li>
            </ul>
          </div>

          {/* Step 3 */}
          <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 space-y-2.5">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded bg-red-900 text-white font-mono font-bold text-xs flex items-center justify-center">
                3
              </span>
              <h3 className="font-heading text-base font-bold text-neutral-100 uppercase tracking-wide flex items-center gap-2">
                <Radio className="w-4 h-4 text-red-400 animate-pulse" />
                Aparición en Tiempo Real en el Marcador
              </h3>
            </div>
            <p className="text-xs text-neutral-400 leading-relaxed pl-8">
              Tu intento aparecerá de inmediato en la lista del <strong>"Marcador en Vivo"</strong>. Tanto tú como el autor del proyecto (<span className="font-re-title font-black uppercase inline-flex items-baseline"><span className="text-red-500 font-black">Y</span><span className="text-neutral-100 font-black">IL</span> <span className="text-xs">💕</span></span>) podrán hacer clic sobre tu nombre para auditar qué respuestas conocías y cuáles fueron tus errores sobre el lore de Resident Evil.
            </p>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-5 bg-neutral-950 border-t border-neutral-800 flex flex-wrap items-center justify-between gap-3">
          <label className="flex items-center gap-2 text-xs text-neutral-400 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={dontShowAgain}
              onChange={(e) => setDontShowAgain(e.target.checked)}
              className="rounded bg-neutral-900 border-neutral-700 text-red-600 focus:ring-0 cursor-pointer"
            />
            <span>No volver a mostrar automáticamente este tutorial</span>
          </label>

          <div className="flex items-center gap-2 ml-auto">
            <button
              onClick={handleClose}
              className="px-3.5 py-2 rounded-lg bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-xs font-semibold text-neutral-300 transition-colors cursor-pointer"
            >
              Cerrar
            </button>
            <button
              onClick={handleFinish}
              className="px-5 py-2 rounded-lg bg-red-700 hover:bg-red-600 text-white text-xs font-bold uppercase tracking-wider transition-colors flex items-center gap-1.5 cursor-pointer shadow-lg shadow-red-950"
            >
              <span>¡Entendido! Registrar Puntuación</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
