import { siteRootUrl, type Lang } from "@/define";
import { getLangPath } from "@/libs/lang-path";
import type { TranslateData } from "@/types";
import { addArg, getText } from "@/libs/getI18n";

export const dotJsonLd = (imageUrl: string, name: string, translateData: TranslateData, lang: Lang, isMain = true) => {
	return {
		"@context": "https://schema.org/",
		"@type": "ImageObject",
		contentUrl: imageUrl,
		license: `${siteRootUrl}${getLangPath("/terms", lang)}`,
		acquireLicensePage: `${siteRootUrl}${getLangPath("/terms", lang)}`,
		name,
		caption: addArg(getText(translateData, "dot_id_schmaDotCaption"), name),
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
