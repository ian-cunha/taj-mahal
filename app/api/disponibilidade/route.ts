import { NextResponse } from "next/server"
import { criarFiltroImovel, obterTotalImoveis } from "@/lib/api"

export const dynamic = "force-dynamic" // evita cache inesperado

export async function GET() {
  try {
    // Consulta mínima: 1 imóvel de cada tipo
    const [totalVenda, totalLocacao] = await Promise.all([
      obterTotalImoveis(criarFiltroImovel({ quantidadeImoveis: 1, statusImovelStr: "V", paginado: false })),
      obterTotalImoveis(criarFiltroImovel({ quantidadeImoveis: 1, statusImovelStr: "L", paginado: false })),
    ])

    return NextResponse.json({
      temVenda: totalVenda > 0,
      temLocacao: totalLocacao > 0,
    })
  } catch (error) {
    console.error("Erro ao obter disponibilidade:", error)
    // Fallback: assume que ambos estão disponíveis
    return NextResponse.json({ temVenda: true, temLocacao: true })
  }
}
