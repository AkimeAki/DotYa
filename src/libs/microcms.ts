import { createClient } from "microcms-js-sdk";
import { nullToUndefined } from "@/libs/nullToUndefined";
import type { MicroCMSContentId, MicroCMSDate, MicroCMSListResponse, MicroCMSQueries } from "microcms-js-sdk";
import type { Runtime } from "@astrojs/cloudflare";

const client = createClient({
	serviceDomain: import.meta.env.MICROCMS_SERVICE_DOMAIN ?? "",
	apiKey: import.meta.env.MICROCMS_API_KEY ?? ""
});

export const getListContents = async <T>(
	apiName: string,
	queries: MicroCMSQueries = {}
): Promise<MicroCMSListResponse<T>> => {
	const response = await client.get<MicroCMSListResponse<T>>({ endpoint: apiName, queries });
	return nullToUndefined<MicroCMSListResponse<T>>(response);
};

export const getListAllContents = async <T>(
	apiName: string,
	queries: MicroCMSQueries = {},
	runtime?: Runtime
): Promise<Array<T & MicroCMSContentId & MicroCMSDate>> => {
	let microCmsClient = client;
	if (runtime !== undefined) {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-expect-error
		const { MICROCMS_SERVICE_DOMAIN, MICROCMS_API_KEY } = runtime.env;

		microCmsClient = createClient({
			serviceDomain: MICROCMS_SERVICE_DOMAIN ?? "",
			apiKey: MICROCMS_API_KEY ?? ""
		});
	}

	const response = await microCmsClient.getAllContents<T>({ endpoint: apiName, queries });
	return nullToUndefined<Array<T & MicroCMSContentId & MicroCMSDate>>(response);
};

export const getContentsDetail = async <T>(
	apiName: string,
	contentId: string,
	queries: MicroCMSQueries = {}
): Promise<T & MicroCMSContentId & MicroCMSDate> => {
	const content = await client.getListDetail<T>({
		endpoint: apiName,
		contentId,
		queries
	});

	return nullToUndefined<T & MicroCMSContentId & MicroCMSDate>(content);
};

const cacheData: { [apiName: string]: unknown[] } = {};

export const getCachedContents = async <T>(apiName: string): Promise<(T & MicroCMSContentId & MicroCMSDate)[]> => {
	if (cacheData[apiName] === undefined) {
		cacheData[apiName] = await getListAllContents(apiName);
	}

	return cacheData[apiName] as (T & MicroCMSContentId & MicroCMSDate)[];
};
