## 2024-05-21 - Focus Trap in Dynamic Lists
**Learning:** Removing elements immediately upon interaction (e.g., opening a modal) traps focus in the `<body>` when the modal closes, as the trigger element no longer exists.
**Action:** Always preserve the trigger element until *after* the modal closes, or programmatically move focus to a logical next element (like the next list item or a container) *during* the close event.
