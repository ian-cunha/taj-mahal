import useSWR from 'swr';

// O 'fetcher' é uma função simples que busca os dados e retorna o JSON
const fetcher = (url: string) => fetch(url).then(res => res.json());

// Nosso hook centralizado para gerenciar os dados dos filtros
export function useFilters(tipoOperacao: string, initialData?: any) {
    // Busca os dados iniciais (tipos, estados, disponibilidade)
    const { data: initialFilters, error: initialError } = useSWR(`/api/initial-filters?statusImovelStr=${tipoOperacao}`, fetcher, {
        fallbackData: initialData // Usa dados iniciais se disponíveis (para componentes de servidor)
    });

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

        // Funções para passar para os hooks de cidades e bairros
        fetchCities,
        fetchBairros,
    };
}

// Hook específico para buscar cidades, que depende dos outros filtros
export function useCities(idEstado: string | number, tipoImovel: string, tipoOperacao: string) {
    const fetcherUrl = `/api/localizacao/cidades/${idEstado}?tipoImovel=${tipoImovel}&statusImovelStr=${tipoOperacao}`;
    const { data, error } = useSWR(idEstado && idEstado !== 'all' ? fetcherUrl : null, fetcher);

    return {
        cidades: data || [],
        isLoadingCidades: !data && !error,
        isErrorCidades: error
    }
}

// Hook específico para buscar bairros
export function useBairros(idCidade: string | number, tipoImovel: string) {
    const fetcherUrl = `/api/localizacao/bairros/${idCidade}?tipoImovel=${tipoImovel}`;
    const { data, error } = useSWR(idCidade && idCidade !== 'all' ? fetcherUrl : null, fetcher);

    return {
        bairros: data || [],
        isLoadingBairros: !data && !error,
        isErrorBairros: error
    }
}