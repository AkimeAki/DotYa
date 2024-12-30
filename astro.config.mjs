import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import react from "@astrojs/react";
import { siteRootUrl } from "./src/define";

import cloudflare from "@astrojs/cloudflare";

// https://astro.build/config
export default defineConfig({
	server: {
		port: 9001,
		host: "0.0.0.0"
	},

	site: siteRootUrl,
	trailingSlash: "never",

	integrations: [
		sitemap({
			filter: (page) => {
				const pageArray = page.replace(`${siteRootUrl}/`, "").split("/");
				if (pageArray[0] === "tags" && pageArray[2] === "page") {
					return false;
				}

				if (pageArray[1] === "tags" && pageArray[3] === "page") {
					return false;
				}

				if (pageArray[0] === "page" && Number(pageArray[1]) > 1) {
					return false;
				}

				if (pageArray[1] === "page" && Number(pageArray[2]) > 1) {
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
			global: "window",
			// eslint-disable-next-line no-undef
			"process.env.MICROCMS_SERVICE_DOMAIN": JSON.stringify(process.env.MICROCMS_SERVICE_DOMAIN),
			// eslint-disable-next-line no-undef
			"process.env.MICROCMS_API_KEY": JSON.stringify(process.env.MICROCMS_API_KEY)
		},
		css: {
			preprocessorOptions: {
				scss: {
					api: "modern-compiler"
				}
			}
		}
	},
	output: "hybrid",
	adapter: cloudflare()
});
