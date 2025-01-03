import SidebarLink from "@/components/molecules/SidebarLink";
import type { TranslateData } from "@/types";
import { useEffect, useRef, useState } from "react";
import PixelButton from "@/components/atoms/PixelButton";
import { css } from "@/styled-system/css";
import { cx } from "@/libs/merge-panda";
import { getText } from "@/libs/getI18n";
import type { DotTagData } from "@/libs/format-dotlist";
import type { Lang } from "@/define";
import { getLangPath } from "@/libs/lang-path";

interface Props {
	tags: DotTagData[];
	translateData: TranslateData;
	lang: Lang;
}

export default function ({ tags, translateData, lang }: Props): JSX.Element {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [keywords, setKeywords] = useState<string>("");
	const sidebarElement = useRef<HTMLDivElement>(null);
	const sidebarButtonElement = useRef<HTMLDivElement>(null);
	const selectLangElement = useRef<HTMLSelectElement>(null);

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

	useEffect(() => {
		const scroll = (e: Event) => {
			if (
				e.target instanceof HTMLElement &&
				sidebarElement.current !== null &&
				sidebarButtonElement.current !== null
			) {
				if (
					!sidebarElement.current.contains(e.target) &&
					!sidebarButtonElement.current.contains(e.target) &&
					isOpen
				) {
					e.preventDefault();
				}
			}
		};

		window.addEventListener("touchmove", scroll, { passive: false });
		window.addEventListener("mousewheel", scroll, { passive: false });

		return () => {
			window.removeEventListener("touchmove", scroll);
			window.removeEventListener("mousewheel", scroll);
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
						width: 50px;
						height: 50px;
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
							width: calc(100% - 20px);
							height: 4px;
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
							top: 10px;
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
							bottom: 10px;
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
						width: 300px;

						@media (max-width: 1130px) {
							position: fixed;
							top: 0;
							left: 0;
							background-color: #383838d4;
							width: 300px;
							height: 100%;
							padding: 70px 10px 10px;
							overflow-y: scroll;
							transform: translateX(-100%);
							transition-duration: 200ms;
							transition-property: transform;
							z-index: 9999999;
							overscroll-behavior: contain;
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
						flex-direction: column;
						gap: 15px;
						min-height: calc(100vh);
					`}
				>
					<div
						className={css`
							display: flex;
							gap: 5px;
						`}
					>
						<input
							placeholder={getText(translateData, "sidebarSearchBoxPlaceholder")}
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
							aria-label={getText(translateData, "sidebarSearchButton")}
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
							{getText(translateData, "sidebarSearchButton")}
						</a>
					</div>
					<SidebarLink href={getLangPath("/", lang)}>{getText(translateData, "sidebarHome")}</SidebarLink>
					<SidebarLink href={getLangPath("/page/1", lang)}>
						{getText(translateData, "sidebarDotList")}
					</SidebarLink>
					<SidebarLink href={getLangPath("/custom", lang)}>
						{getText(translateData, "sidebarCustom")}
					</SidebarLink>
					<SidebarLink href={getLangPath("/terms", lang)}>
						{getText(translateData, "sidebarTerms")}
					</SidebarLink>
					<div>
						<div
							onClick={(e) => {
								if (selectLangElement.current !== null && e.target !== selectLangElement.current) {
									selectLangElement.current.showPicker();
								}
							}}
							className={css`
								display: inline-block;
								padding: 6px 20px 8px;
								text-decoration: none;
								background-color: #4d3d36;
								border-radius: 4px;
								border-bottom: 2px solid #111516;
								border-top: 2px solid #6e6358;
								cursor: pointer;
								user-select: none;

								@media (hover: hover) {
									&:hover {
										background-color: #554a46;
									}
								}

								* {
									color: #faf5b1;
								}
							`}
						>
							<span>{getText(translateData, "sidebarLanguage")}</span>
							<select
								ref={selectLangElement}
								value={lang ?? "ja"}
								onChange={(e) => {
									if (lang !== null) {
										const option = "; max-age=2592000; path=/";
										document.cookie = `language="${e.target.value}"${option}`;
										window.location.reload();
									}
								}}
								className={css`
									background-color: transparent;
									cursor: pointer;

									option {
										color: initial;
									}
								`}
							>
								<option
									value="ja"
									className={css`
										font-family: "DotGothic16";
									`}
								>
									日本語
								</option>
								<option
									value="zh-cn"
									className={css`
										font-family: "ArkPixelZHCN";
									`}
								>
									简体中文
								</option>
								<option
									value="zh-tw"
									className={css`
										font-family: "ArkPixelZHTW";
									`}
								>
									正體中文
								</option>
							</select>
						</div>
					</div>
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
									{tag.name[lang]}
								</PixelButton>
							);
						})}
					</div>
				</div>
			</aside>
			{isOpen && (
				<div
					className={css`
						position: fixed;
						top: 0;
						left: 0;
						width: 100%;
						height: 100%;
						z-index: 999999;
						display: none;
						background-color: rgba(194, 194, 194, 0.473);

						@media (max-width: 1130px) {
							display: block;
						}
					`}
				/>
			)}
		</>
	);
}
