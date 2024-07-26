/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react";

interface Props {
	children: React.ReactNode;
	onClick?: () => void;
	loading?: boolean;
}

export default function ({ loading = false, children, onClick }: Props) {
	return (
		<button
			onClick={() => {
				if (onClick !== undefined) {
					onClick();
				}
			}}
			css={css`
				padding: 15px 20px 17px;
				display: block;
				text-decoration: none;
				background-color: #4d3d36;
				color: #faf5b1;
				border-radius: 4px;
				border-bottom: 2px solid #111516;
				border-top: 2px solid #6e6358;
				user-select: none;
				text-align: center;
				cursor: pointer;

				@media (hover: hover) {
					&:hover {
						background-color: #554a46;
					}
				}
			`}
		>
			{loading ? "読み込み中..." : children}
		</button>
	);
}
