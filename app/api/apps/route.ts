import { NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'

export const dynamic = 'force-dynamic'

const dataFilePath = path.join(process.cwd(), 'data', 'apps.json')

export async function GET() {
    try {
        const fileContents = await fs.readFile(dataFilePath, 'utf8')
        const apps = JSON.parse(fileContents)
        return NextResponse.json(apps)
    } catch (error) {
        return NextResponse.json({ error: 'Failed to read apps' }, { status: 500 })
    }
}

export async function POST(request: Request) {
    try {
        const newApp = await request.json()
        const fileContents = await fs.readFile(dataFilePath, 'utf8')
        const apps = JSON.parse(fileContents)

        newApp.id = `app-${Date.now()}`
        apps.push(newApp)

        await fs.writeFile(dataFilePath, JSON.stringify(apps, null, 2), 'utf8')
        return NextResponse.json(newApp, { status: 201 })
    } catch (error) {
        return NextResponse.json({ error: 'Failed to create app' }, { status: 500 })
    }
}

export async function PUT(request: Request) {
    try {
        const updatedApp = await request.json()
        const fileContents = await fs.readFile(dataFilePath, 'utf8')
        const apps = JSON.parse(fileContents)

        const index = apps.findIndex((a: any) => a.id === updatedApp.id)
        if (index === -1) {
            return NextResponse.json({ error: 'App not found' }, { status: 404 })
        }

        apps[index] = updatedApp
        await fs.writeFile(dataFilePath, JSON.stringify(apps, null, 2), 'utf8')
        return NextResponse.json(updatedApp)
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update app' }, { status: 500 })
    }
}

export async function DELETE(request: Request) {
    try {
        const { searchParams } = new URL(request.url)
        const id = searchParams.get('id')
        if (!id) return NextResponse.json({ error: 'ID is required' }, { status: 400 })

        const fileContents = await fs.readFile(dataFilePath, 'utf8')
        let apps = JSON.parse(fileContents)

        apps = apps.filter((a: any) => a.id !== id)
        await fs.writeFile(dataFilePath, JSON.stringify(apps, null, 2), 'utf8')

        return NextResponse.json({ success: true })
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete app' }, { status: 500 })
    }
}
