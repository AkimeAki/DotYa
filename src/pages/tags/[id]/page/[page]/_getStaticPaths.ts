import { pageLangList, type Lang } from "@/define";
import { formatDotList, formatTagList } from "@/libs/format-dotlist";
import { getCachedContents } from "@/libs/microcms";
import type { DotIllust, DotIllustTag } from "@/types";
import type { PaginateFunction } from "astro";

export const paths = async (paginate: PaginateFunction, enabledLang: boolean = false) => {
	const allTags = formatTagList(await getCachedContents<DotIllustTag>("tags"));
	const allDots = (await formatDotList(await getCachedContents<DotIllust>("dot"))).filter((data) => {
		return data.parent === undefined;
	});

	return allTags.flatMap((tag) => {
		if (enabledLang) {
			return pageLangList
				.filter((lang) => lang !== "ja")
				.flatMap((lang) => {
					const dots = allDots.filter((dot) => {
						const tagIds = dot.tags.map((dotTag) => dotTag.id);
						return tagIds.includes(tag.id);
					});

					return paginate(dots, {
						pageSize: 30,
						params: {
							id: tag.id,
							lang: lang
						},
						props: {
							lang: lang,
							tag: tag
						}
					});
				});
		} else {
			const dots = allDots.filter((dot) => {
				const tagIds = dot.tags.map((dotTag) => dotTag.id);
				return tagIds.includes(tag.id);
			});

			return paginate(dots, {
				pageSize: 30,
				params: {
					id: tag.id,
					lang: "ja" as Lang
				},
				props: {
					lang: "ja" as Lang,
					tag: tag
				}
			});
		}
	});
};
