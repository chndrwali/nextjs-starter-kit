"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";

type AuthLayoutProps = {
  children: React.ReactNode;
};

export const AuthLayout = ({ children }: AuthLayoutProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const blobsRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ── Floating blobs animation ──
      const blobs = blobsRef.current?.querySelectorAll(".auth-blob");
      if (blobs) {
        blobs.forEach((blob, i) => {
          gsap.set(blob, {
            x: gsap.utils.random(-100, 100),
            y: gsap.utils.random(-100, 100),
            scale: gsap.utils.random(0.8, 1.2),
          });
          gsap.to(blob, {
            x: `+=${gsap.utils.random(-200, 200)}`,
            y: `+=${gsap.utils.random(-200, 200)}`,
            scale: gsap.utils.random(0.6, 1.4),
            rotation: gsap.utils.random(-30, 30),
            duration: gsap.utils.random(8, 15),
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true,
            delay: i * 0.5,
          });
        });
      }

      // ── Grid lines pulse ──
      const gridLines = gridRef.current?.querySelectorAll(".grid-line");
      if (gridLines) {
        gridLines.forEach((line, i) => {
          gsap.fromTo(
            line,
            { opacity: 0.03 },
            {
              opacity: 0.12,
              duration: gsap.utils.random(2, 4),
              ease: "sine.inOut",
              repeat: -1,
              yoyo: true,
              delay: i * 0.3,
            },
          );
        });
      }

      // ── Floating particles ──
      const particles =
        particlesRef.current?.querySelectorAll(".auth-particle");
      if (particles) {
        particles.forEach((particle, i) => {
          const startX = gsap.utils.random(0, window.innerWidth);
          const startY = gsap.utils.random(0, window.innerHeight);
          gsap.set(particle, { x: startX, y: startY, opacity: 0 });

          gsap.to(particle, {
            y: startY - gsap.utils.random(200, 600),
            x: startX + gsap.utils.random(-100, 100),
            opacity: gsap.utils.random(0.2, 0.6),
            duration: gsap.utils.random(6, 14),
            ease: "none",
            repeat: -1,
            delay: i * 0.8,
            onRepeat: function () {
              gsap.set(particle, {
                y: window.innerHeight + 20,
                x: gsap.utils.random(0, window.innerWidth),
              });
            },
          });
        });
      }

      // ── Form entrance animation ──
      gsap.fromTo(
        formRef.current,
        { y: 40, opacity: 0, scale: 0.96 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: "power3.out",
          delay: 0.2,
        },
      );

      // ── Corner accents animation ──
      const accents = containerRef.current?.querySelectorAll(".corner-accent");
      if (accents) {
        gsap.fromTo(
          accents,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 0.6,
            ease: "power2.out",
            stagger: 0.15,
            delay: 0.5,
          },
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen w-full overflow-hidden bg-background flex items-center justify-center"
    >
      {/* ── Animated gradient blobs ── */}
      <div ref={blobsRef} className="pointer-events-none absolute inset-0 z-0">
        <div
          className="auth-blob absolute -top-32 -left-32 h-[500px] w-[500px] rounded-full opacity-20"
          style={{
            background:
              "radial-gradient(circle, var(--primary) 0%, transparent 70%)",
          }}
        />
        <div
          className="auth-blob absolute -bottom-40 -right-40 h-[600px] w-[600px] rounded-full opacity-15"
          style={{
            background:
              "radial-gradient(circle, var(--accent) 0%, transparent 70%)",
          }}
        />
        <div
          className="auth-blob absolute top-1/3 right-1/4 h-[350px] w-[350px] rounded-full opacity-10"
          style={{
            background:
              "radial-gradient(circle, var(--secondary) 0%, transparent 70%)",
          }}
        />
        <div
          className="auth-blob absolute bottom-1/4 left-1/3 h-[300px] w-[300px] rounded-full opacity-10"
          style={{
            background:
              "radial-gradient(circle, var(--chart-5) 0%, transparent 70%)",
          }}
        />
      </div>

      {/* ── Grid pattern overlay ── */}
      <div ref={gridRef} className="pointer-events-none absolute inset-0 z-0">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={`h-${i}`}
            className="grid-line absolute left-0 w-full border-t border-foreground"
            style={{
              top: `${(i + 1) * 8}%`,
              opacity: 0.03,
            }}
          />
        ))}
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={`v-${i}`}
            className="grid-line absolute top-0 h-full border-l border-foreground"
            style={{
              left: `${(i + 1) * 8}%`,
              opacity: 0.03,
            }}
          />
        ))}
      </div>

      {/* ── Floating particles ── */}
      <div
        ref={particlesRef}
        className="pointer-events-none absolute inset-0 z-0"
      >
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={`p-${i}`}
            className="auth-particle absolute h-1 w-1 rounded-full"
            style={{
              backgroundColor:
                i % 3 === 0
                  ? "var(--primary)"
                  : i % 3 === 1
                    ? "var(--accent)"
                    : "var(--secondary)",
            }}
          />
        ))}
      </div>

      {/* ── Corner decorative accents ── */}
      <div className="pointer-events-none absolute inset-0 z-0 p-6">
        <div
          className="corner-accent absolute top-6 left-6 h-1 w-20 origin-left"
          style={{ backgroundColor: "var(--primary)" }}
        />
        <div
          className="corner-accent absolute top-6 left-6 h-20 w-1 origin-top"
          style={{ backgroundColor: "var(--primary)" }}
        />
        <div
          className="corner-accent absolute top-6 right-6 h-1 w-20 origin-right"
          style={{ backgroundColor: "var(--accent)" }}
        />
        <div
          className="corner-accent absolute top-6 right-6 h-20 w-1 origin-top"
          style={{ backgroundColor: "var(--accent)" }}
        />
        <div
          className="corner-accent absolute bottom-6 left-6 h-1 w-20 origin-left"
          style={{ backgroundColor: "var(--accent)" }}
        />
        <div
          className="corner-accent absolute bottom-6 left-6 h-20 w-1 origin-bottom"
          style={{ backgroundColor: "var(--accent)" }}
        />
        <div
          className="corner-accent absolute bottom-6 right-6 h-1 w-20 origin-right"
          style={{ backgroundColor: "var(--primary)" }}
        />
        <div
          className="corner-accent absolute bottom-6 right-6 h-20 w-1 origin-bottom"
          style={{ backgroundColor: "var(--primary)" }}
        />
      </div>

      {/* ── Noise texture overlay ── */}
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "128px 128px",
        }}
      />

      {/* ── Form content ── */}
      <div
        ref={formRef}
        className="relative z-10 w-full max-w-lg px-4 opacity-0"
      >
        {children}
      </div>
    </div>
  );
};
