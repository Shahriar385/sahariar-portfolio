'use client'

import { useState, useEffect } from 'react'
import { AppType } from '../LiveApps'

export default function AppManager() {
    const [apps, setApps] = useState<AppType[]>([])
    const [loading, setLoading] = useState(true)
    const [editingId, setEditingId] = useState<string | null>(null)

    // Form state
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [platform, setPlatform] = useState<'android' | 'ios' | 'both'>('android')
    const [playStoreUrl, setPlayStoreUrl] = useState('')
    const [appStoreUrl, setAppStoreUrl] = useState('')
    const [tags, setTags] = useState('')

    useEffect(() => {
        fetchApps()
    }, [])

    const fetchApps = async () => {
        setLoading(true)
        const res = await fetch('/api/apps')
        const data = await res.json()
        setApps(data)
        setLoading(false)
    }

    const resetForm = () => {
        setEditingId(null)
        setName('')
        setDescription('')
        setPlatform('android')
        setPlayStoreUrl('')
        setAppStoreUrl('')
        setTags('')
    }

    const handleEdit = (app: AppType) => {
        setEditingId(app.id)
        setName(app.name)
        setDescription(app.description)
        setPlatform(app.platform)
        setPlayStoreUrl(app.playStoreUrl || '')
        setAppStoreUrl(app.appStoreUrl || '')
        setTags(app.tags.join(', '))
    }

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this app?')) return
        await fetch(`/api/apps?id=${id}`, { method: 'DELETE' })
        fetchApps()
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        const payload = {
            id: editingId, // will be ignored by POST, used by PUT
            name,
            description,
            platform,
            playStoreUrl: playStoreUrl.trim() || undefined,
            appStoreUrl: appStoreUrl.trim() || undefined,
            tags: tags.split(',').map(t => t.trim()).filter(Boolean)
        }

        if (editingId) {
            await fetch('/api/apps', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            })
        } else {
            await fetch('/api/apps', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            })
        }

        resetForm()
        fetchApps()
    }

    return (
        <div className="space-y-8">
            {/* Form */}
            <div className="rounded border border-border bg-secondary/20 p-6">
                <h3 className="mb-4 text-xl font-semibold">{editingId ? 'Edit App' : 'Add New App'}</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                        <div>
                            <label className="mb-1 block text-sm font-medium">Name</label>
                            <input required value={name} onChange={e => setName(e.target.value)} className="w-full rounded border border-border bg-background px-3 py-2 text-sm" />
                        </div>
                        <div>
                            <label className="mb-1 block text-sm font-medium">Platform</label>
                            <select value={platform} onChange={e => setPlatform(e.target.value as any)} className="w-full rounded border border-border bg-background px-3 py-2 text-sm">
                                <option value="android">Android</option>
                                <option value="ios">iOS</option>
                                <option value="both">Both</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="mb-1 block text-sm font-medium">Description</label>
                        <textarea required value={description} onChange={e => setDescription(e.target.value)} className="w-full rounded border border-border bg-background px-3 py-2 text-sm" rows={3} />
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                        <div>
                            <label className="mb-1 block text-sm font-medium">Play Store URL</label>
                            <input value={playStoreUrl} onChange={e => setPlayStoreUrl(e.target.value)} className="w-full rounded border border-border bg-background px-3 py-2 text-sm" />
                        </div>
                        <div>
                            <label className="mb-1 block text-sm font-medium">App Store URL</label>
                            <input value={appStoreUrl} onChange={e => setAppStoreUrl(e.target.value)} className="w-full rounded border border-border bg-background px-3 py-2 text-sm" />
                        </div>
                    </div>

                    <div>
                        <label className="mb-1 block text-sm font-medium">Tags (comma separated)</label>
                        <input required value={tags} onChange={e => setTags(e.target.value)} placeholder="Flutter, Firebase, Android" className="w-full rounded border border-border bg-background px-3 py-2 text-sm" />
                    </div>

                    <div className="flex gap-2 pt-2">
                        <button type="submit" className="rounded bg-foreground px-4 py-2 text-sm font-medium text-background hover:opacity-90">
                            {editingId ? 'Save Changes' : 'Add App'}
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
                    <div className="p-8 text-center text-sm text-muted-foreground">Loading apps...</div>
                ) : apps.length === 0 ? (
                    <div className="p-8 text-center text-sm text-muted-foreground">No apps found. Add one above.</div>
                ) : (
                    <div className="divide-y divide-border">
                        {apps.map(app => (
                            <div key={app.id} className="flex items-center justify-between p-4 hover:bg-secondary/20">
                                <div>
                                    <h4 className="font-medium">{app.name}</h4>
                                    <p className="text-sm text-muted-foreground">{app.platform}</p>
                                </div>
                                <div className="flex gap-2">
                                    <button onClick={() => handleEdit(app)} className="rounded border border-border px-3 py-1.5 text-xs font-medium hover:bg-secondary">Edit</button>
                                    <button onClick={() => handleDelete(app.id)} className="rounded border border-red-500/20 text-red-500 hover:bg-red-500/10 px-3 py-1.5 text-xs font-medium">Delete</button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
