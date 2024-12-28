import SidebarLink from "@/components/molecules/SidebarLink";
import type { DotIllustTag } from "@/types";
import type { MicroCMSListContent } from "microcms-js-sdk";
import { useEffect, useRef, useState } from "react";
import PixelButton from "@/components/atoms/PixelButton";
import { css } from "@/styled-system/css";
import { cx } from "@/libs/merge-panda";

interface Props {
	tags: (DotIllustTag & MicroCMSListContent)[];
}

export default function ({ tags }: Props): JSX.Element {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [keywords, setKeywords] = useState<string>("");
	const sidebarElement = useRef<HTMLDivElement>(null);
	const sidebarButtonElement = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const click = (e: MouseEvent) => {
			if (
				e.target instanceof HTMLElement &&
				sidebarElement.current !== null &&
				sidebarButtonElement.current !== null
			) {
				if (!sidebarElement.current.contains(e.target) && !sidebarButtonElement.current.contains(e.target)) {
					setIsOpen(false);
				}
			}
		};

		window.addEventListener("click", click);

		return () => {
			window.removeEventListener("click", click);
		};
	}, [isOpen]);

	return (
		<>
			<div
				ref={sidebarButtonElement}
				onClick={() => {
					setIsOpen((status) => {
						return !status;
					});
				}}
				className={cx(
					css`
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
					`,
					isOpen &&
						css`
							background-color: #554a46;
						`,
					css`
						span {
							position: absolute;
							left: 50%;
							width: calc(100% - 10px);
							height: 2px;
							background-color: #faf5b1;
							user-select: none;
							pointer-events: none;
						}

						@media (max-width: 1130px) {
							display: block;
						}
					`
				)}
			>
				<span
					className={cx(
						css`
							top: 8px;
							transform: translateX(-50%);
						`,
						isOpen &&
							css`
								top: 50% !important;
								transform: translate(-50%, -50%) rotate(-45deg) !important;
							`
					)}
				/>
				<span
					className={cx(
						css`
							top: 50%;
							transform: translate(-50%, -50%);
						`,
						isOpen &&
							css`
								width: 0 !important;
							`
					)}
				/>
				<span
					className={cx(
						css`
							bottom: 8px;
							transform: translateX(-50%);
						`,
						isOpen &&
							css`
								bottom: 50% !important;
								transform: translate(-50%, 50%) rotate(45deg) !important;
							`
					)}
				/>
			</div>
			<aside
				ref={sidebarElement}
				className={cx(
					css`
						position: sticky;
						top: 30px;
						display: flex;
						flex-direction: column;
						width: 300px;
						gap: 15px;

						@media (max-width: 1130px) {
							position: fixed;
							top: 0;
							left: 0;
							background-color: #383838d4;
							width: 300px;
							height: 100%;
							padding: 60px 10px 10px;
							overflow-y: scroll;
							transform: translateX(-100%);
							transition-duration: 200ms;
							transition-property: transform;
							z-index: 9999999;
						}
					`,
					isOpen &&
						css`
							@media (max-width: 1130px) {
								transform: translateX(0);
							}
						`
				)}
			>
				<div
					className={css`
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
						className={css`
							padding: 10px 20px;
							flex: 1;
							border: 2px solid #4d3d36;
							border-radius: 4px;
							width: 100%;
						`}
					/>
					<a
						aria-label="検索"
						href={`/search?q=${keywords}`}
						className={css`
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
				<SidebarLink href="/page/1">ドット絵一覧</SidebarLink>
				<SidebarLink href="/custom">カスタマイズ</SidebarLink>
				<SidebarLink href="/terms">利用規約</SidebarLink>
				<div
					className={css`
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
