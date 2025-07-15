import { headers } from "next/headers";
import { obterEmpresa } from "@/lib/api";
import type { Empresa } from "@/types/api";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ContactForm } from "@/components/contact-form";
import { CheckCircle, MessageSquare, Phone } from "lucide-react";

function FinancieImovelClientSection({ empresa }: { empresa: Empresa }) {
  "use client";

  const whatsAppUrl = empresa?.whatsapp
    ? `https://wa.me/55${empresa.whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent("Olá! Gostaria de mais informações sobre o financiamento de imóvel.")}`
    : '';

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
      {/* Formulário de Contato */}
      <div>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <MessageSquare className="w-5 h-5 mr-2" />
              Solicite uma Simulação
            </CardTitle>
            <CardDescription>Preencha o formulário e nossa equipe entrará em contato para uma simulação personalizada.</CardDescription>
          </CardHeader>
          <CardContent>
            <ContactForm />
          </CardContent>
        </Card>
      </div>

      {/* Informações e Ações */}
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Atendimento Rápido</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              Prefere um contato mais direto? Fale agora mesmo com um de nossos especialistas em financiamento pelo WhatsApp.
            </p>
            {whatsAppUrl ? (
              <a href={whatsAppUrl} target="_blank" rel="noopener noreferrer">
                <Button className="w-full">
                  <Phone className="w-4 h-4 mr-2" />
                  Falar com um Especialista
                </Button>
              </a>
            ) : (
              <Button className="w-full" disabled>WhatsApp indisponível</Button>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Vantagens do Financiamento</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              <li className="flex items-start space-x-2">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                <span>As melhores condições do mercado</span>
              </li>
              <li className="flex items-start space-x-2">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                <span>Flexibilidade para realizar seu sonho</span>
              </li>
              <li className="flex items-start space-x-2">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                <span>Comece com o que você pode</span>
              </li>
              <li className="flex items-start space-x-2">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                <span>Agilidade e sem burocracia</span>
              </li>
              <li className="flex items-start space-x-2">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                <span>Assistência em todas as etapas</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default async function FinancieImovelPage() {
  const headerList = await headers();
  const token = headerList.get("X-API-TOKEN");

  // Função para renderizar uma mensagem de erro padronizada
  const renderError = (title: string, message: string) => (
    <div className="container py-12 text-center">
      <h1 className="text-5xl font-bold mb-4">{title}</h1>
      <p className="text-gray-600">{message}</p>
    </div>
  );

  if (!token) {
    return renderError("Oops!", "O token de acesso não foi fornecido.");
  }

  let empresa: Empresa | null = null;
  try {
    empresa = await obterEmpresa(token);
  } catch (error) {
    console.error("Erro ao carregar dados da empresa para financiamento:", error);
    return renderError("Erro ao Carregar a Página", "Não foi possível buscar as informações da imobiliária. Por favor, tente novamente mais tarde.");
  }

  return (
    <div className="py-8">
      <div className="container">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Financie Seu Imóvel</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Realize o sonho da casa própria com as melhores condições de financiamento do mercado.
          </p>
        </div>

        {/* Renderiza a seção do cliente, passando os dados da empresa */}
        <FinancieImovelClientSection empresa={empresa} />

      </div>
    </div>
  );
}