import { headers } from "next/headers";
import { EmpreendimentosResults } from "@/components/empreendimentos-results";
import { listarEmpreendimentos, criarFiltroEmpreendimento } from "@/lib/api";
import type { Empreendimento } from "@/types/api";

// Componente principal da página (Server Component)
export default async function EmpreendimentosPage() {
  const headerList = await headers();
  const token = headerList.get("X-API-TOKEN");

  // Função para renderizar o erro de forma padronizada
  const renderError = (title: string, message: string) => (
    <div className="container py-12 text-center">
      <h1 className="text-5xl font-bold mb-4">{title}</h1>
      <p className="text-gray-600">{message}</p>
    </div>
  );

  if (!token) {
    return renderError("Oops!", "O token de acesso não foi fornecido.");
  }

  let empreendimentos: Empreendimento[] = [];
  try {
    const filtro = criarFiltroEmpreendimento(token, {
      quantidade: 12, // Ou quantos você desejar
    });
    empreendimentos = await listarEmpreendimentos(filtro);
  } catch (error) {
    console.error("❌ Erro ao carregar empreendimentos:", error);
    // Em caso de erro, passaremos um array vazio para o componente filho,
    // que saberá como exibir uma mensagem apropriada.
  }

  return (
    <div className="py-8">
      <div className="container">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Empreendimentos</h1>
          <p className="text-lg text-gray-600">Conheça nossos lançamentos e empreendimentos em destaque</p>
        </div>

        <EmpreendimentosResults empreendimentos={empreendimentos} />
      </div>
    </div>
  );
}