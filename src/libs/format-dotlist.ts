import type { DotIllust, DotIllustTag } from "@/types";
import type { MicroCMSContentId, MicroCMSDate } from "microcms-js-sdk";
// import { imageToDiv } from "./div-image";

export interface DotTagData {
	id: string;
	name: {
		ja: string;
		"zh-cn": string;
		"zh-tw": string;
	};
	keywords: {
		ja: string;
		"zh-cn": string;
		"zh-tw": string;
	}[];
}

export const formatTagList = (tags: (DotIllustTag & MicroCMSContentId & MicroCMSDate)[]): DotTagData[] => {
	const result = tags.map((data) => {
		return {
			id: data.id,
			name: {
				ja: data.name,
				"zh-cn":
					data["name_zh-cn"] !== "" && data["name_zh-cn"] !== undefined
						? data["name_zh-cn"]
						: data["name_zh-tw"] !== "" && data["name_zh-tw"] !== undefined
							? data["name_zh-tw"]
							: data.name,
				"zh-tw":
					data["name_zh-tw"] !== "" && data["name_zh-tw"] !== undefined
						? data["name_zh-tw"]
						: data["name_zh-cn"] !== "" && data["name_zh-cn"] !== undefined
							? data["name_zh-cn"]
							: data.name
			},
			keywords:
				data.keyword?.map((keyword) => {
					return {
						ja: keyword.text,
						"zh-cn":
							keyword["text_zh-cn"] !== "" && keyword["text_zh-cn"] !== undefined
								? keyword["text_zh-cn"]
								: keyword["text_zh-tw"] !== "" && keyword["text_zh-tw"] !== undefined
									? keyword["text_zh-tw"]
									: keyword.text,
						"zh-tw":
							keyword["text_zh-tw"] !== "" && keyword["text_zh-tw"] !== undefined
								? keyword["text_zh-tw"]
								: keyword["text_zh-cn"] !== "" && keyword["text_zh-cn"] !== undefined
									? keyword["text_zh-cn"]
									: keyword.text
					};
				}) ?? []
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
		ja: string;
		"zh-cn": string;
		"zh-tw": string;
	};
	illust: {
		url: string;
		dom: string;
		size: 32;
	};
	tags: DotTagData[];
	keywords: {
		ja: string;
		"zh-cn": string;
		"zh-tw": string;
	}[];
	publishedAt?: string | undefined;
}

export const formatDotList = async (dots: (DotIllust & MicroCMSContentId & MicroCMSDate)[]): Promise<DotData[]> => {
	const result = dots.map(async (data) => {
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

		return {
			id: data.id,
			title: {
				ja: data.title,
				"zh-cn":
					data["title_zh-cn"] !== "" && data["title_zh-cn"] !== undefined
						? data["title_zh-cn"]
						: data["title_zh-tw"] !== "" && data["title_zh-tw"] !== undefined
							? data["title_zh-tw"]
							: data.title,
				"zh-tw":
					data["title_zh-tw"] !== "" && data["title_zh-tw"] !== undefined
						? data["title_zh-tw"]
						: data["title_zh-cn"] !== "" && data["title_zh-cn"] !== undefined
							? data["title_zh-cn"]
							: data.title
			},
			illust: {
				url: data.illust.url,
				dom: "", // await imageToDiv(data.dot64.url)
				size: size
			},
			tags: formatTagList(data.tags),
			keywords:
				data.keywords?.map((keyword) => {
					return {
						ja: keyword.word,
						"zh-cn":
							keyword["word_zh-cn"] !== "" && keyword["word_zh-cn"] !== undefined
								? keyword["word_zh-cn"]
								: keyword["word_zh-tw"] !== "" && keyword["word_zh-tw"] !== undefined
									? keyword["word_zh-tw"]
									: keyword.word,
						"zh-tw":
							keyword["word_zh-tw"] !== "" && keyword["word_zh-tw"] !== undefined
								? keyword["word_zh-tw"]
								: keyword["word_zh-cn"] !== "" && keyword["word_zh-cn"] !== undefined
									? keyword["word_zh-cn"]
									: keyword.word
					};
				}) ?? [],
			publishedAt: data.publishedAt
		};
	});

	const filteredData = (await Promise.all(result)).filter((item) => {
		return item !== undefined;
	});

	return filteredData;
};
