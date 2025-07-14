Taj Mahal - Modelo de Site para Imobiliárias
Este é um modelo de site moderno e responsivo para imobiliárias, construído com as tecnologias mais recentes como Next.js e TypeScript. O projeto é integrado com a API da RE.AI.s, oferecendo uma base sólida e completa para a criação de portais imobiliários com listagem, busca e detalhes de imóveis e empreendimentos.

✨ Funcionalidades Principais
Busca Avançada: Filtros dinâmicos por tipo de operação (comprar/alugar), tipo de imóvel, localização (estado, cidade, bairro), e mais.

Páginas de Detalhes: Páginas completas para Imóveis e Empreendimentos, com galeria de fotos, mapa de localização, descrição, características e informações de contato/page.tsx].

Listagem de Empreendimentos: Seção dedicada para apresentar os lançamentos e empreendimentos da imobiliária.

Funcionalidades Interativas: Opções para compartilhar imóveis no WhatsApp, Facebook e X (Twitter), além de uma função de impressão.

Páginas Institucionais:

Financie seu Imóvel: Com uma calculadora de financiamento interativa.

Trabalhe Conosco: Página com formulário para envio de currículos.

Contato: Formulário de contato e informações da empresa.

Design Dinâmico: O estilo do site, como cores primárias e secundárias, pode ser ajustado dinamicamente com base nas configurações da empresa vindas da API.

🚀 Tecnologias Utilizadas
Framework: Next.js (App Router)

Linguagem: TypeScript

Estilização: Tailwind CSS

Componentes UI: shadcn/ui

Ícones: Lucide React

Data Fetching (Client-side): SWR

Gerenciador de Pacotes: PNPM

🛠️ Como Executar o Projeto
Siga os passos abaixo para configurar e executar o projeto em seu ambiente local.

Pré-requisitos
Node.js (versão 18.18 ou superior)

PNPM (instalado globalmente: npm install -g pnpm)

1. Clone o Repositório
Bash

git clone https://github.com/ian-cunha/taj-mahal.git
cd taj-mahal
2. Configure as Variáveis de Ambiente
O projeto precisa de um token para se comunicar com a API da RE.AI.s. Para uma melhor prática de segurança, vamos mover o token para uma variável de ambiente.

Crie um arquivo chamado .env.local na raiz do projeto e adicione a seguinte linha, substituindo SEU_TOKEN_AQUI pelo seu token real:

Snippet de código

# .env.local
NEXT_PUBLIC_REAIS_API_TOKEN=SEU_TOKEN_AQUI
Em seguida, atualize o arquivo lib/api.ts para usar essa variável:

Altere esta linha em lib/api.ts:

TypeScript

// De:
const API_TOKEN = "YMurVHvbtAxPRZRLejSwpCHlN8nkmk2fLOx9rBRO"

// Para:
const API_TOKEN = process.env.NEXT_PUBLIC_REAIS_API_TOKEN
3. Instale as Dependências
Use o PNPM para instalar todos os pacotes necessários.

Bash

pnpm install
4. Execute o Servidor de Desenvolvimento
Agora você pode iniciar o projeto localmente.

Bash

pnpm run dev
Abra http://localhost:3000 no seu navegador para ver o resultado.

📁 Estrutura do Projeto
app/: Contém todas as rotas e páginas do site, utilizando o App Router do Next.js.

components/: Abriga os componentes React reutilizáveis.

components/ui/: Componentes base do shadcn/ui.

lib/: Funções e hooks utilitários.

lib/api.ts: Centraliza toda a comunicação com a API da RE.AI.s.

lib/hooks/: Hooks customizados para data fetching.

styles/: Arquivos de estilo global.

types/: Definições de tipos TypeScript para a API e outras entidades.