import nullToUndefined from "@akimeaki/null-to-undefined";
import { createClient } from "microcms-js-sdk";
import type { MicroCMSContentId, MicroCMSDate, MicroCMSListResponse, MicroCMSQueries } from "microcms-js-sdk";

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
	queries: MicroCMSQueries = {}
): Promise<Array<T & MicroCMSContentId & MicroCMSDate>> => {
	const response = await client.getAllContents<T>({ endpoint: apiName, queries });
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
