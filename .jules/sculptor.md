# SCULPTOR'S JOURNAL

## 2024-05-24 - [Split & Polished: UI Module]
**Learning:** `js/modules/ui.js` was identified as a "God Component". It handled screen transitions, player list management, modal interactions, and specific screen building logic all in one file. This made it difficult to reason about specific UI flows and transitions.
**Action:** Splitting `js/modules/ui.js` into focused sub-modules: `transitions.js`, `players.js`, `screens.js`, and `modals.js`. This separation of concerns allows for cleaner transitions and easier maintenance. The `js/modules/ui.js` file will act as a facade to maintain backward compatibility.

## 2024-10-25 - [Split & Polished: Events Module]
**Learning:** `js/main.js` was a "God Component" holding a massive block of event listeners, which made initialization muddy.
**Action:** Splitting event bindings into a dedicated `js/modules/ui/events/index.js` sub-module. The `main.js` file now acts strictly as an application bootstrap.

## 2024-10-25 - [Split & Polished: EmptyState Module]
**Learning:** The EmptyState display logic was tangled inside the setup screen's updateCategoryDisplay function, making the component responsible for too many disjointed UI states.
**Action:** Extracted the EmptyState visibility toggle into a dedicated `js/modules/ui/emptyState.js` component, using pure CSS fade classes for seamless mount/unmount boundaries.

## 2024-10-25 - [Split & Polished: Distribute Screen]
**Learning:** `js/modules/ui/screens/distribute.js`'s `buildScreen2` was a "God Component". It handled everything from validation and displaying errors to generating skeleton loaders and swapping them with player buttons using an abrupt DOM swap.
**Action:** Splitting `buildScreen2` into distinct sub-components: `validateSetup`, `displayErrors`, `renderSkeletons`, and `renderPlayerButtons`. A smooth opacity transition was added to `renderPlayerButtons` so that the loading skeletons fade out before the player reveal buttons seamlessly fade in, resolving the jarring swap.
