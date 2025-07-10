"use client"

import { useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useFilters, useCities, useBairros } from "@/lib/hooks/useFilters"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Filter, RotateCcw, Search } from "lucide-react"

export function SearchFilters() {
  const router = useRouter()
  const searchParams = useSearchParams()

  // Estado local para os valores dos filtros, inicializado com a URL
  const [filters, setFilters] = useState({
    statusImovelStr: searchParams.get("statusImovelStr") || "V",
    tipoImovel: searchParams.get("tipoImovel") || "all",
    idEstado: searchParams.get("idEstado") || "all",
    idCidade: searchParams.get("idCidade") || "all",
    idBairros: searchParams.get("idBairros") || "all",
  })

  // Usando nossos hooks centralizados para buscar dados
  const { tipos, estados, disponibilidade, isLoadingInitial } = useFilters();
  const { cidades, isLoadingCidades } = useCities(filters.idEstado, filters.tipoImovel, filters.statusImovelStr);
  const { bairros, isLoadingBairros } = useBairros(filters.idCidade, filters.tipoImovel);

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => {
      const updated = { ...prev, [key]: value };
      // Reseta os filtros dependentes
      if (key === 'idEstado') {
        updated.idCidade = 'all';
        updated.idBairros = 'all';
      }
      if (key === 'idCidade') {
        updated.idBairros = 'all';
      }
      return updated;
    });
  };

  const handleSearch = () => {
    const params = new URLSearchParams()
    // Adiciona apenas os filtros que têm valor e não são 'all'
    Object.entries(filters).forEach(([key, value]) => {
      if (value && value !== "all") {
        params.set(key, value)
      }
    });
    params.set('page', '1'); // Reinicia para a primeira página em nova busca
    router.push(`/busca?${params.toString()}`)
  }

  const clearFilters = () => {
    router.push('/busca');
  };

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle className="flex items-center gap-2"><Filter size={20} /> Filtros Personalizados</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 pt-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Tipo de Operação */}
          <Select value={filters.statusImovelStr} onValueChange={(v) => handleFilterChange('statusImovelStr', v)}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              {disponibilidade.temVenda && <SelectItem value="V">Comprar</SelectItem>}
              {disponibilidade.temLocacao && <SelectItem value="L">Alugar</SelectItem>}
            </SelectContent>
          </Select>

          {/* Tipo de Imóvel */}
          <Select value={filters.tipoImovel} onValueChange={(v) => handleFilterChange('tipoImovel', v)} disabled={isLoadingInitial}>
            <SelectTrigger><SelectValue placeholder={isLoadingInitial ? "Carregando..." : "Tipo de Imóvel"} /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os Tipos</SelectItem>
              {tipos.map((t: any) => <SelectItem key={t.id} value={String(t.id)}>{t.nome} ({t.contagem})</SelectItem>)}
            </SelectContent>
          </Select>

          {/* Estado */}
          <Select value={filters.idEstado} onValueChange={(v) => handleFilterChange('idEstado', v)} disabled={isLoadingInitial}>
            <SelectTrigger><SelectValue placeholder={isLoadingInitial ? "Carregando..." : "Estado"} /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os Estados</SelectItem>
              {estados.map((e: any) => <SelectItem key={e.codigo} value={String(e.codigo)}>{e.nome}</SelectItem>)}
            </SelectContent>
          </Select>

          {/* Cidade */}
          <Select value={filters.idCidade} onValueChange={(v) => handleFilterChange('idCidade', v)} disabled={isLoadingCidades || filters.idEstado === 'all'}>
            <SelectTrigger><SelectValue placeholder={isLoadingCidades ? "Carregando..." : "Cidade"} /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas as Cidades</SelectItem>
              {cidades.map((c: any) => <SelectItem key={c.codigo} value={String(c.codigo)}>{c.cidade} ({c.contagem})</SelectItem>)}
            </SelectContent>
          </Select>

          {/* Bairro */}
          <Select value={filters.idBairros} onValueChange={(v) => handleFilterChange('idBairros', v)} disabled={isLoadingBairros || filters.idCidade === 'all'}>
            <SelectTrigger><SelectValue placeholder={isLoadingBairros ? "Carregando..." : "Bairro"} /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os Bairros</SelectItem>
              {bairros.map((b: any) => <SelectItem key={b.codigo} value={String(b.codigo)}>{b.bairro} ({b.contagem})</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
        <div className="flex justify-end gap-4 pt-4">
          <Button onClick={clearFilters} variant="ghost"><RotateCcw size={16} className="mr-2" />Limpar</Button>
          <Button onClick={handleSearch}><Search size={16} className="mr-2" />Buscar</Button>
        </div>
      </CardContent>
    </Card>
  )
}