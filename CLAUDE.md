## Source of Truth
Figma is the only source of truth for all visual values.
Figma file key: 2RRs8vgvohxUzX72sFcWRP

Before writing or editing any component:
1. Use the Figma MCP to read the relevant node directly from the file
2. Extract all values from Figma — positions, sizes, colors, typography, spacing, opacity
3. Do not use values from previous code, context, or spec documents
4. Figma values always win over anything else in the codebase

When implementing a component, always reference the Figma node ID in a comment at the top of the file.

# JRS UXD Site

allowedTools: all

Stack: Next.js 15, React 19, GSAP, CSS Modules, TypeScript

No Tailwind. Fonts via Adobe Fonts kit vxo7juh.

Always work on branch main.

Mobile first: 375px base. Breakpoints: min-width 768px, 1280px.
