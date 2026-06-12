"use client";

const brands = [
  {
    name: "zapier",
    svg: (
      <svg width="90" height="28" viewBox="0 0 90 28" fill="none">
        <text x="0" y="22" fontFamily="'Inter', sans-serif" fontWeight="700" fontSize="22" fill="#d4820a" letterSpacing="-0.5">zap</text>
        {/* lightning bolt dot on i */}
        <text x="48" y="22" fontFamily="'Inter', sans-serif" fontWeight="700" fontSize="22" fill="#d4820a">ier</text>
        <line x1="48" y1="6" x2="52" y2="12" stroke="#d4820a" strokeWidth="2" strokeLinecap="round"/>
        <line x1="52" y1="12" x2="49" y2="12" stroke="#d4820a" strokeWidth="2" strokeLinecap="round"/>
        <line x1="49" y1="12" x2="53" y2="18" stroke="#d4820a" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    name: "Spotify",
    svg: (
      <svg width="110" height="28" viewBox="0 0 110 28" fill="none">
        {/* Circle icon */}
        <circle cx="13" cy="14" r="13" fill="#d4820a"/>
        <path d="M7 10.5 Q13 8 19 10.5" stroke="#000" strokeWidth="2" strokeLinecap="round" fill="none"/>
        <path d="M7.5 14 Q13 11.5 18.5 14" stroke="#000" strokeWidth="2" strokeLinecap="round" fill="none"/>
        <path d="M8.5 17.5 Q13 15.5 17.5 17.5" stroke="#000" strokeWidth="1.8" strokeLinecap="round" fill="none"/>
        <text x="30" y="21" fontFamily="'Inter', sans-serif" fontWeight="700" fontSize="20" fill="#d4820a">Spotify</text>
      </svg>
    ),
  },
  {
    name: "zoom",
    svg: (
      <svg width="90" height="28" viewBox="0 0 90 28" fill="none">
        <text x="0" y="22" fontFamily="'Inter', sans-serif" fontWeight="700" fontSize="22" fill="#d4820a" letterSpacing="1">zoom</text>
      </svg>
    ),
  },
  {
    name: "slack",
    svg: (
      <svg width="100" height="28" viewBox="0 0 100 28" fill="none">
        {/* Slack hash-like icon */}
        <g transform="translate(0,2)">
          {/* Top-left pill */}
          <rect x="0" y="0" width="7" height="14" rx="3.5" fill="#d4820a"/>
          {/* Bottom-left pill */}
          <rect x="0" y="9" width="14" height="7" rx="3.5" fill="#d4820a" opacity="0.7"/>
          {/* Top-right pill */}
          <rect x="9" y="0" width="14" height="7" rx="3.5" fill="#d4820a" opacity="0.7"/>
          {/* Right pill */}
          <rect x="16" y="0" width="7" height="14" rx="3.5" fill="#d4820a" opacity="0.5"/>
        </g>
        <text x="30" y="21" fontFamily="'Inter', sans-serif" fontWeight="700" fontSize="20" fill="#d4820a">slack</text>
      </svg>
    ),
  },
  {
    name: "amazon",
    svg: (
      <svg width="110" height="28" viewBox="0 0 110 28" fill="none">
        <text x="0" y="20" fontFamily="'Inter', sans-serif" fontWeight="700" fontSize="20" fill="#d4820a">amazon</text>
        {/* Smile arrow */}
        <path d="M2 24 Q35 30 68 24" stroke="#d4820a" strokeWidth="2" strokeLinecap="round" fill="none"/>
        <path d="M63 21 L68 24 L63 27" fill="none" stroke="#d4820a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    name: "Adobe",
    svg: (
      <svg width="100" height="28" viewBox="0 0 100 28" fill="none">
        {/* Adobe A triangle */}
        <path d="M0 24 L10 4 L20 24Z" fill="#d4820a"/>
        <path d="M6 18 L14 18" stroke="#1a1a1a" strokeWidth="2"/>
        <text x="26" y="21" fontFamily="'Inter', sans-serif" fontWeight="700" fontSize="20" fill="#d4820a">Adobe</text>
      </svg>
    ),
  },
];

// Duplicate for seamless infinite scroll
const allBrands = [...brands, ...brands, ...brands, ...brands];

export default function TrustedBrands() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap');

        @keyframes marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-25%); }
        }

        .marquee-track {
          display: flex;
          align-items: center;
          gap: 64px;
          animation: marquee 22s linear infinite;
          width: max-content;
        }

        .marquee-track:hover {
          animation-play-state: paused;
        }

        .brand-item {
          display: flex;
          align-items: center;
          opacity: 0.9;
          transition: opacity 0.2s ease, transform 0.2s ease;
          cursor: pointer;
          flex-shrink: 0;
        }

        .brand-item:hover {
          opacity: 1;
          transform: translateY(-2px);
        }

        @media (max-width: 900px) {
          section {
            padding: 26px 0 28px;
          }

          .trusted-pill {
            padding: 10px 26px;
          }

          .trusted-pill span {
            font-size: 16px;
            letter-spacing: 0.03em;
            white-space: normal;
            text-align: center;
            line-height: 1.2;
          }

          .marquee-track {
            gap: 32px;
            animation-duration: 24s;
          }

          .brand-item {
            padding: 0 4px;
          }

          .brand-item svg {
            height: 20px;
            width: auto;
          }
        }
      `}</style>

      <section
        style={{
          background: "#111111",
          padding: "36px 0 40px",
          overflow: "hidden",
        }}
      >
        {/* ── "Trusted by Artists and Brands" pill ── */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "32px",
          }}
        >
          <div
            className="trusted-pill"
            style={{
              display: "inline-flex",
              alignItems: "center",
              background: "rgba(50, 48, 46, 0.95)",
              borderRadius: "999px",
              padding: "16px 36px",
            }}
          >
            <span
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "22px",
                fontWeight: 700,
                color: "#ffffff",
                letterSpacing: "0.1px",
                whiteSpace: "nowrap",
              }}
            >
              Trusted by Artists and Brands
            </span>
          </div>
        </div>

        {/* ── Marquee ── */}
        <div
          style={{
            overflow: "hidden",
            maskImage: "linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)",
          }}
        >
          <div className="marquee-track">
            {allBrands.map((brand, i) => (
              <div key={`${brand.name}-${i}`} className="brand-item">
                {brand.svg}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}