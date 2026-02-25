## 2026-02-24 - Split Game.js
**Learning:** `game.js` was a "God Component" managing state, UI, and logic. Splitting it into `State`, `Logic`, and `UI` modules improved separation of concerns.
**Action:** Used a `fade-out` -> `hide` -> `show` -> `fade-in` sequence for screen transitions to avoid layout thrashing that would occur with simultaneous cross-fading of elements with different heights.

## 2026-02-25 - Split UI Monolith
**Learning:** `js/modules/ui.js` was handling all UI logic (Screens, Players, GameFlow). Splitting it into `ScreenManager`, `PlayerManager`, and `GameFlow` clarified responsibilities.
**Action:** Implemented a CSS-class based state machine for screens (`active`, `leaving`, `entering`) and utilized `transitionend` events for sequential transitions, replacing brittle `setTimeout` logic while maintaining the sequential fade-out/fade-in pattern to avoid layout thrashing. Added `aria-hidden` management for accessibility.
