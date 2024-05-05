/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react";
import type { DotIllust } from "@/types";
import type { MicroCMSContentId, MicroCMSDate } from "microcms-js-sdk";
import { spWidth } from "@/define";

interface Props {
	dots: Array<DotIllust & MicroCMSContentId & MicroCMSDate>;
}

export default function ({ dots }: Props): JSX.Element {
	return (
		<div
			css={css`
				display: grid;
				grid-template-columns: repeat(4, 1fr);
				column-gap: 20px;
				row-gap: 30px;

				@media (max-width: ${spWidth}px) {
					grid-template-columns: repeat(5, 1fr);
				}

				@media (max-width: 900px) {
					grid-template-columns: repeat(4, 1fr);
				}

				@media (max-width: 700px) {
					grid-template-columns: repeat(3, 1fr);
				}

				@media (max-width: 500px) {
					grid-template-columns: repeat(2, 1fr);
				}
			`}
		>
			{dots.map((illust) => {
				return (
					<a
						key={illust.id}
						css={css`
							width: 100%;
							cursor: pointer;
							display: block;
							text-decoration: none;
							user-select: none;

							&:hover {
								opacity: 0.8;
							}
						`}
						href={`/dot/${illust.id}`}
					>
						<img
							css={css`
								display: block;
								width: 100%;
								aspect-ratio: 1/1;
								image-rendering: pixelated;
								pointer-events: none;
							`}
							src={illust.dot.url}
							alt={illust.title}
						/>
						<div
							css={css`
								display: flex;
								align-items: center;
								gap: 5px;
							`}
						>
							<img
								css={css`
									display: block;
									width: 32px;
									aspect-ratio: 1/1;
									image-rendering: pixelated;
								`}
								src={illust.dot.url}
								alt={illust.title}
							/>
							<div
								css={css`
									flex: 1;
									padding: 5px 10px 8px;
									text-decoration: none;
									background-color: #36364d;
									color: #faf5b1;
									border-radius: 4px;
									border-bottom: 2px solid #111116;
									border-top: 2px solid #58586e;
								`}
							>
								{illust.title}
							</div>
						</div>
					</a>
				);
			})}
		</div>
	);
}
