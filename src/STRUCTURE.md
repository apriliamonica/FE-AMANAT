Project structure (src/)

- src/
  - main.jsx # entry
  - App.jsx # top-level layout
  - index.css # global styles
  - assets/ # images, fonts
  - components/ # reusable UI components
    - Sidebar.jsx
    - common/ # small shared components
      - EmptyState.jsx
  - pages/ # page views (Dashboard, SuratMasuk...)
    - Dashboard.jsx
  - services/ # api client, adapters
    - api.js
  - hooks/ # custom hooks
    - useFetch.js
  - utils/ # helper functions
    - index.js
  - styles/ # component-specific styles
    - sidebar.css

Notes:

- Keep pages small and compose from components in `components/` and `components/common/`.
- Add routing later (react-router-dom) and move page rendering into routes.
