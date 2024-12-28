import type { DotIllust } from "@/types";
import type { MicroCMSContentId, MicroCMSDate } from "microcms-js-sdk";
// import { imageToDiv } from "./div-image";

export interface DotData {
	id: string;
	title: string;
	illust: {
		url: string;
		dom: string;
		size: 32;
	};
	tags: {
		id: string;
		name: string;
	}[];
	keywords: string[];
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
			title: data.title,
			illust: {
				url: data.illust.url,
				dom: "", // await imageToDiv(data.dot64.url)
				size: size
			},
			tags: data.tags.map((tag) => {
				return {
					id: tag.id,
					name: tag.name
				};
			}),
			keywords:
				data.keywords?.map((keyword) => {
					return keyword.word;
				}) ?? [],
			publishedAt: data.publishedAt
		};
	});

	const filteredData = (await Promise.all(result)).filter((item) => {
		return item !== undefined;
	});

	return filteredData;
};
