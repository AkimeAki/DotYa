import type { MicroCMSImage, MicroCMSListContent } from "microcms-js-sdk";

export interface DotIllustTag {
	name: string;
	"name_zh-cn": string;
	"name_zh-tw": string;
	name_en: string;
	keyword?: {
		fieldId: "keyword";
		text: string;
		"text_zh-cn"?: string;
		"text_zh-tw"?: string;
		text_en?: string;
	}[];
	event_start?: string;
	event_end?: string;
	event_word?: {
		fieldId: "word";
		ja: string;
		"zh-cn"?: string;
		"zh-tw"?: string;
		en?: string;
	};
}

export interface DotIllust {
	title: string;
	"title_zh-cn"?: string;
	"title_zh-tw"?: string;
	title_en?: string;
	illust: MicroCMSImage;
	tags: (DotIllustTag & MicroCMSListContent)[];
	keywords?: {
		fieldId: string;
		word: string;
		"word_zh-cn"?: string;
		"word_zh-tw"?: string;
		word_en?: string;
	}[];
	loading?: boolean;
	parent?: DotIllust & MicroCMSListContent;
}

export interface Translate {
	ja: string;
	"zh-cn"?: string;
	"zh-tw"?: string;
	en?: string;
}

export interface TranslateData {
	[key: string]: {
		rich: string;
		text: string;
	};
}
