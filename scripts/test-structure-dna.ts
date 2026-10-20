import { writeFileSync, mkdirSync } from 'node:fs'
import { resolve } from 'node:path'
import { generateWebsite } from '../lib/generator'
import { STRUCTURE_DNA } from '../lib/generator/dna/structures'
import type { WebsiteBrief } from '../lib/generator/types'

const baseBrief: WebsiteBrief = {
  businessName: 'Budi Renovasi',
  businessDescription:
    'Jasa renovasi rumah yang mengutamakan kualitas dan kenyamanan keluarga.',
  headline: 'Wujudkan Rumah Impian Anda',
  subheadline:
    'Kami membantu renovasi rumah menjadi lebih nyaman, indah, dan sesuai kebutuhan.',
  services: [
    'Renovasi Rumah',
    'Desain Interior',
    'Perbaikan dan Pemeliharaan',
  ],
  whatsapp: '6281234567890',
  email: 'budi@example.com',
  paletteId: 'earth-professional',
  features: {
    services: true,
    contactForm: true,
    whatsappButton: true,
  },
}

const outputDir = resolve('generated/structure-dna')
mkdirSync(outputDir, { recursive: true })

console.log('\nWEBRIEF — STRUCTURE DNA v1.0\n')

for (const structure of STRUCTURE_DNA) {
  const result = generateWebsite({
    ...baseBrief,
    structureId: structure.id,
  })

  const htmlPath = resolve(outputDir, `${structure.id}.html`)
  const cssPath = resolve(outputDir, `${structure.id}.css`)

  writeFileSync(htmlPath, result.html, 'utf8')
  writeFileSync(cssPath, result.css, 'utf8')

  const sectionOrder = structure.sections.join(' → ')

  console.log(`✓ ${structure.name}`)
  console.log(`  Urutan: ${sectionOrder}`)
  console.log(`  HTML: ${htmlPath}`)
  console.log(`  CSS : ${cssPath}\n`)
}

console.log(`Total variasi: ${STRUCTURE_DNA.length}`)
console.log('Pengujian selesai.')
