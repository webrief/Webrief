import type { GeneratedWebsite, WebsiteBrief } from './types'
import { getVisualPalette } from './dna/visual-palette'
import { getVisualDNA } from './dna/visuals'
import { renderBusinessProfile } from './layouts/business-profile'

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

function createCss(brief: WebsiteBrief): string {
  const palette = getVisualPalette(brief.vibe, brief.paletteId)
  const c = palette.colors
  const visual = getVisualDNA(
    (brief as WebsiteBrief & { vibe?: string }).vibe
  )

  const radius = visual.radius
  const spacing = Number(visual.spacing)
  const headingWeight = visual.headingWeight
  const headingTracking = visual.headingTracking
  const shadow = visual.shadowStyle

  const buttonRadius =
    visual.buttonStyle === 'pill'
      ? '999px'
      : visual.buttonStyle === 'outline'
        ? '2px'
        : radius

  const buttonBorder =
    visual.buttonStyle === 'outline'
      ? '1px solid var(--color-primary)'
      : '1px solid transparent'

  const cardBorder =
    visual.cardStyle === 'minimal'
      ? 'none'
      : '1px solid var(--color-border)'

  const cardShadow =
    visual.cardStyle === 'soft'
      ? shadow
      : 'none'

  const heroColumns =
    visual.heroStyle === 'centered'
      ? '1fr'
      : visual.heroStyle === 'editorial'
        ? '1fr 0.7fr'
        : visual.heroStyle === 'bold'
          ? '1.1fr 0.9fr'
          : '1.2fr 0.8fr'

  const heroAlignment =
    visual.heroStyle === 'centered'
      ? 'center'
      : 'start'

  const fontFamily =
    visual.fontStyle === 'elegant'
      ? "Georgia, 'Times New Roman', serif"
      : visual.fontStyle === 'strong'
        ? "Arial, Helvetica, sans-serif"
        : "Arial, Helvetica, sans-serif"

  return `
:root {
  --color-primary: ${c.primary};
  --color-secondary: ${c.secondary};
  --color-background: ${c.background};
  --color-surface: ${c.surface};
  --color-text: ${c.text};
  --color-muted: ${c.muted};
  --color-accent: ${c.accent};
  --color-border: ${c.border};
  --container-width: 1120px;
  --radius: ${radius};
  --visual-spacing: ${spacing};
  --visual-shadow: ${shadow};
  --heading-weight: ${headingWeight};
  --heading-tracking: ${headingTracking};
  --visual-card-border: ${cardBorder};
  --visual-card-shadow: ${cardShadow};
  --visual-button-radius: ${buttonRadius};
  --visual-button-border: ${buttonBorder};
  --hero-columns: ${heroColumns};
  --hero-alignment: ${heroAlignment};
}

* {
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
  scroll-padding-top: 90px;
}

body {
  margin: 0;
  background: var(--color-background);
  color: var(--color-text);
  font-family: ${fontFamily};
  line-height: 1.7;
}

a {
  color: inherit;
}

.navbar {
  position: relative;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  max-width: var(--container-width);
  margin: auto;
  padding: 20px 28px;
}

.brand {
  color: var(--color-primary);
  font-size: 1.15rem;
  font-weight: 800;
  text-decoration: none;
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 24px;
}

.nav-links a {
  color: var(--color-muted);
  font-size: 0.92rem;
  text-decoration: none;
}

.nav-cta {
  padding: 10px 16px;
  border-radius: var(--visual-button-radius);
  border: var(--visual-button-border);
  background: var(--color-primary);
  color: #fff;
  font-size: 0.9rem;
  font-weight: 700;
  text-decoration: none;
}

.hero {
  display: grid;
  grid-template-columns: var(--hero-columns);
  align-items: center;
  gap: calc(48px * var(--visual-spacing));
  max-width: var(--container-width);
  min-height: 490px;
  margin: 24px auto 0;
  padding: 64px 28px 88px;
}

.hero-content {
  max-width: 650px;
}

.eyebrow {
  margin: 0 0 14px;
  color: var(--color-secondary);
  font-size: 0.78rem;
  font-weight: 800;
  letter-spacing: 0.13em;
  text-transform: uppercase;
}

.hero h1 {
  margin: 0;
  font-size: clamp(2.5rem, 5vw, 4.4rem);
  line-height: 1.1;
  font-weight: var(--heading-weight);
  letter-spacing: var(--heading-tracking);
}

.hero-description {
  max-width: 560px;
  margin: 24px 0;
  color: var(--color-muted);
  font-size: 1.1rem;
}

.hero-actions,
.contact-actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px;
  margin-top: 28px;
}

.button {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  min-height: 48px;
  padding: 12px 20px;
  border: 1px solid transparent;
  border-radius: var(--visual-button-radius);
  border: var(--visual-button-border);
  font: inherit;
  font-weight: 700;
  text-decoration: none;
  cursor: pointer;
}

.button-primary {
  background: var(--color-primary);
  color: #fff;
}

.button-primary:hover {
  opacity: 0.9;
}

.button-secondary {
  border-color: var(--color-border);
  background: var(--color-surface);
  color: var(--color-primary);
}

.hero-decoration {
  display: grid;
  min-height: 300px;
  place-items: center;
  border: 1px solid var(--color-border);
  border-radius: calc(var(--radius) * 1.5);
  background:
    radial-gradient(circle at 80% 20%, var(--color-accent), transparent 32%),
    linear-gradient(145deg, var(--color-surface), var(--color-background));
}

.decoration-card {
  width: min(78%, 290px);
  padding: 30px;
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  background: var(--color-surface);
  box-shadow: var(--visual-shadow);
}

.decoration-icon {
  color: var(--color-accent);
  font-size: 2.4rem;
}

.decoration-card p {
  margin-bottom: 0;
  font-weight: 700;
}

.section {
  padding: 88px 28px;
}

.services-section {
  background: var(--color-surface);
}

.section-heading,
.services-grid,
.contact-content,
.footer-inner {
  max-width: var(--container-width);
  margin-right: auto;
  margin-left: auto;
}

.section-heading {
  margin-bottom: 34px;
}

.section-heading h2,
.contact-content h2 {
  max-width: 680px;
  margin: 0;
  font-size: clamp(2rem, 4vw, 3rem);
  line-height: 1.2;
  letter-spacing: -0.03em;
}

.section-heading > p:last-child,
.contact-content > p:not(.eyebrow) {
  color: var(--color-muted);
}

.services-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 20px;
}

.service-card {
  padding: 26px;
  border: var(--visual-card-border);
  border-radius: var(--radius);
  background: var(--color-background);
  box-shadow: var(--visual-card-shadow);
}

.service-number {
  color: var(--color-secondary);
  font-size: 0.85rem;
  font-weight: 800;
}

.service-card h3 {
  margin: 16px 0 8px;
  font-size: 1.25rem;
}

.service-card p {
  margin-bottom: 0;
  color: var(--color-muted);
  font-size: 0.95rem;
}

.contact-section {
  background: var(--color-background);
}

.contact-content {
  display: grid;
  grid-template-columns: 1fr 0.8fr;
  align-items: start;
  gap: 24px 60px;
}

.contact-content > .eyebrow,
.contact-content > h2,
.contact-content > p {
  grid-column: 1;
}

.contact-actions,
.contact-form {
  grid-column: 2;
  grid-row: 1 / span 4;
  margin-top: 0;
}

.contact-email {
  color: var(--color-primary);
  overflow-wrap: anywhere;
}

.contact-form {
  display: grid;
  gap: 16px;
  margin-top: 150px;
  padding: 24px;
  border: 1px solid var(--color-border);
  border-radius: 16px;
  background: var(--color-surface);
}

.contact-form label {
  display: grid;
  gap: 7px;
  font-size: 0.9rem;
  font-weight: 700;
}

.contact-form input,
.contact-form textarea {
  width: 100%;
  padding: 12px;
  border: 1px solid var(--color-border);
  border-radius: 8px;
  background: var(--color-background);
  color: var(--color-text);
  font: inherit;
}

.contact-form textarea {
  resize: vertical;
}

.form-note {
  margin: 0;
  color: var(--color-muted);
  font-size: 0.8rem;
}

.footer {
  padding: 34px 28px;
  border-top: 1px solid var(--color-border);
  background: var(--color-surface);
}

.footer-inner {
  display: grid;
  gap: 8px;
}

.footer-inner p {
  margin: 0;
  color: var(--color-muted);
  font-size: 0.9rem;
}

.copyright {
  padding-top: 12px;
  font-size: 0.8rem !important;
}

@media (max-width: 760px) {
  .navbar {
    flex-wrap: wrap;
    padding: 18px 20px;
  }

  .nav-links {
    order: 3;
    width: 100%;
    justify-content: flex-start;
    gap: 20px;
  }

  .nav-cta {
    font-size: 0.82rem;
  }

  .hero {
    grid-template-columns: 1fr;
    gap: 30px;
    min-height: auto;
    margin-top: 0;
    padding: 56px 22px;
  }

  .hero h1 {
    font-size: clamp(2.5rem, 11vw, 3.7rem);
  }

  .hero-decoration {
    min-height: 220px;
  }

  .section {
    padding: 64px 22px;
  }

  .services-grid {
    grid-template-columns: 1fr;
  }

  .contact-content {
    grid-template-columns: 1fr;
    gap: 16px;
  }

  .contact-content > .eyebrow,
  .contact-content > h2,
  .contact-content > p,
  .contact-actions,
  .contact-form {
    grid-column: 1;
    grid-row: auto;
  }

  .contact-form {
    margin-top: 12px;
  }
}



/* COMPONENT DNA */

/* NAVBAR */
.navbar-minimal .navbar {
  padding-top: 28px;
  padding-bottom: 28px;
}

.navbar-classic .navbar {
  border-bottom: 1px solid var(--color-border);
}

.navbar-modern .navbar {
  margin-top: 16px;
  border: 1px solid var(--color-border);
  border-radius: 16px;
  background: var(--color-surface);
}

/* HERO */
.component-hero-split .hero {
  grid-template-columns: 1.15fr 0.85fr;
}

.component-hero-centered .hero {
  grid-template-columns: 1fr;
  text-align: center;
}

.component-hero-centered .hero-content {
  margin-right: auto;
  margin-left: auto;
}

.component-hero-centered .hero-description {
  margin-right: auto;
  margin-left: auto;
}

.component-hero-centered .hero-actions {
  justify-content: center;
}

.component-hero-centered .hero-decoration {
  max-width: 620px;
  width: 100%;
  margin: 0 auto;
}

.component-hero-editorial .hero {
  grid-template-columns: 1fr;
  max-width: 900px;
  text-align: left;
}

.component-hero-editorial .hero-decoration {
  display: none;
}

/* BUTTON */
.button-solid .button-primary,
.button-solid .nav-cta {
  border: 1px solid transparent;
}

.button-outline .button-primary,
.button-outline .nav-cta {
  border: 1px solid var(--color-primary);
  background: transparent;
  color: var(--color-primary);
}

.button-rounded .button {
  border-radius: 999px;
}

.button-rounded .nav-cta {
  border-radius: 999px;
}

/* CARD */
.card-minimal .service-card {
  border: none;
  border-radius: 0;
  background: transparent;
  box-shadow: none;
}

.card-bordered .service-card {
  border: 1px solid var(--color-border);
  box-shadow: none;
}

.card-elevated .service-card {
  border: 1px solid var(--color-border);
  box-shadow: 0 12px 32px rgba(25, 45, 32, 0.10);
}

/* CONTACT */
.contact-simple .contact-content {
  grid-template-columns: 1fr;
}

.contact-simple .contact-content > *,
.contact-simple .contact-actions,
.contact-simple .contact-form {
  grid-column: 1;
  grid-row: auto;
}

.contact-simple .contact-form {
  margin-top: 12px;
}

.contact-panel .contact-content {
  padding: 28px;
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  background: var(--color-surface);
}

.contact-form .contact-form {
  margin-top: 12px;
}

/* FOOTER */
.footer-minimal .footer {
  padding-top: 22px;
  padding-bottom: 22px;
}

.footer-complete .footer-inner {
  gap: 14px;
}

.footer-columns .footer-inner {
  grid-template-columns: repeat(2, minmax(0, 1fr));
  align-items: start;
  gap: 12px 32px;
}

.footer-columns .copyright {
  grid-column: 1 / -1;
}

@media (max-width: 760px) {
  .component-hero-split .hero,
  .component-hero-centered .hero,
  .component-hero-editorial .hero {
    grid-template-columns: 1fr;
  }

  .contact-panel .contact-content {
    padding: 20px;
  }

  .footer-columns .footer-inner {
    grid-template-columns: 1fr;
  }
}


/* STRUCTURE DNA */
.layout-classic-business .hero {
  grid-template-columns: 1.2fr 0.8fr;
}

.layout-split-hero .hero {
  grid-template-columns: 1fr 1fr;
  gap: 64px;
}

.layout-editorial .hero {
  grid-template-columns: 1fr;
  max-width: 900px;
  min-height: 420px;
  text-align: left;
}

.layout-editorial .hero-decoration {
  display: none;
}

.layout-grid-focus .hero {
  grid-template-columns: 1fr;
  text-align: center;
}

.layout-grid-focus .hero-content {
  margin: auto;
}

.layout-grid-focus .hero-description {
  margin-right: auto;
  margin-left: auto;
}

.layout-grid-focus .hero-actions {
  justify-content: center;
}

.layout-conversion-focus .hero {
  grid-template-columns: 1fr;
  min-height: 400px;
  text-align: center;
}

.layout-conversion-focus .hero-content {
  margin: auto;
}

.layout-conversion-focus .hero-description {
  margin-right: auto;
  margin-left: auto;
}

.layout-conversion-focus .hero-actions {
  justify-content: center;
}

.layout-conversion-focus .button-primary {
  min-height: 56px;
  padding-right: 28px;
  padding-left: 28px;
}

@media (max-width: 760px) {
  .layout-split-hero .hero,
  .layout-classic-business .hero {
    grid-template-columns: 1fr;
  }

  .layout-editorial .hero {
    padding-top: 44px;
  }
}

@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }
}
`
}

export function generateWebsite(brief: WebsiteBrief): GeneratedWebsite {
  const palette = getVisualPalette(brief.vibe, brief.paletteId)
  const htmlContent = renderBusinessProfile(brief)
  const css = createCss(brief)

  const html = `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="description" content="${escapeHtml(brief.businessDescription)}">
  <meta name="theme-color" content="${palette.colors.primary}">
  <title>${escapeHtml(brief.businessName)}</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
${htmlContent}
</body>
</html>
`

  return { html, css }
}
