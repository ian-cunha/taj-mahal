import { obterConfiguracaoSite, obterEmpresa } from "@/lib/api"
import { HeroClient } from "./hero-client"

export async function Hero() {
    let config = null;
    let empresa = null;

    try {
        // Busca a configuração do site e os dados da empresa em paralelo
        [config, empresa] = await Promise.all([
            obterConfiguracaoSite(),
            obterEmpresa()
        ]);
    } catch (error) {
        console.error("Erro ao buscar dados para o Hero:", error);
    }

    // Define os valores com fallbacks seguros
    const videoUrl = config?.idVideoFundoBusca?.urlVideoFundoBusca ?? null;
    const imageUrl = config?.idImagemFundoBusca?.urlImagemFundoBusca ?? null;
    const companyName = empresa?.empresanomefantasia ?? "RE.AI.s"; // Usa o nome da empresa ou um fallback

    return <HeroClient companyName={companyName} videoUrl={videoUrl} imageUrl={imageUrl} />;
}