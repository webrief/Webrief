import { NextResponse } from 'next/server'
import { COMPONENT_DNA } from '@/lib/generator/dna/components'
import { generateWebsite } from '@/lib/generator'

export const dynamic = 'force-dynamic'

const demoBrief = {
  businessName: 'Ruang Usaha',
  businessDescription: 'Membantu bisnis berkembang melalui solusi yang tepat dan terpercaya.',
  headline: 'Kembangkan Bisnis Anda Bersama Kami',
  subheadline: 'Solusi profesional yang dirancang untuk mendukung kebutuhan bisnis Anda.',
  services: [
    'Konsultasi Bisnis',
    'Solusi Digital',
    'Pendampingan Profesional',
  ],
  whatsapp: '6281234567890',
  email: 'halo@example.com',
  paletteId: 'earth-professional',
  vibe: 'modern-professional',
  structureId: 'classic-business',
  features: {
    services: true,
    contactForm: true,
    whatsappButton: true,
  },
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params
  const component = COMPONENT_DNA.find((item) => item.id === id)

  if (!component) {
    return NextResponse.json(
      { error: 'Component DNA tidak ditemukan', available: COMPONENT_DNA.map((item) => item.id) },
      { status: 404 },
    )
  }

  const result = generateWebsite({
    ...demoBrief,
    componentDNAId: component.id,
  })

  return new Response(
    result.html.replace(
      '</head>',
      `<style>${result.css.replace(/<\/style/gi, '<\\/style')}</style></head>`,
    ),
    {
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'no-store',
      },
    },
  )
}
