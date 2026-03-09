'use client'

import { useState, useEffect } from 'react'
import { SkillType } from '@/app/api/skills/route'

export default function SkillManager() {
    const [skills, setSkills] = useState<SkillType[]>([])
    const [loading, setLoading] = useState(true)
    const [editingName, setEditingName] = useState<string | null>(null)

    // Form state
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [proficiency, setProficiency] = useState<number | ''>('')
    const [error, setError] = useState('')

    useEffect(() => {
        fetchSkills()
    }, [])

    const fetchSkills = async () => {
        setLoading(true)
        const res = await fetch('/api/skills')
        const data = await res.json()
        setSkills(data)
        setLoading(false)
    }

    const resetForm = () => {
        setEditingName(null)
        setName('')
        setDescription('')
        setProficiency('')
        setError('')
    }

    const handleEdit = (skill: SkillType) => {
        setEditingName(skill.name)
        setName(skill.name)
        setDescription(skill.description || '')
        setProficiency(skill.proficiency ?? '')
        setError('')
    }

    const handleDelete = async (skillName: string) => {
        if (!confirm(`Are you sure you want to delete "${skillName}"?`)) return
        await fetch(`/api/skills?name=${encodeURIComponent(skillName)}`, { method: 'DELETE' })
        fetchSkills()
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')

        if (!name.trim()) return

        const parsedProficiency = typeof proficiency === 'number' ? proficiency : parseInt(proficiency, 10)

        const payload = {
            name: name.trim(),
            description: description.trim() || undefined,
            proficiency: isNaN(parsedProficiency) ? undefined : Math.min(100, Math.max(0, parsedProficiency))
        }

        const method = editingName ? 'PUT' : 'POST'

        const res = await fetch('/api/skills', {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        })

        if (!res.ok) {
            const data = await res.json()
            setError(data.error || 'Failed to save skill')
            return
        }

        resetForm()
        fetchSkills()
    }

    return (
        <div className="space-y-8">
            {/* Form */}
            <div className="rounded border border-border bg-secondary/20 p-6">
                <h3 className="mb-4 text-xl font-semibold">{editingName ? 'Edit Skill Details' : 'Add New Skill'}</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                        <div>
                            <label className="mb-1 block text-sm font-medium">Skill Name</label>
                            <input
                                required
                                disabled={!!editingName}
                                value={name}
                                onChange={e => setName(e.target.value)}
                                placeholder="e.g. React Native, AWS"
                                className="w-full rounded border border-border bg-background px-3 py-2 text-sm disabled:opacity-50"
                            />
                        </div>
                        <div>
                            <label className="mb-1 block text-sm font-medium">Proficiency (0-100)</label>
                            <input
                                type="number"
                                min="0"
                                max="100"
                                value={proficiency}
                                onChange={e => setProficiency(e.target.value ? Number(e.target.value) : '')}
                                placeholder="e.g. 85"
                                className="w-full rounded border border-border bg-background px-3 py-2 text-sm"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="mb-1 block text-sm font-medium">Description (Optional)</label>
                        <textarea
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                            placeholder="Briefly describe your experience with this skill..."
                            rows={3}
                            className="w-full rounded border border-border bg-background px-3 py-2 text-sm"
                        />
                    </div>

                    {error && <p className="text-sm text-red-500">{error}</p>}

                    <div className="flex gap-2 pt-2">
                        <button type="submit" className="rounded bg-foreground px-4 py-2 text-sm font-medium text-background hover:opacity-90">
                            {editingName ? 'Save Changes' : 'Add Skill'}
                        </button>
                        {editingName && (
                            <button type="button" onClick={resetForm} className="rounded border border-border px-4 py-2 text-sm font-medium hover:bg-secondary">
                                Cancel
                            </button>
                        )}
                    </div>
                </form>
            </div>

            {/* List */}
            <div className="rounded border border-border">
                {loading ? (
                    <div className="p-8 text-center text-sm text-muted-foreground">Loading skills...</div>
                ) : skills.length === 0 ? (
                    <div className="p-8 text-center text-sm text-muted-foreground">No skills found. Add one above.</div>
                ) : (
                    <div className="divide-y divide-border">
                        {skills.map(skill => (
                            <div key={skill.name} className="flex items-start justify-between p-4 hover:bg-secondary/20">
                                <div>
                                    <h4 className="font-medium flex items-center gap-2">
                                        {skill.name}
                                        {skill.proficiency !== undefined && (
                                            <span className="rounded-full bg-foreground/10 px-2 py-0.5 text-xs text-foreground">
                                                {skill.proficiency}%
                                            </span>
                                        )}
                                    </h4>
                                    {skill.description && (
                                        <p className="mt-1 text-xs text-muted-foreground line-clamp-2 max-w-sm">
                                            {skill.description}
                                        </p>
                                    )}
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => handleEdit(skill)}
                                        className="rounded border border-border px-3 py-1.5 text-xs font-medium hover:bg-secondary"
                                    >
                                        Edit Details
                                    </button>
                                    <button
                                        onClick={() => handleDelete(skill.name)}
                                        className="rounded border border-red-500/20 text-red-500 hover:bg-red-500/10 px-3 py-1.5 text-xs font-medium"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
