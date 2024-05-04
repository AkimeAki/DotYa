import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
	server: {
		port: 9001,
		host: "0.0.0.0"
	},
	site: "https://dotya.aki.wtf",
	trailingSlash: "never",
	integrations: [sitemap(), react()],
	build: {
		format: "file"
	}
});
