"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Upload, Send } from "lucide-react"

export function JobApplicationForm() {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefone: "",
    cargo: "",
    experiencia: "",
    creci: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
    // Handle form submit
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
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
          <Label htmlFor="cargo">Cargo de Interesse</Label>
          <Select value={formData.cargo} onValueChange={(value) => setFormData({ ...formData, cargo: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Selecione o cargo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="consultor">Consultor de Vendas</SelectItem>
              <SelectItem value="corretor">Corretor de Imóveis</SelectItem>
              <SelectItem value="assistente">Assistente Administrativo</SelectItem>
              <SelectItem value="outro">Outro</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div>
        <Label htmlFor="creci">CRECI (se aplicável)</Label>
        <Input
          id="creci"
          placeholder="Número do CRECI"
          value={formData.creci}
          onChange={(e) => setFormData({ ...formData, creci: e.target.value })}
        />
      </div>
      <div>
        <Label htmlFor="experiencia">Experiência Profissional</Label>
        <Textarea
          id="experiencia"
          placeholder="Descreva sua experiência no mercado imobiliário..."
          value={formData.experiencia}
          onChange={(e) => setFormData({ ...formData, experiencia: e.target.value })}
          rows={4}
          required
        />
      </div>
      <div>
        <Label>Currículo</Label>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
          <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
          <p className="text-gray-600 mb-2">Clique para fazer upload do seu currículo</p>
          <p className="text-sm text-gray-500">PDF até 5MB</p>
          <Button variant="outline" className="mt-2 bg-transparent">
            Selecionar Arquivo
          </Button>
        </div>
      </div>
      <div className="text-center">
        <Button type="submit" size="lg">
          <Send className="w-4 h-4 mr-2" />
          Enviar Candidatura
        </Button>
      </div>
    </form>
  )
}