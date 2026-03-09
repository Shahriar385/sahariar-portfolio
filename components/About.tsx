export default function About() {
  const highlights = [
    'Mobile App Development',
    'Native Android Development',
    'Blockchain Learning',
  ]

  return (
    <section id="about" className="min-h-[100dvh] w-full flex items-center border-t border-border bg-background snap-start snap-always">
      <div className="w-full mx-auto max-w-[1100px] px-6 py-20">
        <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
          About
        </h2>

        <div className="mt-12 space-y-8">
          <p className="max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
            I'm an 18-year-old software engineer from Bangladesh focused on building
            high-quality mobile applications. I have experience in native Android
            development and cross-platform mobile apps. Currently I'm exploring
            blockchain development and Web3 technologies.
          </p>

          <div className="space-y-3">
            {highlights.map((highlight) => (
              <div key={highlight} className="flex items-center gap-3">
                <span className="h-1.5 w-1.5 rounded-full bg-foreground"></span>
                <p className="text-sm text-muted-foreground">{highlight}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
