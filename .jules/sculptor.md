# SCULPTOR'S JOURNAL

## 2024-05-24 - [Split & Polished: UI Module]
**Learning:** `js/modules/ui.js` was identified as a "God Component". It handled screen transitions, player list management, modal interactions, and specific screen building logic all in one file. This made it difficult to reason about specific UI flows and transitions.
**Action:** Splitting `js/modules/ui.js` into focused sub-modules: `transitions.js`, `players.js`, `screens.js`, and `modals.js`. This separation of concerns allows for cleaner transitions and easier maintenance. The `js/modules/ui.js` file will act as a facade to maintain backward compatibility.

## 2024-05-24 - [Split & Polished: main.js God Component]
**Learning:** `js/main.js` acted as a "God Component", handling every UI event listener in a single >100 line block. Extracting this into specific event modules (`topic.js`, `modals.js`, `game.js`, `players.js`) separated concerns successfully. When components swap (e.g. `distributeTopicButton` appearing when valid, or `startButton` appearing after all roles are revealed), using jQuery `.show()` and `.hide()` causes abrupt UI jumps.
**Action:** Replaced abrupt visibility toggles with `.addClass('fade-enter')` and `.removeClass('fade-enter').addClass('fade-leave')` coupled with `setTimeout` to wait for CSS transitions to finish before setting `display: none`. This provides a polished fade-in/out effect when these UI elements enter or leave the document flow. Added `will-change: transform, opacity, height;` to `.form-error-message` to prevent layout thrashing during `.slideDown()` and `.slideUp()` animations.
