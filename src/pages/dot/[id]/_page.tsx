/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react";
import type { DotIllust } from "@/types";
import type { MicroCMSContentId, MicroCMSDate } from "microcms-js-sdk";
import Button from "@/components/atoms/Button";
import { downloadImage } from "@/libs/download-image";
import Title from "@/components/atoms/Title";
import PictureFrame from "@/components/atoms/PictureFrame";
import PixelButton from "@/components/atoms/PixelButton";
import DotList from "@/components/templates/DotList";
import Keywords from "@/components/organisms/Keywords";
import { copy } from "@/libs/copy-object";

interface Props {
	dot: DotIllust & MicroCMSContentId & MicroCMSDate;
	sameTagDots: (DotIllust & MicroCMSContentId & MicroCMSDate)[][];
}

export default function ({ dot, sameTagDots }: Props): JSX.Element {
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
							<img
								css={css`
									display: none;
								`}
								src={dot.dot32?.url ?? ""}
								alt={dot.title}
								data-pagefind-meta="image[src], image_alt[alt]"
							/>
							{[256, 128, 64, 32].map((pixel) => {
								return (
									<PictureFrame key={pixel} size={pixel} src={dot.dot32?.url ?? ""} alt={dot.title} />
								);
							})}
						</div>
						<div
							data-pagefind-ignore
							css={css`
								margin-top: 30px;
							`}
						>
							<Button
								onClick={() => {
									// @ts-ignore
									dataLayer.push({ event: "download-32" });
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
							{dot.dot32 === undefined && (
								<img
									css={css`
										display: none;
									`}
									src={dot.dot16?.url ?? ""}
									alt={dot.title}
									data-pagefind-meta="image[src], image_alt[alt]"
								/>
							)}
							{[256, 128, 64, 32].map((pixel) => {
								return (
									<PictureFrame key={pixel} size={pixel} src={dot.dot16?.url ?? ""} alt={dot.title} />
								);
							})}
						</div>
						<div
							data-pagefind-ignore
							css={css`
								margin-top: 30px;
							`}
						>
							<Button
								onClick={() => {
									// @ts-ignore
									dataLayer.push({ event: "download-16" });
									void downloadImage(`${dot.dot16?.url}?fm=png`, dot.title);
								}}
							>
								16px版をダウンロード
							</Button>
						</div>
					</div>
				)}
			</div>

			<div
				css={css`
					display: flex;
					gap: 5px;
					flex-wrap: wrap;
				`}
			>
				タグ:
				{dot.tags.map((tag) => {
					return (
						<PixelButton key={tag.id} href={`/tags/${tag.id}`} color="#4d3d36">
							{tag.name}
						</PixelButton>
					);
				})}
				<div
					data-pagefind-meta="タグ"
					css={css`
						display: none;
					`}
				>
					{dot.tags.map((tag) => tag.name).join(", ")}
				</div>
				<Keywords dot={dot} />
			</div>

			{dot.tags[0] !== undefined &&
				sameTagDots[0] !== undefined &&
				(() => {
					const dots = copy<(typeof sameTagDots)[0]>(sameTagDots[0]);
					dots.length = 20;

					return (
						<div
							data-pagefind-ignore
							css={css`
								display: flex;
								flex-direction: column;
								gap: 40px;
							`}
						>
							<Title>他にも{dot.tags[0].name}のドット絵あるよ！</Title>
							<DotList dots={dots} />
							{sameTagDots.length > 20 && (
								<Button href={`/tags/${dot.tags[0].id}`}>
									もっと{dot.tags[0].name}のドット絵を見る
								</Button>
							)}
						</div>
					);
				})()}

			{dot.tags[1] !== undefined &&
				sameTagDots[1] !== undefined &&
				(() => {
					const dots = copy<(typeof sameTagDots)[1]>(sameTagDots[1]);
					dots.length = 20;

					return (
						<div
							data-pagefind-ignore
							css={css`
								display: flex;
								flex-direction: column;
								gap: 40px;
							`}
						>
							<Title>{dot.tags[1].name}のドット絵もこちら！</Title>
							<DotList dots={dots} />
							{sameTagDots.length > 20 && (
								<Button href={`/tags/${dot.tags[1].id}`}>
									もっと{dot.tags[1].name}のドット絵を見る
								</Button>
							)}
						</div>
					);
				})()}
		</div>
	);
}
