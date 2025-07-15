import { headers } from "next/headers";
import { notFound } from "next/navigation"
import { Suspense } from "react"
import { ImovelDetails } from "@/components/imovel-details"
import { LoadingSpinner } from "@/components/loading-spinner"
import { obterImovel, obterEmpresa } from "@/lib/api"

interface ImovelPageProps {
  params: {
    codigo: string
  }
}

export async function generateMetadata({ params }: ImovelPageProps) {
  const headerList = await headers();
  const token = headerList.get("X-API-TOKEN");

  if (!token) {
    return { title: "Imóvel não encontrado" };
  }

  try {
    const imovel = await obterImovel(params.codigo, token);
    const empresa = await obterEmpresa(token);
    const companyName = empresa?.empresanomefantasia ?? "Taj Mahal";
    return {
      title: `${imovel.nomeImovel} - ${companyName}`,
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
  const headerList = await headers();
  const token = headerList.get("X-API-TOKEN");

  if (!token) {
    notFound();
  }

  try {
    const [imovel, empresa] = await Promise.all([
      obterImovel(params.codigo, token),
      obterEmpresa(token)
    ]);

    return (
      <div className="py-8">
        <div className="container">
          <Suspense fallback={<LoadingSpinner />}>
            <ImovelDetails imovel={imovel} empresa={empresa} />
          </Suspense>
        </div>
      </div>
    )
  } catch {
    notFound()
  }
}