import { Suspense } from 'react'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import AdminDashboard from './AdminDashboard'

async function AdminContent() {
  const supabase = await createClient()

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()

  const adminEmail = process.env.ADMIN_EMAIL
    ?.trim()
    .toLowerCase()

  const userEmail = user?.email
    ?.trim()
    .toLowerCase()

  if (
    error ||
    !user ||
    !adminEmail ||
    userEmail !== adminEmail
  ) {
    redirect('/admin/login')
  }

  return <AdminDashboard />
}

export default function AdminPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-[#f5f6ef] p-8 text-[#294433]">
          Memeriksa akses admin...
        </main>
      }
    >
      <AdminContent />
    </Suspense>
  )
}