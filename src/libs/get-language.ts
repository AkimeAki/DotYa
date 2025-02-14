import { langList, type Lang } from "@/define";
import { getCurrentPathList } from "@/libs/lang-path";

export const getCurrentLanguage = () => {
	let currentLanguage = "";

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

	return langList.includes(currentLanguage as Lang) ? currentLanguage : "ja";
};
