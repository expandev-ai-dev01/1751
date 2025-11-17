export interface Vehicle {
  id_veiculo: string;
  modelo: string;
  marca: string;
  ano: number;
  preco: number;
  imagem_principal: string;
  quilometragem?: number;
  cambio?: string;
}

export interface VehicleDetail {
  id_veiculo: string;
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
  veiculosSimilares: Vehicle[];
}

export interface VehiclePhoto {
  url: string;
  legenda?: string;
  ordem: number;
}

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

export interface VehicleItem {
  nome: string;
  categoria: string;
}

export interface VehicleHistory {
  procedencia: string;
  proprietarios: number;
  garantia?: string;
  revisoes?: VehicleRevision[];
  sinistros?: VehicleSinistro[];
  laudoTecnico?: VehicleLaudo;
}

export interface VehicleRevision {
  data: string;
  quilometragem: number;
  local: string;
}

export interface VehicleSinistro {
  data: string;
  tipo: string;
  descricao: string;
}

export interface VehicleLaudo {
  dataInspecao: string;
  resultadoGeral: string;
}

export interface SaleConditions {
  formasPagamento: string[];
  condicoesFinanciamento?: FinancingConditions;
  aceitaTroca: boolean;
  observacoesVenda?: string;
  documentacaoNecessaria: DocumentItem[];
  situacaoDocumental: DocumentalStatus;
}

export interface FinancingConditions {
  entradaMinima: number;
  taxaJuros: number;
  prazoMaximo: number;
}

export interface DocumentItem {
  nome: string;
  observacoes?: string;
}

export interface DocumentalStatus {
  status: string;
  pendencias?: string[];
  observacoes?: string;
}

export interface VehicleListParams {
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

export interface VehicleListResponse {
  veiculos: Vehicle[];
  total: number;
  pagina: number;
  itensPorPagina: number;
  totalPaginas: number;
}

export interface FilterOptions {
  marcas: string[];
  modelos: string[];
  anos: number[];
  cambios: string[];
}

export interface ModelosByMarcasResponse {
  modelos: string[];
}

export const ORDENACAO_OPTIONS = [
  { value: 'relevancia', label: 'Relevância' },
  { value: 'preco_asc', label: 'Preço (menor para maior)' },
  { value: 'preco_desc', label: 'Preço (maior para menor)' },
  { value: 'ano_desc', label: 'Ano (mais recente)' },
  { value: 'ano_asc', label: 'Ano (mais antigo)' },
  { value: 'modelo_asc', label: 'Modelo (A-Z)' },
  { value: 'modelo_desc', label: 'Modelo (Z-A)' },
] as const;

export const ITENS_POR_PAGINA_OPTIONS = [12, 24, 36, 48] as const;

export const CAMBIO_OPTIONS = [
  { value: 'Manual', label: 'Manual' },
  { value: 'Automático', label: 'Automático' },
  { value: 'CVT', label: 'CVT' },
  { value: 'Semi-automático', label: 'Semi-automático' },
] as const;
