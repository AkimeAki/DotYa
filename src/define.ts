export const siteRootUrl = "https://pixel.gives";
export type Lang = "ja" | "zh-cn" | "zh-tw";
export const langList: Lang[] = ["ja", "zh-tw", "zh-cn"];
export const pageLangList: Lang[] = langList.filter((l) => l !== "ja");
