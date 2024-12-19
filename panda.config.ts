import { defineConfig } from "@pandacss/dev";

export default defineConfig({
	include: ["./src/**/*.{js,jsx,ts,tsx,astro}"],
	syntax: "template-literal",
	outdir: "src/styled-system",
	hash: true,
	preflight: false
});
