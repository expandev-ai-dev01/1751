import { useEffect, useState } from 'react';
import { useFilterOptions } from '../../hooks/useFilterOptions';
import { useModelosByMarcas } from '../../hooks/useModelosByMarcas';
import { CAMBIO_OPTIONS } from '../../types';
import type { VehicleFiltersProps } from './types';

/**
 * @component VehicleFilters
 * @summary Filter panel for vehicle listing
 * @domain vehicle
 * @type domain-component
 * @category form
 */
export const VehicleFilters = (props: VehicleFiltersProps) => {
  const { filters, onFiltersChange, onApply, onClear, isLoading = false } = props;

  const { data: filterOptions, isLoading: isLoadingOptions } = useFilterOptions();
  const { data: availableModelos } = useModelosByMarcas({
    marcas: filters.marcas || [],
    enabled: (filters.marcas?.length || 0) > 0,
  });

  const [localFilters, setLocalFilters] = useState(filters);

  useEffect(() => {
    setLocalFilters(filters);
  }, [filters]);

  const handleMarcaChange = (marca: string, checked: boolean) => {
    const newMarcas = checked
      ? [...(localFilters.marcas || []), marca]
      : (localFilters.marcas || []).filter((m) => m !== marca);

    const newFilters = { ...localFilters, marcas: newMarcas };

    if (!checked && localFilters.modelos) {
      const removedMarcaModelos = filterOptions?.modelos.filter((m) =>
        availableModelos?.includes(m)
      );
      const newModelos = localFilters.modelos.filter(
        (modelo) => !removedMarcaModelos?.includes(modelo)
      );
      newFilters.modelos = newModelos.length > 0 ? newModelos : undefined;
    }

    setLocalFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const handleModeloChange = (modelo: string, checked: boolean) => {
    const newModelos = checked
      ? [...(localFilters.modelos || []), modelo]
      : (localFilters.modelos || []).filter((m) => m !== modelo);

    const newFilters = {
      ...localFilters,
      modelos: newModelos.length > 0 ? newModelos : undefined,
    };
    setLocalFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const handleCambioChange = (cambio: string, checked: boolean) => {
    const newCambios = checked
      ? [...(localFilters.cambios || []), cambio]
      : (localFilters.cambios || []).filter((c) => c !== cambio);

    const newFilters = {
      ...localFilters,
      cambios: newCambios.length > 0 ? newCambios : undefined,
    };
    setLocalFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const handleYearChange = (field: 'anoMin' | 'anoMax', value: string) => {
    const newFilters = {
      ...localFilters,
      [field]: value ? parseInt(value) : undefined,
    };
    setLocalFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const handlePriceChange = (field: 'precoMin' | 'precoMax', value: string) => {
    const newFilters = {
      ...localFilters,
      [field]: value ? parseFloat(value) : undefined,
    };
    setLocalFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const displayModelos =
    (filters.marcas?.length || 0) > 0 ? availableModelos : filterOptions?.modelos;

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-3">Filtros</h3>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Marca</label>
        {isLoadingOptions ? (
          <div className="text-sm text-gray-500">Carregando...</div>
        ) : (
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {filterOptions?.marcas.map((marca) => (
              <label key={marca} className="flex items-center">
                <input
                  type="checkbox"
                  checked={localFilters.marcas?.includes(marca) || false}
                  onChange={(e) => handleMarcaChange(marca, e.target.checked)}
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-700">{marca}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Modelo</label>
        {isLoadingOptions ? (
          <div className="text-sm text-gray-500">Carregando...</div>
        ) : (
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {displayModelos?.map((modelo) => (
              <label key={modelo} className="flex items-center">
                <input
                  type="checkbox"
                  checked={localFilters.modelos?.includes(modelo) || false}
                  onChange={(e) => handleModeloChange(modelo, e.target.checked)}
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-700">{modelo}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Ano</label>
        <div className="grid grid-cols-2 gap-2">
          <select
            value={localFilters.anoMin || ''}
            onChange={(e) => handleYearChange('anoMin', e.target.value)}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
          >
            <option value="">Mínimo</option>
            {filterOptions?.anos.map((ano) => (
              <option key={ano} value={ano}>
                {ano}
              </option>
            ))}
          </select>
          <select
            value={localFilters.anoMax || ''}
            onChange={(e) => handleYearChange('anoMax', e.target.value)}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
          >
            <option value="">Máximo</option>
            {filterOptions?.anos.map((ano) => (
              <option key={ano} value={ano}>
                {ano}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Preço</label>
        <div className="space-y-2">
          <input
            type="number"
            placeholder="Preço mínimo"
            value={localFilters.precoMin || ''}
            onChange={(e) => handlePriceChange('precoMin', e.target.value)}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
          />
          <input
            type="number"
            placeholder="Preço máximo"
            value={localFilters.precoMax || ''}
            onChange={(e) => handlePriceChange('precoMax', e.target.value)}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Câmbio</label>
        <div className="space-y-2">
          {CAMBIO_OPTIONS.map((option) => (
            <label key={option.value} className="flex items-center">
              <input
                type="checkbox"
                checked={localFilters.cambios?.includes(option.value) || false}
                onChange={(e) => handleCambioChange(option.value, e.target.checked)}
                className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="ml-2 text-sm text-gray-700">{option.label}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="flex gap-2 pt-4 border-t border-gray-200">
        <button
          onClick={onApply}
          disabled={isLoading}
          className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium"
        >
          Aplicar Filtros
        </button>
        <button
          onClick={onClear}
          disabled={isLoading}
          className="flex-1 px-4 py-2 bg-gray-200 text-gray-900 rounded-md hover:bg-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium"
        >
          Limpar
        </button>
      </div>
    </div>
  );
};
