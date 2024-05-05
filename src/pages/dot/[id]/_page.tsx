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
			<div
				css={css`
					margin-top: 30px;
				`}
			>
				<span
					onClick={() => {
						const download = async () => {
							try {
								const image = await fetch(`${dot.dot.url}?fm=png`);
								const imageBlob = await image.blob();
								const imageURL = URL.createObjectURL(imageBlob);

								const link = document.createElement("a");
								link.href = imageURL;
								link.download = `${dot.title}.png`;
								link.click();
							} catch (e) {}
						};

						void download();
					}}
					css={css`
						padding: 15px 20px 17px;
						display: block;
						text-decoration: none;
						background-color: #4d3d36;
						color: #faf5b1;
						border-radius: 4px;
						border-bottom: 2px solid #111516;
						border-top: 2px solid #6e6358;
						user-select: none;
						text-align: center;
						cursor: pointer;

						&:hover {
							background-color: #554a46;
						}
					`}
				>
					ダウンロード
				</span>
			</div>
		</>
	);
}
