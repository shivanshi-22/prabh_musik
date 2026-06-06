"use client";
import { useState } from "react";

interface Genre {
  id: number;
  name: string;
  labelPosition: { bottom: string; left: string };
  bgGradient: string;
  figures: Figure[];
}

interface Figure {
  type: "dancer" | "couple" | "duo" | "guitarist";
  skinTone: string;
  clothColor: string;
  clothColor2?: string;
}

const genres: Genre[] = [
  {
    id: 1,
    name: "Hip Hop",
    labelPosition: { bottom: "24px", left: "18px" },
    bgGradient: "linear-gradient(160deg, #2a1a0a 0%, #1a0f05 40%, #0d0a08 100%)",
    figures: [
      { type: "dancer", skinTone: "#c07840", clothColor: "#f5f5f5", clothColor2: "#1a1a1a" },
      { type: "dancer", skinTone: "#3a2010", clothColor: "#ff6600", clothColor2: "#1a1a1a" },
    ],
  },
  {
    id: 2,
    name: "POP",
    labelPosition: { bottom: "24px", left: "18px" },
    bgGradient: "linear-gradient(160deg, #1e1010 0%, #2a1515 40%, #0d0808 100%)",
    figures: [
      { type: "couple", skinTone: "#d4a070", clothColor: "#d4a070", clothColor2: "#8B4513" },
    ],
  },
  {
    id: 3,
    name: "R&B",
    labelPosition: { bottom: "24px", left: "18px" },
    bgGradient: "linear-gradient(160deg, #101820 0%, #151e2a 40%, #080d14 100%)",
    figures: [
      { type: "duo", skinTone: "#5a3520", clothColor: "#b8860b", clothColor2: "#2a1a0a" },
    ],
  },
  {
    id: 4,
    name: "Rock",
    labelPosition: { bottom: "24px", left: "18px" },
    bgGradient: "linear-gradient(160deg, #101028 0%, #181830 40%, #080810 100%)",
    figures: [
      { type: "guitarist", skinTone: "#c8a070", clothColor: "#1a1a2a", clothColor2: "#0a0a18" },
    ],
  },
];

// ── SVG figures per genre ──────────────────────────────────────────────

function HipHopSVG() {
  return (
    <svg width="100%" height="100%" viewBox="0 0 320 300" preserveAspectRatio="xMidYMax meet">
      {/* Stage floor */}
      <rect x="0" y="260" width="320" height="40" fill="#1a0e04" opacity="0.7" />
      {/* Warm spotlight */}
      <ellipse cx="160" cy="130" rx="120" ry="100" fill="#c8780a" fillOpacity="0.12" />

      {/* ── Dancer 1 (white shirt, left) ── */}
      {/* Head */}
      <ellipse cx="90" cy="80" rx="22" ry="24" fill="#c07840" />
      <ellipse cx="90" cy="65" rx="22" ry="12" fill="#1a0e05" />
      {/* Neck */}
      <rect x="83" y="100" width="14" height="12" rx="4" fill="#c07840" />
      {/* Torso - white shirt */}
      <path d="M60 115 Q60 85 78 112 L80 145 L100 145 L102 112 Q120 85 120 115 L118 200 L62 200Z" fill="#f0f0f0" />
      {/* Dark pants */}
      <path d="M62 195 L58 265 L80 265 L90 230 L100 265 L122 265 L118 195Z" fill="#1a1a1a" />
      {/* Left arm (raised) */}
      <path d="M60 120 Q40 105 30 85 Q28 78 35 76 Q42 74 44 82 Q52 100 65 115Z" fill="#f0f0f0" />
      <ellipse cx="32" cy="75" rx="7" ry="6" fill="#c07840" />
      {/* Right arm (down) */}
      <path d="M120 120 Q138 135 142 158 Q143 164 137 165 Q131 166 129 160 Q126 140 115 125Z" fill="#f0f0f0" />
      <ellipse cx="138" cy="165" rx="7" ry="6" fill="#c07840" />
      {/* Shoes */}
      <ellipse cx="68" cy="265" rx="14" ry="7" fill="#ff4400" />
      <ellipse cx="112" cy="265" rx="14" ry="7" fill="#ff4400" />
      {/* Eyes */}
      <ellipse cx="83" cy="80" rx="3" ry="3" fill="#0a0604" />
      <ellipse cx="97" cy="80" rx="3" ry="3" fill="#0a0604" />

      {/* ── Dancer 2 (orange hoodie, right) ── */}
      {/* Head */}
      <ellipse cx="230" cy="75" rx="20" ry="22" fill="#3a2010" />
      <ellipse cx="230" cy="58" rx="20" ry="12" fill="#0a0604" />
      {/* Neck */}
      <rect x="223" y="94" width="14" height="12" rx="4" fill="#3a2010" />
      {/* Orange hoodie */}
      <path d="M200 108 Q200 80 218 106 L220 140 L240 140 L242 106 Q258 80 260 108 L258 195 L202 195Z" fill="#cc5500" />
      {/* Hood */}
      <path d="M210 108 Q230 90 250 108 Q230 100 210 108Z" fill="#aa4400" />
      {/* Dark pants */}
      <path d="M202 190 L198 260 L220 260 L230 225 L240 260 L262 260 L258 190Z" fill="#0f0f0f" />
      {/* Left arm (bent up) */}
      <path d="M200 115 Q182 108 170 90 Q167 83 174 80 Q181 77 183 84 Q193 100 205 112Z" fill="#cc5500" />
      <ellipse cx="171" cy="79" rx="7" ry="6" fill="#3a2010" />
      {/* Right arm */}
      <path d="M258 115 Q275 128 278 152" stroke="#cc5500" strokeWidth="18" strokeLinecap="round" fill="none" />
      <ellipse cx="279" cy="154" rx="7" ry="6" fill="#3a2010" />
      {/* Shoes */}
      <ellipse cx="208" cy="260" rx="13" ry="6" fill="#222" />
      <ellipse cx="252" cy="260" rx="13" ry="6" fill="#222" />
      {/* Eyes */}
      <ellipse cx="223" cy="76" rx="3" ry="3" fill="#0a0604" />
      <ellipse cx="237" cy="76" rx="3" ry="3" fill="#0a0604" />

      {/* Shadow on floor */}
      <ellipse cx="90" cy="268" rx="32" ry="6" fill="#00000055" />
      <ellipse cx="230" cy="263" rx="30" ry="5" fill="#00000055" />
    </svg>
  );
}

function PopSVG() {
  return (
    <svg width="100%" height="100%" viewBox="0 0 320 300" preserveAspectRatio="xMidYMax meet">
      {/* Warm reddish glow */}
      <ellipse cx="160" cy="140" rx="140" ry="120" fill="#8B2020" fillOpacity="0.25" />

      {/* ── Woman (front, blonde) ── */}
      {/* Hair back */}
      <ellipse cx="110" cy="75" rx="32" ry="38" fill="#d4a040" />
      {/* Head */}
      <ellipse cx="110" cy="82" rx="26" ry="28" fill="#d4a070" />
      {/* Hair strands over face */}
      <path d="M84 70 Q90 95 88 120" stroke="#c89030" strokeWidth="8" fill="none" strokeLinecap="round" />
      <path d="M88 68 Q92 100 90 130" stroke="#d4a030" strokeWidth="6" fill="none" strokeLinecap="round" />
      {/* Neck */}
      <rect x="103" y="107" width="14" height="14" rx="5" fill="#d4a070" />
      {/* Shoulders/top */}
      <path d="M78 125 Q78 108 100 120 L104 165 L118 165 L122 120 Q140 108 142 125 L138 290 L82 290Z" fill="#c07850" />
      {/* Left arm */}
      <path d="M80 128 Q55 140 45 175" stroke="#d4a070" strokeWidth="20" strokeLinecap="round" fill="none" />
      <ellipse cx="44" cy="178" rx="10" ry="8" fill="#d4a070" />
      {/* Right arm */}
      <path d="M140 128 Q162 142 168 178" stroke="#c07850" strokeWidth="20" strokeLinecap="round" fill="none" />
      <ellipse cx="169" cy="181" rx="10" ry="8" fill="#d4a070" />
      {/* Eyes */}
      <ellipse cx="102" cy="82" rx="3.5" ry="3" fill="#2a1a0a" />
      <ellipse cx="118" cy="82" rx="3.5" ry="3" fill="#2a1a0a" />
      {/* Lashes */}
      <path d="M98 79 Q102 76 106 79" stroke="#1a0a04" strokeWidth="1.2" fill="none" />
      <path d="M114 79 Q118 76 122 79" stroke="#1a0a04" strokeWidth="1.2" fill="none" />
      {/* Nose */}
      <path d="M108 90 Q110 95 112 90" stroke="#b07040" strokeWidth="1.3" fill="none" strokeLinecap="round" />
      {/* Lips */}
      <path d="M104 100 Q110 104 116 100" stroke="#c05040" strokeWidth="2" fill="none" strokeLinecap="round" />

      {/* ── Man (behind, right) ── */}
      {/* Head */}
      <ellipse cx="210" cy="95" rx="24" ry="26" fill="#c8956a" />
      <ellipse cx="210" cy="78" rx="24" ry="13" fill="#3a2510" />
      {/* Glasses */}
      <circle cx="202" cy="97" r="9" stroke="#8B6914" strokeWidth="2" fill="none" fillOpacity="0.1" />
      <circle cx="218" cy="97" r="9" stroke="#8B6914" strokeWidth="2" fill="none" fillOpacity="0.1" />
      <path d="M211 97 L209 97" stroke="#8B6914" strokeWidth="2" />
      <path d="M193 97 L185 96" stroke="#8B6914" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M227 97 L235 96" stroke="#8B6914" strokeWidth="1.5" strokeLinecap="round" />
      {/* Neck */}
      <rect x="203" y="118" width="14" height="13" rx="4" fill="#c8956a" />
      {/* Jacket */}
      <path d="M178 135 Q178 115 198 131 L200 175 L220 175 L222 131 Q242 115 242 135 L240 290 L180 290Z" fill="#3a2010" />
      {/* Shirt visible */}
      <path d="M198 131 L200 160 L210 155 L220 160 L222 131 Q210 140 198 131Z" fill="#f0f0e0" />
      {/* Left arm */}
      <path d="M180 138 Q158 152 150 188" stroke="#3a2010" strokeWidth="22" strokeLinecap="round" fill="none" />
      {/* Right arm (reaching forward) */}
      <path d="M240 138 Q258 150 262 180" stroke="#3a2010" strokeWidth="22" strokeLinecap="round" fill="none" />
      {/* Eyes */}
      <ellipse cx="202" cy="97" rx="2.5" ry="2.5" fill="#1a0e05" />
      <ellipse cx="218" cy="97" rx="2.5" ry="2.5" fill="#1a0e05" />

      {/* Shadow */}
      <ellipse cx="110" cy="292" rx="50" ry="7" fill="#00000055" />
      <ellipse cx="210" cy="292" rx="45" ry="6" fill="#00000044" />
    </svg>
  );
}

function RnBSVG() {
  return (
    <svg width="100%" height="100%" viewBox="0 0 320 300" preserveAspectRatio="xMidYMax meet">
      {/* Cool blue/grey ambient */}
      <ellipse cx="160" cy="130" rx="130" ry="110" fill="#1a3a6e" fillOpacity="0.2" />

      {/* ── Person 1 (left, striped shirt) ── */}
      {/* Head */}
      <ellipse cx="95" cy="72" rx="22" ry="24" fill="#5a3520" />
      <ellipse cx="95" cy="56" rx="22" ry="13" fill="#0a0604" />
      {/* Neck */}
      <rect x="88" y="93" width="14" height="13" rx="4" fill="#5a3520" />
      {/* Striped shirt */}
      <path d="M65 110 Q65 90 83 107 L85 155 L107 155 L109 107 Q125 90 125 110 L122 290 L68 290Z" fill="#c8920a" />
      {/* Stripes */}
      {[115, 130, 145, 160, 175, 190, 205, 220, 235].map((y, i) => (
        <rect key={i} x="68" y={y} width="54" height="5" fill={i % 2 === 0 ? "#ffffff22" : "#1a1a1a22"} rx="1" />
      ))}
      {/* Left arm */}
      <path d="M65 115 Q44 128 38 160" stroke="#c8920a" strokeWidth="20" strokeLinecap="round" fill="none" />
      <ellipse cx="36" cy="163" rx="9" ry="7" fill="#5a3520" />
      {/* Right arm */}
      <path d="M125 115 Q145 130 152 165" stroke="#c8920a" strokeWidth="20" strokeLinecap="round" fill="none" />
      <ellipse cx="153" cy="168" rx="9" ry="7" fill="#5a3520" />
      {/* Chain */}
      <path d="M83 110 Q95 118 109 110" stroke="#d4af37" strokeWidth="2" fill="none" />
      {/* Eyes */}
      <ellipse cx="87" cy="73" rx="3" ry="3" fill="#0a0604" />
      <ellipse cx="103" cy="73" rx="3" ry="3" fill="#0a0604" />
      {/* Nose */}
      <path d="M92 80 Q95 86 98 80" stroke="#3a2010" strokeWidth="1.3" fill="none" strokeLinecap="round" />
      {/* Mouth */}
      <path d="M89 90 Q95 94 101 90" stroke="#3a1510" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      {/* Tattoo hint on neck */}
      <path d="M90 96 Q95 92 100 96" stroke="#1a0a0444" strokeWidth="1" fill="none" />

      {/* ── Person 2 (right, darker skin) ── */}
      {/* Head */}
      <ellipse cx="215" cy="68" rx="21" ry="23" fill="#3a2010" />
      <ellipse cx="215" cy="53" rx="21" ry="12" fill="#0a0604" />
      {/* Neck */}
      <rect x="208" y="88" width="14" height="13" rx="4" fill="#3a2010" />
      {/* Dark hoodie */}
      <path d="M185 105 Q185 85 203 102 L205 148 L227 148 L229 102 Q245 85 245 105 L242 290 L188 290Z" fill="#1a1a2a" />
      {/* Hoodie details */}
      <path d="M203 102 L205 130 L215 125 L225 130 L227 102 Q215 112 203 102Z" fill="#252535" />
      {/* Left arm (raised, pointing) */}
      <path d="M185 110 Q162 95 148 72 Q144 65 151 62 Q158 59 161 67 Q174 88 190 106Z" fill="#1a1a2a" />
      <ellipse cx="148" cy="61" rx="8" ry="7" fill="#3a2010" />
      {/* Right arm */}
      <path d="M245 108 Q264 122 268 155" stroke="#1a1a2a" strokeWidth="22" strokeLinecap="round" fill="none" />
      <ellipse cx="269" cy="158" rx="9" ry="7" fill="#3a2010" />
      {/* Chain */}
      <path d="M203 104 Q215 112 229 104" stroke="#d4af37" strokeWidth="2" fill="none" />
      {/* Eyes */}
      <ellipse cx="207" cy="69" rx="3" ry="3" fill="#0a0604" />
      <ellipse cx="223" cy="69" rx="3" ry="3" fill="#0a0604" />
      {/* Nose */}
      <path d="M212 76 Q215 82 218 76" stroke="#2a1508" strokeWidth="1.3" fill="none" strokeLinecap="round" />
      {/* Mouth */}
      <path d="M208 86 Q215 90 222 86" stroke="#2a1008" strokeWidth="1.5" fill="none" strokeLinecap="round" />

      {/* Shadow */}
      <ellipse cx="160" cy="292" rx="110" ry="7" fill="#00000055" />
    </svg>
  );
}

function RockSVG() {
  return (
    <svg width="100%" height="100%" viewBox="0 0 320 300" preserveAspectRatio="xMidYMax meet">
      {/* Stage spotlight - blue/purple */}
      <ellipse cx="200" cy="80" rx="80" ry="100" fill="#4040aa" fillOpacity="0.3" />
      <ellipse cx="200" cy="60" rx="30" ry="40" fill="#8080ff" fillOpacity="0.4" />

      {/* ── Guitarist (close-up hands on guitar) ── */}
      {/* Guitar body */}
      <ellipse cx="160" cy="210" rx="70" ry="55" fill="#2a1a08" />
      <ellipse cx="160" cy="210" rx="62" ry="48" fill="#3a2510" />
      {/* Guitar waist */}
      <rect x="115" y="175" width="90" height="30" rx="8" fill="#2a1a08" />
      {/* Guitar upper bout */}
      <ellipse cx="160" cy="172" rx="52" ry="35" fill="#2a1a08" />
      <ellipse cx="160" cy="172" rx="44" ry="28" fill="#3a2510" />
      {/* Sound hole */}
      <circle cx="160" cy="210" r="18" fill="#1a0e05" />
      <circle cx="160" cy="210" r="15" fill="#0a0603" />
      {/* Guitar strings */}
      {[-18, -11, -4, 4, 11, 18].map((offset, i) => (
        <line key={i} x1={160 + offset} y1="155" x2={160 + offset} y2="265" stroke="#c0c0c088" strokeWidth="1" />
      ))}
      {/* Frets */}
      {[170, 185, 200, 215, 230, 245].map((y, i) => (
        <line key={i} x1="142" y1={y} x2="178" y2={y} stroke="#ffffff22" strokeWidth="1.5" />
      ))}
      {/* Guitar neck */}
      <rect x="148" y="80" width="24" height="100" rx="6" fill="#1a1005" />
      {/* Neck frets detail */}
      {[90, 102, 114, 126, 138, 150, 162].map((y, i) => (
        <line key={i} x1="148" y1={y} x2="172" y2={y} stroke="#3a2a1055" strokeWidth="1" />
      ))}
      {/* Tuning pegs */}
      {[82, 94, 106].map((y, i) => (
        <circle key={i} cx="144" cy={y} r="4" fill="#4a3a20" />
      ))}
      {[82, 94, 106].map((y, i) => (
        <circle key={i} cx="176" cy={y} r="4" fill="#4a3a20" />
      ))}
      {/* Guitar strap */}
      <path d="M110 175 Q60 160 50 120 Q45 90 80 80" stroke="#3a1a08" strokeWidth="8" fill="none" strokeLinecap="round" />

      {/* ── Hands on guitar ── */}
      {/* Left hand (fretting) */}
      <ellipse cx="160" cy="130" rx="22" ry="14" fill="#c8a070" />
      {/* Fingers */}
      {[-12, -5, 3, 11].map((x, i) => (
        <ellipse key={i} cx={160 + x} cy={122} rx="4" ry="9" fill="#c8a070" />
      ))}
      {/* Right hand (strumming) */}
      <ellipse cx="160" cy="210" rx="20" ry="13" fill="#c8a070" />
      {/* Fingers */}
      {[-10, -2, 6, 13].map((x, i) => (
        <ellipse key={i} cx={160 + x} cy={202} rx="4" ry="8" fill="#c8a070" />
      ))}
      {/* Pick */}
      <path d="M172 205 L180 215 L168 218Z" fill="#ffdd00" />

      {/* Guitar shine */}
      <ellipse cx="130" cy="190" rx="15" ry="25" fill="#ffffff08" transform="rotate(-20 130 190)" />
    </svg>
  );
}

function GenreCardSVG({ id }: { id: number }) {
  if (id === 1) return <HipHopSVG />;
  if (id === 2) return <PopSVG />;
  if (id === 3) return <RnBSVG />;
  return <RockSVG />;
}

function GenreCard({ genre, index }: { genre: Genre; index: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "14px",
        animation: `fadeSlideUp 0.55s ease both`,
        animationDelay: `${index * 0.1}s`,
        flex: "1 1 0",
        minWidth: "200px",
      }}
    >
      {/* Image card */}
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          position: "relative",
          borderRadius: "12px",
          overflow: "hidden",
          aspectRatio: "3 / 4",
          background: genre.bgGradient,
          cursor: "pointer",
          transform: hovered ? "scale(1.02)" : "scale(1)",
          boxShadow: hovered
            ? "0 20px 50px rgba(0,0,0,0.6)"
            : "0 8px 24px rgba(0,0,0,0.4)",
          transition: "transform 0.3s ease, box-shadow 0.3s ease",
        }}
      >
        {/* SVG illustration filling card */}
        <div style={{ position: "absolute", inset: 0 }}>
          <GenreCardSVG id={genre.id} />
        </div>

        {/* Darkening overlay at bottom for label readability */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 50%)",
          }}
        />

        {/* Genre label on image */}
        <span
          style={{
            position: "absolute",
            bottom: genre.labelPosition.bottom,
            left: genre.labelPosition.left,
            fontFamily: "'Jacques Francois', Georgia, serif",
            fontSize: "22px",
            fontWeight: 400,
            color: "#ffffff",
            letterSpacing: "0.5px",
            textShadow: "0 2px 10px rgba(0,0,0,0.7)",
          }}
        >
          {genre.name}
        </span>
      </div>

      {/* Label below card */}
      <p
        style={{
          fontFamily: "'Jacques Francois', Georgia, serif",
          fontSize: "20px",
          fontWeight: 400,
          color: "#ffffff",
          letterSpacing: "0.2px",
        }}
      >
        {genre.name}
      </p>
    </div>
  );
}

export default function PopularGenres() {
  const [exploreHov, setExploreHov] = useState(false);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Jacques+Francois&family=Inter:wght@400;500;700&display=swap');
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0);    }
        }
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
      `}</style>

      <section
        style={{
          background: "#111111",
          padding: "60px 5%",
          fontFamily: "'Inter', sans-serif",
        }}
      >
        {/* ── Header row ── */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            marginBottom: "48px",
            gap: "40px",
          }}
        >
          <div style={{ maxWidth: "520px" }}>
            <h2
              style={{
                fontFamily: "'Jacques Francois', Georgia, serif",
                fontSize: "clamp(32px, 4.5vw, 56px)",
                fontWeight: 400,
                color: "#ffffff",
                lineHeight: 1.1,
                letterSpacing: "-0.3px",
                marginBottom: "16px",
              }}
            >
              Popular Genres
            </h2>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "14px",
                color: "rgba(255,255,255,0.45)",
                lineHeight: 1.65,
                maxWidth: "480px",
              }}
            >
              Discover the hottest and most popular artists in the industry today. Keep your music
              library fresh and up-to-date with our curated selection of trending musicians, bands,
              and singers. From emerging talents to established stars, we've got you covered.
            </p>
          </div>

          <button
            onMouseEnter={() => setExploreHov(true)}
            onMouseLeave={() => setExploreHov(false)}
            style={{
              flexShrink: 0,
              padding: "12px 28px",
              borderRadius: "6px",
              border: "none",
              background: exploreHov ? "#e8920a" : "#d4820a",
              color: "#000000",
              fontSize: "14px",
              fontWeight: 700,
              fontFamily: "'Inter', sans-serif",
              cursor: "pointer",
              transform: exploreHov ? "translateY(-2px)" : "translateY(0)",
              boxShadow: exploreHov ? "0 8px 24px #d4820a55" : "none",
              transition: "background 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease",
              marginTop: "8px",
            }}
          >
            Explore All
          </button>
        </div>

        {/* ── Genre Cards Grid ── */}
        <div
          style={{
            display: "flex",
            gap: "20px",
            alignItems: "flex-start",
          }}
        >
          {genres.map((genre, i) => (
            <GenreCard key={genre.id} genre={genre} index={i} />
          ))}
        </div>
      </section>
    </>
  );
}