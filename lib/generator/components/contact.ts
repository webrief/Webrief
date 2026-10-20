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

export function renderContact(brief: WebsiteBrief): string {
  const whatsapp = (brief.whatsapp || '').replace(/\D/g, '')
  const whatsappUrl = `https://wa.me/${whatsapp}`
  const email = brief.email ? escapeHtml(brief.email) : ''

  return `
    <section class="section contact-section" id="contact">
      <div class="contact-content">
        <p class="eyebrow">Mari terhubung</p>
        <h2>Diskusikan kebutuhan Anda bersama kami</h2>
        <p>
          Ceritakan kebutuhan Anda. Kami siap membantu menemukan solusi
          yang sesuai.
        </p>

        <div class="contact-actions">
          ${
            brief.features.whatsappButton && whatsapp
              ? `<a class="button button-primary"
                   href="${whatsappUrl}"
                   target="_blank"
                   rel="noopener noreferrer">
                   Hubungi via WhatsApp
                 </a>`
              : ''
          }

          ${
            email
              ? `<a class="contact-email" href="mailto:${email}">${email}</a>`
              : ''
          }
        </div>

        ${
          brief.features.contactForm
            ? `
              <form class="contact-form" action="#" method="post">
                <label>
                  Nama
                  <input type="text" name="name" placeholder="Nama Anda" required>
                </label>

                <label>
                  Email atau nomor WhatsApp
                  <input type="text" name="contact" placeholder="Kontak Anda" required>
                </label>

                <label>
                  Pesan
                  <textarea name="message" rows="4" placeholder="Ceritakan kebutuhan Anda" required></textarea>
                </label>

                <button class="button button-primary" type="submit">
                  Kirim Pesan
                </button>

                <p class="form-note">
                  Formulir ini masih berupa tampilan. Pengiriman pesan
                  memerlukan integrasi backend.
                </p>
              </form>
            `
            : ''
        }
      </div>
    </section>
  `
}
