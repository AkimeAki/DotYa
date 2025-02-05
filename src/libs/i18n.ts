import type { Translate, TranslateData } from "@/types";
import { getCachedContents } from "@/libs/microcms";
import type { Lang } from "@/define";
import * as cheerio from "cheerio";

const langPriority: Record<Lang, Lang[]> = {
	"zh-cn": ["zh-cn", "zh-tw", "en", "ja"],
	"zh-tw": ["zh-tw", "zh-cn", "en", "ja"],
	en: ["en", "ja"],
	ja: ["ja"]
};

export const i18n = async (lang: Lang) => {
	const translate = await getCachedContents<Translate>("translate");

	const getText = (key: string, rich: boolean, lang: Lang) => {
		const data = translate.find((data) => {
			return data.id === key;
		});

		if (data === undefined) {
			return "";
		}

		let result = "";

		const langPriorityData = langPriority[lang];

		for (const lang of langPriorityData) {
			if (data[lang] === undefined) {
				continue;
			}

			const $ = cheerio.load(data[lang]);
			if ($("body").text() === "") {
				continue;
			}

			if (rich) {
				result = $("body").html() ?? "<p></p>";
			} else {
				result = $("body").text();
			}

			if (result !== "") {
				break;
			}
		}

		return result;
	};

	const translateData: TranslateData = {};

	translate.forEach((translate) => {
		translateData[translate.id] = {
			rich: getText(translate.id, true, lang),
			text: getText(translate.id, false, lang)
		};
	});

	return {
		translateData: translateData
	};
};
