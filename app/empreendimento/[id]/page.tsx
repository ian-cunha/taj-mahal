import { headers } from "next/headers";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { EmpreendimentoDetails } from "@/components/empreendimento-details";
import { LoadingSpinner } from "@/components/loading-spinner";
import { obterEmpreendimento } from "@/lib/api";
import type { Metadata } from "next";
import type { Empreendimento } from "@/types/api";

interface EmpreendimentoPageProps {
    params: {
        id: string
    }
}

export async function generateMetadata({ params }: EmpreendimentoPageProps): Promise<Metadata> {
    const headerList = await headers();
    const token = headerList.get("X-API-TOKEN");

    if (!token) return { title: "Empreendimento não encontrado" };

    try {
        const id = Number(params.id);
        if (isNaN(id)) return { title: "Empreendimento Inválido" };

        const empreendimento = await obterEmpreendimento(id, token);

        return {
            title: `${empreendimento.nome} - Empreendimentos`,
            description: empreendimento.diferenciais || `Conheça o empreendimento ${empreendimento.nome}.`,
        }
    } catch {
        return {
            title: "Empreendimento não encontrado",
            description: "O empreendimento que você procura não foi encontrado.",
        }
    }
}

export default async function EmpreendimentoPage({ params }: EmpreendimentoPageProps) {
    const headerList = await headers();
    const token = headerList.get("X-API-TOKEN");

    if (!token) {
        // Se não há token, não podemos encontrar o empreendimento.
        notFound();
    }

    try {
        const id = Number(params.id);
        if (isNaN(id)) {
            notFound();
        }
        const empreendimento = await obterEmpreendimento(id, token);

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
        // Se a API falhar (ex: empreendimento não existe), a página 404 é exibida.
        notFound();
    }
}