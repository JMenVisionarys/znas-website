# B3 — Mobile & UI Polish Changes

## Theme Toggle Button (Navigation.tsx)
- Font size: 0.7rem -> 1rem (larger icon)
- Padding: 0.25rem 0.5rem -> 0.5rem 0.65rem
- Added minWidth: 36px, minHeight: 36px (exceeds 24x24 requirement)
- Added display: inline-flex, alignItems/justifyContent: center

## Mobile CSS Fixes (globals.css)
- Added @media (max-width: 390px) rule:
  - .blueprint-card padding reduced to 1.25rem (prevents overflow with 6 cards)
  - .stat-cell padding tightened to 1rem (fits 2-column grid on narrow screens)
