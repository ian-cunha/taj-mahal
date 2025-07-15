import { obterCidades, criarFiltroImovel, listarImoveis } from "@/lib/api";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import type { Cidade, Imovel } from "@/types/api";

export const revalidate = 3600; // Cache por 1 hora

export async function GET(request: NextRequest, { params }: { params: { estado: string } }) {
  const token = request.headers.get("X-API-TOKEN");

  if (!token) {
    return new NextResponse(
      JSON.stringify({ message: "Token de API não fornecido." }),
      { status: 401, headers: { 'Content-Type': 'application/json' } }
    );
  }

  try {
    const { searchParams } = new URL(request.url);
    const tipoImovel = searchParams.get('tipoImovel');
    const statusImovelStr = searchParams.get('statusImovelStr');
    const codigoEstado = Number.parseInt(params.estado);

    if (isNaN(codigoEstado)) {
      return new NextResponse(JSON.stringify({ message: "ID do estado inválido" }), { status: 400 });
    }

    const filtro: any = criarFiltroImovel(token, {
      quantidadeImoveis: 9999,
      paginado: false,
      idEstado: codigoEstado
    });

    if (tipoImovel && tipoImovel !== 'all') {
      filtro.tipoImovel = tipoImovel;
    }

    if (statusImovelStr) {
      filtro.statusImovelStr = statusImovelStr;
    }

    const [cidades, imoveisDoEstado] = await Promise.all([
      obterCidades(codigoEstado),
      listarImoveis(filtro)
    ]);

    const contagemPorCidade: Record<number, number> = {};
    imoveisDoEstado.forEach((imovel: Imovel) => {
      const cidadeDoImovel = cidades.find(c => c.cidade === imovel.nomeCidade);
      if (cidadeDoImovel) {
        contagemPorCidade[cidadeDoImovel.codigo] = (contagemPorCidade[cidadeDoImovel.codigo] || 0) + 1;
      }
    });

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