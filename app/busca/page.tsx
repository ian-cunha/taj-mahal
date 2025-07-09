"use client"
import { Suspense } from "react"
import { SearchResults } from "@/components/search-results"
import { SearchFilters } from "@/components/search-filters"
import { LoadingSpinner } from "@/components/loading-spinner"

interface SearchPageProps {
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

const properties = [
  {
    id: 1,
    title: "Apartamento Moderno no Centro",
    price: "R$ 450.000",
    location: "Centro, São Paulo",
    bedrooms: 2,
    bathrooms: 2,
    area: 85,
    image: "/placeholder.svg?height=300&width=400",
    type: "Apartamento",
  },
  {
    id: 2,
    title: "Casa com Quintal em Condomínio",
    price: "R$ 680.000",
    location: "Vila Madalena, São Paulo",
    bedrooms: 3,
    bathrooms: 3,
    area: 150,
    image: "/placeholder.svg?height=300&width=400",
    type: "Casa",
  },
  {
    id: 3,
    title: "Cobertura com Vista Panorâmica",
    price: "R$ 1.200.000",
    location: "Moema, São Paulo",
    bedrooms: 4,
    bathrooms: 4,
    area: 200,
    image: "/placeholder.svg?height=300&width=400",
    type: "Cobertura",
  },
  {
    id: 4,
    title: "Studio Compacto e Funcional",
    price: "R$ 280.000",
    location: "Liberdade, São Paulo",
    bedrooms: 1,
    bathrooms: 1,
    area: 45,
    image: "/placeholder.svg?height=300&width=400",
    type: "Studio",
  },
]

export default function BuscaPage({ searchParams }: SearchPageProps) {
  return (
    <div className="py-8">
      <div className="container">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Buscar Imóveis</h1>
          <p className="text-lg text-gray-600">Encontre o imóvel perfeito para você</p>
        </div>

        <SearchFilters />

        <Suspense fallback={<LoadingSpinner />}>
          <SearchResults searchParams={searchParams} />
        </Suspense>
      </div>
    </div>
  )
}
