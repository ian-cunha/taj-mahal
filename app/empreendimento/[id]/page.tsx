import { notFound } from "next/navigation"
import { Suspense } from "react"
import { EmpreendimentoDetails } from "@/components/empreendimento-details"
import { LoadingSpinner } from "@/components/loading-spinner"
import { obterEmpreendimento, obterEmpresa } from "@/lib/api"
import type { Metadata } from "next"

interface EmpreendimentoPageProps {
    params: {
        id: string
    }
}

export async function generateMetadata({ params }: EmpreendimentoPageProps): Promise<Metadata> {
    try {
        const id = Number(params.id);
        if (isNaN(id)) {
            return { title: "Empreendimento Inválido" };
        }
        const [empreendimento, empresa] = await Promise.all([
            obterEmpreendimento(id),
            obterEmpresa()
        ]);

        const companyName = empresa?.empresanomefantasia ?? "Taj Mahal";
        return {
            title: `${empreendimento.nome} - ${companyName}`,
            description: empreendimento.diferenciais || `Conheça o empreendimento ${empreendimento.nome} em ${empreendimento.nomeBairro}, ${empreendimento.nomeCidade}.`,
        }
    } catch {
        return {
            title: "Empreendimento não encontrado",
            description: "O empreendimento solicitado não foi encontrado.",
        }
    }
}

export default async function EmpreendimentoPage({ params }: EmpreendimentoPageProps) {
    try {
        const id = Number(params.id);
        if (isNaN(id)) {
            notFound();
        }
        const empreendimento = await obterEmpreendimento(id)

        return (
            <div className="py-8 bg-gray-50">
                <div className="container">
                    <Suspense fallback={<LoadingSpinner />}>
                        <EmpreendimentoDetails empreendimento={empreendimento} />
                    </Suspense>
                </div>
            </div>
        )
    } catch {
        notFound()
    }
}