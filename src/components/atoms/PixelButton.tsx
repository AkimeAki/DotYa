/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react";

interface Props {
	children: React.ReactNode;
	onClick?: () => void;
	disabled?: boolean;
	attached?: boolean;
}

export default function ({ children, onClick, disabled = false, attached = true }: Props) {
	return (
		<button
			onClick={() => {
				if (onClick !== undefined && !disabled) {
					onClick();
				}
			}}
			css={css`
				padding: 2px 3px 3px;
				display: inline-block;
				text-decoration: none;
				background-color: #dd5a21;
				color: #faf5b1;
				border-radius: 4px;
				border-bottom: 2px solid #111516;
				border-top: 2px solid #6e6358;
				user-select: none;
				text-align: center;
				cursor: pointer;
				font-size: 14px;

				&:hover {
					background-color: #b34618;
				}

				${!attached &&
				css`
					background-color: #2c1308;
				`}

				${disabled &&
				css`
					background-color: #2c1308;
					cursor: default;

					&:hover {
						background-color: inherit;
					}
				`}
			`}
		>
			{children}
		</button>
	);
}