/**
 * @interface VehicleEntity
 * @description Represents a vehicle entity in the system
 *
 * @property {string} id - Unique vehicle identifier
 * @property {string} modelo - Vehicle model name
 * @property {string} marca - Vehicle brand/manufacturer
 * @property {number} ano - Manufacturing year
 * @property {number} preco - Vehicle price in BRL
 * @property {string} imagemPrincipal - URL of the main vehicle image
 * @property {number | null} quilometragem - Current vehicle mileage
 * @property {string | null} cambio - Transmission type
 */
export interface VehicleEntity {
  id: string;
  modelo: string;
  marca: string;
  ano: number;
  preco: number;
  imagemPrincipal: string;
  quilometragem: number | null;
  cambio: string | null;
}

/**
 * @interface VehicleListRequest
 * @description Request parameters for vehicle listing with filters and pagination
 *
 * @property {string[]} [marcas] - Filter by brands
 * @property {string[]} [modelos] - Filter by models
 * @property {number} [anoMin] - Minimum year filter
 * @property {number} [anoMax] - Maximum year filter
 * @property {number} [precoMin] - Minimum price filter
 * @property {number} [precoMax] - Maximum price filter
 * @property {string[]} [cambios] - Filter by transmission types
 * @property {string} [ordenacao] - Sort criteria
 * @property {number} [pagina] - Current page number
 * @property {number} [itensPorPagina] - Items per page
 */
export interface VehicleListRequest {
  marcas?: string[];
  modelos?: string[];
  anoMin?: number;
  anoMax?: number;
  precoMin?: number;
  precoMax?: number;
  cambios?: string[];
  ordenacao?: string;
  pagina?: number;
  itensPorPagina?: number;
}

/**
 * @interface VehicleListResponse
 * @description Response structure for vehicle listing
 *
 * @property {VehicleEntity[]} veiculos - Array of vehicles
 * @property {number} total - Total number of vehicles matching filters
 * @property {number} pagina - Current page number
 * @property {number} itensPorPagina - Items per page
 * @property {number} totalPaginas - Total number of pages
 */
export interface VehicleListResponse {
  veiculos: VehicleEntity[];
  total: number;
  pagina: number;
  itensPorPagina: number;
  totalPaginas: number;
}

/**
 * @interface FilterOptionsResponse
 * @description Available filter options based on current catalog
 *
 * @property {string[]} marcas - Available brands
 * @property {string[]} modelos - Available models
 * @property {number[]} anos - Available years
 * @property {string[]} cambios - Available transmission types
 */
export interface FilterOptionsResponse {
  marcas: string[];
  modelos: string[];
  anos: number[];
  cambios: string[];
}

/**
 * @interface VehiclePhoto
 * @description Represents a vehicle photo in the gallery
 *
 * @property {string} url - Photo URL
 * @property {string | null} legenda - Photo caption
 * @property {boolean} principal - Indicates if this is the main photo
 */
export interface VehiclePhoto {
  url: string;
  legenda: string | null;
  principal: boolean;
}

/**
 * @interface VehicleSpecifications
 * @description Technical specifications of a vehicle
 *
 * @property {string} marca - Vehicle brand
 * @property {string} modelo - Vehicle model
 * @property {number} anoFabricacao - Manufacturing year
 * @property {number} anoModelo - Model year
 * @property {number} quilometragem - Current mileage
 * @property {string} combustivel - Fuel type
 * @property {string} cambio - Transmission type
 * @property {string} potencia - Engine power
 * @property {string} cor - Vehicle color
 * @property {number} portas - Number of doors
 * @property {string} carroceria - Body type
 * @property {string} motor - Engine displacement
 * @property {number} finalPlaca - License plate final digit
 */
export interface VehicleSpecifications {
  marca: string;
  modelo: string;
  anoFabricacao: number;
  anoModelo: number;
  quilometragem: number;
  combustivel: string;
  cambio: string;
  potencia: string;
  cor: string;
  portas: number;
  carroceria: string;
  motor: string;
  finalPlaca: number;
}

/**
 * @interface VehicleItem
 * @description Represents a vehicle item or optional
 *
 * @property {string} nome - Item name
 * @property {string} categoria - Item category
 */
export interface VehicleItem {
  nome: string;
  categoria: string;
}

/**
 * @interface VehicleRevision
 * @description Represents a vehicle revision record
 *
 * @property {string} data - Revision date
 * @property {number} quilometragem - Mileage at revision
 * @property {string} local - Revision location
 */
export interface VehicleRevision {
  data: string;
  quilometragem: number;
  local: string;
}

/**
 * @interface VehicleSinister
 * @description Represents a vehicle sinister record
 *
 * @property {string} data - Sinister date
 * @property {string} tipo - Sinister type
 * @property {string} descricao - Sinister description
 */
export interface VehicleSinister {
  data: string;
  tipo: string;
  descricao: string;
}

/**
 * @interface VehicleTechnicalReport
 * @description Represents a vehicle technical report
 *
 * @property {string} dataInspecao - Inspection date
 * @property {string} resultadoGeral - General result
 */
export interface VehicleTechnicalReport {
  dataInspecao: string;
  resultadoGeral: string;
}

/**
 * @interface VehicleHistory
 * @description Vehicle history information
 *
 * @property {string} procedencia - Vehicle origin
 * @property {number} proprietarios - Number of previous owners
 * @property {string | null} garantia - Warranty information
 * @property {VehicleRevision[]} revisoes - Revision history
 * @property {VehicleSinister[]} sinistros - Sinister history
 * @property {VehicleTechnicalReport | null} laudoTecnico - Technical report
 */
export interface VehicleHistory {
  procedencia: string;
  proprietarios: number;
  garantia: string | null;
  revisoes: VehicleRevision[];
  sinistros: VehicleSinister[];
  laudoTecnico: VehicleTechnicalReport | null;
}

/**
 * @interface FinancingConditions
 * @description Financing conditions information
 *
 * @property {number} entradaMinima - Minimum down payment
 * @property {number} taxaJuros - Interest rate
 * @property {number} prazoMaximo - Maximum term in months
 */
export interface FinancingConditions {
  entradaMinima: number;
  taxaJuros: number;
  prazoMaximo: number;
}

/**
 * @interface DocumentationItem
 * @description Required documentation item
 *
 * @property {string} nome - Document name
 * @property {string | null} observacoes - Additional notes
 */
export interface DocumentationItem {
  nome: string;
  observacoes: string | null;
}

/**
 * @interface DocumentalStatus
 * @description Vehicle documental status
 *
 * @property {string} status - Status (regular, pendente, em andamento)
 * @property {string[]} pendencias - List of pending items
 * @property {string | null} observacoes - Additional notes
 */
export interface DocumentalStatus {
  status: string;
  pendencias: string[];
  observacoes: string | null;
}

/**
 * @interface SaleConditions
 * @description Vehicle sale conditions
 *
 * @property {string[]} formasPagamento - Accepted payment methods
 * @property {FinancingConditions | null} condicoesFinanciamento - Financing conditions
 * @property {boolean} aceitaTroca - Accepts trade-in
 * @property {string | null} observacoesVenda - Sale notes
 * @property {DocumentationItem[]} documentacaoNecessaria - Required documentation
 * @property {DocumentalStatus} situacaoDocumental - Documental status
 */
export interface SaleConditions {
  formasPagamento: string[];
  condicoesFinanciamento: FinancingConditions | null;
  aceitaTroca: boolean;
  observacoesVenda: string | null;
  documentacaoNecessaria: DocumentationItem[];
  situacaoDocumental: DocumentalStatus;
}

/**
 * @interface SimilarVehicle
 * @description Similar vehicle information
 *
 * @property {string} id - Vehicle identifier
 * @property {string} modelo - Vehicle model
 * @property {string} marca - Vehicle brand
 * @property {number} ano - Vehicle year
 * @property {number} preco - Vehicle price
 * @property {string} imagemPrincipal - Main image URL
 * @property {number | null} quilometragem - Vehicle mileage
 * @property {string | null} cambio - Transmission type
 */
export interface SimilarVehicle {
  id: string;
  modelo: string;
  marca: string;
  ano: number;
  preco: number;
  imagemPrincipal: string;
  quilometragem: number | null;
  cambio: string | null;
}

/**
 * @interface VehicleDetailResponse
 * @description Complete vehicle detail information
 *
 * @property {string} id - Vehicle identifier
 * @property {string} tituloAnuncio - Advertisement title
 * @property {number} preco - Vehicle price
 * @property {string} statusVeiculo - Vehicle status
 * @property {VehiclePhoto[]} fotos - Photo gallery
 * @property {VehicleSpecifications} especificacoes - Technical specifications
 * @property {VehicleItem[]} itensSerie - Standard items
 * @property {VehicleItem[]} opcionais - Optional items
 * @property {VehicleHistory} historico - Vehicle history
 * @property {SaleConditions} condicoesVenda - Sale conditions
 * @property {string} urlCompartilhamento - Sharing URL
 * @property {SimilarVehicle[]} veiculosSimilares - Similar vehicles
 */
export interface VehicleDetailResponse {
  id: string;
  tituloAnuncio: string;
  preco: number;
  statusVeiculo: string;
  fotos: VehiclePhoto[];
  especificacoes: VehicleSpecifications;
  itensSerie: VehicleItem[];
  opcionais: VehicleItem[];
  historico: VehicleHistory;
  condicoesVenda: SaleConditions;
  urlCompartilhamento: string;
  veiculosSimilares: SimilarVehicle[];
}

/**
 * @enum TransmissionType
 * @description Allowed transmission types
 */
export enum TransmissionType {
  Manual = 'Manual',
  Automatico = 'Automático',
  CVT = 'CVT',
  SemiAutomatico = 'Semi-automático',
}

/**
 * @enum SortCriteria
 * @description Available sorting criteria
 */
export enum SortCriteria {
  Relevancia = 'Relevância',
  PrecoMenor = 'Preço (menor para maior)',
  PrecoMaior = 'Preço (maior para menor)',
  AnoRecente = 'Ano (mais recente)',
  AnoAntigo = 'Ano (mais antigo)',
  ModeloAZ = 'Modelo (A-Z)',
  ModeloZA = 'Modelo (Z-A)',
}

/**
 * @enum VehicleStatus
 * @description Vehicle availability status
 */
export enum VehicleStatus {
  Disponivel = 'Disponível',
  Reservado = 'Reservado',
  Vendido = 'Vendido',
}

/**
 * @enum FuelType
 * @description Fuel types
 */
export enum FuelType {
  Gasolina = 'Gasolina',
  Etanol = 'Etanol',
  Flex = 'Flex',
  Diesel = 'Diesel',
  Eletrico = 'Elétrico',
  Hibrido = 'Híbrido',
}

/**
 * @enum BodyType
 * @description Body types
 */
export enum BodyType {
  Hatch = 'Hatch',
  Sedan = 'Sedan',
  SUV = 'SUV',
  Picape = 'Picape',
  Minivan = 'Minivan',
  Conversivel = 'Conversível',
  Coupe = 'Cupê',
  Wagon = 'Wagon',
}

/**
 * @enum ItemCategory
 * @description Item categories
 */
export enum ItemCategory {
  Conforto = 'Conforto',
  Seguranca = 'Segurança',
  Tecnologia = 'Tecnologia',
  Performance = 'Performance',
  Estetica = 'Estética',
}

/**
 * @enum VehicleOrigin
 * @description Vehicle origin types
 */
export enum VehicleOrigin {
  Particular = 'Particular',
  Concessionaria = 'Concessionária',
  Leilao = 'Leilão',
  Importado = 'Importado',
  Locadora = 'Locadora',
}
