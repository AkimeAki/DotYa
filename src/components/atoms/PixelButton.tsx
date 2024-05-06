/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react";

interface Props {
	children: React.ReactNode;
	onClick?: () => void;
	disabled?: boolean;
	attached?: boolean;
	color: string;
	href?: string;
}

export default function ({ children, onClick, disabled = false, attached = true, color, href }: Props) {
	const click = () => {
		if (onClick !== undefined && !disabled) {
			onClick();
		}
	};

	const style = css`
		padding: 2px 3px 3px;
		display: inline-block;
		text-decoration: none;
		background-color: ${color};
		color: #faf5b1;
		border-radius: 4px;
		border-right: 2px solid #111516;
		border-bottom: 2px solid #111516;
		border-top: 2px solid #6e6358;
		border-left: 2px solid #6e6358;
		user-select: none;
		text-align: center;
		cursor: pointer;
		font-size: 14px;

		&:hover {
			background-color: ${color};
			opacity: 0.9;
		}

		${!attached &&
		css`
			background-color: #2c1308;
		`}

		${disabled &&
		css`
			background-color: #2c1308;
			cursor: default;

			@media (hover: hover) {
				&:hover {
					background-color: inherit;
				}
			}
		`}
	`;

	return (
		<>
			{href === undefined ? (
				<button onClick={click} css={style}>
					{children}
				</button>
			) : (
				<a href={href} onClick={click} css={style}>
					{children}
				</a>
			)}
		</>
	);
}
