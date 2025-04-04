# Troubleshooting Guide

## Tailwind CSS Issues

If you encounter issues with Tailwind CSS, follow these steps:

### Error: "It looks like you're trying to use `tailwindcss` directly as a PostCSS plugin"

This error occurs with newer versions of Tailwind CSS. To fix:

1. Downgrade Tailwind CSS and related packages:
   ```
   npm uninstall tailwindcss postcss autoprefixer
   npm install -D tailwindcss@3.3.3 postcss@8.4.27 autoprefixer@10.4.14
   ```

2. Update your `postcss.config.js` file:
   ```js
   export default {
     plugins: {
       tailwindcss: {},
       autoprefixer: {},
     },
   }
   ```

3. Update your `tailwind.config.js` file:
   ```js
   /** @type {import('tailwindcss').Config} */
   export default {
     content: [
       "./index.html",
       "./src/**/*.{js,jsx}",
     ],
     darkMode: 'class',
     theme: {
       extend: {},
     },
     plugins: [],
   }
   ```

4. Make sure your package.json has compatible versions:
   ```json
   "dependencies": {
     "react": "^18.2.0",
     "react-dom": "^18.2.0",
     "date-fns": "^2.30.0"
   },
   "devDependencies": {
     "@types/react": "^18.2.15",
     "@types/react-dom": "^18.2.7",
     "@vitejs/plugin-react": "^4.0.3",
     "autoprefixer": "^10.4.14",
     "eslint": "^8.45.0",
     "eslint-plugin-react": "^7.32.2",
     "eslint-plugin-react-hooks": "^4.6.0",
     "eslint-plugin-react-refresh": "^0.4.3",
     "postcss": "^8.4.27",
     "tailwindcss": "^3.3.3",
     "vite": "^4.4.5"
   }
   ```

### Error: "module is not defined in ES module scope"

This error occurs when there's a conflict between CommonJS and ES modules. If your package.json has `"type": "module"`, you need to use ES module syntax in your configuration files.

1. Convert `postcss.config.js` to use ES modules:
   ```js
   export default {
     plugins: {
       tailwindcss: {},
       autoprefixer: {},
     },
   }
   ```

2. Convert `tailwind.config.js` to use ES modules:
   ```js
   /** @type {import('tailwindcss').Config} */
   export default {
     content: [
       "./index.html",
       "./src/**/*.{js,jsx}",
     ],
     darkMode: 'class',
     theme: {
       extend: {},
     },
     plugins: [],
   }
   ```

Alternatively, you can rename these files to use the `.cjs` extension (e.g., `postcss.config.cjs` and `tailwind.config.cjs`) to keep using CommonJS syntax.

## Vite Issues

If you encounter issues with Vite:

1. Make sure your `vite.config.js` file is properly set up:
   ```js
   import { defineConfig } from 'vite'
   import react from '@vitejs/plugin-react'

   // https://vitejs.dev/config/
   export default defineConfig({
     plugins: [react()],
   })
   ```

2. Check that the version of Vite is compatible with your React version.

## React Hooks Errors

If you encounter errors related to React hooks:

1. Make sure you're not using hooks outside of React functional components.
2. Make sure hooks are called at the top level of your components (not inside conditions or loops).
3. Check for compatibility issues between your React version and other dependencies.

## Running the App

If the app fails to start:

1. Make sure all dependencies are installed:
   ```
   npm install
   ```

2. Try clearing the cache and node_modules, then reinstall:
   ```
   rm -rf node_modules
   npm cache clean --force
   npm install
   ```

3. Start the development server:
   ```
   npm run dev
   ``` 