import { criarFiltroImovel, listarImoveis } from "@/lib/api";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import type { Imovel } from "@/types/api";

export const revalidate = 3600; // Cache por 1 hora

const TODOS_OS_TIPOS = [
    { id: "1", nome: "Apartamento" }, { id: "2", nome: "Casa" },
    { id: "3", nome: "Loja" }, { id: "4", nome: "Terreno/Loteamento" },
    { id: "5", nome: "Galpão/Prédio Comercial" }, { id: "6", nome: "Sala Comercial" },
    { id: "7", nome: "Rural" }, { id: "8", nome: "Flat/Studio" },
    { id: "9", nome: "Hotel/Pousada" }, { id: "10", nome: "Restaurante/Lanchonete" },
];

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);

        // Cria o filtro base
        const filtro = criarFiltroImovel({ quantidadeImoveis: 9999, paginado: false });

        // Adiciona filtros de localização e operação se eles existirem na URL
        const idEstado = searchParams.get('idEstado');
        const idCidade = searchParams.get('idCidade');
        const statusImovelStr = searchParams.get('statusImovelStr');

        if (idEstado && idEstado !== 'all') filtro.idEstado = Number(idEstado);
        if (idCidade && idCidade !== 'all') filtro.idCidade = Number(idCidade);
        if (statusImovelStr) filtro.statusImovelStr = statusImovelStr;


        const imoveis = await listarImoveis(filtro);

        const contagemPorTipo: Record<string, number> = {};
        imoveis.forEach((imovel: Imovel) => {
            if (imovel.idTipoImovel) {
                contagemPorTipo[imovel.idTipoImovel] = (contagemPorTipo[imovel.idTipoImovel] || 0) + 1;
            }
        });

        const tiposComContagem = TODOS_OS_TIPOS
            .map(tipo => ({
                ...tipo,
                contagem: contagemPorTipo[tipo.id] || 0,
            }))
            .filter(tipo => tipo.contagem > 0);

        return NextResponse.json(tiposComContagem);

    } catch (error) {
        console.error("Proxy erro tipos de imóveis:", error);
        return new NextResponse(
            JSON.stringify({ message: "Erro ao buscar tipos de imóveis" }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
    }
}