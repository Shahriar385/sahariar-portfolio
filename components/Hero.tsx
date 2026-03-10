"use client"

import { useState, useEffect } from "react"

export default function Hero() {
  const fullText = "Hello World, I'm Sahariar Hossain."
  const [displayText, setDisplayText] = useState("")

  useEffect(() => {
    let i = 0
    const timer = setInterval(() => {
      if (i < fullText.length) {
        setDisplayText(fullText.slice(0, i + 1))
        i++
      } else {
        clearInterval(timer)
      }
    }, 100)
    return () => clearInterval(timer)
  }, [])

  return (
    <section className="relative min-h-[100dvh] w-full flex items-center justify-center snap-start snap-always overflow-hidden">
      {/* Background Image with Glitch Effect */}
      <div
        className="glitch-wrapper"
        style={{
          '--hero-img': 'url(/hero-image.png)'
        } as React.CSSProperties}
      >
        <div className="glitch-image" />
      </div>

      <div className="relative z-10 w-full mx-auto max-w-[1100px] px-6 py-20 space-y-8">
        <div className="font-mono">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-x-2 text-sm md:text-base">
              <span className="text-purple-500 dark:text-purple-400">public class</span>
              <span className="text-blue-600 dark:text-blue-400">Developer</span>
              <span className="text-foreground">{'{'}</span>
            </div>

            <div className="pl-4 md:pl-8 space-y-4">
              <div className="text-sm md:text-base leading-relaxed">
                <span className="text-purple-500 dark:text-purple-400 font-normal mr-2">String</span>
                <span className="text-foreground mr-2">greeting =</span>
                <span className="text-green-600 dark:text-green-400 text-xl md:text-xl">"{displayText}"</span>
                <span className="text-foreground font-normal ">;</span>
              </div>

              <div className="space-y-4">
                <div className="text-sm md:text-base leading-relaxed">
                  <span className="text-purple-500 dark:text-purple-400 mr-2">String</span>
                  <span className="text-foreground mr-2">focus =</span>
                  <span className="text-green-600 dark:text-green-400">"I build mobile apps."</span>
                  <span className="text-foreground">;</span>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-x-2">
                    <span className="text-purple-500 dark:text-purple-400 text-sm md:text-base">List&lt;String&gt;</span>
                    <span className="text-foreground text-sm md:text-base">specialties = Arrays.asList(</span>
                  </div>
                  <div className="pl-4 md:pl-8 flex flex-col gap-1 text-green-600 dark:text-green-400 text-sm md:text-base">
                    <span>"Flutter Developer",</span>
                    <span>"Mobile Engineer",</span>
                    <span>"Learning Blockchain"</span>
                  </div>
                  <span className="text-foreground text-sm md:text-base">);</span>
                </div>
              </div>
            </div>
            <div className="text-foreground text-sm md:text-base">{'}'}</div>
          </div>

          {/* <div className="flex flex-col gap-3 pt-6 sm:flex-row">
            <a
              href="#about"
              className="inline-flex items-center justify-center bg-foreground px-6 py-2.5 text-sm font-medium text-background transition-all hover:opacity-90"
            >
              Get to Know Me
            </a>
            <a
              href="#projects"
              className="inline-flex items-center justify-center border border-foreground px-6 py-2.5 text-sm font-medium transition-all hover:bg-foreground hover:text-background"
            >
              View Projects
            </a>
          </div> */}
        </div>
        <div className="flex flex-col gap-3 pt-6 sm:flex-row">
          <a
            href="#about"
            className="inline-flex items-center justify-center bg-foreground px-6 py-2.5 text-sm font-medium text-background transition-all hover:opacity-90"
          >
            Get to Know Me
          </a>
          <a
            href="#projects"
            className="inline-flex items-center justify-center border border-foreground px-6 py-2.5 text-sm font-medium transition-all hover:bg-foreground hover:text-background"
          >
            View Projects
          </a>
        </div>
      </div>
    </section>
  )
}
