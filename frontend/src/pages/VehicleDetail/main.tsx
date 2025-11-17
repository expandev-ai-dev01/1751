import { useParams, useNavigate } from 'react-router-dom';
import { useVehicleDetail } from '@/domain/vehicle/hooks/useVehicleDetail';
import { LoadingSpinner } from '@/core/components/LoadingSpinner';
import { ErrorMessage } from '@/core/components/ErrorMessage';
import { VehicleDetailHeader } from './_impl/VehicleDetailHeader';
import { VehicleGallery } from './_impl/VehicleGallery';
import { VehicleSpecifications } from './_impl/VehicleSpecifications';
import { VehicleItems } from './_impl/VehicleItems';
import { VehicleHistory } from './_impl/VehicleHistory';
import { VehicleSaleConditions } from './_impl/VehicleSaleConditions';
import { VehicleShare } from './_impl/VehicleShare';
import { VehicleSimilar } from './_impl/VehicleSimilar';
import { VehicleContactSection } from './_impl/VehicleContactSection';
import type { VehicleDetailPageProps } from './types';

/**
 * @page VehicleDetailPage
 * @summary Vehicle detail page displaying complete vehicle information and contact form
 * @domain vehicle
 * @type detail-page
 * @category vehicle-management
 *
 * @routing
 * - Path: /vehicles/:id
 * - Params: { id: string }
 *
 * @layout
 * - Layout: RootLayout
 * - Sections: Header, Gallery, Specifications, Items, History, Sale Conditions, Contact Form, Share, Similar
 *
 * @data
 * - Sources: Vehicle API
 * - Loading: Skeleton loading states
 * - Caching: 5 minutes stale time
 */
export const VehicleDetailPage = (props: VehicleDetailPageProps) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const {
    data: vehicle,
    isLoading,
    error,
  } = useVehicleDetail({
    vehicleId: id!,
    enabled: !!id,
  });

  if (error) {
    return (
      <ErrorMessage
        title="Erro ao carregar detalhes do veículo"
        message="Não foi possível carregar as informações do veículo. Por favor, tente novamente."
        onRetry={() => window.location.reload()}
        onBack={() => navigate('/')}
      />
    );
  }

  if (isLoading) {
    return <LoadingSpinner size="lg" />;
  }

  if (!vehicle) {
    return (
      <ErrorMessage
        title="Veículo não encontrado"
        message="O veículo solicitado não foi encontrado em nosso catálogo."
        onBack={() => navigate('/')}
      />
    );
  }

  const handleScrollToContact = () => {
    const contactSection = document.getElementById('contact-form');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <button
          onClick={() => navigate('/')}
          className="mb-6 flex items-center text-blue-600 hover:text-blue-700 transition-colors"
        >
          <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Voltar para o catálogo
        </button>

        <div className="space-y-8">
          <VehicleDetailHeader vehicle={vehicle} />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <VehicleGallery fotos={vehicle.fotos} titulo={vehicle.tituloAnuncio} />
              <VehicleSpecifications especificacoes={vehicle.especificacoes} />
              <VehicleItems itensSerie={vehicle.itensSerie} opcionais={vehicle.opcionais} />
              <VehicleHistory historico={vehicle.historico} />
              <VehicleContactSection
                vehicleId={vehicle.id_veiculo}
                vehicleModel={vehicle.tituloAnuncio}
              />
            </div>

            <div className="space-y-8">
              <div className="sticky top-8 space-y-8">
                <VehicleSaleConditions condicoes={vehicle.condicoesVenda} preco={vehicle.preco} />
                <button
                  onClick={handleScrollToContact}
                  className="w-full px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors font-medium text-lg"
                >
                  Tenho Interesse
                </button>
                <VehicleShare url={vehicle.urlCompartilhamento} titulo={vehicle.tituloAnuncio} />
              </div>
            </div>
          </div>

          {vehicle.veiculosSimilares && vehicle.veiculosSimilares.length > 0 && (
            <VehicleSimilar veiculos={vehicle.veiculosSimilares} />
          )}
        </div>
      </div>
    </div>
  );
};

export default VehicleDetailPage;
