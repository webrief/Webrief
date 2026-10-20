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

export function renderServices(brief: WebsiteBrief): string {
  if (!brief.features.services || brief.services.length === 0) {
    return ''
  }

  const cards = brief.services
    .map(
      (service, index) => `
        <article class="service-card">
          <span class="service-number">${String(index + 1).padStart(2, '0')}</span>
          <h3>${escapeHtml(service)}</h3>
          <p>Kami membantu memenuhi kebutuhan Anda dengan solusi yang sesuai.</p>
        </article>
      `
    )
    .join('')

  return `
    <section class="section services-section" id="services">
      <div class="section-heading">
        <p class="eyebrow">Apa yang kami tawarkan</p>
        <h2>Layanan untuk kebutuhan Anda</h2>
        <p>Temukan solusi yang sesuai dengan kebutuhan Anda.</p>
      </div>

      <div class="services-grid">
        ${cards}
      </div>
    </section>
  `
}
