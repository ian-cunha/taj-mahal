import { Hero } from "@/components/hero"
import { FeaturedProperties } from "@/components/featured-properties"
import { Services } from "@/components/services"
import { About } from "@/components/about"

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedProperties />
      <Services />
      <About />
    </>
  )
}
