'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import {
  ArrowLeft,
  Copy,
  UserRound,
  Target,
  Palette,
  Settings2,
  FileText,
  RefreshCw,
} from 'lucide-react'

type TicketDetail = {
  id: string
  ticket_code: string
  customer_name: string
  customer_email: string | null
  customer_whatsapp: string | null
  project_type: string
  status: string
  admin_notes: string | null
  created_at: string
  briefs: {
    website_purpose: string | null
    target_audience: string | null
    business_description: string | null
    preferred_colors: string | null
    website_vibe: string | null
    reference_websites: string | null
    selected_features: Record<string, unknown> | null
    additional_notes: string | null
    brief_version: string | null
  } | null
}

const statusLabels: Record<string, string> = {
  briefing: 'Menunggu Brief',
  brief_received: 'Brief Masuk',
  processing: 'Sedang Diproses',
  completed: 'Selesai',
  cancelled: 'Dibatalkan',
}

export default function TicketDetailPage() {
  const params = useParams<{ id: string }>()
  const id = params.id

  const [ticket, setTicket] = useState<TicketDetail | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [copyMessage, setCopyMessage] = useState('')

  async function loadTicket() {
    setLoading(true)
    setError('')

    try {
      const response = await fetch(
        `/api/admin/${encodeURIComponent(id)}/tickets`,
        { cache: 'no-store' }
      )

      const result = await response.json()

      if (!response.ok || !result.success) {
        throw new Error(
          result.message || 'Gagal mengambil detail tiket.'
        )
      }

      setTicket(result.ticket)
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Terjadi kesalahan saat memuat tiket.'
      )
    } finally {
      setLoading(false)
    }
  }


  async function copyBriefSummary() {
    if (!ticket) return

    const brief = ticket.briefs
    const features = brief?.selected_features ?? {}

    const featureLines = Object.entries(features).map(([name, value]) => {
      const displayValue =
        typeof value === 'boolean'
          ? value ? 'Aktif' : 'Nonaktif'
          : typeof value === 'object'
            ? JSON.stringify(value)
            : String(value)

      return `- ${name.replace(/_/g, ' ')}: ${displayValue}`
    })

    const summary = [
      'WEBRIEF — RINGKASAN BRIEF PELANGGAN',
      '',
      `Kode Tiket: ${ticket.ticket_code}`,
      `Status: ${statusLabels[ticket.status] || ticket.status}`,
      `Jenis Proyek: ${ticket.project_type || 'Belum ditentukan'}`,
      '',
      'DATA PELANGGAN',
      `Nama: ${ticket.customer_name}`,
      `Email: ${ticket.customer_email || 'Belum diisi'}`,
      `WhatsApp: ${ticket.customer_whatsapp || 'Belum diisi'}`,
      '',
      'TUJUAN DAN BISNIS',
      `Tujuan Website: ${brief?.website_purpose || 'Belum diisi'}`,
      `Deskripsi Bisnis: ${brief?.business_description || 'Belum diisi'}`,
      `Target Audiens: ${brief?.target_audience || 'Belum diisi'}`,
      '',
      'KONSEP DESAIN',
      `Warna Pilihan: ${brief?.preferred_colors || 'Belum diisi'}`,
      `Vibes Website: ${brief?.website_vibe || 'Belum diisi'}`,
      `Referensi Website: ${brief?.reference_websites || 'Belum diisi'}`,
      '',
      'FITUR WEBSITE',
      ...(featureLines.length ? featureLines : ['Belum ada fitur yang dicatat.']),
      '',
      'CATATAN TAMBAHAN',
      brief?.additional_notes || 'Belum diisi',
      '',
      'CATATAN ADMIN',
      ticket.admin_notes || 'Belum ada catatan admin.',
    ].join('\n')

    try {
      await navigator.clipboard.writeText(summary)
      setCopyMessage('Ringkasan berhasil disalin!')
    } catch {
      setCopyMessage('Gagal menyalin. Periksa izin clipboard browser.')
    }

    window.setTimeout(() => setCopyMessage(''), 3000)
  }

  useEffect(() => {
    void loadTicket()
  }, [id])

  if (loading) {
    return (
      <main className="min-h-screen bg-[#f5f6ef] p-8 text-center text-[#294433]">
        Memuat detail tiket...
      </main>
    )
  }

  if (error || !ticket) {
    return (
      <main className="min-h-screen bg-[#f5f6ef] px-5 py-10 text-[#294433]">
        <div className="mx-auto max-w-3xl rounded-2xl border border-[#e1e8dc] bg-white p-6">
          <h1 className="text-xl font-bold">Detail tiket belum tersedia</h1>
          <p className="mt-3 text-sm text-red-600">
            {error || 'Tiket tidak ditemukan.'}
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <button
              onClick={() => void loadTicket()}
              className="flex items-center gap-2 rounded-xl bg-[#294f38] px-4 py-3 text-sm font-semibold text-white"
            >
              <RefreshCw size={16} />
              Coba lagi
            </button>
            <Link
              href="/admin"
              className="rounded-xl border border-[#dce5dc] px-4 py-3 text-sm font-semibold"
            >
              Kembali ke dashboard
            </Link>
          </div>
        </div>
      </main>
    )
  }

  const brief = ticket.briefs
  const features = brief?.selected_features ?? {}

  return (
    <main className="min-h-screen bg-[#f5f6ef] text-[#294433]">
      <header className="border-b border-[#e1e8dc] bg-white px-5 py-5 sm:px-8">
        <div className="mx-auto max-w-4xl">
          <Link
            href="/admin"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#527b5d] hover:underline"
          >
            <ArrowLeft size={17} />
            Kembali ke dashboard
          </Link>
          <p className="mt-5 text-xs font-bold tracking-[0.25em] text-[#6b896f]">
            WEBRIEF
          </p>
          <h1 className="mt-1 text-2xl font-bold sm:text-3xl">
            Detail Tiket
          </h1>
          <p className="mt-2 break-all text-sm text-gray-500">
            {ticket.ticket_code}
          </p>

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => void copyBriefSummary()}
              className="inline-flex items-center gap-2 rounded-xl bg-[#294f38] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#203f2d]"
            >
              <Copy size={17} />
              Salin Ringkasan Brief
            </button>

            <Link
              href={`/admin/analysis/${ticket.id}`}
              className="inline-flex items-center gap-2 rounded-xl border border-[#dce5dc] bg-white px-4 py-3 text-sm font-semibold text-[#294f38] transition hover:bg-[#f5f6ef]"
            >
              <FileText size={17} />
              Analisis Brief
            </Link>

            {copyMessage && (
              <p role="status" className="text-sm font-medium text-[#47734e]">
                {copyMessage}
              </p>
            )}
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-4xl space-y-5 px-4 py-7 sm:px-8 sm:py-10">
        <section className="rounded-2xl border border-[#e1e8dc] bg-white p-5 shadow-sm sm:p-7">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="text-sm text-gray-500">Status tiket</p>
              <span className="mt-2 inline-block rounded-full bg-[#edf3e9] px-3 py-1.5 text-sm font-semibold text-[#426749]">
                {statusLabels[ticket.status] || ticket.status}
              </span>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Jenis proyek</p>
              <p className="mt-1 font-semibold">
                {ticket.project_type || 'Belum ditentukan'}
              </p>
            </div>
          </div>
          <p className="mt-5 text-sm text-gray-500">
            Dibuat:{' '}
            {new Date(ticket.created_at).toLocaleString('id-ID', {
              dateStyle: 'medium',
              timeStyle: 'short',
            })}
          </p>
        </section>

        <DetailSection
          title="Data Pelanggan"
          icon={<UserRound size={20} />}
        >
          <Field label="Nama" value={ticket.customer_name} />
          <Field label="Email" value={ticket.customer_email} />
          <Field label="WhatsApp" value={ticket.customer_whatsapp} />
        </DetailSection>

        <DetailSection
          title="Tujuan dan Bisnis"
          icon={<Target size={20} />}
        >
          <Field label="Tujuan website" value={brief?.website_purpose} />
          <Field label="Deskripsi bisnis" value={brief?.business_description} />
          <Field label="Target audiens" value={brief?.target_audience} />
        </DetailSection>

        <DetailSection
          title="Konsep Desain"
          icon={<Palette size={20} />}
        >
          <Field label="Warna pilihan" value={brief?.preferred_colors} />
          <Field label="Vibes website" value={brief?.website_vibe} />
          <Field label="Referensi website" value={brief?.reference_websites} />
        </DetailSection>

        <DetailSection
          title="Fitur Website"
          icon={<Settings2 size={20} />}
        >
          {Object.keys(features).length === 0 ? (
            <p className="text-sm text-gray-500">
              Belum ada fitur yang dicatat.
            </p>
          ) : (
            <div className="space-y-3">
              {Object.entries(features).map(([name, value]) => (
                <div
                  key={name}
                  className="flex items-start justify-between gap-4 border-b border-[#edf0e9] pb-3 last:border-0"
                >
                  <span className="break-words text-sm">
                    {name.replace(/_/g, ' ')}
                  </span>
                  <span className="shrink-0 text-sm font-semibold">
                    {typeof value === 'boolean'
                      ? value
                        ? 'Aktif'
                        : 'Nonaktif'
                      : typeof value === 'object'
                        ? JSON.stringify(value)
                        : String(value)}
                  </span>
                </div>
              ))}
            </div>
          )}
        </DetailSection>

        <DetailSection
          title="Catatan dan Informasi Tambahan"
          icon={<FileText size={20} />}
        >
          <Field
            label="Catatan pelanggan"
            value={brief?.additional_notes}
          />
          <Field
            label="Versi brief"
            value={brief?.brief_version}
          />
          <Field label="Catatan admin" value={ticket.admin_notes} />
        </DetailSection>

        <footer className="py-4 text-center text-xs text-gray-500">
          Webrief Admin · Detail Tiket
        </footer>
      </div>
    </main>
  )
}

function DetailSection({
  title,
  icon,
  children,
}: {
  title: string
  icon: React.ReactNode
  children: React.ReactNode
}) {
  return (
    <section className="rounded-2xl border border-[#e1e8dc] bg-white p-5 shadow-sm sm:p-7">
      <div className="mb-5 flex items-center gap-3 border-b border-[#edf0e9] pb-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#eaf1e6] text-[#47734e]">
          {icon}
        </div>
        <h2 className="text-lg font-bold">{title}</h2>
      </div>
      <div className="space-y-5">{children}</div>
    </section>
  )
}

function Field({
  label,
  value,
}: {
  label: string
  value: unknown
}) {
  const displayValue =
    typeof value === 'string'
      ? value.trim() || 'Belum diisi'
      : value === null || value === undefined
        ? 'Belum diisi'
        : typeof value === 'object'
          ? JSON.stringify(value)
          : String(value)

  return (
    <div>
      <p className="text-xs font-bold uppercase tracking-wide text-gray-500">
        {label}
      </p>
      <p className="mt-2 whitespace-pre-wrap break-words text-sm leading-6 text-[#425448]">
        {displayValue}
      </p>
    </div>
  )
}
