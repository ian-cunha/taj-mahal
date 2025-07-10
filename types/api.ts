// Tipos baseados na documentação da API RE.AI.s

export interface ApiResponse<T> {
  mensagem: string
  [key: string]: T | string
}

export interface Imovel {
  codigoImovel: string
  codigoReferenciaImovel: string
  dataCadastroImovel: string
  nomeImovel: string
  preco: number
  temporada: "0" | "1"
  precoTemporada?: number
  endereco: string
  localizacao: string
  numero: string
  complemento: string
  nomeBairro: string
  nomeCidade: string
  siglaEstado: string
  areautil: number
  unidade2: string
  iptu: number
  vlrparcelaiptu: number
  condominio: number
  nquartos: string
  nsuites: number
  ngaragens: string
  nelevadores: string
  aptoAndar: string
  nandares: string
  nsalas: number
  nambientes: number
  nbanheirossociais: number
  fotodestaque: number
  fotoImovel1?: string
  fotoImovel2?: string
  fotoImovel3?: string
  fotoImovel4?: string
  fotoImovel5?: string
  fotoImovel6?: string
  fotoImovel7?: string
  fotoImovel8?: string
  fotoImovel9?: string
  fotoImovel10?: string
  descricao: string
  expoimovel: "0" | "1"
  siteimob: "0" | "1"
  endMostrarInternet: "0" | "1"
  nomeMostrarInternet: "0" | "1"
  tipoImovel: string
  idTipoImovel: string
  tipoOperacao: "V" | "L"
  descricaoTipoOperacao: string
  codEdificio?: string
  idEmpreendimento?: number
  construtora?: number
  empresaId: number
  empresaLogomarca: string
  empresaRazaoSocial: string
  empresaNomeFantasia: string
  // Características do imóvel (muitas propriedades char '0'/'1')
  temInterfone: "0" | "1"
  temAntenaColetiva: "0" | "1"
  temPiscina: "0" | "1"
  temPlayground: "0" | "1"
  temGerador: "0" | "1"
  temQuadraEsportiva: "0" | "1"
  temSauna: "0" | "1"
  temSalaGinastica: "0" | "1"
  temPocoArtesiano: "0" | "1"
  temPistaCooper: "0" | "1"
  temSalaoFestas: "0" | "1"
  temCentralGas: "0" | "1"
  temPortaoEletronico: "0" | "1"
  temChurrasqueira: "0" | "1"
  temGuarita: "0" | "1"
  temSistemaSeguranca: "0" | "1"
  temPilotis: "0" | "1"
  temArmarioQuarto: "0" | "1"
  temBoxBanheiro: "0" | "1"
  temDepEmpregada: "0" | "1"
  temDepPrivativo: "0" | "1"
  temEstacionamento: "0" | "1"
  temInternet: "0" | "1"
  mobiliado: "0" | "1"
  temTvCabo: "0" | "1"
  temVaranda: "0" | "1"
  temAreaServico: "0" | "1"
  temCloset: "0" | "1"
  temCopa: "0" | "1"
  temCorredor: "0" | "1"
  temCozinha: "0" | "1"
  temDespensa: "0" | "1"
  temEscritorio: "0" | "1"
  temHidro: "0" | "1"
  temLavabo: "0" | "1"
  temMezanino: "0" | "1"
  temPergolado: "0" | "1"
  temQuartoReversivel: "0" | "1"
  temSalaEstar: "0" | "1"
  temSalaIntima: "0" | "1"
  temSalaJantar: "0" | "1"
  temSalaVisita: "0" | "1"
  temTelefone: "0" | "1"
  temCanil: "0" | "1"
  temJardimExterno: "0" | "1"
  temJardimInterno: "0" | "1"
  temLavanderia: "0" | "1"
  nascente: "0" | "1"
  poente: "0" | "1"
  ruaCalcada: "0" | "1"
  temWcServico: "0" | "1"
  temBar: "0" | "1"
  temSalaConvivencia: "0" | "1"
  temCozinhaAmericana: "0" | "1"
  temArmarioCozinha: "0" | "1"
  temCeramica: "0" | "1"
  cercado: "0" | "1"
  conjugada: "0" | "1"
  temDocumentacao: "0" | "1"
  temEscritura: "0" | "1"
  temEsquadrilha: "0" | "1"
  gradeado: "0" | "1"
  isolado: "0" | "1"
  murado: "0" | "1"
  temPiso: "0" | "1"
  temQuartoDeposito: "0" | "1"
  quitado: "0" | "1"
  temRodaTeto: "0" | "1"
  sol: "0" | "1"
  sombra: "0" | "1"
  vistaRio: "0" | "1"
  vistaLagoa: "0" | "1"
  vistaMata: "0" | "1"
  vistaMar: "0" | "1"
  beiraMar: "0" | "1"
  caixaDagua: "0" | "1"
  esquina: "0" | "1"
  salaoJogos: "0" | "1"
  sisterna: "0" | "1"
  lajeado: "0" | "1"
  temMuroAlto: "0" | "1"
  temQuintal: "0" | "1"
  temTerraco: "0" | "1"
  temEstacionamentoVisitantes: "0" | "1"
  saneado: "0" | "1"
  temBusinessCenter: "0" | "1"
  temCentralFaxRecados: "0" | "1"
  temCoffeeShop: "0" | "1"
  temHomeOffice: "0" | "1"
  temLimpezaUnidades: "0" | "1"
  temManutencaoUnidades: "0" | "1"
  temSalaConvencoes: "0" | "1"
  temEspacoGourmet: "0" | "1"
  temColetaLavanderia: "0" | "1"
  temRestaurante: "0" | "1"
  temPatioDescarga: "0" | "1"
  temTelaNaVaranda: "0" | "1"
  temArmariosProjetados: "0" | "1"
  temElevadorInteligente: "0" | "1"
  temArcondicionadoCentral: "0" | "1"
  temArcondicionadoSplit: "0" | "1"
  temBicicletario: "0" | "1"
  temElevadorPanoramico: "0" | "1"
  temArcondicionadoParede: "0" | "1"
  temCercaEletrica: "0" | "1"
  temTerracoEmL: "0" | "1"
  temGaragemCoberta: "0" | "1"
  temEdicula: "0" | "1"
  temPisoElevado: "0" | "1"
  temDepositoSubsolo: "0" | "1"
  temLuzEletrica: "0" | "1"
  temAguaEncanada: "0" | "1"
  temVistaAberta: "0" | "1"
  foreiro: "0" | "1"
  podefinanciar: "0" | "1"
  destaque: "0" | "1"
  destaquebanner: "0" | "1"
  cobertura: "0" | "1"
  condominioFechado: "0" | "1"
  temHidrometroIndividual: "0" | "1"
  temPortaria24h: "0" | "1"
  temElevador: "0" | "1"
  litoral: "0" | "1"
  Popular: "0" | "1"
  distanciaCidade: number
  frente: number
  esquerda: number
  fundo: number
  direita: number
  peDireito: number
  dataEntrega?: string
  tipoTerreno?: number
  topografia?: number
  urlCustom: string
  estagioObra?: number
  situacaoEmpreendimento?: number
  urlDetalhe: string
  urlFichaPublica: string
  urlImpressao: string
  urlFotoDestaque: string
  salaPersonalizado: string
  fotoImovelList: FotoImovel[]
  caracteristicasImovel: string[]
  caracteristicasEmpreendimento: string[]
}

export interface FotoImovel {
  nome: string
  descricao: string
  destaque: number
  url: string
  urlThumbnail: string
  urlThumbnailMiddleHD: string
}

export interface Empreendimento {
  idEmpreendimento: number
  codigo: string
  nome: string
  categoria: "0" | "1" // 0-Residencial, 1-Comercial
  datacadastro: string
  endereco: string
  numero: string
  nomeBairro: string
  nomeCidade: string
  siglaEstado: string
  smartEmpreendimento: number
  estagioObra: number
  situacaoEmpreendimento: number
  dataEntrega?: string
  totalBlocos: number
  totalUnidades: number
  unidadesAndar: number
  numPavimentos: number
  numElevadores: number
  menorPrecoUnidades: number
  fotoDestaqueEmpreendimento: string
  previsaoEntrega?: string
  pontoReferencia: string
  diferenciais: string
  memorial: string
  urlHotsite: string
  urlVideo: string
  // Características do empreendimento (muitas propriedades char '0'/'1')
  caracAntenaColetiva: "0" | "1"
  caracArCondicCentral: "0" | "1"
  caracArCondicParede: "0" | "1"
  caracArCondicSplit: "0" | "1"
  caracBar: "0" | "1"
  caracBeiraMar: "0" | "1"
  caracBicicletario: "0" | "1"
  caracCaixaDagua: "0" | "1"
  caracCanil: "0" | "1"
  caracCentralGas: "0" | "1"
  caracCercaEletrica: "0" | "1"
  caracChurrasqueira: "0" | "1"
  caracCisterna: "0" | "1"
  caracDepositoPrivado: "0" | "1"
  caracElevIntelig: "0" | "1"
  caracElevPanoram: "0" | "1"
  caracEsquina: "0" | "1"
  caracEstacionamento: "0" | "1"
  caracGerador: "0" | "1"
  caracGuarita: "0" | "1"
  caracInterfone: "0" | "1"
  caracInternet: "0" | "1"
  caracJardimExt: "0" | "1"
  caracJardimInt: "0" | "1"
  caracLavanderia: "0" | "1"
  caracPilotis: "0" | "1"
  caracPiscina: "0" | "1"
  caracPistaCooper: "0" | "1"
  caracPlayground: "0" | "1"
  caracPocoArtesiano: "0" | "1"
  caracPortaoEletronico: "0" | "1"
  caracQuadraPoliesp: "0" | "1"
  caracRuaCalcada: "0" | "1"
  caracSalaConvivencia: "0" | "1"
  caracSalaGinastica: "0" | "1"
  caracSalaoFestas: "0" | "1"
  caracSalaoJogos: "0" | "1"
  caracSauna: "0" | "1"
  caracSistemaSeguranca: "0" | "1"
  caracTvCabo: "0" | "1"
  caracEdicula: "0" | "1"
  caracGaragemCoberta: "0" | "1"
  caracGradeado: "0" | "1"
  caracLajeado: "0" | "1"
  caracMuroAlto: "0" | "1"
  caracQuintal: "0" | "1"
  caracEstacionamentoVisit: "0" | "1"
  caracPisoElevado: "0" | "1"
  caracBusinessCenter: "0" | "1"
  caracCentralFaxRec: "0" | "1"
  caracCoffeeShop: "0" | "1"
  caracColetaLavanderia: "0" | "1"
  caracEspacoGourmet: "0" | "1"
  caracHomeOffice: "0" | "1"
  caracLimpezaUnidades: "0" | "1"
  caracManutencaoUnidades: "0" | "1"
  caracRestaurante: "0" | "1"
  caracSalaConvencoes: "0" | "1"
  caracPortaria24h: "0" | "1"
  caracTopografia: "0" | "1"
  caracLitoral: "0" | "1"
  caracPopular: "0" | "1"
  outrasCaracteristicas: string
  fotosEmpreendimento: FotoEmpreendimento[]
  tiposImovel: TipoImovel[]
  listaCaracteristicas: string[]
  videos: Video[]
  tabelas: TabelaPreco[]
  arquivos: ArquivoEmpreendimento[]
  nomeCustom: string
  urlDetalhe: string
  urlFichaPublica: string
  urlImpressao: string
  precoPersonalizado: string
  quartoPersonalizado: string
  suitePersonalizado: string
  areaPersonalizada: string
  vagaPersonalizada: string
  menorPrecoTipo: number
  maiorPrecoTipo: number
  urlFotoBanner: string
  urlFotoDestaque: string
}

export interface FotoEmpreendimento {
  id: number
  nome: string
  descricao: string
  destaque: number
  url: string
  urlThumbnail: string
  urlThumbnailMiddleHD: string
}

export interface TipoImovel {
  id: string
  nome: string
}

export interface Video {
  descricao: string
  url: string
}

export interface TabelaPreco {
  dataCadastro: string
  dataAtualizacao: string
  tipoTabela: number
  nomeTabela: string
  descricao: string
  url: string
}

export interface ArquivoEmpreendimento {
  cadastradoEm: string
  atualizadoEm: string
  nome: string
  descricao: string
  url: string
}

export interface Estado {
  codigo: number
  nome: string
  uf: string
}

export interface Cidade {
  codigo: number
  cidade: string
}

export interface Bairro {
  codigo: number
  bairro: string
}

export interface Empresa {
  id: number
  empresarazaosocial: string
  empresanomefantasia: string
  empresanomeresponsavel: string
  email: string
  homepage: string
  tel1: string
  endereco: string
  bairro: number
  cidade: number
  uf: number
  cep: string
  urlLogomarca: string
  // Campos adicionais
  enderecoFormatado?: string
  slogan?: string
  politicaQualidade?: string
  urlFotoAgencia?: string
  creci?: string
  facebook?: string
  instagram?: string
  youtube?: string
  whatsapp?: string
}

export interface ConfiguracaoSite {
  corFundo: string
  corFonte: string
  corPrimaria?: string
  corSecundaria?: string
  corDestaque?: string
  corTexto?: string
  corLink?: string
  corBotao?: string
  corBotaoHover?: string
  corHeader?: string
  corFooter?: string
  corCard?: string
  corBorda?: string
  fontePrimaria?: string
  fonteSecundaria?: string
  logoUrl?: string
  faviconUrl?: string
  metaTitle?: string
  metaDescription?: string
  metaKeywords?: string
  idImagemFundoBusca?: {
    urlImagemFundoBusca?: string;
  }
  idVideoFundoBusca?: {
    urlVideoFundoBusca?: string;
  }
  [key: string]: any
}

// Filtros para pesquisa
export interface FiltroImovel {
  token: string
  quantidadeImoveis: number
  tipoImovel?: string
  idEstado?: number
  idCidade?: number
  idBairros?: number[]
  statusImovelStr?: string
  empreendimento?: boolean
  novos?: boolean
  usados?: boolean
  paginado?: boolean
  startpag?: number
  pagAtual?: number
  qtdTotal?: number
  precoMinimo?: string
  precoMaximo?: string
  areaPrivativaMinimo?: string
  areaPrivativaMaximo?: string
  quartosMinimo?: string
  quartosMaximo?: string
  garagensMinimo?: string
  garagensMaximo?: string
  logradouro?: string
  nomeDoImovel?: string
  temporada?: boolean
  litoral?: boolean
  mobiliado?: boolean
  popular?: boolean
  podeSerFinanciado?: boolean
  estagioObra?: number
  situacaoEmpreendimento?: number
  estagioObraStr?: string
  situacaoEmpreendimentoStr?: string
  tipoContrato?: string
  destaqueNoSite?: boolean
  destaqueNoBanner?: boolean
  redeImobiliaria?: number
  ordenacao?: string
  temFoto?: "s" | "n"
  termo?: string
}

export interface FiltroEmpreendimento {
  token: string
  quantidade: number
  nome?: string
  idEstado?: number
  idCidade?: number
  idBairros?: number[]
  paginado?: boolean
  startpag?: number
  pagAtual?: number
  qtdTotal?: number
  precoMinimo?: string
  precoMaximo?: string
  quartosMinimo?: string
  quartosMaximo?: string
  areaPrivativaMinimo?: string
  areaPrivativaMaximo?: string
  garagensMinimo?: number
  garagensMaximo?: number
  litoral?: boolean
  popular?: boolean
  temTabelaPreco?: boolean
  temUnidadesDisponiveis?: boolean
  destaque?: boolean
  destaquebanner?: boolean
  estagioObra?: number
  situacaoEmpreendimento?: number
  estagioObraStr?: string
  situacaoEmpreendimentoStr?: string
  termo?: string
}
