import {
  ContactEntity,
  ContactCreateRequest,
  ContactCreateResponse,
  ContactStatus,
} from './contactTypes';

/**
 * @summary
 * In-memory storage for contact submissions
 */
const contacts: ContactEntity[] = [];
let contactCounter = 1;

/**
 * @summary
 * Creates a new contact form submission
 *
 * @function contactCreate
 * @module contact
 *
 * @param {ContactCreateRequest} params - Contact submission parameters
 *
 * @returns {Promise<ContactCreateResponse>} Created contact with protocol number
 *
 * @example
 * const result = await contactCreate({
 *   nomeCompleto: 'João Silva',
 *   email: 'joao@example.com',
 *   telefone: '(11) 98765-4321',
 *   preferenciaContato: 'WhatsApp',
 *   melhorHorario: 'Tarde',
 *   idVeiculo: '1',
 *   modeloVeiculo: 'Honda Civic 2023',
 *   assunto: 'Informações gerais',
 *   mensagem: 'Gostaria de mais informações sobre este veículo',
 *   financiamento: false,
 *   termosPrivacidade: true,
 *   receberNovidades: false,
 *   ipUsuario: '192.168.1.1'
 * });
 */
export async function contactCreate(params: ContactCreateRequest): Promise<ContactCreateResponse> {
  /**
   * @rule {fn-contact-protocol-generation} Generate unique protocol number
   */
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const sequential = String(contactCounter).padStart(5, '0');
  const protocolo = `${year}${month}${day}${sequential}`;

  /**
   * @rule {fn-contact-id-generation} Generate unique contact identifier
   */
  const id = `contact_${Date.now()}_${contactCounter}`;

  /**
   * @rule {fn-contact-entity-creation} Create contact entity
   */
  const contact: ContactEntity = {
    id,
    protocolo,
    nomeCompleto: params.nomeCompleto,
    email: params.email,
    telefone: params.telefone,
    preferenciaContato: params.preferenciaContato,
    melhorHorario: params.melhorHorario,
    idVeiculo: params.idVeiculo,
    modeloVeiculo: params.modeloVeiculo,
    assunto: params.assunto,
    mensagem: params.mensagem,
    financiamento: params.financiamento,
    termosPrivacidade: params.termosPrivacidade,
    receberNovidades: params.receberNovidades,
    dataEnvio: now.toISOString(),
    ipUsuario: params.ipUsuario,
    status: ContactStatus.Novo,
  };

  /**
   * @rule {fn-contact-storage} Store contact in memory
   */
  contacts.push(contact);
  contactCounter++;

  /**
   * @rule {fn-contact-email-notification} Send email notifications (mock)
   */
  await sendConfirmationEmail(contact);
  await sendNotificationEmail(contact);

  return {
    id: contact.id,
    protocolo: contact.protocolo,
  };
}

/**
 * @summary
 * Sends confirmation email to user (mock implementation)
 *
 * @function sendConfirmationEmail
 * @module contact
 *
 * @param {ContactEntity} contact - Contact entity
 *
 * @returns {Promise<void>}
 */
async function sendConfirmationEmail(contact: ContactEntity): Promise<void> {
  /**
   * @remarks Mock implementation - in production, integrate with email service
   */
  console.log('Sending confirmation email to:', contact.email);
  console.log('Protocol:', contact.protocolo);
  console.log('Vehicle:', contact.modeloVeiculo);
  console.log('Message summary:', contact.mensagem.substring(0, 100));
}

/**
 * @summary
 * Sends notification email to sales team (mock implementation)
 *
 * @function sendNotificationEmail
 * @module contact
 *
 * @param {ContactEntity} contact - Contact entity
 *
 * @returns {Promise<void>}
 */
async function sendNotificationEmail(contact: ContactEntity): Promise<void> {
  /**
   * @remarks Mock implementation - in production, integrate with email service
   */
  console.log('Sending notification to sales team');
  console.log('New contact from:', contact.nomeCompleto);
  console.log('Vehicle:', contact.modeloVeiculo);
  console.log('Subject:', contact.assunto);
  console.log('Protocol:', contact.protocolo);
}

/**
 * @summary
 * Retrieves all contacts (for future admin functionality)
 *
 * @function contactList
 * @module contact
 *
 * @returns {Promise<ContactEntity[]>} List of all contacts
 */
export async function contactList(): Promise<ContactEntity[]> {
  return [...contacts];
}

/**
 * @summary
 * Retrieves a specific contact by ID (for future admin functionality)
 *
 * @function contactGet
 * @module contact
 *
 * @param {string} id - Contact identifier
 *
 * @returns {Promise<ContactEntity | null>} Contact entity or null if not found
 */
export async function contactGet(id: string): Promise<ContactEntity | null> {
  const contact = contacts.find((c) => c.id === id);
  return contact || null;
}
