/** @jsxImportSource @emotion/react */

import SidebarLink from "@/components/molecules/SidebarLink";
import { spWidth } from "@/define";
import type { DotIllustTag } from "@/types";
import { css } from "@emotion/react";
import type { MicroCMSListContent } from "microcms-js-sdk";
import { useState } from "react";
import PixelButton from "@/components/atoms/PixelButton";
import SidebarSubLink from "@/components/molecules/SidebarSubLink";

interface Props {
	tags: (DotIllustTag & MicroCMSListContent)[];
}

export default function ({ tags }: Props): JSX.Element {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [keywords, setKeywords] = useState<string>("");

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
					position: sticky;
					top: 30px;
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
						z-index: 9999999;
					}
				`}
			>
				<div
					css={css`
						display: flex;
						gap: 5px;
					`}
				>
					<input
						placeholder="検索ワードを入力"
						enterKeyHint="search"
						value={keywords}
						onChange={(e) => {
							setKeywords(e.target.value);
						}}
						onKeyDown={(e) => {
							if (e.key === "Enter" && keywords !== "") {
								location.href = `/search?q=${keywords}`;
							}
						}}
						css={css`
							padding: 10px 20px;
							flex: 1;
							border: 2px solid #4d3d36;
							border-radius: 4px;
							width: 100%;
						`}
					/>
					<a
						href={`/search?q=${keywords}`}
						css={css`
							padding: 15px 10px 17px;
							display: block;
							text-decoration: none;
							background-color: #4d3d36;
							color: #faf5b1;
							border-radius: 4px;
							border-bottom: 2px solid #111516;
							border-top: 2px solid #6e6358;
							user-select: none;
							cursor: pointer;
							white-space: nowrap;

							@media (hover: hover) {
								&:hover {
									background-color: #554a46;
								}
							}
						`}
					>
						検索
					</a>
				</div>
				<SidebarLink href="/">ホーム</SidebarLink>
				<div
					css={css`
						display: flex;
						flex-direction: column;
						justify-content: flex-end;
						gap: 10px;
					`}
				>
					<SidebarLink href="/page/1">ドット絵一覧</SidebarLink>
					<div
						css={css`
							display: flex;
							flex-direction: column;
							gap: 10px;
							padding-left: 20px;
						`}
					>
						<SidebarSubLink href="/16px/page/1">16pxのドット絵一覧</SidebarSubLink>
						<SidebarSubLink href="/32px/page/1">32pxのドット絵一覧</SidebarSubLink>
					</div>
				</div>
				<SidebarLink href="/custom">カスタマイズ</SidebarLink>
				<SidebarLink href="/terms">利用規約</SidebarLink>
				<SidebarLink href="/contact">お問い合わせ</SidebarLink>
				<SidebarLink href="/update">更新履歴</SidebarLink>
				<div
					css={css`
						display: flex;
						gap: 5px;
						flex-wrap: wrap;
					`}
				>
					{tags.map((tag) => {
						return (
							<PixelButton key={tag.id} href={`/tags/${tag.id}`} color="#4d3d36">
								{tag.name}
							</PixelButton>
						);
					})}
				</div>
			</aside>
		</>
	);
}
