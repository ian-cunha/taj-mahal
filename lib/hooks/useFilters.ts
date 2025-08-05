import useSWR from 'swr';

// O 'fetcher' agora aceita tanto a URL quanto o token
const fetcher = ([url, token]: [string, string]) =>
    fetch(url, {
        headers: {
            'X-API-TOKEN': token
        }
    }).then(res => res.json());

// Hook para gerenciar os dados dos filtros
export function useFilters(tipoOperacao: string, token: string | null, initialData?: any) {
    const { data: initialFilters, error: initialError } = useSWR(
        token ? [`/api/initial-filters?statusImovelStr=${tipoOperacao}`, token] : null,
        fetcher,
        {
            fallbackData: initialData,
            revalidateOnFocus: false, // Opcional: desativa revalidação no foco da janela
            revalidateIfStale: true,
            revalidateOnMount: false, // Evita a revalidação ao montar o componente se os dados estiverem no cache
            refreshInterval: 3600000
        }
    );

    // Função para buscar cidades de um estado específico
    const fetchCities = (idEstado: string | number, tipoImovel: string, tipoOperacao: string) => {
        if (!idEstado || idEstado === 'all') return null;
        const params = new URLSearchParams({ tipoImovel, statusImovelStr: tipoOperacao });
        return `/api/localizacao/cidades/${idEstado}?${params.toString()}`;
    };

    // Função para buscar bairros de uma cidade específica
    const fetchBairros = (idCidade: string | number, tipoImovel: string) => {
        if (!idCidade || idCidade === 'all') return null;
        const params = new URLSearchParams({ tipoImovel });
        return `/api/localizacao/bairros/${idCidade}?${params.toString()}`;
    };

    return {
        // Dados e estado de carregamento dos filtros iniciais
        tipos: initialFilters?.tipos || [],
        estados: initialFilters?.estados || [],
        disponibilidade: initialFilters?.disponibilidade || { temVenda: true, temLocacao: true },
        isLoadingInitial: !initialFilters && !initialError,
        isErrorInitial: initialError,

        fetchCities,
        fetchBairros,
    };
}

// Hook específico para buscar cidades, que depende dos outros filtros
export function useCities(idEstado: string | number, tipoImovel: string, tipoOperacao: string, token: string | null) {
    const fetcherUrl = `/api/localizacao/cidades/${idEstado}?tipoImovel=${tipoImovel}&statusImovelStr=${tipoOperacao}`;
    const { data, error } = useSWR(
        token && idEstado && idEstado !== 'all' ? [fetcherUrl, token] : null,
        fetcher,
        {
            refreshInterval: 3600000, // Cache de 1 hora
            revalidateOnMount: false,
        }
    );

    return {
        cidades: data || [],
        isLoadingCidades: !data && !error,
        isErrorCidades: error
    }
}

// Hook específico para buscar bairros
export function useBairros(idCidade: string | number, tipoImovel: string, token: string | null) {
    const fetcherUrl = `/api/localizacao/bairros/${idCidade}?tipoImovel=${tipoImovel}`;
    const { data, error } = useSWR(
        token && idCidade && idCidade !== 'all' ? [fetcherUrl, token] : null,
        fetcher,
        {
            refreshInterval: 3600000, // Cache de 1 hora
            revalidateOnMount: false,
        }
    );

    return {
        bairros: data || [],
        isLoadingBairros: !data && !error,
        isErrorBairros: error
    }
}