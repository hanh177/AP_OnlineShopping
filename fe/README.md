# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

## Technologies & Libraries

### Core Technologies

- React 19
- TypeScript
- Vite 6
- SWC (for Fast Refresh)
- Node.js v23 or higher

### State Management

- Redux Toolkit
- React Redux

### Routing

- React Router DOM

### Styling & UI

- shadcn/ui (Built on top of Radix UI and Tailwind CSS) https://ui.shadcn.com/docs/tailwind-v4
  - Tailwind CSS (Utility-first CSS framework)
  - Radix UI (Headless UI components)
    - @radix-ui/react-label
    - @radix-ui/react-slot
    - ...
  - Class Variance Authority (for component variants)
  - Tailwind Merge (for merging Tailwind classes)
  - Clsx (for conditional class names)
- Lucide React (for icons)
- TW Animate CSS (for animations)
- Next Themes (for theme management)

### Form Handling & Validation

- React Hook Form
- Zod (for schema validation)
- @hookform/resolvers

### HTTP Client

- Axios

### UI/UX Features

- Sonner (for toast notifications) https://ui.shadcn.com/docs/components/sonner

### Development Tools

- ESLint
- TypeScript ESLint
- SWC Plugin for Vite
- Node.js types

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ["./tsconfig.node.json", "./tsconfig.app.json"],
      tsconfigRootDir: import.meta.dirname,
    },
  },
});
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from "eslint-plugin-react-x";
import reactDom from "eslint-plugin-react-dom";

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    "react-x": reactX,
    "react-dom": reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs["recommended-typescript"].rules,
    ...reactDom.configs.recommended.rules,
  },
});
```
