import type { WebsiteBrief } from '../types'

function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (char) => {
    const entities: Record<string, string> = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;',
    }

    return entities[char]
  })
}

export function renderHero(brief: WebsiteBrief): string {
  return `
    <section class="hero" id="home">
      <div class="hero-content">
        <p class="eyebrow">Melayani dengan sepenuh hati</p>

        <h1>${escapeHtml(brief.headline)}</h1>

        <p class="hero-description">
          ${escapeHtml(brief.subheadline)}
        </p>

        <div class="hero-actions">
          <a class="button button-primary" href="#contact">
            Konsultasi Sekarang
          </a>

          ${
            brief.features.services
              ? '<a class="button button-secondary" href="#services">Lihat Layanan</a>'
              : ''
          }
        </div>
      </div>

      <div class="hero-decoration" aria-hidden="true">
        <div class="decoration-card">
          <span class="decoration-icon">✦</span>
          <p>Solusi yang tepat untuk kebutuhan Anda</p>
        </div>
      </div>
    </section>
  `
}
