import { useQuery } from '@tanstack/react-query';
import { vehicleService } from '../../services/vehicleService';
import type { UseFilterOptionsReturn } from './types';

/**
 * @hook useFilterOptions
 * @summary Hook for fetching available filter options
 * @domain vehicle
 * @type domain-hook
 * @category data
 */
export const useFilterOptions = (): UseFilterOptionsReturn => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['filter-options'],
    queryFn: () => vehicleService.getFilterOptions(),
    staleTime: 10 * 60 * 1000,
  });

  return {
    data,
    isLoading,
    error: error as Error | null,
  };
};
