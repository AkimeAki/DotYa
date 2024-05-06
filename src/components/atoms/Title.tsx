/** @jsxImportSource @emotion/react */

import { spWidth } from "@/define";
import { css } from "@emotion/react";

interface Props {
	children: React.ReactNode;
}

export default function ({ children }: Props) {
	return (
		<h2
			css={css`
				padding: 15px 20px 20px;
				text-decoration: none;
				background-color: #36364d;
				color: #faf5b1;
				border-radius: 4px;
				border-bottom: 2px solid #111116;
				border-top: 2px solid #58586e;
				font-size: 30px;

				@media (max-width: ${spWidth}px) {
					font-size: 20px;
				}
			`}
		>
			{children}
		</h2>
	);
}
