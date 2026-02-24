## 2026-02-24 - Split Game.js
**Learning:** `game.js` was a "God Component" managing state, UI, and logic. Splitting it into `State`, `Logic`, and `UI` modules improved separation of concerns.
**Action:** Used a `fade-out` -> `hide` -> `show` -> `fade-in` sequence for screen transitions to avoid layout thrashing that would occur with simultaneous cross-fading of elements with different heights.
