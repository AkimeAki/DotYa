import { css } from "@/styled-system/css";

interface Props {
	src: string;
	size: number;
	alt: string;
}

export default function ({ src, size, alt }: Props): JSX.Element {
	return (
		<div
			className={css`
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
				className={css`
					display: block;
					aspect-ratio: 1/1;
					image-rendering: pixelated;
				`}
				width={size}
				src={src}
				alt={alt}
			/>
		</div>
	);
}
