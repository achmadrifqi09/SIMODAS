import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";
import { ViteMinifyPlugin } from "vite-plugin-minify";

export default defineConfig({
    plugins: [laravel(["resources/js/app.jsx"]), ViteMinifyPlugin({})],
    resolve: {
        alias: {
            "@": "/resources/js",
        },
    },
});
