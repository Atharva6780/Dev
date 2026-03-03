"use client"

import { useEffect, useRef, useCallback } from "react"

interface Ripple {
  x: number
  y: number
  radius: number
  maxRadius: number
  opacity: number
  lineWidth: number
}

interface Trail {
  x: number
  y: number
  opacity: number
  radius: number
}

export function CursorEffect() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const ripples = useRef<Ripple[]>([])
  const trails = useRef<Trail[]>([])
  const mousePos = useRef({ x: -100, y: -100 })
  const prevMousePos = useRef({ x: -100, y: -100 })
  const animationRef = useRef<number>(0)
  const lastRippleTime = useRef(0)
  const isTouch = useRef(false)

  const addRipple = useCallback((x: number, y: number, large = false) => {
    ripples.current.push({
      x,
      y,
      radius: 0,
      maxRadius: large ? 120 + Math.random() * 60 : 40 + Math.random() * 30,
      opacity: large ? 0.5 : 0.35,
      lineWidth: large ? 2 : 1.2,
    })
  }, [])

  const addTrail = useCallback((x: number, y: number) => {
    trails.current.push({
      x,
      y,
      opacity: 0.5,
      radius: 3 + Math.random() * 3,
    })
    if (trails.current.length > 50) {
      trails.current.shift()
    }
  }, [])

  useEffect(() => {
    if (typeof window !== "undefined") {
      isTouch.current = "ontouchstart" in window || navigator.maxTouchPoints > 0
    }
    if (isTouch.current) return

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener("resize", resize)

    const handleMouseMove = (e: MouseEvent) => {
      prevMousePos.current = { ...mousePos.current }
      mousePos.current = { x: e.clientX, y: e.clientY }

      const dx = mousePos.current.x - prevMousePos.current.x
      const dy = mousePos.current.y - prevMousePos.current.y
      const speed = Math.sqrt(dx * dx + dy * dy)

      // Add trail droplets
      addTrail(e.clientX, e.clientY)

      // Ripples spawn based on speed — faster mouse = more ripples
      const now = Date.now()
      const interval = Math.max(30, 120 - speed * 2)
      if (now - lastRippleTime.current > interval) {
        addRipple(
          e.clientX + (Math.random() - 0.5) * 10,
          e.clientY + (Math.random() - 0.5) * 10
        )
        lastRippleTime.current = now
      }

      // Extra ripples when moving fast
      if (speed > 15) {
        for (let i = 0; i < Math.min(3, Math.floor(speed / 20)); i++) {
          addRipple(
            e.clientX + (Math.random() - 0.5) * speed,
            e.clientY + (Math.random() - 0.5) * speed
          )
        }
      }
    }

    const handleClick = (e: MouseEvent) => {
      // Big splash ripple on click
      for (let i = 0; i < 3; i++) {
        addRipple(
          e.clientX + (Math.random() - 0.5) * 20,
          e.clientY + (Math.random() - 0.5) * 20,
          true
        )
      }
    }

    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("click", handleClick)

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw trails (water droplets that fade)
      for (let i = trails.current.length - 1; i >= 0; i--) {
        const trail = trails.current[i]
        trail.opacity -= 0.015
        trail.radius *= 0.98

        if (trail.opacity <= 0) {
          trails.current.splice(i, 1)
          continue
        }

        const gradient = ctx.createRadialGradient(
          trail.x, trail.y, 0,
          trail.x, trail.y, trail.radius
        )
        gradient.addColorStop(0, `rgba(56, 224, 207, ${trail.opacity * 0.6})`)
        gradient.addColorStop(1, `rgba(56, 224, 207, 0)`)

        ctx.beginPath()
        ctx.arc(trail.x, trail.y, trail.radius, 0, Math.PI * 2)
        ctx.fillStyle = gradient
        ctx.fill()
      }

      // Draw ripples (expanding water rings)
      for (let i = ripples.current.length - 1; i >= 0; i--) {
        const ripple = ripples.current[i]
        ripple.radius += (ripple.maxRadius - ripple.radius) * 0.06 + 0.5
        ripple.opacity -= 0.008

        if (ripple.opacity <= 0 || ripple.radius >= ripple.maxRadius) {
          ripples.current.splice(i, 1)
          continue
        }

        // Outer ring
        ctx.beginPath()
        ctx.arc(ripple.x, ripple.y, ripple.radius, 0, Math.PI * 2)
        ctx.strokeStyle = `rgba(56, 224, 207, ${ripple.opacity * 0.8})`
        ctx.lineWidth = ripple.lineWidth
        ctx.stroke()

        // Inner subtle ring (creates double-ring water effect)
        if (ripple.radius > 8) {
          ctx.beginPath()
          ctx.arc(ripple.x, ripple.y, ripple.radius * 0.6, 0, Math.PI * 2)
          ctx.strokeStyle = `rgba(56, 224, 207, ${ripple.opacity * 0.3})`
          ctx.lineWidth = ripple.lineWidth * 0.6
          ctx.stroke()
        }

        // Subtle fill inside ripple
        const fillGradient = ctx.createRadialGradient(
          ripple.x, ripple.y, 0,
          ripple.x, ripple.y, ripple.radius
        )
        fillGradient.addColorStop(0, `rgba(56, 224, 207, ${ripple.opacity * 0.05})`)
        fillGradient.addColorStop(0.5, `rgba(56, 224, 207, ${ripple.opacity * 0.02})`)
        fillGradient.addColorStop(1, `rgba(56, 224, 207, 0)`)

        ctx.beginPath()
        ctx.arc(ripple.x, ripple.y, ripple.radius, 0, Math.PI * 2)
        ctx.fillStyle = fillGradient
        ctx.fill()
      }

      // Subtle glow at current mouse position
      const glowGradient = ctx.createRadialGradient(
        mousePos.current.x, mousePos.current.y, 0,
        mousePos.current.x, mousePos.current.y, 80
      )
      glowGradient.addColorStop(0, "rgba(56, 224, 207, 0.08)")
      glowGradient.addColorStop(0.5, "rgba(56, 224, 207, 0.03)")
      glowGradient.addColorStop(1, "rgba(56, 224, 207, 0)")

      ctx.beginPath()
      ctx.arc(mousePos.current.x, mousePos.current.y, 80, 0, Math.PI * 2)
      ctx.fillStyle = glowGradient
      ctx.fill()

      animationRef.current = requestAnimationFrame(animate)
    }

    animationRef.current = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(animationRef.current)
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("click", handleClick)
      window.removeEventListener("resize", resize)
    }
  }, [addRipple, addTrail])

  if (typeof window !== "undefined" && ("ontouchstart" in window || navigator.maxTouchPoints > 0)) {
    return null
  }

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-[9999]"
      aria-hidden="true"
    />
  )
}
