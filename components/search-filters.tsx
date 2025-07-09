"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Filter, Search, RotateCcw } from "lucide-react"
import type { Estado, Cidade, Bairro } from "@/types/api"

type DisponibilidadeOperacao = { temVenda: boolean; temLocacao: boolean }

export function SearchFilters() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [disponibilidade, setDisponibilidade] = useState<DisponibilidadeOperacao>({
    temVenda: true,
    temLocacao: true,
  })
  const [loadingDisponibilidade, setLoadingDisponibilidade] = useState(true)

  const [estados, setEstados] = useState<Estado[]>([])
  const [cidades, setCidades] = useState<Cidade[]>([])
  const [bairros, setBairros] = useState<Bairro[]>([])
  const [loading, setLoading] = useState(false)

  const [filters, setFilters] = useState({
    statusImovelStr: searchParams.get("statusImovelStr") || "V",
    tipoImovel: searchParams.get("tipoImovel") || "all",
    termo: searchParams.get("termo") || "",
    precoMinimo: searchParams.get("precoMinimo") || "",
    precoMaximo: searchParams.get("precoMaximo") || "",
    quartosMinimo: searchParams.get("quartosMinimo") || "all",
    quartosMaximo: searchParams.get("quartosMaximo") || "all",
    idEstado: searchParams.get("idEstado") || "all",
    idCidade: searchParams.get("idCidade") || "all",
    idBairros: searchParams.get("idBairros") || "all",
  })

  // Verificar disponibilidade de operações
  useEffect(() => {
    const check = async () => {
      try {
        const res = await fetch("/api/disponibilidade")
        const data: DisponibilidadeOperacao = await res.json()
        setDisponibilidade(data)
        if (data.temVenda && !data.temLocacao) setFilters((f) => ({ ...f, statusImovelStr: "V" }))
        if (!data.temVenda && data.temLocacao) setFilters((f) => ({ ...f, statusImovelStr: "L" }))
      } catch (e) {
        console.error("Disponibilidade fallback", e)
      } finally {
        setLoadingDisponibilidade(false)
      }
    }
    check()
  }, [])

  // Fetch via rotas internas com fallback
  const fetchEstados = async () => {
    try {
      const res = await fetch("/api/localizacao/estados")
      if (res.ok) {
        const data = await res.json()
        setEstados(data)
      }
    } catch (error) {
      console.error("Erro ao carregar estados:", error)
    }
  }

  const fetchCidades = async (estado: string) => {
    try {
      const res = await fetch(`/api/localizacao/cidades/${estado}`)
      if (res.ok) {
        const data = await res.json()
        setCidades(data)
      }
    } catch (error) {
      console.error("Erro ao carregar cidades:", error)
      setCidades([])
    }
  }

  const fetchBairros = async (cidade: string) => {
    try {
      const res = await fetch(`/api/localizacao/bairros/${cidade}`)
      if (res.ok) {
        const data = await res.json()
        setBairros(data)
      }
    } catch (error) {
      console.error("Erro ao carregar bairros:", error)
      setBairros([])
    }
  }

  useEffect(() => {
    fetchEstados()
  }, [])

  useEffect(() => {
    if (filters.idEstado !== "all") {
      fetchCidades(filters.idEstado)
    } else {
      setCidades([])
      setBairros([])
    }
  }, [filters.idEstado])

  useEffect(() => {
    if (filters.idCidade !== "all") {
      fetchBairros(filters.idCidade)
    } else {
      setBairros([])
    }
  }, [filters.idCidade])

  const handleSearch = () => {
    setLoading(true)
    const params = new URLSearchParams()
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== "all" && value !== "") params.set(key, value)
    })
    router.push(`/busca?${params.toString()}`)
  }

  const clearFilters = () => {
    const defaultTipo = disponibilidade.temVenda ? "V" : disponibilidade.temLocacao ? "L" : "V"
    setFilters({
      statusImovelStr: defaultTipo,
      tipoImovel: "all",
      termo: "",
      precoMinimo: "",
      precoMaximo: "",
      quartosMinimo: "all",
      quartosMaximo: "all",
      idEstado: "all",
      idCidade: "all",
      idBairros: "all",
    })
  }

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Filter className="w-5 h-5 mr-2" />
          Filtros de Busca
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Tipo de Operação */}
        {!loadingDisponibilidade && (disponibilidade.temVenda || disponibilidade.temLocacao) && (
          <div className="flex gap-2">
            {disponibilidade.temVenda && (
              <Button
                variant={filters.statusImovelStr === "V" ? "default" : "outline"}
                onClick={() => setFilters({ ...filters, statusImovelStr: "V" })}
                className="flex-1"
              >
                Comprar
              </Button>
            )}
            {disponibilidade.temLocacao && (
              <Button
                variant={filters.statusImovelStr === "L" ? "default" : "outline"}
                onClick={() => setFilters({ ...filters, statusImovelStr: "L" })}
                className="flex-1"
              >
                Alugar
              </Button>
            )}
          </div>
        )}

        {/* Loading state para botões */}
        {loadingDisponibilidade && (
          <div className="flex gap-2">
            <div className="animate-pulse bg-gray-200 h-10 flex-1 rounded"></div>
            <div className="animate-pulse bg-gray-200 h-10 flex-1 rounded"></div>
          </div>
        )}

        {/* Mensagem quando não há imóveis */}
        {!loadingDisponibilidade && !disponibilidade.temVenda && !disponibilidade.temLocacao && (
          <div className="text-center py-4 bg-gray-50 rounded-lg">
            <p className="text-gray-600">Nenhum imóvel disponível no momento.</p>
            <p className="text-sm text-gray-500">Entre em contato para mais informações.</p>
          </div>
        )}

        {/* Busca por termo */}
        <div>
          <Label htmlFor="termo">Buscar por</Label>
          <Input
            id="termo"
            placeholder="Digite o nome do imóvel, bairro ou cidade..."
            value={filters.termo}
            onChange={(e) => setFilters({ ...filters, termo: e.target.value })}
          />
        </div>

        {/* Tipo de Imóvel */}
        <div>
          <Label htmlFor="tipoImovel">Tipo de Imóvel</Label>
          <Select value={filters.tipoImovel} onValueChange={(value) => setFilters({ ...filters, tipoImovel: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Todos os tipos" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os tipos</SelectItem>
              <SelectItem value="1">Apartamento</SelectItem>
              <SelectItem value="2">Casa</SelectItem>
              <SelectItem value="4">Terreno</SelectItem>
              <SelectItem value="3">Loja</SelectItem>
              <SelectItem value="6">Sala Comercial</SelectItem>
              <SelectItem value="8">Flat/Studio</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Localização */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label htmlFor="estado">Estado</Label>
            <Select
              value={filters.idEstado}
              onValueChange={(value) => setFilters({ ...filters, idEstado: value, idCidade: "all", idBairros: "all" })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione o estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os estados</SelectItem>
                {estados.map((estado) => (
                  <SelectItem key={estado.codigo} value={estado.codigo.toString()}>
                    {estado.nome}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="cidade">Cidade</Label>
            <Select
              value={filters.idCidade}
              onValueChange={(value) => setFilters({ ...filters, idCidade: value, idBairros: "all" })}
              disabled={filters.idEstado === "all"}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione a cidade" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas as cidades</SelectItem>
                {cidades.map((cidade) => (
                  <SelectItem key={cidade.codigo} value={cidade.codigo.toString()}>
                    {cidade.cidade}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="bairro">Bairro</Label>
            <Select
              value={filters.idBairros}
              onValueChange={(value) => setFilters({ ...filters, idBairros: value })}
              disabled={filters.idCidade === "all"}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione o bairro" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os bairros</SelectItem>
                {bairros.map((bairro) => (
                  <SelectItem key={bairro.codigo} value={bairro.codigo.toString()}>
                    {bairro.bairro}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Preço */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="precoMinimo">Preço Mínimo</Label>
            <Input
              id="precoMinimo"
              type="number"
              placeholder="0"
              value={filters.precoMinimo}
              onChange={(e) => setFilters({ ...filters, precoMinimo: e.target.value })}
            />
          </div>
          <div>
            <Label htmlFor="precoMaximo">Preço Máximo</Label>
            <Input
              id="precoMaximo"
              type="number"
              placeholder="1000000"
              value={filters.precoMaximo}
              onChange={(e) => setFilters({ ...filters, precoMaximo: e.target.value })}
            />
          </div>
        </div>

        {/* Quartos */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="quartosMinimo">Quartos (mínimo)</Label>
            <Select
              value={filters.quartosMinimo}
              onValueChange={(value) => setFilters({ ...filters, quartosMinimo: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Qualquer" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Qualquer</SelectItem>
                <SelectItem value="1">1+ quartos</SelectItem>
                <SelectItem value="2">2+ quartos</SelectItem>
                <SelectItem value="3">3+ quartos</SelectItem>
                <SelectItem value="4">4+ quartos</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="quartosMaximo">Quartos (máximo)</Label>
            <Select
              value={filters.quartosMaximo}
              onValueChange={(value) => setFilters({ ...filters, quartosMaximo: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Qualquer" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Qualquer</SelectItem>
                <SelectItem value="1">Até 1 quarto</SelectItem>
                <SelectItem value="2">Até 2 quartos</SelectItem>
                <SelectItem value="3">Até 3 quartos</SelectItem>
                <SelectItem value="4">Até 4 quartos</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Botões */}
        <div className="flex gap-4 pt-4">
          <Button
            onClick={handleSearch}
            className="flex-1"
            disabled={loading || loadingDisponibilidade || (!disponibilidade.temVenda && !disponibilidade.temLocacao)}
          >
            <Search className="w-4 h-4 mr-2" />
            {loading ? "Buscando..." : "Buscar"}
          </Button>
          <Button onClick={clearFilters} variant="outline">
            <RotateCcw className="w-4 h-4 mr-2" />
            Limpar
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
