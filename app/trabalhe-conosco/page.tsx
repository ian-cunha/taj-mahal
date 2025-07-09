import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, Briefcase, TrendingUp, Heart, Phone, Mail } from "lucide-react"
import Link from "next/link"
import { obterEmpresa } from "@/lib/api"
import { JobApplicationForm } from "@/components/job-application-form"

const benefits = [
  "Comissões competitivas",
  "Treinamento contínuo",
  "Suporte de marketing",
  "Ambiente colaborativo",
  "Oportunidades de crescimento",
  "Flexibilidade de horários",
]

const positions = [
  {
    title: "Corretor de Imóveis",
    type: "Autônomo",
    location: "Balneário Piçarras, SC",
    description: "Buscamos corretor experiente com CRECI ativo para atuar no litoral catarinense.",
  },
  {
    title: "Consultor de Vendas",
    type: "Tempo Integral",
    location: "Balneário Piçarras, SC",
    description: "Oportunidade para profissional com experiência em vendas de imóveis residenciais.",
  },
  {
    title: "Assistente Comercial",
    type: "Meio Período",
    location: "Balneário Piçarras, SC",
    description: "Profissional organizado para apoiar as atividades comerciais da imobiliária.",
  },
]

export default async function TrabalheConoscoPage() {
  let empresa
  try {
    empresa = await obterEmpresa()
  } catch (error) {
    console.error("Erro ao carregar dados da empresa:", error)
    // Fallback data
    empresa = {
      empresanomefantasia: "Street Broker",
      empresanomeresponsavel: "Jonas Teixeira",
      tel1: "(47) 99625-3277",
      email: "ojonasbroker@gmail.com",
      whatsapp: "(47) 99625-3277",
      endereco: "Balneário Piçarras - SC",
      creci: "41907",
    }
  }

  return (
    <div className="py-8">
      <div className="container">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Trabalhe Conosco</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Faça parte da equipe {empresa.empresanomefantasia} e construa uma carreira de sucesso no mercado imobiliário
          </p>
        </div>

        {/* Why Work With Us */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Por que trabalhar na {empresa.empresanomefantasia}?
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              Oferecemos um ambiente de trabalho estimulante no litoral catarinense, com oportunidades reais de
              crescimento profissional e pessoal. Nossa equipe, liderada por {empresa.empresanomeresponsavel} (CRECI{" "}
              {empresa.creci}), é formada por profissionais apaixonados pelo que fazem.
            </p>
            <div className="grid grid-cols-2 gap-4">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  <span className="text-gray-700">{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <Card className="text-center">
              <CardContent className="pt-6">
                <Users className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h3 className="font-semibold text-gray-900 mb-2">Equipe Unida</h3>
                <p className="text-sm text-gray-600">Ambiente colaborativo e acolhedor</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="pt-6">
                <TrendingUp className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h3 className="font-semibold text-gray-900 mb-2">Crescimento</h3>
                <p className="text-sm text-gray-600">Oportunidades de desenvolvimento</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="pt-6">
                <Briefcase className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h3 className="font-semibold text-gray-900 mb-2">Experiência</h3>
                <p className="text-sm text-gray-600">Aprenda com os melhores</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="pt-6">
                <Heart className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h3 className="font-semibold text-gray-900 mb-2">Paixão</h3>
                <p className="text-sm text-gray-600">Ame o que você faz</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Open Positions */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Vagas Abertas</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {positions.map((position, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{position.title}</CardTitle>
                    <Badge variant="outline">{position.type}</Badge>
                  </div>
                  <CardDescription>{position.location}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">{position.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Contact Information */}
        <div className="mb-16">
          <Card className="bg-blue-50">
            <CardContent className="p-8 text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Interessado em fazer parte da nossa equipe?</h2>
              <p className="text-gray-700 mb-6">
                Entre em contato conosco para saber mais sobre as oportunidades disponíveis
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <div className="flex items-center space-x-2">
                  <Phone className="w-4 h-4 text-blue-600" />
                  <span>{empresa.tel1}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="w-4 h-4 text-blue-600" />
                  <span>{empresa.email}</span>
                </div>
                {empresa.whatsapp && (
                  <Link
                    href={`https://wa.me/${empresa.whatsapp.replace(/\D/g, "")}`}
                    target="_blank"
                    className="flex items-center space-x-2 text-green-600 hover:underline"
                  >
                    <Phone className="w-4 h-4" />
                    <span>WhatsApp</span>
                  </Link>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Application Form */}
        <div className="max-w-4xl mx-auto">
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Candidate-se</CardTitle>
              <CardDescription>Preencha o formulário abaixo e envie seu currículo</CardDescription>
            </CardHeader>
            <CardContent>
              <JobApplicationForm />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
