"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X, Home, Search, Building, Phone, Users, Briefcase } from "lucide-react"
import { Button } from "@/components/ui/button"

interface HeaderClientProps {
  companyName: string;
  logoUrl?: string;
}

export function HeaderClient({ companyName, logoUrl }: HeaderClientProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navigation = [
    { name: "Início", href: "/", icon: Home },
    { name: "Buscar Imóveis", href: "/busca", icon: Search },
    { name: "Empreendimentos", href: "/empreendimentos", icon: Building },
    { name: "Empresa", href: "/empresa", icon: Users },
    { name: "Contato", href: "/contato", icon: Phone },
    { name: "Trabalhe Conosco", href: "/trabalhe-conosco", icon: Briefcase },
  ]

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="container">
        <div className="flex justify-between items-center py-4">
          <Link href="/" className="flex items-center space-x-3">
            {logoUrl ? (
              <Image
                src={logoUrl}
                alt={`Logomarca de ${companyName}`}
                width={40}
                height={40}
                className="h-10 w-auto object-contain"
              />
            ) : (
              // O ícone de fallback agora usa as cores primárias
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <Home className="w-6 h-6 text-primary-foreground" />
              </div>
            )}
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                // CORREÇÃO: Usando a cor primária no hover
                className="flex items-center space-x-1 text-gray-700 hover:text-primary transition-colors duration-200"
              >
                <item.icon className="w-4 h-4" />
                <span>{item.name}</span>
              </Link>
            ))}
          </nav>

          {/* Mobile menu button */}
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden pb-4">
            <div className="flex flex-col space-y-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  // CORREÇÃO: Usando a cor primária no hover
                  className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:text-primary hover:bg-secondary rounded-lg transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <item.icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </Link>
              ))}
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}