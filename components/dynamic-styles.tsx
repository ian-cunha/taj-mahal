import type { ConfiguracaoSite } from "@/types/api"

interface DynamicStylesProps {
  config: ConfiguracaoSite
}

export function DynamicStyles({ config }: DynamicStylesProps) {
  const styles = `
    :root {
      --cor-primaria: #${config.corPrimaria || config.corFundo || "3B82F6"};
      --cor-secundaria: #${config.corSecundaria || "6B7280"};
      --cor-texto: #${config.corTexto || config.corFonte || "1F2937"};
      --cor-destaque: #${config.corDestaque || "EF4444"};
      --cor-link: #${config.corLink || "2563EB"};
      --cor-botao: #${config.corBotao || "3B82F6"};
      --cor-botao-hover: #${config.corBotaoHover || "2563EB"};
      --cor-header: #${config.corHeader || "FFFFFF"};
      --cor-footer: #${config.corFooter || "1F2937"};
      --cor-card: #${config.corCard || "FFFFFF"};
    }

    .btn-primary {
      background-color: var(--cor-botao) !important;
      border-color: var(--cor-botao) !important;
    }

    .btn-primary:hover {
      background-color: var(--cor-botao-hover) !important;
      border-color: var(--cor-botao-hover) !important;
    }

    .text-blue-600 {
      color: var(--cor-primaria) !important;
    }

    .bg-blue-600 {
      background-color: var(--cor-primaria) !important;
    }

    .border-blue-600 {
      border-color: var(--cor-primaria) !important;
    }

    .hover\\:bg-blue-700:hover {
      background-color: var(--cor-botao-hover) !important;
    }

    .bg-blue-50 {
      background-color: color-mix(in srgb, var(--cor-primaria) 10%, white) !important;
    }

    .bg-blue-100 {
      background-color: color-mix(in srgb, var(--cor-primaria) 20%, white) !important;
    }

    a {
      color: var(--cor-link);
    }

    a:hover {
      color: var(--cor-botao-hover);
    }
  `

  return <style dangerouslySetInnerHTML={{ __html: styles }} />
}
