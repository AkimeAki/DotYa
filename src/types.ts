import type { MicroCMSImage, MicroCMSListContent } from "microcms-js-sdk";

export interface DotIllustTag {
	name: string;
}

export interface DotIllust {
	title: string;
	dot32?: MicroCMSImage;
	dot16?: MicroCMSImage;
	tags: (DotIllustTag & MicroCMSListContent)[];
	keywords?: {
		fieldId: string;
		word: string;
	}[];
	loading?: boolean;
}

export interface CMSPage {
	title: string;
	content: string;
	tags: (DotIllustTag & MicroCMSListContent)[];
}
