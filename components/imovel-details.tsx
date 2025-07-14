"use client"

import { useState } from "react"
import Image from "next/image"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog"
import {
  MapPin,
  Bed,
  Bath,
  Square,
  Car,
  Share2,
  Phone,
  Mail,
  ChevronLeft,
  ChevronRight,
  Building,
  Printer,
  Twitter,
  Facebook,
  MessageCircle, // Usado para o WhatsApp
} from "lucide-react"
import { formatarPreco, obterTipoImovelNome, obterCaracteristicas } from "@/lib/api"
import type { Imovel, Empresa } from "@/types/api"

interface ImovelDetailsProps {
  imovel: Imovel;
  empresa: Empresa;
}

export function ImovelDetails({ imovel, empresa }: ImovelDetailsProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const fotos = imovel.fotoImovelList?.filter((foto) => foto.url) || []

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % fotos.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + fotos.length) % fotos.length)
  }

  const handlePrint = () => {
    if (imovel.urlImpressao) {
      const windowFeatures = 'toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=yes,resizable=yes,copyhistory=no,width=800,height=750,top=40,left=100';
      window.open(imovel.urlImpressao, '_blank', windowFeatures);
    } else {
      console.warn("URL de impressão não encontrada para o imóvel:", imovel.codigoImovel);
      alert("A funcionalidade de impressão não está disponível para este imóvel.");
    }
  };

  const handleShare = (platform: 'facebook' | 'twitter' | 'whatsapp') => {
    const pageUrl = window.location.href;
    const shareText = `Confira este imóvel incrível: ${imovel.nomeImovel}`;
    const encodedUrl = encodeURIComponent(pageUrl);
    const encodedText = encodeURIComponent(shareText);
    let shareUrl = '';

    switch (platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedText}`;
        break;
      case 'whatsapp':
        shareUrl = `https://api.whatsapp.com/send?text=${encodedText}%20${encodedUrl}`;
        break;
    }

    if (shareUrl) {
      window.open(shareUrl, '_blank', 'width=600,height=400,noopener,noreferrer');
    }
  };


  const caracteristicas = obterCaracteristicas(imovel)

  const addressParts = [
    imovel.endereco,
    imovel.numero,
    imovel.nomeBairro,
    imovel.nomeCidade,
    imovel.siglaEstado
  ].filter(Boolean)

  const fullAddress = addressParts.join(', ')
  const mapSrc = `https://maps.google.com/maps?q=${encodeURIComponent(fullAddress)}&output=embed`

  const whatsAppMessage = `Olá! Vi no site o imóvel "${imovel.nomeImovel}" (Cód: ${imovel.codigoImovel}) e gostaria de mais informações.`;
  const encodedWhatsAppMessage = encodeURIComponent(whatsAppMessage);

  const whatsAppUrl = empresa?.whatsapp
    ? `https://wa.me/55${empresa.whatsapp.replace(/\D/g, '')}?text=${encodedWhatsAppMessage}`
    : '';

  return (
    <div className="space-y-8">
      {/* Seção de Cabeçalho */}
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="secondary">{obterTipoImovelNome(imovel.idTipoImovel)}</Badge>
            {imovel.paraVenda && <Badge variant="default">{imovel.paraLocacao ? "Venda / Locação" : "Venda"}</Badge>}
            {!imovel.paraVenda && imovel.paraLocacao && <Badge variant="destructive">Locação</Badge>}
            {imovel.destaque === "1" && <Badge variant="outline">Destaque</Badge>}
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{imovel.nomeImovel}</h1>
          <div className="flex items-center text-gray-600 mb-4">
            <MapPin className="w-4 h-4 mr-1" />
            <span>{fullAddress || "Endereço não informado"}</span>
          </div>
          <div className="text-3xl font-bold text-blue-600">{formatarPreco(imovel.preco)}</div>
          {imovel.condominio > 0 && (
            <div className="text-lg text-gray-600">+ Condomínio: {formatarPreco(imovel.condominio)}</div>
          )}
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={handlePrint}><Printer className="w-4 h-4 mr-2" />Imprimir</Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm"><Share2 className="w-4 h-4 mr-2" />Compartilhar</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Compartilhe este imóvel</DialogTitle>
                <DialogDescription>
                  Escolha uma das redes sociais para compartilhar o link.
                </DialogDescription>
              </DialogHeader>
              <div className="flex justify-center gap-4 py-4">
                <Button variant="outline" size="icon" className="h-14 w-14 border-2" onClick={() => handleShare('whatsapp')}>
                  <MessageCircle className="h-7 w-7 text-green-500" />
                  <span className="sr-only">WhatsApp</span>
                </Button>
                <Button variant="outline" size="icon" className="h-14 w-14 border-2" onClick={() => handleShare('facebook')}>
                  <Facebook className="h-7 w-7 text-blue-800" />
                  <span className="sr-only">Facebook</span>
                </Button>
                <Button variant="outline" size="icon" className="h-14 w-14 border-2" onClick={() => handleShare('twitter')}>
                  <Twitter className="h-7 w-7 text-black" />
                  <span className="sr-only">X (Twitter)</span>
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Grid Principal com Fotos e Características */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
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
                      <Button variant="outline" size="icon" className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white" onClick={prevImage}>
                        <ChevronLeft className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="icon" className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white" onClick={nextImage}>
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
            </CardContent>
          </Card>
        </div>
        <div className="space-y-6">
          <Card>
            <CardHeader><CardTitle>Características</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center"><Bed className="w-5 h-5 text-gray-400 mr-2" /><span>{imovel.nquartos} quartos</span></div>
                <div className="flex items-center"><Bath className="w-5 h-5 text-gray-400 mr-2" /><span>{imovel.nbanheirossociais} banheiros</span></div>
                <div className="flex items-center"><Square className="w-5 h-5 text-gray-400 mr-2" /><span>{imovel.areautil}m²</span></div>
                <div className="flex items-center"><Car className="w-5 h-5 text-gray-400 mr-2" /><span>{imovel.ngaragens} vagas</span></div>
              </div>
              {imovel.nsuites > 0 && (<div className="flex items-center"><Building className="w-5 h-5 text-gray-400 mr-2" /><span>{imovel.nsuites} suítes</span></div>)}
              {imovel.iptu > 0 && <Separator />}
              {imovel.iptu > 0 && (<div><p className="text-sm text-gray-600">IPTU: {formatarPreco(imovel.iptu)}</p></div>)}
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Entre em Contato</CardTitle>
              <CardDescription>{imovel.empresaNomeFantasia}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {empresa?.whatsapp ? (
                <Button asChild className="w-full bg-green-600 hover:bg-green-700">
                  <a href={whatsAppUrl} target="_blank" rel="noopener noreferrer" style={{ color: 'white', textDecoration: 'none' }}>
                    <Phone className="w-4 h-4 mr-2" />
                    Falar no WhatsApp
                  </a>
                </Button>
              ) : empresa?.tel1 && (
                <Button asChild className="w-full">
                  <a href={`tel:${empresa.tel1.replace(/\D/g, '')}`} style={{ color: 'white', textDecoration: 'none' }}>
                    <Phone className="w-4 h-4 mr-2" />
                    Ligar Agora
                  </a>
                </Button>
              )}
              {empresa?.email && (
                <Button asChild variant="outline" className="w-full bg-transparent" style={{ color: 'black', textDecoration: 'none' }}>
                  <a href={`mailto:${empresa.email}`}>
                    <Mail className="w-4 h-4 mr-2" />
                    Enviar E-mail
                  </a>
                </Button>
              )}
            </CardContent>
          </Card>
          {caracteristicas.length > 0 && (
            <Card>
              <CardHeader><CardTitle>Características Adicionais</CardTitle></CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {caracteristicas.map((caracteristica, index) => (
                    <Badge key={index} variant="outline">{caracteristica}</Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Seção da Descrição */}
      {imovel.descricao && (
        <Card>
          <CardHeader><CardTitle>Descrição</CardTitle></CardHeader>
          <CardContent>
            <div
              className="text-gray-700 prose prose-gray max-w-none"
              dangerouslySetInnerHTML={{
                __html: imovel.descricao.replace(/<br\s*\/?>/gi, "\n").split("\n").map((line) => line.trim()).filter((line) => line.length > 0).map((line) => `<p class="mb-3">${line}</p>`).join(""),
              }}
            />
          </CardContent>
        </Card>
      )}

      {/* Seção do Mapa */}
      <Card>
        <CardHeader>
          <CardTitle>Localização</CardTitle>
          {fullAddress && <CardDescription>{fullAddress}</CardDescription>}
        </CardHeader>
        <CardContent>
          {fullAddress ? (
            <div className="aspect-w-16 aspect-h-9 overflow-hidden rounded-lg">
              <iframe
                width="100%"
                height="450"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                src={mapSrc}
              ></iframe>
            </div>
          ) : (
            <div className="bg-gray-100 p-4 rounded-lg text-center">
              <p className="text-gray-600">Endereço não disponível para exibir o mapa.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}