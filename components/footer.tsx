import Link from "next/link";
import Image from "next/image";
import { Home, Phone, Mail, MapPin, Facebook, Instagram, Youtube } from "lucide-react";
import { obterEmpresa } from "@/lib/api";

export async function Footer() {
  let empresa;
  try {
    empresa = await obterEmpresa();
  } catch (error) {
    console.error("Erro ao carregar dados da empresa para o footer:", error);
    return (
      <footer className="bg-gray-100">
        <div className="container py-8 text-center text-gray-500">
          <p>Não foi possível carregar as informações da imobiliária.</p>
        </div>
      </footer>
    );
  }

  const hasSocialMedia = empresa.facebook || empresa.instagram || empresa.youtube;

  return (
    <footer className="bg-white text-gray-700 border-t">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center space-x-3">
              {empresa.urlLogomarca ? (
                <Image
                  src={empresa.urlLogomarca}
                  alt={`Logomarca de ${empresa.empresanomefantasia}`}
                  width={40}
                  height={40}
                  className="h-10 w-10 object-contain rounded-md"
                />
              ) : (
                <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
                  <Home className="w-6 h-6 text-primary-foreground" />
                </div>
              )}
              <span className="text-xl font-bold text-gray-900">{empresa.empresanomefantasia}</span>
            </Link>
            {(empresa.slogan || empresa.politicaQualidade) && (
              <p className="text-gray-600 pr-8">
                {empresa.slogan || empresa.politicaQualidade}
              </p>
            )}
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Contato</h3>
            <div className="space-y-3">
              {empresa.tel1 && (
                <a href={`tel:${empresa.tel1.replace(/\D/g, '')}`} className="flex items-center space-x-2 text-gray-700 hover:text-primary transition-colors">
                  <Phone className="w-4 h-4" />
                  <span>{empresa.tel1}</span>
                </a>
              )}
              {empresa.email && (
                <a href={`mailto:${empresa.email}`} className="flex items-center space-x-2 text-gray-700 hover:text-primary transition-colors">
                  <Mail className="w-4 h-4" />
                  <span className="break-all">{empresa.email}</span>
                </a>
              )}
              {empresa.enderecoFormatado && (
                <div className="flex items-start space-x-2">
                  <MapPin className="w-4 h-4 mt-1 flex-shrink-0" />
                  <span>{empresa.enderecoFormatado}</span>
                </div>
              )}
            </div>
          </div>

          {hasSocialMedia && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Siga-nos</h3>
              <div className="flex space-x-4">
                {empresa.facebook && (
                  <Link href={empresa.facebook} target="_blank" className="text-gray-500 hover:text-primary transition-colors">
                    <Facebook className="w-6 h-6" />
                  </Link>
                )}
                {empresa.instagram && (
                  <Link href={empresa.instagram} target="_blank" className="text-gray-500 hover:text-primary transition-colors">
                    <Instagram className="w-6 h-6" />
                  </Link>
                )}
                {empresa.youtube && (
                  <Link href={empresa.youtube} target="_blank" className="text-gray-500 hover:text-primary transition-colors">
                    <Youtube className="w-6 h-6" />
                  </Link>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="border-t border-gray-200 mt-8 pt-8 text-center">
          <p className="text-gray-500">
            © {new Date().getFullYear()} {empresa.empresanomefantasia}. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}