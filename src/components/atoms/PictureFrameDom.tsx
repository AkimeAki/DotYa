import { css } from "@/styled-system/css";

interface Props {
	dom: string;
	width: number;
	size: number;
}

export default function ({ dom, width, size }: Props): JSX.Element {
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
			<div
				dangerouslySetInnerHTML={{ __html: dom }}
				style={{ "--width": `${width}px`, "--size": `${size}px` } as React.CSSProperties}
				className={css`
					width: var(--size);
					aspect-ratio: 1/1;

					div {
						width: calc(var(--size) / var(--width));
						aspect-ratio: 1/1;
					}
				`}
			/>
		</div>
	);
}
