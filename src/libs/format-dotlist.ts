import type { DotIllust } from "@/types";
import type { MicroCMSContentId, MicroCMSDate } from "microcms-js-sdk";
import { imageToDiv } from "./div-image";

export interface DotData {
	id: string;
	title: string;
	dot32?:
		| {
				url: string;
				dom: string;
		  }
		| undefined;
	dot16?:
		| {
				url: string;
				dom: string;
		  }
		| undefined;
	dot64?:
		| {
				url: string;
				dom: string;
		  }
		| undefined;
	tags: {
		id: string;
		name: string;
	}[];
	keywords: string[];
	publishedAt?: string | undefined;
}

export const formatDotList = async (dots: (DotIllust & MicroCMSContentId & MicroCMSDate)[]): Promise<DotData[]> => {
	const result = dots.map(async (data) => {
		return {
			id: data.id,
			title: data.title,
			dot32:
				data.dot32 !== undefined
					? {
							url: data.dot32.url ?? "",
							dom: ""
						}
					: undefined,
			dot16:
				data.dot16 !== undefined
					? {
							url: data.dot16.url ?? "",
							dom: ""
						}
					: undefined,
			dot64:
				data.dot64 !== undefined
					? {
							url: "",
							dom: await imageToDiv(data.dot64.url)
						}
					: undefined,
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
	return await Promise.all(result);
};
