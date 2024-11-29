import { siteRootUrl } from "@/define";

export const dotJsonLd = (imageUrl: string, name: string, isMain = true) => {
	return {
		"@context": "https://schema.org/",
		"@type": "ImageObject",
		contentUrl: imageUrl,
		license: `${siteRootUrl}/terms`,
		acquireLicensePage: `${siteRootUrl}/terms`,
		name,
		caption: `${name}のドット絵`,
		creator: {
			"@type": "Organization",
			name: "篝之鼠",
			url: "https://kagari.aki.wtf/",
			logo: {
				"@type": "ImageObject",
				url: "https://kagari.aki.wtf/default-ogp.png",
				width: 512,
				height: 512
			}
		},
		copyrightNotice: "篝之鼠",
		creditText: "篝之鼠",
		isAccessibleForFree: true,
		isFamilyFriendly: true,
		representativeOfPage: isMain
	};
};
