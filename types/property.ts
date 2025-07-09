export interface Property {
  id: number
  title: string
  price: string
  location: string
  bedrooms: number
  bathrooms: number
  area: number
  image: string
  type: string
  description?: string
  features?: string[]
  featured?: boolean
}

export interface PropertyFilter {
  type?: string
  location?: string
  priceRange?: string
  bedrooms?: number
  bathrooms?: number
  minArea?: number
  maxArea?: number
}

export interface ContactForm {
  nome: string
  email: string
  telefone: string
  assunto: string
  mensagem: string
}

export interface PropertyRegistration {
  tipo: string
  endereco: string
  cidade: string
  estado: string
  cep: string
  preco: string
  quartos: string
  banheiros: string
  area: string
  descricao: string
  nome: string
  email: string
  telefone: string
  aceiteTermos: boolean
}
