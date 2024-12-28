import type { MicroCMSImage, MicroCMSListContent } from "microcms-js-sdk";

export interface DotIllustTag {
	name: string;
	keyword?: {
		fieldId: "keyword";
		text: string;
	}[];
}

export interface DotIllust {
	title: string;
	illust: MicroCMSImage;
	tags: (DotIllustTag & MicroCMSListContent)[];
	keywords?: {
		fieldId: string;
		word: string;
	}[];
	loading?: boolean;
}
