export type ComponentDNA = {
  id: string
  name: string
  navbar: 'minimal' | 'classic' | 'modern'
  hero: 'split' | 'centered' | 'editorial'
  button: 'solid' | 'outline' | 'rounded'
  card: 'minimal' | 'bordered' | 'elevated'
  contact: 'simple' | 'panel' | 'form'
  footer: 'minimal' | 'complete' | 'columns'
}

export const COMPONENT_DNA: ComponentDNA[] = [
  {
    id: 'modern-business',
    name: 'Modern Business',
    navbar: 'modern',
    hero: 'split',
    button: 'solid',
    card: 'bordered',
    contact: 'panel',
    footer: 'complete',
  },
  {
    id: 'minimal-clean',
    name: 'Minimal Clean',
    navbar: 'minimal',
    hero: 'editorial',
    button: 'outline',
    card: 'minimal',
    contact: 'simple',
    footer: 'minimal',
  },
  {
    id: 'rounded-friendly',
    name: 'Rounded Friendly',
    navbar: 'classic',
    hero: 'centered',
    button: 'rounded',
    card: 'elevated',
    contact: 'panel',
    footer: 'complete',
  },
  {
    id: 'premium-elegant',
    name: 'Premium Elegant',
    navbar: 'minimal',
    hero: 'editorial',
    button: 'solid',
    card: 'minimal',
    contact: 'form',
    footer: 'columns',
  },
  {
    id: 'bold-creative',
    name: 'Bold Creative',
    navbar: 'modern',
    hero: 'centered',
    button: 'rounded',
    card: 'elevated',
    contact: 'form',
    footer: 'columns',
  },
]

export function getComponentDNA(id?: string): ComponentDNA {
  return (
    COMPONENT_DNA.find((item) => item.id === id) ??
    COMPONENT_DNA[0]
  )
}
