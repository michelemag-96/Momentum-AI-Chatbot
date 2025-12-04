
import React, { useState } from 'react';
import { AssessmentData } from '../types';

interface AssessmentFormProps {
  onFormSubmit: (data: AssessmentData) => void;
}

const AssessmentForm: React.FC<AssessmentFormProps> = ({ onFormSubmit }) => {
  const [formData, setFormData] = useState<AssessmentData>({
    sesso: '',
    eta: '',
    peso: '',
    obiettivo: '',
    livelloAttivita: '',
    limitazioni: '',
    recapito: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value as any }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.sesso || !formData.eta || !formData.obiettivo || !formData.livelloAttivita || !formData.recapito) {
        alert("Per favore, compila tutti i campi obbligatori (*).");
        return;
    }
    
    const subject = "Nuova Richiesta di Valutazione - Momentum";
    const body = `
Nuova richiesta di valutazione ricevuta dal chatbot.

Dettagli del cliente:
--------------------------
Sesso: ${formData.sesso}
Età: ${formData.eta}
Peso: ${formData.peso || 'N/D'} kg
Recapito (Email/Tel): ${formData.recapito}

Obiettivo Principale:
${formData.obiettivo}

Livello di Attività:
${formData.livelloAttivita}

Limitazioni o Disturbi:
${formData.limitazioni || 'Nessuna specificata'}
--------------------------
    `;

    const mailtoLink = `mailto:info@momentumpm.it?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body.trim())}`;
    window.location.href = mailtoLink;

    onFormSubmit(formData);
  };

  const inputClass = "w-full bg-gray-700 border border-gray-600 rounded-lg py-2 px-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-momentum-green-500 transition duration-200";

  return (
    <div className="bg-gray-800 rounded-xl p-6 my-4 border border-gray-700 animate-fade-in">
      <h3 className="text-lg font-semibold text-white mb-4">Modulo di Valutazione</h3>
      <p className="text-gray-400 mb-6 text-sm">Compila queste informazioni per ricevere un consiglio preliminare. Cliccando "Invia Informazioni", si aprirà il tuo client di posta elettronica per mandare i dati al nostro staff. I campi con * sono obbligatori.</p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label htmlFor="sesso" className="block text-sm font-medium text-gray-300 mb-1">Sesso *</label>
            <select id="sesso" name="sesso" value={formData.sesso} onChange={handleChange} className={inputClass} required>
              <option value="" disabled>Seleziona...</option>
              <option value="Uomo">Uomo</option>
              <option value="Donna">Donna</option>
              <option value="Altro">Preferisco non specificare</option>
            </select>
          </div>
          <div>
            <label htmlFor="eta" className="block text-sm font-medium text-gray-300 mb-1">Età *</label>
            <input type="number" id="eta" name="eta" value={formData.eta} onChange={handleChange} className={inputClass} placeholder="Es. 35" required min="1" />
          </div>
          <div>
            <label htmlFor="peso" className="block text-sm font-medium text-gray-300 mb-1">Peso (kg)</label>
            <input type="number" id="peso" name="peso" value={formData.peso} onChange={handleChange} className={inputClass} placeholder="Es. 70" min="1" />
          </div>
        </div>
        <div>
            <label htmlFor="recapito" className="block text-sm font-medium text-gray-300 mb-1">Recapito (Email o Telefono) *</label>
            <input type="text" id="recapito" name="recapito" value={formData.recapito} onChange={handleChange} className={inputClass} placeholder="La tua email o numero di telefono" required />
        </div>
        <div>
          <label htmlFor="obiettivo" className="block text-sm font-medium text-gray-300 mb-1">Qual è il tuo principale obiettivo attuale? *</label>
          <input type="text" id="obiettivo" name="obiettivo" value={formData.obiettivo} onChange={handleChange} className={inputClass} placeholder="Es. Perdere peso, aumentare la massa muscolare..." required />
        </div>
        <div>
          <label htmlFor="livelloAttivita" className="block text-sm font-medium text-gray-300 mb-1">Come valuteresti il tuo livello di attività attuale? *</label>
          <select id="livelloAttivita" name="livelloAttivita" value={formData.livelloAttivita} onChange={handleChange} className={inputClass} required>
            <option value="" disabled>Si prega di scegliere</option>
            <option value="Sedentario">Sedentario (poco o nessun esercizio)</option>
            <option value="Leggermente attivo">Leggermente attivo (esercizio leggero 1-3 gg/settimana)</option>
            <option value="Moderatamente attivo">Moderatamente attivo (esercizio moderato 3-5 gg/settimana)</option>
            <option value="Molto attivo">Molto attivo (esercizio intenso 6-7 gg/settimana)</option>
          </select>
        </div>
        <div>
          <label htmlFor="limitazioni" className="block text-sm font-medium text-gray-300 mb-1">Hai limitazioni fisiche o disturbi che dovremmo conoscere?</label>
          <textarea id="limitazioni" name="limitazioni" value={formData.limitazioni} onChange={handleChange} rows={3} className={inputClass} placeholder="Es. Mal di schiena, problemi alle ginocchia..."></textarea>
        </div>
        <div className="flex justify-end pt-2">
          <button type="submit" className="w-full md:w-auto bg-momentum-green-500 text-white font-bold rounded-lg py-2 px-6 hover:bg-momentum-green-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-momentum-green-500 transition duration-200">
            Invia Informazioni
          </button>
        </div>
      </form>
    </div>
  );
};

export default AssessmentForm;
