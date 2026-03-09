'use client'

import { useEffect, useState } from 'react'
import ProjectCard from './ProjectCard'

interface ProjectType {
  id: string
  name: string
  description: string
  tags: string[]
  link?: string
  github?: string
}

export default function Projects() {
  const [projects, setProjects] = useState<ProjectType[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/projects')
      .then((res) => res.json())
      .then((data) => {
        setProjects(data)
        setLoading(false)
      })
      .catch((err) => {
        console.error('Failed to fetch projects', err)
        setLoading(false)
      })
  }, [])

  return (
    <section id="projects" className="min-h-[100dvh] w-full flex items-center border-t border-border bg-background snap-start snap-always">
      <div className="w-full mx-auto max-w-[1100px] px-6 py-20">
        <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
          Work
        </h2>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {loading ? (
            // Skeleton loaders
            [1, 2, 3, 4].map((i) => (
              <div key={i} className="h-64 animate-pulse border border-border bg-secondary/50 p-6" />
            ))
          ) : (
            projects.map((project) => (
              <ProjectCard
                key={project.id}
                name={project.name}
                description={project.description}
                tags={project.tags}
                link={project.link}
                github={project.github}
              />
            ))
          )}
        </div>
      </div>
    </section>
  )
}
