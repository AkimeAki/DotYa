/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react";
import DotList from "@/components/templates/DotList";
import type { DotIllust, DotIllustTag } from "@/types";
import type { MicroCMSContentId, MicroCMSDate } from "microcms-js-sdk";
import Title from "@/components/atoms/Title";
import { copy } from "@/libs/copy-object";
import { arrayShuffle } from "@/libs/array-shuffle";
import { useEffect, useState } from "react";
import Button from "@/components/atoms/Button";
import DummyList from "@/components/templates/DummyList";

interface Props {
	dots: (DotIllust & MicroCMSContentId & MicroCMSDate)[];
	tags: (DotIllustTag & MicroCMSContentId & MicroCMSDate)[];
}

export default function ({ dots, tags }: Props) {
	const [randomDots, setRandomDots] = useState<typeof dots>([]);
	const [randomTag, setRandomTag] = useState<(DotIllustTag & MicroCMSContentId & MicroCMSDate) | null>(null);
	const [randomTagDots, setRandomTagDots] = useState<typeof dots>([]);
	const [randomTagDotsLength, setRandomTagDotsLength] = useState<number>(0);

	useEffect(() => {
		const deletedNewDots = copy<typeof dots>(dots).slice(-1 * (dots.length - 10));
		let shuffleDots = arrayShuffle<typeof dots>(deletedNewDots);
		shuffleDots.length = 10;
		shuffleDots = shuffleDots.filter(Boolean);
		setRandomDots(shuffleDots);

		const shuffleTags = arrayShuffle<typeof tags>(copy<typeof tags>(tags));
		const shuffleTag = shuffleTags[0];
		if (shuffleTag !== undefined) {
			setRandomTag(shuffleTag);
			let shuffleTagDots = copy<typeof dots>(dots).filter((dot) => {
				const tagIds = dot.tags.map((tag) => tag.id);

				return tagIds.includes(shuffleTag.id);
			});
			setRandomTagDotsLength(shuffleTagDots.length);
			shuffleTagDots.length = 10;
			shuffleTagDots = shuffleTagDots.filter(Boolean);
			setRandomTagDots(shuffleTagDots);
		}
	}, []);

	let newDots = copy<typeof dots>(dots);
	newDots.length = 10;
	newDots = newDots.filter(Boolean);

	let popularityDots = copy<typeof dots>(dots);
	popularityDots.length = 10;
	popularityDots = popularityDots.filter(Boolean);

	return (
		<div
			css={css`
				display: flex;
				flex-direction: column;
				gap: 100px;
			`}
		>
			<div
				css={css`
					display: flex;
					flex-direction: column;
					gap: 40px;
				`}
			>
				<Title> こんにちは。ドット絵素材屋さんです！</Title>
				{randomDots.length === 0 ? <DummyList length={10} /> : <DotList dots={randomDots} />}
				<Button href="/page/1" center>
					もっとドット絵を見る
				</Button>
			</div>
			<div
				css={css`
					display: flex;
					flex-direction: column;
					gap: 40px;
				`}
			>
				<Title>新着ドット絵はこちら！</Title>
				<DotList dots={newDots} />
				<Button href="/page/1" center>
					もっとドット絵を見る
				</Button>
			</div>
			<div
				css={css`
					display: flex;
					flex-direction: column;
					gap: 40px;
				`}
			>
				<Title>{randomTag !== null ? randomTag.name : ""}のドット絵もあるよ！</Title>
				{randomTagDots.length === 0 ? <DummyList length={10} /> : <DotList dots={randomTagDots} />}
				{randomTagDotsLength > 10 && (
					<Button href={randomTag !== null ? `/tags/${randomTag.id}` : undefined} center>
						もっと{randomTag !== null ? randomTag.name : ""}のドット絵を見る
					</Button>
				)}
			</div>
		</div>
	);
}
