import { useState } from 'react';
import type { VehicleItemsProps } from './types';

/**
 * @component VehicleItems
 * @summary Standard items and optionals display
 * @domain vehicle
 * @type page-component
 * @category display
 */
export const VehicleItems = (props: VehicleItemsProps) => {
  const { itensSerie, opcionais } = props;
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({});

  const ITEMS_LIMIT = 10;

  const groupByCategory = (items: typeof itensSerie) => {
    const grouped: Record<string, typeof itensSerie> = {};
    items.forEach((item) => {
      if (!grouped[item.categoria]) {
        grouped[item.categoria] = [];
      }
      grouped[item.categoria].push(item);
    });
    return grouped;
  };

  const serieGrouped = groupByCategory(itensSerie);
  const opcionaisGrouped = groupByCategory(opcionais);

  const toggleCategory = (category: string) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  const renderItemGroup = (title: string, grouped: Record<string, typeof itensSerie>) => (
    <div className="mb-6">
      <h3 className="text-xl font-semibold text-gray-900 mb-4">{title}</h3>
      {Object.entries(grouped).map(([category, items]) => {
        const isExpanded = expandedCategories[category];
        const displayItems = isExpanded ? items : items.slice(0, ITEMS_LIMIT);
        const hasMore = items.length > ITEMS_LIMIT;

        return (
          <div key={category} className="mb-4">
            <h4 className="text-lg font-medium text-gray-800 mb-2">{category}</h4>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {displayItems.map((item, index) => (
                <li key={index} className="flex items-center text-gray-700">
                  <svg
                    className="h-5 w-5 text-green-600 mr-2 flex-shrink-0"
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
                  <span>{item.nome}</span>
                </li>
              ))}
            </ul>
            {hasMore && (
              <button
                onClick={() => toggleCategory(category)}
                className="mt-2 text-blue-600 hover:text-blue-700 text-sm font-medium"
              >
                {isExpanded ? 'Ver menos' : `Ver mais (${items.length - ITEMS_LIMIT} itens)`}
              </button>
            )}
          </div>
        );
      })}
    </div>
  );

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Itens e Opcionais</h2>
      {renderItemGroup('Itens de Série', serieGrouped)}
      {opcionais.length > 0 && renderItemGroup('Opcionais', opcionaisGrouped)}
    </div>
  );
};
