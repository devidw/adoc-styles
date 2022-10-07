import { defineConfig } from 'astro/config'
import image from "@astrojs/image"
import svelte from "@astrojs/svelte"
import tailwind from "@astrojs/tailwind"

// https://astro.build/config
export default defineConfig({
  integrations: [image(), svelte(), tailwind()],
  // site: 'https://devidw.github.io',
  // base: '/adoc-styles'
})