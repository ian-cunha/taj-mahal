import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Phone, Mail, MapPin, Clock } from "lucide-react"
import Link from "next/link"
import { obterEmpresa } from "@/lib/api"
import { ContactForm } from "@/components/contact-form"

export default async function ContatoPage() {
  let empresa
  try {
    empresa = await obterEmpresa()
  } catch (error) {
    console.error("Erro ao carregar dados da empresa:", error)
    // Fallback data
    empresa = {
      empresanomefantasia: "Street Broker",
      tel1: "(47) 99625-3277",
      email: "ojonasbroker@gmail.com",
      whatsapp: "(47) 99625-3277",
      endereco: "Balneário Piçarras - SC",
      facebook: "https://www.facebook.com/jonassellerofc",
      instagram: "https://www.instagram.com/jonasseller/",
      youtube: "https://www.youtube.com/@JonasSeller",
    }
  }

  return (
    <div className="py-8">
      <div className="container">
        <div className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Entre em Contato</h1>
          <p className="text-lg text-gray-600">
            Entre em contato com a {empresa.empresanomefantasia} para encontrar o imóvel ideal
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Information */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Phone className="w-5 h-5 mr-2 text-blue-600" />
                  Telefone
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{empresa.tel1}</p>
                {empresa.whatsapp && (
                  <Link
                    href={`https://wa.me/${empresa.whatsapp.replace(/\D/g, "")}`}
                    target="_blank"
                    className="text-blue-600 hover:underline"
                  >
                    WhatsApp: {empresa.whatsapp}
                  </Link>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Mail className="w-5 h-5 mr-2 text-blue-600" />
                  E-mail
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{empresa.email}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MapPin className="w-5 h-5 mr-2 text-blue-600" />
                  Localização
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{empresa.endereco}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="w-5 h-5 mr-2 text-blue-600" />
                  Horário de Funcionamento
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Segunda a Sexta: 8h às 18h
                  <br />
                  Sábado: 8h às 14h
                  <br />
                  Domingo: Fechado
                </p>
              </CardContent>
            </Card>

            {/* Social Media Links */}
            {(empresa.facebook || empresa.instagram || empresa.youtube) && (
              <Card>
                <CardHeader>
                  <CardTitle>Redes Sociais</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {empresa.facebook && (
                    <Link
                      href={empresa.facebook}
                      target="_blank"
                      className="flex items-center space-x-2 text-blue-600 hover:underline"
                    >
                      <span>📘</span>
                      <span>Facebook</span>
                    </Link>
                  )}
                  {empresa.instagram && (
                    <Link
                      href={empresa.instagram}
                      target="_blank"
                      className="flex items-center space-x-2 text-pink-600 hover:underline"
                    >
                      <span>📷</span>
                      <span>Instagram</span>
                    </Link>
                  )}
                  {empresa.youtube && (
                    <Link
                      href={empresa.youtube}
                      target="_blank"
                      className="flex items-center space-x-2 text-red-600 hover:underline"
                    >
                      <span>📺</span>
                      <span>YouTube</span>
                    </Link>
                  )}
                </CardContent>
              </Card>
            )}
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Envie sua Mensagem</CardTitle>
                <CardDescription>Preencha o formulário abaixo e entraremos em contato em breve</CardDescription>
              </CardHeader>
              <CardContent>
                <ContactForm />
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Map Section */}
        <div className="mt-12">
          <Card>
            <CardHeader>
              <CardTitle>Nossa Localização</CardTitle>
              <CardDescription>Visite nosso escritório para um atendimento personalizado</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-200 h-64 rounded-lg flex items-center justify-center">
                <p className="text-gray-600">Mapa interativo será carregado aqui</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
