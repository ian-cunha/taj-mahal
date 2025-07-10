"use client"

import { useState, useEffect, useCallback } from "react"
import { useRouter } from "next/navigation"
import { Search, Home, DollarSign } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { Estado, Cidade } from "@/types/api"

// Tipos para os dados que o componente recebe
type DisponibilidadeOperacao = { temVenda: boolean; temLocacao: boolean }
type OpcaoComContagem = { id: string | number; nome: string; contagem: number };
type EstadoComContagem = Estado & { contagem: number };
type CidadeComContagem = Cidade & { contagem: number };

interface HeroClientProps {
  companyName: string;
  videoUrl?: string | null;
  imageUrl?: string | null;
}

export function HeroClient({ companyName, videoUrl, imageUrl }: HeroClientProps) {
  const router = useRouter()

  const [disponibilidade, setDisponibilidade] = useState<DisponibilidadeOperacao>({ temVenda: true, temLocacao: true })
  const [options, setOptions] = useState({
    tipos: [] as OpcaoComContagem[],
    estados: [] as EstadoComContagem[],
    cidades: [] as CidadeComContagem[],
  })

  const [loading, setLoading] = useState({
    initial: true,
    cidades: false,
  })

  const [searchData, setSearchData] = useState({
    tipoOperacao: "V",
    tipoImovel: "all",
    idEstado: "all",
    idCidade: "all",
  })

  // Hook para buscar os dados iniciais dos filtros de uma só vez
  useEffect(() => {
    const fetchInitialData = async () => { // CORREÇÃO: Adicionado 'async'
      setLoading(l => ({ ...l, initial: true }));
      try {
        const res = await fetch('/api/initial-filters');
        if (res.ok) {
          const data = await res.json();
          setDisponibilidade(data.disponibilidade);
          setOptions(o => ({ ...o, tipos: data.tipos, estados: data.estados }));
        }
      } catch (e) {
        console.error("Erro ao buscar filtros iniciais:", e);
      } finally {
        setLoading(l => ({ ...l, initial: false }));
      }
    };
    fetchInitialData();
  }, []);

  // Hook para buscar cidades quando o estado muda
  useEffect(() => {
    if (searchData.idEstado !== 'all') {
      const fetchCidades = async () => { // CORREÇÃO: Adicionado 'async'
        setLoading(l => ({ ...l, cidades: true }));
        try {
          const params = new URLSearchParams({ tipoImovel: searchData.tipoImovel, statusImovelStr: searchData.tipoOperacao });
          const res = await fetch(`/api/localizacao/cidades/${searchData.idEstado}?${params.toString()}`);
          if (res.ok) {
            const cidades = await res.json();
            setOptions(o => ({ ...o, cidades }));
          }
        } catch (e) {
          console.error(`Erro ao buscar cidades:`, e);
          setOptions(o => ({ ...o, cidades: [] }));
        } finally {
          setLoading(l => ({ ...l, cidades: false }));
        }
      };
      fetchCidades();
    } else {
      setOptions(o => ({ ...o, cidades: [] }));
    }
  }, [searchData.idEstado, searchData.tipoImovel, searchData.tipoOperacao]);

  const handleSearch = () => {
    const params = new URLSearchParams()
    if (searchData.tipoOperacao) params.set("statusImovelStr", searchData.tipoOperacao);
    if (searchData.tipoImovel !== 'all') params.set("tipoImovel", searchData.tipoImovel);
    if (searchData.idEstado !== 'all') params.set("idEstado", searchData.idEstado);
    if (searchData.idCidade !== 'all') params.set("idCidade", searchData.idCidade);
    router.push(`/busca?${params.toString()}`)
  }

  const backgroundStyle = !videoUrl && imageUrl ? { backgroundImage: `url(${imageUrl})` } : {};

  return (
    <section className="relative h-[70vh] min-h-[600px] flex items-center justify-center text-center bg-gray-800 bg-cover bg-center" style={backgroundStyle}>
      {videoUrl && (
        <video
          className="absolute top-0 left-0 w-full h-full object-cover z-0"
          autoPlay
          loop
          muted
          playsInline
          key={videoUrl}
        >
          <source src={videoUrl} type="video/mp4" />
        </video>
      )}
      <div className="absolute inset-0 bg-black/50 z-10"></div>
      <div className="relative z-20 container py-20">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">Encontre o Imóvel dos Seus Sonhos</h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-200">
            Com a {companyName}, você encontra as melhores oportunidades do mercado imobiliário
          </p>
          <div className="bg-white rounded-lg p-6 shadow-xl">
            {!loading.initial && (
              <div className="flex flex-wrap gap-4 mb-4">
                {disponibilidade.temVenda && <Button variant={searchData.tipoOperacao === "V" ? "default" : "outline"} onClick={() => setSearchData({ ...searchData, tipoOperacao: "V", idEstado: 'all', idCidade: 'all' })} className="flex-1 min-w-[120px]"><Home className="w-4 h-4 mr-2" />Comprar</Button>}
                {disponibilidade.temLocacao && <Button variant={searchData.tipoOperacao === "L" ? "default" : "outline"} onClick={() => setSearchData({ ...searchData, tipoOperacao: "L", idEstado: 'all', idCidade: 'all' })} className="flex-1 min-w-[120px]"><DollarSign className="w-4 h-4 mr-2" />Alugar</Button>}
              </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Select value={searchData.tipoImovel} onValueChange={(v) => setSearchData(f => ({ ...f, tipoImovel: v, idEstado: 'all', idCidade: 'all' }))} disabled={loading.initial}>
                <SelectTrigger><SelectValue placeholder={loading.initial ? "Carregando..." : "Tipo de Imóvel"} /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os tipos</SelectItem>
                  {options.tipos.map(t => <SelectItem key={t.id} value={String(t.id)}>{t.nome} ({t.contagem})</SelectItem>)}
                </SelectContent>
              </Select>
              <Select value={searchData.idEstado} onValueChange={(v) => setSearchData(f => ({ ...f, idEstado: v, idCidade: 'all' }))} disabled={loading.initial}>
                <SelectTrigger><SelectValue placeholder={loading.initial ? "Carregando..." : "Estado"} /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os estados</SelectItem>
                  {options.estados.map(e => <SelectItem key={e.codigo} value={String(e.codigo)}>{e.nome}</SelectItem>)}
                </SelectContent>
              </Select>
              <Select value={searchData.idCidade} onValueChange={(v) => setSearchData(f => ({ ...f, idCidade: v }))} disabled={loading.cidades || searchData.idEstado === 'all'}>
                <SelectTrigger><SelectValue placeholder={loading.cidades ? "Carregando..." : "Cidade"} /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas as cidades</SelectItem>
                  {options.cidades.map(c => <SelectItem key={c.codigo} value={String(c.codigo)}>{c.cidade} ({c.contagem})</SelectItem>)}
                </SelectContent>
              </Select>
              <Button onClick={handleSearch} disabled={Object.values(loading).some(Boolean)}>
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