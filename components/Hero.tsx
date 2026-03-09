export default function Hero() {
  return (
    <section className="min-h-[100dvh] w-full flex items-center justify-center snap-start snap-always">
      <div className="w-full mx-auto max-w-[1100px] px-6 py-20">
        <div className="space-y-6">
          <h1 className="text-4xl font-bold tracking-tight md:text-6xl lg:text-7xl">
            <span className="text-pretty">Hi, I'm Sahariar Hossain.</span>
          </h1>

          <div className="space-y-2">
            <p className="text-xl text-muted-foreground md:text-2xl">
              I build mobile apps.
            </p>
            <div className="text-sm text-muted-foreground md:text-base">
              <p>Flutter Developer</p>
              <p>Mobile Engineer</p>
              <p>Learning Blockchain</p>
            </div>
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
      </div>
    </section>
  )
}
