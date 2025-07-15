import { criarFiltroImovel, listarImoveis } from "@/lib/api";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import type { Imovel } from "@/types/api";

export async function GET(request: NextRequest) {
    const token = request.headers.get("X-API-TOKEN");

    if (!token) {
        return new NextResponse(
            JSON.stringify({ message: "Token de API não fornecido." }),
            { status: 401, headers: { 'Content-Type': 'application/json' } }
        );
    }

    try {
        const { searchParams } = new URL(request.url);

        const filtro: any = criarFiltroImovel(token, { quantidadeImoveis: 9999, paginado: false });

        if (searchParams.get('tipoImovel') && searchParams.get('tipoImovel') !== 'all') filtro.tipoImovel = searchParams.get('tipoImovel');
        if (searchParams.get('idEstado') && searchParams.get('idEstado') !== 'all') filtro.idEstado = Number(searchParams.get('idEstado'));
        if (searchParams.get('idCidade') && searchParams.get('idCidade') !== 'all') filtro.idCidade = Number(searchParams.get('idCidade'));
        if (searchParams.get('idBairros') && searchParams.get('idBairros') !== 'all') filtro.idBairros = [Number(searchParams.get('idBairros'))];

        const imoveis = await listarImoveis(filtro);

        const quartosOpcoes = new Set<string>();
        let precoMin = Infinity;
        let precoMax = 0;

        imoveis.forEach((imovel: Imovel) => {
            if (imovel.nquartos && Number(imovel.nquartos) > 0) {
                quartosOpcoes.add(imovel.nquartos);
            }
            if (imovel.preco > 0) {
                if (imovel.preco < precoMin) precoMin = imovel.preco;
                if (imovel.preco > precoMax) precoMax = imovel.preco;
            }
        });

        if (precoMin === Infinity) precoMin = 0;

        const availableBedrooms = Array.from(quartosOpcoes).map(Number).sort((a, b) => a - b);

        return NextResponse.json({
            availableBedrooms,
            priceRange: {
                min: precoMin,
                max: precoMax,
            },
        });

    } catch (error) {
        console.error("Proxy erro filter-options:", error);
        return new NextResponse(
            JSON.stringify({ message: "Erro ao buscar opções de filtro" }),
            { status: 500 }
        );
    }
}