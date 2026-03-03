"use client"

import { motion } from "framer-motion"

export function Footer() {
  return (
    <footer className="border-t border-border/50 py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-foreground tracking-tight">
              <span className="text-primary">{"<"}</span>
              Atharva Shinde
              <span className="text-primary">{"/>"}</span>
            </span>
          </div>

          <p className="text-xs text-muted-foreground font-mono">
            {"\u00A9"} {new Date().getFullYear()} All rights reserved.
          </p>
        </div>

        {/* Animated bottom border */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="mt-8 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent origin-center"
        />
      </div>
    </footer>
  )
}
