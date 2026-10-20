import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET() {
  try {
    const supabase = await createClient()

    const { error } = await supabase
      .from('test_connection')
      .select('*')
      .limit(1)

    if (error && error.code !== '42P01' && error.code !== 'PGRST205') {
      return NextResponse.json({
        connected: false,
        message: error.message,
      }, { status: 500 })
    }

    return NextResponse.json({
      connected: true,
      message: error
        ? 'Supabase terhubung, tetapi tabel pengujian belum dibuat.'
        : 'Supabase terhubung.',
    })
  } catch {
    return NextResponse.json({
      connected: false,
      message: 'Periksa konfigurasi Supabase.',
    }, { status: 500 })
  }
}