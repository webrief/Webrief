import { NextResponse } from 'next/server'
import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { VISUAL_DNA } from '@/lib/generator/dna/visuals'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function GET(
  _request: Request,
  context: { params: Promise<{ vibe: string }> },
) {
  const { vibe } = await context.params
  const visual = VISUAL_DNA.find((item) => item.id === vibe)

  if (!visual) {
    return new NextResponse('Visual DNA tidak ditemukan.', { status: 404 })
  }

  try {
    const filePath = path.join(
      process.cwd(),
      'generated',
      'visual-dna',
      `${visual.id}.html`,
    )

    const html = await readFile(filePath, 'utf8')

    return new NextResponse(html, {
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'no-store',
      },
    })
  } catch {
    return new NextResponse(
      'File hasil generator belum tersedia. Jalankan skrip test-visual-dna terlebih dahulu.',
      { status: 404 },
    )
  }
}
