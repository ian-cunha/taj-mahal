import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { obterEmpresa, obterConfiguracaoSite } from "@/lib/api"
import { DynamicStyles } from "@/components/dynamic-styles"

const inter = Inter({ subsets: ["latin"] })

export async function generateMetadata(): Promise<Metadata> {
  try {
    const empresa = await obterEmpresa()
    return {
      title: `${empresa.empresanomefantasia} - Imóveis`,
      description: `Encontre o imóvel dos seus sonhos com ${empresa.empresanomefantasia}. Compra, venda e financiamento de imóveis.`,
    }
  } catch {
    return {
      title: "Taj Mahal - RE.AI.s Modelo",
      description: "Encontre o imóvel dos seus sonhos. Compra, venda e financiamento de imóveis.",
    }
  }
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  let configuracao
  try {
    configuracao = await obterConfiguracaoSite()
  } catch {
    configuracao = null
  }

  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        {configuracao && <DynamicStyles config={configuracao} />}
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
