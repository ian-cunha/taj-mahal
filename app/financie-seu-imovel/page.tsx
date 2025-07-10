"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calculator, DollarSign, FileText, CheckCircle, AlertCircle } from "lucide-react";

export default function FinancieImovelPage() {
  // Estado para armazenar os dados do formulário de simulação
  const [simulationData, setSimulationData] = useState({
    valorImovel: "",
    entrada: "",
    prazo: "",
    renda: "",
  });

  // Estado para armazenar o resultado da simulação
  const [result, setResult] = useState<{
    parcela: number;
    totalPago: number;
    juros: number;
  } | null>(null);

  // Função para converter entrada de moeda (ex.: "R$ 450.000,00" -> 450000.00)
  const parseCurrency = (value: string): number => {
    const cleaned = value.replace(/[^\d,]/g, "").replace(",", ".");
    return parseFloat(cleaned) || 0;
  };

  // Função para formatar número em moeda BRL
  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  // Função para lidar com entrada de valores monetários
  const handleCurrencyInput = (value: string, field: keyof typeof simulationData) => {
    const numericValue = parseCurrency(value);
    setSimulationData({
      ...simulationData,
      [field]: formatCurrency(numericValue),
    });
  };

  // Função para calcular o financiamento
  const calculateFinancing = () => {
    const valor = parseCurrency(simulationData.valorImovel);
    const entrada = parseCurrency(simulationData.entrada);
    const prazoMeses = parseInt(simulationData.prazo) * 12;
    const renda = parseCurrency(simulationData.renda);
    const taxaJuros = 0.008; // Taxa de juros de 0.8% ao mês (exemplo)

    // Validação dos campos
    if (!valor || !entrada || !prazoMeses || !renda || entrada > valor) {
      alert("Por favor, preencha todos os campos corretamente e verifique se a entrada é menor que o valor do imóvel.");
      return;
    }

    const valorFinanciado = valor - entrada;
    if (valorFinanciado <= 0) {
      alert("O valor financiado deve ser maior que zero.");
      return;
    }

    // Fórmula de amortização Price: P = [V * i * (1 + i)^n] / [(1 + i)^n - 1]
    const parcela =
      (valorFinanciado * taxaJuros * Math.pow(1 + taxaJuros, prazoMeses)) /
      (Math.pow(1 + taxaJuros, prazoMeses) - 1);

    const totalPago = parcela * prazoMeses + entrada;
    const juros = totalPago - valor;

    // Armazena o resultado arredondado
    setResult({
      parcela: Math.round(parcela),
      totalPago: Math.round(totalPago),
      juros: Math.round(juros),
    });
  };

  return (
    <div className="py-8">
      <div className="container">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Financie Seu Imóvel</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Realize o sonho da casa própria com as melhores condições de financiamento do mercado
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Formulário de Simulação */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calculator className="w-5 h-5 mr-2" />
                  Simulador de Financiamento
                </CardTitle>
                <CardDescription>Calcule suas parcelas e veja se cabe no seu orçamento</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="valorImovel">Valor do Imóvel</Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      id="valorImovel"
                      placeholder="R$ 450.000,00"
                      value={simulationData.valorImovel}
                      onChange={(e) => handleCurrencyInput(e.target.value, "valorImovel")}
                      className="pl-10"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="entrada">Valor da Entrada</Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      id="entrada"
                      placeholder="R$ 90.000,00"
                      value={simulationData.entrada}
                      onChange={(e) => handleCurrencyInput(e.target.value, "entrada")}
                      className="pl-10"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="prazo">Prazo (anos)</Label>
                  <Select
                    value={simulationData.prazo}
                    onValueChange={(value) => setSimulationData({ ...simulationData, prazo: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o prazo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="5">5 anos</SelectItem>
                      <SelectItem value="10">10 anos</SelectItem>
                      <SelectItem value="15">15 anos</SelectItem>
                      <SelectItem value="20">20 anos</SelectItem>
                      <SelectItem value="25">25 anos</SelectItem>
                      <SelectItem value="30">30 anos</SelectItem>
                      <SelectItem value="35">35 anos</SelectItem>
                      <SelectItem value="40">40 anos</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="renda">Renda Familiar</Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      id="renda"
                      placeholder="R$ 8.000,00"
                      value={simulationData.renda}
                      onChange={(e) => handleCurrencyInput(e.target.value, "renda")}
                      className="pl-10"
                    />
                  </div>
                </div>

                <Button onClick={calculateFinancing} className="w-full">
                  <Calculator className="w-4 h-4 mr-2" />
                  Calcular Financiamento
                </Button>
              </CardContent>
            </Card>

            {/* Resultados */}
            {result && (
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Resultado da Simulação</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <p className="text-sm text-gray-600">Parcela Mensal</p>
                      <p className="text-2xl font-bold text-blue-600">
                        {formatCurrency(result.parcela)}
                      </p>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <p className="text-sm text-gray-600">Total Pago</p>
                      <p className="text-2xl font-bold text-green-600">
                        {formatCurrency(result.totalPago)}
                      </p>
                    </div>
                    <div className="text-center p-4 bg-orange-50 rounded-lg">
                      <p className="text-sm text-gray-600">Total de Juros</p>
                      <p className="text-2xl font-bold text-orange-600">
                        {formatCurrency(result.juros)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 p-4 bg-gray-50 rounded-lg">
                    {result.parcela <= parseCurrency(simulationData.renda) * 0.3 ? (
                      <>
                        <CheckCircle className="w-5 h-5 text-green-600" />
                        <p className="text-green-700">Parcela dentro do recomendado (até 30% da renda)</p>
                      </>
                    ) : (
                      <>
                        <AlertCircle className="w-5 h-5 text-orange-600" />
                        <p className="text-orange-700">Parcela acima do recomendado (30% da renda)</p>
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Informações */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Vantagens do Financiamento</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                    <span>Taxas de juros competitivas</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                    <span>Prazos de até 40 anos</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                    <span>Entrada a partir de 20%</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                    <span>Aprovação rápida</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                    <span>Suporte completo na documentação</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="w-5 h-5 mr-2" />
                  Documentos Necessários
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="font-medium">Pessoa Física:</p>
                  <ul className="text-sm text-gray-600 space-y-1 ml-4">
                    <li>• RG e CPF</li>
                    <li>• Comprovante de renda</li>
                    <li>• Comprovante de residência</li>
                    <li>• Extrato bancário (3 meses)</li>
                    <li>• Certidão de nascimento/casamento</li>
                  </ul>

                  <p className="font-medium mt-4">Pessoa Jurídica:</p>
                  <ul className="text-sm text-gray-600 space-y-1 ml-4">
                    <li>• Contrato social</li>
                    <li>• CNPJ</li>
                    <li>• Balanço patrimonial</li>
                    <li>• Demonstrativo de resultados</li>
                    <li>• Certidões negativas</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-blue-50">
              <CardContent className="p-6 text-center">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Precisa de Ajuda?</h3>
                <p className="text-gray-600 mb-4">
                  Nossa equipe está pronta para ajudar você a conseguir o melhor financiamento
                </p>
                <Button className="w-full">Falar com Especialista</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}