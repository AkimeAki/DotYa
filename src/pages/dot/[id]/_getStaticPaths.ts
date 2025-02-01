import { pageLangList, type Lang } from "@/define";
import { copy } from "@/libs/copy-object";
import { formatDotList } from "@/libs/format-dotlist";
import { getCachedContents } from "@/libs/microcms";
import type { DotIllust } from "@/types";

export const paths = async (enabledLang: boolean = false) => {
	const allDots = await formatDotList(await getCachedContents<DotIllust>("dot"));

	return allDots.flatMap((content) => {
		let sameTag1Dots = allDots
			.filter((data) => {
				return data.parent === undefined;
			})
			.filter((item) => {
				if (item.id === content.id) {
					return false;
				}

				if (item.family.find((dot) => dot.id === content.id) !== undefined) {
					return false;
				}

				if (content.tags[0] !== undefined) {
					for (const tag of item.tags) {
						if (tag.id === content.tags[0].id) {
							return true;
						}
					}
				}

				return false;
			});

		const allSameTag1Dots = copy<typeof sameTag1Dots>(sameTag1Dots);
		sameTag1Dots.length = 15;
		sameTag1Dots = sameTag1Dots.filter(Boolean);

		const sameTag1DotsInSameTag2Dots = sameTag1Dots.filter((item) => {
			if (item.id === content.id) {
				return false;
			}

			if (content.tags[1] !== undefined) {
				for (const tag of item.tags) {
					if (tag.id === content.tags[1].id) {
						return true;
					}
				}
			}

			return false;
		});

		let sameTag2Dots = allDots
			.filter((data) => {
				return data.parent === undefined;
			})
			.filter((item) => {
				if (item.id === content.id) {
					return false;
				}

				if (item.family.find((dot) => dot.id === content.id) !== undefined) {
					return false;
				}

				if (content.tags[1] !== undefined) {
					for (const tag of item.tags) {
						if (tag.id === content.tags[1].id) {
							return true;
						}
					}
				}

				return false;
			});

		const filterdSameTag2Dots = copy<typeof sameTag2Dots>(sameTag2Dots).filter((dot) => {
			const dot1Ids = sameTag1DotsInSameTag2Dots.map((dot) => dot.id);

			return !dot1Ids.includes(dot.id);
		});

		sameTag2Dots = [...filterdSameTag2Dots, ...sameTag1DotsInSameTag2Dots];
		const allSameTag2Dots = copy<typeof sameTag2Dots>(sameTag2Dots);
		sameTag2Dots.length = 15;
		sameTag2Dots = sameTag2Dots.filter(Boolean);

		if (enabledLang) {
			return pageLangList
				.filter((lang) => lang !== "ja")
				.map((lang) => {
					return {
						params: {
							lang: lang,
							id: content.id
						},
						props: {
							lang: lang as Lang,
							dot: content,
							sameTag1Dots,
							allSameTag1Dots,
							sameTag2Dots,
							allSameTag2Dots
						}
					};
				});
		} else {
			return {
				params: {
					id: content.id
				},
				props: {
					lang: "ja" as Lang,
					dot: content,
					sameTag1Dots,
					allSameTag1Dots,
					sameTag2Dots,
					allSameTag2Dots
				}
			};
		}
	});
};
