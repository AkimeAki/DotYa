import PixelButton from "@/components/atoms/PixelButton";
import Title from "@/components/atoms/Title";
import { cx } from "@/libs/merge-panda";
import { css } from "@/styled-system/css";
import DotList from "@/components/templates/DotList";

interface Props {
	length: number;
}

export default function ({ length }: Props): JSX.Element {
	return (
		<DotList>
			{[...Array(length)].map((_, index) => {
				return (
					<div
						key={index}
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
								src="/transparent.png"
								alt="読込中"
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
									src="/transparent.png"
									alt="読込中"
								/>
							</div>
							<div
								className={css`
									display: flex;
									position: relative;
									z-index: 99;
									gap: 5px;
								`}
							>
								<PixelButton color="#dd5a21" attached={true}>
									ㅤㅤ
								</PixelButton>
							</div>
							<Title size="small" h={3}>
								ㅤㅤ
							</Title>
							<span
								className={css`
									position: absolute;
									top: 0;
									left: 0;
									width: 100%;
									height: 100%;
									cursor: default;
								`}
							/>
						</div>
					</div>
				);
			})}
		</DotList>
	);
}
