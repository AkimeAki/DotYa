/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react";

interface Props {
	dom: string;
	width: number;
	size: number;
}

export default function ({ dom, width, size }: Props): JSX.Element {
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
			<div
				dangerouslySetInnerHTML={{ __html: dom }}
				css={css`
					width: ${size}px;
					aspect-ratio: 1/1;

					div {
						width: ${size / width}px;
						aspect-ratio: 1/1;
					}
				`}
			/>
		</div>
	);
}
