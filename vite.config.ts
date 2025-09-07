import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import { generateSitemap } from "tanstack-router-sitemap";
import { sitemap } from "./sitemap";
// https://vite.dev/config/
export default defineConfig({
	plugins: [
		tanstackRouter({
			target: "react",
			autoCodeSplitting: true,
		}),
		react(),
		tailwindcss(),
		generateSitemap(sitemap),
	],
	base: "/zolite", // Updated to match your repository name
	build: {
		outDir: "dist",
		assetsDir: "assets",
	},
});
