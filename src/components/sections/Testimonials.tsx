"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap-config";
import { testimonialsContent } from "@/data/content";
import SectionLabel from "@/components/ui/SectionLabel";

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const quoteRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const quotes = testimonialsContent.quotes;

  useEffect(() => {
    if (!sectionRef.current) return;
    gsap.from(sectionRef.current.querySelectorAll(".reveal-up"), {
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
  }, []);

  useEffect(() => {
    if (!quoteRef.current) return;
    gsap.from(quoteRef.current, {
      opacity: 0,
      y: 20,
      duration: 0.6,
      ease: "power3.out",
    });
  }, [activeIndex]);

  const quote = quotes[activeIndex];

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className="section-padding"
      style={{ backgroundColor: "var(--color-bg-void)" }}
    >
      <div className="container">
        <SectionLabel
          number={testimonialsContent.number}
          label={testimonialsContent.label}
        />

        <div className="max-w-4xl mx-auto text-center">
          {/* Decorative quote mark */}
          <div
            className="reveal-up select-none"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(6rem, 12vw, 12rem)",
              lineHeight: 0.6,
              color: "var(--color-text-ghost)",
            }}
          >
            &ldquo;
          </div>

          <div ref={quoteRef} className="mt-4">
            <blockquote
              className="text-display reveal-up"
              style={{
                fontFamily: "var(--font-display)",
                fontStyle: "italic",
                fontWeight: 400,
              }}
            >
              {quote.text}
            </blockquote>

            <p
              className="mt-8 text-micro reveal-up"
              style={{ color: "var(--color-text-tertiary)" }}
            >
              — {quote.author}, {quote.role}
            </p>
          </div>

          {/* Dot pagination */}
          {quotes.length > 1 && (
            <div className="flex justify-center gap-3 mt-12 reveal-up">
              {quotes.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  className="w-2 h-2 rounded-full transition-colors duration-300"
                  style={{
                    backgroundColor:
                      i === activeIndex
                        ? "var(--color-accent)"
                        : "var(--color-text-ghost)",
                  }}
                  aria-label={`Quote ${i + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
