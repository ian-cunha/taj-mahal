import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, Building, Calendar, Users } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { listarEmpreendimentos, criarFiltroEmpreendimento } from "@/lib/api"

export async function EmpreendimentosResults() {
  let empreendimentos = []

  try {
    const filtro = criarFiltroEmpreendimento({
      quantidade: 12,
    })

    empreendimentos = await listarEmpreendimentos(filtro)
  } catch (error) {
    console.error("Erro ao carregar empreendimentos:", error)
    return (
      <div className="text-center py-12">
        <p className="text-gray-600 mb-4">Erro ao carregar os empreendimentos. Tente novamente.</p>
        <a href="/empreendimentos" className="inline-flex">
          <Button variant="outline">Tentar Novamente</Button>
        </a>
      </div>
    )
  }

  if (empreendimentos.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600 mb-4">Nenhum empreendimento encontrado no momento.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {empreendimentos.map((empreendimento) => (
        <Card
          key={empreendimento.idEmpreendimento}
          className="overflow-hidden hover:shadow-lg transition-shadow duration-300"
        >
          <div className="relative">
            <Image
              src={empreendimento.urlFotoDestaque || "/placeholder.svg?height=300&width=400"}
              alt={empreendimento.nome}
              width={400}
              height={300}
              className="w-full h-48 object-cover"
            />
            <div className="absolute top-4 left-4">
              <Badge variant={empreendimento.categoria === "0" ? "default" : "secondary"}>
                {empreendimento.categoria === "0" ? "Residencial" : "Comercial"}
              </Badge>
            </div>
            {empreendimento.situacaoEmpreendimento !== undefined && (
              <div className="absolute top-4 right-4">
                <Badge variant="outline">
                  {empreendimento.situacaoEmpreendimento === 0 && "Pré-Lançamento"}
                  {empreendimento.situacaoEmpreendimento === 1 && "Lançamento"}
                  {empreendimento.situacaoEmpreendimento === 2 && "Unidades Disponíveis"}
                  {empreendimento.situacaoEmpreendimento === 3 && "Totalmente Vendido"}
                </Badge>
              </div>
            )}
          </div>

          <CardHeader>
            <CardTitle className="text-lg line-clamp-2">{empreendimento.nome}</CardTitle>
            <CardDescription className="flex items-center">
              <MapPin className="w-4 h-4 mr-1" />
              {empreendimento.nomeBairro}, {empreendimento.nomeCidade}
            </CardDescription>
          </CardHeader>

          <CardContent>
            <div className="space-y-3">
              {empreendimento.precoPersonalizado && (
                <div className="text-lg font-semibold text-blue-600">{empreendimento.precoPersonalizado}</div>
              )}

              <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                {empreendimento.totalUnidades > 0 && (
                  <div className="flex items-center">
                    <Building className="w-4 h-4 mr-1" />
                    {empreendimento.totalUnidades} unidades
                  </div>
                )}
                {empreendimento.numPavimentos > 0 && (
                  <div className="flex items-center">
                    <Users className="w-4 h-4 mr-1" />
                    {empreendimento.numPavimentos} pavimentos
                  </div>
                )}
              </div>

              {empreendimento.previsaoEntrega && (
                <div className="flex items-center text-sm text-gray-600">
                  <Calendar className="w-4 h-4 mr-1" />
                  Entrega: {empreendimento.previsaoEntrega}
                </div>
              )}

              <Link href={`/empreendimento/${empreendimento.idEmpreendimento}`}>
                <Button className="w-full mt-4">Ver Detalhes</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
