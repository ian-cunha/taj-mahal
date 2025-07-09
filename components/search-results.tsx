"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Bed, Bath, Square, Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { formatarPreco, obterTipoImovelNome } from "@/lib/api";
import { Pagination } from "@/components/pagination";
import type { Imovel } from "@/types/api";

interface SearchResultsProps {
  imoveis: Imovel[];
  total: number;
  error: string | null;
  currentPage: number;
  totalPages: number;
}

export function SearchResults({ imoveis, total, error, currentPage, totalPages }: SearchResultsProps) {
  if (error) {
    return (
      <div className="space-y-6">
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
          <p className="text-orange-800 font-medium">⚠️ Problema na busca</p>
          <p className="text-orange-700 text-sm mt-1">{error}</p>
        </div>
        <div className="text-center py-8">
          <p className="text-gray-600 mb-4">Não foi possível carregar os imóveis no momento.</p>
          <div className="flex gap-4 justify-center">
            <Button onClick={() => window.location.reload()} variant="outline">
              Tentar Novamente
            </Button>
            <Link href="/busca">
              <Button variant="outline">Limpar Filtros</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (imoveis.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600 mb-4">Nenhum imóvel encontrado com os filtros selecionados.</p>
        <p className="text-sm text-gray-500 mb-4">Tente ajustar os filtros de busca.</p>
        <Link href="/busca">
          <Button variant="outline">Limpar Filtros</Button>
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6 flex justify-between items-center">
        <p className="text-gray-600">
          Encontrados {total} imóveis {totalPages > 1 && `(página ${currentPage} de ${totalPages})`}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
        {imoveis.map((imovel) => (
          <Card key={imovel.codigoImovel} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <div className="relative">
              <Image
                src={imovel.urlFotoDestaque || "/placeholder.svg?height=300&width=400"}
                alt={imovel.nomeImovel}
                width={400}
                height={300}
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-4 left-4">
                <Badge variant="secondary">{obterTipoImovelNome(imovel.idTipoImovel)}</Badge>
              </div>
              <div className="absolute top-4 right-4">
                <Badge variant={imovel.tipoOperacao === "V" ? "default" : "destructive"}>
                  {imovel.tipoOperacao === "V" ? "Venda" : "Locação"}
                </Badge>
              </div>
              <Button variant="ghost" size="icon" className="absolute bottom-4 right-4 bg-white/80 hover:bg-white">
                <Heart className="w-4 h-4" />
              </Button>
            </div>

            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg line-clamp-2">{imovel.nomeImovel}</CardTitle>
                <span className="text-xl font-bold text-blue-600">{formatarPreco(imovel.preco)}</span>
              </div>
              <CardDescription className="flex items-center">
                <MapPin className="w-4 h-4 mr-1" />
                {imovel.nomeBairro}, {imovel.nomeCidade}
              </CardDescription>
            </CardHeader>

            <CardContent>
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <div className="flex items-center">
                    <Bed className="w-4 h-4 mr-1" />
                    {imovel.nquartos}
                  </div>
                  <div className="flex items-center">
                    <Bath className="w-4 h-4 mr-1" />
                    {imovel.nbanheirossociais}
                  </div>
                  <div className="flex items-center">
                    <Square className="w-4 h-4 mr-1" />
                    {imovel.areautil}m²
                  </div>
                </div>
              </div>
              <Link href={`/imovel/${imovel.codigoImovel}`}>
                <Button className="w-full">Ver Detalhes</Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>

      {totalPages > 1 && <Pagination currentPage={currentPage} totalPages={totalPages} />}
    </div>
  );
}