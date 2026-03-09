'use client'

import { useEffect, useState } from 'react'
import * as HoverCard from '@radix-ui/react-hover-card'
import * as Progress from '@radix-ui/react-progress'
import { SkillType } from '@/app/api/skills/route'

export default function Skills() {
  const [skills, setSkills] = useState<SkillType[]>([])
  const [loading, setLoading] = useState(true)
  const [activeSkill, setActiveSkill] = useState<SkillType | null>(null)
  const [animatedProficiency, setAnimatedProficiency] = useState<number>(0)

  useEffect(() => {
    // Force cache bust to guarantee we get the updated JSON objects
    fetch(`/api/skills?t=${Date.now()}`, { cache: 'no-store' })
      .then((res) => res.json())
      .then((data) => {
        setSkills(data)
        setLoading(false)
      })
      .catch((err) => {
        console.error('Failed to fetch skills', err)
        setLoading(false)
      })
  }, [])

  // Trigger smooth animation from 0 -> target when activeSkill changes
  useEffect(() => {
    setAnimatedProficiency(0) // Reset to 0 instantly
    if (activeSkill?.proficiency) {
      // Small timeout allows DOM to register the 0% state before transitioning to target
      const timer = setTimeout(() => {
        setAnimatedProficiency(activeSkill.proficiency!)
      }, 50)
      return () => clearTimeout(timer)
    }
  }, [activeSkill])

  return (
    <section id="skills" className="min-h-[100dvh] w-full flex items-center snap-start snap-always">
      <div className="w-full mx-auto max-w-[1100px] px-6 py-20">
        <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
          Skills
        </h2>

        <div className="mt-12 flex flex-col md:flex-row items-start gap-12">
          {/* Left Side: Skills Grid */}
          <div className="flex-1 flex flex-wrap content-start gap-3">
            {loading ? (
              // Skeleton loaders
              [1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  className="h-9 w-24 animate-pulse border border-border bg-secondary/50"
                />
              ))
            ) : (
              skills.map((skill) => {
                // Safety fallback in case Next.js cached the old string array format
                const skillName = typeof skill === 'string' ? skill : skill.name
                const skillDesc = typeof skill === 'string' ? 'Description unavailable (cached data).' : skill.description

                // Construct normalized skill object for state
                const currentSkillObj = typeof skill === 'string' ? { name: skillName } : skill

                return (
                  <HoverCard.Root
                    key={skillName}
                    openDelay={50}
                    closeDelay={100}
                  >
                    <HoverCard.Trigger asChild>
                      <button
                        onMouseEnter={() => setActiveSkill(currentSkillObj)}
                        onMouseLeave={() => setActiveSkill((prev) => prev?.name === currentSkillObj.name ? null : prev)}
                        onFocus={() => setActiveSkill(currentSkillObj)}
                        onBlur={() => setActiveSkill((prev) => prev?.name === currentSkillObj.name ? null : prev)}
                        className="cursor-pointer border border-border bg-background px-3.5 py-1.5 text-sm transition-all hover:border-foreground hover:bg-secondary focus:outline-none"
                      >
                        {skillName}
                      </button>
                    </HoverCard.Trigger>

                    {skillDesc && (
                      <HoverCard.Portal>
                        <HoverCard.Content
                          className="z-[100] w-64 rounded-md border border-border bg-background/80 p-4 shadow-xl backdrop-blur-md animate-in zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=top]:slide-in-from-bottom-2"
                          sideOffset={8}
                        >
                          <div className="space-y-2">
                            <h4 className="font-semibold text-foreground tracking-tight">{skillName}</h4>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                              {skillDesc}
                            </p>
                          </div>
                          <HoverCard.Arrow className="fill-border" />
                        </HoverCard.Content>
                      </HoverCard.Portal>
                    )}
                  </HoverCard.Root>
                )
              })
            )}
          </div>

          {/* Right Side / Bottom: Proficiency Display */}
          <div className="flex-1 pt-6 md:pt-0 min-h-[140px]">
            <div
              className="w-full max-w-sm rounded border border-border bg-secondary/10 px-6 flex flex-col justify-center transition-all duration-300 ease-in-out relative overflow-hidden"
              style={{ height: activeSkill ? (activeSkill.proficiency !== undefined ? 136 : 96) : 80 }}
            >
              <div className="w-full absolute left-0 right-0 px-6 top-1/2 -translate-y-1/2">
                {activeSkill ? (
                  <div className="space-y-4 animate-in fade-in zoom-in-95 duration-300 flex flex-col items-center justify-center text-center">
                    <h3 className="text-2xl font-semibold tracking-tight">
                      {activeSkill.name}
                    </h3>

                    {activeSkill.proficiency !== undefined ? (
                      <div className="w-full space-y-2">
                        <div className="flex justify-between text-xs text-muted-foreground font-medium uppercase tracking-wider">
                          <span>Proficiency</span>
                          <span>{animatedProficiency}%</span>
                        </div>
                        <Progress.Root
                          className="relative h-2 w-full overflow-hidden rounded-full bg-secondary/50"
                          value={animatedProficiency}
                        >
                          {/* Transition duration sets the buttery ease from 0 -> value */}
                          <Progress.Indicator
                            className="h-full w-full bg-foreground transition-transform duration-700 ease-[cubic-bezier(0.65,0,0.35,1)]"
                            style={{ transform: `translateX(-${100 - animatedProficiency}%)` }}
                          />
                        </Progress.Root>
                      </div>
                    ) : (
                      <p className="text-sm text-muted-foreground italic">
                        Proficiency rating unavailable.
                      </p>
                    )}
                  </div>
                ) : (
                  <div className="flex items-center justify-center animate-in fade-in duration-500">
                    <p className="text-sm text-muted-foreground">
                      Hover over a skill to view proficiency
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
