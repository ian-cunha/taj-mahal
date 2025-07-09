import Link from "next/link"
import { Home, Phone, Mail, MapPin, Facebook, Instagram, Twitter } from "lucide-react"
import { obterEmpresa } from "@/lib/api"

export async function Footer() {
  let empresa
  try {
    empresa = await obterEmpresa()
  } catch {
    // Fallback se não conseguir carregar dados da empresa
    empresa = {
      empresanomefantasia: "Taj Mahal - RE.AI.s",
      tel1: "(11) 9999-9999",
      email: "teste@tajmahal.com",
      endereco: "Recife, PE",
    }
  }

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <Home className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-bold">{empresa.empresanomefantasia}</span>
            </div>
            <p className="text-gray-400">Sua imobiliária de confiança. Encontre o imóvel dos seus sonhos conosco.</p>
            <div className="flex space-x-4">
              <Facebook className="w-5 h-5 text-gray-400 hover:text-blue-500 cursor-pointer" />
              <Instagram className="w-5 h-5 text-gray-400 hover:text-pink-500 cursor-pointer" />
              <Twitter className="w-5 h-5 text-gray-400 hover:text-blue-400 cursor-pointer" />
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Links Rápidos</h3>
            <div className="space-y-2">
              <Link href="/busca" className="block text-gray-400 hover:text-white transition-colors">
                Buscar Imóveis
              </Link>
              <Link href="/empreendimentos" className="block text-gray-400 hover:text-white transition-colors">
                Empreendimentos
              </Link>
              <Link href="/financie-seu-imovel" className="block text-gray-400 hover:text-white transition-colors">
                Financiamento
              </Link>
              <Link href="/solicite-seu-imovel" className="block text-gray-400 hover:text-white transition-colors">
                Solicitar Imóvel
              </Link>
            </div>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Serviços</h3>
            <div className="space-y-2">
              <p className="text-gray-400">Compra de Imóveis</p>
              <p className="text-gray-400">Venda de Imóveis</p>
              <p className="text-gray-400">Locação</p>
              <p className="text-gray-400">Avaliação</p>
              <p className="text-gray-400">Consultoria</p>
            </div>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contato</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-gray-400" />
                <span className="text-gray-400">{empresa.tel1}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-gray-400" />
                <span className="text-gray-400">{empresa.email}</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-gray-400" />
                <span className="text-gray-400">{empresa.endereco}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">© 2024 {empresa.empresanomefantasia}. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
