import TiltCard from './TiltCard'

interface ProjectCardProps {
  name: string
  description: string
  tags: string[]
  link?: string
  github?: string
}

export default function ProjectCard({
  name,
  description,
  tags,
  link,
  github,
}: ProjectCardProps) {
  return (
    <TiltCard className="group flex flex-col space-y-4 border border-border/60 bg-transparent p-6 transition-[border-color] duration-300 hover:border-foreground">

      {/* Accent line that grows on hover */}
      <span
        className="absolute left-0 top-0 z-20 h-0.5 w-0 bg-foreground transition-all duration-300 group-hover:w-full"
        aria-hidden="true"
      />

      <div>
        <h3 className="relative z-20 text-lg font-semibold tracking-tight">
          {name}
        </h3>
        <p className="relative z-20 mt-2 text-sm leading-relaxed text-muted-foreground">
          {description}
        </p>
      </div>

      <div className="relative z-20 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span
            key={tag}
            className="inline-block border border-muted bg-secondary/50 px-2 py-0.5 text-xs text-muted-foreground"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="relative z-20 flex translate-y-1 gap-4 pt-1 opacity-80 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
        {link && link !== '#' && (
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-medium text-foreground underline underline-offset-4 hover:opacity-60 transition-opacity"
          >
            View Project ↗
          </a>
        )}
        {github && github !== '#' && (
          <a
            href={github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-medium text-foreground underline underline-offset-4 hover:opacity-60 transition-opacity"
          >
            GitHub ↗
          </a>
        )}
      </div>
    </TiltCard>
  )
}
