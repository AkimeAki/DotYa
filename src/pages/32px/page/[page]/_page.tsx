/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react";
import DotList from "@/components/templates/DotList";
import Title from "@/components/atoms/Title";
import type { Page } from "astro";
import Pagination from "@/components/molecules/Pagination";
import type { DotData } from "@/libs/format-dotlist";

interface Props {
	page: Page<DotData>;
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
				<Title>32pxのドット絵一覧 {page.currentPage}ページ目です。</Title>
				<Pagination current={page.currentPage} last={page.lastPage} baseUrl="/page/"></Pagination>
			</div>
			<DotList dots={page.data} />
			<Pagination current={page.currentPage} last={page.lastPage} baseUrl="/page/"></Pagination>
		</div>
	);
}
