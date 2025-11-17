import { formatKilometragem } from '@/domain/vehicle/utils/formatters';
import type { VehicleSpecificationsProps } from './types';

/**
 * @component VehicleSpecifications
 * @summary Technical specifications display
 * @domain vehicle
 * @type page-component
 * @category display
 */
export const VehicleSpecifications = (props: VehicleSpecificationsProps) => {
  const { especificacoes } = props;

  const specs = [
    { label: 'Marca', value: especificacoes.marca },
    { label: 'Modelo', value: especificacoes.modelo },
    { label: 'Ano Fabricação', value: especificacoes.anoFabricacao },
    { label: 'Ano Modelo', value: especificacoes.anoModelo },
    { label: 'Quilometragem', value: formatKilometragem(especificacoes.quilometragem) },
    { label: 'Combustível', value: especificacoes.combustivel },
    { label: 'Câmbio', value: especificacoes.cambio },
    { label: 'Potência', value: especificacoes.potencia },
    { label: 'Cor', value: especificacoes.cor },
    { label: 'Portas', value: especificacoes.portas },
    { label: 'Carroceria', value: especificacoes.carroceria },
    { label: 'Motor', value: especificacoes.motor },
    { label: 'Final da Placa', value: especificacoes.finalPlaca },
  ];

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Especificações Técnicas</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {specs.map((spec, index) => (
          <div key={index} className="flex justify-between py-2 border-b border-gray-100">
            <span className="text-gray-600 font-medium">{spec.label}:</span>
            <span className="text-gray-900">{spec.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
