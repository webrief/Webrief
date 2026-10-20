import { mkdirSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'

import { generateWebsite } from '../lib/generator/index'
import type { WebsiteBrief } from '../lib/generator/types'

const brief: WebsiteBrief = {
  businessName: 'Budi Renovasi',
  businessDescription:
    'Jasa renovasi rumah profesional untuk keluarga modern.',

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

  paletteId: 'earth-professional',

  features: {
    services: true,
    contactForm: true,
    whatsappButton: true,
  },
}

const result = generateWebsite(brief)

const outputDir = resolve(process.cwd(), 'generated')

mkdirSync(outputDir, { recursive: true })

writeFileSync(
  resolve(outputDir, 'index.html'),
  result.html,
  'utf8'
)

writeFileSync(
  resolve(outputDir, 'style.css'),
  result.css,
  'utf8'
)

console.log('')
console.log('================================')
console.log(' WEBRIEF GENERATOR ENGINE v1.0')
console.log('================================')
console.log('')
console.log('Website berhasil dibuat!')
console.log('')
console.log('Output:')
console.log('generated/index.html')
console.log('generated/style.css')
console.log('')
console.log('Palet:', brief.paletteId)
console.log('Bisnis:', brief.businessName)
console.log('')
