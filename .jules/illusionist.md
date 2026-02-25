# ILLUSIONIST'S JOURNAL

## 2025-05-20 - Role Distribution Screen
**Learning:** `buildScreen2` performs synchronous DOM updates inside a loop (O(N) insertions), causing layout thrashing. The "pop-in" effect feels jarring.
**Action:** Replace with a single `DocumentFragment` insertion and staggered CSS animations (using `--i`) to mask rendering time and provide a premium feel.

## 2025-05-21 - Player List Screen
**Learning:** `buildScreen1` performed synchronous DOM updates inside a loop, causing layout thrashing.
**Action:** Replaced with `DocumentFragment` insertion and staggered CSS animations (using `--i`) to mask rendering time and provide a premium feel.
