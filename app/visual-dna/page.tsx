import Link from 'next/link'
import { VISUAL_DNA } from '@/lib/generator/dna/visuals'

export const dynamic = 'force-dynamic'

export default function VisualDNAPage() {
  return (
    <main style={{
      minHeight: '100vh',
      padding: '28px 20px 60px',
      background: '#f4f5ef',
      color: '#263b30',
      fontFamily: 'Arial, sans-serif',
    }}>
      <header style={{
        maxWidth: 1000,
        margin: '0 auto 32px',
      }}>
        <p style={{
          letterSpacing: '4px',
          fontWeight: 800,
          color: '#6c8875',
          fontSize: 13,
        }}>
          WEBRIEF
        </p>

        <h1 style={{
          fontSize: 'clamp(28px, 5vw, 42px)',
          margin: '12px 0',
        }}>
          Visual DNA Laboratory
        </h1>

        <p style={{
          color: '#69766d',
          lineHeight: 1.7,
          maxWidth: 650,
        }}>
          Bandingkan lima karakter visual yang dihasilkan
          dari brief bisnis yang sama.
        </p>
      </header>

      <section style={{
        maxWidth: 1000,
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
        gap: 18,
      }}>
        {VISUAL_DNA.map((visual, index) => (
          <article key={visual.id} style={{
            background: '#fff',
            border: '1px solid #dfe5dc',
            borderRadius: 18,
            padding: 22,
            display: 'flex',
            flexDirection: 'column',
            gap: 12,
          }}>
            <div style={{
              fontSize: 12,
              fontWeight: 800,
              letterSpacing: 2,
              color: '#78917d',
            }}>
              VISUAL DNA 0{index + 1}
            </div>

            <h2 style={{
              fontSize: 21,
              margin: 0,
            }}>
              {visual.name}
            </h2>

            <p style={{
              fontSize: 14,
              lineHeight: 1.7,
              color: '#68746c',
              minHeight: 48,
              margin: 0,
            }}>
              {visual.description}
            </p>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              padding: 14,
              border: '1px solid #e3e7df',
              borderRadius: visual.radius,
              background: '#f5f3e9',
            }}>
              <div style={{
                width: 36,
                height: 36,
                borderRadius: visual.radius,
                background: '#294f3b',
              }} />

              <div style={{ flex: 1 }}>
                <div style={{
                  fontWeight: Number(visual.headingWeight),
                  letterSpacing: visual.headingTracking,
                }}>
                  Aa Bb Cc
                </div>
                <div style={{
                  fontSize: 11,
                  color: '#68746c',
                  marginTop: 4,
                }}>
                  Typography preview
                </div>
              </div>
            </div>

            <div style={{
              display: 'flex',
              gap: 8,
              flexWrap: 'wrap',
            }}>
              <span style={{
                fontSize: 12,
                padding: '6px 9px',
                border: '1px solid #dfe5dc',
                borderRadius: 8,
              }}>
                Radius: {visual.radius}
              </span>

              <span style={{
                fontSize: 12,
                padding: '6px 9px',
                border: '1px solid #dfe5dc',
                borderRadius: 8,
              }}>
                Button: {visual.buttonStyle}
              </span>
            </div>

            <Link
              href={`/api/visual-dna/${visual.id}`}
              target="_blank"
              style={{
                display: 'block',
                textAlign: 'center',
                textDecoration: 'none',
                background: '#294f3b',
                color: '#fff',
                padding: '13px 16px',
                borderRadius: visual.buttonStyle === 'pill' ? 999 : visual.radius,
                fontWeight: 700,
                marginTop: 'auto',
              }}
            >
              Lihat Website
            </Link>
          </article>
        ))}
      </section>
    </main>
  )
}
