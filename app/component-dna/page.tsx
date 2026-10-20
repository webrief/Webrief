import Link from 'next/link'
import { COMPONENT_DNA } from '@/lib/generator/dna/components'

export const dynamic = 'force-dynamic'

export default function ComponentDNAPage() {
  return (
    <main style={{
      minHeight: '100vh',
      padding: '28px 20px 60px',
      background: '#f4f5ef',
      color: '#263b30',
      fontFamily: 'Arial, sans-serif',
    }}>
      <header style={{ maxWidth: 1000, margin: '0 auto 32px' }}>
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
          Component DNA Laboratory
        </h1>

        <p style={{
          color: '#69766d',
          lineHeight: 1.7,
          maxWidth: 650,
        }}>
          Bandingkan lima profil komponen website menggunakan brief bisnis
          yang sama. Setiap profil menentukan karakter navbar, hero, tombol,
          kartu, kontak, dan footer.
        </p>
      </header>

      <section style={{
        maxWidth: 1000,
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
        gap: 18,
      }}>
        {COMPONENT_DNA.map((component, index) => (
          <article key={component.id} style={{
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
              COMPONENT DNA 0{index + 1}
            </div>

            <h2 style={{ fontSize: 21, margin: 0 }}>
              {component.name}
            </h2>

            <div style={{
              padding: 14,
              background: '#f5f3e9',
              border: '1px solid #e3e7df',
              borderRadius: 12,
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 8,
                paddingBottom: 12,
                borderBottom: '1px solid #dfe5dc',
              }}>
                <strong style={{ fontSize: 13 }}>Brand</strong>
                <span style={{
                  background: '#294f3b',
                  color: '#fff',
                  padding: component.button === 'rounded' ? '7px 12px' : '7px 9px',
                  borderRadius: component.button === 'rounded' ? 999 : 5,
                  fontSize: 11,
                }}>
                  CTA
                </span>
              </div>

              <div style={{
                padding: '18px 0 8px',
                textAlign: component.hero === 'centered' ? 'center' : 'left',
              }}>
                <div style={{
                  fontSize: 17,
                  fontWeight: 800,
                  marginBottom: 6,
                }}>
                  Contoh komposisi
                </div>
                <div style={{
                  fontSize: 12,
                  color: '#68746c',
                  lineHeight: 1.6,
                }}>
                  Pratinjau karakter komponen {component.name}.
                </div>
              </div>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 8,
              fontSize: 12,
            }}>
              {[
                ['Navbar', component.navbar],
                ['Hero', component.hero],
                ['Button', component.button],
                ['Card', component.card],
                ['Contact', component.contact],
                ['Footer', component.footer],
              ].map(([label, value]) => (
                <div key={label} style={{
                  padding: '9px 10px',
                  border: '1px solid #dfe5dc',
                  borderRadius: 8,
                }}>
                  <div style={{ color: '#68746c', marginBottom: 4 }}>
                    {label}
                  </div>
                  <strong>{value}</strong>
                </div>
              ))}
            </div>

            <Link
              href={`/api/component-dna/${component.id}`}
              target="_blank"
              rel="noreferrer"
              style={{
                display: 'block',
                textAlign: 'center',
                textDecoration: 'none',
                background: '#294f3b',
                color: '#fff',
                padding: '13px 16px',
                borderRadius: component.button === 'rounded' ? 999 : 8,
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
