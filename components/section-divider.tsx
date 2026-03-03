"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"

export function SectionDivider() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })
  const width = useTransform(scrollYProgress, [0, 0.5, 1], ["0%", "100%", "0%"])

  return (
    <div ref={ref} className="relative h-px max-w-6xl mx-auto">
      <motion.div
        style={{ width }}
        className="h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent mx-auto"
      />
    </div>
  )
}
