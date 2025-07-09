// app/api/localizacao/cidades/[estado]/route.ts - VERSÃO CORRIGIDA

import { obterCidades, criarFiltroImovel, listarImoveis } from "@/lib/api";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import type { Cidade, Imovel } from "@/types/api";

export async function GET(request: NextRequest, { params }: { params: { estado: string } }) {
  try {
    const { searchParams } = new URL(request.url);
    const tipoImovel = searchParams.get('tipoImovel');
    const codigoEstado = Number.parseInt(params.estado);

    if (isNaN(codigoEstado)) {
      return new NextResponse(JSON.stringify({ message: "ID do estado inválido" }), { status: 400 });
    }

    // Cria o filtro base com o ID do estado, que é obrigatório
    const filtro: any = criarFiltroImovel({
      quantidadeImoveis: 9999,
      paginado: false,
      idEstado: codigoEstado
    });

    // Adiciona o filtro de tipo de imóvel, se ele foi fornecido
    if (tipoImovel && tipoImovel !== 'all') {
      filtro.tipoImovel = tipoImovel;
    }

    // Busca as cidades e os imóveis filtrados em paralelo
    const [cidades, imoveisDoEstado] = await Promise.all([
      obterCidades(codigoEstado),
      listarImoveis(filtro)
    ]);

    // Conta os imóveis por cidade
    const contagemPorCidade: Record<number, number> = {};
    imoveisDoEstado.forEach((imovel: Imovel) => {
      // A API não retorna o ID da cidade, então encontramos pelo nome
      const cidadeDoImovel = cidades.find(c => c.cidade === imovel.nomeCidade);
      if (cidadeDoImovel) {
        contagemPorCidade[cidadeDoImovel.codigo] = (contagemPorCidade[cidadeDoImovel.codigo] || 0) + 1;
      }
    });

    // Mapeia, adiciona a contagem e filtra as cidades que não têm imóveis
    const cidadesComContagem = cidades
      .map(cidade => ({
        ...cidade,
        contagem: contagemPorCidade[cidade.codigo] || 0,
      }))
      .filter(cidade => cidade.contagem > 0);

    return NextResponse.json(cidadesComContagem);

  } catch (error) {
    console.error("Proxy erro cidades com contagem:", error);
    return new NextResponse(
      JSON.stringify({ message: "Erro ao buscar cidades" }),
      { status: 500 }
    );
  }
}