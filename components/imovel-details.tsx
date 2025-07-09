"use client"

import { useState } from "react"
import Image from "next/image"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  MapPin,
  Bed,
  Bath,
  Square,
  Car,
  Heart,
  Share2,
  Phone,
  Mail,
  ChevronLeft,
  ChevronRight,
  Building,
} from "lucide-react"
import { formatarPreco, obterTipoImovelNome, obterCaracteristicas } from "@/lib/api"
import type { Imovel } from "@/types/api"

interface ImovelDetailsProps {
  imovel: Imovel
}

export function ImovelDetails({ imovel }: ImovelDetailsProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  // Filtrar fotos válidas
  const fotos = imovel.fotoImovelList?.filter((foto) => foto.url) || []

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % fotos.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + fotos.length) % fotos.length)
  }

  const caracteristicas = obterCaracteristicas(imovel)

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="secondary">{obterTipoImovelNome(imovel.idTipoImovel)}</Badge>
            <Badge variant={imovel.tipoOperacao === "V" ? "default" : "destructive"}>
              {imovel.tipoOperacao === "V" ? "Venda" : "Locação"}
            </Badge>
            {imovel.destaque === "1" && <Badge variant="outline">Destaque</Badge>}
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{imovel.nomeImovel}</h1>
          <div className="flex items-center text-gray-600 mb-4">
            <MapPin className="w-4 h-4 mr-1" />
            <span>
              {imovel.endereco}, {imovel.numero} - {imovel.nomeBairro}, {imovel.nomeCidade}/{imovel.siglaEstado}
            </span>
          </div>
          <div className="text-3xl font-bold text-blue-600">{formatarPreco(imovel.preco)}</div>
          {imovel.condominio > 0 && (
            <div className="text-lg text-gray-600">+ Condomínio: {formatarPreco(imovel.condominio)}</div>
          )}
        </div>

        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Heart className="w-4 h-4 mr-2" />
            Favoritar
          </Button>
          <Button variant="outline" size="sm">
            <Share2 className="w-4 h-4 mr-2" />
            Compartilhar
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Galeria de Fotos */}
        <div className="lg:col-span-2">
          <Card>
            <CardContent className="p-0">
              {fotos.length > 0 ? (
                <div className="relative">
                  <Image
                    src={fotos[currentImageIndex]?.url || "/placeholder.svg?height=500&width=800"}
                    alt={fotos[currentImageIndex]?.descricao || imovel.nomeImovel}
                    width={800}
                    height={500}
                    className="w-full h-[500px] object-cover rounded-lg"
                  />
                  {fotos.length > 1 && (
                    <>
                      <Button
                        variant="outline"
                        size="icon"
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white"
                        onClick={prevImage}
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white"
                        onClick={nextImage}
                      >
                        <ChevronRight className="w-4 h-4" />
                      </Button>
                      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                        {currentImageIndex + 1} / {fotos.length}
                      </div>
                    </>
                  )}
                </div>
              ) : (
                <div className="w-full h-[500px] bg-gray-200 rounded-lg flex items-center justify-center">
                  <p className="text-gray-500">Nenhuma foto disponível</p>
                </div>
              )}

              {/* Thumbnails */}
              {fotos.length > 1 && (
                <div className="flex gap-2 p-4 overflow-x-auto">
                  {fotos.slice(0, 6).map((foto, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${
                        index === currentImageIndex ? "border-blue-600" : "border-gray-200"
                      }`}
                    >
                      <Image
                        src={foto.urlThumbnail || foto.url}
                        alt={foto.descricao || `Foto ${index + 1}`}
                        width={80}
                        height={80}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                  {fotos.length > 6 && (
                    <div className="flex-shrink-0 w-20 h-20 rounded-lg bg-gray-100 flex items-center justify-center text-sm text-gray-600">
                      +{fotos.length - 6}
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Informações e Contato */}
        <div className="space-y-6">
          {/* Características Principais */}
          <Card>
            <CardHeader>
              <CardTitle>Características</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center">
                  <Bed className="w-5 h-5 text-gray-400 mr-2" />
                  <span>{imovel.nquartos} quartos</span>
                </div>
                <div className="flex items-center">
                  <Bath className="w-5 h-5 text-gray-400 mr-2" />
                  <span>{imovel.nbanheirossociais} banheiros</span>
                </div>
                <div className="flex items-center">
                  <Square className="w-5 h-5 text-gray-400 mr-2" />
                  <span>{imovel.areautil}m²</span>
                </div>
                <div className="flex items-center">
                  <Car className="w-5 h-5 text-gray-400 mr-2" />
                  <span>{imovel.ngaragens} vagas</span>
                </div>
              </div>

              {imovel.nsuites > 0 && (
                <div className="flex items-center">
                  <Building className="w-5 h-5 text-gray-400 mr-2" />
                  <span>{imovel.nsuites} suítes</span>
                </div>
              )}

              {imovel.iptu > 0 && <Separator />}

              {imovel.iptu > 0 && (
                <div>
                  <p className="text-sm text-gray-600">IPTU: {formatarPreco(imovel.iptu)}</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Contato */}
          <Card>
            <CardHeader>
              <CardTitle>Entre em Contato</CardTitle>
              <CardDescription>{imovel.empresaNomeFantasia}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full">
                <Phone className="w-4 h-4 mr-2" />
                Ligar Agora
              </Button>
              <Button variant="outline" className="w-full bg-transparent">
                <Mail className="w-4 h-4 mr-2" />
                Enviar E-mail
              </Button>
            </CardContent>
          </Card>

          {/* Características Adicionais */}
          {caracteristicas.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Características Adicionais</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {caracteristicas.map((caracteristica, index) => (
                    <Badge key={index} variant="outline">
                      {caracteristica}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Descrição */}
      {imovel.descricao && (
        <Card>
          <CardHeader>
            <CardTitle>Descrição</CardTitle>
          </CardHeader>
          <CardContent>
            <div
              className="text-gray-700 prose prose-gray max-w-none"
              dangerouslySetInnerHTML={{
                __html: imovel.descricao
                  .replace(/<br\s*\/?>/gi, "\n")
                  .split("\n")
                  .map((line) => line.trim())
                  .filter((line) => line.length > 0)
                  .map((line) => `<p class="mb-3">${line}</p>`)
                  .join(""),
              }}
            />
          </CardContent>
        </Card>
      )}
    </div>
  )
}
