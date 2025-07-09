import { obterBairros } from "@/lib/api"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function GET(request: NextRequest, { params }: { params: { cidade: string } }) {
  try {
    const codigo = Number.parseInt(params.cidade)
    const bairros = await obterBairros(codigo)
    return NextResponse.json(bairros)
  } catch (error) {
    console.error("Proxy erro bairros:", error)

    // Retorna array vazio em caso de erro
    return NextResponse.json([])
  }
}
