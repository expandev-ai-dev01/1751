import type { ContactFormData, ContactSubmitResponse } from '../../types';

export interface UseContactSubmitOptions {
  onSuccess?: (data: ContactSubmitResponse) => void;
  onError?: (error: Error) => void;
}

export interface UseContactSubmitReturn {
  submit: (data: ContactFormData) => Promise<ContactSubmitResponse>;
  isSubmitting: boolean;
  error: Error | null;
}
