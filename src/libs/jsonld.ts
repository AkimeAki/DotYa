import type { AstroGlobal } from "astro";

export const dotJsonLd = (Astro: AstroGlobal, imageUrl: string, name: string) => {
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
			name: "篝之鼠"
		},
		copyrightNotice: "篝之鼠",
		creditText: "篝之鼠",
		isAccessibleForFree: true,
		isFamilyFriendly: true,
		representativeOfPage: true
	};
};
