import { notFound } from "next/navigation"
import { Suspense } from "react"
import { ImovelDetails } from "@/components/imovel-details"
import { LoadingSpinner } from "@/components/loading-spinner"
import { obterImovel } from "@/lib/api"

interface ImovelPageProps {
  params: {
    codigo: string
  }
}

export async function generateMetadata({ params }: ImovelPageProps) {
  try {
    const imovel = await obterImovel(params.codigo)
    return {
      title: `${imovel.nomeImovel} - Taj Mahal`,
      description: imovel.descricao || `${imovel.nomeImovel} em ${imovel.nomeBairro}, ${imovel.nomeCidade}`,
    }
  } catch {
    return {
      title: "Imóvel não encontrado",
      description: "O imóvel solicitado não foi encontrado.",
    }
  }
}

export default async function ImovelPage({ params }: ImovelPageProps) {
  try {
    const imovel = await obterImovel(params.codigo)

    return (
      <div className="py-8">
        <div className="container">
          <Suspense fallback={<LoadingSpinner />}>
            <ImovelDetails imovel={imovel} />
          </Suspense>
        </div>
      </div>
    )
  } catch {
    notFound()
  }
}
