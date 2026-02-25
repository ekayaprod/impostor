# Virtuoso's Journal

## 2024-05-22 - [Set Custom Topic Polish]
**Learning:** The initial implementation of the custom topic modal silently failed validation, leaving users confused.
**Action:** Implemented clear visual error states and empathetic error messages to guide the user.

## 2024-05-24 - [Polishing Topic Input Validation]
**Learning:** Generic error messages like "We need a topic and category" create cognitive load when only one field is missing.
**Action:** Implemented specific error branches for "Missing Topic" vs "Missing Category" to provide targeted, actionable guidance.
