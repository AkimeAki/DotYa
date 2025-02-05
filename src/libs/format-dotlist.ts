import { langList, langPriority, type Lang } from "@/define";
import type { DotIllust, DotIllustTag } from "@/types";
import type { MicroCMSContentId, MicroCMSDate } from "microcms-js-sdk";
// import { imageToDiv } from "./div-image";

export interface DotTagData {
	id: string;
	name: {
		[key in Lang]: string;
	};
}

export const formatTagList = (tags: (DotIllustTag & MicroCMSContentId & MicroCMSDate)[]): DotTagData[] => {
	const result = tags.map((data) => {
		const name: { [key in Lang]: string } = {} as { [key in Lang]: string };
		for (const lang of langList) {
			const langPriorityData = langPriority[lang];
			for (const _lang of langPriorityData) {
				let key = `name_${_lang}`;
				if (_lang === "ja") {
					key = "name";
				}

				// eslint-disable-next-line @typescript-eslint/ban-ts-comment
				// @ts-expect-error
				if (data[key] === undefined || data[key] === "") {
					continue;
				}

				// eslint-disable-next-line @typescript-eslint/ban-ts-comment
				// @ts-expect-error
				name[lang] = data[key];
				break;
			}
		}

		return {
			id: data.id,
			name: name
		};
	});

	const filteredData = result.filter((item) => {
		return item !== undefined;
	});

	return filteredData;
};

export interface DotData {
	id: string;
	title: {
		[key in Lang]: string;
	};
	illust: {
		url: string;
		dom: string;
		size: 32;
	};
	tags: DotTagData[];
	publishedAt?: string | undefined;
	parent?: string | undefined;
	family: Omit<DotData, "family">[];
}

const createDotListData = (data: DotIllust & MicroCMSContentId & MicroCMSDate): Omit<DotData, "family"> | undefined => {
	let size: undefined | 32 = undefined;
	if (
		data.illust.width !== undefined &&
		data.illust.height !== undefined &&
		data.illust.width === data.illust.height
	) {
		if (data.illust.width === 32) {
			size = 32;
		}
	}

	if (size === undefined) {
		return undefined;
	}

	const title: { [key in Lang]: string } = {} as { [key in Lang]: string };
	for (const lang of langList) {
		const langPriorityData = langPriority[lang];
		for (const _lang of langPriorityData) {
			let key = `title_${_lang}`;
			if (_lang === "ja") {
				key = "title";
			}

			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-expect-error
			if (data[key] === undefined || data[key] === "") {
				continue;
			}

			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-expect-error
			title[lang] = data[key];
			break;
		}
	}

	return {
		id: data.id,
		title: title,
		illust: {
			url: data.illust.url,
			dom: "", // await imageToDiv(data.dot64.url)
			size: size
		},
		tags: formatTagList(data.tags),
		publishedAt: data.publishedAt,
		parent: data.parent?.id
	};
};

export const formatDotList = async (dots: (DotIllust & MicroCMSContentId & MicroCMSDate)[]): Promise<DotData[]> => {
	const result = dots.map(async (data) => {
		const dotData = createDotListData(data);
		if (dotData === undefined) {
			return undefined;
		}

		return {
			...dotData,
			family: [
				data.parent === undefined ? data.id : data.parent?.id,
				...dots
					.filter((childData) => {
						if (childData.parent !== undefined && childData.parent.id === data.id) {
							return true;
						}

						if (
							childData.parent !== undefined &&
							data.parent !== undefined &&
							childData.parent.id === data.parent.id
						) {
							return true;
						}

						return false;
					})
					.map((childData) => {
						return childData.id;
					})
			]
				.map((familyId) => {
					let family: Omit<DotData, "family"> | undefined = undefined;

					for (const childDot of dots) {
						if (childDot.id === familyId) {
							family = createDotListData(childDot);
							break;
						}
					}

					if (family !== undefined) {
						return family;
					} else {
						return undefined;
					}
				})
				.filter((item) => {
					return item !== undefined;
				})
		};
	});

	const filteredData = (await Promise.all(result)).filter((item) => {
		return item !== undefined;
	});

	return filteredData;
};
