import { useMutation } from '@tanstack/react-query';
import { contactService } from '../../services/contactService';
import type { UseContactSubmitOptions, UseContactSubmitReturn } from './types';

/**
 * @hook useContactSubmit
 * @summary Hook for submitting contact form
 * @domain contact
 * @type domain-hook
 * @category data
 */
export const useContactSubmit = (options: UseContactSubmitOptions = {}): UseContactSubmitReturn => {
  const { onSuccess, onError } = options;

  const { mutateAsync, isPending, error } = useMutation({
    mutationFn: contactService.submit,
    onSuccess: (data) => {
      onSuccess?.(data);
    },
    onError: (err: Error) => {
      onError?.(err);
    },
  });

  return {
    submit: mutateAsync,
    isSubmitting: isPending,
    error: error as Error | null,
  };
};
