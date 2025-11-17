import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { contactCreate } from '@/services/contact';
import { successResponse, createError } from '@/middleware';
import { HTTP_STATUS } from '@/constants';

/**
 * @api {post} /api/v1/external/contact Create Contact
 * @apiName CreateContact
 * @apiGroup Contact
 * @apiVersion 1.0.0
 *
 * @apiDescription Creates a new contact form submission for a vehicle
 *
 * @apiParam {String} nomeCompleto Full name (minimum 3 characters)
 * @apiParam {String} email Valid email address
 * @apiParam {String} telefone Brazilian phone number
 * @apiParam {String} preferenciaContato Contact preference (Telefone, E-mail, WhatsApp)
 * @apiParam {String} [melhorHorario] Best time to contact (Manhã, Tarde, Noite, Qualquer horário)
 * @apiParam {String} idVeiculo Vehicle identifier
 * @apiParam {String} modeloVeiculo Vehicle model
 * @apiParam {String} assunto Subject (Informações gerais, Agendamento de test drive, Negociação de preço, Financiamento, Outro)
 * @apiParam {String} mensagem Message (minimum 10 characters)
 * @apiParam {Boolean} [financiamento=false] Interest in financing
 * @apiParam {Boolean} termosPrivacidade Privacy terms acceptance
 * @apiParam {Boolean} [receberNovidades=false] Opt-in for newsletter
 * @apiParam {String} captchaToken reCAPTCHA token
 *
 * @apiSuccess {String} protocolo Contact protocol number
 * @apiSuccess {String} mensagem Confirmation message
 *
 * @apiError {String} ValidationError Invalid parameters
 * @apiError {String} ServerError Internal server error
 */
const bodySchema = z.object({
  nomeCompleto: z
    .string()
    .min(3)
    .max(100)
    .refine((val) => val.trim().split(/\s+/).length >= 2, {
      message: 'nomeCompletoDeveConterNomeESobrenome',
    }),
  email: z.string().email().max(100),
  telefone: z
    .string()
    .min(10)
    .max(20)
    .regex(/^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/, 'telefoneInvalido'),
  preferenciaContato: z.enum(['Telefone', 'E-mail', 'WhatsApp']),
  melhorHorario: z.enum(['Manhã', 'Tarde', 'Noite', 'Qualquer horário']).optional(),
  idVeiculo: z.string().min(1),
  modeloVeiculo: z.string().min(1),
  assunto: z.enum([
    'Informações gerais',
    'Agendamento de test drive',
    'Negociação de preço',
    'Financiamento',
    'Outro',
  ]),
  mensagem: z.string().min(10).max(1000),
  financiamento: z.boolean().optional(),
  termosPrivacidade: z.boolean().refine((val) => val === true, {
    message: 'termosPrivacidadeDevemSerAceitos',
  }),
  receberNovidades: z.boolean().optional(),
  captchaToken: z.string().min(1),
});

export async function postHandler(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    /**
     * @validation Validate request body
     * @throw {ValidationError}
     */
    const validatedBody = bodySchema.parse(req.body);

    /**
     * @validation Verify vehicle exists
     * @throw {ValidationError}
     */
    const vehicleExists = await verifyVehicleExists(validatedBody.idVeiculo);
    if (!vehicleExists) {
      throw createError('veiculoNaoEncontrado', HTTP_STATUS.BAD_REQUEST, 'VEHICLE_NOT_FOUND');
    }

    /**
     * @validation Verify reCAPTCHA token
     * @throw {ValidationError}
     */
    const captchaValid = await verifyCaptcha(validatedBody.captchaToken);
    if (!captchaValid) {
      throw createError('captchaInvalido', HTTP_STATUS.BAD_REQUEST, 'INVALID_CAPTCHA');
    }

    /**
     * @rule {fn-contact-create} Create contact submission
     */
    const ipAddress = req.ip || req.socket.remoteAddress || 'unknown';

    const data = await contactCreate({
      ...validatedBody,
      melhorHorario: validatedBody.melhorHorario || 'Qualquer horário',
      financiamento: validatedBody.financiamento || false,
      receberNovidades: validatedBody.receberNovidades || false,
      ipUsuario: ipAddress,
    });

    res.status(HTTP_STATUS.CREATED).json(
      successResponse({
        protocolo: data.protocolo,
        mensagem: 'contatoEnviadoComSucesso',
      })
    );
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return next(
        createError('validationFailed', HTTP_STATUS.BAD_REQUEST, 'VALIDATION_ERROR', error.errors)
      );
    }
    next(error);
  }
}

/**
 * @summary
 * Verifies if a vehicle exists in the catalog
 *
 * @function verifyVehicleExists
 * @module contact
 *
 * @param {string} idVeiculo - Vehicle identifier
 *
 * @returns {Promise<boolean>} True if vehicle exists
 */
async function verifyVehicleExists(idVeiculo: string): Promise<boolean> {
  const { vehicleGetDetail } = await import('@/services/vehicle');
  const vehicle = await vehicleGetDetail(idVeiculo);
  return vehicle !== null;
}

/**
 * @summary
 * Verifies reCAPTCHA token (mock implementation)
 *
 * @function verifyCaptcha
 * @module contact
 *
 * @param {string} token - reCAPTCHA token
 *
 * @returns {Promise<boolean>} True if token is valid
 */
async function verifyCaptcha(token: string): Promise<boolean> {
  /**
   * @remarks Mock implementation - in production, verify with Google reCAPTCHA API
   */
  return token.length > 0;
}
