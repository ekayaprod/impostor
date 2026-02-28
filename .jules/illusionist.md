# ILLUSIONIST'S JOURNAL

## 2025-05-20 - Role Distribution Screen
**Learning:** `buildScreen2` performs synchronous DOM updates inside a loop (O(N) insertions), causing layout thrashing. The "pop-in" effect feels jarring.
**Action:** Replace with a single `DocumentFragment` insertion and staggered CSS animations (using `--i`) to mask rendering time and provide a premium feel.

## 2025-05-21 - Player List Screen
**Learning:** `buildScreen1` performed synchronous DOM updates inside a loop, causing layout thrashing.
**Action:** Replaced with `DocumentFragment` insertion and staggered CSS animations (using `--i`) to mask rendering time and provide a premium feel.

## 2025-05-22 - Player List Deletion
**Learning:** `deletePlayer` used a hardcoded `setTimeout` (300ms) for removal, decoupling logic from the actual CSS animation duration and ignoring `prefers-reduced-motion`.
**Action:** Replaced with `animationend` listener for precise removal timing, added a `prefers-reduced-motion` check for instant removal, and optimized CSS with `will-change`.

## 2025-05-23 - Game Screen (Screen 3)
**Learning:** `buildScreen3` was appending players to the list individually in a loop, causing potential layout thrashing and a flat appearance.
**Action:** Refactored to use `DocumentFragment` for a single DOM insertion. Added `.game-player-item` with staggered CSS animations (`--i`) to create a polished entrance effect that respects reduced motion.

## 2026-02-28 - Custom Topic Modal Error Message
**Learning:** `slideDown` and `slideUp` JS animations used for `#topicErrorMsg` caused layout thrashing, blocked the main thread, and ignored `prefers-reduced-motion`.
**Action:** Replaced JS-based `slideDown`/`slideUp` with pure CSS equivalents using `.is-visible` transition states. The base element now defines `max-height: 0`, `opacity: 0`, `padding: 0`, `border-width: 0` and toggling the class smoothly transitions to normal properties. Also added `@media (prefers-reduced-motion: reduce)` to disable the transition.
