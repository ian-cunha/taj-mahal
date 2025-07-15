import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { criarFiltroImovel, obterTotalImoveis } from "@/lib/api";

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
    const [totalVenda, totalLocacao] = await Promise.all([
      obterTotalImoveis(criarFiltroImovel(token, { quantidadeImoveis: 1, statusImovelStr: "V", paginado: false })),
      obterTotalImoveis(criarFiltroImovel(token, { quantidadeImoveis: 1, statusImovelStr: "L", paginado: false })),
    ]);

    return NextResponse.json({
      temVenda: totalVenda > 0,
      temLocacao: totalLocacao > 0,
    });
  } catch (error) {
    console.error("Erro ao obter disponibilidade:", error);
    // Em caso de erro na API, retorna um fallback seguro
    return NextResponse.json({ temVenda: true, temLocacao: true });
  }
}