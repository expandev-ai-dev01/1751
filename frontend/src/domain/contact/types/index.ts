export interface ContactFormData {
  nomeCompleto: string;
  email: string;
  telefone: string;
  preferenciaContato: 'Telefone' | 'E-mail' | 'WhatsApp';
  melhorHorario?: 'Manhã' | 'Tarde' | 'Noite' | 'Qualquer horário';
  idVeiculo: string;
  modeloVeiculo: string;
  assunto:
    | 'Informações gerais'
    | 'Agendamento de test drive'
    | 'Negociação de preço'
    | 'Financiamento'
    | 'Outro';
  mensagem: string;
  financiamento?: boolean;
  termosPrivacidade: boolean;
  receberNovidades?: boolean;
  captchaToken: string;
}

export interface ContactSubmitResponse {
  protocolo: string;
  mensagem: string;
}

export const PREFERENCIA_CONTATO_OPTIONS = [
  { value: 'Telefone', label: 'Telefone' },
  { value: 'E-mail', label: 'E-mail' },
  { value: 'WhatsApp', label: 'WhatsApp' },
] as const;

export const MELHOR_HORARIO_OPTIONS = [
  { value: 'Manhã', label: 'Manhã (8h - 12h)' },
  { value: 'Tarde', label: 'Tarde (12h - 18h)' },
  { value: 'Noite', label: 'Noite (18h - 22h)' },
  { value: 'Qualquer horário', label: 'Qualquer horário' },
] as const;

export const ASSUNTO_OPTIONS = [
  { value: 'Informações gerais', label: 'Informações gerais' },
  { value: 'Agendamento de test drive', label: 'Agendamento de test drive' },
  { value: 'Negociação de preço', label: 'Negociação de preço' },
  { value: 'Financiamento', label: 'Financiamento' },
  { value: 'Outro', label: 'Outro' },
] as const;
