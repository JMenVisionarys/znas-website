"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap-config";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only show on devices with a fine pointer
    const hasFinePointer = window.matchMedia("(pointer: fine)").matches;
    if (!hasFinePointer) return;

    const cursor = cursorRef.current;
    if (!cursor) return;

    cursor.style.display = "block";

    const xTo = gsap.quickTo(cursor, "left", {
      duration: 0.4,
      ease: "power3.out",
    });
    const yTo = gsap.quickTo(cursor, "top", {
      duration: 0.4,
      ease: "power3.out",
    });

    const handleMove = (e: MouseEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
    };

    const handleEnter = () => cursor.classList.add("is-active");
    const handleLeave = () => cursor.classList.remove("is-active");

    window.addEventListener("mousemove", handleMove);

    const interactiveSelector =
      "a, button, [role='button'], input, textarea, select";

    const addListeners = () => {
      document.querySelectorAll(interactiveSelector).forEach((el) => {
        el.addEventListener("mouseenter", handleEnter);
        el.addEventListener("mouseleave", handleLeave);
      });
    };

    addListeners();

    // Re-attach on DOM changes
    const observer = new MutationObserver(addListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", handleMove);
      observer.disconnect();
    };
  }, []);

  return (
    <div ref={cursorRef} className="cursor-dot" style={{ display: "none" }} />
  );
}
