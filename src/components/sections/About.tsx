"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap-config";
import { ScrollTrigger } from "@/lib/gsap-config";
import { aboutContent } from "@/data/content";
import SectionLabel from "@/components/ui/SectionLabel";

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!contentRef.current) return;
    const els = contentRef.current.querySelectorAll(".reveal-up");

    gsap.from(els, {
      y: 60,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
      stagger: 0.1,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 70%",
        toggleActions: "play none none none",
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === sectionRef.current) t.kill();
      });
    };
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="section-padding"
      style={{ backgroundColor: "var(--color-bg-primary)" }}
    >
      <div className="container">
        <SectionLabel number={aboutContent.number} label={aboutContent.label} />

        <div ref={contentRef} className="grid grid-cols-1 md:grid-cols-5 gap-12 md:gap-16">
          <div className="md:col-span-3">
            <h2 className="text-display reveal-up">
              {aboutContent.statement}
            </h2>
          </div>
          <div className="md:col-span-2 flex flex-col gap-6">
            {aboutContent.paragraphs.map((p, i) => (
              <p
                key={i}
                className="text-body reveal-up"
                style={{
                  color: "var(--color-text-secondary)",
                  maxWidth: "55ch",
                }}
              >
                {p}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
