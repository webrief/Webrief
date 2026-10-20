import type { ColorPalette } from '../types'
import { getPalette } from './palettes'

const VIBE_PALETTE_MAP: Record<string, string> = {
  'modern-professional': 'earth-professional',
  'warm-natural': 'warm-elegant',
  'elegant-premium': 'dark-premium',
  'bold-creative': 'clean-modern',
  'minimal-clean': 'clean-modern',
}

export function getVisualPalette(
  vibe?: string,
  preferredPaletteId?: string,
): ColorPalette {
  // Jika pelanggan memilih palet secara eksplisit,
  // utamakan preferensi pelanggan tersebut.
  if (preferredPaletteId) {
    return getPalette(preferredPaletteId)
  }

  const mappedPaletteId = vibe
    ? VIBE_PALETTE_MAP[vibe]
    : undefined

  return getPalette(mappedPaletteId ?? 'earth-professional')
}
