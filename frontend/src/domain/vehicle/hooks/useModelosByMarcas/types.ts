export interface UseModelosByMarcasOptions {
  marcas: string[];
  enabled?: boolean;
}

export interface UseModelosByMarcasReturn {
  data: string[] | undefined;
  isLoading: boolean;
  error: Error | null;
}
