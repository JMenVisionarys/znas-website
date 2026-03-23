"use client";

interface PillTagProps {
  label: string;
}

export default function PillTag({ label }: PillTagProps) {
  return <span className="pill-tag">{label}</span>;
}
