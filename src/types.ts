import type { MicroCMSImage, MicroCMSListContent } from "microcms-js-sdk";

export interface DotIllustTag {
	name: string;
	"name_zh-cn": string;
	"name_zh-tw": string;
	keyword?: {
		fieldId: "keyword";
		text: string;
		"text_zh-cn"?: string;
		"text_zh-tw"?: string;
	}[];
}

export interface DotIllust {
	title: string;
	"title_zh-cn"?: string;
	"title_zh-tw"?: string;
	illust: MicroCMSImage;
	tags: (DotIllustTag & MicroCMSListContent)[];
	keywords?: {
		fieldId: string;
		word: string;
		"word_zh-cn"?: string;
		"word_zh-tw"?: string;
	}[];
	loading?: boolean;
}

export interface Translate {
	ja: string;
	"zh-cn"?: string;
	"zh-tw"?: string;
}

export interface TranslateData {
	[key: string]: {
		rich: string;
		text: string;
	};
}
