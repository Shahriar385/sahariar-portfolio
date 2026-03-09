'use client'

import { useState, useEffect } from 'react'

export default function LearningManager() {
    const [text, setText] = useState('')
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState(false)

    useEffect(() => {
        fetchLearningData()
    }, [])

    const fetchLearningData = async () => {
        setLoading(true)
        try {
            const res = await fetch('/api/learning')
            const data = await res.json()
            setText(data.text || '')
        } catch (err) {
            setError('Failed to load learning data')
        } finally {
            setLoading(false)
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setSaving(true)
        setError('')
        setSuccess(false)

        try {
            const res = await fetch('/api/learning', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ text, password: 'S@hariar123' })
            })

            if (!res.ok) {
                const data = await res.json()
                throw new Error(data.error || 'Failed to save learning data')
            }

            setSuccess(true)
            setTimeout(() => setSuccess(false), 3000)
        } catch (err: any) {
            setError(err.message)
        } finally {
            setSaving(false)
        }
    }

    if (loading) return <div className="p-8 text-center text-sm text-muted-foreground">Loading learning data...</div>

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="rounded-xl border border-border bg-secondary/10 p-8 shadow-sm">
                <h3 className="mb-4 text-xl font-semibold tracking-tight">Currently Learning</h3>
                <p className="mb-6 text-sm text-muted-foreground">
                    Update the text displayed in the "Currently Learning" section of your portfolio.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <textarea
                            required
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            placeholder="Describe what you are currently learning..."
                            rows={10}
                            className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm leading-relaxed transition-all focus:outline-none focus:ring-2 focus:ring-foreground/10"
                        />
                    </div>

                    {error && <p className="text-sm font-medium text-red-500">{error}</p>}
                    {success && <p className="text-sm font-medium text-green-500">Successfully updated!</p>}

                    <button
                        type="submit"
                        disabled={saving}
                        className="rounded-lg bg-foreground px-6 py-2.5 text-sm font-semibold text-background transition-all hover:opacity-90 active:scale-[0.98] disabled:opacity-50"
                    >
                        {saving ? 'Saving...' : 'Update Text'}
                    </button>
                </form>
            </div>
        </div>
    )
}
