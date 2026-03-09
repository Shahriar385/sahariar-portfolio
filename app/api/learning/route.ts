import { NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'

export const dynamic = 'force-dynamic'

const dataFilePath = path.join(process.cwd(), 'data', 'learning.json')

export async function GET() {
    try {
        const fileContents = await fs.readFile(dataFilePath, 'utf8')
        const data = JSON.parse(fileContents)
        return NextResponse.json(data)
    } catch (error) {
        return NextResponse.json({ error: 'Failed to read learning data' }, { status: 500 })
    }
}

export async function PUT(request: Request) {
    try {
        const { text } = await request.json()
        if (typeof text !== 'string') {
            return NextResponse.json({ error: 'Invalid text' }, { status: 400 })
        }

        const data = { text: text.trim() }
        await fs.writeFile(dataFilePath, JSON.stringify(data, null, 2), 'utf8')

        return NextResponse.json({ success: true, data })
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update learning data' }, { status: 500 })
    }
}
