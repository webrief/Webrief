export default function Home() {
  return (
    <main className="min-h-screen bg-[#FDFBF7] text-[#26352D] flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-md">
        <header className="mb-16 text-center">
          <p className="text-sm font-semibold tracking-[0.25em] text-[#527A5C]">
            WEBRIEF
          </p>
          <p className="mt-2 text-xs tracking-wide text-[#827F75]">
            We Brief. Web Brief.
          </p>
        </header>

        <section>
          <p className="text-sm font-medium text-[#527A5C]">
            LET’S BUILD YOUR WEBSITE
          </p>

          <h1 className="mt-4 text-4xl font-semibold leading-tight tracking-tight">
            Ceritakan ide website Anda.
          </h1>

          <p className="mt-5 text-base leading-7 text-[#77766D]">
            Kami ingin memahami bisnis, tujuan, dan gaya website yang Anda
            inginkan sebelum mulai merancangnya.
          </p>

          <div className="mt-10 rounded-2xl border border-[#E7E3D9] bg-white p-5">
            <label
              htmlFor="ticket"
              className="block text-sm font-medium"
            >
              Punya kode tiket?
            </label>

            <input
              id="ticket"
              type="text"
              placeholder="Contoh: WEB-7K4P9X"
              disabled
              className="mt-3 w-full rounded-xl border border-[#E7E3D9] bg-[#FAF9F5] px-4 py-3 text-sm outline-none placeholder:text-[#AAA79E]"
            />

            <button
              type="button"
              disabled
              className="mt-4 w-full rounded-xl bg-[#527A5C] px-5 py-3.5 text-sm font-medium text-white opacity-70"
            >
              Buka Brief Saya
            </button>

            <p className="mt-3 text-center text-xs text-[#918E84]">
              Portal brief pelanggan
            </p>
          </div>
        </section>

        <footer className="mt-16 text-center text-xs text-[#918E84]">
          Memahami kebutuhan. Merancang dengan makna.
        </footer>
      </div>
    </main>
  );
}
