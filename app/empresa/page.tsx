import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Award,
  Users,
  Home,
  Clock,
  Target,
  Heart,
  Shield,
  Phone,
  Mail,
  MapPin,
  Globe,
  Facebook,
  Instagram,
  Youtube,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { obterEmpresa } from "@/lib/api"

const values = [
  {
    icon: Target,
    title: "Foco no Cliente",
    description: "Colocamos as necessidades dos nossos clientes em primeiro lugar, oferecendo soluções personalizadas.",
  },
  {
    icon: Heart,
    title: "Paixão pelo que Fazemos",
    description: "Amamos o mercado imobiliário e trabalhamos com dedicação para conectar pessoas aos seus lares.",
  },
  {
    icon: Shield,
    title: "Transparência e Confiança",
    description: "Mantemos total transparência em todas as transações, construindo relacionamentos duradouros.",
  },
]

export default async function EmpresaPage() {
  let empresa
  try {
    empresa = await obterEmpresa()
  } catch (error) {
    console.error("Erro ao carregar dados da empresa:", error)
    // Fallback se não conseguir carregar dados da empresa
    empresa = {
      empresanomefantasia: "Street Broker",
      empresarazaosocial: "Street Broker",
      empresanomeresponsavel: "Jonas Teixeira",
      email: "contato@streetbrokerimoveis.com",
      tel1: "(47) 99625-3277",
      enderecoFormatado: "Balneário Piçarras - SC",
      slogan: "Seu Endereço Novo Está Aqui",
      politicaQualidade: "Seu parceiro certo para conquistar seu espaço no Paraíso Catarinense.",
      urlLogomarca: "",
      urlFotoAgencia: "",
      creci: "41907",
      homepage: "streetbrokerimoveis.com",
      facebook: "",
      instagram: "",
      youtube: "",
      whatsapp: "(47) 99625-3277",
    }
  }

  const stats = [
    { icon: Home, value: "500+", label: "Imóveis Vendidos" },
    { icon: Users, value: "1000+", label: "Clientes Satisfeitos" },
    { icon: Award, value: "CRECI " + empresa.creci, label: "Registro Profissional" },
    { icon: Clock, value: "24/7", label: "Atendimento" },
  ]

  return (
    <div className="py-8">
      <div className="container">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            {empresa.urlLogomarca && (
              <Image
                src={empresa.urlLogomarca || "/placeholder.svg"}
                alt={empresa.empresanomefantasia}
                width={200}
                height={100}
                className="h-20 w-auto object-contain"
              />
            )}
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{empresa.empresanomefantasia}</h1>
          <p className="text-xl md:text-2xl text-blue-600 font-semibold mb-4">{empresa.slogan}</p>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">{empresa.politicaQualidade}</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => (
            <Card key={index} className="text-center">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-8 h-8 text-blue-600" />
                </div>
                <div className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-gray-600 text-sm md:text-base">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* About Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Sobre a {empresa.empresanomefantasia}</h2>
            <p className="text-lg text-gray-600 mb-6">
              A {empresa.empresanomefantasia} é sua parceira ideal para encontrar o imóvel perfeito no litoral
              catarinense. Com expertise no mercado imobiliário de Balneário Piçarras e região, oferecemos um
              atendimento personalizado e soluções completas para compra, venda e locação de imóveis.
            </p>
            <p className="text-lg text-gray-600 mb-6">
              Sob a liderança de {empresa.empresanomeresponsavel}, nossa equipe está comprometida em proporcionar
              experiências excepcionais e resultados que superam as expectativas dos nossos clientes.
            </p>
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary">Imóveis Residenciais</Badge>
              <Badge variant="secondary">Imóveis Comerciais</Badge>
              <Badge variant="secondary">Lançamentos</Badge>
              <Badge variant="secondary">Consultoria</Badge>
              <Badge variant="secondary">Avaliação</Badge>
            </div>
          </div>

          <div className="relative">
            {empresa.urlFotoAgencia ? (
              <Image
                src={empresa.urlFotoAgencia || "/placeholder.svg"}
                alt={`Escritório da ${empresa.empresanomefantasia}`}
                width={600}
                height={400}
                className="rounded-lg shadow-lg w-full h-auto"
              />
            ) : (
              <div className="w-full h-80 bg-gray-200 rounded-lg shadow-lg flex items-center justify-center">
                <p className="text-gray-500">Foto da empresa</p>
              </div>
            )}
          </div>
        </div>

        {/* Values */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Nossos Valores</h2>
            <p className="text-lg text-gray-600">Os princípios que guiam nosso trabalho diariamente</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="text-center">
                <CardHeader>
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <value.icon className="w-8 h-8 text-blue-600" />
                  </div>
                  <CardTitle>{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600">{value.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Contact Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <Card>
            <CardHeader>
              <CardTitle>Informações de Contato</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="font-medium">Telefone</p>
                  <p className="text-gray-600">{empresa.tel1}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="font-medium">E-mail</p>
                  <p className="text-gray-600">{empresa.email}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="font-medium">Localização</p>
                  <p className="text-gray-600">{empresa.enderecoFormatado}</p>
                </div>
              </div>

              {empresa.homepage && (
                <div className="flex items-center space-x-3">
                  <Globe className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="font-medium">Website</p>
                    <Link
                      href={`https://${empresa.homepage}`}
                      target="_blank"
                      className="text-blue-600 hover:underline"
                    >
                      {empresa.homepage}
                    </Link>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Redes Sociais</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {empresa.facebook && (
                <Link
                  href={empresa.facebook}
                  target="_blank"
                  className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Facebook className="w-5 h-5 text-blue-600" />
                  <span>Facebook</span>
                </Link>
              )}

              {empresa.instagram && (
                <Link
                  href={empresa.instagram}
                  target="_blank"
                  className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Instagram className="w-5 h-5 text-pink-600" />
                  <span>Instagram</span>
                </Link>
              )}

              {empresa.youtube && (
                <Link
                  href={empresa.youtube}
                  target="_blank"
                  className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Youtube className="w-5 h-5 text-red-600" />
                  <span>YouTube</span>
                </Link>
              )}

              {empresa.whatsapp && (
                <Link
                  href={`https://wa.me/${empresa.whatsapp.replace(/\D/g, "")}`}
                  target="_blank"
                  className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Phone className="w-5 h-5 text-green-600" />
                  <span>WhatsApp</span>
                </Link>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Mission */}
        <Card className="bg-blue-50">
          <CardContent className="p-8 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Nossa Missão</h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Ser o seu parceiro certo para conquistar seu espaço no Paraíso Catarinense, oferecendo soluções
              imobiliárias completas com transparência, dedicação e excelência no atendimento.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
