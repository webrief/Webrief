export type ColorPalette = {
  id: string
  name: string
  colors: {
    primary: string
    secondary: string
    background: string
    surface: string
    text: string
    muted: string
    accent: string
    border: string
  }
}

export type WebsiteBrief = {
  businessName: string
  businessDescription: string
  headline: string
  subheadline: string
  services: string[]
  whatsapp: string
  email?: string
  paletteId: string
  structureId?: string
  componentDNAId?: string
  vibe?: string
  features: {
    services: boolean
    contactForm: boolean
    whatsappButton: boolean
  }
}

export type GeneratedWebsite = {
  html: string
  css: string
}
