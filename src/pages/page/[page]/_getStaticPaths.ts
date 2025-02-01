import { pageLangList, type Lang } from "@/define";
import { formatDotList } from "@/libs/format-dotlist";
import { getCachedContents } from "@/libs/microcms";
import type { DotIllust } from "@/types";
import type { PaginateFunction } from "astro";

export const paths = async (paginate: PaginateFunction, enabledLang: boolean = false) => {
	const response = (await formatDotList(await getCachedContents<DotIllust>("dot"))).filter((data) => {
		return data.parent === undefined;
	});

	if (enabledLang) {
		return pageLangList
			.filter((lang) => lang !== "ja")
			.flatMap((lang) => {
				return paginate(response, {
					pageSize: 30,
					params: {
						lang: lang
					},
					props: {
						lang: lang as Lang
					}
				});
			});
	} else {
		return paginate(response, {
			pageSize: 30,
			props: {
				lang: "ja" as Lang
			}
		});
	}
};
