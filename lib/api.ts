import type {
  ApiResponse,
  Imovel,
  Empreendimento,
  Estado,
  Cidade,
  Bairro,
  Empresa,
  ConfiguracaoSite,
  FiltroImovel,
  FiltroEmpreendimento,
} from "@/types/api"

// URLs diferentes para diferentes endpoints
const API_BASE_URL_HTTPS = "https://app.reaisystems.com.br/sites/v1"
const API_TOKEN = "oRGtX0YVwAcenYxZTZzCCqU50Zcu2vTODXGAWRSN"

class ApiError extends Error {
  constructor(
    message: string,
    public status?: number,
  ) {
    super(message)
    this.name = "ApiError"
  }
}

async function apiRequest<T>(url: string, retryWithHttp = true): Promise<T> {
  try {
    console.log("🔄 API Request:", url);

    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      redirect: "follow",
      next: { revalidate: 300 }, // Cache por 5 minutos
    });

    console.log("📡 Response status:", response.status);

    if (!response.ok) {
      throw new ApiError(`HTTP error! status: ${response.status}`, response.status);
    }

    const data = await response.json();
    console.log("✅ API Response success:", data.mensagem === "sucesso");

    if (data.mensagem !== "sucesso") {
      throw new ApiError(data.mensagem || "Erro na API");
    }

    return data;
  } catch (error) {
    console.error("❌ API Error:", { url, error: error instanceof Error ? error.message : error });

    if (retryWithHttp && url.includes("https://")) {
      const httpUrl = url.replace("https://", "http://");
      console.log("🔄 Retrying with HTTP:", httpUrl);
      try {
        return await apiRequest<T>(httpUrl, false);
      } catch (retryError) {
        // Lança o erro da nova tentativa se a primeira também falhou
        throw retryError;
      }
    }

    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError("Erro de conexão com a API");
  }
}

// Interface para disponibilidade de tipos de operação
export interface DisponibilidadeOperacao {
  temVenda: boolean
  temLocacao: boolean
}

// Função para verificar disponibilidade de operações
export async function verificarDisponibilidadeOperacoes(): Promise<DisponibilidadeOperacao> {
  try {
    console.log("🔍 Verificando disponibilidade de operações...")

    // Verificar se tem imóveis para venda
    const filtroVenda = criarFiltroImovel({
      quantidadeImoveis: 1,
      statusImovelStr: "V",
    })

    // Verificar se tem imóveis para locação
    const filtroLocacao = criarFiltroImovel({
      quantidadeImoveis: 1,
      statusImovelStr: "L",
    })

    const [resultVenda, resultLocacao] = await Promise.allSettled([
      obterTotalImoveis(filtroVenda),
      obterTotalImoveis(filtroLocacao),
    ])

    const temVenda = resultVenda.status === "fulfilled" && resultVenda.value > 0
    const temLocacao = resultLocacao.status === "fulfilled" && resultLocacao.value > 0

    console.log("📊 Disponibilidade:", { temVenda, temLocacao })

    return {
      temVenda,
      temLocacao,
    }
  } catch (error) {
    console.error("❌ Erro ao verificar disponibilidade:", error)
    // Em caso de erro, assume que ambos estão disponíveis
    return {
      temVenda: true,
      temLocacao: true,
    }
  }
}

// Funções para Imóveis
export async function obterImovel(codigoImovel: string): Promise<Imovel> {
  const data = await apiRequest<ApiResponse<Imovel>>(`${API_BASE_URL_HTTPS}/imovel/${codigoImovel}/${API_TOKEN}`)
  return data.imovel as Imovel
}

export async function obterTotalImoveis(filtro: FiltroImovel): Promise<number> {
  try {
    const filtroJson = encodeURIComponent(JSON.stringify(filtro))
    const data = await apiRequest<ApiResponse<number>>(
      `${API_BASE_URL_HTTPS}/imovel/totalImoveisFiltro?filtro=${filtroJson}`,
    )
    return data.total as number
  } catch (error) {
    console.error("Erro ao obter total de imóveis:", error)
    return 0
  }
}

export async function listarImoveis(filtro: FiltroImovel): Promise<Imovel[]> {
  const filtroJson = encodeURIComponent(JSON.stringify(filtro))
  console.log("🔍 Filtro JSON:", JSON.stringify(filtro, null, 2))

  const data = await apiRequest<ApiResponse<Imovel[]>>(
    `${API_BASE_URL_HTTPS}/imovel/listarImoveisFiltro?filtro=${filtroJson}`,
  )
  return data.imoveis as Imovel[]
}

export async function listarImoveisPorCodigos(codigos: string[]): Promise<Imovel[]> {
  const codigosStr = codigos.join(";")
  const data = await apiRequest<ApiResponse<Imovel[]>>(
    `${API_BASE_URL_HTTPS}/imovel/listarImoveisLista?codigos=${codigosStr}&token=${API_TOKEN}`,
  )
  return data.imoveis as Imovel[]
}

export async function obterImoveisSugeridos(codigo: string, limite?: number): Promise<Imovel[]> {
  const url = limite
    ? `${API_BASE_URL_HTTPS}/imovel/imoveisSugeridos/${codigo}/${limite}/${API_TOKEN}`
    : `${API_BASE_URL_HTTPS}/imovel/imoveisSugeridos/${codigo}/${API_TOKEN}`

  const data = await apiRequest<ApiResponse<Imovel[]>>(url)
  return data.imoveis as Imovel[]
}

// Funções para Empreendimentos
export async function obterEmpreendimento(id: number): Promise<Empreendimento> {
  const data = await apiRequest<ApiResponse<Empreendimento>>(`${API_BASE_URL_HTTPS}/empreendimento/${id}/${API_TOKEN}`)
  return data.empreendimento as Empreendimento
}

export async function obterTotalEmpreendimentos(filtro: FiltroEmpreendimento): Promise<number> {
  const filtroJson = encodeURIComponent(JSON.stringify(filtro))
  const data = await apiRequest<ApiResponse<number>>(
    `${API_BASE_URL_HTTPS}/empreendimento/totalEmpreendimentosFiltro?filtro=${filtroJson}`,
  )
  return data.total as number
}

export async function listarEmpreendimentos(filtro: FiltroEmpreendimento): Promise<Empreendimento[]> {
  const filtroJson = encodeURIComponent(JSON.stringify(filtro))
  const data = await apiRequest<ApiResponse<Empreendimento[]>>(
    `${API_BASE_URL_HTTPS}/empreendimento/listarEmpreendimentosFiltro?filtro=${filtroJson}`,
  )
  return data.empreendimentos as Empreendimento[]
}

export async function listarEmpreendimentosPorIds(ids: number[]): Promise<Empreendimento[]> {
  const idsStr = ids.join(";")
  const data = await apiRequest<ApiResponse<Empreendimento[]>>(
    `${API_BASE_URL_HTTPS}/empreendimento/listarEmpreendimentosLista?listaId=${idsStr}&token=${API_TOKEN}`,
  )
  return data.empreendimentos as Empreendimento[]
}

// Funções para Localização
export async function obterEstados(): Promise<Estado[]> {
  const data = await apiRequest<ApiResponse<Estado[]>>(`${API_BASE_URL_HTTPS}/localizacao/estados`)
  return data.estados as Estado[]
}

export async function obterEstado(codigo: number): Promise<Estado> {
  const data = await apiRequest<ApiResponse<Estado>>(`${API_BASE_URL_HTTPS}/localizacao/estado/${codigo}`)
  return data.estado as Estado
}

export async function obterCidades(codigoEstado: number): Promise<Cidade[]> {
  const data = await apiRequest<ApiResponse<Cidade[]>>(`${API_BASE_URL_HTTPS}/localizacao/cidades/${codigoEstado}`)
  return data.cidades as Cidade[]
}

export async function obterCidade(codigo: number): Promise<Cidade> {
  const data = await apiRequest<ApiResponse<Cidade>>(`${API_BASE_URL_HTTPS}/localizacao/cidade/${codigo}`)
  return data.cidade as Cidade
}

export async function obterBairros(codigoCidade: number): Promise<Bairro[]> {
  const data = await apiRequest<ApiResponse<Bairro[]>>(`${API_BASE_URL_HTTPS}/localizacao/bairros/${codigoCidade}`)
  return data.bairros as Bairro[]
}

export async function obterBairro(codigo: number): Promise<Bairro> {
  const data = await apiRequest<ApiResponse<Bairro>>(`${API_BASE_URL_HTTPS}/localizacao/bairro/${codigo}`)
  return data.bairro as Bairro
}

// Funções para Empresa
export async function obterEmpresa(): Promise<Empresa> {
  const data = await apiRequest<ApiResponse<Empresa>>(`${API_BASE_URL_HTTPS}/empresa/${API_TOKEN}`)
  return data.empresa as Empresa
}

export async function obterConfiguracaoSite(): Promise<ConfiguracaoSite> {
  const data = await apiRequest<ApiResponse<ConfiguracaoSite>>(
    `${API_BASE_URL_HTTPS}/empresa/configuracaoSite/${API_TOKEN}`,
  )
  return data.configuracaoSite as ConfiguracaoSite
}

// Função para criar filtro padrão com token
export function criarFiltroImovel(params: Partial<FiltroImovel> = {}): FiltroImovel {
  const filtroBase: FiltroImovel = {
    token: API_TOKEN,
    quantidadeImoveis: 12,
    statusImovelStr: "V;L",
    novos: true,
    usados: true,
    paginado: false,
    temFoto: "s",
  }

  return { ...filtroBase, ...params }
}

export function criarFiltroEmpreendimento(params: Partial<FiltroEmpreendimento> = {}): FiltroEmpreendimento {
  return {
    token: API_TOKEN,
    quantidade: 12,
    ...params,
  }
}

// Funções auxiliares
export function formatarPreco(preco: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(preco)
}

export function obterTipoImovelNome(id: string): string {
  const tipos: Record<string, string> = {
    "1": "Apartamento",
    "2": "Casa",
    "3": "Loja",
    "4": "Terreno/Loteamento",
    "5": "Galpão/Prédio Comercial",
    "6": "Sala Comercial",
    "7": "Rural",
    "8": "Flat/Studio",
    "9": "Hotel/Pousada",
    "10": "Restaurante/Lanchonete",
  }
  return tipos[id] || "Imóvel"
}

export function obterCaracteristicas(imovel: Imovel): string[] {
  const caracteristicas: string[] = []

  if (imovel.temPiscina === "1") caracteristicas.push("Piscina")
  if (imovel.temChurrasqueira === "1") caracteristicas.push("Churrasqueira")
  if (imovel.temPlayground === "1") caracteristicas.push("Playground")
  if (imovel.temSalaoFestas === "1") caracteristicas.push("Salão de Festas")
  if (imovel.temQuadraEsportiva === "1") caracteristicas.push("Quadra Esportiva")
  if (imovel.temSauna === "1") caracteristicas.push("Sauna")
  if (imovel.temSalaGinastica === "1") caracteristicas.push("Academia")
  if (imovel.temPortaria24h === "1") caracteristicas.push("Portaria 24h")
  if (imovel.temElevador === "1") caracteristicas.push("Elevador")
  if (imovel.temVaranda === "1") caracteristicas.push("Varanda")
  if (imovel.temJardimExterno === "1") caracteristicas.push("Jardim")
  if (imovel.mobiliado === "1") caracteristicas.push("Mobiliado")
  if (imovel.podefinanciar === "1") caracteristicas.push("Financiável")

  return caracteristicas
}
