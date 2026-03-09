'use client'

import { useEffect, useRef } from 'react'

export default function MouseFollower() {
    const dotRef = useRef<HTMLDivElement>(null)
    const ringRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        // Skip on touch devices
        if (typeof window === 'undefined') return
        if (window.matchMedia('(hover: none)').matches) return

        const dot = dotRef.current!
        const ring = ringRef.current!

        let mx = 0, my = 0   // real mouse position
        let rx = 0, ry = 0   // ring lerp position
        let scale = 1, targetScale = 1
        let opacity = 0.45, targetOpacity = 0.45
        let rafId: number
        let visible = false

        const onMove = (e: MouseEvent) => {
            mx = e.clientX
            my = e.clientY
            if (!visible) {
                // Snap ring & dot to avoid initial swoop from (0,0)
                rx = mx; ry = my
                dot.style.opacity = '1'
                ring.style.opacity = String(opacity)
                visible = true
            }
        }

        const tick = () => {
            // Dot — snaps exactly to cursor
            dot.style.transform = `translate(calc(${mx}px - 50%), calc(${my}px - 50%))`

            // Ring — smooth lerp toward cursor
            rx += (mx - rx) * 0.10
            ry += (my - ry) * 0.10
            scale += (targetScale - scale) * 0.12
            opacity += (targetOpacity - opacity) * 0.12
            ring.style.transform = `translate(calc(${rx}px - 50%), calc(${ry}px - 50%)) scale(${scale})`
            ring.style.opacity = String(opacity)

            rafId = requestAnimationFrame(tick)
        }

        // Magnetic scale on interactive elements
        const onEnter = () => { targetScale = 2.4; targetOpacity = 0.25 }
        const onLeave = () => { targetScale = 1; targetOpacity = 0.45 }

        // Attach to all interactive elements (and any added later via delegation)
        document.addEventListener('mouseover', (e) => {
            const t = e.target as HTMLElement
            if (t.closest('a, button')) onEnter()
        })
        document.addEventListener('mouseout', (e) => {
            const t = e.target as HTMLElement
            if (t.closest('a, button')) onLeave()
        })

        window.addEventListener('mousemove', onMove)
        rafId = requestAnimationFrame(tick)
        document.body.style.cursor = 'none'

        return () => {
            window.removeEventListener('mousemove', onMove)
            cancelAnimationFrame(rafId)
            document.body.style.cursor = ''
        }
    }, [])

    return (
        <>
            {/* Lagging translucent ring */}
            <div
                ref={ringRef}
                aria-hidden="true"
                style={{
                    position: 'fixed',
                    left: 0,
                    top: 0,
                    width: 38,
                    height: 38,
                    borderRadius: '50%',
                    border: '1.5px solid currentColor',
                    pointerEvents: 'none',
                    zIndex: 99999,
                    opacity: 0,
                    willChange: 'transform, opacity',
                }}
            />

            {/* Dot — snaps instantly to real cursor */}
            <div
                ref={dotRef}
                aria-hidden="true"
                style={{
                    position: 'fixed',
                    left: 0,
                    top: 0,
                    width: 6,
                    height: 6,
                    borderRadius: '50%',
                    backgroundColor: 'currentColor',
                    pointerEvents: 'none',
                    zIndex: 99999,
                    opacity: 0,
                    willChange: 'transform',
                }}
            />
        </>
    )
}
