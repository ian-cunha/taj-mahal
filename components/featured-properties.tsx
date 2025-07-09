import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, Bed, Bath, Square, Heart } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { listarImoveis, formatarPreco, obterTipoImovelNome, criarFiltroImovel } from "@/lib/api"
import type { Imovel } from "@/types/api" // Importa o tipo Imovel

export async function FeaturedProperties() {
  // CORREÇÃO: Definindo o tipo explícito para a variável 'imoveis'
  let imoveis: Imovel[] = []

  try {
    const filtro = criarFiltroImovel({
      quantidadeImoveis: 6,
      destaqueNoSite: true,
    })

    imoveis = await listarImoveis(filtro)
  } catch (error) {
    console.error("Erro ao carregar imóveis em destaque:", error)
    // Continua com array vazio se houver erro
  }

  // O botão com o estilo invertido
  const viewAllButton = (
    <Link href="/busca">
      <Button variant="outline" size="lg" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-colors duration-300">
        Ver Todos os Imóveis
      </Button>
    </Link>
  );

  if (imoveis.length === 0) {
    return (
      <section className="py-16 bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Imóveis em Destaque</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Confira nossa seleção especial de imóveis com as melhores oportunidades do mercado
            </p>
          </div>
          <div className="text-center">
            <p className="text-gray-600 mb-4">Nenhum imóvel em destaque encontrado no momento.</p>
            {viewAllButton}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 bg-white">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Imóveis em Destaque</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Confira nossa seleção especial de imóveis com as melhores oportunidades do mercado
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                  <span className="text-xl font-bold text-primary">{formatarPreco(imovel.preco)}</span>
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

        <div className="text-center mt-12">
          {viewAllButton}
        </div>
      </div>
    </section>
  )
}