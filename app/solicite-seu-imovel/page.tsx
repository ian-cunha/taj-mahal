"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Search, MapPin, DollarSign, Home, Send } from "lucide-react"

export default function SoliciteImovelPage() {
  const [formData, setFormData] = useState({
    tipo: "",
    finalidade: "",
    localizacao: "",
    precoMin: "",
    precoMax: "",
    quartos: "",
    banheiros: "",
    areaMin: "",
    caracteristicas: [] as string[],
    observacoes: "",
    nome: "",
    email: "",
    telefone: "",
    contato: "",
  })

  const caracteristicasOptions = [
    "Garagem",
    "Piscina",
    "Churrasqueira",
    "Jardim",
    "Varanda",
    "Elevador",
    "Portaria 24h",
    "Academia",
    "Playground",
    "Salão de festas",
  ]

  const handleCaracteristicaChange = (caracteristica: string, checked: boolean) => {
    if (checked) {
      setFormData({
        ...formData,
        caracteristicas: [...formData.caracteristicas, caracteristica],
      })
    } else {
      setFormData({
        ...formData,
        caracteristicas: formData.caracteristicas.filter((c) => c !== caracteristica),
      })
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
    // Handle form submission
  }

  return (
    <div className="py-8">
      <div className="container max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Solicite Seu Imóvel</h1>
          <p className="text-xl text-gray-600">
            Não encontrou o imóvel ideal? Conte-nos o que você procura e nós encontraremos para você
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Property Preferences */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Search className="w-5 h-5 mr-2" />O que você está procurando?
              </CardTitle>
              <CardDescription>Descreva o imóvel dos seus sonhos</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="tipo">Tipo de Imóvel</Label>
                  <Select value={formData.tipo} onValueChange={(value) => setFormData({ ...formData, tipo: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="apartamento">Apartamento</SelectItem>
                      <SelectItem value="casa">Casa</SelectItem>
                      <SelectItem value="terreno">Terreno</SelectItem>
                      <SelectItem value="comercial">Comercial</SelectItem>
                      <SelectItem value="studio">Studio</SelectItem>
                      <SelectItem value="cobertura">Cobertura</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="finalidade">Finalidade</Label>
                  <Select
                    value={formData.finalidade}
                    onValueChange={(value) => setFormData({ ...formData, finalidade: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione a finalidade" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="comprar">Comprar</SelectItem>
                      <SelectItem value="alugar">Alugar</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="localizacao">Localização Preferida</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    id="localizacao"
                    placeholder="Bairro, região ou cidade"
                    value={formData.localizacao}
                    onChange={(e) => setFormData({ ...formData, localizacao: e.target.value })}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="precoMin">Preço Mínimo</Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      id="precoMin"
                      placeholder="R$ 200.000"
                      value={formData.precoMin}
                      onChange={(e) => setFormData({ ...formData, precoMin: e.target.value })}
                      className="pl-10"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="precoMax">Preço Máximo</Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      id="precoMax"
                      placeholder="R$ 500.000"
                      value={formData.precoMax}
                      onChange={(e) => setFormData({ ...formData, precoMax: e.target.value })}
                      className="pl-10"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="quartos">Quartos (mínimo)</Label>
                  <Select
                    value={formData.quartos}
                    onValueChange={(value) => setFormData({ ...formData, quartos: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 quarto</SelectItem>
                      <SelectItem value="2">2 quartos</SelectItem>
                      <SelectItem value="3">3 quartos</SelectItem>
                      <SelectItem value="4">4+ quartos</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="banheiros">Banheiros (mínimo)</Label>
                  <Select
                    value={formData.banheiros}
                    onValueChange={(value) => setFormData({ ...formData, banheiros: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 banheiro</SelectItem>
                      <SelectItem value="2">2 banheiros</SelectItem>
                      <SelectItem value="3">3 banheiros</SelectItem>
                      <SelectItem value="4">4+ banheiros</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="areaMin">Área Mínima (m²)</Label>
                  <Input
                    id="areaMin"
                    type="number"
                    placeholder="80"
                    value={formData.areaMin}
                    onChange={(e) => setFormData({ ...formData, areaMin: e.target.value })}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Characteristics */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Home className="w-5 h-5 mr-2" />
                Características Desejadas
              </CardTitle>
              <CardDescription>Selecione as características que são importantes para você</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {caracteristicasOptions.map((caracteristica) => (
                  <div key={caracteristica} className="flex items-center space-x-2">
                    <Checkbox
                      id={caracteristica}
                      checked={formData.caracteristicas.includes(caracteristica)}
                      onCheckedChange={(checked) => handleCaracteristicaChange(caracteristica, checked as boolean)}
                    />
                    <Label htmlFor={caracteristica} className="text-sm">
                      {caracteristica}
                    </Label>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Additional Information */}
          <Card>
            <CardHeader>
              <CardTitle>Informações Adicionais</CardTitle>
              <CardDescription>Conte-nos mais detalhes sobre o que você procura</CardDescription>
            </CardHeader>
            <CardContent>
              <div>
                <Label htmlFor="observacoes">Observações</Label>
                <Textarea
                  id="observacoes"
                  placeholder="Descreva outras características importantes, urgência, observações especiais..."
                  value={formData.observacoes}
                  onChange={(e) => setFormData({ ...formData, observacoes: e.target.value })}
                  rows={4}
                />
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle>Seus Dados de Contato</CardTitle>
              <CardDescription>Como podemos entrar em contato com você</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="nome">Nome Completo</Label>
                  <Input
                    id="nome"
                    placeholder="Seu nome"
                    value={formData.nome}
                    onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="email">E-mail</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="seu@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="telefone">Telefone</Label>
                  <Input
                    id="telefone"
                    placeholder="(11) 99999-9999"
                    value={formData.telefone}
                    onChange={(e) => setFormData({ ...formData, telefone: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="contato">Melhor horário para contato</Label>
                  <Select
                    value={formData.contato}
                    onValueChange={(value) => setFormData({ ...formData, contato: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="manha">Manhã (8h às 12h)</SelectItem>
                      <SelectItem value="tarde">Tarde (12h às 18h)</SelectItem>
                      <SelectItem value="noite">Noite (18h às 20h)</SelectItem>
                      <SelectItem value="qualquer">Qualquer horário</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="text-center">
            <Button type="submit" size="lg" className="btn-primary">
              <Send className="w-4 h-4 mr-2" />
              Enviar Solicitação
            </Button>
            <p className="text-sm text-gray-600 mt-4">
              Entraremos em contato em até 24 horas com opções que atendem ao seu perfil
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}
