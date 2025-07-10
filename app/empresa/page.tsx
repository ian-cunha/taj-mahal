import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Award, Briefcase, Phone, Mail, MapPin, Globe,
  Facebook, Instagram, Youtube
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { obterEmpresa } from "@/lib/api";

// Componente para um ícone e texto de contato
const ContactInfo = ({ icon: Icon, label, value, href }: { icon: React.ElementType, label: string, value?: string | null, href?: string | null }) => {
  if (!value) return null;

  const content = href ? (
    <Link href={href} target="_blank" className="text-primary hover:underline break-all">{value}</Link>
  ) : (
    <span className="text-gray-600 break-all">{value}</span>
  );

  return (
    <div className="flex items-start space-x-3">
      <Icon className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
      <div>
        <p className="font-medium">{label}</p>
        {content}
      </div>
    </div>
  );
};

// Componente para um link de rede social
const SocialLink = ({ icon: Icon, name, href }: { icon: React.ElementType, name: string, href?: string | null }) => {
  if (!href) return null;

  return (
    <Link href={href} target="_blank" className="flex items-center space-x-3 p-3 rounded-lg text-gray-700 hover:text-primary hover:bg-secondary transition-colors">
      <Icon className="w-5 h-5" />
      <span>{name}</span>
    </Link>
  );
};

export default async function EmpresaPage() {
  let empresa;
  try {
    empresa = await obterEmpresa();
  } catch (error) {
    console.error("Erro ao carregar dados da empresa:", error);
    return (
      <div className="container py-12 text-center">
        <h1 className="text-2xl font-bold text-red-600 mb-4">Erro ao Carregar a Página da Empresa</h1>
        <p className="text-gray-600">Não foi possível buscar as informações da imobiliária. Por favor, tente novamente mais tarde.</p>
      </div>
    );
  }

  const stats = [
    empresa.creci ? { icon: Award, value: `CRECI ${empresa.creci}`, label: "Registro Profissional" } : null,
    empresa.empresanomeresponsavel ? { icon: Briefcase, value: empresa.empresanomeresponsavel, label: "Responsável" } : null,
  ].filter(Boolean);

  const hasSocialMedia = empresa.facebook || empresa.instagram || empresa.youtube || empresa.whatsapp;

  return (
    <div className="py-12 bg-gray-50">
      <div className="container">
        <div className="text-center mb-16">
          {empresa.urlLogomarca && (
            <div className="flex justify-center mb-6">
              <Image
                src={empresa.urlLogomarca}
                alt={`Logomarca de ${empresa.empresanomefantasia}`}
                width={200}
                height={100}
                className="h-24 w-auto object-contain rounded-sm"
                priority
              />
            </div>
          )}
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{empresa.empresanomefantasia}</h1>
          {empresa.slogan && <p className="text-xl md:text-2xl text-primary font-semibold">{empresa.slogan}</p>}
        </div>

        {stats.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-16 max-w-4xl mx-auto">
            {stats.map((stat, index) => stat && (
              <Card key={index} className="text-center">
                <CardContent className="pt-6">
                  <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                    <stat.icon className="w-8 h-8 text-primary" />
                  </div>
                  <div className="text-xl md:text-2xl font-bold text-gray-900 mb-2">{stat.value}</div>
                  <div className="text-gray-600 text-sm md:text-base">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          {(empresa.politicaQualidade) && (
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Sobre a Empresa</h2>
              <p className="text-lg text-gray-700">{empresa.politicaQualidade}</p>
            </div>
          )}
          {empresa.urlFotoAgencia && (
            <div className="relative h-80 w-full lg:order-last order-first">
              <Image
                src={empresa.urlFotoAgencia}
                alt={`Escritório da ${empresa.empresanomefantasia}`}
                fill
                style={{ objectFit: 'cover' }}
                className="rounded-lg shadow-lg"
              />
            </div>
          )}
        </div>

        <div className={`grid grid-cols-1 ${hasSocialMedia ? 'md:grid-cols-2' : 'max-w-xl mx-auto'} gap-8`}>
          <Card>
            <CardHeader><CardTitle>Informações de Contato</CardTitle></CardHeader>
            <CardContent className="space-y-5">
              <ContactInfo icon={Phone} label="Telefone Principal" value={empresa.tel1} href={`tel:${empresa.tel1?.replace(/\D/g, '')}`} />
              <ContactInfo icon={Mail} label="E-mail" value={empresa.email} href={`mailto:${empresa.email}`} />
              <ContactInfo icon={MapPin} label="Endereço" value={empresa.enderecoFormatado} />
              <ContactInfo icon={Globe} label="Website" value={empresa.homepage} href={empresa.homepage ? `https://${empresa.homepage}` : null} />
            </CardContent>
          </Card>

          {hasSocialMedia && (
            <Card>
              <CardHeader><CardTitle>Redes Sociais</CardTitle></CardHeader>
              <CardContent className="space-y-2">
                <SocialLink icon={Facebook} name="Facebook" href={empresa.facebook} />
                <SocialLink icon={Instagram} name="Instagram" href={empresa.instagram} />
                <SocialLink icon={Youtube} name="YouTube" href={empresa.youtube} />
                {empresa.whatsapp && <SocialLink icon={Phone} name="WhatsApp" href={`https://wa.me/${empresa.whatsapp.replace(/\D/g, "")}`} />}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}