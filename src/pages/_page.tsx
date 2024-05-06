/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react";
import type { DotIllust } from "@/types";
import type { MicroCMSContentId, MicroCMSDate } from "microcms-js-sdk";
import { spWidth } from "@/define";
import PixelButton from "@/components/atoms/PixelButton";
import { useState } from "react";
import Title from "@/components/atoms/Title";

interface SelectPixel {
	[key: string]: {
		"32"?: boolean;
		"16"?: boolean;
	};
}

interface Props {
	dots: Array<DotIllust & MicroCMSContentId & MicroCMSDate>;
	title: string;
}

export default function ({ dots, title }: Props): JSX.Element {
	let initSelectPixel: SelectPixel = {};

	dots.forEach((dot) => {
		if (dot.dot32 !== undefined) {
			if (initSelectPixel[dot.id] === undefined) {
				initSelectPixel[dot.id] = {
					"32": true
				};
			} else {
				(initSelectPixel[dot.id] as any)["32"] = false;
			}
		}

		if (dot.dot16 !== undefined) {
			if (initSelectPixel[dot.id] === undefined) {
				initSelectPixel[dot.id] = {
					"16": true
				};
			} else {
				(initSelectPixel[dot.id] as any)["16"] = false;
			}
		}
	});

	const [selectPixel, setSelectPixel] = useState<SelectPixel>(initSelectPixel);

	const changePixel = (id: string, setPixel: number) => {
		setSelectPixel((selectPixel) => {
			const _selectPixel: SelectPixel = JSON.parse(JSON.stringify(selectPixel));
			Object.keys(_selectPixel[id] as any).forEach((pixel) => {
				(_selectPixel[id] as any)[pixel] = false;
			});

			(_selectPixel[id] as any)[String(setPixel)] = true;

			return _selectPixel;
		});
	};

	return (
		<div
			css={css`
				display: flex;
				flex-direction: column;
				gap: 10px;
			`}
		>
			<Title>{title}</Title>
			<div
				css={css`
					display: grid;
					grid-template-columns: repeat(5, 1fr);
					column-gap: 20px;
					row-gap: 30px;

					@media (max-width: ${spWidth}px) {
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

					@media (max-width: 500px) {
						grid-template-columns: repeat(2, 1fr);
					}
				`}
			>
				{dots.map((illust) => {
					return (
						<div
							key={illust.id}
							css={css`
								display: flex;
								flex-direction: column;
								gap: 2px;
							`}
						>
							<div
								css={css`
									display: flex;
									gap: 5px;
								`}
							>
								{illust.dot32 !== undefined && (
									<img
										css={css`
											display: block;
											width: 32px;
											aspect-ratio: 1/1;
											image-rendering: pixelated;
										`}
										src={illust.dot32.url}
										alt={illust.title}
									/>
								)}
								{illust.dot16 !== undefined && (
									<img
										css={css`
											display: block;
											width: 32px;
											aspect-ratio: 1/1;
											image-rendering: pixelated;
										`}
										src={illust.dot16.url}
										alt={illust.title}
									/>
								)}
							</div>
							<div
								key={illust.id}
								css={css`
									position: relative;
									width: 100%;
									cursor: pointer;
									display: flex;
									flex-direction: column;
									gap: 5px;
									text-decoration: none;
									user-select: none;

									&:hover {
										opacity: 0.8;
									}
								`}
							>
								<div
									css={css`
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
									`}
								>
									{(selectPixel[illust.id] as any)["32"] === true && (
										<img
											css={css`
												display: block;
												width: 100%;
												aspect-ratio: 1/1;
												image-rendering: pixelated;
												pointer-events: none;
											`}
											src={illust.dot32?.url}
											alt={illust.title}
										/>
									)}
									{(selectPixel[illust.id] as any)["16"] === true && (
										<img
											css={css`
												display: block;
												width: 100%;
												aspect-ratio: 1/1;
												image-rendering: pixelated;
												pointer-events: none;
											`}
											src={illust.dot16?.url}
											alt={illust.title}
										/>
									)}
								</div>
								<div
									css={css`
										display: flex;
										position: relative;
										z-index: 99;
										gap: 5px;
									`}
								>
									{illust.dot32 !== undefined && (
										<PixelButton
											color="#dd5a21"
											onClick={() => {
												changePixel(illust.id, 32);
											}}
											attached={(selectPixel[illust.id] as any)["32"] === true}
										>
											32px
										</PixelButton>
									)}
									{illust.dot16 !== undefined && (
										<PixelButton
											color="#dd21be"
											onClick={() => {
												changePixel(illust.id, 16);
											}}
											attached={(selectPixel[illust.id] as any)["16"] === true}
										>
											16px
										</PixelButton>
									)}
								</div>
								<h3
									css={css`
										flex: 1;
										padding: 5px 10px 8px;
										text-decoration: none;
										background-color: #36364d;
										color: #faf5b1;
										border-radius: 4px;
										border-bottom: 2px solid #111116;
										border-top: 2px solid #58586e;
										font-size: 14px;
									`}
								>
									{illust.title}
								</h3>
								<a
									css={css`
										position: absolute;
										top: 0;
										left: 0;
										width: 100%;
										height: 100%;
									`}
									href={`/dot/${illust.id}`}
								/>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
}
