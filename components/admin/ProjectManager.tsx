'use client'

import { useState, useEffect } from 'react'

interface ProjectType {
    id: string
    name: string
    description: string
    tags: string[]
    link?: string
    github?: string
}

export default function ProjectManager() {
    const [projects, setProjects] = useState<ProjectType[]>([])
    const [loading, setLoading] = useState(true)
    const [editingId, setEditingId] = useState<string | null>(null)

    // Form state
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [link, setLink] = useState('')
    const [github, setGithub] = useState('')
    const [tags, setTags] = useState('')

    useEffect(() => {
        fetchProjects()
    }, [])

    const fetchProjects = async () => {
        setLoading(true)
        const res = await fetch('/api/projects')
        const data = await res.json()
        setProjects(data)
        setLoading(false)
    }

    const resetForm = () => {
        setEditingId(null)
        setName('')
        setDescription('')
        setLink('')
        setGithub('')
        setTags('')
    }

    const handleEdit = (proj: ProjectType) => {
        setEditingId(proj.id)
        setName(proj.name)
        setDescription(proj.description)
        setLink(proj.link || '')
        setGithub(proj.github || '')
        setTags(proj.tags.join(', '))
    }

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this project?')) return
        await fetch(`/api/projects?id=${id}`, { method: 'DELETE' })
        fetchProjects()
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        const payload = {
            id: editingId, // will be ignored by POST, used by PUT
            name,
            description,
            link: link.trim() || undefined,
            github: github.trim() || undefined,
            tags: tags.split(',').map(t => t.trim()).filter(Boolean)
        }

        if (editingId) {
            await fetch('/api/projects', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            })
        } else {
            await fetch('/api/projects', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            })
        }

        resetForm()
        fetchProjects()
    }

    return (
        <div className="space-y-8">
            {/* Form */}
            <div className="rounded border border-border bg-secondary/20 p-6">
                <h3 className="mb-4 text-xl font-semibold">{editingId ? 'Edit Project' : 'Add New Project'}</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="mb-1 block text-sm font-medium">Name</label>
                        <input required value={name} onChange={e => setName(e.target.value)} className="w-full rounded border border-border bg-background px-3 py-2 text-sm" />
                    </div>

                    <div>
                        <label className="mb-1 block text-sm font-medium">Description</label>
                        <textarea required value={description} onChange={e => setDescription(e.target.value)} className="w-full rounded border border-border bg-background px-3 py-2 text-sm" rows={3} />
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                        <div>
                            <label className="mb-1 block text-sm font-medium">Live Link (optional)</label>
                            <input value={link} onChange={e => setLink(e.target.value)} className="w-full rounded border border-border bg-background px-3 py-2 text-sm" />
                        </div>
                        <div>
                            <label className="mb-1 block text-sm font-medium">GitHub Link (optional)</label>
                            <input value={github} onChange={e => setGithub(e.target.value)} className="w-full rounded border border-border bg-background px-3 py-2 text-sm" />
                        </div>
                    </div>

                    <div>
                        <label className="mb-1 block text-sm font-medium">Tags (comma separated)</label>
                        <input required value={tags} onChange={e => setTags(e.target.value)} placeholder="React, Node, Tailwind" className="w-full rounded border border-border bg-background px-3 py-2 text-sm" />
                    </div>

                    <div className="flex gap-2 pt-2">
                        <button type="submit" className="rounded bg-foreground px-4 py-2 text-sm font-medium text-background hover:opacity-90">
                            {editingId ? 'Save Changes' : 'Add Project'}
                        </button>
                        {editingId && (
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
                    <div className="p-8 text-center text-sm text-muted-foreground">Loading projects...</div>
                ) : projects.length === 0 ? (
                    <div className="p-8 text-center text-sm text-muted-foreground">No projects found. Add one above.</div>
                ) : (
                    <div className="divide-y divide-border">
                        {projects.map(proj => (
                            <div key={proj.id} className="flex items-center justify-between p-4 hover:bg-secondary/20">
                                <div>
                                    <h4 className="font-medium">{proj.name}</h4>
                                    <p className="text-sm text-muted-foreground truncate max-w-sm">{proj.description}</p>
                                </div>
                                <div className="flex gap-2">
                                    <button onClick={() => handleEdit(proj)} className="rounded border border-border px-3 py-1.5 text-xs font-medium hover:bg-secondary">Edit</button>
                                    <button onClick={() => handleDelete(proj.id)} className="rounded border border-red-500/20 text-red-500 hover:bg-red-500/10 px-3 py-1.5 text-xs font-medium">Delete</button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
