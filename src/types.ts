import type { MicroCMSImage, MicroCMSListContent } from "microcms-js-sdk";

interface Tags {
	name: string;
}

export interface DotIllust {
	title: string;
	dot32?: MicroCMSImage;
	dot16?: MicroCMSImage;
	tags: (Tags & MicroCMSListContent)[];
}
