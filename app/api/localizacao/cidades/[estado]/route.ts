import { obterCidades } from "@/lib/api"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function GET(request: NextRequest, { params }: { params: { estado: string } }) {
  try {
    const codigo = Number.parseInt(params.estado)
    const cidades = await obterCidades(codigo)
    return NextResponse.json(cidades)
  } catch (error) {
    console.error("Proxy erro cidades:", error)

    // Retorna array vazio em caso de erro
    return NextResponse.json([])
  }
}
