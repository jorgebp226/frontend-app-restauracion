import React, { useState, useEffect } from 'react';
import { Phone, X } from 'lucide-react';
import { Conversation } from '@11labs/client';

// Definimos los estilos keyframe y la animación en un style tag
const FluidAnimation = () => (
  <style>{`
    @keyframes morphing {
      0% {
        border-radius: 60% 40% 30% 70%/60% 30% 70% 40%;
        background: linear-gradient(45deg, #ffffff 0%, #63b3ed 45%, #2b6cb0 100%);
      }
      25% { 
        border-radius: 30% 60% 70% 40%/50% 60% 30% 60%;
        background: linear-gradient(45deg, #63b3ed 0%, #2b6cb0 65%, #ffffff 100%);
      }
      50% {
        border-radius: 40% 60% 30% 70%/40% 40% 60% 50%;
        background: linear-gradient(45deg, #2b6cb0 0%, #ffffff 50%, #63b3ed 100%);
      }
      75% {
        border-radius: 60% 40% 70% 30%/60% 30% 70% 40%;
        background: linear-gradient(45deg, #ffffff 0%, #2b6cb0 45%, #63b3ed 100%);
      }
      100% {
        border-radius: 60% 40% 30% 70%/60% 30% 70% 40%;
        background: linear-gradient(45deg, #ffffff 0%, #63b3ed 45%, #2b6cb0 100%);
      }
    }

    .fluid-animate {
      animation: morphing 8s ease-in-out infinite;
      border-radius: 60% 40% 30% 70%/60% 30% 70% 40%;
      transition: all 1s ease-in-out;
      background-size: 200% 200%;
    }

    .fluid-container {
      position: relative;
      width: 48px;
      height: 48px;
      border-radius: 50%;
      overflow: hidden;
      background: white;
      padding: 4px;
      box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.8);
    }

    .fluid-inner {
      position: absolute;
      inset: 4px;
      border-radius: 50%;
      overflow: hidden;
      background: white;
    }
    
    .fluid-inner::before {
      content: '';
      position: absolute;
      inset: 0;
      background: white;
      border-radius: 50%;
      z-index: 1;
      opacity: 0.2;
    }
  `}</style>
);

interface AIAssistantProps {
  data: any;
}

const AIAssistant: React.FC<AIAssistantProps> = ({ data }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [conversation, setConversation] = useState<any>(null);
  const [status, setStatus] = useState('disconnected');

  const customPrompt = `
    Eres un agente dedicado a analizar los datos de un restaurante 
    sobre el rendimiento de los diferentes platos y tu trabajo es 
    determinar cuales son los mejores siguientes pasos para mejorar 
    el rendimiento del restaurante.

    Estos son los datos actualizados al día de hoy del restaurante:
    ${JSON.stringify(data, null, 2)}
  `;

  const overrides = {
    agent: {
      prompt: {
        prompt: customPrompt,
      },
      firstMessage: "¡Hola! ¿En qué puedo ayudarte hoy con el análisis del restaurante?",
    }
  };

  const startConversation = async () => {
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });
      
      const conv = await Conversation.startSession({
        agentId: 'lPO1BIgKKe78sqesK86E',
        overrides,
        onConnect: () => {
          setStatus('connected');
        },
        onDisconnect: () => {
          setStatus('disconnected');
        },
        onError: (error) => {
          console.error('Error:', error);
        },
        onModeChange: (mode) => {
          setStatus(mode.mode);
        },
      });
      
      setConversation(conv);
    } catch (error) {
      console.error('Failed to start conversation:', error);
    }
  };

  const stopConversation = async () => {
    if (conversation) {
      await conversation.endSession();
      setConversation(null);
    }
  };

  useEffect(() => {
    return () => {
      if (conversation) {
        conversation.endSession();
      }
    };
  }, [conversation]);

  return (
    <>
      <FluidAnimation />
      <div className="fixed right-6 bottom-6 z-50">
        <div className="bg-white rounded-3xl shadow-lg">
          <div className="p-4">
            <div className="flex items-center gap-4">
              {/* Avatar con animación fluida */}
              <div className="fluid-container">
                <div className="fluid-inner">
                  <div className="fluid-animate w-full h-full" />
                </div>
              </div>

              <div className="flex flex-col">
                {/* Estado y botón */}
                {status === 'disconnected' ? (
                  <>
                    <span className="text-base font-medium mb-2">
                      Habla con el asistente de IA
                    </span>
                    <button
                      onClick={startConversation}
                      className="flex items-center justify-center gap-2 px-6 py-3 bg-black text-white rounded-full hover:bg-gray-800 transition-all"
                    >
                      <Phone className="w-4 h-4" />
                      <span className="font-medium">Empieza la llamada</span>
                    </button>
                  </>
                ) : (
                  <>
                    <span className="text-base font-medium mb-2">
                      Escuchando
                    </span>
                    <button
                      onClick={stopConversation}
                      className="flex items-center justify-center gap-2 px-6 py-3 bg-white text-black border border-gray-200 rounded-full hover:bg-gray-50 transition-all"
                    >
                      <X className="w-4 h-4" />
                      <span className="font-medium">Terminar</span>
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center py-1 border-t border-gray-100">
            <span className="text-xs text-gray-400">
              Powered by Talky AI
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default AIAssistant;