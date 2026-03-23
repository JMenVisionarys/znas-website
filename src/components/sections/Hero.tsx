"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap-config";
import { heroContent } from "@/data/content";

interface HeroProps {
  preloaderDone: boolean;
}

export default function Hero({ preloaderDone }: HeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const wordsRef = useRef<HTMLSpanElement[]>([]);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!preloaderDone) return;

    const tl = gsap.timeline({ delay: 0.1 });

    tl.from(wordsRef.current, {
      yPercent: 110,
      duration: 1,
      ease: "power3.out",
      stagger: 0.04,
    })
      .from(
        subtitleRef.current,
        {
          y: 30,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
        },
        "-=0.4"
      )
      .from(
        ctaRef.current,
        {
          y: 20,
          opacity: 0,
          duration: 0.6,
          ease: "power3.out",
        },
        "-=0.3"
      );
  }, [preloaderDone]);

  useEffect(() => {
    if (!glowRef.current) return;
    gsap.to(glowRef.current, {
      x: "random(-80, 80)",
      y: "random(-60, 60)",
      duration: 20,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen flex items-center overflow-hidden"
      style={{ backgroundColor: "var(--color-bg-void)" }}
    >
      {/* Glow */}
      <div
        ref={glowRef}
        className="absolute pointer-events-none"
        style={{
          width: "60vw",
          height: "60vh",
          left: "20%",
          top: "20%",
          background:
            "radial-gradient(circle, rgba(79,156,247,0.05) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      <div className="container relative z-10">
        <h1 className="text-hero">
          {heroContent.headline.map((word, i) => (
            <span key={i} className="block overflow-hidden">
              <span
                ref={(el) => {
                  if (el) wordsRef.current[i] = el;
                }}
                className="inline-block"
              >
                {word}
              </span>
            </span>
          ))}
        </h1>

        <p
          ref={subtitleRef}
          className="text-body mt-8 max-w-xl"
          style={{ color: "var(--color-text-secondary)" }}
        >
          {heroContent.subtitle}
        </p>

        <div
          ref={ctaRef}
          className="mt-12 flex items-center gap-3"
          style={{ color: "var(--color-text-tertiary)" }}
        >
          <span className="text-micro">{heroContent.scrollCta}</span>
          <span className="animate-bounce text-sm">↓</span>
        </div>
      </div>
    </section>
  );
}
