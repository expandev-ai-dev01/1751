/**
 * @utility validateNomeCompleto
 * @summary Validates full name has at least first and last name
 * @domain contact
 * @type utility-function
 * @category validation
 */
export function validateNomeCompleto(nome: string): boolean {
  const trimmed = nome.trim();
  const parts = trimmed.split(/\s+/);
  return parts.length >= 2 && trimmed.length >= 3;
}

/**
 * @utility validateEmail
 * @summary Validates email format
 * @domain contact
 * @type utility-function
 * @category validation
 */
export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && email.length <= 100;
}

/**
 * @utility validateTelefone
 * @summary Validates Brazilian phone number format
 * @domain contact
 * @type utility-function
 * @category validation
 */
export function validateTelefone(telefone: string): boolean {
  const cleaned = telefone.replace(/\D/g, '');
  return cleaned.length >= 10 && cleaned.length <= 11;
}

/**
 * @utility formatTelefone
 * @summary Formats phone number to Brazilian format
 * @domain contact
 * @type utility-function
 * @category formatting
 */
export function formatTelefone(value: string): string {
  const cleaned = value.replace(/\D/g, '');

  if (cleaned.length <= 2) {
    return cleaned;
  }

  if (cleaned.length <= 6) {
    return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2)}`;
  }

  if (cleaned.length <= 10) {
    return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 6)}-${cleaned.slice(6)}`;
  }

  return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 7)}-${cleaned.slice(7, 11)}`;
}

/**
 * @utility validateMensagem
 * @summary Validates message length
 * @domain contact
 * @type utility-function
 * @category validation
 */
export function validateMensagem(mensagem: string): boolean {
  const trimmed = mensagem.trim();
  return trimmed.length >= 10 && trimmed.length <= 1000;
}
