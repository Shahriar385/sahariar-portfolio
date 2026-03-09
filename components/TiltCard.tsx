'use client'

import { useRef, ReactNode } from 'react'

interface TiltCardProps {
    children: ReactNode
    className?: string
}

/**
 * Wraps children in a div that tilts in 3D space toward the mouse
 * and shows a radial glow highlight following the cursor.
 */
export default function TiltCard({ children, className = '' }: TiltCardProps) {
    const cardRef = useRef<HTMLDivElement>(null)
    const glowRef = useRef<HTMLSpanElement>(null)

    const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const el = cardRef.current
        const glow = glowRef.current
        if (!el) return

        const { left, top, width, height } = el.getBoundingClientRect()
        const x = e.clientX - left   // 0 → width
        const y = e.clientY - top    // 0 → height

        // Normalize to -0.5 → 0.5
        const nx = x / width - 0.5
        const ny = y / height - 0.5

        const rotX = ny * -16   // tilt up/down  (−8° → 8°)
        const rotY = nx * 16   // tilt left/right

        el.style.transition = 'box-shadow 0.1s'
        el.style.transform = `perspective(900px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateZ(12px)`
        el.style.boxShadow = '0 24px 48px -12px rgba(0,0,0,0.18)'

        // Radial glow follows cursor position within card
        if (glow) {
            glow.style.background = `radial-gradient(280px circle at ${x}px ${y}px, rgba(128,128,128,0.13), transparent 70%)`
        }
    }

    const onMouseLeave = () => {
        const el = cardRef.current
        if (!el) return
        el.style.transition = 'transform 0.65s cubic-bezier(0.23, 1, 0.32, 1), box-shadow 0.65s'
        el.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg) translateZ(0px)'
        el.style.boxShadow = ''
        if (glowRef.current) glowRef.current.style.background = ''
    }

    return (
        <div
            ref={cardRef}
            onMouseMove={onMouseMove}
            onMouseLeave={onMouseLeave}
            className={`relative overflow-hidden ${className}`}
            style={{
                willChange: 'transform',
                transformStyle: 'preserve-3d',
                transition: 'transform 0.65s cubic-bezier(0.23, 1, 0.32, 1)',
            }}
        >
            {/* Radial mouse-glow overlay */}
            <span
                ref={glowRef}
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 z-10"
                style={{ transition: 'background 0.15s' }}
            />
            {children}
        </div>
    )
}
