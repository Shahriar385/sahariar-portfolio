'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import ProjectManager from '@/components/admin/ProjectManager'
import AppManager from '@/components/admin/AppManager'
import SkillManager from '@/components/admin/SkillManager'
import LearningManager from '@/components/admin/LearningManager'
import AdminLogin from '@/components/admin/AdminLogin'

export default function AdminDashboard() {
    const [activeTab, setActiveTab] = useState<'projects' | 'apps' | 'skills' | 'learning'>('projects')
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [checking, setChecking] = useState(true)

    useEffect(() => {
        const auth = localStorage.getItem('admin_auth')
        if (auth === 'true') {
            setIsAuthenticated(true)
        }
        setChecking(false)
    }, [])

    if (checking) return null

    if (!isAuthenticated) {
        return <AdminLogin onLogin={() => setIsAuthenticated(true)} />
    }

    return (
        <div className="min-h-screen bg-background text-foreground pb-20 animate-in fade-in duration-500">
            {/* Admin Header */}
            <header className="border-b border-border bg-secondary/30">
                <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
                    <div className="flex items-center gap-4">
                        <h1 className="text-xl font-semibold tracking-tight">Portfolio Admin</h1>
                    </div>
                    <Link
                        href="/"
                        className="text-sm font-medium text-muted-foreground hover:text-foreground"
                    >
                        ← Back to Site
                    </Link>
                </div>
            </header>

            {/* Main Content */}
            <main className="mx-auto mt-12 max-w-5xl px-6">
                <div className="mb-8">
                    <p className="text-muted-foreground">
                        Make changes to your work and apps here. Because this uses local JSON files,
                        <strong> changes will only be saved permanently if you run this locally and deploy the updated files.</strong>
                    </p>
                </div>

                {/* Tabs */}
                <div className="mb-8 flex flex-wrap border-b border-border">
                    <button
                        onClick={() => setActiveTab('projects')}
                        className={`-mb-[1px] border-b-2 px-6 py-3 text-sm font-medium transition-colors ${activeTab === 'projects'
                            ? 'border-foreground text-foreground'
                            : 'border-transparent text-muted-foreground hover:text-foreground'
                            }`}
                    >
                        Manage Work (Projects)
                    </button>
                    <button
                        onClick={() => setActiveTab('apps')}
                        className={`-mb-[1px] border-b-2 px-6 py-3 text-sm font-medium transition-colors ${activeTab === 'apps'
                            ? 'border-foreground text-foreground'
                            : 'border-transparent text-muted-foreground hover:text-foreground'
                            }`}
                    >
                        Manage Live Apps
                    </button>
                    <button
                        onClick={() => setActiveTab('skills')}
                        className={`-mb-[1px] border-b-2 px-6 py-3 text-sm font-medium transition-colors ${activeTab === 'skills'
                            ? 'border-foreground text-foreground'
                            : 'border-transparent text-muted-foreground hover:text-foreground'
                            }`}
                    >
                        Manage Skills
                    </button>
                    <button
                        onClick={() => setActiveTab('learning')}
                        className={`-mb-[1px] border-b-2 px-6 py-3 text-sm font-medium transition-colors ${activeTab === 'learning'
                            ? 'border-foreground text-foreground'
                            : 'border-transparent text-muted-foreground hover:text-foreground'
                            }`}
                    >
                        Manage Learning
                    </button>
                </div>

                {/* Active Tab Content */}
                <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                    {activeTab === 'projects' && <ProjectManager />}
                    {activeTab === 'apps' && <AppManager />}
                    {activeTab === 'skills' && <SkillManager />}
                    {activeTab === 'learning' && <LearningManager />}
                </div>
            </main>
        </div>
    )
}
