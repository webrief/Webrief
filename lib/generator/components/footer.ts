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

export function renderFooter(brief: WebsiteBrief): string {
  const name = escapeHtml(brief.businessName)

  return `
    <footer class="footer">
      <div class="footer-inner">
        <a class="brand footer-brand" href="#home">${name}</a>
        <p>
          ${name} — melayani kebutuhan Anda dengan sepenuh hati.
        </p>
        <p class="copyright">
          &copy; ${new Date().getFullYear()} ${name}. Hak cipta dilindungi.
        </p>
      </div>
    </footer>
  `
}
