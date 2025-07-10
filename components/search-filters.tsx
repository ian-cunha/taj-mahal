"use client"

import { useState, useEffect, useCallback } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Filter, RotateCcw, Search } from 'lucide-react'
import type { Estado, Cidade, Bairro } from '@/types/api'

// Tipos para os dados com contagem
type OpcaoComContagem = { id: string | number; nome: string; contagem: number };
type EstadoComContagem = Estado & { contagem: number };
type CidadeComContagem = Cidade & { contagem: number };
type BairroComContagem = Bairro & { contagem: number };


export function SearchFilters() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [options, setOptions] = useState({
    tipos: [] as OpcaoComContagem[],
    estados: [] as EstadoComContagem[],
    cidades: [] as CidadeComContagem[],
    bairros: [] as BairroComContagem[],
  })

  const [loading, setLoading] = useState({
    tipos: true, estados: true, cidades: false, bairros: false,
  })

  const [selectedFilters, setSelectedFilters] = useState({
    statusImovelStr: searchParams.get('statusImovelStr') || 'all',
    tipoImovel: searchParams.get('tipoImovel') || 'all',
    idEstado: searchParams.get('idEstado') || 'all',
    idCidade: searchParams.get('idCidade') || 'all',
    idBairros: searchParams.get('idBairros') || 'all',
  })

  const fetchData = useCallback(async (endpoint: string, setter: (data: any) => void, field: keyof typeof loading) => {
    setLoading(l => ({ ...l, [field]: true }))
    try {
      const res = await fetch(endpoint)
      if (res.ok) setter(await res.json())
      else setter([])
    } catch (e) {
      console.error(e); setter([])
    } finally {
      setLoading(l => ({ ...l, [field]: false }))
    }
  }, [])

  useEffect(() => {
    const { statusImovelStr, tipoImovel, idEstado, idCidade } = selectedFilters;

    const buildParams = (excludeKey: string = '') => {
      const params = new URLSearchParams();
      if (statusImovelStr && statusImovelStr !== 'all') params.set('statusImovelStr', statusImovelStr);
      if (tipoImovel !== 'all' && excludeKey !== 'tipoImovel') params.set('tipoImovel', tipoImovel);
      if (idEstado !== 'all' && excludeKey !== 'idEstado') params.set('idEstado', idEstado);
      if (idCidade !== 'all' && excludeKey !== 'idCidade') params.set('idCidade', idCidade);
      return params.toString();
    }

    fetchData(`/api/tipos-imoveis?${buildParams('tipoImovel')}`, (data) => setOptions(o => ({ ...o, tipos: data })), 'tipos');
    fetchData(`/api/localizacao/estados?${buildParams('idEstado')}`, (data) => setOptions(o => ({ ...o, estados: data })), 'estados');

    if (idEstado !== 'all') {
      fetchData(`/api/localizacao/cidades/${idEstado}?${buildParams('idCidade')}`, (data) => setOptions(o => ({ ...o, cidades: data })), 'cidades');
    } else {
      setOptions(o => ({ ...o, cidades: [], bairros: [] }));
    }

    if (idCidade !== 'all') {
      fetchData(`/api/localizacao/bairros/${idCidade}?${buildParams('idBairros')}`, (data) => setOptions(o => ({ ...o, bairros: data })), 'bairros');
    } else {
      setOptions(o => ({ ...o, bairros: [] }));
    }
  }, [selectedFilters, fetchData]);

  const handleSelectChange = (name: keyof typeof selectedFilters, value: string) => {
    let reset: Partial<typeof selectedFilters> = {}
    if (name === 'tipoImovel') reset = { idEstado: 'all', idCidade: 'all', idBairros: 'all' }
    if (name === 'idEstado') reset = { idCidade: 'all', idBairros: 'all' }
    if (name === 'idCidade') reset = { idBairros: 'all' }

    setSelectedFilters(prev => ({ ...prev, [name]: value, ...reset }))
  }

  const applyFilters = () => {
    const current = new URLSearchParams()
    Object.entries(selectedFilters).forEach(([key, value]) => {
      if (value && value !== 'all') current.set(key, value)
    })
    current.set('page', '1')
    router.push(`/busca?${current.toString()}`)
  }

  const clearFilters = () => {
    router.push('/busca')
  }

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle className="flex items-center gap-2"><Filter size={20} /> Filtros Dinâmicos</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 pt-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Select value={selectedFilters.tipoImovel} onValueChange={(v) => handleSelectChange('tipoImovel', v)} disabled={loading.tipos}>
            <SelectTrigger><SelectValue placeholder={loading.tipos ? "Carregando..." : "Tipo de Imóvel"} /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os Tipos</SelectItem>
              {options.tipos.map(t => <SelectItem key={t.id} value={String(t.id)}>{t.nome} ({t.contagem})</SelectItem>)}
            </SelectContent>
          </Select>

          <Select value={selectedFilters.idEstado} onValueChange={(v) => handleSelectChange('idEstado', v)} disabled={loading.estados}>
            <SelectTrigger><SelectValue placeholder={loading.estados ? "Carregando..." : "Estado"} /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os Estados</SelectItem>
              {options.estados.map(e => <SelectItem key={e.codigo} value={String(e.codigo)}>{e.nome} ({e.contagem})</SelectItem>)}
            </SelectContent>
          </Select>

          <Select value={selectedFilters.idCidade} onValueChange={(v) => handleSelectChange('idCidade', v)} disabled={loading.cidades || selectedFilters.idEstado === 'all'}>
            <SelectTrigger><SelectValue placeholder={loading.cidades ? "Carregando..." : "Cidade"} /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas as Cidades</SelectItem>
              {options.cidades.map(c => <SelectItem key={c.codigo} value={String(c.codigo)}>{c.cidade} ({c.contagem})</SelectItem>)}
            </SelectContent>
          </Select>

          <Select value={selectedFilters.idBairros} onValueChange={(v) => handleSelectChange('idBairros', v)} disabled={loading.bairros || selectedFilters.idCidade === 'all'}>
            <SelectTrigger><SelectValue placeholder={loading.bairros ? "Carregando..." : "Bairro"} /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os Bairros</SelectItem>
              {options.bairros.map(b => <SelectItem key={b.codigo} value={String(b.codigo)}>{b.bairro} ({b.contagem})</SelectItem>)}
            </SelectContent>
          </Select>
        </div>

        <div className="flex justify-end gap-4 pt-4">
          <Button onClick={clearFilters} variant="ghost"><RotateCcw size={16} className="mr-2" />Limpar Filtros</Button>
          <Button onClick={applyFilters}><Search size={16} className="mr-2" />Aplicar Filtros</Button>
        </div>
      </CardContent>
    </Card>
  )
}