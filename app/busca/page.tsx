// app/busca/page.tsx - VERSÃO CORRIGIDA

import { Suspense } from "react";
import { SearchResults } from "@/components/search-results";
import { SearchFilters } from "@/components/search-filters";
import { LoadingSpinner } from "@/components/loading-spinner";
import { listarImoveis, obterImovel, criarFiltroImovel, obterTotalImoveis } from "@/lib/api";
import type { Imovel } from "@/types/api";

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

async function fetchImoveis(searchParams: SearchPageProps['searchParams']) {
  const currentPage = Number(searchParams.page || "1");
  const itemsPerPage = 12;

  const filtro: any = criarFiltroImovel({
    paginado: true,
    startpag: (currentPage - 1) * itemsPerPage,
    pagAtual: currentPage,
  });

  // Aplica os filtros da URL
  if (searchParams.statusImovelStr) filtro.statusImovelStr = searchParams.statusImovelStr;
  if (searchParams.tipoImovel && searchParams.tipoImovel !== "all") filtro.tipoImovel = searchParams.tipoImovel;
  if (searchParams.precoMinimo) filtro.precoMinimo = searchParams.precoMinimo;
  if (searchParams.precoMaximo) filtro.precoMaximo = searchParams.precoMaximo;
  if (searchParams.idEstado && searchParams.idEstado !== "all") filtro.idEstado = Number(searchParams.idEstado);
  if (searchParams.idCidade && searchParams.idCidade !== "all") filtro.idCidade = Number(searchParams.idCidade);
  if (searchParams.idBairros && searchParams.idBairros !== "all") filtro.idBairros = [Number(searchParams.idBairros)];
  if (searchParams.quartosMinimo && searchParams.quartosMinimo !== "all") filtro.nquartosMinimo = searchParams.quartosMinimo;

  try {
    const [imoveis, total] = await Promise.all([
      listarImoveis(filtro),
      obterTotalImoveis(filtro)
    ]);

    // Busca os detalhes de cada imóvel para obter o tipo de operação
    const imoveisComDetalhes = await Promise.all(
      imoveis.map(imovel => obterImovel(imovel.codigoImovel))
    );

    return { imoveis: imoveisComDetalhes, total, error: null, currentPage };
  } catch (err) {
    console.error("Erro na busca de imóveis (Server):", err);
    const error = err instanceof Error ? err.message : "Erro desconhecido";
    return { imoveis: [] as Imovel[], total: 0, error, currentPage };
  }
}

export default async function BuscaPage({ searchParams }: SearchPageProps) {
  const { imoveis, total, error, currentPage } = await fetchImoveis(searchParams);
  const itemsPerPage = 12;
  const totalPages = Math.ceil(total / itemsPerPage);

  return (
    <div className="py-8">
      <div className="container">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Buscar Imóveis</h1>
          <p className="text-lg text-gray-600">Encontre o imóvel perfeito para você</p>
        </div>

        <SearchFilters />

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