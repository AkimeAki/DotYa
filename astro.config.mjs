import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import react from "@astrojs/react";

const site = "https://pixel.gives";

// https://astro.build/config
export default defineConfig({
	server: {
		port: 9001,
		host: "0.0.0.0"
	},
	site,
	trailingSlash: "never",
	integrations: [
		sitemap({
			filter: (page) => {
				const pageArray = page.replace(`${site}/`, "").split("/");
				if (pageArray[0] === "tags" && pageArray[2] === "page") {
					return false;
				}

				if (pageArray[0] === "page" && Number(pageArray[1]) > 1) {
					return false;
				}

				return true;
			}
		}),
		react()
	],
	build: {
		format: "file"
	},
	vite: {
		define: {
			global: "window"
		}
	}
});
