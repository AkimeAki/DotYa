/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react";

interface Props {
	children: React.ReactNode;
	onClick?: (() => void) | undefined;
	loading?: boolean;
	selected?: boolean;
	href?: string | undefined;
	disabled?: boolean;
	noSelect?: boolean;
	target?: string;
	size?: "slim" | "normal";
	center?: boolean;
}

export default function ({
	loading = false,
	children,
	onClick,
	selected = false,
	href,
	disabled = false,
	noSelect = false,
	target = "_self",
	size = "normal",
	center = true
}: Props) {
	const style = css`
		padding: 15px 20px 17px;
		display: flex;
		align-items: center;
		text-decoration: none;
		background-color: #4d3d36;
		color: #faf5b1;
		border-radius: 4px;
		border-bottom: 2px solid #111516;
		border-top: 2px solid #6e6358;
		user-select: none;
		cursor: pointer;

		${center &&
		css`
			text-align: center;
			justify-content: center;
		`}

		${size === "slim" &&
		css`
			padding-top: 10px;
			padding-bottom: 10px;
			font-size: 15px;
		`}

		${selected &&
		css`
			background-color: #36364d;
			border-bottom-color: #111116;
			border-top-color: #58586e;
			cursor: default;
		`}

		${disabled &&
		css`
			background-color: #b8b4ac;
			border-bottom-color: #8a8781;
			border-top-color: #ddd8ce;
			cursor: default;
		`}

		${noSelect &&
		css`
			cursor: default;
		`}

		@media (hover: hover) {
			&:hover {
				${!disabled &&
				!selected &&
				!noSelect &&
				css`
					filter: brightness(120%);
				`}
			}
		}
	`;

	if (href === undefined) {
		return (
			<button
				onClick={() => {
					if (onClick !== undefined) {
						onClick();
					}
				}}
				css={style}
			>
				{loading ? "読み込み中..." : children}
			</button>
		);
	}

	return (
		<a
			aria-label={String(children)}
			href={disabled ? undefined : href}
			onClick={() => {
				if (onClick !== undefined) {
					onClick();
				}
			}}
			css={style}
			target={target}
		>
			{loading ? "読み込み中..." : children}
		</a>
	);
}
