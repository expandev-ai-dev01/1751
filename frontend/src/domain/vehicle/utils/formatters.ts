/**
 * @utility formatPrice
 * @summary Formats price to Brazilian currency format
 * @domain vehicle
 * @type utility-function
 * @category formatting
 */
export function formatPrice(price: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(price);
}

/**
 * @utility formatKilometragem
 * @summary Formats mileage with thousand separator
 * @domain vehicle
 * @type utility-function
 * @category formatting
 */
export function formatKilometragem(km: number): string {
  return new Intl.NumberFormat('pt-BR').format(km) + ' km';
}

/**
 * @utility formatYear
 * @summary Formats year display
 * @domain vehicle
 * @type utility-function
 * @category formatting
 */
export function formatYear(year: number): string {
  return `Ano: ${year}`;
}
