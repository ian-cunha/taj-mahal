import { obterEmpresa } from "@/lib/api"
import { HeaderClient } from "./header-client"

// O header agora aceita o token como propriedade
export async function Header({ token }: { token: string | null }) {
    let companyName = "Taj Mahal";
    let logoUrl = "";

    if (token) {
        try {
            const empresa = await obterEmpresa(token);
            companyName = empresa.empresanomefantasia;
            logoUrl = empresa.urlLogomarca || "";
        } catch (error) {
            console.error("Erro ao buscar dados da empresa para o header:", error);
        }
    }

    return <HeaderClient companyName={companyName} logoUrl={logoUrl} />;
}