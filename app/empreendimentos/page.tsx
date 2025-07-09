import { EmpreendimentosResults } from "@/components/empreendimentos-results"

export default async function EmpreendimentosPage() {
  return (
    <div className="py-8">
      <div className="container">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Empreendimentos</h1>
          <p className="text-lg text-gray-600">Conheça nossos lançamentos e empreendimentos em destaque</p>
        </div>

        <EmpreendimentosResults />
      </div>
    </div>
  )
}
