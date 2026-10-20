import type { WebsiteBrief } from '../types'
import { getStructureDNA } from '../dna/structures'
import { getComponentDNA } from '../dna/components'
import { renderNavbar } from '../components/navbar'
import { renderHero } from '../components/hero'
import { renderServices } from '../components/services'
import { renderContact } from '../components/contact'
import { renderFooter } from '../components/footer'

export function renderBusinessProfile(brief: WebsiteBrief): string {
  const structure = getStructureDNA(brief.structureId)
  const component = getComponentDNA(brief.componentDNAId)

  const sections: Record<string, () => string> = {
    hero: () => renderHero(brief),
    services: () => renderServices(brief),
    about: () => `
      <section class="section about-section" id="tentang">
        <div class="section-heading">
          <p class="eyebrow">Tentang Kami</p>
          <h2>Mengenal ${escapeHtml(brief.businessName)}</h2>
          <p>${escapeHtml(brief.businessDescription)}</p>
        </div>
      </section>
    `,
    contact: () => renderContact(brief),
  }

  const mainContent = structure.sections
    .map((section) => sections[section]?.() ?? '')
    .join('\n')

  return `
    ${renderNavbar(brief)}
    <main class="layout-${structure.id} hero-${structure.heroLayout} content-${structure.contentLayout} component-dna-${component.id} navbar-${component.navbar} component-hero-${component.hero} button-${component.button} card-${component.card} contact-${component.contact} footer-${component.footer}${structure.conversionFocus ? ' conversion-focus' : ''}">
      ${mainContent}
    </main>
    ${renderFooter(brief)}
  `
}

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
