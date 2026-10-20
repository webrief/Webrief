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

export function renderNavbar(brief: WebsiteBrief): string {
  const name = escapeHtml(brief.businessName)

  return `
    <header class="navbar">
      <a class="brand" href="#home">${name}</a>

      <nav class="nav-links" aria-label="Navigasi utama">
        <a href="#home">Beranda</a>
        ${brief.features.services ? '<a href="#services">Layanan</a>' : ''}
        <a href="#contact">Kontak</a>
      </nav>

      ${
        brief.features.whatsappButton
          ? `<a class="nav-cta" href="#contact">Hubungi Kami</a>`
          : ''
      }
    </header>
  `
}
