"use client";

interface SectionLabelProps {
  number: string;
  label: string;
}

export default function SectionLabel({ number, label }: SectionLabelProps) {
  return (
    <div className="flex items-center gap-4 mb-16">
      <span className="text-micro" style={{ color: "var(--color-accent)" }}>
        {number}
      </span>
      <span className="text-micro" style={{ color: "var(--color-text-tertiary)" }}>
        — {label}
      </span>
      <div
        className="flex-1 h-px"
        style={{ backgroundColor: "var(--color-border)" }}
      />
    </div>
  );
}
