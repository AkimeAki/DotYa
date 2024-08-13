/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react";
import DotList from "@/components/templates/DotList";
import type { DotIllustTag } from "@/types";
import type { MicroCMSContentId, MicroCMSDate } from "microcms-js-sdk";
import Title from "@/components/atoms/Title";
import Pagination from "@/components/molecules/Pagination";
import type { DotData } from "@/libs/format-dotlist";

interface Props {
	dots: DotData[];
	tag: DotIllustTag & MicroCMSContentId & MicroCMSDate;
	lastPage: number;
}

export default function ({ dots, tag, lastPage }: Props) {
	return (
		<div
			css={css`
				display: flex;
				flex-direction: column;
				gap: 40px;
			`}
		>
			<div
				css={css`
					display: flex;
					flex-direction: column;
					gap: 20px;
				`}
			>
				<Title>{tag.name}タグが付いたドット絵 1ページ目</Title>
				<Pagination current={1} last={lastPage} baseUrl={`/tags/${tag.id}/page/`} />
			</div>
			<DotList dots={dots} />
			<Pagination current={1} last={lastPage} baseUrl={`/tags/${tag.id}/page/`} />
		</div>
	);
}
