'use client'

import { useState, useEffect } from 'react'

interface AdminLoginProps {
    onLogin: () => void
}

const PASSWORD = 'S@hariar123'

export default function AdminLogin({ onLogin }: AdminLoginProps) {
    const [input, setInput] = useState('')
    const [error, setError] = useState(false)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (input === PASSWORD) {
            localStorage.setItem('admin_auth', 'true')
            onLogin()
        } else {
            setError(true)
            setInput('')
        }
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-background px-6">
            <div className="w-full max-w-sm rounded-xl border border-border bg-secondary/10 p-8 shadow-2xl backdrop-blur-sm animate-in fade-in zoom-in-95 duration-500">
                <div className="mb-8 text-center">
                    <h1 className="text-2xl font-bold tracking-tight">Admin Access</h1>
                    <p className="mt-2 text-sm text-muted-foreground">Please enter your password to continue.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <input
                            type="password"
                            required
                            value={input}
                            onChange={(e) => {
                                setInput(e.target.value)
                                if (error) setError(false)
                            }}
                            placeholder="Enter password"
                            className={`w-full rounded-md border bg-background px-4 py-3 text-sm transition-all focus:outline-none focus:ring-2 ${error
                                    ? 'border-red-500 focus:ring-red-500/20'
                                    : 'border-border focus:ring-foreground/10'
                                }`}
                            autoFocus
                        />
                        {error && (
                            <p className="mt-2 text-center text-xs font-medium text-red-500 animate-in slide-in-from-top-1">
                                Incorrect password. Please try again.
                            </p>
                        )}
                    </div>

                    <button
                        type="submit"
                        className="w-full rounded-md bg-foreground py-3 text-sm font-semibold text-background transition-all hover:opacity-90 active:scale-[0.98]"
                    >
                        Login
                    </button>
                </form>

                <div className="mt-8 text-center">
                    <a
                        href="/"
                        className="text-xs text-muted-foreground hover:text-foreground hover:underline underline-offset-4 transition-colors"
                    >
                        Return to Portfolio
                    </a>
                </div>
            </div>
        </div>
    )
}
