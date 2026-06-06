'use client';
import { useState, useEffect, useRef } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────
interface StatItem {
  icon: string;
  value: string;
  label: string;
}

interface ServiceItem {
  icon: string;
  title: string;
  desc: string;
}

interface StepItem {
  num: string;
  title: string;
  desc: string;
}

// ─── Hooks ────────────────────────────────────────────────────────────────────
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

// ─── Reveal wrapper ───────────────────────────────────────────────────────────
function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const { ref, inView } = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(40px)",
        transition: `opacity 0.85s cubic-bezier(.16,1,.3,1) ${delay}ms, transform 0.85s cubic-bezier(.16,1,.3,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const SERVICES: ServiceItem[] = [
  {
    icon: "🎧",
    title: "Music Production",
    desc: "Custom production tailored to your artistic identity.",
  },
  {
    icon: "🎛",
    title: "Mixing & Mastering",
    desc: "Industry-standard sound that translates everywhere.",
  },
  {
    icon: "💡",
    title: "Creative Direction",
    desc: "Shape your visual and musical identity with clarity and purpose.",
  },
  {
    icon: "📈",
    title: "Artist Development",
    desc: "Guidance, strategy, and growth planning for long-term success.",
  },
];

const STEPS: StepItem[] = [
  {
    num: "01",
    title: "DISCOVER",
    desc: "Understanding your story, influences, and musical direction.",
  },
  {
    num: "02",
    title: "CREATE",
    desc: "Producing, arranging, and bringing your ideas to life with creativity.",
  },
  {
    num: "03",
    title: "PERFECT",
    desc: "Mixing, mastering, and polishing every detail to perfection.",
  },
  {
    num: "04",
    title: "LAUNCH",
    desc: "Release strategy, branding, and growth support to take your music further.",
  },
];

const STATS: StatItem[] = [
  { icon: "★", value: "100%", label: "Commitment to every project" },
  { icon: "∞", value: "UNLIMITED", label: "Creative possibilities" },
  { icon: "◎", value: "1 GOAL", label: "Artist success" },
  { icon: "◈", value: "LONG-TERM", label: "Collaborations built on trust" },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function GoldDivider() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "16px 0" }}>
      <div style={{ width: 40, height: 2, background: "var(--gold)" }} />
      <div style={{ width: 6, height: 6, background: "var(--gold)", transform: "rotate(45deg)" }} />
    </div>
  );
}

function Tag({ children }: { children: string }) {
  return (
    <span
      style={{
        fontFamily: "var(--font-mono)",
        fontSize: 10,
        letterSpacing: "0.22em",
        color: "var(--gold)",
        textTransform: "uppercase",
        display: "block",
        marginBottom: 12,
      }}
    >
      {children}
    </span>
  );
}

// ─── Section 1 – Hero ─────────────────────────────────────────────────────────
function HeroSection() {
  return (
    <section
      style={{
        minHeight: "100vh",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        alignItems: "center",
        gap: 64,
        padding: "120px 80px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Ambient glow */}
      <div
        style={{
          position: "absolute",
          top: -200,
          left: -200,
          width: 700,
          height: 700,
          background: "radial-gradient(circle, rgba(212,160,23,0.08) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />
      {/* Left */}
      <div>
        <Reveal delay={0}>
          <Tag>About Prabh Musik</Tag>
        </Reveal>
        <Reveal delay={100}>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(52px, 7vw, 96px)",
              lineHeight: 0.92,
              letterSpacing: "-0.02em",
              margin: "0 0 24px",
              color: "var(--white)",
            }}
          >
            MUSIC
            <br />
            THAT
            <br />
            CREATES{" "}
            <em
              style={{
                fontStyle: "normal",
                color: "var(--gold)",
                WebkitTextStroke: "0px",
              }}
            >
              IMPACT.
            </em>
          </h1>
        </Reveal>
        <Reveal delay={200}>
          <GoldDivider />
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 16,
              lineHeight: 1.75,
              color: "var(--muted)",
              maxWidth: 420,
              marginBottom: 40,
            }}
          >
            We help artists discover their sound, build their identity, and
            create music that leaves a lasting impression. From production and
            mixing to branding and artist development, every project is
            approached with dedication, creativity, and a vision for long-term
            success.
          </p>
        </Reveal>
        <Reveal delay={300}>
          <button
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "var(--black)",
              background: "var(--gold)",
              border: "none",
              padding: "14px 32px",
              cursor: "pointer",
              position: "relative",
              overflow: "hidden",
              transition: "transform 0.2s",
            }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLButtonElement).style.transform = "scale(1.03)")
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLButtonElement).style.transform = "scale(1)")
            }
          >
            START YOUR JOURNEY
          </button>
        </Reveal>
      </div>

      {/* Right – image placeholder styled as studio photo */}
      <Reveal delay={200}>
        <div
          style={{
            position: "relative",
            aspectRatio: "4/3",
            background:
              "linear-gradient(135deg, #1a1408 0%, #0d0d0d 100%)",
            border: "1px solid rgba(212,160,23,0.18)",
            overflow: "hidden",
          }}
        >
          {/* Corner accents */}
          {[
            { top: 0, left: 0 },
            { top: 0, right: 0 },
            { bottom: 0, left: 0 },
            { bottom: 0, right: 0 },
          ].map((pos, i) => (
            <div
              key={i}
              style={{
                position: "absolute",
                width: 24,
                height: 24,
                borderTop: i < 2 ? "2px solid var(--gold)" : "none",
                borderBottom: i >= 2 ? "2px solid var(--gold)" : "none",
                borderLeft: i % 2 === 0 ? "2px solid var(--gold)" : "none",
                borderRight: i % 2 === 1 ? "2px solid var(--gold)" : "none",
                ...pos,
              }}
            />
          ))}
          {/* Studio ambience overlay */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "radial-gradient(ellipse at 60% 40%, rgba(212,160,23,0.12) 0%, transparent 65%)",
            }}
          />
          {/* Icon placeholder */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 12,
            }}
          >
            <div
              style={{
                fontSize: 56,
                opacity: 0.2,
              }}
            >
              🎹
            </div>
            <p
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 10,
                letterSpacing: "0.2em",
                color: "rgba(212,160,23,0.4)",
                textTransform: "uppercase",
              }}
            >
              Studio · Prabh Musik
            </p>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

// ─── Section 2 – Vision ───────────────────────────────────────────────────────
function VisionSection() {
  return (
    <section
      style={{
        padding: "100px 80px",
        display: "grid",
        gridTemplateColumns: "auto 1fr",
        gap: 80,
        alignItems: "center",
        borderTop: "1px solid rgba(255,255,255,0.05)",
        borderBottom: "1px solid rgba(255,255,255,0.05)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Gold vertical bar */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          bottom: 0,
          width: 3,
          background: "linear-gradient(to bottom, transparent, var(--gold), transparent)",
        }}
      />
      {/* P Logo */}
      <Reveal delay={0}>
        <div
          style={{
            width: 140,
            height: 140,
            border: "2px solid rgba(212,160,23,0.4)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 8,
              border: "1px solid rgba(212,160,23,0.15)",
            }}
          />
          <span
            style={{
              fontFamily: "var(--font-display)",
              fontSize: 72,
              color: "var(--gold)",
              lineHeight: 1,
            }}
          >
            P
          </span>
        </div>
      </Reveal>

      <div>
        <Reveal delay={0}>
          <Tag>Our Vision</Tag>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(32px, 5vw, 60px)",
              letterSpacing: "-0.01em",
              color: "var(--white)",
              margin: "0 0 8px",
            }}
          >
            MUSIC IS MORE THAN SOUND
          </h2>
          <p
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(14px, 2vw, 18px)",
              letterSpacing: "0.08em",
              color: "var(--gold)",
              textTransform: "uppercase",
              margin: "0 0 24px",
            }}
          >
            Music is Emotion, Identity, and Influence.
          </p>
        </Reveal>
        <Reveal delay={150}>
          <GoldDivider />
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 16,
              lineHeight: 1.8,
              color: "var(--muted)",
              maxWidth: 560,
              marginBottom: 16,
            }}
          >
            At Prabh Musik, every artist is treated as a unique creative voice.
            We focus on understanding their inspirations, style, personality,
            and goals to create music that feels authentic and meaningful.
          </p>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 16,
              lineHeight: 1.8,
              color: "rgba(255,255,255,0.45)",
              maxWidth: 560,
            }}
          >
            The objective isn't simply to make songs. It's to create moments
            people remember.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

// ─── Section 3 – Services ─────────────────────────────────────────────────────
function ServicesSection() {
  return (
    <section style={{ padding: "100px 80px" }}>
      <Reveal>
        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <Tag>What We Do</Tag>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(28px, 4.5vw, 56px)",
              letterSpacing: "-0.01em",
              color: "var(--white)",
              margin: 0,
            }}
          >
            EVERYTHING ARTISTS NEED
            <br />
            UNDER ONE ROOF
          </h2>
          <GoldDivider
            
          />
        </div>
      </Reveal>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 20,
        }}
      >
        {SERVICES.map((s, i) => (
          <Reveal key={s.title} delay={i * 80}>
            <div
              style={{
                border: "1px solid rgba(212,160,23,0.18)",
                padding: "36px 28px",
                background: "rgba(255,255,255,0.02)",
                position: "relative",
                cursor: "default",
                transition: "border-color 0.3s, background 0.3s, transform 0.3s",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLDivElement;
                el.style.borderColor = "rgba(212,160,23,0.6)";
                el.style.background = "rgba(212,160,23,0.05)";
                el.style.transform = "translateY(-6px)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLDivElement;
                el.style.borderColor = "rgba(212,160,23,0.18)";
                el.style.background = "rgba(255,255,255,0.02)";
                el.style.transform = "translateY(0)";
              }}
            >
              {/* Top-left corner accent */}
              <div
                style={{
                  position: "absolute",
                  top: -1,
                  left: -1,
                  width: 16,
                  height: 16,
                  background: "var(--gold)",
                  opacity: 0.6,
                }}
              />
              <div
                style={{
                  width: 52,
                  height: 52,
                  background: "rgba(212,160,23,0.1)",
                  border: "1px solid rgba(212,160,23,0.3)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 22,
                  marginBottom: 20,
                }}
              >
                {s.icon}
              </div>
              <h3
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: 16,
                  letterSpacing: "0.06em",
                  color: "var(--white)",
                  margin: "0 0 12px",
                }}
              >
                {s.title}
              </h3>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 13,
                  lineHeight: 1.7,
                  color: "var(--muted)",
                  margin: 0,
                }}
              >
                {s.desc}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

// ─── Section 4 – Process ──────────────────────────────────────────────────────
function ProcessSection() {
  return (
    <section
      style={{
        padding: "80px 80px 100px",
        background: "rgba(212,160,23,0.02)",
        borderTop: "1px solid rgba(255,255,255,0.04)",
        borderBottom: "1px solid rgba(255,255,255,0.04)",
      }}
    >
      <Reveal>
        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <Tag>Our Process</Tag>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(28px, 4vw, 52px)",
              letterSpacing: "-0.01em",
              color: "var(--white)",
              margin: 0,
            }}
          >
            HOW WE WORK
          </h2>
          <GoldDivider />
        </div>
      </Reveal>

      <div style={{ position: "relative" }}>
        {/* Connector line */}
        <div
          style={{
            position: "absolute",
            top: 36,
            left: "10%",
            right: "10%",
            height: 1,
            background:
              "linear-gradient(to right, transparent, rgba(212,160,23,0.3), rgba(212,160,23,0.3), transparent)",
          }}
        />
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 20,
            position: "relative",
          }}
        >
          {STEPS.map((step, i) => (
            <Reveal key={step.num} delay={i * 100}>
              <div style={{ textAlign: "center", padding: "0 16px" }}>
                <div
                  style={{
                    width: 72,
                    height: 72,
                    border: "2px solid var(--gold)",
                    margin: "0 auto 24px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "var(--black)",
                    position: "relative",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      inset: 4,
                      background: "rgba(212,160,23,0.08)",
                    }}
                  />
                  <span
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: 22,
                      color: "var(--gold)",
                      lineHeight: 1,
                    }}
                  >
                    {step.num}
                  </span>
                </div>
                <h4
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: 15,
                    letterSpacing: "0.1em",
                    color: "var(--white)",
                    margin: "0 0 10px",
                  }}
                >
                  {step.title}
                </h4>
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: 13,
                    lineHeight: 1.7,
                    color: "var(--muted)",
                    margin: 0,
                  }}
                >
                  {step.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Section 5 – Long-term success ───────────────────────────────────────────
function SuccessSection() {
  return (
    <section style={{ padding: "100px 80px" }}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 80,
          alignItems: "center",
          marginBottom: 80,
        }}
      >
        {/* Placeholder concert image */}
        <Reveal delay={0}>
          <div
            style={{
              aspectRatio: "4/3",
              background:
                "linear-gradient(135deg, #1a0a00 0%, #3d1f00 50%, #1a0a00 100%)",
              border: "1px solid rgba(212,160,23,0.2)",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "radial-gradient(ellipse at 50% 30%, rgba(212,100,0,0.35) 0%, transparent 65%)",
              }}
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 10,
              }}
            >
              <div style={{ fontSize: 64, opacity: 0.25 }}>🎤</div>
              <p
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 10,
                  letterSpacing: "0.2em",
                  color: "rgba(212,160,23,0.35)",
                  textTransform: "uppercase",
                }}
              >
                Live · On Stage
              </p>
            </div>
            {/* Film grain overlay */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                backgroundImage:
                  "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.06'/%3E%3C/svg%3E\")",
                opacity: 0.4,
              }}
            />
          </div>
        </Reveal>

        {/* Text */}
        <div>
          <Reveal delay={0}>
            <div
              style={{
                width: 52,
                height: 52,
                background: "rgba(212,160,23,0.1)",
                border: "1px solid rgba(212,160,23,0.3)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 22,
                marginBottom: 24,
              }}
            >
              ◈
            </div>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(30px, 4vw, 52px)",
                letterSpacing: "-0.01em",
                color: "var(--white)",
                margin: "0 0 8px",
                lineHeight: 1.05,
              }}
            >
              BUILT FOR
              <br />
              LONG-TERM SUCCESS
            </h2>
            <p
              style={{
                fontFamily: "var(--font-display)",
                fontSize: 14,
                letterSpacing: "0.1em",
                color: "var(--gold)",
                textTransform: "uppercase",
                margin: "0 0 24px",
              }}
            >
              We Build Careers, Not Just Songs.
            </p>
          </Reveal>
          <Reveal delay={150}>
            <GoldDivider />
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 15,
                lineHeight: 1.85,
                color: "var(--muted)",
                maxWidth: 480,
                marginBottom: 28,
              }}
            >
              For us, success isn't measured by delivering a track. It's
              measured by helping artists build careers. Every project receives
              complete attention, dedication, and creative commitment because
              meaningful music requires more than technical expertise—it
              requires partnership.
            </p>
            <p
              style={{
                fontFamily: "var(--font-display)",
                fontSize: 12,
                letterSpacing: "0.15em",
                color: "var(--gold)",
                textTransform: "uppercase",
              }}
            >
              When Artists Grow, We Grow Together.
            </p>
          </Reveal>
        </div>
      </div>

      {/* Stats row */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 2,
        }}
      >
        {STATS.map((stat, i) => (
          <Reveal key={stat.value} delay={i * 80}>
            <div
              style={{
                border: "1px solid rgba(212,160,23,0.18)",
                padding: "36px 24px",
                textAlign: "center",
                background: "rgba(255,255,255,0.02)",
                transition: "background 0.3s",
              }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLDivElement).style.background =
                  "rgba(212,160,23,0.06)")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLDivElement).style.background =
                  "rgba(255,255,255,0.02)")
              }
            >
              <div
                style={{
                  fontSize: 22,
                  color: "var(--gold)",
                  marginBottom: 12,
                  opacity: 0.7,
                }}
              >
                {stat.icon}
              </div>
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(20px, 2.5vw, 30px)",
                  color: "var(--gold)",
                  letterSpacing: "0.04em",
                  marginBottom: 8,
                }}
              >
                {stat.value}
              </div>
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 10,
                  letterSpacing: "0.18em",
                  color: "var(--muted)",
                  textTransform: "uppercase",
                }}
              >
                {stat.label}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

// ─── Section 6 – Meet Prabh ───────────────────────────────────────────────────
function FounderSection() {
  return (
    <section
      style={{
        padding: "100px 80px",
        borderTop: "1px solid rgba(255,255,255,0.05)",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 80,
          alignItems: "center",
          border: "1px solid rgba(212,160,23,0.15)",
          padding: "72px 64px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* background glow */}
        <div
          style={{
            position: "absolute",
            right: -100,
            top: -100,
            width: 500,
            height: 500,
            background:
              "radial-gradient(circle, rgba(212,160,23,0.06) 0%, transparent 65%)",
            pointerEvents: "none",
          }}
        />

        {/* Left text */}
        <div>
          <Reveal delay={0}>
            <Tag>Founder</Tag>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(40px, 5vw, 68px)",
                letterSpacing: "-0.02em",
                color: "var(--white)",
                margin: "0 0 6px",
              }}
            >
              MEET PRABH
            </h2>
            <p
              style={{
                fontFamily: "var(--font-display)",
                fontSize: 14,
                letterSpacing: "0.12em",
                color: "var(--gold)",
                textTransform: "uppercase",
                marginBottom: 28,
              }}
            >
              Music Producer • Creative Director
            </p>
          </Reveal>
          <Reveal delay={150}>
            <GoldDivider />
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 15,
                lineHeight: 1.85,
                color: "var(--muted)",
                maxWidth: 460,
                marginBottom: 20,
              }}
            >
              I believe every artist deserves a sound that genuinely represents
              who they are. My role is to help transform ideas into records that
              connect emotionally and stand the test of time.
            </p>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 15,
                lineHeight: 1.85,
                color: "rgba(255,255,255,0.4)",
                maxWidth: 460,
                marginBottom: 40,
              }}
            >
              From a simple idea to a global impact—let's build your legacy
              together.
            </p>
            <div
              style={{
                fontFamily: "var(--font-display)",
                fontSize: 42,
                color: "var(--gold)",
                letterSpacing: "0.04em",
              }}
            >
              PRABH
            </div>
          </Reveal>
        </div>

        {/* Right – photo placeholder */}
        <Reveal delay={100}>
          <div
            style={{
              aspectRatio: "3/4",
              background:
                "linear-gradient(160deg, #1c1408 0%, #0d0d0d 100%)",
              border: "1px solid rgba(212,160,23,0.2)",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Warm light on one side */}
            <div
              style={{
                position: "absolute",
                top: 0,
                right: 0,
                width: "60%",
                height: "100%",
                background:
                  "radial-gradient(ellipse at 80% 20%, rgba(212,120,0,0.2) 0%, transparent 60%)",
              }}
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 10,
              }}
            >
              <div style={{ fontSize: 56, opacity: 0.18 }}>🎹</div>
              <p
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 10,
                  letterSpacing: "0.2em",
                  color: "rgba(212,160,23,0.3)",
                  textTransform: "uppercase",
                }}
              >
                Prabh · Studio Portrait
              </p>
            </div>
            {/* Bottom-right gold badge */}
            <div
              style={{
                position: "absolute",
                bottom: 20,
                right: 20,
                width: 56,
                height: 56,
                background: "var(--gold)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: 26,
                  color: "var(--black)",
                  lineHeight: 1,
                }}
              >
                P
              </span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ─── Footer CTA ───────────────────────────────────────────────────────────────
function CTASection() {
  return (
    <section
      style={{
        padding: "80px 80px 100px",
        textAlign: "center",
        borderTop: "1px solid rgba(255,255,255,0.05)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at 50% 100%, rgba(212,160,23,0.07) 0%, transparent 60%)",
          pointerEvents: "none",
        }}
      />
      <Reveal>
        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 10,
            letterSpacing: "0.22em",
            color: "var(--gold)",
            textTransform: "uppercase",
            marginBottom: 24,
          }}
        >
          Ready to Begin?
        </p>
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(36px, 5vw, 72px)",
            letterSpacing: "-0.02em",
            color: "var(--white)",
            margin: "0 0 32px",
            lineHeight: 1,
          }}
        >
          LET'S BUILD YOUR
          <br />
          <span style={{ color: "var(--gold)" }}>LEGACY.</span>
        </h2>
        <button
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "var(--black)",
            background: "var(--gold)",
            border: "none",
            padding: "16px 48px",
            cursor: "pointer",
            transition: "transform 0.2s, box-shadow 0.2s",
          }}
          onMouseEnter={(e) => {
            const b = e.currentTarget as HTMLButtonElement;
            b.style.transform = "scale(1.04)";
            b.style.boxShadow = "0 0 40px rgba(212,160,23,0.35)";
          }}
          onMouseLeave={(e) => {
            const b = e.currentTarget as HTMLButtonElement;
            b.style.transform = "scale(1)";
            b.style.boxShadow = "none";
          }}
        >
          START YOUR JOURNEY
        </button>
      </Reveal>
    </section>
  );
}

// ─── Root ─────────────────────────────────────────────────────────────────────
export default function PrabhMusikAbout() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400&family=Space+Mono:wght@400;700&display=swap');

        :root {
          --gold: #d4a017;
          --gold-light: #f0c040;
          --white: #f5f0e8;
          --black: #0a0a0a;
          --muted: rgba(245,240,232,0.55);
          --font-display: 'Bebas Neue', sans-serif;
          --font-body: 'Cormorant Garamond', serif;
          --font-mono: 'Space Mono', monospace;
        }

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        body {
          background: var(--black);
          color: var(--white);
          -webkit-font-smoothing: antialiased;
        }

        /* Scrollbar */
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #111; }
        ::-webkit-scrollbar-thumb { background: var(--gold); }

        /* Selection */
        ::selection { background: rgba(212,160,23,0.3); color: var(--white); }
      `}</style>

      <div
        style={{
          background: "var(--black)",
          minHeight: "100vh",
          position: "relative",
        }}
      >
        {/* Noise texture overlay */}
        <div
          style={{
            position: "fixed",
            inset: 0,
            pointerEvents: "none",
            zIndex: 9999,
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E\")",
            opacity: 0.5,
          }}
        />

        <HeroSection />
        <VisionSection />
        <ServicesSection />
        <ProcessSection />
        <SuccessSection />
        <FounderSection />
        {/* <CTASection /> */}

        {/* Footer */}
      
      </div>
    </>
  );
}