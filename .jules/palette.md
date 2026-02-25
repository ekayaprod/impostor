## 2024-05-24 - [Role Reveal Flow]
**Learning:** Instant element removal during a modal interaction creates focus loss (accessibility issue) and feels jarring.
**Action:** Animate elements out *after* the modal closes, and explicitly manage focus to the next logical element (or start button).

## 2024-05-24 - [Semantic Buttons]
**Learning:** Using `<a>` tags for interactive elements without `href` or `tabindex` makes them inaccessible to keyboard users.
**Action:** Replaced functional `<a>` tags with `<button type="button">` to ensure native keyboard accessibility and correct semantics.
