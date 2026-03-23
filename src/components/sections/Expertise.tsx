"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap-config";
import { ScrollTrigger } from "@/lib/gsap-config";
import { expertiseContent } from "@/data/content";
import SectionLabel from "@/components/ui/SectionLabel";
import PillTag from "@/components/ui/PillTag";

export default function Expertise() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinContainerRef = useRef<HTMLDivElement>(null);
  const [activePillar, setActivePillar] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const pillarsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const mobile = window.matchMedia("(max-width: 768px)").matches;
    setIsMobile(mobile);

    if (mobile) {
      // Stacked cards animation on mobile
      pillarsRef.current.forEach((el) => {
        if (!el) return;
        gsap.from(el, {
          y: 60,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        });
      });
      return;
    }

    // Desktop pinned section
    const pillars = expertiseContent.pillars;
    const numPillars = pillars.length;

    const st = ScrollTrigger.create({
      trigger: pinContainerRef.current,
      pin: true,
      scrub: 1,
      start: "top top",
      end: `+=${numPillars * 100}vh`,
      onUpdate: (self) => {
        const progress = self.progress;
        const index = Math.min(
          Math.floor(progress * numPillars),
          numPillars - 1
        );
        setActivePillar(index);
      },
    });

    return () => {
      st.kill();
    };
  }, []);

  const pillar = expertiseContent.pillars[activePillar];

  return (
    <section
      id="expertise"
      ref={sectionRef}
      className="section-padding"
      style={{ backgroundColor: "var(--color-bg-primary)" }}
    >
      <div className="container">
        <SectionLabel
          number={expertiseContent.number}
          label={expertiseContent.label}
        />

        {isMobile ? (
          // Mobile: stacked cards
          <div className="flex flex-col gap-12">
            {expertiseContent.pillars.map((p, i) => (
              <div
                key={p.id}
                ref={(el) => {
                  if (el) pillarsRef.current[i] = el;
                }}
                className="p-6 rounded-lg"
                style={{
                  backgroundColor: "var(--color-bg-elevated)",
                  border: "1px solid var(--color-border)",
                }}
              >
                <div
                  className="text-hero font-bold mb-4"
                  style={{
                    color: "var(--color-text-ghost)",
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(4rem, 8vw, 6rem)",
                    lineHeight: 1,
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </div>
                <h3 className="text-display mb-4">{p.title}</h3>
                <p
                  className="text-body mb-6"
                  style={{ color: "var(--color-text-secondary)" }}
                >
                  {p.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {p.tags.map((tag) => (
                    <PillTag key={tag} label={tag} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          // Desktop: pinned
          <div ref={pinContainerRef} className="h-screen flex items-center">
            <div className="flex w-full gap-12">
              {/* Left nav dots */}
              <div className="flex flex-col items-center justify-center gap-4 w-[5%]">
                {expertiseContent.pillars.map((_, i) => (
                  <div
                    key={i}
                    className="w-2.5 h-2.5 rounded-full transition-colors duration-300"
                    style={{
                      backgroundColor:
                        i === activePillar
                          ? "var(--color-accent)"
                          : "var(--color-text-ghost)",
                    }}
                  />
                ))}
              </div>

              {/* Right content */}
              <div className="flex-1 relative">
                <div
                  className="absolute -top-8 -left-4 pointer-events-none select-none"
                  style={{
                    color: "var(--color-text-ghost)",
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(8rem, 15vw, 16rem)",
                    fontWeight: 700,
                    lineHeight: 1,
                  }}
                >
                  {String(activePillar + 1).padStart(2, "0")}
                </div>

                <div className="relative z-10 pt-16">
                  <h3 className="text-display mb-6">{pillar.title}</h3>
                  <p
                    className="text-body mb-8 max-w-2xl"
                    style={{ color: "var(--color-text-secondary)" }}
                  >
                    {pillar.description}
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {pillar.tags.map((tag) => (
                      <PillTag key={tag} label={tag} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
