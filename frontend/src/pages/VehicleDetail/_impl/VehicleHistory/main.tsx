import type { VehicleHistoryProps } from './types';

/**
 * @component VehicleHistory
 * @summary Vehicle history display
 * @domain vehicle
 * @type page-component
 * @category display
 */
export const VehicleHistory = (props: VehicleHistoryProps) => {
  const { historico } = props;

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Histórico do Veículo</h2>

      <div className="space-y-4">
        <div className="flex justify-between py-2 border-b border-gray-100">
          <span className="text-gray-600 font-medium">Procedência:</span>
          <span className="text-gray-900">{historico.procedencia}</span>
        </div>

        <div className="flex justify-between py-2 border-b border-gray-100">
          <span className="text-gray-600 font-medium">Proprietários:</span>
          <span className="text-gray-900">{historico.proprietarios}</span>
        </div>

        {historico.garantia && (
          <div className="flex justify-between py-2 border-b border-gray-100">
            <span className="text-gray-600 font-medium">Garantia:</span>
            <span className="text-gray-900">{historico.garantia}</span>
          </div>
        )}

        {historico.revisoes && historico.revisoes.length > 0 && (
          <div className="py-2">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Revisões</h3>
            <div className="space-y-2">
              {historico.revisoes.map((revisao, index) => (
                <div key={index} className="bg-gray-50 p-3 rounded">
                  <p className="text-sm text-gray-700">
                    <span className="font-medium">Data:</span> {revisao.data}
                  </p>
                  <p className="text-sm text-gray-700">
                    <span className="font-medium">Quilometragem:</span> {revisao.quilometragem} km
                  </p>
                  <p className="text-sm text-gray-700">
                    <span className="font-medium">Local:</span> {revisao.local}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {historico.sinistros && historico.sinistros.length > 0 ? (
          <div className="py-2">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Sinistros</h3>
            <div className="space-y-2">
              {historico.sinistros.map((sinistro, index) => (
                <div key={index} className="bg-red-50 p-3 rounded">
                  <p className="text-sm text-gray-700">
                    <span className="font-medium">Data:</span> {sinistro.data}
                  </p>
                  <p className="text-sm text-gray-700">
                    <span className="font-medium">Tipo:</span> {sinistro.tipo}
                  </p>
                  <p className="text-sm text-gray-700">
                    <span className="font-medium">Descrição:</span> {sinistro.descricao}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="bg-green-50 p-4 rounded">
            <p className="text-green-800 font-medium flex items-center">
              <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              Sem registro de sinistros
            </p>
          </div>
        )}

        {historico.laudoTecnico && (
          <div className="py-2">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Laudo Técnico</h3>
            <div className="bg-blue-50 p-3 rounded">
              <p className="text-sm text-gray-700">
                <span className="font-medium">Data da Inspeção:</span>{' '}
                {historico.laudoTecnico.dataInspecao}
              </p>
              <p className="text-sm text-gray-700">
                <span className="font-medium">Resultado:</span>{' '}
                {historico.laudoTecnico.resultadoGeral}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
