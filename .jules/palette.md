## 2024-05-27 - [Optimistic UI on Selection & Focus Focus Trap on Deletion]
**Learning:** Adding `.is-loading` UI visual feedback to the 'Random Topic' and 'Set Custom Topic' buttons creates a delightful, perceived performance improvement. When an interactive element (like a player row) is deleted, the DOM drops the user focus to the `body`, which is an accessibility anti-pattern.
**Action:** Always shift programmatic focus `.focus()` to adjacent elements when deleting DOM nodes. Add temporary `.is-loading` state CSS using standard button pulse visual feedback patterns to replace immediate blocking interactions.

## 2026-02-28 - [Skeleton Loaders for Suspense & A11y Announcements]
**Learning:** Skeleton loaders aren't just for data fetching; they can be used effectively to simulate processing time and build emotional suspense during game flows (like assigning secret roles). However, because this relies on `setTimeout` to swap DOM content, screen readers must be explicitly notified.
**Action:** When introducing artificial delays for UX delight, pair visual skeletons with hidden `aria-live="polite"` announcements to communicate the "processing" state and subsequent "completion" state to assistive technologies, ensuring focus is shifted appropriately when the interactive content arrives.
