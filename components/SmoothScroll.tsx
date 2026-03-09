'use client'

import { useEffect, useRef } from 'react'

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
    const mainRef = useRef<HTMLElement>(null)

    useEffect(() => {
        const main = mainRef.current
        if (!main) return

        let isAnimating = false
        let wheelAccumulator = 0
        let lastWheelTime = Date.now()

        // easeInOutExpo - extremely buttery smooth curve
        const easing = (t: number) => {
            if (t === 0) return 0
            if (t === 1) return 1
            if ((t /= 0.5) < 1) return 0.5 * Math.pow(2, 10 * (t - 1))
            return 0.5 * (-Math.pow(2, -10 * --t) + 2)
        }

        const smoothScrollTo = (targetY: number, duration: number) => {
            isAnimating = true
            const startY = main.scrollTop
            const distance = targetY - startY
            let startTime: number | null = null

            const animate = (currentTime: number) => {
                if (!startTime) startTime = currentTime
                const timeElapsed = currentTime - startTime
                const progress = Math.min(timeElapsed / duration, 1)
                const easeProgress = easing(progress)

                main.scrollTo(0, startY + distance * easeProgress)

                if (timeElapsed < duration) {
                    requestAnimationFrame(animate)
                } else {
                    // Allow a small buffer before accepting new wheel events to prevent double-skips
                    setTimeout(() => {
                        isAnimating = false
                        wheelAccumulator = 0
                    }, 50)
                }
            }

            requestAnimationFrame(animate)
        }

        const handleWheel = (e: WheelEvent) => {
            e.preventDefault()

            const now = Date.now()

            // Reset accumulator if there's a pause in scrolling (e.g. touchpad release)
            if (now - lastWheelTime > 150) {
                wheelAccumulator = 0
            }
            lastWheelTime = now

            if (isAnimating) return

            wheelAccumulator += e.deltaY

            // Require a threshold of wheel accumulation to trigger next section
            // This prevents overly sensitive touchpads from flying through sections
            if (Math.abs(wheelAccumulator) < 30) return

            const sections = Array.from(main.querySelectorAll('section, footer')) as HTMLElement[]
            const currentScroll = main.scrollTop

            // Find current section index
            let currentIndex = sections.findIndex(sec => Math.abs(sec.offsetTop - currentScroll) < 10)
            if (currentIndex === -1) {
                currentIndex = sections.reduce((closest, sec, index) => {
                    const diff = Math.abs(sec.offsetTop - currentScroll)
                    const closestDiff = Math.abs(sections[closest].offsetTop - currentScroll)
                    return diff < closestDiff ? index : closest
                }, 0)
            }

            const dir = wheelAccumulator > 0 ? 1 : -1
            const nextIndex = currentIndex + dir

            if (nextIndex >= 0 && nextIndex < sections.length) {
                smoothScrollTo(sections[nextIndex].offsetTop, 600) // 600ms buttery animation
            }

            wheelAccumulator = 0
        }

        const handleClick = (e: MouseEvent) => {
            const target = e.target as HTMLElement
            const link = target.closest('a')

            if (link && link.hash && link.hash.startsWith('#')) {
                const targetId = link.hash.substring(1)
                const targetElement = document.getElementById(targetId) || main.querySelector(link.hash)

                if (targetElement) {
                    e.preventDefault()
                    const headerOffset = 72
                    const targetPosition = (targetElement as HTMLElement).offsetTop
                    smoothScrollTo(targetPosition - headerOffset, 800) // Slightly slower for deliberate clicks
                }
            }
        }

        // Passive false is critical to allow e.preventDefault()
        main.addEventListener('wheel', handleWheel, { passive: false })
        main.addEventListener('click', handleClick)
        return () => {
            main.removeEventListener('wheel', handleWheel)
            main.removeEventListener('click', handleClick)
        }
    }, [])

    return (
        <main ref={mainRef} className="h-screen overflow-y-auto bg-background text-foreground relative">
            {children}
        </main>
    )
}
