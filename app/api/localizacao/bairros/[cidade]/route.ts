import { obterBairros, criarFiltroImovel, listarImoveis } from "@/lib/api";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import type { Bairro, Imovel } from "@/types/api";

export const revalidate = 3600; // Cache por 1 hora

export async function GET(request: NextRequest, { params }: { params: { cidade: string } }) {
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
    const codigoCidade = Number.parseInt(params.cidade);

    if (isNaN(codigoCidade)) {
      return new NextResponse(JSON.stringify({ message: "ID da cidade inválido" }), { status: 400 });
    }

    const filtro = criarFiltroImovel(token, {
      quantidadeImoveis: 9999,
      paginado: false,
      idCidade: codigoCidade
    });

    if (tipoImovel && tipoImovel !== 'all') {
      filtro.tipoImovel = tipoImovel;
    }

    const [bairros, imoveisDaCidade] = await Promise.all([
      obterBairros(codigoCidade),
      listarImoveis(filtro)
    ]);

    const contagemPorBairro: Record<number, number> = {};
    imoveisDaCidade.forEach((imovel: Imovel) => {
      const bairroDoImovel = bairros.find(b => b.bairro === imovel.nomeBairro);
      if (bairroDoImovel) {
        contagemPorBairro[bairroDoImovel.codigo] = (contagemPorBairro[bairroDoImovel.codigo] || 0) + 1;
      }
    });

    const bairrosComContagem = bairros
      .map(bairro => ({
        ...bairro,
        contagem: contagemPorBairro[bairro.codigo] || 0,
      }))
      .filter(bairro => bairro.contagem > 0);

    return NextResponse.json(bairrosComContagem);

  } catch (error) {
    console.error("Proxy erro bairros com contagem:", error);
    return new NextResponse(
      JSON.stringify({ message: "Erro ao buscar bairros" }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}