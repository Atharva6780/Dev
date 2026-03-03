import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { ProjectsSection } from "@/components/projects-section"
import { ProductsSection } from "@/components/products-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"
import { ScrollProgress } from "@/components/scroll-progress"
import { SectionDivider } from "@/components/section-divider"
import { CursorEffect } from "@/components/cursor-effect"

export default function Home() {
  return (
    <main className="relative">
      <CursorEffect />
      <ScrollProgress />
      <Navbar />
      <HeroSection />
      <SectionDivider />
      <AboutSection />
      <SectionDivider />
      <ProjectsSection />
      <SectionDivider />
      <ProductsSection />
      <SectionDivider />
      <ContactSection />
      <Footer />
    </main>
  )
}
