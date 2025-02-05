import type { Translate, TranslateData } from "@/types";
import { getCachedContents } from "@/libs/microcms";
import type { Lang } from "@/define";
import * as cheerio from "cheerio";

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

		if (lang === "zh-cn") {
			if (data["zh-cn"] !== undefined) {
				const $ = cheerio.load(data["zh-cn"]);
				if ($("body").text() === "") {
					if (data["zh-tw"] !== undefined) {
						const $ = cheerio.load(data["zh-tw"]);
						if ($("body").text() === "") {
							const $ = cheerio.load(data["ja"]);
							if (rich) {
								result = $("body").html() ?? "<p></p>";
							} else {
								result = $("body").text();
							}
						} else {
							if (rich) {
								result = $("body").html() ?? "<p></p>";
							} else {
								result = $("body").text();
							}
						}
					} else {
						const $ = cheerio.load(data["ja"]);
						if (rich) {
							result = $("body").html() ?? "<p></p>";
						} else {
							result = $("body").text();
						}
					}
				} else {
					if (rich) {
						result = $("body").html() ?? "<p></p>";
					} else {
						result = $("body").text();
					}
				}
			} else {
				if (data["zh-tw"] !== undefined) {
					const $ = cheerio.load(data["zh-tw"]);
					if ($("body").text() === "") {
						const $ = cheerio.load(data["ja"]);
						if (rich) {
							result = $("body").html() ?? "<p></p>";
						} else {
							result = $("body").text();
						}
					} else {
						if (rich) {
							result = $("body").html() ?? "<p></p>";
						} else {
							result = $("body").text();
						}
					}
				} else {
					const $ = cheerio.load(data["ja"]);
					if (rich) {
						result = $("body").html() ?? "<p></p>";
					} else {
						result = $("body").text();
					}
				}
			}
		} else if (lang === "zh-tw") {
			if (data["zh-tw"] !== undefined) {
				const $ = cheerio.load(data["zh-tw"]);
				if ($("body").text() === "") {
					if (data["zh-cn"] !== undefined) {
						const $ = cheerio.load(data["zh-cn"]);
						if ($("body").text() === "") {
							const $ = cheerio.load(data["ja"]);
							if (rich) {
								result = $("body").html() ?? "<p></p>";
							} else {
								result = $("body").text();
							}
						} else {
							if (rich) {
								result = $("body").html() ?? "<p></p>";
							} else {
								result = $("body").text();
							}
						}
					} else {
						const $ = cheerio.load(data["ja"]);
						if (rich) {
							result = $("body").html() ?? "<p></p>";
						} else {
							result = $("body").text();
						}
					}
				} else {
					if (rich) {
						result = $("body").html() ?? "<p></p>";
					} else {
						result = $("body").text();
					}
				}
			} else {
				if (data["zh-cn"] !== undefined) {
					const $ = cheerio.load(data["zh-cn"]);
					if ($("body").text() === "") {
						const $ = cheerio.load(data["ja"]);
						if (rich) {
							result = $("body").html() ?? "<p></p>";
						} else {
							result = $("body").text();
						}
					} else {
						if (rich) {
							result = $("body").html() ?? "<p></p>";
						} else {
							result = $("body").text();
						}
					}
				} else {
					const $ = cheerio.load(data["ja"]);
					if (rich) {
						result = $("body").html() ?? "<p></p>";
					} else {
						result = $("body").text();
					}
				}
			}
		} else if (lang === "en") {
			if (data["en"] !== undefined) {
				const $ = cheerio.load(data["en"]);
				if ($("body").text() === "") {
					const $ = cheerio.load(data["ja"]);
					if (rich) {
						result = $("body").html() ?? "<p></p>";
					} else {
						result = $("body").text();
					}
				} else {
					if (rich) {
						result = $("body").html() ?? "<p></p>";
					} else {
						result = $("body").text();
					}
				}
			} else {
				const $ = cheerio.load(data["ja"]);
				if (rich) {
					result = $("body").html() ?? "<p></p>";
				} else {
					result = $("body").text();
				}
			}
		} else if (lang === "ja") {
			const $ = cheerio.load(data["ja"]);
			if (rich) {
				result = $("body").html() ?? "<p></p>";
			} else {
				result = $("body").text();
			}
		} else {
			const $ = cheerio.load(data["ja"]);
			if (rich) {
				result = $("body").html() ?? "<p></p>";
			} else {
				result = $("body").text();
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
