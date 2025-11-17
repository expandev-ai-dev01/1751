import { ORDENACAO_OPTIONS } from '../../types';
import type { VehicleSortProps } from './types';

/**
 * @component VehicleSort
 * @summary Sort selector for vehicle listing
 * @domain vehicle
 * @type domain-component
 * @category form
 */
export const VehicleSort = (props: VehicleSortProps) => {
  const { value, onChange } = props;

  return (
    <div className="flex items-center gap-2">
      <label htmlFor="sort" className="text-sm font-medium text-gray-700">
        Ordenar por:
      </label>
      <select
        id="sort"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="block rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
      >
        {ORDENACAO_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};
