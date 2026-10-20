import { writeFileSync, mkdirSync } from 'node:fs'
import path from 'node:path'
import { generateWebsite } from '../lib/generator'
import type { WebsiteBrief } from '../lib/generator/types'
import { VISUAL_DNA } from '../lib/generator/dna/visuals'

const baseBrief: WebsiteBrief = {
  businessName: 'Budi Renovasi',
  businessDescription:
    'Jasa renovasi rumah untuk hunian yang nyaman, indah, dan sesuai kebutuhan keluarga.',
  headline: 'Wujudkan Rumah Impian Anda',
  subheadline:
    'Kami membantu renovasi rumah menjadi lebih nyaman, indah, dan sesuai kebutuhan keluarga Anda.',
  services: [
    'Renovasi Rumah',
    'Desain Interior',
    'Perbaikan dan Pemeliharaan',
  ],
  whatsapp: '6281234567890',
  email: 'budi@example.com',
  paletteId: '',
  features: {
    services: true,
    contactForm: true,
    whatsappButton: true,
  },
}

const outputDir = path.join(process.cwd(), 'generated', 'visual-dna')
mkdirSync(outputDir, { recursive: true })

for (const visual of VISUAL_DNA) {
  const brief = {
    ...baseBrief,
    vibe: visual.id,
  }

  const result = generateWebsite(brief)
  const htmlPath = path.join(outputDir, `${visual.id}.html`)
  const cssPath = path.join(outputDir, `${visual.id}.css`)

  const standaloneHtml = result.html.replace(
    '<link rel="stylesheet" href="style.css">',
    `<style>${result.css.replace(/<\/style/gi, '<\\/style')}</style>`,
  )

  writeFileSync(htmlPath, standaloneHtml, 'utf8')
  writeFileSync(cssPath, result.css, 'utf8')

  console.log(`✓ ${visual.name}`)
  console.log(`  HTML: ${htmlPath}`)
  console.log(`  CSS : ${cssPath}`)
}

console.log('\nPengujian Visual DNA selesai.')
console.log(`Total variasi: ${VISUAL_DNA.length}`)
