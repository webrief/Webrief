export type StructureDNA = {
  id: string
  name: string
  description: string
  sections: string[]
  heroLayout: 'split' | 'centered' | 'editorial'
  contentLayout: 'grid' | 'stack' | 'mixed'
  conversionFocus: boolean
}

export const STRUCTURE_DNA: StructureDNA[] = [
  {
    id: 'classic-business',
    name: 'Classic Business',
    description: 'Struktur bisnis yang jelas dan profesional.',
    sections: ['hero', 'about', 'services', 'contact'],
    heroLayout: 'split',
    contentLayout: 'stack',
    conversionFocus: false,
  },
  {
    id: 'split-hero',
    name: 'Split Hero',
    description: 'Teks dan visual ditampilkan berdampingan.',
    sections: ['hero', 'services', 'about', 'contact'],
    heroLayout: 'split',
    contentLayout: 'mixed',
    conversionFocus: false,
  },
  {
    id: 'editorial',
    name: 'Editorial',
    description: 'Judul dominan dengan konten yang terstruktur.',
    sections: ['hero', 'about', 'services', 'contact'],
    heroLayout: 'editorial',
    contentLayout: 'stack',
    conversionFocus: false,
  },
  {
    id: 'grid-focus',
    name: 'Grid Focus',
    description: 'Layanan atau produk menjadi fokus utama.',
    sections: ['hero', 'services', 'about', 'contact'],
    heroLayout: 'centered',
    contentLayout: 'grid',
    conversionFocus: false,
  },
  {
    id: 'conversion-focus',
    name: 'Conversion Focus',
    description: 'Struktur yang mengarahkan pengunjung menuju CTA.',
    sections: ['hero', 'services', 'about', 'contact'],
    heroLayout: 'centered',
    contentLayout: 'mixed',
    conversionFocus: true,
  },
]

export function getStructureDNA(id?: string): StructureDNA {
  return (
    STRUCTURE_DNA.find((item) => item.id === id) ??
    STRUCTURE_DNA[0]
  )
}
