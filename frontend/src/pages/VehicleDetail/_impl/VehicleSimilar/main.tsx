import { useNavigate } from 'react-router-dom';
import { VehicleCard } from '@/domain/vehicle/components/VehicleCard';
import type { VehicleSimilarProps } from './types';

/**
 * @component VehicleSimilar
 * @summary Similar vehicles carousel
 * @domain vehicle
 * @type page-component
 * @category display
 */
export const VehicleSimilar = (props: VehicleSimilarProps) => {
  const { veiculos } = props;
  const navigate = useNavigate();

  const handleVehicleClick = (vehicleId: string) => {
    navigate(`/vehicles/${vehicleId}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Veículos Similares</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {veiculos.slice(0, 6).map((veiculo) => (
          <VehicleCard key={veiculo.id_veiculo} vehicle={veiculo} onClick={handleVehicleClick} />
        ))}
      </div>
    </div>
  );
};
