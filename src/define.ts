export const siteRootUrl = "https://pixel.gives";
export type Lang = "ja" | "zh-cn" | "zh-tw" | "zh";
export const langList: Lang[] = ["ja", "zh-tw", "zh-cn"];
export const pageLangList: Lang[] = langList.filter((l) => l !== "ja");
export const hrefLangList: Lang[] = ["ja", "zh-tw", "zh-cn", "zh"];
