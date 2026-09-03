import { ImageResponse } from '@vercel/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const title = searchParams.get('title') || 'Mahessa Trans Holiday';
  const subtitle = searchParams.get('subtitle') || 'Rental Mobil & Paket Wisata Cimahi, Bandung';
  const price = searchParams.get('price') || '';
  const badge = searchParams.get('badge') || '';

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          backgroundImage: 'linear-gradient(135deg, #004a7c 0%, #005691 50%, #0069a8 100%)',
          padding: '60px 70px',
          color: 'white',
          fontFamily: 'sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            marginBottom: 24,
          }}
        >
          <div
            style={{
              width: 50,
              height: 50,
              borderRadius: 12,
              background: 'rgba(255,255,255,0.18)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 28,
              fontWeight: 800,
            }}
          >
            M
          </div>
          <div style={{ fontSize: 24, fontWeight: 700, letterSpacing: '-0.01em' }}>
            Mahessa Trans Holiday
          </div>
        </div>

        {badge && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '8px 16px',
              background: 'rgba(255,255,255,0.18)',
              borderRadius: 100,
              fontSize: 18,
              fontWeight: 700,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              alignSelf: 'flex-start',
              marginBottom: 16,
            }}
          >
            {badge}
          </div>
        )}

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            fontSize: 64,
            fontWeight: 800,
            lineHeight: 1.05,
            letterSpacing: '-0.03em',
            marginTop: 8,
            maxWidth: 900,
          }}
        >
          {title}
        </div>

        <div
          style={{
            fontSize: 26,
            fontWeight: 400,
            opacity: 0.85,
            marginTop: 24,
            maxWidth: 900,
          }}
        >
          {subtitle}
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: 'auto',
          }}
        >
          {price ? (
            <div
              style={{
                fontSize: 40,
                fontWeight: 800,
                letterSpacing: '-0.02em',
              }}
            >
              {price}
            </div>
          ) : (
            <div style={{ display: 'flex' }} />
          )}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              fontSize: 18,
              opacity: 0.85,
            }}
          >
            📞 +62 895-3270-77214
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}