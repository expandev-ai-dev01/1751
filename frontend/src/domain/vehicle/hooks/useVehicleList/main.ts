import { useQuery } from '@tanstack/react-query';
import { vehicleService } from '../../services/vehicleService';
import type { UseVehicleListOptions, UseVehicleListReturn } from './types';

/**
 * @hook useVehicleList
 * @summary Hook for fetching paginated vehicle list with filters
 * @domain vehicle
 * @type domain-hook
 * @category data
 */
export const useVehicleList = (options: UseVehicleListOptions = {}): UseVehicleListReturn => {
  const { filters = {}, enabled = true } = options;

  const queryKey = ['vehicles', filters];

  const { data, isLoading, error, refetch, isFetching } = useQuery({
    queryKey,
    queryFn: () => vehicleService.list(filters),
    enabled,
    staleTime: 2 * 60 * 1000,
    retry: 3,
  });

  return {
    data,
    isLoading,
    error: error as Error | null,
    refetch,
    isFetching,
  };
};
