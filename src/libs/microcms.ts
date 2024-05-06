import { createClient } from "microcms-js-sdk";
import { nullToUndefined } from "@/libs/nullToUndefined";
import type { MicroCMSContentId, MicroCMSDate, MicroCMSListResponse, MicroCMSQueries } from "microcms-js-sdk";

const client = createClient({
	serviceDomain: process.env.MICROCMS_SERVICE_DOMAIN ?? "",
	apiKey: process.env.MICROCMS_API_KEY ?? ""
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

let cacheData: { [key: string]: any } = {};

export const cache = async <T>(key: string, factory: () => Promise<T>) => {
	if (!cacheData[key]) {
		cacheData[key] = await factory();
	}

	return cacheData[key] as T;
};
