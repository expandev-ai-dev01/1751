import { useQuery } from '@tanstack/react-query';
import { vehicleService } from '../../services/vehicleService';
import type { UseModelosByMarcasOptions, UseModelosByMarcasReturn } from './types';

/**
 * @hook useModelosByMarcas
 * @summary Hook for fetching models filtered by brands
 * @domain vehicle
 * @type domain-hook
 * @category data
 */
export const useModelosByMarcas = (
  options: UseModelosByMarcasOptions
): UseModelosByMarcasReturn => {
  const { marcas, enabled = true } = options;

  const { data, isLoading, error } = useQuery({
    queryKey: ['modelos-by-marcas', marcas],
    queryFn: () => vehicleService.getModelosByMarcas(marcas),
    enabled: enabled && marcas.length > 0,
    staleTime: 5 * 60 * 1000,
  });

  return {
    data,
    isLoading,
    error: error as Error | null,
  };
};
