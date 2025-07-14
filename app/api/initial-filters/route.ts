import {
    criarFiltroImovel,
    listarImoveis,
    obterEstados,
    obterTotalImoveis
} from "@/lib/api";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import type { Imovel, Estado } from "@/types/api";

export const revalidate = 3600; // Cache por 1 hora

const TODOS_OS_TIPOS = [
    { id: "1", nome: "Apartamento" }, { id: "2", nome: "Casa" },
    { id: "3", nome: "Loja" }, { id: "4", nome: "Terreno/Loteamento" },
    { id: "5", nome: "Galpão/Prédio Comercial" }, { id: "6", nome: "Sala Comercial" },
    { id: "7", nome: "Rural" }, { id: "8", nome: "Flat/Studio" },
    { id: "9", nome: "Hotel/Pousada" }, { id: "10", nome: "Restaurante/Lanchonete" },
];

async function getTiposComContagem(filtro: any) {
    const imoveis = await listarImoveis(filtro);
    const contagemPorTipo: Record<string, number> = {};
    imoveis.forEach((imovel: Imovel) => {
        if (imovel.idTipoImovel) {
            contagemPorTipo[imovel.idTipoImovel] = (contagemPorTipo[imovel.idTipoImovel] || 0) + 1;
        }
    });
    return TODOS_OS_TIPOS
        .map(tipo => ({ ...tipo, contagem: contagemPorTipo[tipo.id] || 0 }))
        .filter(tipo => tipo.contagem > 0);
}

async function getEstadosComContagem(filtro: any) {
    const [estados, imoveis] = await Promise.all([
        obterEstados(),
        listarImoveis(filtro)
    ]);
    const contagemPorEstado: Record<string, number> = {};
    imoveis.forEach((imovel: Imovel) => {
        if (imovel.siglaEstado) {
            contagemPorEstado[imovel.siglaEstado] = (contagemPorEstado[imovel.siglaEstado] || 0) + 1;
        }
    });
    return estados
        .map(estado => ({ ...estado, contagem: contagemPorEstado[estado.uf] || 0 }))
        .filter(estado => estado.contagem > 0);
}

async function getDisponibilidade() {
    const [totalVenda, totalLocacao] = await Promise.all([
        obterTotalImoveis(criarFiltroImovel({ quantidadeImoveis: 1, statusImovelStr: "V", paginado: false })),
        obterTotalImoveis(criarFiltroImovel({ quantidadeImoveis: 1, statusImovelStr: "L", paginado: false })),
    ]);
    return {
        temVenda: totalVenda > 0,
        temLocacao: totalLocacao > 0,
    };
}


export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const statusImovelStr = searchParams.get('statusImovelStr');

        const filtro = criarFiltroImovel({ quantidadeImoveis: 9999, paginado: false });

        if (statusImovelStr) {
            filtro.statusImovelStr = statusImovelStr;
        }

        const [tipos, estados, disponibilidade] = await Promise.all([
            getTiposComContagem(filtro),
            getEstadosComContagem(filtro),
            getDisponibilidade()
        ]);

        return NextResponse.json({
            tipos,
            estados,
            disponibilidade
        });

    } catch (error) {
        console.error("Erro ao buscar filtros iniciais:", error);
        return new NextResponse(
            JSON.stringify({ message: "Erro ao buscar opções de filtro" }),
            { status: 500 }
        );
    }
}