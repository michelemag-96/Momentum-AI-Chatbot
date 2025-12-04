
export interface Message {
  id: string;
  role: 'user' | 'model';
  text: string;
}

export interface AssessmentData {
  sesso: 'Uomo' | 'Donna' | 'Altro' | '';
  eta: string;
  peso: string;
  obiettivo: string;
  livelloAttivita: 'Sedentario' | 'Leggermente attivo' | 'Moderatamente attivo' | 'Molto attivo' | '';
  limitazioni: string;
  recapito: string;
}
