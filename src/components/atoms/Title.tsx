/** @jsxImportSource @emotion/react */

import { spWidth } from "@/define";
import { css } from "@emotion/react";

interface Props {
	children: React.ReactNode;
	size?: "normal" | "small";
	h?: 2 | 3 | 4 | 5 | 6;
}

export default function ({ children, size = "normal", h = 2 }: Props) {
	const style = css`
		padding: 15px 20px 20px;
		text-decoration: none;
		background-color: #36364d;
		color: #faf5b1;
		border-radius: 4px;
		border-bottom: 2px solid #111116;
		border-top: 2px solid #58586e;
		font-size: 30px;

		${size === "small" &&
		css`
			padding: 5px 10px 8px;
			font-size: 14px;
		`}

		@media (max-width: ${spWidth}px) {
			font-size: 20px;
		}
	`;
	switch (h) {
		case 2:
			return <h2 css={style}>{children}</h2>;
		case 3:
			return <h3 css={style}>{children}</h3>;
		case 4:
			return <h4 css={style}>{children}</h4>;
		case 5:
			return <h5 css={style}>{children}</h5>;
		case 6:
			return <h6 css={style}>{children}</h6>;
	}
}
