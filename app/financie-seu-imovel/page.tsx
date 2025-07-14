"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ContactForm } from "@/components/contact-form";
import { obterEmpresa } from "@/lib/api";
import type { Empresa } from "@/types/api";
import { CheckCircle, MessageSquare, Phone } from "lucide-react";

export default function FinancieImovelPage() {
  const [empresa, setEmpresa] = useState<Empresa | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadEmpresa() {
      try {
        const dadosEmpresa = await obterEmpresa();
        setEmpresa(dadosEmpresa);
      } catch (error) {
        console.error("Erro ao carregar dados da empresa:", error);
      } finally {
        setLoading(false);
      }
    }
    loadEmpresa();
  }, []);

  const whatsAppUrl = empresa?.whatsapp
    ? `https://wa.me/55${empresa.whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent("Olá! Gostaria de mais informações sobre o financiamento de imóvel.")}`
    : '';

  return (
    <div className="py-8">
      <div className="container">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Financie Seu Imóvel</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Realize o sonho da casa própria com as melhores condições de financiamento do mercado.
          </p>
        </div>

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
                {loading ? (
                  <Button className="w-full" disabled>Carregando...</Button>
                ) : whatsAppUrl ? (
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
      </div>
    </div>
  );
}