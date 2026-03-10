'use client'

import ProjectCard from './ProjectCard'

export interface ProjectType {
  id: string
  name: string
  description: string
  tags: string[]
  link?: string
  github?: string
}

export default function Projects({ projects }: { projects: ProjectType[] }) {

  return (
    <section id="projects" className="min-h-[100dvh] w-full flex items-center border-t border-border bg-background snap-start snap-always">
      <div className="w-full mx-auto max-w-[1100px] px-6 py-20">
        <h2 className="text-3xl font-semibold tracking-tight md:text-4xl dark:text-white text-black">
          Work
        </h2>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              name={project.name}
              description={project.description}
              tags={project.tags}
              link={project.link}
              github={project.github}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
