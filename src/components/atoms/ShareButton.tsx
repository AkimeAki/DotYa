/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react";
import Button from "@/components/atoms/Button";

interface Props {
	children: React.ReactNode;
	href: string;
	target?: string;
	icon: string;
	size: number;
}

export default function ({ href, target = "_self", icon, children, size }: Props) {
	return (
		<div
			css={css`
				a {
					height: 38px;
					padding-top: 0;
					padding-bottom: 0;
				}
			`}
		>
			<Button target={target} href={href}>
				<div
					css={css`
						color: inherit;
						display: flex;
						justify-content: center;
						gap: 8px;
					`}
				>
					<img
						css={css`
							height: ${size}px;
							aspect-ratio: 1/1;
							object-fit: contain;
						`}
						src={icon}
					/>
					<span
						css={css`
							color: inherit;
							font-size: 15px;
							display: flex;
							align-items: center;
							transform: translateY(-1px);
						`}
					>
						{children}
					</span>
				</div>
			</Button>
		</div>
	);
}
