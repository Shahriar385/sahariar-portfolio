'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useTheme } from './ThemeProvider'

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const { theme, toggleTheme } = useTheme()

  useEffect(() => {
    const mainContainer = document.querySelector('main')
    if (!mainContainer) return

    const handleScroll = () => {
      setIsScrolled(mainContainer.scrollTop > 20)
    }

    mainContainer.addEventListener('scroll', handleScroll)
    // Run once on mount to catch initial scroll state
    handleScroll()
    return () => mainContainer.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Work', href: '#projects' },
    { label: 'Apps', href: '#live-apps' },
    { label: 'Contact', href: '#contact' },
  ]

  const handleNavClick = () => {
    setIsOpen(false)
  }

  const ThemeIcon = () =>
    theme === 'light' ? (
      // Moon — switch to dark
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
        <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
      </svg>
    ) : (
      // Sun — switch to light
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
        <path
          fillRule="evenodd"
          d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
          clipRule="evenodd"
        />
      </svg>
    )

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled
        ? 'border-b border-border bg-background/80 backdrop-blur-md'
        : 'border-transparent bg-transparent'
        }`}
    >
      <nav className="mx-auto max-w-[1100px] px-6 py-4 md:py-5">
        <div className="flex items-center justify-between">

          {/* Logo */}
          <Link href="#" className="text-lg font-semibold tracking-tight">
            Sahariar
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-8 md:flex">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={handleNavClick}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {item.label}
              </a>
            ))}
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block border border-foreground px-4 py-1.5 text-sm font-medium transition-colors hover:bg-foreground hover:text-background"
            >
              Resume
            </a>
            <button
              onClick={(e) => toggleTheme(e)}
              className="inline-flex items-center justify-center rounded border border-border p-1.5 transition-colors hover:bg-secondary"
              aria-label="Toggle theme"
            >
              <ThemeIcon />
            </button>
          </div>

          {/* Mobile: theme + hamburger */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={(e) => toggleTheme(e)}
              className="inline-flex items-center justify-center rounded border border-border p-1.5 transition-colors hover:bg-secondary"
              aria-label="Toggle theme"
            >
              <ThemeIcon />
            </button>
            <button onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation — always mounted, animated via max-height + opacity */}
        <div
          className="md:hidden overflow-hidden transition-all duration-300 ease-in-out"
          style={{
            maxHeight: isOpen ? '400px' : '0px',
            opacity: isOpen ? 1 : 0,
          }}
        >
          <div className="mt-4 flex flex-col gap-4 border-t border-border pt-4">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={handleNavClick}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </nav>
    </header>
  )
}
