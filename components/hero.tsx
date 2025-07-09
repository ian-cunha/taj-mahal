"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Search, MapPin, Home, DollarSign } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type DisponibilidadeOperacao = { temVenda: boolean; temLocacao: boolean }

export function Hero() {
  const router = useRouter()
  const [disponibilidade, setDisponibilidade] = useState<DisponibilidadeOperacao>({
    temVenda: true,
    temLocacao: true,
  })
  const [loading, setLoading] = useState(true)

  const [searchData, setSearchData] = useState({
    tipo: "V", // V para Venda, L para Locação
    tipoImovel: "",
    localizacao: "",
    precoRange: "",
  })

  useEffect(() => {
    const check = async () => {
      try {
        const res = await fetch("/api/disponibilidade")
        const data: DisponibilidadeOperacao = await res.json()
        setDisponibilidade(data)
        if (data.temVenda && !data.temLocacao) setSearchData((s) => ({ ...s, tipo: "V" }))
        if (!data.temVenda && data.temLocacao) setSearchData((s) => ({ ...s, tipo: "L" }))
      } catch (e) {
        console.error("Disponibilidade fallback", e)
      } finally {
        setLoading(false)
      }
    }
    check()
  }, [])

  const handleSearch = () => {
    const params = new URLSearchParams()

    if (searchData.tipo) params.set("statusImovelStr", searchData.tipo)
    if (searchData.tipoImovel) params.set("tipoImovel", searchData.tipoImovel)
    if (searchData.localizacao) params.set("termo", searchData.localizacao)
    if (searchData.precoRange) {
      const [min, max] = searchData.precoRange.split("-")
      if (min) params.set("precoMinimo", min)
      if (max) params.set("precoMaximo", max)
    }

    router.push(`/busca?${params.toString()}`)
  }

  return (
    <section className="relative bg-gradient-to-r from-blue-600 to-blue-800">
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="relative container py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">Encontre o Imóvel dos Seus Sonhos</h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100">
            Com a RE.AI.s, você encontra as melhores oportunidades do mercado imobiliário
          </p>

          {/* Search Form */}
          <div className="bg-white rounded-lg p-6 shadow-xl">
            {/* Botões de Tipo de Operação */}
            {!loading && (disponibilidade.temVenda || disponibilidade.temLocacao) && (
              <div className="flex flex-wrap gap-4 mb-4">
                {disponibilidade.temVenda && (
                  <Button
                    variant={searchData.tipo === "V" ? "default" : "outline"}
                    onClick={() => setSearchData({ ...searchData, tipo: "V" })}
                    className="flex-1 min-w-[120px]"
                  >
                    <Home className="w-4 h-4 mr-2" />
                    Comprar
                  </Button>
                )}
                {disponibilidade.temLocacao && (
                  <Button
                    variant={searchData.tipo === "L" ? "default" : "outline"}
                    onClick={() => setSearchData({ ...searchData, tipo: "L" })}
                    className="flex-1 min-w-[120px]"
                  >
                    <DollarSign className="w-4 h-4 mr-2" />
                    Alugar
                  </Button>
                )}
              </div>
            )}

            {/* Loading state */}
            {loading && (
              <div className="flex justify-center mb-4">
                <div className="animate-pulse flex space-x-4">
                  <div className="bg-gray-200 h-10 w-32 rounded"></div>
                  <div className="bg-gray-200 h-10 w-32 rounded"></div>
                </div>
              </div>
            )}

            {/* Mensagem quando não há imóveis */}
            {!loading && !disponibilidade.temVenda && !disponibilidade.temLocacao && (
              <div className="text-center py-4 mb-4">
                <p className="text-gray-600">Nenhum imóvel disponível no momento.</p>
                <p className="text-sm text-gray-500">Entre em contato para mais informações.</p>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Select
                value={searchData.tipoImovel}
                onValueChange={(value) => setSearchData({ ...searchData, tipoImovel: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Tipo de Imóvel" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Apartamento</SelectItem>
                  <SelectItem value="2">Casa</SelectItem>
                  <SelectItem value="4">Terreno</SelectItem>
                  <SelectItem value="3">Loja</SelectItem>
                  <SelectItem value="6">Sala Comercial</SelectItem>
                  <SelectItem value="8">Flat/Studio</SelectItem>
                </SelectContent>
              </Select>

              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Localização"
                  className="pl-10"
                  value={searchData.localizacao}
                  onChange={(e) => setSearchData({ ...searchData, localizacao: e.target.value })}
                />
              </div>

              <Select
                value={searchData.precoRange}
                onValueChange={(value) => setSearchData({ ...searchData, precoRange: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Preço" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0-200000">Até R$ 200.000</SelectItem>
                  <SelectItem value="200000-500000">R$ 200.000 - R$ 500.000</SelectItem>
                  <SelectItem value="500000-1000000">R$ 500.000 - R$ 1.000.000</SelectItem>
                  <SelectItem value="1000000-">Acima de R$ 1.000.000</SelectItem>
                </SelectContent>
              </Select>

              <Button
                className="btn-primary"
                onClick={handleSearch}
                disabled={loading || (!disponibilidade.temVenda && !disponibilidade.temLocacao)}
              >
                <Search className="w-4 h-4 mr-2" />
                Buscar
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
