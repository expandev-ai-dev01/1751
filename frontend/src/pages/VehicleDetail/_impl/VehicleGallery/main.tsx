import { useState } from 'react';
import type { VehicleGalleryProps } from './types';

/**
 * @component VehicleGallery
 * @summary Photo gallery with lightbox and zoom functionality
 * @domain vehicle
 * @type page-component
 * @category display
 */
export const VehicleGallery = (props: VehicleGalleryProps) => {
  const { fotos, titulo } = props;
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = 'https://via.placeholder.com/800x450?text=Imagem+Indisponível';
  };

  const handlePrevious = () => {
    setSelectedIndex((prev) => (prev === 0 ? fotos.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setSelectedIndex((prev) => (prev === fotos.length - 1 ? 0 : prev + 1));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsLightboxOpen(false);
    } else if (e.key === 'ArrowLeft') {
      handlePrevious();
    } else if (e.key === 'ArrowRight') {
      handleNext();
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Galeria de Fotos</h2>

      <div className="space-y-4">
        <div
          className="relative aspect-video w-full overflow-hidden rounded-lg bg-gray-100 cursor-pointer"
          onClick={() => setIsLightboxOpen(true)}
        >
          <img
            src={fotos[selectedIndex]?.url}
            alt={fotos[selectedIndex]?.legenda || `${titulo} - Foto ${selectedIndex + 1}`}
            className="w-full h-full object-cover"
            onError={handleImageError}
          />
          {fotos[selectedIndex]?.legenda && (
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2 text-sm">
              {fotos[selectedIndex].legenda}
            </div>
          )}
          <div className="absolute top-2 right-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-sm">
            {selectedIndex + 1} / {fotos.length}
          </div>
        </div>

        <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2">
          {fotos.map((foto, index) => (
            <button
              key={index}
              onClick={() => setSelectedIndex(index)}
              className={`aspect-video overflow-hidden rounded border-2 transition-all ${
                index === selectedIndex
                  ? 'border-blue-600'
                  : 'border-gray-200 hover:border-gray-400'
              }`}
            >
              <img
                src={foto.url}
                alt={foto.legenda || `Miniatura ${index + 1}`}
                className="w-full h-full object-cover"
                onError={handleImageError}
              />
            </button>
          ))}
        </div>
      </div>

      {isLightboxOpen && (
        <div
          className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center"
          onClick={() => setIsLightboxOpen(false)}
          onKeyDown={handleKeyDown}
          tabIndex={0}
        >
          <button
            onClick={() => setIsLightboxOpen(false)}
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
            aria-label="Fechar"
          >
            <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              handlePrevious();
            }}
            className="absolute left-4 text-white hover:text-gray-300 transition-colors"
            aria-label="Anterior"
          >
            <svg className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          <div className="max-w-6xl max-h-[90vh] px-16" onClick={(e) => e.stopPropagation()}>
            <img
              src={fotos[selectedIndex]?.url}
              alt={fotos[selectedIndex]?.legenda || `${titulo} - Foto ${selectedIndex + 1}`}
              className="max-w-full max-h-[90vh] object-contain"
              onError={handleImageError}
            />
            {fotos[selectedIndex]?.legenda && (
              <p className="text-white text-center mt-4">{fotos[selectedIndex].legenda}</p>
            )}
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              handleNext();
            }}
            className="absolute right-4 text-white hover:text-gray-300 transition-colors"
            aria-label="Próxima"
          >
            <svg className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-sm">
            {selectedIndex + 1} / {fotos.length}
          </div>
        </div>
      )}
    </div>
  );
};
