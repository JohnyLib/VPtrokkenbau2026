import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          backgroundColor: '#fbf8fa',
          backgroundImage: 'radial-gradient(circle, #eae7e9 1px, transparent 1px)',
          backgroundSize: '24px 24px',
          padding: '80px',
          border: '14px solid #091426',
          boxSizing: 'border-box',
          position: 'relative',
        }}
      >
        {/* Decorative background stripes representing structural alignment */}
        <div
          style={{
            position: 'absolute',
            top: '0',
            right: '120px',
            bottom: '0',
            width: '1px',
            backgroundColor: 'rgba(9, 20, 38, 0.08)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: '0',
            right: '240px',
            bottom: '0',
            width: '1px',
            backgroundColor: 'rgba(9, 20, 38, 0.08)',
          }}
        />

        {/* Highlight Orange Tag */}
        <div
          style={{
            display: 'flex',
            backgroundColor: '#fd761a',
            color: '#ffffff',
            padding: '10px 20px',
            fontSize: '18px',
            fontWeight: 800,
            textTransform: 'uppercase',
            border: '3px solid #091426',
            boxShadow: '4px 4px 0px 0px #091426',
            marginBottom: '28px',
            letterSpacing: '1px',
          }}
        >
          Meisterbetrieb Dresden & Sachsen
        </div>

        {/* Title */}
        <div
          style={{
            display: 'flex',
            fontSize: '84px',
            fontWeight: 900,
            letterSpacing: '-3px',
            color: '#091426',
            textTransform: 'uppercase',
            marginBottom: '10px',
            lineHeight: 1,
          }}
        >
          VP
          <span style={{ color: '#fd761a', marginLeft: '4px' }}>Trokkenbau</span>
        </div>

        {/* Sub-headline */}
        <div
          style={{
            fontSize: '32px',
            fontWeight: 700,
            color: '#45474c',
            textTransform: 'uppercase',
            marginBottom: '40px',
            letterSpacing: '-1px',
          }}
        >
          Präzision im Trockenbau & Innenausbau
        </div>

        {/* Badges / Keywords representing core capabilities */}
        <div style={{ display: 'flex', gap: '16px' }}>
          {[
            'Spachtelarbeiten Q1-Q4',
            'Brandschutz',
            'Akustikbau',
            'Dachausbau',
          ].map((tag) => (
            <div
              key={tag}
              style={{
                display: 'flex',
                backgroundColor: '#ffffff',
                color: '#091426',
                border: '3px solid #091426',
                padding: '10px 18px',
                fontSize: '16px',
                fontWeight: 800,
                textTransform: 'uppercase',
                boxShadow: '4px 4px 0px 0px #091426',
              }}
            >
              {tag}
            </div>
          ))}
        </div>

        {/* Bottom accent bar */}
        <div
          style={{
            position: 'absolute',
            bottom: '0',
            left: '0',
            right: '0',
            height: '16px',
            backgroundColor: '#fd761a',
          }}
        />
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
