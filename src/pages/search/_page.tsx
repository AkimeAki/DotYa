/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react";
import DotList from "@/components/templates/DotList";
import Title from "@/components/atoms/Title";
import type { DotData } from "@/libs/format-dotlist";
import { useState } from "react";
import type { TranslateData } from "@/types";
import type { Lang } from "@/define";
import { addArg, getText } from "@/libs/getI18n";

interface Props {
	dots: DotData[] | null;
	q: string;
	lang: Lang;
	translateData: TranslateData;
}

export default function ({ dots, q, lang, translateData }: Props) {
	const [keywords, setKeywords] = useState<string>(q);

	return (
		<div
			css={css`
				display: flex;
				flex-direction: column;
				gap: 40px;
			`}
		>
			<div
				css={css`
					display: flex;
					flex-direction: column;
					gap: 20px;
				`}
			>
				<Title>{getText(translateData, "search_title")}</Title>
			</div>
			<div
				css={css`
					display: flex;
					gap: 5px;
				`}
			>
				<input
					placeholder={getText(translateData, "search_searchBoxPlaceholder")}
					enterKeyHint="search"
					value={keywords}
					onChange={(e) => {
						setKeywords(e.target.value);
					}}
					onKeyDown={(e) => {
						if (!e.nativeEvent.isComposing && e.key === "Enter" && keywords !== "") {
							location.href = `/search?q=${keywords}`;
						}
					}}
					css={css`
						padding: 10px 20px;
						flex: 1;
						border: 2px solid #4d3d36;
						border-radius: 4px;
					`}
				/>
				<a
					aria-label={getText(translateData, "search_searchButtonAriaLabel")}
					href={`/search?q=${keywords}`}
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
						cursor: pointer;
						white-space: nowrap;

						@media (hover: hover) {
							&:hover {
								background-color: #554a46;
							}
						}
					`}
				>
					{getText(translateData, "search_searchButton")}
				</a>
			</div>
			{dots === null ? (
				<p>{getText(translateData, "search_noSearch")}</p>
			) : dots.length === 0 ? (
				<p>{getText(translateData, "search_searchResultNo")}</p>
			) : (
				<>
					<p>{addArg(getText(translateData, "search_searchResult"), String(dots.length))}</p>
					<DotList dots={dots} lang={lang} />
				</>
			)}
		</div>
	);
}
