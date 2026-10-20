import { NextResponse } from 'next/server'
import { readFile } from 'node:fs/promises'
import path from 'node:path'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const outputDir = path.join(process.cwd(), 'generated')

    const [html, css] = await Promise.all([
      readFile(path.join(outputDir, 'index.html'), 'utf8'),
      readFile(path.join(outputDir, 'style.css'), 'utf8'),
    ])

    const inlineCss = css.replace(/<\/style/gi, '<\\/style')

    const standaloneHtml = html.replace(
      /<link\b[^>]*href=["']style\.css["'][^>]*>/i,
      `<style>${inlineCss}</style>`
    )

    return new NextResponse(standaloneHtml, {
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'no-store',
        'Content-Disposition': 'inline; filename="index.html"',
      },
    })
  } catch (error) {
    console.error('Generator preview error:', error)

    return NextResponse.json(
      { success: false, message: 'File HTML atau CSS hasil generator belum tersedia.' },
      { status: 404 }
    )
  }
}
