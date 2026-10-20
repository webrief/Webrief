import type { ColorPalette } from '../types'

export const COLOR_PALETTES: ColorPalette[] = [
  {
    id: 'earth-professional',
    name: 'Earth Professional',
    colors: {
      primary: '#294F38',
      secondary: '#6B896F',
      background: '#F5F3E9',
      surface: '#FFFFFF',
      text: '#29382E',
      muted: '#68736B',
      accent: '#C6A76B',
      border: '#DCE5DC',
    },
  },
  {
    id: 'clean-modern',
    name: 'Clean Modern',
    colors: {
      primary: '#234A70',
      secondary: '#547FA3',
      background: '#F3F6FA',
      surface: '#FFFFFF',
      text: '#1E293B',
      muted: '#64748B',
      accent: '#77B9D4',
      border: '#DCE5ED',
    },
  },
  {
    id: 'warm-elegant',
    name: 'Warm Elegant',
    colors: {
      primary: '#654735',
      secondary: '#96745B',
      background: '#F8F2E9',
      surface: '#FFFFFF',
      text: '#352B25',
      muted: '#786D64',
      accent: '#C39B61',
      border: '#E8DDD0',
    },
  },
  {
    id: 'dark-premium',
    name: 'Dark Premium',
    colors: {
      primary: '#D0B477',
      secondary: '#A8B5A9',
      background: '#171D19',
      surface: '#222B25',
      text: '#F4F2E9',
      muted: '#B5BDB6',
      accent: '#D0B477',
      border: '#3A463D',
    },
  },
]

export function getPalette(id: string): ColorPalette {
  return (
    COLOR_PALETTES.find((palette) => palette.id === id) ??
    COLOR_PALETTES[0]
  )
}
