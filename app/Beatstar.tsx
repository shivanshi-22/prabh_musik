"use client";
import { useEffect, useRef } from "react";

const COL1 = [
  { artist: "Karan Aujla", title: "Midnight Therapy", genre: "Punjabi Trap · 2026", tag: "EXPLICIT", tagBg: "rgba(0,0,0,0.75)", bg: ["#1a1a2e", "#2d2d5e"], emoji: "🎵" },
  { artist: "AP Dhillon", title: "Brown Munde 2", genre: "Punjabi Pop · 2026", tag: "HOT", tagBg: "#e8a020", bg: ["#2a1a0e", "#5a3010"], emoji: "🥁" },
  { artist: "Sidhu Moosewala", title: "Pind Da Raja", genre: "Punjabi Folk · 2026", tag: "NEW", tagBg: "#1d9e75", bg: ["#0d2a1f", "#1a4a30"], emoji: "🎤" },
  { artist: "Diljit Dosanjh", title: "G.O.A.T. Returns", genre: "Bhangra · 2026", tag: "FIRE", tagBg: "#7f77dd", bg: ["#1f0a2a", "#3d1555"], emoji: "🎹" },
];

const COL2 = [
  { artist: "Karan Aujla", title: "Sidhu's Anthem", genre: "Punjabi Trap · 2026", tag: "3K", tagBg: "#e8a020", bg: ["#6e1a1a", "#c0392b"], emoji: "🔥" },
  { artist: "Shubh", title: "Raatan Lambiyan", genre: "R&B · 2026", tag: "CHILL", tagBg: "#185fa5", bg: ["#0a1a2a", "#0c447c"], emoji: "🌊" },
  { artist: "Babbal Rai", title: "Yaarian Forever", genre: "Punjabi Soul · 2026", tag: "VIBE", tagBg: "#3b6d11", bg: ["#1a2a0a", "#3b6d11"], emoji: "🌿" },
  { artist: "Amrit Maan", title: "Tere Bina", genre: "Punjabi Rock · 2026", tag: "RAW", tagBg: "#993c1d", bg: ["#2a1a1a", "#5a3030"], emoji: "🎸" },
];

const STATS = [
  { icon: "♪", value: "10M+", label: "Streams" },
  { icon: "♟", value: "150+", label: "Artists" },
  { icon: "◉", value: "50+", label: "Countries" },
];

function BeatCard({ card }: { card: (typeof COL1)[0] }) {
  return (
    <div
      style={{
        borderRadius: 12,
        overflow: "hidden",
        background: card.bg[0],
        flexShrink: 0,
        width: "100%",
      }}
    >
      <div
        style={{
          width: "100%",
          aspectRatio: "1/1",
          background: `linear-gradient(135deg, ${card.bg[0]}, ${card.bg[1]})`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 38,
          position: "relative",
        }}
      >
        {card.emoji}
        <div
          style={{
            position: "absolute",
            top: 7,
            left: 7,
            background: card.tagBg,
            color: "#fff",
            fontSize: 8,
            fontWeight: 800,
            padding: "2px 6px",
            borderRadius: 4,
            letterSpacing: 0.8,
            textTransform: "uppercase",
          }}
        >
          {card.tag}
        </div>
      </div>
      <div
        style={{
          padding: "7px 9px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          background: "rgba(0,0,0,0.6)",
          gap: 6,
        }}
      >
        <div style={{ minWidth: 0 }}>
          <div style={{ color: "#fff", fontSize: 11, fontWeight: 700, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", lineHeight: 1.2 }}>
            {card.artist}
          </div>
          <div style={{ color: "rgba(255,255,255,0.55)", fontSize: 9, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
            {card.title}
          </div>
          <div style={{ color: "rgba(255,255,255,0.32)", fontSize: 8 }}>{card.genre}</div>
        </div>
        <button
          aria-label={`Play ${card.title}`}
          style={{
            width: 26,
            height: 26,
            borderRadius: "50%",
            background: "#fff",
            border: "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            flexShrink: 0,
            fontSize: 9,
            color: "#000",
          }}
        >
          ▶
        </button>
      </div>
    </div>
  );
}

const scrollUpKeyframes = `
  @keyframes scrollUp {
    0% { transform: translateY(0); }
    100% { transform: translateY(-50%); }
  }
  @keyframes scrollDown {
    0% { transform: translateY(-50%); }
    100% { transform: translateY(0); }
  }
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(22px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

export default function BeatstarsHero() {
  const styleRef = useRef<HTMLStyleElement | null>(null);

  useEffect(() => {
    const el = document.createElement("style");
    el.textContent = scrollUpKeyframes;
    document.head.appendChild(el);
    styleRef.current = el;
    return () => { el.remove(); };
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0d0d0f",
        display: "flex",
        alignItems: "center",
        padding: "40px 48px",
        gap: 48,
        position: "relative",
        overflow: "hidden",
        fontFamily: "'Segoe UI', system-ui, sans-serif",
      }}
    >
      {/* Ambient glow */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(ellipse 55% 50% at 72% 50%, rgba(232,197,71,0.08) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      {/* LEFT */}
      <div
        style={{
          flex: "0 0 auto",
          maxWidth: 440,
          zIndex: 2,
          animation: "fadeUp 0.7s ease both",
        }}
      >
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            background: "rgba(232,197,71,0.1)",
            border: "1px solid rgba(232,197,71,0.28)",
            borderRadius: 20,
            padding: "3px 12px",
            fontSize: 12,
            color: "#e8c547",
            fontWeight: 600,
            marginBottom: 22,
            letterSpacing: 0.4,
          }}
        >
          #Madeonbeatstars
        </div>

        <h1
          style={{
            fontSize: "clamp(30px, 4vw, 54px)",
            fontWeight: 800,
            color: "#fff",
            lineHeight: 1.08,
            margin: "0 0 16px",
            letterSpacing: -1,
          }}
        >
          Yes that beat was<br />
          bought on <span style={{ color: "#e8c547" }}>Beatstars.</span>
        </h1>

        <p
          style={{
            fontSize: 14,
            color: "rgba(255,255,255,0.45)",
            margin: "0 0 36px",
            fontStyle: "italic",
            lineHeight: 1.65,
          }}
        >
          ~Thousands of artists are building hits with Prabh Musik
        </p>

        <div style={{ display: "flex", gap: 36, marginBottom: 44 }}>
          {STATS.map((s, i) => (
            <div
              key={i}
              style={{ animation: `fadeUp 0.6s ease ${0.3 + i * 0.1}s both` }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 3 }}>
                <span style={{ fontSize: 16, color: "#e8c547" }}>{s.icon}</span>
                <span style={{ fontSize: 20, fontWeight: 800, color: "#fff" }}>{s.value}</span>
              </div>
              <div style={{ fontSize: 9, color: "rgba(255,255,255,0.35)", textTransform: "uppercase", letterSpacing: 1.3, fontWeight: 600 }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>

        <button
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            background: "transparent",
            border: "1.5px solid rgba(255,255,255,0.2)",
            borderRadius: 8,
            color: "#fff",
            fontSize: 14,
            fontWeight: 600,
            padding: "11px 22px",
            cursor: "pointer",
            letterSpacing: 0.3,
            transition: "border-color 0.2s, color 0.2s",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.borderColor = "#e8c547";
            (e.currentTarget as HTMLElement).style.color = "#e8c547";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.2)";
            (e.currentTarget as HTMLElement).style.color = "#fff";
          }}
        >
          Browse beats →
        </button>
      </div>

      {/* RIGHT: two scrolling lanes */}
      <div
        style={{
          flex: 1,
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "stretch",
          gap: 12,
          zIndex: 2,
          height: 440,
          overflow: "hidden",
          maskImage: "linear-gradient(to bottom, transparent 0%, black 12%, black 88%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 12%, black 88%, transparent 100%)",
        }}
      >
        {/* Column 1 — scrolls UP, tilted right */}
        <div style={{ width: 160, overflow: "hidden", flexShrink: 0, transform: "rotate(8deg)", transformOrigin: "center center" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 12,
              animation: "scrollUp 10s linear infinite",
            }}
          >
            {[...COL1, ...COL1].map((card, i) => (
              <BeatCard key={i} card={card} />
            ))}
          </div>
        </div>

        {/* Column 2 — scrolls DOWN, tilted right */}
        <div style={{ width: 160, overflow: "hidden", flexShrink: 0, transform: "rotate(8deg)", transformOrigin: "center center" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 12,
              animation: "scrollDown 10s linear infinite",
            }}
          >
            {[...COL2, ...COL2].map((card, i) => (
              <BeatCard key={i} card={card} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}