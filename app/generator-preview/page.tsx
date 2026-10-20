import { readFile } from 'node:fs/promises'
import path from 'node:path'

export const dynamic = 'force-dynamic'

export default async function GeneratorPreviewPage() {
  const outputDir = path.join(process.cwd(), 'generated')

  let html = ''
  let css = ''
  let error = ''

  try {
    ;[html, css] = await Promise.all([
      readFile(path.join(outputDir, 'index.html'), 'utf8'),
      readFile(path.join(outputDir, 'style.css'), 'utf8'),
    ])
  } catch {
    error = 'File hasil generator belum tersedia. Jalankan generator terlebih dahulu.'
  }

  return (
    <main className="min-h-screen bg-[#f5f6ef] text-[#294433]">
      <header className="border-b border-[#e1e8dc] bg-white px-5 py-5 sm:px-8">
        <div className="mx-auto max-w-6xl">
          <p className="text-xs font-bold tracking-[0.25em] text-[#6b896f]">
            WEBRIEF
          </p>
          <h1 className="mt-1 text-2xl font-bold">
            Generator Preview
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            Preview hasil HTML dan CSS dari Generator Engine v1.0.
          </p>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-4 py-6 sm:px-8">
        {error ? (
          <div className="rounded-2xl border border-red-200 bg-white p-6 text-sm text-red-700">
            {error}
          </div>
        ) : (
          <>
            <section className="mb-5 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-[#e1e8dc] bg-white p-4">
              <div>
                <h2 className="font-bold">Budi Renovasi</h2>
                <p className="mt-1 text-xs text-gray-500">
                  Palet: Earth Professional
                </p>
              </div>

              <a
                href="/api/generator-preview"
                className="rounded-xl bg-[#294f38] px-4 py-3 text-sm font-semibold text-white"
              >
                Buka HTML
              </a>
            </section>

            <section className="overflow-hidden rounded-2xl border border-[#dce5dc] bg-white shadow-sm">
              <div className="flex items-center gap-2 border-b border-[#e1e8dc] bg-[#fafbf8] px-4 py-3">
                <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
                <span className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
                <span className="h-2.5 w-2.5 rounded-full bg-green-500" />
                <span className="ml-2 text-xs text-gray-500">
                  Website hasil generator
                </span>
              </div>

              <iframe
                title="Preview website hasil generator"
                srcDoc={html.replace(
                  '<link rel="stylesheet" href="style.css">',
                  `<style>${css.replace(/<\/style/gi, '<\\/style')}</style>`
                )}
                sandbox="allow-forms allow-popups allow-popups-to-escape-sandbox"
                className="h-[75vh] min-h-[600px] w-full border-0 bg-white"
              />
            </section>

            <p className="mt-4 text-xs leading-5 text-gray-500">
              Preview menggunakan HTML dan CSS hasil generator. Formulir kontak
              belum terhubung ke backend pengiriman pesan.
            </p>
          </>
        )}
      </div>
    </main>
  )
}
