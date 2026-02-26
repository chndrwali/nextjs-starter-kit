"use client";

import { useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import gsap from "gsap";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const numbersRef = useRef<HTMLDivElement>(null);
  const glitchRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);
  const scanlineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // ── Scanline sweep ──
      tl.fromTo(
        scanlineRef.current,
        { y: "-100%" },
        { y: "100%", duration: 0.8, ease: "power1.inOut" },
      );

      // ── 404 digits stagger in ──
      const digits = numbersRef.current?.querySelectorAll(".digit");
      if (digits) {
        tl.fromTo(
          digits,
          { y: 120, opacity: 0, rotateX: -90, scale: 0.5 },
          {
            y: 0,
            opacity: 1,
            rotateX: 0,
            scale: 1,
            duration: 0.7,
            ease: "back.out(1.7)",
            stagger: 0.15,
          },
          "-=0.3",
        );
      }

      // ── Glitch effect on 404 ──
      const glitchTl = gsap.timeline({ repeat: -1, repeatDelay: 3 });
      if (glitchRef.current) {
        glitchTl
          .to(glitchRef.current, {
            x: -4,
            skewX: 2,
            duration: 0.05,
            ease: "power4.inOut",
          })
          .to(glitchRef.current, {
            x: 4,
            skewX: -2,
            duration: 0.05,
            ease: "power4.inOut",
          })
          .to(glitchRef.current, {
            x: -2,
            skewX: 0,
            duration: 0.05,
            ease: "power4.inOut",
          })
          .to(glitchRef.current, {
            x: 0,
            skewX: 0,
            duration: 0.05,
            ease: "power4.inOut",
          })
          .to(glitchRef.current, {
            opacity: 0.7,
            duration: 0.03,
          })
          .to(glitchRef.current, {
            opacity: 1,
            duration: 0.03,
          });
      }

      // ── Content fade in ──
      tl.fromTo(
        contentRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" },
        "-=0.2",
      );

      // ── Floating particles ──
      const particles = particlesRef.current?.querySelectorAll(
        ".not-found-particle",
      );
      if (particles) {
        particles.forEach((p, i) => {
          const size = gsap.utils.random(2, 6);
          const startX = gsap.utils.random(0, window.innerWidth);
          const startY = gsap.utils.random(0, window.innerHeight);

          gsap.set(p, {
            width: size,
            height: size,
            x: startX,
            y: startY,
            opacity: 0,
          });

          gsap.to(p, {
            y: startY - gsap.utils.random(200, 500),
            x: startX + gsap.utils.random(-80, 80),
            opacity: gsap.utils.random(0.15, 0.5),
            duration: gsap.utils.random(5, 12),
            ease: "none",
            repeat: -1,
            delay: i * 0.4,
            onRepeat: function () {
              gsap.set(p, {
                y: window.innerHeight + 20,
                x: gsap.utils.random(0, window.innerWidth),
              });
            },
          });
        });
      }

      // ── Pulse ring behind 404 ──
      const rings = containerRef.current?.querySelectorAll(".pulse-ring");
      if (rings) {
        rings.forEach((ring, i) => {
          gsap.fromTo(
            ring,
            { scale: 0.8, opacity: 0.3 },
            {
              scale: 1.5 + i * 0.3,
              opacity: 0,
              duration: 2.5,
              ease: "power1.out",
              repeat: -1,
              delay: i * 0.8,
            },
          );
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-background"
    >
      {/* ── Floating particles ── */}
      <div
        ref={particlesRef}
        className="pointer-events-none absolute inset-0 z-0"
      >
        {Array.from({ length: 25 }).map((_, i) => (
          <div
            key={i}
            className="not-found-particle absolute rounded-full"
            style={{
              backgroundColor:
                i % 3 === 0
                  ? "var(--primary)"
                  : i % 3 === 1
                    ? "var(--accent)"
                    : "var(--muted-foreground)",
            }}
          />
        ))}
      </div>

      {/* ── Scanline effect ── */}
      <div
        ref={scanlineRef}
        className="pointer-events-none absolute inset-x-0 top-0 z-10 h-1"
        style={{
          background:
            "linear-gradient(to bottom, transparent, var(--primary), transparent)",
          boxShadow: "0 0 20px var(--primary), 0 0 60px var(--primary)",
        }}
      />

      {/* ── Grid background ── */}
      <div className="pointer-events-none absolute inset-0 z-0 opacity-[0.04]">
        {Array.from({ length: 10 }).map((_, i) => (
          <div
            key={`h-${i}`}
            className="absolute left-0 w-full border-t border-foreground"
            style={{ top: `${(i + 1) * 10}%` }}
          />
        ))}
        {Array.from({ length: 10 }).map((_, i) => (
          <div
            key={`v-${i}`}
            className="absolute top-0 h-full border-l border-foreground"
            style={{ left: `${(i + 1) * 10}%` }}
          />
        ))}
      </div>

      {/* ── Main content ── */}
      <div className="relative z-20 flex flex-col items-center text-center">
        {/* Pulse rings */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="pulse-ring absolute -inset-16 rounded-full border-2"
              style={{ borderColor: "var(--primary)", opacity: 0.2 }}
            />
          ))}
        </div>

        {/* 404 number */}
        <div ref={glitchRef} className="relative">
          <div ref={numbersRef} className="flex items-center gap-2">
            {["4", "0", "4"].map((d, i) => (
              <span
                key={i}
                className="digit inline-block text-[10rem] font-black leading-none tracking-tighter sm:text-[14rem]"
                style={{
                  background:
                    "linear-gradient(180deg, var(--foreground) 0%, var(--primary) 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  perspective: "800px",
                }}
              >
                {d}
              </span>
            ))}
          </div>

          {/* Glitch overlay clone */}
          <div
            className="pointer-events-none absolute inset-0 flex items-center gap-2 opacity-0"
            style={{ clipPath: "inset(30% 0 30% 0)" }}
            aria-hidden
          >
            {["4", "0", "4"].map((d, i) => (
              <span
                key={i}
                className="inline-block text-[10rem] font-black leading-none tracking-tighter sm:text-[14rem]"
                style={{ color: "var(--primary)", opacity: 0.3 }}
              >
                {d}
              </span>
            ))}
          </div>
        </div>

        {/* Text + buttons */}
        <div ref={contentRef} className="mt-4 space-y-4 opacity-0">
          <h2 className="text-2xl font-bold">Halaman Tidak Ditemukan</h2>
          <p className="max-w-md text-muted-foreground">
            Maaf, halaman yang kamu cari tidak ada atau sudah dipindahkan.
          </p>
          <div className="flex justify-center gap-3 pt-4">
            <Button onClick={() => router.back()} variant="default" size="lg">
              Kembali
            </Button>
            <Button
              onClick={() => router.push("/")}
              variant="outline"
              size="lg"
            >
              Beranda
            </Button>
          </div>
        </div>
      </div>

      {/* ── Noise texture ── */}
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "128px 128px",
        }}
      />
    </div>
  );
}
