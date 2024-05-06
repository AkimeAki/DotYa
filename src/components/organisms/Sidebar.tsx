/** @jsxImportSource @emotion/react */

import SidebarLink from "@/components/molecules/SidebarLink";
import { spWidth } from "@/define";
import { css } from "@emotion/react";
import { useState } from "react";

export default function (): JSX.Element {
	const [isOpen, setIsOpen] = useState<boolean>(false);

	return (
		<>
			<div
				onClick={() => {
					setIsOpen((status) => {
						return !status;
					});
				}}
				css={css`
					display: none;
					position: fixed;
					top: 10px;
					left: 10px;
					width: 40px;
					height: 40px;
					border-top: 2px solid #6e6358;
					border-bottom: 2px solid #111516;
					background-color: #4d3d36;
					border-radius: 4px;
					cursor: pointer;
					z-index: calc(infinity);

					&:hover {
						background-color: #554a46;
					}

					${isOpen &&
					css`
						background-color: #554a46;
					`}

					span {
						position: absolute;
						left: 50%;
						width: calc(100% - 10px);
						height: 2px;
						background-color: #faf5b1;
						user-select: none;
						pointer-events: none;
					}

					@media (max-width: ${spWidth}px) {
						display: block;
					}
				`}
			>
				<span
					css={css`
						top: 8px;
						transform: translateX(-50%);

						${isOpen &&
						css`
							top: 50%;
							transform: translate(-50%, -50%) rotate(-45deg);
						`}
					`}
				/>
				<span
					css={css`
						top: 50%;
						transform: translate(-50%, -50%);

						${isOpen &&
						css`
							width: 0 !important;
						`}
					`}
				/>
				<span
					css={css`
						bottom: 8px;
						transform: translateX(-50%);

						${isOpen &&
						css`
							bottom: 50%;
							transform: translate(-50%, 50%) rotate(45deg);
						`}
					`}
				/>
			</div>
			<aside
				css={css`
					display: flex;
					flex-direction: column;
					width: 300px;
					gap: 15px;

					@media (max-width: ${spWidth}px) {
						position: fixed;
						top: 0;
						left: 0;
						background-color: #383838d4;
						width: 300px;
						height: 100%;
						padding: 60px 10px 10px;
						overflow-y: scroll;
						transform: translateX(${isOpen ? "0" : "-100%"});
						transition-duration: 200ms;
						transition-property: transform;
					}
				`}
			>
				<SidebarLink href="/">ホーム</SidebarLink>
				<SidebarLink href="/terms">利用規約</SidebarLink>
				<SidebarLink href="/contact">お問い合わせ</SidebarLink>
			</aside>
		</>
	);
}
