module.exports = {
	singleQuote: false,
	jsxSingleQuote: false,
	printWidth: 120,
	semi: true,
	trailingComma: "none",
	plugins: ["prettier-plugin-astro"],
	overrides: [
		{
			files: "*.astro",
			options: {
				parser: "astro"
			}
		},
		{
			files: "*.code-workspace",
			options: {
				parser: "json"
			}
		}
	]
};
