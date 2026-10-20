'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export default function AdminLoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const supabase = createClient()

      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        setError('Login gagal. Periksa email dan password Anda.')
        return
      }

      router.push('/admin')
      router.refresh()
    } catch {
      setError('Tidak dapat terhubung. Periksa konfigurasi Supabase.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-[#f5f6ef] px-5 py-12 flex items-center justify-center">
      <section className="w-full max-w-md rounded-3xl bg-white p-8 shadow-sm border border-[#dce3d8]">
        <div className="text-center mb-8">
          <p className="text-sm font-bold tracking-[0.3em] text-[#78917c]">
            WEBRIEF
          </p>

          <h1 className="mt-4 text-3xl font-bold text-[#294536]">
            Login Admin
          </h1>

          <p className="mt-3 text-gray-500">
            Masuk untuk mengelola tiket dan brief pelanggan.
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label
              htmlFor="email"
              className="mb-2 block font-semibold text-[#294536]"
            >
              Email
            </label>

            <input
              id="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@email.com"
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-[#78917c]"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-2 block font-semibold text-[#294536]"
            >
              Password
            </label>

            <input
              id="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Masukkan password"
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-[#78917c]"
            />
          </div>

          {error && (
            <p className="rounded-xl bg-red-50 p-3 text-sm text-red-700">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-[#294536] px-4 py-3 font-semibold text-white transition hover:bg-[#365a45] disabled:opacity-60"
          >
            {loading ? 'Memeriksa...' : 'Masuk ke Dashboard'}
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-gray-400">
          Webrief · Admin Panel
        </p>
      </section>
    </main>
  )
}