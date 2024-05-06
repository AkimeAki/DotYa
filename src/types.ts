import type { MicroCMSImage, MicroCMSListContent } from "microcms-js-sdk";

export interface DotIllustTag {
	name: string;
}

export interface DotIllust {
	title: string;
	dot32?: MicroCMSImage;
	dot16?: MicroCMSImage;
	tags: (DotIllustTag & MicroCMSListContent)[];
}
