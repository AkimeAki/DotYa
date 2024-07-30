import type { AstroGlobal } from "astro";

export const dotJsonLd = (Astro: AstroGlobal, imageUrl: string, name: string): any => {
	return {
		"@context": "https://schema.org/",
		"@type": "ImageObject",
		contentUrl: imageUrl,
		license: `${Astro.site}terms`,
		acquireLicensePage: `${Astro.site}terms`,
		name,
		caption: `${name}のドット絵`,
		creator: {
			"@type": "Person",
			name: "acharom"
		},
		copyrightNotice: "acharom",
		creditText: "acharom",
		isAccessibleForFree: true,
		isFamilyFriendly: true,
		representativeOfPage: true
	};
};
