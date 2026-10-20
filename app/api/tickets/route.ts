import { NextResponse } from 'next/server'
import { createServiceRoleClient } from '@/lib/supabase/service'

function generateTicketCode() {
  const datePart = new Date().toISOString().slice(0, 10).replace(/-/g, '')
  const randomPart = crypto.randomUUID().slice(0, 8).toUpperCase()
  return `WB-${datePart}-${randomPart}`
}

export async function POST(request: Request) {
  try {
    const body = await request.json()

    const customerName =
      typeof body.customer_name === 'string'
        ? body.customer_name.trim()
        : ''

    const websitePurpose =
      typeof body.website_purpose === 'string'
        ? body.website_purpose.trim()
        : ''

    if (!customerName || !websitePurpose) {
      return NextResponse.json(
        {
          success: false,
          message: 'Nama dan tujuan website wajib diisi.',
        },
        { status: 400 }
      )
    }

    const supabase = createServiceRoleClient()
    const ticketCode = generateTicketCode()

    const { data: ticket, error: ticketError } = await supabase
      .from('tickets')
      .insert({
        ticket_code: ticketCode,
        customer_name: customerName,
        customer_email:
          typeof body.customer_email === 'string'
            ? body.customer_email.trim() || null
            : null,
        customer_whatsapp:
          typeof body.customer_whatsapp === 'string'
            ? body.customer_whatsapp.trim() || null
            : null,
        project_type: 'website',
        status: 'brief_received',
      })
      .select('id, ticket_code, created_at')
      .single()

    if (ticketError || !ticket) {
      console.error('Ticket creation failed:', ticketError?.message)
      return NextResponse.json(
        { success: false, message: 'Tiket gagal dibuat.' },
        { status: 500 }
      )
    }

    const { error: briefError } = await supabase.from('briefs').insert({
      ticket_id: ticket.id,
      website_purpose: websitePurpose,
      target_audience:
        typeof body.target_audience === 'string'
          ? body.target_audience.trim() || null
          : null,
      business_description:
        typeof body.business_description === 'string'
          ? body.business_description.trim() || null
          : null,
      preferred_colors:
        typeof body.preferred_colors === 'string'
          ? body.preferred_colors.trim() || null
          : null,
      website_vibe:
        typeof body.website_vibe === 'string'
          ? body.website_vibe.trim() || null
          : null,
      reference_websites:
        typeof body.reference_websites === 'string'
          ? body.reference_websites.trim() || null
          : null,
      selected_features:
        body.selected_features &&
        typeof body.selected_features === 'object' &&
        !Array.isArray(body.selected_features)
          ? body.selected_features
          : {},
      additional_notes:
        typeof body.additional_notes === 'string'
          ? body.additional_notes.trim() || null
          : null,
    })

    if (briefError) {
      console.error('Brief creation failed:', briefError.message)
      await supabase.from('tickets').delete().eq('id', ticket.id)

      return NextResponse.json(
        { success: false, message: 'Brief gagal disimpan.' },
        { status: 500 }
      )
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Brief berhasil disimpan.',
        ticket: {
          ticket_code: ticket.ticket_code,
          created_at: ticket.created_at,
        },
      },
      { status: 201 }
    )
  } catch (error) {
    console.error(
      'Unexpected ticket API error:',
      error instanceof Error ? error.message : 'Unknown error'
    )

    return NextResponse.json(
      { success: false, message: 'Terjadi kesalahan pada server.' },
      { status: 500 }
    )
  }
}
