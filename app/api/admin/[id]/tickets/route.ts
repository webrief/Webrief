import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { createServiceRoleClient } from '@/lib/supabase/service'

type RouteContext = {
  params: Promise<{ id: string }>
}

export async function GET(
  _request: Request,
  context: RouteContext
) {
  try {
    // 1. Periksa sesi login
    const supabase = await createClient()

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    // 2. Verifikasi email admin
    const adminEmail = process.env.ADMIN_EMAIL
      ?.trim()
      .toLowerCase()

    const userEmail = user?.email
      ?.trim()
      .toLowerCase()

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

    // 3. Ambil ID tiket dari URL
    const { id } = await context.params

    // 4. Validasi format UUID
    const uuidPattern =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i

    if (!uuidPattern.test(id)) {
      return NextResponse.json(
        { success: false, message: 'ID tiket tidak valid.' },
        { status: 400 }
      )
    }

    // 5. Ambil tiket beserta seluruh data brief
    const serviceClient = createServiceRoleClient()

    const { data, error } = await serviceClient
      .from('tickets')
      .select('*, briefs (*)')
      .eq('id', id)
      .maybeSingle()

    if (error) {
      console.error('Ticket detail query error:', error)

      return NextResponse.json(
        {
          success: false,
          message: 'Gagal mengambil detail tiket.',
        },
        { status: 500 }
      )
    }

    if (!data) {
      return NextResponse.json(
        {
          success: false,
          message: 'Tiket tidak ditemukan.',
        },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      ticket: data,
    })
  } catch (error) {
    console.error('Ticket detail API error:', error)

    return NextResponse.json(
      {
        success: false,
        message: 'Terjadi kesalahan pada server.',
      },
      { status: 500 }
    )
  }
}
