'use client'

import { useEffect, useState } from 'react'

export default function Learning() {
  const [text, setText] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/learning')
      .then(res => res.json())
      .then(data => {
        setText(data.text || '')
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  return (
    <section id="learning" className="min-h-[100dvh] w-full flex items-center snap-start snap-always">
      <div className="w-full mx-auto max-w-[1100px] px-6 py-20">
        <h2 className="text-3xl font-semibold tracking-tight md:text-4xl transition-all duration-700">
          Currently Learning
        </h2>

        <div className="mt-12 max-w-2xl">
          {loading ? (
            <div className="space-y-4">
              <div className="h-4 w-full animate-pulse bg-secondary/50 rounded" />
              <div className="h-4 w-5/6 animate-pulse bg-secondary/50 rounded" />
              <div className="h-4 w-4/6 animate-pulse bg-secondary/50 rounded" />
            </div>
          ) : (
            <p className="text-base leading-relaxed text-muted-foreground md:text-lg animate-in fade-in slide-in-from-bottom-2 duration-700 delay-200">
              {text}
            </p>
          )}
        </div>
      </div>
    </section>
  )
}
