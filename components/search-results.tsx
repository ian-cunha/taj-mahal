"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, Bed, Bath, Square, Heart } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { listarImoveis, formatarPreco, obterTipoImovelNome, criarFiltroImovel } from "@/lib/api"
import { Pagination } from "@/components/pagination"

interface SearchResultsProps {
  searchParams: {
    statusImovelStr?: string
    tipoImovel?: string
    termo?: string
    precoMinimo?: string
    precoMaximo?: string
    quartosMinimo?: string
    quartosMaximo?: string
    idEstado?: string
    idCidade?: string
    idBairros?: string
    page?: string
  }
}

export async function SearchResults({ searchParams }: SearchResultsProps) {
  const currentPage = Number.parseInt(searchParams.page || "1")
  const itemsPerPage = 12

  // Construir filtro mais simples
  const filtro = criarFiltroImovel({
    quantidadeImoveis: itemsPerPage,
    paginado: true,
    startpag: (currentPage - 1) * itemsPerPage,
    pagAtual: currentPage,
  })

  // Aplicar apenas filtros válidos
  if (searchParams.statusImovelStr) {
    filtro.statusImovelStr = searchParams.statusImovelStr
  }

  if (searchParams.tipoImovel && searchParams.tipoImovel !== "all") {
    filtro.tipoImovel = searchParams.tipoImovel
  }

  if (searchParams.termo) {
    filtro.termo = searchParams.termo
  }

  if (searchParams.precoMinimo) {
    filtro.precoMinimo = searchParams.precoMinimo
  }

  if (searchParams.precoMaximo) {
    filtro.precoMaximo = searchParams.precoMaximo
  }

  if (searchParams.quartosMinimo && searchParams.quartosMinimo !== "all") {
    filtro.quartosMinimo = searchParams.quartosMinimo
  }

  if (searchParams.quartosMaximo && searchParams.quartosMaximo !== "all") {
    filtro.quartosMaximo = searchParams.quartosMaximo
  }

  if (searchParams.idEstado && searchParams.idEstado !== "all") {
    filtro.idEstado = Number.parseInt(searchParams.idEstado)
  }

  if (searchParams.idCidade && searchParams.idCidade !== "all") {
    filtro.idCidade = Number.parseInt(searchParams.idCidade)
  }

  if (searchParams.idBairros && searchParams.idBairros !== "all") {
    filtro.idBairros = searchParams.idBairros.split(",").map(Number)
  }

  let imoveis = []
  let total = 0
  let error = null

  try {
    console.log("Filtro sendo usado:", filtro)
    imoveis = await listarImoveis(filtro)
    total = imoveis.length // Usar o tamanho da lista como total por enquanto
  } catch (err) {
    console.error("Erro na busca de imóveis:", err)
    error = err instanceof Error ? err.message : "Erro desconhecido"
  }

  // Se houve erro, mostrar dados de fallback
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

        {/* Imóveis de exemplo */}
        <div className="border-t pt-8">
          <h3 className="text-lg font-semibold mb-4 text-center">Imóveis em Destaque</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                id: "1",
                title: "Apartamento Moderno no Centro",
                price: "R$ 450.000",
                location: "Centro, São Paulo",
                bedrooms: 2,
                bathrooms: 2,
                area: 85,
                type: "Apartamento",
              },
              {
                id: "2",
                title: "Casa com Quintal",
                price: "R$ 680.000",
                location: "Vila Madalena, São Paulo",
                bedrooms: 3,
                bathrooms: 3,
                area: 150,
                type: "Casa",
              },
              {
                id: "3",
                title: "Studio Compacto",
                price: "R$ 280.000",
                location: "Liberdade, São Paulo",
                bedrooms: 1,
                bathrooms: 1,
                area: 45,
                type: "Studio",
              },
            ].map((property) => (
              <Card key={property.id} className="overflow-hidden">
                <div className="relative">
                  <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                    <p className="text-gray-500">Foto do Imóvel</p>
                  </div>
                  <div className="absolute top-4 left-4">
                    <Badge variant="secondary">{property.type}</Badge>
                  </div>
                  <div className="absolute top-4 right-4">
                    <Badge variant="default">Venda</Badge>
                  </div>
                </div>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{property.title}</CardTitle>
                    <span className="text-xl font-bold text-blue-600">{property.price}</span>
                  </div>
                  <CardDescription className="flex items-center">
                    <MapPin className="w-4 h-4 mr-1" />
                    {property.location}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <div className="flex items-center">
                        <Bed className="w-4 h-4 mr-1" />
                        {property.bedrooms}
                      </div>
                      <div className="flex items-center">
                        <Bath className="w-4 h-4 mr-1" />
                        {property.bathrooms}
                      </div>
                      <div className="flex items-center">
                        <Square className="w-4 h-4 mr-1" />
                        {property.area}m²
                      </div>
                    </div>
                  </div>
                  <Button className="w-full" disabled>
                    Ver Detalhes
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    )
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
    )
  }

  const totalPages = Math.ceil(total / itemsPerPage)

  return (
    <div>
      <div className="mb-6 flex justify-between items-center">
        <p className="text-gray-600">
          Encontrados {total} imóveis {currentPage > 1 && `(página ${currentPage} de ${totalPages})`}
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
  )
}
