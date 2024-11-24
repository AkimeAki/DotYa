/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react";
import DotList from "@/components/templates/DotList";
import Title from "@/components/atoms/Title";
import type { DotData } from "@/libs/format-dotlist";
import { useState } from "react";

interface Props {
	dots: DotData[] | null;
	q: string;
}

export default function ({ dots, q }: Props) {
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
				<Title>検索</Title>
			</div>
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
					aria-label="検索"
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
					検索
				</a>
			</div>
			{dots === null ? (
				<p>検索入力欄から検索してね！</p>
			) : dots.length === 0 ? (
				<p>検索結果が見つかりませんでした😿</p>
			) : (
				<>
					<p>検索結果：{dots.length}件</p>
					<DotList dots={dots} />
				</>
			)}
		</div>
	);
}
