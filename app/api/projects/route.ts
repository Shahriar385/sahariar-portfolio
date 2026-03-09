import { NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'

export const dynamic = 'force-dynamic'

const dataFilePath = path.join(process.cwd(), 'data', 'projects.json')

export async function GET() {
    try {
        const fileContents = await fs.readFile(dataFilePath, 'utf8')
        const projects = JSON.parse(fileContents)
        return NextResponse.json(projects)
    } catch (error) {
        return NextResponse.json({ error: 'Failed to read projects' }, { status: 500 })
    }
}

export async function POST(request: Request) {
    try {
        const newProject = await request.json()
        const fileContents = await fs.readFile(dataFilePath, 'utf8')
        const projects = JSON.parse(fileContents)

        newProject.id = `proj-${Date.now()}`
        projects.push(newProject)

        await fs.writeFile(dataFilePath, JSON.stringify(projects, null, 2), 'utf8')
        return NextResponse.json(newProject, { status: 201 })
    } catch (error) {
        return NextResponse.json({ error: 'Failed to create project' }, { status: 500 })
    }
}

export async function PUT(request: Request) {
    try {
        const updatedProject = await request.json()
        const fileContents = await fs.readFile(dataFilePath, 'utf8')
        const projects = JSON.parse(fileContents)

        const index = projects.findIndex((p: any) => p.id === updatedProject.id)
        if (index === -1) {
            return NextResponse.json({ error: 'Project not found' }, { status: 404 })
        }

        projects[index] = updatedProject
        await fs.writeFile(dataFilePath, JSON.stringify(projects, null, 2), 'utf8')
        return NextResponse.json(updatedProject)
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update project' }, { status: 500 })
    }
}

export async function DELETE(request: Request) {
    try {
        const { searchParams } = new URL(request.url)
        const id = searchParams.get('id')
        if (!id) return NextResponse.json({ error: 'ID is required' }, { status: 400 })

        const fileContents = await fs.readFile(dataFilePath, 'utf8')
        let projects = JSON.parse(fileContents)

        projects = projects.filter((p: any) => p.id !== id)
        await fs.writeFile(dataFilePath, JSON.stringify(projects, null, 2), 'utf8')

        return NextResponse.json({ success: true })
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete project' }, { status: 500 })
    }
}
