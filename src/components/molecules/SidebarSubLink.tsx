/** @jsxImportSource @emotion/react */

import { type HTMLAttributeAnchorTarget } from "react";
import { css } from "@emotion/react";

interface Props {
	href: string;
	children: React.ReactNode;
	target?: HTMLAttributeAnchorTarget;
}

export default function ({ href, children, target }: Props): JSX.Element {
	return (
		<a
			css={css`
				padding: 6px 20px 8px;
				display: block;
				text-decoration: none;
				background-color: #4d3d36;
				color: #faf5b1;
				border-radius: 4px;
				border-bottom: 2px solid #111516;
				border-top: 2px solid #6e6358;
				user-select: none;

				@media (hover: hover) {
					&:hover {
						background-color: #554a46;
					}
				}
			`}
			href={href}
			target={target}
		>
			{children}
		</a>
	);
}
