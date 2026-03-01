# Virtuoso's Journal

## 2024-05-22 - [Set Custom Topic Polish]
**Learning:** The initial implementation of the custom topic modal silently failed validation, leaving users confused.
**Action:** Implemented clear visual error states and empathetic error messages to guide the user.

## 2024-05-24 - [Polishing Topic Input Validation]
**Learning:** Generic error messages like "We need a topic and category" create cognitive load when only one field is missing.
**Action:** Implemented specific error branches for "Missing Topic" vs "Missing Category" to provide targeted, actionable guidance.

## 2024-05-25 - [Distribute Roles Validation]
**Learning:** The previous implementation used an unstyled `alert()` and silent `console.log` for missing topics or players, causing confusion.
**Action:** Replaced the default browser `alert` with beautifully styled inline error messages (`.form-error-message`) using empathetic, active-voice microcopy to guide users on missing players or topics, improving the overall polish of the game setup flow.
\n## 2026-03-01 - [Role Reveal & Game Over Polish]\n**Learning:** Raw string messages inside unstyled modals cause confusion and lack clear visual hierarchy, leading to a jarring experience during critical moments (role reveal and game over).\n**Action:** Implemented clearly defined CSS classes (.role-reveal-card, .game-over-card) to provide structure, used semantic colors to differentiate states, and replaced generic button copy like "Got it" with empathetic, active-voice microcopy that encourages user confidence.
