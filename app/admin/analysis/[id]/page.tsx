'use client'

import { useCallback, useEffect, useState } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import {
  ArrowLeft,
  Save,
  CheckCircle2,
  LoaderCircle,
} from 'lucide-react'

type Analysis = {
  analysis_summary: string
  website_concept: string
  page_structure: string
  design_direction: string
  copywriting: string
  recommended_features: Record<string, unknown>
  technical_notes: string
  status: 'not_started' | 'in_progress' | 'completed'
}

type Ticket = {
  id: string
  ticket_code: string
  customer_name: string
  project_type: string
  briefs: {
    website_purpose: string | null
    target_audience: string | null
    business_description: string | null
    preferred_colors: string | null
    website_vibe: string | null
    selected_features: Record<string, unknown> | null
  } | null
}

const emptyAnalysis: Analysis = {
  analysis_summary: '',
  website_concept: '',
  page_structure: '',
  design_direction: '',
  copywriting: '',
  recommended_features: {},
  technical_notes: '',
  status: 'not_started',
}

const fields: {
  name: keyof Omit<Analysis, 'recommended_features' | 'status'>
  label: string
  hint: string
}[] = [
  {
    name: 'analysis_summary',
    label: '1. Ringkasan Kebutuhan',
    hint: 'Kesimpulan kebutuhan pelanggan, tujuan bisnis, dan masalah yang ingin diselesaikan.',
  },
  {
    name: 'website_concept',
    label: '2. Konsep Website',
    hint: 'Gagasan utama website, positioning, dan pengalaman yang ingin dibangun.',
  },
  {
    name: 'page_structure',
    label: '3. Struktur Halaman',
    hint: 'Contoh: Beranda, Tentang Kami, Layanan, Galeri, Testimoni, Kontak.',
  },
  {
    name: 'design_direction',
    label: '4. Arahan Desain',
    hint: 'Warna, tipografi, gaya visual, layout, dan referensi desain.',
  },
  {
    name: 'copywriting',
    label: '5. Copywriting',
    hint: 'Headline, subheadline, deskripsi layanan, keunggulan, dan CTA.',
  },
  {
    name: 'technical_notes',
    label: '6. Catatan Teknis',
    hint: 'Arahan responsivitas, navigasi, integrasi, dan kebutuhan teknis lainnya.',
  },
]

export default function AnalysisPage() {
  const params = useParams<{ id: string }>()
  const id = params.id

  const [ticket, setTicket] = useState<Ticket | null>(null)
  const [form, setForm] = useState<Analysis>(emptyAnalysis)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')

  const loadData = useCallback(async () => {
    setLoading(true)
    setError('')

    try {
      const [ticketResponse, analysisResponse] = await Promise.all([
        fetch(`/api/admin/${encodeURIComponent(id)}/tickets`, {
          cache: 'no-store',
        }),
        fetch(`/api/admin/analysis/${encodeURIComponent(id)}`, {
          cache: 'no-store',
        }),
      ])

      const ticketResult = await ticketResponse.json()
      const analysisResult = await analysisResponse.json()

      if (!ticketResponse.ok || !ticketResult.success) {
        throw new Error(
          ticketResult.message || 'Gagal mengambil data tiket.'
        )
      }

      if (!analysisResponse.ok || !analysisResult.success) {
        throw new Error(
          analysisResult.message || 'Gagal mengambil data analisis.'
        )
      }

      setTicket(ticketResult.ticket)

      if (analysisResult.analysis) {
        const saved = analysisResult.analysis

        setForm({
          analysis_summary: saved.analysis_summary ?? '',
          website_concept: saved.website_concept ?? '',
          page_structure: saved.page_structure ?? '',
          design_direction: saved.design_direction ?? '',
          copywriting: saved.copywriting ?? '',
          recommended_features: saved.recommended_features ?? {},
          technical_notes: saved.technical_notes ?? '',
          status: saved.status ?? 'not_started',
        })
      } else {
        setForm(emptyAnalysis)
      }
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Gagal memuat halaman analisis.'
      )
    } finally {
      setLoading(false)
    }
  }, [id])

  useEffect(() => {
    void loadData()
  }, [loadData])

  async function saveAnalysis() {
    setSaving(true)
    setError('')
    setMessage('')

    try {
      const response = await fetch(
        `/api/admin/analysis/${encodeURIComponent(id)}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(form),
        }
      )

      const result = await response.json()

      if (!response.ok || !result.success) {
        throw new Error(
          result.message || 'Gagal menyimpan analisis.'
        )
      }

      setMessage('Analisis berhasil disimpan.')
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Terjadi kesalahan saat menyimpan.'
      )
    } finally {
      setSaving(false)
    }
  }

  function updateField(
    name: keyof Analysis,
    value: string | Record<string, unknown>
  ) {
    setForm((current) => ({
      ...current,
      [name]: value,
    }))
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-[#f5f6ef] p-8 text-center text-[#294433]">
        Memuat ruang kerja analisis...
      </main>
    )
  }

  if (error && !ticket) {
    return (
      <main className="min-h-screen bg-[#f5f6ef] px-5 py-10 text-[#294433]">
        <div className="mx-auto max-w-3xl rounded-2xl bg-white p-6">
          <h1 className="text-xl font-bold">Analisis belum dapat dibuka</h1>
          <p className="mt-3 text-sm text-red-600">{error}</p>
          <button
            onClick={() => void loadData()}
            className="mt-5 rounded-xl bg-[#294f38] px-4 py-3 text-sm font-semibold text-white"
          >
            Coba lagi
          </button>
        </div>
      </main>
    )
  }

  const customerBrief = ticket?.briefs

  return (
    <main className="min-h-screen bg-[#f5f6ef] text-[#294433]">
      <header className="border-b border-[#e1e8dc] bg-white px-5 py-5 sm:px-8">
        <div className="mx-auto max-w-5xl">
          <Link
            href={`/admin/tickets/${id}`}
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#527b5d] hover:underline"
          >
            <ArrowLeft size={17} />
            Kembali ke Detail Tiket
          </Link>

          <p className="mt-5 text-xs font-bold tracking-[0.25em] text-[#6b896f]">
            WEBRIEF
          </p>
          <h1 className="mt-1 text-2xl font-bold sm:text-3xl">
            Analisis Manual
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            Susun konsep website berdasarkan brief pelanggan.
          </p>

          {ticket && (
            <div className="mt-5 rounded-xl bg-[#f5f6ef] p-4">
              <p className="text-xs font-bold text-[#66846b]">
                {ticket.ticket_code}
              </p>
              <p className="mt-1 font-semibold">{ticket.customer_name}</p>
              <p className="mt-1 text-sm text-gray-500">
                {ticket.project_type}
              </p>
            </div>
          )}
        </div>
      </header>

      <div className="mx-auto max-w-5xl space-y-6 px-4 py-7 sm:px-8 sm:py-10">
        <section className="rounded-2xl border border-[#e1e8dc] bg-white p-5 shadow-sm sm:p-7">
          <h2 className="text-lg font-bold">Referensi Brief Pelanggan</h2>
          <p className="mt-1 text-sm text-gray-500">
            Informasi asli untuk membantu analisis. Data ini tidak diubah
            ketika kamu menyusun analisis.
          </p>

          <div className="mt-5 space-y-4">
            <ReferenceField
              label="Tujuan Website"
              value={customerBrief?.website_purpose}
            />
            <ReferenceField
              label="Deskripsi Bisnis"
              value={customerBrief?.business_description}
            />
            <ReferenceField
              label="Target Audiens"
              value={customerBrief?.target_audience}
            />
            <ReferenceField
              label="Warna Pilihan"
              value={customerBrief?.preferred_colors}
            />
            <ReferenceField
              label="Vibes Website"
              value={customerBrief?.website_vibe}
            />
          </div>
        </section>

        <section className="rounded-2xl border border-[#e1e8dc] bg-white p-5 shadow-sm sm:p-7">
          <h2 className="text-lg font-bold">Hasil Analisis</h2>
          <p className="mt-1 text-sm text-gray-500">
            Isi secara manual. Simpan kapan saja dan lanjutkan nanti.
          </p>

          <div className="mt-6 space-y-6">
            {fields.map((field) => (
              <div key={field.name}>
                <label
                  htmlFor={field.name}
                  className="mb-2 block text-sm font-bold"
                >
                  {field.label}
                </label>
                <p className="mb-2 text-xs leading-5 text-gray-500">
                  {field.hint}
                </p>
                <textarea
                  id={field.name}
                  value={form[field.name] as string}
                  onChange={(event) =>
                    updateField(field.name, event.target.value)
                  }
                  rows={4}
                  placeholder="Tulis hasil analisis di sini..."
                  className="w-full rounded-xl border border-[#dce5dc] bg-white px-4 py-3 text-sm leading-6 outline-none transition focus:border-[#527b5d] focus:ring-2 focus:ring-[#527b5d]/10"
                />
              </div>
            ))}

            <div>
              <label className="mb-2 block text-sm font-bold">
                7. Rekomendasi Fitur
              </label>
              <p className="mb-3 text-xs leading-5 text-gray-500">
                Catat fitur yang direkomendasikan untuk proyek ini. Setiap
                baris menggunakan format: nama fitur: alasan.
              </p>
              <textarea
                value={Object.entries(form.recommended_features)
                  .map(([name, value]) => `${name}: ${String(value)}`)
                  .join('\n')}
                onChange={(event) => {
                  const features: Record<string, unknown> = {}

                  event.target.value.split('\n').forEach((line) => {
                    const separator = line.indexOf(':')

                    if (separator > 0) {
                      const name = line.slice(0, separator).trim()
                      const value = line.slice(separator + 1).trim()

                      if (name) features[name] = value
                    }
                  })

                  updateField('recommended_features', features)
                }}
                rows={5}
                placeholder={'Tombol WhatsApp: Memudahkan calon pelanggan menghubungi bisnis\nHalaman layanan: Menjelaskan jasa renovasi'}
                className="w-full rounded-xl border border-[#dce5dc] px-4 py-3 text-sm leading-6 outline-none focus:border-[#527b5d] focus:ring-2 focus:ring-[#527b5d]/10"
              />
            </div>

            <div>
              <label
                htmlFor="status"
                className="mb-2 block text-sm font-bold"
              >
                Status Analisis
              </label>
              <select
                id="status"
                value={form.status}
                onChange={(event) =>
                  updateField('status', event.target.value)
                }
                className="w-full rounded-xl border border-[#dce5dc] bg-white px-4 py-3 text-sm outline-none focus:border-[#527b5d]"
              >
                <option value="not_started">Belum Dianalisis</option>
                <option value="in_progress">Sedang Dianalisis</option>
                <option value="completed">Analisis Selesai</option>
              </select>
            </div>
          </div>

          {error && (
            <p className="mt-5 rounded-xl bg-red-50 p-4 text-sm text-red-700">
              {error}
            </p>
          )}

          {message && (
            <p
              role="status"
              className="mt-5 flex items-center gap-2 rounded-xl bg-[#edf3e9] p-4 text-sm font-semibold text-[#426749]"
            >
              <CheckCircle2 size={18} />
              {message}
            </p>
          )}

          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={() => void saveAnalysis()}
              disabled={saving}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#294f38] px-5 py-3.5 text-sm font-bold text-white transition hover:bg-[#203f2d] disabled:opacity-60"
            >
              {saving ? (
                <LoaderCircle size={18} className="animate-spin" />
              ) : (
                <Save size={18} />
              )}
              {saving ? 'Menyimpan...' : 'Simpan Analisis'}
            </button>

            <Link
              href={`/admin/tickets/${id}`}
              className="inline-flex items-center justify-center rounded-xl border border-[#dce5dc] px-5 py-3.5 text-sm font-semibold"
            >
              Kembali ke Detail Tiket
            </Link>
          </div>
        </section>

        <footer className="py-4 text-center text-xs text-gray-500">
          Webrief Admin · Analisis Manual
        </footer>
      </div>
    </main>
  )
}

function ReferenceField({
  label,
  value,
}: {
  label: string
  value: string | null | undefined
}) {
  return (
    <div className="border-b border-[#edf0e9] pb-3 last:border-0">
      <p className="text-xs font-bold uppercase tracking-wide text-gray-500">
        {label}
      </p>
      <p className="mt-2 whitespace-pre-wrap break-words text-sm leading-6">
        {value?.trim() || 'Belum diisi'}
      </p>
    </div>
  )
}
