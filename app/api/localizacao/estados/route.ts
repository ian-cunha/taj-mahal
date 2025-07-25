import { obterEstados, criarFiltroImovel, listarImoveis } from "@/lib/api";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import type { Estado, Imovel } from "@/types/api";

export const revalidate = 3600; // Cache por 1 hora

export async function GET(request: NextRequest) {
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

    // O filtro agora precisa do token para ser criado
    const filtro = criarFiltroImovel(token, { quantidadeImoveis: 9999, paginado: false });

    if (tipoImovel && tipoImovel !== 'all') {
      filtro.tipoImovel = tipoImovel;
    }
    if (statusImovelStr) {
      filtro.statusImovelStr = statusImovelStr;
    }

    // A chamada para listarImoveis agora funcionará com o token correto
    const [estados, imoveis] = await Promise.all([
      obterEstados(),
      listarImoveis(filtro)
    ]);

    const contagemPorEstado: Record<string, number> = {};
    imoveis.forEach((imovel: Imovel) => {
      if (imovel.siglaEstado) {
        contagemPorEstado[imovel.siglaEstado] = (contagemPorEstado[imovel.siglaEstado] || 0) + 1;
      }
    });

    const estadosComContagem = estados
      .map(estado => ({
        ...estado,
        contagem: contagemPorEstado[estado.uf] || 0,
      }))
      .filter(estado => estado.contagem > 0);

    return NextResponse.json(estadosComContagem);

  } catch (error) {
    console.error("Proxy erro estados com contagem:", error);
    return new NextResponse(
      JSON.stringify({ message: "Erro ao buscar estados" }),
      { status: 500 }
    );
  }
}