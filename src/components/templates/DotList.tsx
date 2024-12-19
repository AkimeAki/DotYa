import PixelButton from "@/components/atoms/PixelButton";
import Title from "@/components/atoms/Title";
import type { DotData } from "@/libs/format-dotlist";
import { dotJsonLd } from "@/libs/jsonld";
import { cx } from "@/libs/merge-panda";
import { css } from "@/styled-system/css";

interface Props {
	dots: DotData[];
}

export default function ({ dots }: Props): JSX.Element {
	return (
		<div
			className={css`
				display: grid;
				grid-template-columns: repeat(5, 1fr);
				column-gap: 20px;
				row-gap: 30px;

				@media (max-width: 1130px) {
					grid-template-columns: repeat(6, 1fr);
				}

				@media (max-width: 1000px) {
					grid-template-columns: repeat(5, 1fr);
				}

				@media (max-width: 900px) {
					grid-template-columns: repeat(4, 1fr);
				}

				@media (max-width: 700px) {
					grid-template-columns: repeat(3, 1fr);
				}
			`}
		>
			{dots.map((dot) => {
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
								user-select: none;
								pointer-events: none;
							`}
						>
							<img
								className={css`
									display: block;
									width: 32px;
									aspect-ratio: 1/1;
									image-rendering: pixelated;
								`}
								src={dot.illust.url}
								alt={dot.title}
							/>
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
										height: calc(100% - 3px);

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
									src={dot.illust.url}
									alt={dot.title}
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
								{dot.illust.size === 16 && (
									<PixelButton color="#dd21be" attached>
										16px
									</PixelButton>
								)}
							</div>
							<Title size="small" h={3}>
								{dot.title}
							</Title>
							<a
								aria-label={dot.title}
								className={css`
									position: absolute;
									top: 0;
									left: 0;
									width: 100%;
									height: 100%;
								`}
								href={`/dot/${dot.id}`}
							/>
						</div>
						{dot.illust.size === 32 && (
							<script
								type="application/ld+json"
								dangerouslySetInnerHTML={{
									__html: JSON.stringify(
										dotJsonLd(`${dot.illust.url}?w=512&q=100&px=${16}`, dot.title, false)
									)
								}}
							/>
						)}
						{dot.illust.size === 16 && (
							<script
								type="application/ld+json"
								dangerouslySetInnerHTML={{
									__html: JSON.stringify(
										dotJsonLd(`${dot.illust.url}?w=512&q=100&px=${32}`, dot.title, false)
									)
								}}
							/>
						)}
					</div>
				);
			})}
		</div>
	);
}
