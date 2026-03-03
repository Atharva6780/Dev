"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { ChevronDown } from "lucide-react"
import { HeroScene } from "./hero-scene"
import Image from "next/image"

export function HeroSection() {
  const containerRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, 300])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95])

  return (
    <section
      ref={containerRef}
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <HeroScene />

      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-background/50 via-transparent to-background pointer-events-none" />

      <motion.div
        style={{ y, opacity, scale }}
        className="relative z-10 px-4 pt-24"
      >
        {/* Side-by-side wrapper */}
        <div className="flex flex-col md:flex-row items-center gap-10">

          {/* Profile Photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.1, type: "spring", stiffness: 100 }}
            className="relative"
          >
            <motion.div
              className="absolute -inset-2 rounded-full"
              style={{
                background: "conic-gradient(from 0deg, oklch(0.72 0.19 180), oklch(0.72 0.19 180 / 0.1), oklch(0.72 0.19 180))",
              }}
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            />

            <motion.div
              className="absolute -inset-3 rounded-full"
              style={{
                background: "radial-gradient(circle, oklch(0.72 0.19 180 / 0.3), transparent 70%)",
              }}
              animate={{ opacity: [0.4, 0.8, 0.4], scale: [1, 1.1, 1] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />

            <div className="relative w-40 h-40 md:w-80 md:h-80 rounded-full overflow-hidden border-2 border-primary/40 glow-teal">
              <Image
                src="/images/Profile.jpg"
                alt="Profile photo"
                fill
                className="object-cover"
                priority
              />
            </div>
          </motion.div>

          {/* Text Content */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="mb-6"
            >
              <span className="inline-block px-4 py-1.5 text-xs font-mono tracking-widest uppercase text-primary border border-primary/30 rounded-full glow-teal-sm">
                Full Stack Developer | AI & Automation Engineer
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="text-5xl md:text-7xl lg:text-7xl font-bold tracking-tight text-foreground text-balance"
            >
              <span className="block">Building Scalable</span>
              <span className="block text-primary text-glow">Systems for</span>
              <span className="block">Real-World Problems</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="mt-6 max-w-xl text-muted-foreground text-lg leading-relaxed"
            >
              I design and develop powerful n8n workflows, web applications,
              and digital solutions that transform how businesses operate.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.1 }}
              className="mt-10 flex gap-4"
            >
              <a
                href="#products"
                className="px-8 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:opacity-90 transition-opacity glow-teal"
              >
                Browse Products
              </a>
              <a
                href="#projects"
                className="px-8 py-3 border border-border text-foreground font-semibold rounded-lg hover:border-primary/50 hover:text-primary transition-colors"
              >
                View Projects
              </a>
            </motion.div>

          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-2 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        <span className="text-xs font-mono tracking-widest uppercase text-muted-foreground">
          Scroll to explore
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="h-5 w-5 text-primary" />
        </motion.div>
      </motion.div>
    </section>
  )
}