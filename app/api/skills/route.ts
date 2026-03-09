import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export const dynamic = 'force-dynamic'

const PASSWORD = 'S@hariar123'

export interface SkillType {
    id?: string
    name: string
    description?: string
    proficiency?: number
}

export async function GET() {
    try {
        const { data, error } = await supabase
            .from('skills')
            .select('*')
            .order('name', { ascending: true })

        if (error) throw error
        return NextResponse.json(data)
    } catch (error) {
        return NextResponse.json({ error: 'Failed to read skills' }, { status: 500 })
    }
}

export async function POST(request: Request) {
    try {
        const { password, ...newSkill } = await request.json()
        if (password !== PASSWORD) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        if (!newSkill.name || typeof newSkill.name !== 'string') {
            return NextResponse.json({ error: 'Invalid skill name' }, { status: 400 })
        }

        const { data, error } = await supabase
            .from('skills')
            .insert([{
                name: newSkill.name.trim(),
                description: newSkill.description?.trim(),
                proficiency: typeof newSkill.proficiency === 'number' ? Math.min(100, Math.max(0, newSkill.proficiency)) : undefined
            }])
            .select()
            .single()

        if (error) {
            if (error.code === '23505') {
                return NextResponse.json({ error: 'Skill already exists' }, { status: 400 })
            }
            throw error
        }

        return NextResponse.json({ success: true, skill: data })
    } catch (error) {
        return NextResponse.json({ error: 'Failed to create skill' }, { status: 500 })
    }
}

export async function PUT(request: Request) {
    try {
        const { password, ...updatedSkill } = await request.json()
        if (password !== PASSWORD) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        if (!updatedSkill.name || typeof updatedSkill.name !== 'string') {
            return NextResponse.json({ error: 'Invalid skill name' }, { status: 400 })
        }

        const { data, error } = await supabase
            .from('skills')
            .update({
                description: updatedSkill.description?.trim(),
                proficiency: typeof updatedSkill.proficiency === 'number' ? Math.min(100, Math.max(0, updatedSkill.proficiency)) : undefined
            })
            .ilike('name', updatedSkill.name)
            .select()
            .single()

        if (error) throw error
        return NextResponse.json({ success: true, skill: data })
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update skill' }, { status: 500 })
    }
}

export async function DELETE(request: Request) {
    try {
        const { searchParams } = new URL(request.url)
        const skillName = searchParams.get('name')
        if (!skillName) return NextResponse.json({ error: 'Skill name is required' }, { status: 400 })

        const { error } = await supabase
            .from('skills')
            .delete()
            .ilike('name', skillName)

        if (error) throw error
        return NextResponse.json({ success: true })
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete skill' }, { status: 500 })
    }
}
