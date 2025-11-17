/**
 * @interface ContactEntity
 * @description Represents a contact form submission in the system
 *
 * @property {string} id - Unique contact identifier
 * @property {string} protocolo - Contact protocol number
 * @property {string} nomeCompleto - Full name of the person
 * @property {string} email - Email address
 * @property {string} telefone - Phone number
 * @property {string} preferenciaContato - Contact preference
 * @property {string} melhorHorario - Best time to contact
 * @property {string} idVeiculo - Vehicle identifier
 * @property {string} modeloVeiculo - Vehicle model
 * @property {string} assunto - Subject of inquiry
 * @property {string} mensagem - Message content
 * @property {boolean} financiamento - Interest in financing
 * @property {boolean} termosPrivacidade - Privacy terms acceptance
 * @property {boolean} receberNovidades - Newsletter opt-in
 * @property {string} dataEnvio - Submission date and time
 * @property {string} ipUsuario - User IP address
 * @property {string} status - Contact status
 */
export interface ContactEntity {
  id: string;
  protocolo: string;
  nomeCompleto: string;
  email: string;
  telefone: string;
  preferenciaContato: string;
  melhorHorario: string;
  idVeiculo: string;
  modeloVeiculo: string;
  assunto: string;
  mensagem: string;
  financiamento: boolean;
  termosPrivacidade: boolean;
  receberNovidades: boolean;
  dataEnvio: string;
  ipUsuario: string;
  status: ContactStatus;
}

/**
 * @interface ContactCreateRequest
 * @description Request parameters for creating a contact submission
 *
 * @property {string} nomeCompleto - Full name
 * @property {string} email - Email address
 * @property {string} telefone - Phone number
 * @property {string} preferenciaContato - Contact preference
 * @property {string} melhorHorario - Best time to contact
 * @property {string} idVeiculo - Vehicle identifier
 * @property {string} modeloVeiculo - Vehicle model
 * @property {string} assunto - Subject
 * @property {string} mensagem - Message
 * @property {boolean} financiamento - Interest in financing
 * @property {boolean} termosPrivacidade - Privacy terms acceptance
 * @property {boolean} receberNovidades - Newsletter opt-in
 * @property {string} ipUsuario - User IP address
 */
export interface ContactCreateRequest {
  nomeCompleto: string;
  email: string;
  telefone: string;
  preferenciaContato: string;
  melhorHorario: string;
  idVeiculo: string;
  modeloVeiculo: string;
  assunto: string;
  mensagem: string;
  financiamento: boolean;
  termosPrivacidade: boolean;
  receberNovidades: boolean;
  ipUsuario: string;
}

/**
 * @interface ContactCreateResponse
 * @description Response structure for contact creation
 *
 * @property {string} id - Contact identifier
 * @property {string} protocolo - Protocol number
 */
export interface ContactCreateResponse {
  id: string;
  protocolo: string;
}

/**
 * @enum ContactStatus
 * @description Contact status values
 */
export enum ContactStatus {
  Novo = 'Novo',
  EmAtendimento = 'Em atendimento',
  Concluido = 'Concluído',
  Cancelado = 'Cancelado',
}

/**
 * @enum ContactPreference
 * @description Contact preference options
 */
export enum ContactPreference {
  Telefone = 'Telefone',
  Email = 'E-mail',
  WhatsApp = 'WhatsApp',
}

/**
 * @enum ContactSubject
 * @description Contact subject options
 */
export enum ContactSubject {
  InformacoesGerais = 'Informações gerais',
  AgendamentoTestDrive = 'Agendamento de test drive',
  NegociacaoPreco = 'Negociação de preço',
  Financiamento = 'Financiamento',
  Outro = 'Outro',
}

/**
 * @enum BestTime
 * @description Best time to contact options
 */
export enum BestTime {
  Manha = 'Manhã',
  Tarde = 'Tarde',
  Noite = 'Noite',
  QualquerHorario = 'Qualquer horário',
}
