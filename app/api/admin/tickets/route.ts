import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { createServiceRoleClient } from '@/lib/supabase/service'

export async function GET() {
  try {
    const supabase = await createClient()

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    const adminEmail = process.env.ADMIN_EMAIL?.trim().toLowerCase()
    const userEmail = user?.email?.trim().toLowerCase()

    if (
      authError ||
      !user ||
      !adminEmail ||
      userEmail !== adminEmail
    ) {
      return NextResponse.json(
        { success: false, message: 'Akses ditolak.' },
        { status: 401 }
      )
    }

    const db = createServiceRoleClient()

    const { data, error } = await db
      .from('tickets')
      .select(`
        id,
        ticket_code,
        customer_name,
        customer_email,
        customer_whatsapp,
        project_type,
        status,
        created_at,
        briefs (
          website_purpose,
          website_vibe
        ),
        brief_analyses (
          status
        )
      `)
      .order('created_at', { ascending: false })
      .limit(100)

    if (error) {
      console.error('Admin tickets error:', error)

      return NextResponse.json(
        { success: false, message: 'Gagal mengambil data tiket.' },
        { status: 500 }
      )
    }

    const tickets = (data ?? []).map((ticket) => {
      const analyses = ticket.brief_analyses

      const analysis = Array.isArray(analyses)
        ? analyses[0] ?? null
        : analyses

      return {
        ...ticket,
        analysis_status: analysis?.status ?? 'not_started',
      }
    })

    return NextResponse.json({
      success: true,
      total: tickets.length,
      tickets,
    })
  } catch (error) {
    console.error('Admin API error:', error)

    return NextResponse.json(
      { success: false, message: 'Terjadi kesalahan pada server.' },
      { status: 500 }
    )
  }
}
