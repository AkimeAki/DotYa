import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import pluginAstro from "eslint-plugin-astro";
import configPrettier from "eslint-config-prettier";

export default [
	{ languageOptions: { globals: { ...globals.browser } } },
	pluginJs.configs.recommended,
	...tseslint.configs.recommended,
	...pluginAstro.configs["flat/recommended"],
	{
		ignores: ["src/env.d.ts", "dist/**/*"]
	},
	{
		files: ["**/*.tsx"],
		...pluginReact.configs.flat.recommended,
		rules: {
			"react/display-name": "off",
			"react/react-in-jsx-scope": "off",
			"react/no-unknown-property": ["error", { ignore: ["css"] }]
		}
	},
	{
		files: ["**/*.astro"]
	},
	configPrettier
];
