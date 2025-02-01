import { cx } from "@/libs/merge-panda";
import { css } from "@/styled-system/css";

interface Props {
	src: string;
	size: number;
	alt: string;
	active?: boolean;
}

export default function ({ src, size, alt, active = false }: Props): JSX.Element {
	return (
		<div
			className={css`
				background-color: white;
				position: relative;

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

				.image-wrapper-active {
					&:before {
						content: "";
						display: block;
						position: absolute;
						top: 0;
						left: 0;
						width: calc(100% - 3px);
						height: calc(100% - 6px);
						border: 3px solid #492b18;
					}
				}

				@media (hover: hover) {
					&:hover {
						.image-wrapper {
							&:before {
								content: "";
								display: block;
								position: absolute;
								top: 0;
								left: 0;
								width: calc(100% - 3px);
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
						background-color: white;
						width: calc(100% - 3px);
						height: calc(100% - 3px);
						padding: 10px;

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
					"image-wrapper",
					active && "image-wrapper-active"
				)}
			>
				<img
					className={css`
						display: block;
						aspect-ratio: 1/1;
						image-rendering: pixelated;
						pointer-events: none;
					`}
					width={size}
					src={src}
					alt={alt}
				/>
			</div>
		</div>
	);
}
