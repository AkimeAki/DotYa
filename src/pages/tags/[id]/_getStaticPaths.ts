import { pageLangList, type Lang } from "@/define";
import { formatTagList } from "@/libs/format-dotlist";
import { getCachedContents } from "@/libs/microcms";
import type { DotIllustTag } from "@/types";

export const paths = async (enabledLang: boolean = false) => {
	const allTags = formatTagList(await getCachedContents<DotIllustTag>("tags"));

	return allTags.flatMap((tag) => {
		if (enabledLang) {
			return pageLangList
				.filter((lang) => lang !== "ja")
				.map((lang) => {
					return {
						params: {
							lang: lang,
							id: tag.id
						},
						props: {
							lang: lang as Lang,
							tag: tag
						}
					};
				});
		} else {
			return {
				params: {
					id: tag.id
				},
				props: {
					lang: "ja" as Lang,
					tag: tag
				}
			};
		}
	});
};
