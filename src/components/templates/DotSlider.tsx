/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react";
import PixelButton from "@/components/atoms/PixelButton";
import Title from "@/components/atoms/Title";
import type { DotData } from "@/libs/format-dotlist";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";

interface Props {
	dots: DotData[];
	slide?: "ease" | "linear";
	reverse?: boolean;
}

export default function ({ dots, slide = "ease", reverse = false }: Props): JSX.Element {
	return (
		<div
			css={css`
				width: 100%;
			`}
		>
			<Swiper
				css={css`
					${slide === "linear" &&
					css`
						.swiper-wrapper {
							transition-timing-function: linear;
						}
					`}

					${reverse &&
					css`
						transform: rotate(180deg);

						.swiper-slide {
							transform: rotate(180deg);
						}
					`}

					.swiper-slide {
						align-items: flex-start;
					}
				`}
				modules={[Autoplay]}
				spaceBetween={20}
				slidesPerView={3}
				speed={slide === "linear" ? 3000 : 1000}
				breakpointsBase="window"
				autoplay={{
					delay: slide === "linear" ? 0 : 2000,
					disableOnInteraction: false
				}}
				allowTouchMove={false}
				direction="horizontal"
				freeMode
				loop
				breakpoints={{
					701: { slidesPerView: 4 },
					901: { slidesPerView: 5 },
					1001: { slidesPerView: 6 },
					1131: { slidesPerView: 5 }
				}}
			>
				{dots.map((dot) => {
					return (
						<SwiperSlide key={dot.id}>
							<div
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
										user-select: none;
										pointer-events: none;
									`}
								>
									<img
										css={css`
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
									css={css`
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
										className="image-wrapper"
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
										<img
											css={css`
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
										css={css`
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
										css={css`
											position: absolute;
											top: 0;
											left: 0;
											width: 100%;
											height: 100%;
										`}
										href={`/dot/${dot.id}`}
									/>
								</div>
							</div>
						</SwiperSlide>
					);
				})}
			</Swiper>
		</div>
	);
}
