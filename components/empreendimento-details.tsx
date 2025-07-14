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
    Share2,
    Phone,
    Mail,
    ChevronLeft,
    ChevronRight,
    Building,
    Printer,
    Calendar,
    CheckCircle,
    Package,
} from "lucide-react"
import type { Empreendimento } from "@/types/api"

interface EmpreendimentoDetailsProps {
    empreendimento: Empreendimento
}

const getStatusEmpreendimento = (status: number) => {
    const statuses: Record<number, string> = {
        0: "Pré-Lançamento",
        1: "Lançamento",
        2: "Em Obras",
        3: "Pronto para Morar",
        4: "Entregue"
    };
    return statuses[status] || "Não informado";
}

export function EmpreendimentoDetails({ empreendimento }: EmpreendimentoDetailsProps) {
    const [currentImageIndex, setCurrentImageIndex] = useState(0)

    const fotos = empreendimento.fotosEmpreendimento?.filter((foto) => foto.url) || []

    const nextImage = () => {
        setCurrentImageIndex((prev) => (prev + 1) % fotos.length)
    }

    const prevImage = () => {
        setCurrentImageIndex((prev) => (prev - 1 + fotos.length) % fotos.length)
    }

    const addressParts = [
        empreendimento.endereco,
        empreendimento.numero,
        empreendimento.nomeBairro,
        empreendimento.nomeCidade,
        empreendimento.siglaEstado
    ].filter(Boolean)

    const fullAddress = addressParts.join(', ')
    const mapSrc = `http://googleusercontent.com/maps.google.com/3{encodeURIComponent(fullAddress)}&output=embed`;

    return (
        <div className="space-y-8">
            {/* Cabeçalho */}
            <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-4">
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <Badge variant="secondary">{empreendimento.categoria === "0" ? "Residencial" : "Comercial"}</Badge>
                        <Badge variant="outline">{getStatusEmpreendimento(empreendimento.estagioObra)}</Badge>
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">{empreendimento.nome}</h1>
                    <div className="flex items-center text-gray-600 mb-4">
                        <MapPin className="w-4 h-4 mr-1" />
                        <span>{fullAddress || "Endereço não informado"}</span>
                    </div>
                    {empreendimento.menorPrecoUnidades > 0 && (
                        <div className="text-3xl font-bold text-primary">
                            A partir de {new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(empreendimento.menorPrecoUnidades)}
                        </div>
                    )}
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" size="sm"><Printer className="w-4 h-4 mr-2" />Imprimir</Button>
                    <Button variant="outline" size="sm"><Share2 className="w-4 h-4 mr-2" />Compartilhar</Button>
                </div>
            </div>

            {/* Grid Principal com Fotos e Informações */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                    <Card>
                        <CardContent className="p-0">
                            {fotos.length > 0 ? (
                                <div className="relative">
                                    <Image
                                        src={fotos[currentImageIndex]?.url || "/placeholder.svg?height=500&width=800"}
                                        alt={fotos[currentImageIndex]?.descricao || empreendimento.nome}
                                        width={800}
                                        height={500}
                                        className="w-full h-[500px] object-cover rounded-t-lg"
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
                        <CardHeader><CardTitle>Informações Gerais</CardTitle></CardHeader>
                        <CardContent className="space-y-4 text-sm text-gray-700">
                            <div className="flex items-center"><Building className="w-5 h-5 text-gray-400 mr-2" /><span>{empreendimento.totalUnidades} Unidades</span></div>
                            <div className="flex items-center"><Package className="w-5 h-5 text-gray-400 mr-2" /><span>{empreendimento.unidadesAndar} Unidades por andar</span></div>
                            <div className="flex items-center"><Calendar className="w-5 h-5 text-gray-400 mr-2" /><span>Entrega: {empreendimento.previsaoEntrega || "A consultar"}</span></div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Entre em Contato</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <p className="text-sm text-gray-600">Gostou? Fale com um de nossos consultores para saber mais.</p>
                            <Button className="w-full"><Phone className="w-4 h-4 mr-2" />Falar com Consultor</Button>
                            <Button variant="outline" className="w-full bg-transparent"><Mail className="w-4 h-4 mr-2" />Pedir mais informações</Button>
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* Diferenciais */}
            {empreendimento.diferenciais && (
                <Card>
                    <CardHeader><CardTitle>Diferenciais do Empreendimento</CardTitle></CardHeader>
                    <CardContent>
                        <div
                            className="text-gray-700 prose prose-gray max-w-none"
                            dangerouslySetInnerHTML={{ __html: empreendimento.diferenciais }}
                        />
                    </CardContent>
                </Card>
            )}

            {/* Plantas */}
            {empreendimento.tiposImovel && empreendimento.tiposImovel.length > 0 && (
                <Card>
                    <CardHeader><CardTitle>Plantas e Tipologias</CardTitle></CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {empreendimento.tiposImovel.map((tipo) => (
                                <div key={tipo.id} className="p-4 border rounded-lg space-y-2">
                                    <p className="font-bold">{tipo.nome}</p>
                                    <div className="flex items-center text-sm text-gray-600 space-x-4">
                                        {(tipo as any).quartoPersonalizado && <span><Bed className="w-4 h-4 inline mr-1" />{(tipo as any).quartoPersonalizado}</span>}
                                        {(tipo as any).areaPersonalizada && <span><Square className="w-4 h-4 inline mr-1" />{(tipo as any).areaPersonalizada}</span>}
                                        {(tipo as any).vagaPersonalizada && <span><Car className="w-4 h-4 inline mr-1" />{(tipo as any).vagaPersonalizada}</span>}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Memorial Descritivo */}
            {empreendimento.memorial && (
                <Card>
                    <CardHeader><CardTitle>Memorial Descritivo</CardTitle></CardHeader>
                    <CardContent>
                        <div
                            className="text-gray-700 prose prose-sm prose-gray max-w-none"
                            dangerouslySetInnerHTML={{ __html: empreendimento.memorial }}
                        />
                    </CardContent>
                </Card>
            )}

            {/* Mapa */}
            <Card>
                <CardHeader>
                    <CardTitle>Localização no Mapa</CardTitle>
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