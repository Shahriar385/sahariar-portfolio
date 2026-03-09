import { NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'

export const dynamic = 'force-dynamic'

const dataFilePath = path.join(process.cwd(), 'data', 'skills.json')

export interface SkillType {
    name: string
    description?: string
    proficiency?: number
}

export async function GET() {
    try {
        const fileContents = await fs.readFile(dataFilePath, 'utf8')
        const skills: SkillType[] = JSON.parse(fileContents)
        return NextResponse.json(skills)
    } catch (error) {
        return NextResponse.json({ error: 'Failed to read skills' }, { status: 500 })
    }
}

export async function POST(request: Request) {
    try {
        const { name, description, proficiency } = await request.json()
        if (!name || typeof name !== 'string') {
            return NextResponse.json({ error: 'Invalid skill name' }, { status: 400 })
        }

        const fileContents = await fs.readFile(dataFilePath, 'utf8')
        const skills: SkillType[] = JSON.parse(fileContents)

        // Validate uniqueness by name
        if (skills.some(s => s.name.toLowerCase() === name.toLowerCase())) {
            return NextResponse.json({ error: 'Skill already exists' }, { status: 400 })
        }

        const newSkill: SkillType = {
            name: name.trim(),
            description: description?.trim(),
            proficiency: typeof proficiency === 'number' ? Math.min(100, Math.max(0, proficiency)) : undefined
        }
        skills.push(newSkill)
        await fs.writeFile(dataFilePath, JSON.stringify(skills, null, 2), 'utf8')

        return NextResponse.json({ success: true, skill: newSkill })
    } catch (error) {
        return NextResponse.json({ error: 'Failed to create skill' }, { status: 500 })
    }
}

export async function PUT(request: Request) {
    try {
        const { name, description, proficiency } = await request.json()
        if (!name || typeof name !== 'string') {
            return NextResponse.json({ error: 'Invalid skill name' }, { status: 400 })
        }

        const fileContents = await fs.readFile(dataFilePath, 'utf8')
        const skills: SkillType[] = JSON.parse(fileContents)

        const index = skills.findIndex(s => s.name.toLowerCase() === name.toLowerCase())
        if (index === -1) {
            return NextResponse.json({ error: 'Skill not found' }, { status: 404 })
        }

        skills[index] = {
            name: name.trim(),
            description: description?.trim(),
            proficiency: typeof proficiency === 'number' ? Math.min(100, Math.max(0, proficiency)) : undefined
        }
        await fs.writeFile(dataFilePath, JSON.stringify(skills, null, 2), 'utf8')

        return NextResponse.json({ success: true, skill: skills[index] })
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update skill' }, { status: 500 })
    }
}

export async function DELETE(request: Request) {
    try {
        const { searchParams } = new URL(request.url)
        const skillName = searchParams.get('name')
        if (!skillName) return NextResponse.json({ error: 'Skill name is required' }, { status: 400 })

        const fileContents = await fs.readFile(dataFilePath, 'utf8')
        let skills: SkillType[] = JSON.parse(fileContents)

        skills = skills.filter((s) => s.name.toLowerCase() !== skillName.toLowerCase())
        await fs.writeFile(dataFilePath, JSON.stringify(skills, null, 2), 'utf8')

        return NextResponse.json({ success: true })
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete skill' }, { status: 500 })
    }
}
