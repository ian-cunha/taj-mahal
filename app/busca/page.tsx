import { headers } from "next/headers";
import { Suspense } from "react";
import { SearchResults } from "@/components/search-results";
import { SearchFilters } from "@/components/search-filters";
import { LoadingSpinner } from "@/components/loading-spinner";
import { listarImoveis, obterTotalImoveis, criarFiltroImovel } from "@/lib/api";
import type { Imovel } from "@/types/api";

// Define a interface para os parâmetros de busca da URL
interface SearchPageProps {
  searchParams: {
    statusImovelStr?: string;
    tipoImovel?: string;
    termo?: string;
    precoMinimo?: string;
    precoMaximo?: string;
    quartosMinimo?: string;
    idEstado?: string;
    idCidade?: string;
    idBairros?: string;
    page?: string;
  };
}

// Função assíncrona para buscar os imóveis no servidor
async function fetchImoveis(searchParams: SearchPageProps['searchParams'], token: string) {
  const currentPage = Number(searchParams.page || "1");
  const itemsPerPage = 12;

  // O filtro é criado com o token e os parâmetros de paginação
  const filtro: any = criarFiltroImovel(token, {
    paginado: true,
    startpag: (currentPage - 1) * itemsPerPage,
    pagAtual: currentPage,
  });

  // Aplica dinamicamente os filtros vindos da URL
  if (searchParams.statusImovelStr) filtro.statusImovelStr = searchParams.statusImovelStr;
  if (searchParams.tipoImovel && searchParams.tipoImovel !== "all") filtro.tipoImovel = searchParams.tipoImovel;
  if (searchParams.precoMinimo) filtro.precoMinimo = searchParams.precoMinimo;
  if (searchParams.precoMaximo) filtro.precoMaximo = searchParams.precoMaximo;
  if (searchParams.idEstado && searchParams.idEstado !== "all") filtro.idEstado = Number(searchParams.idEstado);
  if (searchParams.idCidade && searchParams.idCidade !== "all") filtro.idCidade = Number(searchParams.idCidade);
  if (searchParams.idBairros && searchParams.idBairros !== "all") filtro.idBairros = [Number(searchParams.idBairros)];
  if (searchParams.quartosMinimo && searchParams.quartosMinimo !== "all") filtro.quartosMinimo = searchParams.quartosMinimo;
  if (searchParams.termo) filtro.termo = searchParams.termo;


  try {
    // Busca os imóveis e o total em paralelo para otimizar
    const [imoveis, total] = await Promise.all([
      listarImoveis(filtro),
      obterTotalImoveis(filtro)
    ]);

    // Adiciona detalhes de operação aos imóveis
    const imoveisComDetalhes = imoveis.map(imovel => ({
      ...imovel,
      paraVenda: imovel.tipoOperacao.includes('V'),
      paraLocacao: imovel.tipoOperacao.includes('L'),
    }));

    return { imoveis: imoveisComDetalhes, total, error: null, currentPage };
  } catch (err) {
    console.error("❌ Erro na busca de imóveis (Servidor):", err);
    const error = err instanceof Error ? err.message : "Ocorreu um erro ao buscar os imóveis.";
    return { imoveis: [] as Imovel[], total: 0, error, currentPage };
  }
}

// Componente principal da página de busca (Server Component)
export default async function BuscaPage({ searchParams }: SearchPageProps) {
  const headerList = await headers();
  const token = headerList.get("X-API-TOKEN");

  // Se o token não for encontrado, a página não pode funcionar
  if (!token) {
    return (
      <div className="py-8">
        <div className="container text-center">
          <h1 className="text-5xl font-bold mb-4">Oops!</h1>
          <p className="text-gray-600">O token de acesso não foi fornecido.</p>
        </div>
      </div>
    );
  }

  const { imoveis, total, error, currentPage } = await fetchImoveis(searchParams, token);
  const itemsPerPage = 12;
  const totalPages = Math.ceil(total / itemsPerPage);

  return (
    <div className="py-8">
      <div className="container">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Buscar Imóveis</h1>
          <p className="text-lg text-gray-600">Encontre o imóvel perfeito para você</p>
        </div>

        {/* O SearchFilters é um Client Component que não precisa de dados do servidor */}
        <SearchFilters token={token} />

        {/* Usamos Suspense para mostrar um loading enquanto os resultados são carregados */}
        <Suspense fallback={<LoadingSpinner />}>
          <SearchResults
            imoveis={imoveis}
            total={total}
            error={error}
            currentPage={currentPage}
            totalPages={totalPages}
          />
        </Suspense>
      </div>
    </div>
  );
}