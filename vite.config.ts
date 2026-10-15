import inertia from "@inertiajs/vite"
import { wayfinder } from "@laravel/vite-plugin-wayfinder"
import optimizeLocales from "@react-aria/optimize-locales-plugin"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import laravel from "laravel-vite-plugin"
import { defineConfig, lazyPlugins } from "vite-plus"

export default defineConfig({
  fmt: {
    semi: false,
    printWidth: 100,
    tabWidth: 2,
    sortImports: {},
    sortTailwindcss: {
      stylesheet: "./resources/css/app.css",
      attributes: ["classList"],
      functions: ["twMerge", "twJoin", "tv", "composeRenderProps", "composeTailwindRenderProps"],
    },
    ignorePatterns: ["vendor/**", "storage/**", "bootstrap/**", "public/**", "resources/views/**"],
  },
  lint: {
    jsPlugins: [{ name: "vite-plus", specifier: "vite-plus/oxlint-plugin" }],
    rules: { "vite-plus/prefer-vite-plus-imports": "error" },
    options: { typeAware: true, typeCheck: true },
    ignorePatterns: ["vendor/**", "storage/**", "bootstrap/**", "public/**"],
  },
  plugins: lazyPlugins(() => [
    laravel({
      input: ["resources/css/app.css", "resources/js/app.ts"],
      refresh: true,
    }),
    inertia(),
    react(),
    tailwindcss(),
    wayfinder({
      formVariants: true,
    }),
    {
      ...optimizeLocales.vite({
        locales: ["en-US", "fr-FR"],
      }),
      enforce: "pre",
    },
  ]),
})
