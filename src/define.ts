export const siteRootUrl = "https://pixel.gives";
export type Lang = "ja" | "zh-cn" | "zh-tw" | "en";
export const langList: Lang[] = ["ja", "zh-tw", "zh-cn", "en"];
export const pageLangList: Lang[] = langList.filter((l) => l !== "ja");
export const hrefLangList = ["ja", "zh-tw", "zh-cn", "zh", "en"];
export const langPriority: Record<Lang, Lang[]> = {
	"zh-cn": ["zh-cn", "zh-tw", "en", "ja"],
	"zh-tw": ["zh-tw", "zh-cn", "en", "ja"],
	en: ["en", "ja"],
	ja: ["ja"]
};
