import { obterEmpresa } from "@/lib/api"
import { HeaderClient } from "./header-client"

export async function Header() {
    let companyName = "Taj Mahal"; // Fallback
    let logoUrl = ""; // Fallback

    try {
        const empresa = await obterEmpresa();
        companyName = empresa.empresanomefantasia;
        logoUrl = empresa.urlLogomarca || "";
    } catch (error) {
        console.error("Erro ao buscar dados da empresa para o header:", error);
    }

    return <HeaderClient companyName={companyName} logoUrl={logoUrl} />;
}