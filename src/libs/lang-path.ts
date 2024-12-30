import { siteRootUrl, type Lang } from "@/define";

export const getLangPath = (path: string, lang: Lang) => {
	if (lang === "ja") {
		return path;
	}

	if (path.startsWith("/")) {
		if (path === "/") {
			return `/${lang}`;
		} else {
			return `/${lang}${path}`;
		}
	}

	if (path.startsWith(siteRootUrl)) {
		return path.replace(siteRootUrl, `${siteRootUrl}/${lang}`);
	}

	return path;
};

export const getCurrentPathList = (path?: string) => {
	const _path = path ?? location.pathname;

	return _path
		.replace(/\/$/, "")
		.replaceAll(/[/]{2,}/g, "/")
		.split("/");
};
