'use client'

export default function Learning({ text }: { text: string }) {

  return (
    <section id="learning" className="min-h-[100dvh] w-full flex items-center border-t border-border bg-background snap-start snap-always">
      <div className="w-full mx-auto max-w-[1100px] px-6 py-20">
        <h2 className="text-3xl font-semibold tracking-tight md:text-4xl transition-all duration-700 dark:text-white text-black">
          Currently Learning
        </h2>

        <div className="mt-12 max-w-2xl">
          <p className="text-base leading-relaxed text-muted-foreground md:text-lg animate-in fade-in slide-in-from-bottom-2 duration-700 delay-200">
            {text}
          </p>
        </div>
      </div>
    </section>
  )
}
