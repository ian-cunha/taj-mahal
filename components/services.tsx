import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Search, Home, DollarSign, FileText, Calculator, Users } from "lucide-react"

const services = [
  {
    icon: Search,
    title: "Busca Personalizada",
    description: "Encontramos o imóvel ideal baseado no seu perfil e necessidades específicas.",
  },
  {
    icon: Home,
    title: "Venda de Imóveis",
    description: "Vendemos seu imóvel com estratégias de marketing e precificação adequada.",
  },
  {
    icon: DollarSign,
    title: "Financiamento",
    description: "Ajudamos você a conseguir o melhor financiamento para realizar seu sonho.",
  },
  {
    icon: FileText,
    title: "Documentação",
    description: "Cuidamos de toda a documentação necessária para sua transação imobiliária.",
  },
  {
    icon: Calculator,
    title: "Avaliação",
    description: "Realizamos avaliações precisas para determinar o valor real do seu imóvel.",
  },
  {
    icon: Users,
    title: "Consultoria",
    description: "Oferecemos consultoria especializada em investimentos imobiliários.",
  },
]

export function Services() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Nossos Serviços</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Oferecemos uma gama completa de serviços imobiliários para atender todas as suas necessidades
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <service.icon className="w-8 h-8 text-blue-600" />
                </div>
                <CardTitle className="text-xl">{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600">{service.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
