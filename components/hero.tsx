import { headers } from "next/headers"; // Precisamos ler os headers aqui também
import { obterConfiguracaoSite, obterEmpresa } from "@/lib/api"
import { HeroClient } from "./hero-client"

export async function Hero() {
    const headerList = await headers();
    const token = headerList.get("X-API-TOKEN");

    let config: any = null;
    let empresa: any = null;
    let companyName = "RE.AI.s"; // Nome fallback

    // Se não houver token, não podemos fazer as chamadas à API
    if (token) {
        try {
            // Busca a configuração do site e os dados da empresa em paralelo
            [config, empresa] = await Promise.all([
                obterConfiguracaoSite(token),
                obterEmpresa(token)
            ]);
            companyName = empresa?.empresanomefantasia ?? companyName;

        } catch (error) {
            console.error("❌ Erro ao buscar dados para o componente Hero:", error);
            // Os valores de fallback serão usados se a API falhar
        }
    } else {
        console.warn("⚠️ Token não encontrado para o componente Hero.");
    }

    // Define os valores com fallbacks seguros
    const videoUrl = config?.idVideoFundoBusca?.urlVideoFundoBusca ?? null;
    const imageUrl = config?.idImagemFundoBusca?.urlImagemFundoBusca ?? "/placeholder.svg?height=720&width=1280"; // Imagem fallback

    return <HeroClient companyName={companyName} videoUrl={videoUrl} imageUrl={imageUrl} />;
}