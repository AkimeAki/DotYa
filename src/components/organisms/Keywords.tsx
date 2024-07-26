/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react";
import { fullToHalf, halfToFull, hiraToKana, kanaToHira } from "@/libs/trans-text";
import type { DotIllust } from "@/types";
import type { MicroCMSContentId, MicroCMSDate } from "microcms-js-sdk";

interface Props {
	dot: DotIllust & MicroCMSContentId & MicroCMSDate;
}

export default function ({ dot }: Props) {
	const keywords = Array.from(
		new Set([
			...dot.tags.map((tag) => kanaToHira(tag.name)),
			...dot.tags.map((tag) => hiraToKana(tag.name)),
			...(dot.keywords?.map((keyword) => kanaToHira(keyword.word)) ?? []),
			...(dot.keywords?.map((keyword) => hiraToKana(keyword.word)) ?? []),
			kanaToHira(dot.title),
			hiraToKana(dot.title),
			fullToHalf(dot.title),
			halfToFull(dot.title),
			...dot.id.split(/[-_]/).map((name) => fullToHalf(name)),
			...dot.id.split(/[-_]/).map((name) => halfToFull(name)),
			...dot.tags.flatMap((tag) => tag.id.split(/[-_]/)).map((name) => fullToHalf(name)),
			...dot.tags.flatMap((tag) => tag.id.split(/[-_]/)).map((name) => halfToFull(name))
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
