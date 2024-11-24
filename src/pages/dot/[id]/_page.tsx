/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react";
import Button from "@/components/atoms/Button";
import { downloadImage } from "@/libs/download-image";
import Title from "@/components/atoms/Title";
import PictureFrame from "@/components/atoms/PictureFrame";
import PixelButton from "@/components/atoms/PixelButton";
import DotList from "@/components/templates/DotList";
import ShareButton from "@/components/atoms/ShareButton";
import { useState } from "react";
import Checkbox from "@/components/atoms/Checkbox";
import type { DotData } from "@/libs/format-dotlist";
import GoogleAds from "@/components/atoms/GoogleAds";

interface Props {
	dot: DotData;
	sameTagDots: DotData[][];
}

export default function ({ dot, sameTagDots }: Props): JSX.Element {
	const [termsAgree, setTermsAgree] = useState<boolean>(false);

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
				<div
					css={css`
						display: flex;
						flex-direction: column;
						gap: 10px;
						align-items: flex-start;
					`}
				>
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
							src={dot.illust.url}
							alt={dot.title}
						/>
						{[256, 128, 64, 32].map((pixel) => {
							return <PictureFrame key={pixel} size={pixel} src={dot.illust.url} alt={dot.title} />;
						})}
					</div>
				</div>
				{/* {dot.dot64 !== undefined && (
					<div
						css={css`
							display: flex;
							flex-direction: column;
							gap: 10px;
							align-items: flex-start;
						`}
					>
						<Title size="small" h={3}>
							64px
						</Title>
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
							{[256, 128, 64, 32].map((pixel) => {
								return (
									<PictureFrameDom key={pixel} size={pixel} width={64} dom={dot.dot64?.dom ?? ""} />
								);
							})}
						</div>
					</div>
				)} */}
				<div
					css={css`
						display: flex;
						gap: 5px;
						flex-direction: column;
					`}
				>
					<p>
						サイズ：{dot.illust.size}px × {dot.illust.size}px
					</p>
					<div
						css={css`
							display: flex;
							gap: 5px;
							flex-wrap: wrap;
							align-items: baseline;
						`}
					>
						タグ：
						{dot.tags.map((tag) => {
							return (
								<PixelButton key={tag.id} href={`/tags/${tag.id}`} color="#4d3d36">
									{tag.name}
								</PixelButton>
							);
						})}
					</div>
					<p>
						作者：
						<span>ろむ</span>
					</p>
				</div>

				<div
					css={css`
						display: flex;
						flex-direction: column;
						gap: 10px;
					`}
				>
					<div>
						<Checkbox isChecked={termsAgree} setIsChecked={setTermsAgree}>
							<a href="/terms" target="_blank">
								利用規約
							</a>
							を読んで同意しました
						</Checkbox>
					</div>
					<Button
						disabled={!termsAgree}
						onClick={() => {
							if (termsAgree) {
								if (dot.illust.size === 32) {
									// eslint-disable-next-line @typescript-eslint/ban-ts-comment
									// @ts-expect-error
									dataLayer.push({ event: "download-32", dot_id: dot.id, dot_name: dot.title });
								} else if (dot.illust.size === 16) {
									// eslint-disable-next-line @typescript-eslint/ban-ts-comment
									// @ts-expect-error
									dataLayer.push({ event: "download-16", dot_id: dot.id, dot_name: dot.title });
								}
								void downloadImage(`${dot.illust.url}?fm=png`, dot.title);
							}
						}}
					>
						ダウンロードする
					</Button>
					{/* {dot.dot64 !== undefined && (
							<Button
								disabled={!termsAgree}
								onClick={() => {
									// eslint-disable-next-line @typescript-eslint/ban-ts-comment
									// @ts-expect-error
									dataLayer.push({ event: "buy-64", dot_id: dot.id, dot_name: dot.title });
									void downloadImage(`${dot.dot16?.url}?fm=png`, dot.title);
								}}
							>
								64px版を購入する画面に進む
							</Button>
						)} */}
				</div>
			</div>

			<div
				css={css`
					display: flex;
					gap: 5px;
					flex-wrap: wrap;
				`}
			>
				<ShareButton
					target="_blank"
					icon="/icons/x.png"
					size={18}
					onClick={() => {
						// eslint-disable-next-line @typescript-eslint/ban-ts-comment
						// @ts-expect-error
						dataLayer.push({ event: "click-share", service: "X" });
					}}
					href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(dot.title)}&url=${encodeURIComponent(`https://pixel.gives/dot/${dot.id}`)}&hashtags=${encodeURIComponent("どっとや,pixelgives")}`}
				>
					でシェア
				</ShareButton>
				<ShareButton
					size={22}
					icon="/icons/bluesky.png"
					target="_blank"
					onClick={() => {
						// eslint-disable-next-line @typescript-eslint/ban-ts-comment
						// @ts-expect-error
						dataLayer.push({ event: "click-share", service: "Bluesky" });
					}}
					href={`https://bsky.app/intent/compose?text=${encodeURIComponent(dot.title)} ${encodeURIComponent("#どっとや #dotya #pixelgives")} ${encodeURIComponent(`https://pixel.gives/dot/${dot.id}`)}`}
				>
					でシェア
				</ShareButton>
				<ShareButton
					size={22}
					icon="/icons/pocket.png"
					target="_blank"
					onClick={() => {
						// eslint-disable-next-line @typescript-eslint/ban-ts-comment
						// @ts-expect-error
						dataLayer.push({ event: "click-share", service: "Pocket" });
					}}
					href={`https://getpocket.com/save?url=${encodeURIComponent(`https://pixel.gives/dot/${dot.id}`)}`}
				>
					で保存
				</ShareButton>
				<ShareButton
					size={20}
					icon="/icons/hatena.png"
					target="_blank"
					onClick={() => {
						// eslint-disable-next-line @typescript-eslint/ban-ts-comment
						// @ts-expect-error
						dataLayer.push({ event: "click-share", service: "はてなブックマーク" });
					}}
					href={`https://b.hatena.ne.jp/entry/s/pixel.gives/dot/${dot.id}#bbutton`}
				>
					で保存
				</ShareButton>
			</div>

			<GoogleAds slot="9512157076" />

			{dot.tags[0] !== undefined && sameTagDots[0] !== undefined && sameTagDots[0].length !== 0 && (
				<div
					css={css`
						display: flex;
						flex-direction: column;
						gap: 40px;
					`}
				>
					<Title>他にも{dot.tags[0].name}のドット絵あるよ！</Title>
					<DotList dots={sameTagDots[0]} />
					{sameTagDots[0].length > 15 && (
						<Button href={`/tags/${dot.tags[0].id}`}>もっと{dot.tags[0].name}のドット絵を見る</Button>
					)}
				</div>
			)}

			{dot.tags[1] !== undefined && sameTagDots[1] !== undefined && sameTagDots[1].length !== 0 && (
				<div
					css={css`
						display: flex;
						flex-direction: column;
						gap: 40px;
					`}
				>
					<Title>{dot.tags[1].name}のドット絵もどうぞ！</Title>
					<DotList dots={sameTagDots[1]} />
					{sameTagDots[1].length > 15 && (
						<Button href={`/tags/${dot.tags[1].id}`}>もっと{dot.tags[1].name}のドット絵を見る</Button>
					)}
				</div>
			)}

			<GoogleAds slot="9512157076" />
		</div>
	);
}
