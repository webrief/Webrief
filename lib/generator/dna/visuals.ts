export type VisualDNA = {
  id: string
  name: string
  description: string
  radius: string
  spacing: string
  headingWeight: string
  headingTracking: string
  buttonStyle: 'solid' | 'outline' | 'pill'
  cardStyle: 'soft' | 'bordered' | 'minimal'
  heroStyle: 'balanced' | 'editorial' | 'centered' | 'bold'
  shadowStyle: string
  fontStyle: 'modern' | 'elegant' | 'strong'
}

export const VISUAL_DNA: VisualDNA[] = [
  {
    id: 'modern-professional',
    name: 'Modern Professional',
    description: 'Tegas, profesional, terstruktur, dan modern.',
    radius: '12px',
    spacing: '1',
    headingWeight: '750',
    headingTracking: '-0.04em',
    buttonStyle: 'solid',
    cardStyle: 'bordered',
    heroStyle: 'balanced',
    shadowStyle: '0 12px 32px rgba(20, 40, 30, 0.08)',
    fontStyle: 'strong',
  },
  {
    id: 'warm-natural',
    name: 'Warm Natural',
    description: 'Hangat, organik, ramah, dan nyaman.',
    radius: '24px',
    spacing: '1.15',
    headingWeight: '650',
    headingTracking: '-0.035em',
    buttonStyle: 'pill',
    cardStyle: 'soft',
    heroStyle: 'balanced',
    shadowStyle: '0 16px 40px rgba(80, 60, 35, 0.08)',
    fontStyle: 'modern',
  },
  {
    id: 'elegant-premium',
    name: 'Elegant Premium',
    description: 'Eksklusif, lapang, halus, dan berkelas.',
    radius: '4px',
    spacing: '1.3',
    headingWeight: '500',
    headingTracking: '-0.025em',
    buttonStyle: 'outline',
    cardStyle: 'minimal',
    heroStyle: 'editorial',
    shadowStyle: '0 18px 50px rgba(20, 20, 20, 0.06)',
    fontStyle: 'elegant',
  },
  {
    id: 'bold-creative',
    name: 'Bold Creative',
    description: 'Berani, dinamis, ekspresif, dan kontras.',
    radius: '18px',
    spacing: '0.95',
    headingWeight: '850',
    headingTracking: '-0.055em',
    buttonStyle: 'solid',
    cardStyle: 'soft',
    heroStyle: 'bold',
    shadowStyle: '0 14px 36px rgba(20, 20, 20, 0.14)',
    fontStyle: 'strong',
  },
  {
    id: 'minimal-clean',
    name: 'Minimal Clean',
    description: 'Sederhana, ringan, rapi, dan fokus pada konten.',
    radius: '8px',
    spacing: '1.2',
    headingWeight: '600',
    headingTracking: '-0.03em',
    buttonStyle: 'outline',
    cardStyle: 'minimal',
    heroStyle: 'centered',
    shadowStyle: 'none',
    fontStyle: 'modern',
  },
]

export function getVisualDNA(id?: string): VisualDNA {
  return (
    VISUAL_DNA.find((visual) => visual.id === id) ??
    VISUAL_DNA[0]
  )
}
