"use client";

import { gsap } from "@/lib/gsap-config";

export const EASE_REVEAL = "power3.out";
export const EASE_LINE_DRAW = "power2.inOut";
export const EASE_SCALE_IN = "back.out(1.7)";

export function revealUp(
  targets: gsap.TweenTarget,
  options?: { stagger?: number; delay?: number; duration?: number }
) {
  return gsap.from(targets, {
    y: 60,
    opacity: 0,
    duration: options?.duration ?? 1,
    ease: EASE_REVEAL,
    stagger: options?.stagger ?? 0.1,
    delay: options?.delay ?? 0,
  });
}

export function wordReveal(
  targets: gsap.TweenTarget,
  options?: { stagger?: number; delay?: number }
) {
  return gsap.from(targets, {
    yPercent: 110,
    duration: 1,
    ease: EASE_REVEAL,
    stagger: options?.stagger ?? 0.04,
    delay: options?.delay ?? 0,
  });
}

export function fadeIn(
  targets: gsap.TweenTarget,
  options?: { delay?: number; duration?: number }
) {
  return gsap.from(targets, {
    opacity: 0,
    duration: options?.duration ?? 0.8,
    ease: EASE_REVEAL,
    delay: options?.delay ?? 0,
  });
}

export function scaleIn(
  targets: gsap.TweenTarget,
  options?: { delay?: number }
) {
  return gsap.from(targets, {
    scale: 0,
    duration: 0.6,
    ease: EASE_SCALE_IN,
    delay: options?.delay ?? 0,
  });
}
