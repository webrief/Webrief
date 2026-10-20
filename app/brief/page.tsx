'use client'

import { useState } from 'react'

type BriefForm = {
  customer_name: string
  customer_email: string
  customer_whatsapp: string
  website_purpose: string
  business_description: string
  target_audience: string
  preferred_colors: string
  website_vibe: string
  reference_websites: string
  additional_notes: string
  selected_features: Record<string, boolean>
  selected_sections: Record<string, boolean>
}

const initialForm: BriefForm = {
  customer_name: '',
  customer_email: '',
  customer_whatsapp: '',
  website_purpose: '',
  business_description: '',
  target_audience: '',
  preferred_colors: '',
  website_vibe: '',
  reference_websites: '',
  additional_notes: '',
  selected_features: {
    whatsapp_button: true,
    product_page: false,
    contact_form: true,
    gallery: false,
    testimonials: false,
    blog: false,
    google_maps: false,
  },
  selected_sections: {
    navbar: true,
    hero: true,
    about: true,
    services: true,
    advantages: true,
    testimonials: false,
    process: false,
    pricing: false,
    faq: false,
    contact: true,
    footer: true,
  },
}

const purposes = [
  'Biar lebih dikenal',
  'Mendapatkan pelanggan baru',
  'Menampilkan produk / layanan',
  'Menerima pemesanan',
  'Membangun citra profesional',
  'Lainnya',
]

const visualOptions = [
  {
    id: 'minimalis',
    name: 'Minimalis',
    description: 'Bersih, sederhana, dan fokus pada konten.',
    image: '/image/vminimalis.png',
  },
  {
    id: 'modern',
    name: 'Modern',
    description: 'Terkini, profesional, dan berkesan modern.',
    image: '/image/vmodern.png',
  },
  {
    id: 'elegan',
    name: 'Elegan',
    description: 'Mewah, berkelas, dan eksklusif.',
    image: '/image/velegan.png',
  },
  {
    id: 'hangat',
    name: 'Hangat',
    description: 'Ramah, nyaman, dan bersahabat.',
    image: '/image/vhangat.png',
  },
  {
    id: 'berani',
    name: 'Berani',
    description: 'Unik, berkarakter, dan standout.',
    image: '/image/vberani.png',
  },
  {
    id: 'bebas',
    name: 'Bebas',
    description: 'Fleksibel, kreatif, dan sesuai rekomendasi.',
    image: '/image/vbebas.png',
  },
]

const colorOptions = [
  {
    id: 'natural-green',
    name: 'Natural Green',
    description: 'Alami, menenangkan, dan harmonis.',
    image: '/image/cnatural-green.png',
    colors: ['#244D32', '#58754B', '#EBD5AD', '#E7E9D8'],
  },
  {
    id: 'warm-earth',
    name: 'Warm Earth',
    description: 'Hangat, natural, dan bersahaja.',
    image: '/image/cwarm-earth.png',
    colors: ['#8E431F', '#C76E32', '#E9AD78', '#F1E2D2'],
  },
  {
    id: 'modern-blue',
    name: 'Modern Blue',
    description: 'Profesional, terpercaya, dan modern.',
    image: '/image/cmodern-blue.png',
    colors: ['#123A63', '#3574A6', '#91B9D7', '#D8E3EB'],
  },
  {
    id: 'elegant-dark',
    name: 'Elegant Dark',
    description: 'Mewah, tegas, dan berkelas.',
    image: '/image/celegant-dark.png',
    colors: ['#080808', '#303030', '#645A52', '#C1B1A2'],
  },
  {
    id: 'soft-pastel',
    name: 'Soft Pastel',
    description: 'Lembut, feminin, dan menenangkan.',
    image: '/image/csoft-pastel.png',
    colors: ['#C87873', '#E7A09A', '#F2C6BB', '#F8E9E2'],
  },
  {
    id: 'clean-minimal',
    name: 'Clean Minimal',
    description: 'Bersih, simpel, dan serbaguna.',
    image: '/image/cclean-minimal.png',
    colors: ['#303437', '#858585', '#D0CDC7', '#F2F0EC'],
  },
  {
    id: 'sunshine',
    name: 'Sunshine',
    description: 'Cerah, optimistis, dan penuh energi.',
    image: '/image/csunshine.png',
    colors: ['#F28C28', '#FFC928', '#FFE8A3', '#FFF8E8'],
  },
  {
    id: 'fire',
    name: 'Fire',
    description: 'Berani, dinamis, dan kuat.',
    image: '/image/cfire.png',
    colors: ['#D62828', '#EF4444', '#2563EB', '#FFFFFF'],
  },
    
]

const vibeOptions = [
  {
    id: 'profesional',
    name: 'Profesional',
    description: 'Terpercaya dan meyakinkan.',
    symbol: '▤',
  },
  {
    id: 'ramah',
    name: 'Ramah',
    description: 'Akrab dan mudah didekati.',
    symbol: '♡',
  },
  {
    id: 'premium',
    name: 'Premium',
    description: 'Eksklusif dan berkelas.',
    symbol: '✦',
  },
  {
    id: 'natural',
    name: 'Natural',
    description: 'Tenang dan dekat dengan alam.',
    symbol: '❋',
  },
  {
    id: 'kreatif',
    name: 'Kreatif',
    description: 'Unik dan penuh karakter.',
    symbol: '✳',
  },
  {
    id: 'minimal',
    name: 'Sederhana',
    description: 'Rapi dan tidak berlebihan.',
    symbol: '◫',
  },
]

const websiteSections = [
  { key: 'navbar', label: 'Navbar / Menu', desc: 'Logo dan navigasi utama website.' },
  { key: 'hero', label: 'Hero / Pembuka', desc: 'Bagian pertama yang menarik perhatian pengunjung.' },
  { key: 'about', label: 'Tentang Kami', desc: 'Perkenalan bisnis atau brand Anda.' },
  { key: 'services', label: 'Layanan / Produk', desc: 'Penjelasan produk atau layanan yang ditawarkan.' },
  { key: 'advantages', label: 'Keunggulan', desc: 'Alasan pelanggan memilih bisnis Anda.' },
  { key: 'testimonials', label: 'Testimoni', desc: 'Ulasan dan pengalaman pelanggan.' },
  { key: 'process', label: 'Proses Kerja', desc: 'Tahapan pemesanan atau cara kerja layanan.' },
  { key: 'pricing', label: 'Harga / Paket', desc: 'Informasi harga atau pilihan paket.' },
  { key: 'faq', label: 'FAQ', desc: 'Jawaban untuk pertanyaan yang sering diajukan.' },
  { key: 'contact', label: 'Kontak', desc: 'Informasi dan cara menghubungi bisnis Anda.' },
  { key: 'footer', label: 'Footer', desc: 'Bagian penutup berisi informasi pendukung.' },
]

const steps = [
  'Bisnis',
  'Visual',
  'Struktur',
  'Fitur',
  'Kontak',
  'Review',
]

export default function BriefPage() {
  const [form, setForm] = useState<BriefForm>(initialForm)
  const [currentStep, setCurrentStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [ticketCode, setTicketCode] = useState('')

  function updateField<K extends keyof BriefForm>(
    key: K,
    value: BriefForm[K]
  ) {
    setForm((previous) => ({
      ...previous,
      [key]: value,
    }))
  }

  function goToStep(step: number) {
    setCurrentStep(step)
    setError('')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError('')
    setLoading(true)

    try {
      const response = await fetch('/api/tickets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      })

      const result = await response.json()

      if (!response.ok || !result.success) {
        setError(result.message || 'Brief belum berhasil dikirim.')
        return
      }

      setTicketCode(result.ticket.ticket_code)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } catch {
      setError('Tidak dapat terhubung ke server. Silakan coba kembali.')
    } finally {
      setLoading(false)
    }
  }

  const inputClass =
    'mt-2 w-full rounded-xl border border-[#e1e5df] bg-white px-4 py-3.5 text-sm text-[#243c32] outline-none transition placeholder:text-gray-400 focus:border-[#477a5c] focus:ring-2 focus:ring-[#477a5c]/10'

  const labelClass = 'text-sm font-semibold text-[#294433]'

  const cardClass =
    'relative overflow-hidden rounded-2xl border-2 bg-white text-left transition duration-200'

  if (ticketCode) {
    return (
      <main className="min-h-screen bg-[#f8f8f3] px-4 py-12 text-[#294433]">
        <section className="mx-auto max-w-lg rounded-3xl border border-[#e0e7db] bg-white p-7 text-center shadow-sm sm:p-10">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#e8f1e5] text-3xl text-[#315f43]">
            ✓
          </div>

          <p className="mt-5 text-xs font-bold tracking-[0.25em] text-[#64846a]">
            WEBRIEF
          </p>

          <h1 className="mt-4 text-2xl font-bold">
            Brief berhasil dikirim!
          </h1>

          <p className="mt-3 text-sm leading-6 text-gray-600">
            Terima kasih. Simpan kode tiket ini sebagai referensi proyek Anda.
          </p>

          <div className="mt-7 rounded-2xl border border-dashed border-[#9db49c] bg-[#f5f8f1] p-5">
            <p className="text-xs text-gray-500">KODE TIKET ANDA</p>

            <p className="mt-2 break-all text-xl font-bold tracking-wide">
              {ticketCode}
            </p>

            <button
              type="button"
              onClick={() => {
                navigator.clipboard?.writeText(ticketCode)
              }}
              className="mt-4 rounded-lg bg-[#294f38] px-4 py-2 text-sm font-semibold text-white"
            >
              Salin kode tiket
            </button>
          </div>

          <p className="mt-6 text-xs leading-5 text-gray-500">
            Tim Webrief akan menggunakan informasi ini untuk memahami
            kebutuhan website Anda.
          </p>
        </section>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-[#f8f8f3] text-[#20372f]">
      {/* HEADER */}

      <header className="sticky top-0 z-20 border-b border-[#e8e9e1] bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-4 py-4 sm:px-6">
          <a
            href="/"
            className="flex items-center gap-2 text-sm font-bold text-[#20372f]"
          >
            <span className="text-xl text-[#26704b]">◈</span>
            <span className="text-lg tracking-tight">Webrief</span>
          </a>

          <div className="rounded-full bg-[#edf4e9] px-4 py-2 text-xs font-bold tracking-wide text-[#42634a]">
            BRIEF WEBSITE
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-5xl px-4 pb-12 pt-6 sm:px-6 sm:pt-9">
        {/* PAGING */}

        <nav
          aria-label="Tahapan brief"
          className="mx-auto mb-9 flex max-w-2xl items-start"
        >
          {steps.map((step, index) => {
            const number = index + 1
            const completed = number < currentStep
            const active = number === currentStep
            const available = number <= currentStep

            return (
              <div
                key={step}
                className="flex flex-1 flex-col items-center"
              >
                <div className="flex w-full items-center">
                  {index > 0 && (
                    <div
                      className={`h-0.5 flex-1 ${
                        completed || active
                          ? 'bg-[#477a5c]'
                          : 'bg-[#e1e4dd]'
                      }`}
                    />
                  )}

                  <button
                    type="button"
                    disabled={!available}
                    onClick={() => {
                      if (available) goToStep(number)
                    }}
                    aria-current={active ? 'step' : undefined}
                    aria-label={`Tahap ${number}: ${step}`}
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-bold transition sm:h-11 sm:w-11 ${
                      active
                        ? 'bg-[#176345] text-white ring-4 ring-[#e3eee4]'
                        : completed
                          ? 'bg-[#dcebdd] text-[#245a3b]'
                          : 'bg-[#eceee8] text-[#8b9188]'
                    } ${available ? 'cursor-pointer' : 'cursor-not-allowed'}`}
                  >
                    {completed ? '✓' : number}
                  </button>

                  {index < steps.length - 1 && (
                    <div
                      className={`h-0.5 flex-1 ${
                        completed ? 'bg-[#477a5c]' : 'bg-[#e1e4dd]'
                      }`}
                    />
                  )}
                </div>

                <span
                  className={`mt-2 text-[10px] font-semibold sm:text-xs ${
                    active ? 'text-[#176345]' : 'text-gray-400'
                  }`}
                >
                  {step}
                </span>
              </div>
            )
          })}
        </nav>

        <form onSubmit={handleSubmit}>
          {/* =========================================
              TAHAP 1 — CERITAKAN BISNIS ANDA
          ========================================= */}

          {currentStep === 1 && (
            <div className="mx-auto max-w-3xl">
              <section className="overflow-hidden rounded-3xl border border-[#e5e6dd] bg-white shadow-sm">
                {/* HERO */}

                <div className="relative overflow-hidden bg-[#f1f0e7]">
                  <img
                    src="/image/hero-brief.png"
                    alt="Suasana meja kerja yang hangat dan minimalis"
                    className="h-52 w-full object-cover sm:h-72"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />

                  <div className="absolute bottom-4 left-5 text-white sm:bottom-6 sm:left-8">
                    <p className="text-xs font-bold tracking-[0.2em]">
                      TAHAP 01
                    </p>

                    <h1 className="mt-2 text-3xl font-bold sm:text-4xl">
                      Ceritakan bisnis Anda
                    </h1>
                  </div>
                </div>

                <div className="p-5 sm:p-8">
                  <p className="max-w-xl text-sm leading-6 text-gray-600 sm:text-base">
                    Kami ingin mengenal bisnis Anda lebih dulu. Cerita Anda
                    akan membantu kami merancang website yang tepat.
                  </p>

                  <div className="mt-7 space-y-6">
                    <label className="block">
                      <span className={labelClass}>
                        Nama bisnis atau brand Anda *
                      </span>

                      <input
                        className={inputClass}
                        required
                        value={form.customer_name}
                        onChange={(event) =>
                          updateField('customer_name', event.target.value)
                        }
                        placeholder="Contoh: ABC Furniture"
                      />
                    </label>

                    <label className="block">
                      <span className={labelClass}>
                        Apa yang Anda tawarkan? *
                      </span>

                      <textarea
                        className={inputClass}
                        required
                        rows={3}
                        value={form.business_description}
                        onChange={(event) =>
                          updateField(
                            'business_description',
                            event.target.value
                          )
                        }
                        placeholder="Ceritakan secara singkat tentang produk atau layanan Anda..."
                      />
                    </label>

                    <fieldset>
                      <legend className={labelClass}>
                        Tujuan utama website ini *
                      </legend>

                      <div className="mt-3 space-y-2">
                        {purposes.map((purpose) => (
                          <label
                            key={purpose}
                            className={`flex cursor-pointer items-center gap-3 rounded-xl border-2 p-3.5 transition ${
                              form.website_purpose === purpose
                                ? 'border-[#80a68b] bg-[#edf5ed]'
                                : 'border-[#e9eae5] bg-white hover:border-[#cbd9cc]'
                            }`}
                          >
                            <input
                              type="radio"
                              name="website_purpose"
                              required
                              value={purpose}
                              checked={form.website_purpose === purpose}
                              onChange={(event) =>
                                updateField(
                                  'website_purpose',
                                  event.target.value
                                )
                              }
                              className="h-4 w-4 accent-[#246747]"
                            />

                            <span className="text-sm font-medium text-[#34443b]">
                              {purpose}
                            </span>
                          </label>
                        ))}
                      </div>
                    </fieldset>

                    {form.website_purpose === 'Lainnya' && (
                      <label className="block">
                        <span className={labelClass}>
                          Jelaskan tujuan website Anda
                        </span>

                        <textarea
                          className={inputClass}
                          rows={2}
                          value={form.additional_notes}
                          onChange={(event) =>
                            updateField('additional_notes', event.target.value)
                          }
                          placeholder="Tuliskan tujuan yang Anda inginkan..."
                        />
                      </label>
                    )}

                    <label className="block">
                      <span className={labelClass}>
                        Siapa target pengunjung website Anda?
                      </span>

                      <textarea
                        className={inputClass}
                        rows={2}
                        value={form.target_audience}
                        onChange={(event) =>
                          updateField('target_audience', event.target.value)
                        }
                        placeholder="Contoh: keluarga muda, pemilik usaha, atau perusahaan."
                      />
                    </label>
                  </div>
                </div>
              </section>

              <button
                type="button"
                onClick={() => {
                  if (
                    !form.customer_name.trim() ||
                    !form.business_description.trim() ||
                    !form.website_purpose
                  ) {
                    setError(
                      'Isi nama bisnis, penjelasan bisnis, dan tujuan website terlebih dahulu.'
                    )
                    return
                  }

                  goToStep(2)
                }}
                className="mt-5 flex w-full items-center justify-center gap-3 rounded-xl bg-[#245b3d] px-5 py-4 text-sm font-bold text-white shadow-sm transition hover:bg-[#19472e]"
              >
                Lanjut ke Tampilan & Warna
                <span aria-hidden="true">→</span>
              </button>
            </div>
          )}

          {/* =========================================
              TAHAP 2 — TAMPILAN, WARNA, DAN VIBES
          ========================================= */}

          {currentStep === 2 && (
            <div className="mx-auto max-w-5xl">
              <div className="mb-6">
                <p className="text-xs font-bold tracking-[0.2em] text-[#78917b]">
                  TAHAP 02
                </p>

                <h1 className="mt-2 text-3xl font-bold tracking-tight text-[#20372f] sm:text-4xl">
                  Tampilan & Warna
                </h1>

                <p className="mt-3 max-w-2xl text-sm leading-6 text-gray-600 sm:text-base">
                  Pilih gaya visual, tema warna, dan suasana yang paling cocok
                  untuk bisnis Anda.
                </p>
              </div>

              {/* TIPS PANDUAN LAYOUT WEBSITE */}

              <section className="mb-6 rounded-2xl border border-[#d8e7d7] bg-[#edf5eb] p-4 sm:p-5">
                <div className="flex items-start gap-3">
                  <span
                    aria-hidden="true"
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-xl text-[#477a5c] shadow-sm"
                  >
                    💡
                  </span>

                  <div className="min-w-0 flex-1">
                    <h2 className="text-sm font-bold text-[#294433] sm:text-base">
                      Kenali susunan website Anda
                    </h2>

                    <p className="mt-1 text-sm leading-6 text-[#53685a]">
                      Unduh contoh layout website untuk memahami fungsi setiap
                      section sebelum memilih bagian yang Anda butuhkan.
                    </p>

                    <a
                      href="/image/layout-website.png"
                      download="panduan-layout-webrief.png"
                      className="mt-3 inline-flex items-center justify-center gap-2 rounded-xl bg-[#245b3d] px-4 py-3 text-sm font-bold text-white transition hover:bg-[#19472e]"
                    >
                      <span aria-hidden="true">↓</span>
                      Download Contoh Layout
                    </a>
                  </div>
                </div>
              </section>

              {/* GAYA VISUAL */}

              <section className="rounded-3xl border border-[#e5e6dd] bg-white p-4 shadow-sm sm:p-7">
                <div className="mb-5">
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#edf3e9] text-xl">
                      ◈
                    </span>

                    <div>
                      <h2 className="text-lg font-bold text-[#294433]">
                        Pilih gaya visual
                      </h2>

                      <p className="mt-1 text-xs leading-5 text-gray-500 sm:text-sm">
                        Gaya visual memengaruhi suasana keseluruhan website.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
                  {visualOptions.map((option) => {
                    const selected = form.website_vibe
                      .split('|')[0]
                      .trim() === option.id

                    return (
                      <button
                        key={option.id}
                        type="button"
                        aria-pressed={selected}
                        onClick={() => {
                          const currentVibe = form.website_vibe.split('|')
                          const selectedMood = currentVibe[1] || ''

                          updateField(
                            'website_vibe',
                            `${option.id}|${selectedMood}`
                          )
                        }}
                        className={`${cardClass} ${
                          selected
                            ? 'border-[#4e8a64] ring-2 ring-[#4e8a64]/15'
                            : 'border-[#e8eae4] hover:border-[#a9c1ad]'
                        }`}
                      >
                        <div className="relative">
                          <img
                            src={option.image}
                            alt={option.name}
                            loading="lazy"
                            className="aspect-square w-full object-cover"
                          />

                          {selected && (
                            <span className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-[#28724d] text-sm font-bold text-white shadow">
                              ✓
                            </span>
                          )}
                        </div>

                        <div className="p-3 sm:p-4">
                          <h3 className="text-sm font-bold text-[#20372f] sm:text-base">
                            {option.name}
                          </h3>

                          <p className="mt-1.5 text-xs leading-5 text-gray-500">
                            {option.description}
                          </p>
                        </div>
                      </button>
                    )
                  })}
                </div>
              </section>

              {/* TEMA WARNA */}

              <section className="mt-6 rounded-3xl border border-[#e5e6dd] bg-white p-4 shadow-sm sm:p-7">
                <div className="mb-5">
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#edf3e9] text-xl">
                      ◉
                    </span>

                    <div>
                      <h2 className="text-lg font-bold text-[#294433]">
                        Pilih tema warna
                      </h2>

                      <p className="mt-1 text-xs leading-5 text-gray-500 sm:text-sm">
                        Setiap tema berisi kombinasi warna yang serasi dan siap
                        digunakan.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
                  {colorOptions.map((option) => {
                    const selected =
                      form.preferred_colors === option.id

                    return (
                      <button
                        key={option.id}
                        type="button"
                        aria-pressed={selected}
                        onClick={() =>
                          updateField('preferred_colors', option.id)
                        }
                        className={`${cardClass} ${
                          selected
                            ? 'border-[#4e8a64] ring-2 ring-[#4e8a64]/15'
                            : 'border-[#e8eae4] hover:border-[#a9c1ad]'
                        }`}
                      >
                        <div className="relative">
                          <img
                            src={option.image}
                            alt={option.name}
                            loading="lazy"
                            className="aspect-square w-full object-cover"
                          />

                          {selected && (
                            <span className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-[#28724d] text-sm font-bold text-white shadow">
                              ✓
                            </span>
                          )}
                        </div>

                        <div className="p-3 sm:p-4">
                          <h3 className="text-sm font-bold text-[#20372f] sm:text-base">
                            {option.name}
                          </h3>

                          {/* PALET WARNA DIBUAT DENGAN KODE */}

                          <div
                            className="mt-3 flex items-center gap-1.5"
                            aria-label={`Palet warna ${option.name}`}
                          >
                            {option.colors.map((color) => (
                              <span
                                key={color}
                                className="h-5 w-5 rounded-full border border-black/5 sm:h-7 sm:w-7"
                                style={{ backgroundColor: color }}
                              />
                            ))}
                          </div>

                          <p className="mt-2 text-xs leading-5 text-gray-500">
                            {option.description}
                          </p>
                        </div>
                      </button>
                    )
                  })}
                </div>
              </section>

              {/* VIBES */}

              <section className="mt-6 rounded-3xl border border-[#e5e6dd] bg-white p-4 shadow-sm sm:p-7">
                <div className="mb-5">
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#edf3e9] text-xl">
                      ✧
                    </span>

                    <div>
                      <h2 className="text-lg font-bold text-[#294433]">
                        Pilih vibes website
                      </h2>

                      <p className="mt-1 text-xs leading-5 text-gray-500 sm:text-sm">
                        Seperti apa suasana yang ingin dirasakan pengunjung?
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {vibeOptions.map((option) => {
                    const selected =
                      form.website_vibe.split('|')[1] === option.id

                    return (
                      <button
                        key={option.id}
                        type="button"
                        aria-pressed={selected}
                        onClick={() => {
                          const currentVibe = form.website_vibe.split('|')
                          const selectedStyle = currentVibe[0] || ''

                          updateField(
                            'website_vibe',
                            `${selectedStyle}|${option.id}`
                          )
                        }}
                        className={`relative rounded-2xl border-2 p-4 text-left transition ${
                          selected
                            ? 'border-[#4e8a64] bg-[#eff6ed] ring-2 ring-[#4e8a64]/10'
                            : 'border-[#e8eae4] bg-white hover:border-[#a9c1ad]'
                        }`}
                      >
                        {selected && (
                          <span className="absolute right-3 top-3 flex h-5 w-5 items-center justify-center rounded-full bg-[#28724d] text-xs font-bold text-white">
                            ✓
                          </span>
                        )}

                        <span className="text-2xl text-[#467452]">
                          {option.symbol}
                        </span>

                        <h3 className="mt-3 text-sm font-bold text-[#294433]">
                          {option.name}
                        </h3>

                        <p className="mt-1 text-xs leading-5 text-gray-500">
                          {option.description}
                        </p>
                      </button>
                    )
                  })}
                </div>
              </section>

              {/* RINGKASAN PILIHAN */}

              <section className="mt-6 rounded-2xl border border-[#dfe8da] bg-[#edf3e9] p-4 sm:p-5">
                <h2 className="text-sm font-bold text-[#294433]">
                  Ringkasan pilihan Anda
                </h2>

                <div className="mt-3 flex flex-wrap gap-2">
                  {(() => {
                    const styleId = form.website_vibe.split('|')[0]
                    const moodId = form.website_vibe.split('|')[1]

                    const style = visualOptions.find(
                      (option) => option.id === styleId
                    )

                    const color = colorOptions.find(
                      (option) => option.id === form.preferred_colors
                    )

                    const mood = vibeOptions.find(
                      (option) => option.id === moodId
                    )

                    return (
                      <>
                        {style && (
                          <span className="rounded-full bg-white px-3 py-2 text-xs font-semibold text-[#365640]">
                            Visual: {style.name}
                          </span>
                        )}

                        {color && (
                          <span className="rounded-full bg-white px-3 py-2 text-xs font-semibold text-[#365640]">
                            Warna: {color.name}
                          </span>
                        )}

                        {mood && (
                          <span className="rounded-full bg-white px-3 py-2 text-xs font-semibold text-[#365640]">
                            Vibes: {mood.name}
                          </span>
                        )}

                        {!style && !color && !mood && (
                          <p className="text-xs text-gray-600">
                            Pilihan Anda akan muncul di sini.
                          </p>
                        )}
                      </>
                    )
                  })()}
                </div>
              </section>

              {/* CATATAN TAMBAHAN */}

              <section className="mt-6 rounded-2xl border border-[#e5e6dd] bg-white p-5 sm:p-6">
                <label className="block">
                  <span className={labelClass}>
                    Catatan tambahan (opsional)
                  </span>

                  <textarea
                    className={inputClass}
                    rows={3}
                    value={form.additional_notes}
                    onChange={(event) =>
                      updateField('additional_notes', event.target.value)
                    }
                    placeholder="Ada hal khusus yang ingin Anda sampaikan?"
                  />
                </label>
              </section>

              {/* ERROR */}

              {error && (
                <div
                  role="alert"
                  className="mt-5 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"
                >
                  {error}
                </div>
              )}

              {/* NAVIGASI */}

              <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
                <button
                  type="button"
                  onClick={() => goToStep(1)}
                  className="rounded-xl border border-[#dce3d9] bg-white px-5 py-4 text-sm font-bold text-[#345340] transition hover:bg-[#f3f6ef] sm:min-w-36"
                >
                  ← Kembali
                </button>

                <button
                  type="button"
                  onClick={() => goToStep(3)}
                  className="rounded-xl bg-[#245b3d] px-6 py-4 text-sm font-bold text-white shadow-sm transition hover:bg-[#19472e] sm:min-w-56"
                >
                  Lanjut ke Struktur Website →
                </button>
              </div>

              <p className="mt-5 pb-5 text-center text-xs leading-5 text-gray-500">
                Webrief · Merencanakan website dengan lebih jelas.
              </p>
            </div>
          )}

          {/* =========================================
              TAHAP 3 — STRUKTUR WEBSITE
          ========================================= */}

          {currentStep === 3 && (
            <div className="mx-auto max-w-5xl">
              <div className="mb-6">
                <p className="text-xs font-bold tracking-[0.2em] text-[#78917b]">
                  TAHAP 03
                </p>
                <h1 className="mt-2 text-3xl font-bold tracking-tight text-[#20372f] sm:text-4xl">
                  Susun isi website Anda
                </h1>
                <p className="mt-3 max-w-2xl text-sm leading-6 text-gray-600 sm:text-base">
                  Pilih bagian website yang ingin ditampilkan. Urutan ini mengikuti
                  susunan umum website satu halaman, dari navbar hingga footer.
                </p>
              </div>

              {/* BALLOON TIPS: DOWNLOAD CONTOH LAYOUT */}
              <section className="mb-6 rounded-2xl border border-[#d8e7d7] bg-[#edf5eb] p-4 sm:p-5">
                <div className="flex items-start gap-3">
                  <span
                    aria-hidden="true"
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-xl text-[#477a5c] shadow-sm"
                  >
                    💡
                  </span>
                  <div className="min-w-0 flex-1">
                    <h2 className="text-sm font-bold text-[#294433] sm:text-base">
                      Kenali susunan website Anda
                    </h2>
                    <p className="mt-1 text-sm leading-6 text-[#53685a]">
                      Unduh contoh layout website untuk memahami fungsi setiap
                      section dan menentukan bagian yang sesuai dengan kebutuhan bisnis Anda.
                    </p>
                    <a
                      href="/image/layout-website.png"
                      download="panduan-layout-webrief.png"
                      className="mt-3 inline-flex items-center justify-center gap-2 rounded-xl bg-[#245b3d] px-4 py-3 text-sm font-bold text-white transition hover:bg-[#19472e]"
                    >
                      <span aria-hidden="true">↓</span>
                      Download Contoh Layout
                    </a>
                  </div>
                </div>
              </section>

              <section className="rounded-3xl border border-[#e5e6dd] bg-white p-4 shadow-sm sm:p-7">
                <div className="mb-5 rounded-xl bg-[#f5f7f1] p-4 text-sm leading-6 text-[#53685a]">
                  <strong className="text-[#294433]">Tips:</strong> Navbar, Hero,
                  Tentang Kami, Layanan/Produk, Kontak, dan Footer merupakan bagian
                  umum website. Anda dapat menonaktifkan section yang tidak dibutuhkan.
                </div>

                <div className="space-y-3">
                  {websiteSections.map((section, index) => {
                    const enabled = Boolean(form.selected_sections[section.key])
                    return (
                      <div
                        key={section.key}
                        className={`flex items-center gap-3 rounded-2xl border p-4 transition ${
                          enabled
                            ? 'border-[#c9ddca] bg-[#f7faf5]'
                            : 'border-[#e8eae4] bg-white'
                        }`}
                      >
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#edf1e9] text-sm font-bold text-[#48634c]">
                          {index + 1}
                        </span>
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-semibold text-[#294433]">
                            {section.label}
                          </p>
                          <p className="mt-1 text-xs leading-5 text-gray-500">
                            {section.desc}
                          </p>
                        </div>
                        <button
                          type="button"
                          role="switch"
                          aria-checked={enabled}
                          aria-label={section.label}
                          onClick={() =>
                            setForm((previous) => ({
                              ...previous,
                              selected_sections: {
                                ...previous.selected_sections,
                                [section.key]: !previous.selected_sections[section.key],
                              },
                            }))
                          }
                          className={`relative h-7 w-12 shrink-0 rounded-full transition ${
                            enabled ? 'bg-[#47734e]' : 'bg-gray-300'
                          }`}
                        >
                          <span
                            className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow transition-all ${
                              enabled ? 'left-6' : 'left-1'
                            }`}
                          />
                        </button>
                      </div>
                    )
                  })}
                </div>
              </section>

              {error && (
                <div
                  role="alert"
                  className="mt-5 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"
                >
                  {error}
                </div>
              )}

              <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
                <button
                  type="button"
                  onClick={() => goToStep(2)}
                  className="rounded-xl border border-[#dce3d9] bg-white px-5 py-4 text-sm font-bold text-[#345340] transition hover:bg-[#f3f6ef] sm:min-w-36"
                >
                  ← Kembali
                </button>
                <button
                  type="button"
                  onClick={() => setError('Struktur website tersimpan sementara di halaman ini. Tahap fitur tambahan akan disiapkan berikutnya.')}
                  className="rounded-xl bg-[#245b3d] px-6 py-4 text-sm font-bold text-white shadow-sm transition hover:bg-[#19472e] sm:min-w-56"
                >
                  Simpan Pilihan Struktur
                </button>
              </div>

              <p className="mt-5 pb-5 text-center text-xs leading-5 text-gray-500">
                Webrief · Merencanakan website dengan lebih jelas.
              </p>
            </div>
          )}
        </form>
      </div>
    </main>
  )
}