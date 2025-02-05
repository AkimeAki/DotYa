import { langList, type Lang } from "@/define";
import { getCurrentPathList } from "@/libs/lang-path";

export const getCurrentLanguage = () => {
	let currentLanguage = "";

	if (window.navigator.cookieEnabled) {
		const cookies = document.cookie.split(";");
		currentLanguage = (
			(
				cookies.find((cookie) => {
					const splitResult = cookie.split("=")[0];

					return splitResult !== undefined && splitResult.trim() === "language".trim();
				}) ?? ""
			).split("=")[1] ?? ""
		).replaceAll('"', "");
	}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	if (!langList.includes(currentLanguage as any)) {
		const language = window.navigator.language;
		if (language === "ja" || language === "ja-JP") {
			currentLanguage = "ja";
		}

		if (language === "zh-TW") {
			currentLanguage = "zh-tw";
		}

		if (language === "zh" || language.startsWith("zh-")) {
			currentLanguage = "zh-cn";
		}

		if (language === "en" || language.startsWith("en-")) {
			currentLanguage = "en";
		}
	}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	if (!langList.includes(currentLanguage as any)) {
		const currentPath = getCurrentPathList();

		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		if (!langList.includes(currentPath[1] as any)) {
			currentLanguage = "ja";
		} else if (currentPath[1] !== undefined) {
			currentLanguage = currentPath[1];
		}
	}

	return langList.includes(currentLanguage as Lang) ? (currentLanguage as Lang) : "ja";
};
