import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export const dynamic = 'force-dynamic'

const PASSWORD = 'S@hariar123'

export async function GET() {
    try {
        const { data, error } = await supabase
            .from('projects')
            .select('*')
            .order('created_at', { ascending: true })

        if (error) throw error
        return NextResponse.json(data)
    } catch (error) {
        return NextResponse.json({ error: 'Failed to read projects' }, { status: 500 })
    }
}

export async function POST(request: Request) {
    try {
        const { password, ...newProject } = await request.json()
        if (password !== PASSWORD) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const { data, error } = await supabase
            .from('projects')
            .insert([newProject])
            .select()
            .single()

        if (error) throw error
        return NextResponse.json(data, { status: 201 })
    } catch (error) {
        return NextResponse.json({ error: 'Failed to create project' }, { status: 500 })
    }
}

export async function PUT(request: Request) {
    try {
        const { password, ...updatedProject } = await request.json()
        if (password !== PASSWORD) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const { id, ...projectData } = updatedProject
        const { data, error } = await supabase
            .from('projects')
            .update(projectData)
            .eq('id', id)
            .select()
            .single()

        if (error) throw error
        return NextResponse.json(data)
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update project' }, { status: 500 })
    }
}

export async function DELETE(request: Request) {
    try {
        const { searchParams } = new URL(request.url)
        const id = searchParams.get('id')
        if (!id) return NextResponse.json({ error: 'ID is required' }, { status: 400 })

        const { error } = await supabase
            .from('projects')
            .delete()
            .eq('id', id)

        if (error) throw error
        return NextResponse.json({ success: true })
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete project' }, { status: 500 })
    }
}
