import {
  VehicleEntity,
  VehicleListRequest,
  VehicleListResponse,
  FilterOptionsResponse,
  TransmissionType,
  SortCriteria,
  VehicleDetailResponse,
  VehicleStatus,
  FuelType,
  BodyType,
  ItemCategory,
  VehicleOrigin,
} from './vehicleTypes';

/**
 * @summary
 * In-memory storage for vehicle data
 */
const vehicles: VehicleEntity[] = [
  {
    id: '1',
    modelo: 'Civic',
    marca: 'Honda',
    ano: 2023,
    preco: 145000,
    imagemPrincipal: 'https://via.placeholder.com/300x169?text=Honda+Civic+2023',
    quilometragem: 5000,
    cambio: TransmissionType.Automatico,
  },
  {
    id: '2',
    modelo: 'Corolla',
    marca: 'Toyota',
    ano: 2022,
    preco: 135000,
    imagemPrincipal: 'https://via.placeholder.com/300x169?text=Toyota+Corolla+2022',
    quilometragem: 15000,
    cambio: TransmissionType.CVT,
  },
  {
    id: '3',
    modelo: 'Onix',
    marca: 'Chevrolet',
    ano: 2023,
    preco: 85000,
    imagemPrincipal: 'https://via.placeholder.com/300x169?text=Chevrolet+Onix+2023',
    quilometragem: 2000,
    cambio: TransmissionType.Manual,
  },
  {
    id: '4',
    modelo: 'HB20',
    marca: 'Hyundai',
    ano: 2021,
    preco: 72000,
    imagemPrincipal: 'https://via.placeholder.com/300x169?text=Hyundai+HB20+2021',
    quilometragem: 35000,
    cambio: TransmissionType.Manual,
  },
  {
    id: '5',
    modelo: 'Compass',
    marca: 'Jeep',
    ano: 2023,
    preco: 185000,
    imagemPrincipal: 'https://via.placeholder.com/300x169?text=Jeep+Compass+2023',
    quilometragem: 8000,
    cambio: TransmissionType.Automatico,
  },
  {
    id: '6',
    modelo: 'Gol',
    marca: 'Volkswagen',
    ano: 2020,
    preco: 58000,
    imagemPrincipal: 'https://via.placeholder.com/300x169?text=VW+Gol+2020',
    quilometragem: 45000,
    cambio: TransmissionType.Manual,
  },
  {
    id: '7',
    modelo: 'T-Cross',
    marca: 'Volkswagen',
    ano: 2023,
    preco: 125000,
    imagemPrincipal: 'https://via.placeholder.com/300x169?text=VW+T-Cross+2023',
    quilometragem: 3000,
    cambio: TransmissionType.Automatico,
  },
  {
    id: '8',
    modelo: 'Kicks',
    marca: 'Nissan',
    ano: 2022,
    preco: 98000,
    imagemPrincipal: 'https://via.placeholder.com/300x169?text=Nissan+Kicks+2022',
    quilometragem: 18000,
    cambio: TransmissionType.CVT,
  },
  {
    id: '9',
    modelo: 'Argo',
    marca: 'Fiat',
    ano: 2023,
    preco: 78000,
    imagemPrincipal: 'https://via.placeholder.com/300x169?text=Fiat+Argo+2023',
    quilometragem: 1500,
    cambio: TransmissionType.Manual,
  },
  {
    id: '10',
    modelo: 'Creta',
    marca: 'Hyundai',
    ano: 2023,
    preco: 115000,
    imagemPrincipal: 'https://via.placeholder.com/300x169?text=Hyundai+Creta+2023',
    quilometragem: 6000,
    cambio: TransmissionType.Automatico,
  },
  {
    id: '11',
    modelo: 'Fit',
    marca: 'Honda',
    ano: 2021,
    preco: 82000,
    imagemPrincipal: 'https://via.placeholder.com/300x169?text=Honda+Fit+2021',
    quilometragem: 28000,
    cambio: TransmissionType.CVT,
  },
  {
    id: '12',
    modelo: 'Renegade',
    marca: 'Jeep',
    ano: 2022,
    preco: 135000,
    imagemPrincipal: 'https://via.placeholder.com/300x169?text=Jeep+Renegade+2022',
    quilometragem: 12000,
    cambio: TransmissionType.Automatico,
  },
  {
    id: '13',
    modelo: 'Polo',
    marca: 'Volkswagen',
    ano: 2023,
    preco: 95000,
    imagemPrincipal: 'https://via.placeholder.com/300x169?text=VW+Polo+2023',
    quilometragem: 4000,
    cambio: TransmissionType.Automatico,
  },
  {
    id: '14',
    modelo: 'Tracker',
    marca: 'Chevrolet',
    ano: 2023,
    preco: 128000,
    imagemPrincipal: 'https://via.placeholder.com/300x169?text=Chevrolet+Tracker+2023',
    quilometragem: 7000,
    cambio: TransmissionType.Automatico,
  },
  {
    id: '15',
    modelo: 'Yaris',
    marca: 'Toyota',
    ano: 2022,
    preco: 92000,
    imagemPrincipal: 'https://via.placeholder.com/300x169?text=Toyota+Yaris+2022',
    quilometragem: 22000,
    cambio: TransmissionType.CVT,
  },
];

/**
 * @summary
 * Retrieves a list of vehicles with filtering, sorting, and pagination
 *
 * @function vehicleList
 * @module vehicle
 *
 * @param {VehicleListRequest} params - Filtering, sorting, and pagination parameters
 *
 * @returns {Promise<VehicleListResponse>} Paginated list of vehicles with metadata
 *
 * @example
 * const result = await vehicleList({
 *   marcas: ['Honda', 'Toyota'],
 *   anoMin: 2020,
 *   ordenacao: 'Preço (menor para maior)',
 *   pagina: 1,
 *   itensPorPagina: 12
 * });
 */
export async function vehicleList(params: VehicleListRequest): Promise<VehicleListResponse> {
  const {
    marcas,
    modelos,
    anoMin,
    anoMax,
    precoMin,
    precoMax,
    cambios,
    ordenacao = SortCriteria.Relevancia,
    pagina = 1,
    itensPorPagina = 12,
  } = params;

  /**
   * @rule {fn-vehicle-filtering} Apply all active filters to vehicle list
   */
  let filteredVehicles = [...vehicles];

  if (marcas && marcas.length > 0) {
    filteredVehicles = filteredVehicles.filter((v) => marcas.includes(v.marca));
  }

  if (modelos && modelos.length > 0) {
    filteredVehicles = filteredVehicles.filter((v) => modelos.includes(v.modelo));
  }

  if (anoMin !== undefined) {
    filteredVehicles = filteredVehicles.filter((v) => v.ano >= anoMin);
  }

  if (anoMax !== undefined) {
    filteredVehicles = filteredVehicles.filter((v) => v.ano <= anoMax);
  }

  if (precoMin !== undefined) {
    filteredVehicles = filteredVehicles.filter((v) => v.preco >= precoMin);
  }

  if (precoMax !== undefined) {
    filteredVehicles = filteredVehicles.filter((v) => v.preco <= precoMax);
  }

  if (cambios && cambios.length > 0) {
    filteredVehicles = filteredVehicles.filter((v) => v.cambio && cambios.includes(v.cambio));
  }

  /**
   * @rule {fn-vehicle-sorting} Apply selected sorting criteria
   */
  switch (ordenacao) {
    case SortCriteria.PrecoMenor:
      filteredVehicles.sort((a, b) => a.preco - b.preco);
      break;
    case SortCriteria.PrecoMaior:
      filteredVehicles.sort((a, b) => b.preco - a.preco);
      break;
    case SortCriteria.AnoRecente:
      filteredVehicles.sort((a, b) => b.ano - a.ano);
      break;
    case SortCriteria.AnoAntigo:
      filteredVehicles.sort((a, b) => a.ano - b.ano);
      break;
    case SortCriteria.ModeloAZ:
      filteredVehicles.sort((a, b) => a.modelo.localeCompare(b.modelo));
      break;
    case SortCriteria.ModeloZA:
      filteredVehicles.sort((a, b) => b.modelo.localeCompare(a.modelo));
      break;
    case SortCriteria.Relevancia:
    default:
      break;
  }

  /**
   * @rule {fn-vehicle-pagination} Apply pagination to filtered and sorted results
   */
  const total = filteredVehicles.length;
  const totalPaginas = Math.ceil(total / itensPorPagina);
  const startIndex = (pagina - 1) * itensPorPagina;
  const endIndex = startIndex + itensPorPagina;
  const veiculos = filteredVehicles.slice(startIndex, endIndex);

  return {
    veiculos,
    total,
    pagina,
    itensPorPagina,
    totalPaginas,
  };
}

/**
 * @summary
 * Retrieves available filter options based on current vehicle catalog
 *
 * @function getFilterOptions
 * @module vehicle
 *
 * @returns {Promise<FilterOptionsResponse>} Available filter options
 *
 * @example
 * const options = await getFilterOptions();
 */
export async function getFilterOptions(): Promise<FilterOptionsResponse> {
  const marcas = Array.from(new Set(vehicles.map((v) => v.marca))).sort();
  const modelos = Array.from(new Set(vehicles.map((v) => v.modelo))).sort();
  const anos = Array.from(new Set(vehicles.map((v) => v.ano))).sort((a, b) => b - a);
  const cambios = Array.from(
    new Set(vehicles.map((v) => v.cambio).filter((c): c is string => c !== null))
  ).sort();

  return {
    marcas,
    modelos,
    anos,
    cambios,
  };
}

/**
 * @summary
 * Retrieves models filtered by selected brands
 *
 * @function getModelosByMarcas
 * @module vehicle
 *
 * @param {string[]} marcas - Selected brands
 *
 * @returns {Promise<string[]>} Available models for selected brands
 *
 * @example
 * const modelos = await getModelosByMarcas(['Honda', 'Toyota']);
 */
export async function getModelosByMarcas(marcas: string[]): Promise<string[]> {
  if (!marcas || marcas.length === 0) {
    return Array.from(new Set(vehicles.map((v) => v.modelo))).sort();
  }

  const filteredModelos = vehicles.filter((v) => marcas.includes(v.marca)).map((v) => v.modelo);

  return Array.from(new Set(filteredModelos)).sort();
}

/**
 * @summary
 * Retrieves complete details for a specific vehicle
 *
 * @function vehicleGetDetail
 * @module vehicle
 *
 * @param {string} id - Vehicle identifier
 *
 * @returns {Promise<VehicleDetailResponse | null>} Complete vehicle details or null if not found
 *
 * @example
 * const detail = await vehicleGetDetail('1');
 */
export async function vehicleGetDetail(id: string): Promise<VehicleDetailResponse | null> {
  /**
   * @rule {fn-vehicle-detail-retrieval} Find vehicle by ID
   */
  const vehicle = vehicles.find((v) => v.id === id);

  if (!vehicle) {
    return null;
  }

  /**
   * @rule {fn-vehicle-detail-construction} Build complete vehicle detail response
   */
  const detail: VehicleDetailResponse = {
    id: vehicle.id,
    tituloAnuncio: `${vehicle.marca} ${vehicle.modelo} ${vehicle.ano}`,
    preco: vehicle.preco,
    statusVeiculo: VehicleStatus.Disponivel,
    fotos: [
      {
        url: vehicle.imagemPrincipal,
        legenda: 'Vista frontal',
        principal: true,
      },
      {
        url: `https://via.placeholder.com/800x600?text=${vehicle.marca}+${vehicle.modelo}+Lateral`,
        legenda: 'Vista lateral',
        principal: false,
      },
      {
        url: `https://via.placeholder.com/800x600?text=${vehicle.marca}+${vehicle.modelo}+Traseira`,
        legenda: 'Vista traseira',
        principal: false,
      },
      {
        url: `https://via.placeholder.com/800x600?text=${vehicle.marca}+${vehicle.modelo}+Interior`,
        legenda: 'Interior',
        principal: false,
      },
      {
        url: `https://via.placeholder.com/800x600?text=${vehicle.marca}+${vehicle.modelo}+Painel`,
        legenda: 'Painel',
        principal: false,
      },
    ],
    especificacoes: {
      marca: vehicle.marca,
      modelo: vehicle.modelo,
      anoFabricacao: vehicle.ano,
      anoModelo: vehicle.ano,
      quilometragem: vehicle.quilometragem || 0,
      combustivel: FuelType.Flex,
      cambio: vehicle.cambio || TransmissionType.Manual,
      potencia: '120 cv',
      cor: 'Prata',
      portas: 4,
      carroceria: BodyType.Sedan,
      motor: '1.8',
      finalPlaca: 5,
    },
    itensSerie: [
      { nome: 'Ar-condicionado', categoria: ItemCategory.Conforto },
      { nome: 'Direção elétrica', categoria: ItemCategory.Conforto },
      { nome: 'Vidros elétricos', categoria: ItemCategory.Conforto },
      { nome: 'Travas elétricas', categoria: ItemCategory.Conforto },
      { nome: 'Airbag duplo', categoria: ItemCategory.Seguranca },
      { nome: 'Freios ABS', categoria: ItemCategory.Seguranca },
      { nome: 'Controle de estabilidade', categoria: ItemCategory.Seguranca },
      { nome: 'Rádio com Bluetooth', categoria: ItemCategory.Tecnologia },
    ],
    opcionais: [
      { nome: 'Teto solar', categoria: ItemCategory.Conforto },
      { nome: 'Bancos de couro', categoria: ItemCategory.Conforto },
      { nome: 'Sensor de estacionamento', categoria: ItemCategory.Tecnologia },
      { nome: 'Câmera de ré', categoria: ItemCategory.Tecnologia },
      { nome: 'Rodas de liga leve', categoria: ItemCategory.Estetica },
    ],
    historico: {
      procedencia: VehicleOrigin.Concessionaria,
      proprietarios: 1,
      garantia: 'Até 12/2025',
      revisoes: [
        {
          data: '2023-06-15',
          quilometragem: 5000,
          local: 'Concessionária Autorizada',
        },
      ],
      sinistros: [],
      laudoTecnico: {
        dataInspecao: '2023-12-01',
        resultadoGeral: 'Aprovado - Veículo em excelente estado',
      },
    },
    condicoesVenda: {
      formasPagamento: ['À vista', 'Financiamento', 'Consórcio'],
      condicoesFinanciamento: {
        entradaMinima: 20000,
        taxaJuros: 1.99,
        prazoMaximo: 60,
      },
      aceitaTroca: true,
      observacoesVenda: 'Aceita veículo como parte do pagamento',
      documentacaoNecessaria: [
        { nome: 'RG e CPF', observacoes: 'Original e cópia' },
        { nome: 'Comprovante de residência', observacoes: 'Atualizado (últimos 3 meses)' },
        { nome: 'Comprovante de renda', observacoes: 'Para financiamento' },
      ],
      situacaoDocumental: {
        status: 'regular',
        pendencias: [],
        observacoes: 'Documentação completa e regularizada',
      },
    },
    urlCompartilhamento: `https://catalogo-carros.com/veiculo/${vehicle.marca.toLowerCase()}-${vehicle.modelo.toLowerCase()}-${
      vehicle.ano
    }-${vehicle.id}`,
    veiculosSimilares: await getSimilarVehicles(vehicle),
  };

  return detail;
}

/**
 * @summary
 * Retrieves similar vehicles based on brand, model, price range, and category
 *
 * @function getSimilarVehicles
 * @module vehicle
 *
 * @param {VehicleEntity} vehicle - Reference vehicle
 *
 * @returns {Promise<SimilarVehicle[]>} List of similar vehicles (maximum 6)
 *
 * @example
 * const similar = await getSimilarVehicles(vehicle);
 */
async function getSimilarVehicles(vehicle: VehicleEntity): Promise<any[]> {
  /**
   * @rule {fn-similar-vehicles-filtering} Find vehicles with similar characteristics
   */
  const priceRange = vehicle.preco * 0.3;
  const minPrice = vehicle.preco - priceRange;
  const maxPrice = vehicle.preco + priceRange;

  let similar = vehicles.filter(
    (v) =>
      v.id !== vehicle.id &&
      (v.marca === vehicle.marca || v.preco >= minPrice) &&
      v.preco <= maxPrice
  );

  /**
   * @rule {fn-similar-vehicles-sorting} Sort by relevance (same brand first, then by price proximity)
   */
  similar.sort((a, b) => {
    if (a.marca === vehicle.marca && b.marca !== vehicle.marca) return -1;
    if (a.marca !== vehicle.marca && b.marca === vehicle.marca) return 1;

    const aPriceDiff = Math.abs(a.preco - vehicle.preco);
    const bPriceDiff = Math.abs(b.preco - vehicle.preco);
    return aPriceDiff - bPriceDiff;
  });

  /**
   * @rule {fn-similar-vehicles-limit} Limit to maximum 6 similar vehicles
   */
  return similar.slice(0, 6).map((v) => ({
    id: v.id,
    modelo: v.modelo,
    marca: v.marca,
    ano: v.ano,
    preco: v.preco,
    imagemPrincipal: v.imagemPrincipal,
    quilometragem: v.quilometragem,
    cambio: v.cambio,
  }));
}
