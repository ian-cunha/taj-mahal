import { Award, Users, Home, Clock } from "lucide-react"
import { obterEmpresa } from "@/lib/api"

const stats = [
  { icon: Home, value: "500+", label: "Imóveis Vendidos" },
  { icon: Users, value: "1000+", label: "Clientes Satisfeitos" },
  { icon: Award, value: "15+", label: "Anos de Experiência" },
  { icon: Clock, value: "24/7", label: "Atendimento" },
]

export async function About() {
  let empresa
  try {
    empresa = await obterEmpresa()
  } catch {
    // Fallback se não conseguir carregar dados da empresa
    empresa = {
      empresanomefantasia: "Taj Mahal - RE.AI.s",
      empresarazaosocial: "Real Estate AI Planner Ltda"
    }

  }
}