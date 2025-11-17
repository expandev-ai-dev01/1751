import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useContactSubmit } from '../../hooks/useContactSubmit';
import { formatTelefone } from '../../utils/validators';
import { PREFERENCIA_CONTATO_OPTIONS, MELHOR_HORARIO_OPTIONS, ASSUNTO_OPTIONS } from '../../types';
import type { ContactFormProps } from './types';
import type { ContactFormData } from '../../types';

const contactSchema = z.object({
  nomeCompleto: z
    .string()
    .min(3, 'O nome deve conter pelo menos 3 caracteres')
    .max(100, 'O nome deve conter no máximo 100 caracteres')
    .refine(
      (val) => val.trim().split(/\s+/).length >= 2,
      'Por favor, informe seu nome completo (nome e sobrenome)'
    ),
  email: z
    .string()
    .email('Por favor, informe um endereço de e-mail válido no formato usuario@dominio.com')
    .max(100, 'O e-mail deve conter no máximo 100 caracteres'),
  telefone: z
    .string()
    .min(10, 'O telefone deve conter pelo menos 10 dígitos incluindo DDD')
    .regex(
      /^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/,
      'Por favor, informe um número de telefone válido com DDD'
    ),
  preferenciaContato: z.enum(['Telefone', 'E-mail', 'WhatsApp'], {
    message: 'Por favor, selecione sua preferência de contato',
  }),
  melhorHorario: z.enum(['Manhã', 'Tarde', 'Noite', 'Qualquer horário']).optional(),
  assunto: z.enum(
    [
      'Informações gerais',
      'Agendamento de test drive',
      'Negociação de preço',
      'Financiamento',
      'Outro',
    ],
    { message: 'Por favor, selecione o assunto da sua consulta' }
  ),
  mensagem: z
    .string()
    .min(10, 'Por favor, forneça mais detalhes em sua mensagem (mínimo 10 caracteres)')
    .max(1000, 'Sua mensagem excedeu o limite de 1000 caracteres'),
  financiamento: z.boolean().optional(),
  termosPrivacidade: z.boolean().refine((val) => val === true, {
    message: 'É necessário concordar com os termos de privacidade para prosseguir',
  }),
  receberNovidades: z.boolean().optional(),
});

type ContactFormValues = z.infer<typeof contactSchema>;

/**
 * @component ContactForm
 * @summary Contact form for vehicle inquiries
 * @domain contact
 * @type domain-component
 * @category form
 */
export const ContactForm = (props: ContactFormProps) => {
  const { vehicleId, vehicleModel, onSuccess, onCancel } = props;

  const [showSuccess, setShowSuccess] = useState(false);
  const [protocolo, setProtocolo] = useState('');
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [captchaToken, setCaptchaToken] = useState('mock-captcha-token');

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      melhorHorario: 'Qualquer horário',
      financiamento: false,
      receberNovidades: false,
      termosPrivacidade: false,
    },
  });

  const { submit, isSubmitting, error } = useContactSubmit({
    onSuccess: (data) => {
      setProtocolo(data.protocolo);
      setShowSuccess(true);
      onSuccess?.(data.protocolo);
    },
  });

  const assuntoValue = watch('assunto');
  const mensagemValue = watch('mensagem');
  const telefoneValue = watch('telefone');

  useEffect(() => {
    if (assuntoValue === 'Financiamento') {
      setValue('financiamento', true);
    }
  }, [assuntoValue, setValue]);

  const handleTelefoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatTelefone(e.target.value);
    setValue('telefone', formatted);
  };

  const onSubmit = async (data: ContactFormValues) => {
    const submitData: ContactFormData = {
      ...data,
      idVeiculo: vehicleId,
      modeloVeiculo: vehicleModel,
      captchaToken,
      melhorHorario: data.melhorHorario || 'Qualquer horário',
      financiamento: data.financiamento || false,
      receberNovidades: data.receberNovidades || false,
    };

    try {
      await submit(submitData);
    } catch (err: unknown) {
      console.error('Erro ao enviar formulário:', err);
    }
  };

  if (showSuccess) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
        <div className="mb-6">
          <svg
            className="h-16 w-16 text-green-600 mx-auto"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Mensagem enviada com sucesso!</h2>
        <p className="text-gray-600 mb-4">
          Seu contato foi registrado com o protocolo: <strong>{protocolo}</strong>
        </p>
        <p className="text-gray-600 mb-6">
          Entraremos em contato em até 24 horas úteis através do meio de comunicação selecionado.
        </p>
        <p className="text-sm text-gray-500 mb-6">
          Você receberá um e-mail de confirmação com os detalhes da sua solicitação.
        </p>
        <button
          onClick={() => window.location.reload()}
          className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Voltar ao catálogo
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Formulário de Contato</h2>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md">
          <p className="text-red-800 text-sm">
            Ocorreu um erro ao enviar o formulário. Por favor, tente novamente.
          </p>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">Dados Pessoais</h3>

          <div>
            <label htmlFor="nomeCompleto" className="block text-sm font-medium text-gray-700 mb-1">
              Nome Completo <span className="text-red-600">*</span>
            </label>
            <input
              {...register('nomeCompleto')}
              type="text"
              id="nomeCompleto"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="João da Silva"
            />
            {errors.nomeCompleto && (
              <p className="mt-1 text-sm text-red-600">{errors.nomeCompleto.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              E-mail <span className="text-red-600">*</span>
            </label>
            <input
              {...register('email')}
              type="email"
              id="email"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="joao@exemplo.com"
            />
            {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
          </div>

          <div>
            <label htmlFor="telefone" className="block text-sm font-medium text-gray-700 mb-1">
              Telefone <span className="text-red-600">*</span>
            </label>
            <input
              {...register('telefone')}
              type="tel"
              id="telefone"
              value={telefoneValue || ''}
              onChange={handleTelefoneChange}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="(11) 98765-4321"
            />
            {errors.telefone && (
              <p className="mt-1 text-sm text-red-600">{errors.telefone.message}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="preferenciaContato"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Preferência de Contato <span className="text-red-600">*</span>
            </label>
            <select
              {...register('preferenciaContato')}
              id="preferenciaContato"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="">Selecione...</option>
              {PREFERENCIA_CONTATO_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            {errors.preferenciaContato && (
              <p className="mt-1 text-sm text-red-600">{errors.preferenciaContato.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="melhorHorario" className="block text-sm font-medium text-gray-700 mb-1">
              Melhor Horário para Contato
            </label>
            <select
              {...register('melhorHorario')}
              id="melhorHorario"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              {MELHOR_HORARIO_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="space-y-4 pt-6 border-t border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Informações sobre o Veículo</h3>

          <div className="bg-gray-50 p-4 rounded-md">
            <p className="text-sm text-gray-700">
              <span className="font-medium">Veículo de interesse:</span> {vehicleModel}
            </p>
          </div>

          <div>
            <label htmlFor="assunto" className="block text-sm font-medium text-gray-700 mb-1">
              Assunto <span className="text-red-600">*</span>
            </label>
            <select
              {...register('assunto')}
              id="assunto"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="">Selecione...</option>
              {ASSUNTO_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            {errors.assunto && (
              <p className="mt-1 text-sm text-red-600">{errors.assunto.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="mensagem" className="block text-sm font-medium text-gray-700 mb-1">
              Mensagem <span className="text-red-600">*</span>
            </label>
            <textarea
              {...register('mensagem')}
              id="mensagem"
              rows={5}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="Descreva sua dúvida ou interesse no veículo..."
            />
            <div className="flex justify-between items-center mt-1">
              <div>
                {errors.mensagem && (
                  <p className="text-sm text-red-600">{errors.mensagem.message}</p>
                )}
              </div>
              <p className="text-sm text-gray-500">
                {mensagemValue?.length || 0} / 1000 caracteres
              </p>
            </div>
          </div>

          <div>
            <label className="flex items-center">
              <input
                {...register('financiamento')}
                type="checkbox"
                className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="ml-2 text-sm text-gray-700">
                Tenho interesse em opções de financiamento
              </span>
            </label>
          </div>
        </div>

        <div className="space-y-4 pt-6 border-t border-gray-200">
          <div>
            <label className="flex items-start">
              <input
                {...register('termosPrivacidade')}
                type="checkbox"
                className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 mt-1"
              />
              <span className="ml-2 text-sm text-gray-700">
                Li e concordo com os{' '}
                <button
                  type="button"
                  onClick={() => setShowTermsModal(true)}
                  className="text-blue-600 hover:text-blue-700 underline"
                >
                  termos de privacidade
                </button>{' '}
                <span className="text-red-600">*</span>
              </span>
            </label>
            {errors.termosPrivacidade && (
              <p className="mt-1 text-sm text-red-600">{errors.termosPrivacidade.message}</p>
            )}
          </div>

          <div>
            <label className="flex items-center">
              <input
                {...register('receberNovidades')}
                type="checkbox"
                className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="ml-2 text-sm text-gray-700">
                Desejo receber novidades e promoções por e-mail
              </span>
            </label>
          </div>
        </div>

        <div className="flex gap-4 pt-6">
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
          >
            {isSubmitting ? 'Enviando...' : 'Enviar Mensagem'}
          </button>
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              disabled={isSubmitting}
              className="px-6 py-3 bg-gray-200 text-gray-900 rounded-md hover:bg-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
            >
              Cancelar
            </button>
          )}
        </div>
      </form>

      {showTermsModal && (
        <div
          className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4"
          onClick={() => setShowTermsModal(false)}
        >
          <div
            className="bg-white rounded-lg max-w-2xl max-h-[80vh] overflow-y-auto p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-900">Termos de Privacidade</h3>
              <button
                onClick={() => setShowTermsModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="prose prose-sm max-w-none">
              <h4>1. Coleta de Dados</h4>
              <p>
                Coletamos os seguintes dados pessoais: nome completo, e-mail, telefone, preferências
                de contato e mensagens relacionadas ao veículo de interesse.
              </p>

              <h4>2. Uso dos Dados</h4>
              <p>
                Seus dados serão utilizados exclusivamente para entrar em contato sobre o veículo de
                interesse, responder suas dúvidas e fornecer informações solicitadas.
              </p>

              <h4>3. Armazenamento</h4>
              <p>
                Os dados serão armazenados de forma segura por até 2 anos após o último contato, ou
                até que você solicite a exclusão.
              </p>

              <h4>4. Seus Direitos (LGPD)</h4>
              <p>Você tem direito a:</p>
              <ul>
                <li>Acessar seus dados pessoais</li>
                <li>Corrigir dados incompletos ou desatualizados</li>
                <li>Solicitar a exclusão de seus dados</li>
                <li>Revogar o consentimento a qualquer momento</li>
              </ul>

              <h4>5. Contato do DPO</h4>
              <p>
                Para exercer seus direitos ou esclarecer dúvidas sobre privacidade, entre em contato
                com nosso Encarregado de Proteção de Dados (DPO) através do e-mail: dpo@exemplo.com
              </p>

              <h4>6. Compartilhamento</h4>
              <p>
                Seus dados não serão compartilhados com terceiros sem seu consentimento expresso,
                exceto quando exigido por lei.
              </p>
            </div>
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setShowTermsModal(false)}
                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
