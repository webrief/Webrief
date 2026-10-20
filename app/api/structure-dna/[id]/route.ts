import { NextResponse } from 'next/server'
import { generateWebsite } from '@/lib/generator'
import { STRUCTURE_DNA } from '@/lib/generator/dna/structures'
import type { WebsiteBrief } from '@/lib/generator/types'

export const runtime = 'nodejs'

const baseBrief: WebsiteBrief = {
  businessName: 'Budi Renovasi',
  businessDescription:
    'Jasa renovasi rumah yang mengutamakan kualitas dan kenyamanan keluarga.',
  headline: 'Wujudkan Rumah Impian Anda',
  subheadline:
    'Kami membantu renovasi rumah menjadi lebih nyaman, indah, dan sesuai kebutuhan.',
  services: [
    'Renovasi Rumah',
    'Desain Interior',
    'Perbaikan dan Pemeliharaan',
  ],
  whatsapp: '6281234567890',
  email: 'budi@example.com',
  paletteId: 'earth-professional',
  features: {
    services: true,
    contactForm: true,
    whatsappButton: true,
  },
}

export async function GET(
  _request: Request,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params
  const structure = STRUCTURE_DNA.find((item) => item.id === id)

  if (!structure) {
    return NextResponse.json(
      { success: false, message: 'Structure DNA tidak ditemukan.' },
      { status: 404 },
    )
  }

  const website = generateWebsite({
    ...baseBrief,
    structureId: structure.id,
  })

  const html = website.html.replace(
    '<link rel="stylesheet" href="style.css">',
    `<style>${website.css.replace(/<\/style/gi, '<\\/style')}</style>`,
  )

  return new NextResponse(html, {
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'no-store',
    },
  })
}
