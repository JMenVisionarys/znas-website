"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap-config";
import { workContent } from "@/data/content";
import SectionLabel from "@/components/ui/SectionLabel";
import PillTag from "@/components/ui/PillTag";

export default function Work() {
  const sectionRef = useRef<HTMLElement>(null);
  const rowsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    rowsRef.current.forEach((row) => {
      if (!row) return;
      gsap.from(row, {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: row,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });
    });
  }, []);

  return (
    <section
      id="work"
      ref={sectionRef}
      className="section-padding"
      style={{ backgroundColor: "var(--color-bg-primary)" }}
    >
      <div className="container">
        <SectionLabel number={workContent.number} label={workContent.label} />

        <div>
          {workContent.projects.map((project, i) => (
            <div
              key={i}
              ref={(el) => {
                if (el) rowsRef.current[i] = el;
              }}
              className="work-row px-4 md:px-6"
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-heading work-title">{project.title}</h3>
                <span className="work-arrow text-2xl">→</span>
              </div>
              <p
                className="text-small mb-3"
                style={{ color: "var(--color-text-secondary)" }}
              >
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <PillTag key={tag} label={tag} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
