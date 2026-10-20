'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import {
  LayoutDashboard,
  Ticket,
  Clock3,
  CheckCircle2,
  Search,
  RefreshCw,
  ArrowUpRight,
  FileText,
} from 'lucide-react'

type TicketItem = {
  id: string
  ticket_code: string
  customer_name: string
  customer_email: string | null
  customer_whatsapp: string | null
  project_type: string
  status: string
  created_at: string
  briefs: {
    website_purpose: string | null
    website_vibe: string | null
  } | null
  analysis_status?: string
}

const analysisStatusLabels: Record<string, string> = {
  not_started: 'Belum Dianalisis',
  in_progress: 'Sedang Dianalisis',
  completed: 'Analisis Selesai',
}

const statusLabels: Record<string, string> = {
  brief_received: 'Brief Masuk',
  analyzing: 'Sedang Dianalisis',
  brief_completed: 'Brief Selesai',
  completed: 'Selesai',
}

export default function AdminDashboard() {
  const [tickets, setTickets] = useState<TicketItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [search, setSearch] = useState('')

  async function loadTickets() {
    setLoading(true)
    setError('')

    try {
      const response = await fetch('/api/admin/tickets', {
        cache: 'no-store',
      })

      const result = await response.json()

      if (!response.ok || !result.success) {
        throw new Error(result.message || 'Gagal mengambil data tiket.')
      }

      setTickets(result.tickets || [])
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

  useEffect(() => {
    void loadTickets()
  }, [])

  const filteredTickets = tickets.filter((ticket) => {
    const keyword = search.toLowerCase()

    return (
      ticket.ticket_code.toLowerCase().includes(keyword) ||
      ticket.customer_name.toLowerCase().includes(keyword)
    )
  })

  const newTickets = tickets.filter(
    (ticket) => ticket.status === 'brief_received'
  ).length

  const completedTickets = tickets.filter(
    (ticket) => ticket.status === 'completed'
  ).length

  const analyzedTickets = tickets.filter(
    (ticket) => ticket.analysis_status === 'completed'
  ).length

  return (
    <main className="min-h-screen bg-[#f5f6ef] text-[#294433]">
      <header className="border-b border-[#e1e8dc] bg-white px-5 py-5 sm:px-8">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4">
          <div>
            <p className="text-xs font-bold tracking-[0.25em] text-[#6b896f]">
              WEBRIEF
            </p>
            <h1 className="mt-1 text-xl font-bold sm:text-2xl">
              Dashboard Admin
            </h1>
          </div>

          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#e8f0e5]">
            <LayoutDashboard size={21} />
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-4 py-7 sm:px-8 sm:py-10">
        <div className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-2xl font-bold">Ringkasan Proyek</h2>
            <p className="mt-2 text-sm text-gray-500">
              Pantau tiket dan kebutuhan website pelanggan.
            </p>
          </div>

          <button
            type="button"
            onClick={() => void loadTickets()}
            disabled={loading}
            className="flex items-center justify-center gap-2 rounded-xl border border-[#dce5d9] bg-white px-4 py-3 text-sm font-semibold transition hover:bg-[#f8faf6] disabled:opacity-60"
          >
            <RefreshCw size={16} />
            Muat ulang
          </button>
        </div>

        <section className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <StatCard
            title="Total Tiket"
            value={tickets.length}
            icon={<Ticket size={21} />}
            description="Semua tiket yang masuk"
          />

          <StatCard
            title="Brief Masuk"
            value={newTickets}
            icon={<Clock3 size={21} />}
            description="Menunggu analisis"
          />

          <StatCard
            title="Selesai"
            value={completedTickets}
            icon={<CheckCircle2 size={21} />}
            description="Proyek yang selesai"
          />

          <StatCard
            title="Analisis Selesai"
            value={analyzedTickets}
            icon={<FileText size={21} />}
            description="Brief yang sudah dianalisis"
          />
        </section>

        <section className="mt-8 overflow-hidden rounded-2xl border border-[#e1e8dc] bg-white shadow-sm">
          <div className="border-b border-[#edf0e9] p-5 sm:p-6">
            <h2 className="text-lg font-bold">Daftar Tiket Pelanggan</h2>
            <p className="mt-1 text-sm text-gray-500">
              Pilih tiket untuk melihat informasi proyek.
            </p>

            <div className="relative mt-5">
              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Cari nama pelanggan atau kode tiket..."
                className="w-full rounded-xl border border-[#dce5dc] py-3 pl-11 pr-4 text-sm outline-none focus:border-[#527b5d]"
              />
            </div>
          </div>

          {loading ? (
            <div className="p-10 text-center text-sm text-gray-500">
              Memuat tiket...
            </div>
          ) : error ? (
            <div className="p-6">
              <p className="rounded-xl bg-red-50 p-4 text-sm text-red-700">
                {error}
              </p>
              <button
                onClick={() => void loadTickets()}
                className="mt-4 rounded-lg bg-[#294f38] px-4 py-2 text-sm font-semibold text-white"
              >
                Coba lagi
              </button>
            </div>
          ) : filteredTickets.length === 0 ? (
            <div className="p-10 text-center">
              <FileText className="mx-auto text-gray-400" size={30} />
              <p className="mt-3 font-semibold">Tiket tidak ditemukan</p>
              <p className="mt-1 text-sm text-gray-500">
                Coba kata kunci lain.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-[#edf0e9]">
              {filteredTickets.map((ticket) => (
                <article key={ticket.id} className="p-5 sm:p-6">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div className="min-w-0">
                      <p className="break-all text-xs font-bold tracking-wide text-[#66846b]">
                        {ticket.ticket_code}
                      </p>

                      <h3 className="mt-2 text-lg font-bold">
                        {ticket.customer_name}
                      </h3>

                      <p className="mt-2 text-sm text-gray-500">
                        {new Date(ticket.created_at).toLocaleString('id-ID', {
                          dateStyle: 'medium',
                          timeStyle: 'short',
                        })}
                      </p>
                    </div>

                    <span className="w-fit rounded-full bg-[#edf3e9] px-3 py-1.5 text-xs font-semibold text-[#426749]">
                      {statusLabels[ticket.status] || ticket.status}
                    </span>
                  </div>

                  <div className="mt-4 rounded-xl bg-[#f7f8f3] p-4">
                    <p className="text-xs font-bold uppercase tracking-wide text-gray-500">
                      Tujuan Website
                    </p>
                    <p className="mt-2 text-sm leading-6 text-[#425448]">
                      {ticket.briefs?.website_purpose ||
                        'Belum ada keterangan.'}
                    </p>

                    {ticket.briefs?.website_vibe && (
                      <p className="mt-3 text-sm text-gray-600">
                        <span className="font-semibold">Vibes:</span>{' '}
                        {ticket.briefs.website_vibe}
                      </p>
                    )}

                    <p className="mt-3 text-sm text-gray-600">
                      <span className="font-semibold">Status Analisis:</span>{' '}
                      <span className={
                        ticket.analysis_status === 'completed'
                          ? 'font-semibold text-green-700'
                          : ticket.analysis_status === 'in_progress'
                            ? 'font-semibold text-blue-700'
                            : 'font-semibold text-amber-700'
                      }>
                        {analysisStatusLabels[ticket.analysis_status || 'not_started']}
                      </span>
                    </p>
                  </div>

                  <div className="mt-4 flex justify-end">
                    <Link
                      href={`/admin/tickets/${ticket.id}`}
                      className="flex items-center gap-2 rounded-lg bg-[#294f38] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#203f2d]"
                    >
                      Detail tiket
                      <ArrowUpRight size={16} />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}

          {!loading && !error && (
            <div className="border-t border-[#edf0e9] px-5 py-4 text-xs text-gray-500">
              Menampilkan {filteredTickets.length} tiket.
            </div>
          )}
        </section>

        <footer className="py-7 text-center text-xs text-gray-500">
          Webrief Admin · Versi 1.0
        </footer>
      </div>
    </main>
  )
}

function StatCard({
  title,
  value,
  icon,
  description,
}: {
  title: string
  value: number
  icon: React.ReactNode
  description: string
}) {
  return (
    <article className="rounded-2xl border border-[#e1e8dc] bg-white p-5 shadow-sm sm:p-6">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#eaf1e6] text-[#47734e]">
          {icon}
        </div>
      </div>

      <p className="mt-4 text-3xl font-bold">{value}</p>
      <p className="mt-1 text-xs text-gray-500">{description}</p>
    </article>
  )
}