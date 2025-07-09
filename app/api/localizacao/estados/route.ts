// app/api/localizacao/estados/route.ts

import { obterEstados, criarFiltroImovel, listarImoveis } from "@/lib/api";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import type { Estado, Imovel } from "@/types/api";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const tipoImovel = searchParams.get('tipoImovel');
    const statusImovelStr = searchParams.get('statusImovelStr');


    // O filtro é aplicado apenas se o tipo de imóvel for especificado
    const filtro = criarFiltroImovel({ quantidadeImoveis: 9999, paginado: false });
    if (tipoImovel && tipoImovel !== 'all') {
      filtro.tipoImovel = tipoImovel;
    }
    if (statusImovelStr) {
      filtro.statusImovelStr = statusImovelStr;
    }

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