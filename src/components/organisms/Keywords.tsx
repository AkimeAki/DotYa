/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react";
import { fullToHalf, halfToFull, hiraToKana, kanaToHira } from "@/libs/trans-text";
import type { DotData } from "@/libs/format-dotlist";

interface Props {
	dot: DotData;
}

export default function ({ dot }: Props) {
	const keywords = Array.from(
		new Set([
			...dot.tags.map((tag) => kanaToHira(tag.name)),
			...dot.tags.map((tag) => hiraToKana(tag.name)),
			...dot.tags.map((tag) => fullToHalf(tag.name)),
			...dot.tags.map((tag) => halfToFull(tag.name)),
			...(dot.keywords?.map((keyword) => kanaToHira(keyword)) ?? []),
			...(dot.keywords?.map((keyword) => hiraToKana(keyword)) ?? []),
			...(dot.keywords?.map((keyword) => fullToHalf(keyword)) ?? []),
			...(dot.keywords?.map((keyword) => halfToFull(keyword)) ?? []),
			kanaToHira(dot.title),
			hiraToKana(dot.title),
			fullToHalf(dot.title),
			halfToFull(dot.title),
			...dot.id.split(/[-_]/).map((dotId) => fullToHalf(dotId)),
			...dot.id.split(/[-_]/).map((dotId) => halfToFull(dotId)),
			...dot.tags.flatMap((tag) => tag.id.split(/[-_]/)).map((tagId) => fullToHalf(tagId)),
			...dot.tags.flatMap((tag) => tag.id.split(/[-_]/)).map((tagId) => halfToFull(tagId))
		])
	);

	return (
		<div
			css={css`
				display: none;
			`}
		>
			{keywords.join(" ")}
		</div>
	);
}
