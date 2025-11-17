import { publicClient } from '@/core/lib/api';
import type {
  Vehicle,
  VehicleDetail,
  VehicleListParams,
  VehicleListResponse,
  FilterOptions,
  ModelosByMarcasResponse,
} from '../types';

/**
 * @service vehicleService
 * @summary Vehicle management service for public endpoints
 * @domain vehicle
 * @type rest-service
 * @apiContext external
 */
export const vehicleService = {
  /**
   * @endpoint GET /api/v1/external/vehicle
   * @summary Fetches paginated list of vehicles with filters
   */
  async list(params: VehicleListParams): Promise<VehicleListResponse> {
    const queryParams = new URLSearchParams();

    if (params.marcas?.length) {
      queryParams.append('marcas', params.marcas.join(','));
    }
    if (params.modelos?.length) {
      queryParams.append('modelos', params.modelos.join(','));
    }
    if (params.anoMin !== undefined) {
      queryParams.append('anoMin', params.anoMin.toString());
    }
    if (params.anoMax !== undefined) {
      queryParams.append('anoMax', params.anoMax.toString());
    }
    if (params.precoMin !== undefined) {
      queryParams.append('precoMin', params.precoMin.toString());
    }
    if (params.precoMax !== undefined) {
      queryParams.append('precoMax', params.precoMax.toString());
    }
    if (params.cambios?.length) {
      queryParams.append('cambios', params.cambios.join(','));
    }
    if (params.ordenacao) {
      queryParams.append('ordenacao', params.ordenacao);
    }
    if (params.pagina !== undefined) {
      queryParams.append('pagina', params.pagina.toString());
    }
    if (params.itensPorPagina !== undefined) {
      queryParams.append('itensPorPagina', params.itensPorPagina.toString());
    }

    const response = await publicClient.get(`/vehicle?${queryParams.toString()}`);
    return response.data.data;
  },

  /**
   * @endpoint GET /api/v1/external/vehicle/:id
   * @summary Fetches detailed information about a specific vehicle
   */
  async getDetail(id: string): Promise<VehicleDetail> {
    const response = await publicClient.get(`/vehicle/${id}`);
    return response.data.data;
  },

  /**
   * @endpoint GET /api/v1/external/vehicle/filter-options
   * @summary Fetches available filter options
   */
  async getFilterOptions(): Promise<FilterOptions> {
    const response = await publicClient.get('/vehicle/filter-options');
    return response.data.data;
  },

  /**
   * @endpoint GET /api/v1/external/vehicle/modelos-by-marcas
   * @summary Fetches models filtered by selected brands
   */
  async getModelosByMarcas(marcas: string[]): Promise<string[]> {
    const queryParams = new URLSearchParams();
    if (marcas.length) {
      queryParams.append('marcas', marcas.join(','));
    }

    const response = await publicClient.get<{ data: ModelosByMarcasResponse }>(
      `/vehicle/modelos-by-marcas?${queryParams.toString()}`
    );
    return response.data.data.modelos;
  },
};
