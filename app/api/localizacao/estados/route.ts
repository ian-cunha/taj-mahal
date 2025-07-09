import { obterEstados } from "@/lib/api"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const estados = await obterEstados()
    return NextResponse.json(estados)
  } catch (error) {
    console.error("Proxy erro estados:", error)

    // Retorna dados de fallback em caso de erro
    const estadosFallback = [
      { codigo: 25, nome: "São Paulo", uf: "SP" },
      { codigo: 19, nome: "Rio de Janeiro", uf: "RJ" },
      { codigo: 13, nome: "Minas Gerais", uf: "MG" },
      { codigo: 23, nome: "Santa Catarina", uf: "SC" },
      { codigo: 21, nome: "Rio Grande do Sul", uf: "RS" },
    ]

    return NextResponse.json(estadosFallback)
  }
}
