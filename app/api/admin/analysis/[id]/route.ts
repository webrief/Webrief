import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { createServiceRoleClient } from '@/lib/supabase/service'

type RouteContext = {
  params: Promise<{ id: string }>
}

async function verifyAdmin() {
  const supabase = await createClient()

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()

  const adminEmail = process.env.ADMIN_EMAIL
    ?.trim()
    .toLowerCase()

  const userEmail = user?.email
    ?.trim()
    .toLowerCase()

  if (error || !user || !adminEmail || userEmail !== adminEmail) {
    return null
  }

  return user
}

function validUUID(value: string) {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value)
}

export async function GET(
  _request: Request,
  context: RouteContext
) {
  try {
    const user = await verifyAdmin()

    if (!user) {
      return NextResponse.json(
        { success: false, message: 'Akses ditolak.' },
        { status: 401 }
      )
    }

    const { id } = await context.params

    if (!validUUID(id)) {
      return NextResponse.json(
        { success: false, message: 'ID tiket tidak valid.' },
        { status: 400 }
      )
    }

    const db = createServiceRoleClient()

    const { data, error } = await db
      .from('brief_analyses')
      .select('*')
      .eq('ticket_id', id)
      .maybeSingle()

    if (error) {
      console.error('Read analysis error:', error)

      return NextResponse.json(
        { success: false, message: 'Gagal membaca analisis.' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      analysis: data,
    })
  } catch (error) {
    console.error('Analysis GET error:', error)

    return NextResponse.json(
      { success: false, message: 'Terjadi kesalahan pada server.' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: Request,
  context: RouteContext
) {
  try {
    const user = await verifyAdmin()

    if (!user) {
      return NextResponse.json(
        { success: false, message: 'Akses ditolak.' },
        { status: 401 }
      )
    }

    const { id } = await context.params

    if (!validUUID(id)) {
      return NextResponse.json(
        { success: false, message: 'ID tiket tidak valid.' },
        { status: 400 }
      )
    }

    const body = await request.json()

    const textFields = [
      'analysis_summary',
      'website_concept',
      'page_structure',
      'design_direction',
      'copywriting',
      'technical_notes',
    ]

    for (const field of textFields) {
      if (
        body[field] !== undefined &&
        body[field] !== null &&
        typeof body[field] !== 'string'
      ) {
        return NextResponse.json(
          { success: false, message: `Format ${field} tidak valid.` },
          { status: 400 }
        )
      }
    }

    if (
      body.recommended_features !== undefined &&
      (
        !body.recommended_features ||
        typeof body.recommended_features !== 'object' ||
        Array.isArray(body.recommended_features)
      )
    ) {
      return NextResponse.json(
        { success: false, message: 'Format fitur rekomendasi tidak valid.' },
        { status: 400 }
      )
    }

    const allowedStatuses = [
      'not_started',
      'in_progress',
      'completed',
    ]

    if (
      body.status !== undefined &&
      !allowedStatuses.includes(body.status)
    ) {
      return NextResponse.json(
        { success: false, message: 'Status analisis tidak valid.' },
        { status: 400 }
      )
    }

    const db = createServiceRoleClient()

    // Pastikan tiket memang ada.
    const { data: ticket, error: ticketError } = await db
      .from('tickets')
      .select('id')
      .eq('id', id)
      .maybeSingle()

    if (ticketError) {
      console.error('Ticket lookup error:', ticketError)

      return NextResponse.json(
        { success: false, message: 'Gagal memeriksa tiket.' },
        { status: 500 }
      )
    }

    if (!ticket) {
      return NextResponse.json(
        { success: false, message: 'Tiket tidak ditemukan.' },
        { status: 404 }
      )
    }

    const payload: Record<string, unknown> = {
      ticket_id: id,
      updated_at: new Date().toISOString(),
    }

    for (const field of textFields) {
      if (body[field] !== undefined) {
        payload[field] = body[field]
      }
    }

    if (body.recommended_features !== undefined) {
      payload.recommended_features = body.recommended_features
    }

    if (body.status !== undefined) {
      payload.status = body.status
    }

    const { data, error } = await db
      .from('brief_analyses')
      .upsert(payload, { onConflict: 'ticket_id' })
      .select('*')
      .single()

    if (error) {
      console.error('Save analysis error:', error)

      return NextResponse.json(
        { success: false, message: 'Gagal menyimpan analisis.' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Analisis berhasil disimpan.',
      analysis: data,
    })
  } catch (error) {
    console.error('Analysis PUT error:', error)

    return NextResponse.json(
      { success: false, message: 'Terjadi kesalahan pada server.' },
      { status: 500 }
    )
  }
}
