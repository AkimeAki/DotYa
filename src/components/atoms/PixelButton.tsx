import { cx } from "@/libs/merge-panda";
import { css } from "@/styled-system/css";

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

	const style = cx(
		css`
			padding: 2px 3px 3px;
			display: inline-block;
			text-decoration: none;
			background-color: var(--bg-color);
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
				background-color: var(--bg-color);
				opacity: 0.9;
			}
		`,
		!attached &&
			css`
				background-color: #2c1308;
			`,
		disabled &&
			css`
				background-color: #2c1308;
				cursor: default;

				@media (hover: hover) {
					&:hover {
						background-color: inherit;
					}
				}
			`
	);

	return (
		<div style={{ "--bg-color": color } as React.CSSProperties}>
			{href === undefined ? (
				<button onClick={click} className={style}>
					{children}
				</button>
			) : (
				<a aria-label={String(children)} href={href} onClick={click} className={style}>
					{children}
				</a>
			)}
		</div>
	);
}
