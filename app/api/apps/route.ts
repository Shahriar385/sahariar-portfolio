import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export const dynamic = 'force-dynamic'

const PASSWORD = 'S@hariar123'

export async function GET() {
    try {
        const { data, error } = await supabase
            .from('apps')
            .select('*')
            .order('created_at', { ascending: true })

        if (error) throw error

        // Map snake_case to camelCase
        const mappedData = data.map((app: any) => ({
            id: app.id,
            name: app.name,
            description: app.description,
            platform: app.platform,
            playStoreUrl: app.play_store_url,
            appStoreUrl: app.app_store_url,
            tags: app.tags,
            createdAt: app.created_at
        }))

        return NextResponse.json(mappedData)
    } catch (error) {
        return NextResponse.json({ error: 'Failed to read apps' }, { status: 500 })
    }
}

export async function POST(request: Request) {
    try {
        const { password, ...newApp } = await request.json()
        if (password !== PASSWORD) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const { data, error } = await supabase
            .from('apps')
            .insert([{
                name: newApp.name,
                description: newApp.description,
                platform: newApp.platform,
                play_store_url: newApp.playStoreUrl,
                app_store_url: newApp.appStoreUrl,
                tags: newApp.tags
            }])
            .select()
            .single()

        if (error) throw error
        return NextResponse.json(data, { status: 201 })
    } catch (error) {
        return NextResponse.json({ error: 'Failed to create app' }, { status: 500 })
    }
}

export async function PUT(request: Request) {
    try {
        const { password, ...updatedApp } = await request.json()
        if (password !== PASSWORD) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const { id, ...appData } = updatedApp
        // Let's re-write it correctly.
        const { data, error } = await supabase
            .from('apps')
            .update({
                name: updatedApp.name,
                description: updatedApp.description,
                platform: updatedApp.platform,
                play_store_url: updatedApp.playStoreUrl,
                app_store_url: updatedApp.appStoreUrl,
                tags: updatedApp.tags
            })
            .eq('id', updatedApp.id)
            .select()
            .single()

        if (error) throw error
        return NextResponse.json(data)
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update app' }, { status: 500 })
    }
}

export async function DELETE(request: Request) {
    try {
        const { searchParams } = new URL(request.url)
        const id = searchParams.get('id')
        if (!id) return NextResponse.json({ error: 'ID is required' }, { status: 400 })

        const { error } = await supabase
            .from('apps')
            .delete()
            .eq('id', id)

        if (error) throw error
        return NextResponse.json({ success: true })
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete app' }, { status: 500 })
    }
}
