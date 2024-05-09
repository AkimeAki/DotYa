/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react";

interface Props {
	src: string;
	size: number;
	alt: string;
}

export default function ({ src, size, alt }: Props): JSX.Element {
	return (
		<div
			css={css`
				background-color: white;
				position: relative;
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
			`}
		>
			<img
				css={css`
					display: block;
					width: ${size}px;
					aspect-ratio: 1/1;
					image-rendering: pixelated;
				`}
				src={src}
				alt={alt}
			/>
		</div>
	);
}
