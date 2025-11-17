import { useState } from 'react';
import { formatPrice } from '@/domain/vehicle/utils/formatters';
import type { VehicleSaleConditionsProps } from './types';

/**
 * @component VehicleSaleConditions
 * @summary Sale conditions and financing calculator
 * @domain vehicle
 * @type page-component
 * @category display
 */
export const VehicleSaleConditions = (props: VehicleSaleConditionsProps) => {
  const { condicoes, preco } = props;
  const [entrada, setEntrada] = useState(condicoes.condicoesFinanciamento?.entradaMinima || 0);
  const [prazo, setPrazo] = useState(48);

  const calcularParcela = () => {
    if (!condicoes.condicoesFinanciamento) return 0;
    const valorFinanciado = preco - entrada;
    const taxaMensal = condicoes.condicoesFinanciamento.taxaJuros / 100 / 12;
    const parcela =
      (valorFinanciado * taxaMensal * Math.pow(1 + taxaMensal, prazo)) /
      (Math.pow(1 + taxaMensal, prazo) - 1);
    return parcela;
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'regular':
        return 'bg-green-100 text-green-800';
      case 'pendente':
        return 'bg-yellow-100 text-yellow-800';
      case 'em andamento':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Condições de Venda</h2>

        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Formas de Pagamento</h3>
            <ul className="space-y-1">
              {condicoes.formasPagamento.map((forma, index) => (
                <li key={index} className="flex items-center text-gray-700">
                  <svg
                    className="h-5 w-5 text-blue-600 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  {forma}
                </li>
              ))}
            </ul>
          </div>

          {condicoes.aceitaTroca && (
            <div className="bg-blue-50 p-3 rounded">
              <p className="text-blue-800 font-medium flex items-center">
                <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Aceita troca
              </p>
            </div>
          )}

          {condicoes.observacoesVenda && (
            <div className="bg-gray-50 p-3 rounded">
              <p className="text-sm text-gray-700">{condicoes.observacoesVenda}</p>
            </div>
          )}
        </div>
      </div>

      {condicoes.condicoesFinanciamento && (
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Calculadora de Financiamento</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Entrada: {formatPrice(entrada)}
              </label>
              <input
                type="range"
                min={condicoes.condicoesFinanciamento.entradaMinima}
                max={preco * 0.5}
                step={1000}
                value={entrada}
                onChange={(e) => setEntrada(parseFloat(e.target.value))}
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Prazo: {prazo} meses
              </label>
              <input
                type="range"
                min={12}
                max={condicoes.condicoesFinanciamento.prazoMaximo}
                step={12}
                value={prazo}
                onChange={(e) => setPrazo(parseInt(e.target.value))}
                className="w-full"
              />
            </div>

            <div className="bg-blue-50 p-4 rounded">
              <p className="text-sm text-gray-700 mb-1">Valor da parcela estimada:</p>
              <p className="text-2xl font-bold text-blue-600">{formatPrice(calcularParcela())}</p>
              <p className="text-xs text-gray-600 mt-2">
                Taxa de juros: {condicoes.condicoesFinanciamento.taxaJuros}% ao ano
              </p>
            </div>
          </div>
        </div>
      )}

      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Situação Documental</h3>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-gray-700">Status:</span>
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                condicoes.situacaoDocumental.status
              )}`}
            >
              {condicoes.situacaoDocumental.status}
            </span>
          </div>
          {condicoes.situacaoDocumental.pendencias &&
            condicoes.situacaoDocumental.pendencias.length > 0 && (
              <div className="bg-yellow-50 p-3 rounded">
                <p className="text-sm font-medium text-yellow-800 mb-1">Pendências:</p>
                <ul className="text-sm text-yellow-700 list-disc list-inside">
                  {condicoes.situacaoDocumental.pendencias.map((pendencia, index) => (
                    <li key={index}>{pendencia}</li>
                  ))}
                </ul>
              </div>
            )}
          {condicoes.situacaoDocumental.observacoes && (
            <p className="text-sm text-gray-600">{condicoes.situacaoDocumental.observacoes}</p>
          )}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Documentação Necessária</h3>
        <ul className="space-y-2">
          {condicoes.documentacaoNecessaria.map((doc, index) => (
            <li key={index} className="text-sm">
              <p className="font-medium text-gray-900">{doc.nome}</p>
              {doc.observacoes && <p className="text-gray-600">{doc.observacoes}</p>}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
