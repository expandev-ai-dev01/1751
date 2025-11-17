import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useVehicleList } from '@/domain/vehicle/hooks/useVehicleList';
import { VehicleCard } from '@/domain/vehicle/components/VehicleCard';
import { VehicleFilters } from '@/domain/vehicle/components/VehicleFilters';
import { VehicleSort } from '@/domain/vehicle/components/VehicleSort';
import { VehiclePagination } from '@/domain/vehicle/components/VehiclePagination';
import { LoadingSpinner } from '@/core/components/LoadingSpinner';
import { ErrorMessage } from '@/core/components/ErrorMessage';
import type { VehicleListParams } from '@/domain/vehicle/types';
import type { VehicleListPageProps } from './types';

/**
 * @page VehicleListPage
 * @summary Vehicle catalog listing page with filters and pagination
 * @domain vehicle
 * @type list-page
 * @category vehicle-management
 */
export const VehicleListPage = (props: VehicleListPageProps) => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const [filters, setFilters] = useState<VehicleListParams>(() => ({
    marcas: searchParams.get('marcas')?.split(',').filter(Boolean),
    modelos: searchParams.get('modelos')?.split(',').filter(Boolean),
    anoMin: searchParams.get('anoMin') ? parseInt(searchParams.get('anoMin')!) : undefined,
    anoMax: searchParams.get('anoMax') ? parseInt(searchParams.get('anoMax')!) : undefined,
    precoMin: searchParams.get('precoMin') ? parseFloat(searchParams.get('precoMin')!) : undefined,
    precoMax: searchParams.get('precoMax') ? parseFloat(searchParams.get('precoMax')!) : undefined,
    cambios: searchParams.get('cambios')?.split(',').filter(Boolean),
    ordenacao: searchParams.get('ordenacao') || 'relevancia',
    pagina: searchParams.get('pagina') ? parseInt(searchParams.get('pagina')!) : 1,
    itensPorPagina: searchParams.get('itensPorPagina')
      ? parseInt(searchParams.get('itensPorPagina')!)
      : 12,
  }));

  const [pendingFilters, setPendingFilters] = useState<VehicleListParams>(filters);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const { data, isLoading, error, refetch } = useVehicleList({ filters });

  useEffect(() => {
    const params = new URLSearchParams();

    if (filters.marcas?.length) params.set('marcas', filters.marcas.join(','));
    if (filters.modelos?.length) params.set('modelos', filters.modelos.join(','));
    if (filters.anoMin) params.set('anoMin', filters.anoMin.toString());
    if (filters.anoMax) params.set('anoMax', filters.anoMax.toString());
    if (filters.precoMin) params.set('precoMin', filters.precoMin.toString());
    if (filters.precoMax) params.set('precoMax', filters.precoMax.toString());
    if (filters.cambios?.length) params.set('cambios', filters.cambios.join(','));
    if (filters.ordenacao) params.set('ordenacao', filters.ordenacao);
    if (filters.pagina) params.set('pagina', filters.pagina.toString());
    if (filters.itensPorPagina) params.set('itensPorPagina', filters.itensPorPagina.toString());

    setSearchParams(params);
  }, [filters, setSearchParams]);

  useEffect(() => {
    if (data && data.totalPaginas > 0 && filters.pagina! > data.totalPaginas) {
      setFilters((prev) => ({ ...prev, pagina: data.totalPaginas }));
    }
  }, [data, filters.pagina]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [filters.pagina]);

  const handleApplyFilters = () => {
    setFilters({ ...pendingFilters, pagina: 1 });
    setShowMobileFilters(false);
  };

  const handleClearFilters = () => {
    const clearedFilters: VehicleListParams = {
      ordenacao: 'relevancia',
      pagina: 1,
      itensPorPagina: 12,
    };
    setPendingFilters(clearedFilters);
    setFilters(clearedFilters);
    setShowMobileFilters(false);
  };

  const handleSortChange = (ordenacao: string) => {
    setFilters((prev) => ({ ...prev, ordenacao }));
  };

  const handlePageChange = (pagina: number) => {
    setFilters((prev) => ({ ...prev, pagina }));
  };

  const handleItemsPerPageChange = (itensPorPagina: number) => {
    setFilters((prev) => ({ ...prev, itensPorPagina, pagina: 1 }));
  };

  const handleVehicleClick = (vehicleId: string) => {
    navigate(`/vehicles/${vehicleId}`);
  };

  if (error) {
    return (
      <ErrorMessage
        title="Erro ao carregar veículos"
        message="Não foi possível carregar a lista de veículos. Por favor, tente novamente."
        onRetry={() => refetch()}
      />
    );
  }

  const hasVehicles = data && data.total > 0;
  const hasResults = data && data.veiculos.length > 0;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Catálogo de Veículos</h1>

        <div className="lg:hidden mb-4">
          <button
            onClick={() => setShowMobileFilters(!showMobileFilters)}
            className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            {showMobileFilters ? 'Ocultar Filtros' : 'Filtrar'}
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          <aside
            className={`lg:w-64 flex-shrink-0 ${showMobileFilters ? 'block' : 'hidden lg:block'}`}
          >
            <VehicleFilters
              filters={pendingFilters}
              onFiltersChange={setPendingFilters}
              onApply={handleApplyFilters}
              onClear={handleClearFilters}
              isLoading={isLoading}
            />
          </aside>

          <div className="flex-1">
            {isLoading ? (
              <LoadingSpinner size="lg" />
            ) : !hasVehicles ? (
              <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
                <p className="text-gray-600">
                  Não há veículos disponíveis no catálogo no momento. Por favor, volte mais tarde ou
                  entre em contato conosco para mais informações.
                </p>
              </div>
            ) : !hasResults ? (
              <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
                <p className="text-gray-600 mb-4">
                  Não encontramos veículos com os filtros selecionados. Tente remover alguns filtros
                  ou alterar os critérios de busca para ampliar os resultados.
                </p>
                <button
                  onClick={handleClearFilters}
                  className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  Limpar Filtros
                </button>
              </div>
            ) : (
              <>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                  <p className="text-sm text-gray-600">
                    Exibindo {(data.pagina - 1) * data.itensPorPagina + 1}-
                    {Math.min(data.pagina * data.itensPorPagina, data.total)} de {data.total}{' '}
                    veículos
                  </p>
                  <VehicleSort
                    value={filters.ordenacao || 'relevancia'}
                    onChange={handleSortChange}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                  {data.veiculos.map((vehicle) => (
                    <VehicleCard
                      key={vehicle.id_veiculo}
                      vehicle={vehicle}
                      onClick={handleVehicleClick}
                    />
                  ))}
                </div>

                {data.totalPaginas > 1 && (
                  <VehiclePagination
                    currentPage={data.pagina}
                    totalPages={data.totalPaginas}
                    itemsPerPage={data.itensPorPagina}
                    onPageChange={handlePageChange}
                    onItemsPerPageChange={handleItemsPerPageChange}
                  />
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehicleListPage;
