import PixelButton from "@/components/atoms/PixelButton";
import Title from "@/components/atoms/Title";
import type { Lang } from "@/define";
import type { DotData } from "@/libs/format-dotlist";
import { dotJsonLd } from "@/libs/jsonld";
import { getLangPath } from "@/libs/lang-path";
import { cx } from "@/libs/merge-panda";
import { css } from "@/styled-system/css";
import type { TranslateData } from "@/types";
import { useEffect, useState } from "react";

interface Props {
	dot: DotData;
	lang: Lang;
	translateData: TranslateData;
	family?: Omit<DotData, "family">[];
}

export default function ({ dot, lang, translateData, family = [dot] }: Props): JSX.Element {
	const [viewDot, setViewDot] = useState<Omit<DotData, "family">>(family[0] ?? dot);

	useEffect(() => {
		let unmounted = false;
		let count = 0;

		const changeImage = () => {
			if (unmounted) {
				return;
			}

			count++;
			if (count >= family.length) {
				count = 0;
			}
			setViewDot(family[count] ?? dot);

			setTimeout(() => {
				changeImage();
			}, 2000);
		};

		changeImage();

		return () => {
			unmounted = true;
		};
	}, []);

	return (
		<div
			key={dot.id}
			className={cx(
				css`
					display: flex;
					flex-direction: column;
					gap: 2px;
				`,
				"dot-list-item"
			)}
		>
			<div
				className={css`
					display: flex;
					gap: 5px;
					flex-wrap: wrap;
					overflow: hidden;
					height: 32px;
					user-select: none;
					pointer-events: none;
				`}
			>
				{family.map((dot) => (
					<img
						key={dot.id}
						className={css`
							display: block;
							width: 32px;
							aspect-ratio: 1/1;
							image-rendering: pixelated;
						`}
						src={dot.illust.url}
						alt={dot.title[lang]}
					/>
				))}
			</div>
			<div
				className={css`
					position: relative;
					width: 100%;
					cursor: pointer;
					display: flex;
					flex-direction: column;
					gap: 5px;
					text-decoration: none;
					user-select: none;

					@media (hover: hover) {
						&:hover {
							.image-wrapper {
								&:before {
									content: "";
									display: block;
									position: absolute;
									top: 0;
									left: 0;
									width: calc(100% - 6px);
									height: calc(100% - 6px);
									border: 3px solid #492b18;
								}
							}
						}
					}
				`}
			>
				<div
					className={cx(
						css`
							position: relative;
							padding: 10px;
							background-color: white;
							width: calc(100% - 3px);

							&:after {
								content: "";
								display: block;
								position: absolute;
								top: 3px;
								left: 3px;
								width: 100%;
								height: 100%;
								background-color: #613e28;
								z-index: -1;
							}
						`,
						"image-wrapper"
					)}
				>
					<img
						className={css`
							display: block;
							width: 100%;
							aspect-ratio: 1/1;
							image-rendering: pixelated;
							pointer-events: none;
						`}
						src={viewDot.illust.url}
						alt={viewDot.title[lang]}
					/>
				</div>
				<div
					className={css`
						display: flex;
						position: relative;
						gap: 5px;
					`}
				>
					{dot.illust.size === 32 && (
						<PixelButton color="#dd5a21" attached>
							32px
						</PixelButton>
					)}
				</div>
				<div
					className={css`
						height: 50px;
						position: relative;
					`}
				>
					<div
						className={css`
							position: absolute;
							top: 0;
							left: 0;
							width: 100%;
						`}
					>
						<Title size="small" h={3}>
							{viewDot.title[lang]}
						</Title>
					</div>
				</div>
				<a
					aria-label={dot.title[lang]}
					className={css`
						position: absolute;
						top: 0;
						left: 0;
						width: 100%;
						height: 100%;
					`}
					href={getLangPath(`/dot/${dot.id}`, lang)}
				/>
			</div>
			{dot.illust.size === 32 && (
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{
						__html: JSON.stringify(
							dotJsonLd(
								`${dot.illust.url}?w=512&q=100&px=${16}`,
								dot.title[lang],
								translateData,
								lang,
								false
							)
						)
					}}
				/>
			)}
		</div>
	);
}
