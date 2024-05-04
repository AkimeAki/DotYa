/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react";
import type { DotIllust } from "@/types";
import type { MicroCMSContentId, MicroCMSDate } from "microcms-js-sdk";

interface Props {
	dot: DotIllust & MicroCMSContentId & MicroCMSDate;
}

export default function ({ dot }: Props): JSX.Element {
	return (
		<>
			<h2
				css={css`
					padding: 15px 20px 20px;
					text-decoration: none;
					background-color: #36364d;
					color: #faf5b1;
					border-radius: 4px;
					border-bottom: 2px solid #111116;
					border-top: 2px solid #58586e;
					font-size: 30px;
				`}
			>
				{dot.title}
			</h2>
			<div
				css={css`
					display: flex;
					flex-wrap: wrap;
					align-items: flex-end;
					user-select: none;
					pointer-events: none;
				`}
			>
				{[256, 128, 64, 32].map((pixel) => (
					<img
						key={pixel}
						css={css`
							display: block;
							width: ${pixel}px;
							aspect-ratio: 1/1;
							image-rendering: pixelated;
						`}
						src={dot.dot.url}
						alt={dot.title}
					/>
				))}
			</div>
		</>
	);
}
