/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react";
import DotList from "@/components/templates/DotList";
import type { DotIllust } from "@/types";
import type { MicroCMSContentId, MicroCMSDate } from "microcms-js-sdk";
import Title from "@/components/atoms/Title";
import type { Page } from "astro";
import Pagination from "@/components/molecules/Pagination";

interface Props {
	page: Page<DotIllust & MicroCMSContentId & MicroCMSDate>;
}

export default function ({ page }: Props) {
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
				<Title>ドット絵一覧 {page.currentPage}ページ目です。</Title>
				<Pagination current={page.currentPage} last={page.lastPage} baseUrl="/page/"></Pagination>
			</div>
			<DotList dots={page.data} />
			<Pagination current={page.currentPage} last={page.lastPage} baseUrl="/page/"></Pagination>
		</div>
	);
}
