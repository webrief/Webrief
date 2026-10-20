import Link from 'next/link'
import { STRUCTURE_DNA } from '@/lib/generator/dna/structures'

export default function StructureDNAPage() {
  return (
    <main className="min-h-screen bg-[#f5f5ef] px-5 py-10 text-[#263c30] sm:px-10">
      <div className="mx-auto max-w-5xl">
        <p className="mb-4 text-sm font-bold tracking-[0.25em] text-[#718b76]">
          WEBRIEF LABORATORY
        </p>

        <h1 className="text-3xl font-semibold sm:text-5xl">
          Structure DNA Laboratory
        </h1>

        <p className="mt-4 max-w-2xl text-lg leading-8 text-gray-600">
          Bandingkan lima susunan website menggunakan brief bisnis yang sama.
        </p>

        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          {STRUCTURE_DNA.map((structure, index) => (
            <article
              key={structure.id}
              className="rounded-3xl border border-[#dfe4db] bg-white p-6 sm:p-8"
            >
              <p className="text-xs font-bold tracking-[0.2em] text-[#718b76]">
                STRUCTURE DNA {String(index + 1).padStart(2, '0')}
              </p>

              <h2 className="mt-4 text-2xl font-semibold">
                {structure.name}
              </h2>

              <p className="mt-3 leading-7 text-gray-600">
                {structure.description}
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                <span className="rounded-full border px-3 py-1 text-sm">
                  Hero: {structure.heroLayout}
                </span>
                <span className="rounded-full border px-3 py-1 text-sm">
                  Konten: {structure.contentLayout}
                </span>
              </div>

              <p className="mt-4 text-sm text-gray-500">
                Urutan: {structure.sections.join(' → ')}
              </p>

              <Link
                href={`/api/structure-dna/${structure.id}`}
                target="_blank"
                rel="noreferrer"
                className="mt-6 block rounded-xl bg-[#294f38] px-5 py-4 text-center font-semibold text-white"
              >
                Lihat Website
              </Link>
            </article>
          ))}
        </div>
      </div>
    </main>
  )
}
