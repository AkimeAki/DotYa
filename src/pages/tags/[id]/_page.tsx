/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react";
import DotList from "@/components/templates/DotList";
import type { DotIllust, DotIllustTag } from "@/types";
import type { MicroCMSContentId, MicroCMSDate } from "microcms-js-sdk";
import Title from "@/components/atoms/Title";

interface Props {
	dots: (DotIllust & MicroCMSContentId & MicroCMSDate)[];
	tag: DotIllustTag & MicroCMSContentId & MicroCMSDate;
}

export default function ({ dots, tag }: Props) {
	return (
		<>
			<div
				data-pagefind-ignore
				css={css`
					display: flex;
					flex-direction: column;
					gap: 40px;
				`}
			>
				<Title>{`${tag.name}タグが付いたドット絵一覧`}</Title>
				<DotList dots={dots} />
			</div>
			<div
				css={css`
					display: none;
				`}
			>
				{tag.id}
			</div>
		</>
	);
}
