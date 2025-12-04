
import React, { useState, useRef, useEffect } from 'react';
import { Message, AssessmentData } from '../types';
import { useMomentumChat } from '../hooks/useMomentumChat';
import ChatMessage from './ChatMessage';
import { SendIcon } from './icons';
import AssessmentForm from './AssessmentForm';
import { MomentumLogo } from './MomentumLogo';

const initialMessage: Message = {
  id: 'init',
  role: 'model',
  text: "Ciao, sono l'assistente virtuale di Momentum. Chiedimi informazioni su corsi, prezzi e sulla lezione di prova gratuita.",
};

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([initialMessage]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { sendMessage, isInitialized } = useMomentumChat();
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [showAssessmentForm, setShowAssessmentForm] = useState(false);
  const [pendingQuery, setPendingQuery] = useState<string | null>(null);

  useEffect(() => {
    chatContainerRef.current?.scrollTo({
      top: chatContainerRef.current.scrollHeight,
      behavior: 'smooth',
    });
  }, [messages, showAssessmentForm]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading || !isInitialized) return;

    const userMessage: Message = { id: Date.now().toString(), role: 'user', text: input };
    const botMessageId = (Date.now() + 1).toString();
    
    setMessages(prev => [...prev, userMessage, { id: botMessageId, role: 'model', text: '' }]);
    setIsLoading(true);
    const currentInput = input;
    setInput('');

    await sendMessage(
      currentInput,
      (chunk) => {
        const trigger = '[SHOW_ASSESSMENT_FORM]';
        const hasTrigger = chunk.includes(trigger);
        
        if (hasTrigger && !showAssessmentForm) {
            setShowAssessmentForm(true);
            setPendingQuery(currentInput);
        }
        const cleanedChunk = chunk.replace(trigger, '');
        
        setMessages(prev => prev.map(msg => 
          msg.id === botMessageId ? { ...msg, text: cleanedChunk } : msg
        ));
      },
      () => {
        setIsLoading(false);
      }
    );
  };

  const handleFormSubmit = async (data: AssessmentData) => {
    setShowAssessmentForm(false);

    const summary = `Ho preparato un'email con le tue informazioni per lo staff. Ecco un riepilogo:
- Sesso: ${data.sesso}
- Età: ${data.eta}
- Recapito: ${data.recapito}
- Obiettivo: ${data.obiettivo}
- Livello di attività: ${data.livelloAttivita}
- Limitazioni: ${data.limitazioni || 'Nessuna'}`;

    const userSummaryMessage: Message = { id: Date.now().toString(), role: 'user', text: summary };
    const botMessageId = (Date.now() + 1).toString();

    setMessages(prev => [...prev, userSummaryMessage, { id: botMessageId, role: 'model', text: '' }]);
    setIsLoading(true);

    const newPrompt = `La domanda originale dell'utente era: "${pendingQuery}". L'utente ha fornito i seguenti dettagli tramite un modulo: ${JSON.stringify(data)}. Basandoti su questi dati, fornisci una raccomandazione generale e poi consiglia vivamente di contattare un personal trainer per una valutazione completa, fornendo i contatti della struttura.`;
    
    setPendingQuery(null);

    await sendMessage(
        newPrompt,
        (chunk) => {
            setMessages(prev => prev.map(msg => 
              msg.id === botMessageId ? { ...msg, text: chunk } : msg
            ));
        },
        () => {
            setIsLoading(false);
        }
    );
  };

  return (
    <div className="flex flex-col h-full max-w-4xl mx-auto">
      <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6">
        {messages.map((msg) => (
          <ChatMessage key={msg.id} message={msg} />
        ))}
        {showAssessmentForm && <AssessmentForm onFormSubmit={handleFormSubmit} />}
        {isLoading && !showAssessmentForm && messages[messages.length - 1]?.role === 'model' && (
           <div className="flex items-start space-x-4">
             <div className="w-8 h-8 rounded-full bg-black flex-shrink-0 flex items-center justify-center ring-1 ring-gray-600 overflow-hidden">
               <MomentumLogo />
             </div>
             <div className="bg-gray-800 rounded-lg p-3 text-gray-300 animate-pulse">
               Sto scrivendo...
             </div>
           </div>
        )}
      </div>
      <div className="p-4 md:p-6 bg-gray-900 border-t border-gray-700">
        <form onSubmit={handleSend} className="flex items-center space-x-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={isInitialized ? "Scrivi il tuo messaggio..." : "Inizializzazione assistente..."}
            disabled={isLoading || !isInitialized || showAssessmentForm}
            className="flex-1 bg-gray-800 border border-gray-700 rounded-full py-3 px-5 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-momentum-green-500 transition duration-200 disabled:opacity-50"
            aria-label="Chat input"
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim() || !isInitialized || showAssessmentForm}
            className="bg-momentum-green-500 text-white rounded-full p-3 hover:bg-momentum-green-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-momentum-green-500 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Send message"
          >
            <SendIcon />
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chat;
