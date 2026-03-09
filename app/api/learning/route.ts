import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export const dynamic = 'force-dynamic'

const PASSWORD = 'S@hariar123'

export async function GET() {
    try {
        const { data, error } = await supabase
            .from('learning')
            .select('text')
            .eq('id', 1)
            .single()

        if (error) throw error
        return NextResponse.json(data)
    } catch (error) {
        return NextResponse.json({ error: 'Failed to read learning data' }, { status: 500 })
    }
}

export async function PUT(request: Request) {
    try {
        const { text, password } = await request.json()
        if (password !== PASSWORD) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        if (typeof text !== 'string') {
            return NextResponse.json({ error: 'Invalid text' }, { status: 400 })
        }

        const { data, error: updateError } = await supabase
            .from('learning')
            .update({ text: text.trim(), updated_at: new Date().toISOString() })
            .eq('id', 1)
            .select()
            .single()

        if (updateError) throw updateError

        return NextResponse.json({ success: true, data })
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update learning data' }, { status: 500 })
    }
}
