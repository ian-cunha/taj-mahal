import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Phone, Mail, MapPin, Youtube, Facebook, Instagram } from "lucide-react";
import Link from "next/link";
import { obterEmpresa } from "@/lib/api";
import { ContactForm } from "@/components/contact-form";

// Componente reutilizável para informações de contato
const ContactInfo = ({ icon: Icon, label, value, href }: { icon: React.ElementType, label: string, value?: string | null, href?: string | null }) => {
  if (!value) return null;

  const content = href ? (
    <Link href={href} target="_blank" className="text-blue-600 hover:underline break-all">{value}</Link>
  ) : (
    <span className="text-gray-600 break-all">{value}</span>
  );

  return (
    <div className="flex items-start space-x-4">
      <Icon className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
      <div>
        <p className="text-lg font-semibold">{label}</p>
        {content}
      </div>
    </div>
  );
};

// Componente reutilizável para redes sociais
const SocialLink = ({ icon: Icon, name, href, colorClass }: { icon: React.ElementType, name: string, href?: string | null, colorClass: string }) => {
  if (!href) return null;

  return (
    <Link href={href} target="_blank" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
      <Icon className={`w-5 h-5 ${colorClass}`} />
      <span className="text-gray-700">{name}</span>
    </Link>
  );
};

export default async function ContatoPage() {
  let empresa;
  try {
    empresa = await obterEmpresa();
  } catch (error) {
    console.error("Erro ao carregar dados da empresa:", error);
    return (
      <div className="container py-12 text-center">
        <h1 className="text-2xl font-bold text-red-600 mb-4">Erro ao Carregar a Página de Contato</h1>
        <p className="text-gray-600">Não foi possível buscar as informações da imobiliária. Por favor, tente novamente mais tarde.</p>
      </div>
    );
  }

  const hasSocialMedia = empresa.facebook || empresa.instagram || empresa.youtube || empresa.whatsapp;
  const fullAddress = empresa.enderecoFormatado || empresa.endereco;

  // Usa a URL padrão do Google Maps para embed
  const mapSrc = `https://maps.google.com/maps?q=${encodeURIComponent(fullAddress ?? '')}&output=embed`;

  return (
    <div className="py-12 bg-gray-50">
      <div className="container">
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Entre em Contato</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Estamos prontos para ajudar você a encontrar o imóvel ideal. Fale conosco!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Nossos Contatos</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <ContactInfo icon={Phone} label="Telefone" value={empresa.tel1} href={`tel:${empresa.tel1?.replace(/\D/g, '')}`} />
                {empresa.whatsapp && <ContactInfo icon={Phone} label="WhatsApp" value={empresa.whatsapp} href={`https://wa.me/${empresa.whatsapp.replace(/\D/g, "")}`} />}
                <ContactInfo icon={Mail} label="E-mail" value={empresa.email} href={`mailto:${empresa.email}`} />
                <ContactInfo icon={MapPin} label="Endereço" value={fullAddress} />
              </CardContent>
            </Card>

            {hasSocialMedia && (
              <Card>
                <CardHeader>
                  <CardTitle>Redes Sociais</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <SocialLink icon={Facebook} name="Facebook" href={empresa.facebook} colorClass="text-blue-600" />
                  <SocialLink icon={Instagram} name="Instagram" href={empresa.instagram} colorClass="text-pink-600" />
                  <SocialLink icon={Youtube} name="YouTube" href={empresa.youtube} colorClass="text-red-600" />
                </CardContent>
              </Card>
            )}
          </div>

          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Envie sua Mensagem</CardTitle>
                <CardDescription>Preencha o formulário abaixo e nossa equipe entrará em contato em breve.</CardDescription>
              </CardHeader>
              <CardContent>
                <ContactForm />
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Mapa com iframe */}
        <div className="mt-12">
          <Card>
            <CardHeader>
              <CardTitle>Nossa Localização</CardTitle>
              {fullAddress && <CardDescription>{fullAddress}</CardDescription>}
            </CardHeader>
            <CardContent>
              <div className="aspect-w-16 aspect-h-9 overflow-hidden rounded-lg">
                {fullAddress ? (
                  <iframe
                    width="100%"
                    height="450"
                    style={{ border: 0 }}
                    loading="lazy"
                    allowFullScreen
                    referrerPolicy="no-referrer-when-downgrade"
                    src={mapSrc}
                  ></iframe>
                ) : (
                  <div className="bg-gray-200 h-full flex items-center justify-center">
                    <p className="text-gray-500">Endereço não disponível para exibir o mapa.</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}