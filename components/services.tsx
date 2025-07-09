import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Briefcase, Key, Landmark, Upload } from 'lucide-react'

// Array com as novas seções de serviços/ações
const services = [
  {
    icon: Briefcase,
    title: 'Trabalhe Conosco',
    description: 'Faça parte de uma equipe de sucesso e construa sua carreira no mercado imobiliário.',
    href: '/trabalhe-conosco',
  },
  {
    icon: Key,
    title: 'Solicite seu Imóvel',
    description: 'Não encontrou o que procurava? Descreva o imóvel dos seus sonhos e nós o encontraremos para você.',
    href: '/solicite-seu-imovel', // Crie esta página se ainda não existir
  },
  {
    icon: Landmark,
    title: 'Financie seu Imóvel',
    description: 'Oferecemos assessoria completa para você conseguir o melhor financiamento imobiliário.',
    href: '/financie-seu-imovel', // Crie esta página se ainda não existir
  },
  {
    icon: Upload,
    title: 'Cadastre seu Imóvel',
    description: 'É proprietário? Anuncie seu imóvel conosco e alcance milhares de compradores em potencial.',
    href: '/cadastre-seu-imovel', // Crie esta página se ainda não existir
  },
]

export function Services() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Soluções para Você</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Tudo o que você precisa para comprar, vender ou financiar seu imóvel em um só lugar.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service) => (
            <Link key={service.title} href={service.href} className="block group">
              <Card className="h-full text-center hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <CardHeader>
                  <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary transition-colors duration-300">
                    <service.icon className="w-8 h-8 text-primary group-hover:text-primary-foreground transition-colors duration-300" />
                  </div>
                  <CardTitle>{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{service.description}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}