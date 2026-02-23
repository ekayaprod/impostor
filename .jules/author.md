## 2024-05-22 - [Dependency Management Discrepancy]
**Learning:** The project uses `package.json` but vendors dependencies manually in `js/` and `css/`. This confuses the developer workflow (npm install does not update the app).
**Action:** Explicitly document the "Vendored Dependencies" strategy in `README.md` to clarify that `node_modules` are not used at runtime.
