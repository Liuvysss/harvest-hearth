# README - Project by Liuvys Perez

## Overview

Harvest & Hearth Coffee Roasters is a multi-page frontend for a fictional neighborhood cafe. The site presents the brand, menu, story, and contact experience through a production-style marketing interface rather than a single demo screen.

The project is designed to demonstrate practical frontend engineering decisions: semantic HTML, shared layout patterns, modular Sass architecture, accessible navigation, and a repeatable Vite-based build workflow. The codebase is structured so common UI behavior and styling are defined once and reused across pages.

---

## Features

- Four-page site architecture: Home, Menu, About, and Contact
- Shared header, pre-footer, and footer components across the full site
- Modular Sass structure with centralized tokens, layout rules, and reusable UI patterns
- Responsive layouts for hero, content sections, menu cards, and contact content
- Accessible navigation with skip links, clear heading hierarchy, and reduced-motion-aware scrolling
- Progressive enhancement for contact and newsletter forms with accessible inline feedback
- Multi-entry Vite build configured for independent HTML page outputs
- Production build pipeline that compiles Sass and generates optimized assets in `dist/`

---

## Technical Notes

- Built with semantic HTML, Sass, and vanilla JavaScript
- Vite is configured as a multi-page application with explicit entry points for `index.html`, `menu.html`, `about.html`, and `contact.html`
- Sass is organized by responsibility: `abstracts/` for tokens and mixins, `base/` for global document rules, `components/` for reusable UI, `layout/` for shared page structure, and `pages/` for page-specific refinements
- `scripts/dev.mjs` runs the Sass watcher and Vite dev server together for local development
- `scripts/build.mjs` compiles Sass before generating the production build, keeping source CSS and bundled output in sync
- Shared client-side behavior lives in `src/scripts/site.js`, which progressively enhances the contact and newsletter forms with accessible inline feedback

---

## How to Use

1. Open the home page to review the cafe brand, featured messaging, and primary calls to action.
2. Use the main navigation to move between the Menu, About, and Contact pages.
3. Browse the menu page for drinks and pastries, including card-based category presentation and supporting details.
4. Visit the About page to review the brand story, operating values, and process content.
5. Use the Contact page for visit information, hours, inquiry details, and secondary navigation through the shared footer.

---

## How to Run

1. Install dependencies: `npm install`
2. Start the development environment: `npm run dev`
3. Open the local Vite URL in your browser, typically `http://localhost:5173`
4. Compile Sass only when needed: `npm run sass`
5. Create a production build: `npm run build`
6. Preview the production output locally: `npm run preview`
