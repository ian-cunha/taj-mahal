import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { headers } from "next/headers"; // Importar a função headers
import "./globals.css"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { obterEmpresa, obterConfiguracaoSite } from "@/lib/api"
import { DynamicStyles } from "@/components/dynamic-styles"

const inter = Inter({ subsets: ["latin"] })

// A função generateMetadata também precisa do token
export async function generateMetadata(): Promise<Metadata> {
  const headerList = await headers();
  const token = headerList.get("X-API-TOKEN");

  try {
    if (!token) throw new Error("API Token não encontrado para gerar metadata.");
    const empresa = await obterEmpresa(token)
    return {
      title: `${empresa.empresanomefantasia}`,
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
  const headerList = await headers();
  const token = headerList.get("X-API-TOKEN");
  let configuracao;

  // Se não houver token, não podemos carregar as configurações
  if (token) {
    try {
      configuracao = await obterConfiguracaoSite(token)
    } catch {
      configuracao = null
    }
  } else {
    configuracao = null;
  }

  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        {configuracao && <DynamicStyles config={configuracao} />}
        {/* Passamos o token para os componentes do layout */}
        <Header token={token} />
        <main className="min-h-screen">{children}</main>
        <Footer token={token} />
      </body>
    </html>
  )
}