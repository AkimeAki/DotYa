/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react";
import type { DotIllust } from "@/types";
import type { MicroCMSContentId, MicroCMSDate } from "microcms-js-sdk";
import Button from "@/components/atoms/Button";
import { downloadImage } from "@/libs/download-image";
import Title from "@/components/atoms/Title";
import PictureFrame from "@/components/atoms/PictureFrame";

interface Props {
	dot: DotIllust & MicroCMSContentId & MicroCMSDate;
}

export default function ({ dot }: Props): JSX.Element {
	return (
		<div
			css={css`
				display: flex;
				flex-direction: column;
				gap: 30px;
			`}
		>
			<Title>{dot.title}</Title>
			<div
				css={css`
					display: flex;
					flex-direction: column;
					gap: 30px;
				`}
			>
				{dot.dot32 !== undefined && (
					<div>
						<div
							css={css`
								display: flex;
								flex-wrap: wrap;
								align-items: flex-end;
								user-select: none;
								pointer-events: none;
								gap: 20px;
							`}
						>
							{[128, 64, 32].map((pixel) => {
								return (
									<PictureFrame key={pixel} size={pixel} src={dot.dot32?.url ?? ""} alt={dot.title} />
								);
							})}
						</div>
						<div
							css={css`
								margin-top: 30px;
							`}
						>
							<Button
								onClick={() => {
									void downloadImage(`${dot.dot32?.url}?fm=png`, dot.title);
								}}
							>
								32px版をダウンロード
							</Button>
						</div>
					</div>
				)}
				{dot.dot16 !== undefined && (
					<div>
						<div
							css={css`
								display: flex;
								flex-wrap: wrap;
								align-items: flex-end;
								user-select: none;
								pointer-events: none;
								gap: 20px;
							`}
						>
							{[128, 64, 32].map((pixel) => {
								return (
									<PictureFrame key={pixel} size={pixel} src={dot.dot16?.url ?? ""} alt={dot.title} />
								);
							})}
						</div>
						<div
							css={css`
								margin-top: 30px;
							`}
						>
							<Button
								onClick={() => {
									void downloadImage(`${dot.dot16?.url}?fm=png`, dot.title);
								}}
							>
								16px版をダウンロード
							</Button>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
