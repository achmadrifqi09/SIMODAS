import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";
import { ViteMinifyPlugin } from "vite-plugin-minify";
import viteCompression from "vite-plugin-compression";

export default defineConfig({
    plugins: [
        laravel(["resources/js/app.jsx"]),
        ViteMinifyPlugin({}),
        viteCompression(),
    ],
    resolve: {
        alias: {
            "@": "/resources/js",
        },
    },
});
