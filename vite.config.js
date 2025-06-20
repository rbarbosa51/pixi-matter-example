import {defineConfig} from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
    server: {
        open: true,
        port: 8001
    },
    plugins: [tailwindcss()],
    base: 'https://rbarbosa51.github.io/pixi-matter-example'
})