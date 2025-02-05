export const siteRootUrl = "https://pixel.gives";
export type Lang = "ja" | "zh-cn" | "zh-tw" | "en";
export type HrefLang = Lang | "zh" | "en";
export const langList: Lang[] = ["ja", "zh-tw", "zh-cn", "en"];
export const pageLangList: Lang[] = langList.filter((l) => l !== "ja");
export const hrefLangList: HrefLang[] = ["ja", "zh-tw", "zh-cn", "zh", "en"];
