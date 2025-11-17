import type { FilterOptions } from '../../types';

export interface UseFilterOptionsReturn {
  data: FilterOptions | undefined;
  isLoading: boolean;
  error: Error | null;
}
