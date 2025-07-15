import { headers } from "next/headers"; // Importar
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { obterEmpresa } from "@/lib/api";
import { JobApplicationForm } from "@/components/job-application-form";
import { Briefcase, Mail, Phone } from "lucide-react";
import Link from "next/link";

export default async function TrabalheConoscoPage() {
  const headerList = await headers();
  const token = headerList.get("X-API-TOKEN");

  if (!token) {
    return (
      <div className="container py-12 text-center">
        <h1 className="text-5xl font-bold mb-4">Oops!</h1>
        <p className="text-gray-600">O token de acesso não foi fornecido.</p>
      </div>
    );
  }

  let empresa;
  try {
    empresa = await obterEmpresa(token);
  } catch (error) {
    console.error("Erro ao carregar dados da empresa:", error);
    return (
      <div className="container py-12 text-center">
        <h1 className="text-2xl font-bold text-red-600 mb-4">Erro ao Carregar a Página</h1>
        <p className="text-gray-600">Não foi possível buscar as informações da imobiliária. Por favor, tente novamente mais tarde.</p>
      </div>
    );
  }

  // Define os contatos de RH que serão exibidos, apenas se existirem.
  const rhContacts = [
    empresa.email ? { icon: Mail, value: empresa.email, href: `mailto:${empresa.email}` } : null,
    empresa.tel1 ? { icon: Phone, value: empresa.tel1, href: `tel:${empresa.tel1.replace(/\D/g, '')}` } : null
  ].filter(Boolean); // Remove os nulos da lista

  return (
    <div className="py-12 bg-gray-50">
      <div className="container max-w-4xl mx-auto">
        {/* Cabeçalho Dinâmico */}
        <div className="text-center mb-12">
          <Briefcase className="w-16 h-16 text-blue-600 mx-auto mb-4" />
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
            Trabalhe Conosco na {empresa.empresanomefantasia}
          </h1>
        </div>

        <div className="grid grid-cols-1 gap-8">

          {/* Formulário de Candidatura como elemento principal */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Envie sua Candidatura</CardTitle>
              <CardDescription>
                Interessado em fazer parte da nossa equipe? Preencha o formulário abaixo e anexe seu currículo.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <JobApplicationForm />
            </CardContent>
          </Card>

          {/* Card de Contatos de RH, renderizado apenas se houver contatos */}
          {rhContacts.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Contatos Diretos de RH</CardTitle>
                <CardDescription>
                  Se preferir, pode enviar seu currículo diretamente para nosso e-mail ou entrar em contato pelo telefone.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {rhContacts.map((contact, index) => contact && (
                  <div key={index} className="flex items-center gap-3">
                    <contact.icon className="w-5 h-5 text-gray-500" />
                    <Link href={contact.href} target="_blank" className="text-blue-600 hover:underline">
                      {contact.value}
                    </Link>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

        </div>
      </div>
    </div>
  )
}