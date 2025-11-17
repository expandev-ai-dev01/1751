import { formatPrice, formatKilometragem, formatYear } from '../../utils/formatters';
import type { VehicleCardProps } from './types';

/**
 * @component VehicleCard
 * @summary Card component displaying vehicle basic information
 * @domain vehicle
 * @type domain-component
 * @category display
 */
export const VehicleCard = (props: VehicleCardProps) => {
  const { vehicle, onClick } = props;

  const handleClick = () => {
    onClick?.(vehicle.id_veiculo);
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = 'https://via.placeholder.com/300x169?text=Sem+Imagem';
  };

  return (
    <div
      onClick={handleClick}
      className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow cursor-pointer overflow-hidden"
    >
      <div className="aspect-video w-full overflow-hidden bg-gray-100">
        <img
          src={vehicle.imagem_principal}
          alt={`${vehicle.marca} ${vehicle.modelo}`}
          className="w-full h-full object-cover"
          loading="lazy"
          onError={handleImageError}
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-1 truncate">
          {vehicle.marca} {vehicle.modelo}
        </h3>
        <p className="text-sm text-gray-600 mb-2">{formatYear(vehicle.ano)}</p>
        <p className="text-xl font-bold text-blue-600 mb-3">{formatPrice(vehicle.preco)}</p>
        {(vehicle.quilometragem !== undefined || vehicle.cambio) && (
          <div className="flex gap-3 text-sm text-gray-600">
            {vehicle.quilometragem !== undefined && (
              <span>{formatKilometragem(vehicle.quilometragem)}</span>
            )}
            {vehicle.cambio && <span>{vehicle.cambio}</span>}
          </div>
        )}
      </div>
    </div>
  );
};
