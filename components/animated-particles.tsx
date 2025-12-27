"use client"

import { useEffect, useRef } from "react"

export function AnimatedParticles() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const container = containerRef.current
    const particleCount = 80
    const particles: HTMLElement[] = []

    // Create particles
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement("div")
      const size = Math.random() * 8 + 2
      const distance = Math.random() * 150 + 80
      const angle = (i / particleCount) * Math.PI * 2
      const x = Math.cos(angle) * distance
      const y = Math.sin(angle) * distance

      const colors = [
        "#ec4899",
        "#f43f5e",
        "#f97316",
        "#eab308",
        "#22c55e",
        "#06b6d4",
        "#0ea5e9",
        "#3b82f6",
        "#8b5cf6",
        "#d946ef",
      ]
      const color = colors[Math.floor(Math.random() * colors.length)]

      particle.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        background: ${color};
        border-radius: 50%;
        top: 50%;
        left: 50%;
        pointer-events: none;
        opacity: 0.8;
        transform: translate(${x}px, ${y}px);
        transition: transform 0.3s ease-out;
      `

      container.appendChild(particle)
      particles.push(particle)
    }

    let animationFrameId: number
    let rotation = 0

    const animate = () => {
      rotation += 0.2 
      const scale = 1 + Math.sin(rotation * 0.03) * 0.03 // 0.02 dan 0.01 ga, 0.1 dan 0.05 ga - yumshoqroq

      particles.forEach((particle, index) => {
        const angle = (index / particleCount) * Math.PI * 2 + (rotation * Math.PI) / 180
        const distance = Math.random() * 150 + 80
        const x = Math.cos(angle) * distance * scale
        const y = Math.sin(angle) * distance * scale

        particle.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`
      })

      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      cancelAnimationFrame(animationFrameId)
      particles.forEach((p) => p.remove())
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 flex items-center justify-center"
      style={{
        backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.8) 0%, transparent 70%)`,
      }}
    />
  )
}