/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react";
import DotList from "@/components/templates/DotList";
import type { DotIllustTag } from "@/types";
import type { MicroCMSContentId, MicroCMSDate } from "microcms-js-sdk";
import Title from "@/components/atoms/Title";
import { copy } from "@/libs/copy-object";
import { arrayShuffle } from "@/libs/array-shuffle";
import { useEffect, useState } from "react";
import Button from "@/components/atoms/Button";
import DummyList from "@/components/templates/DummyList";
import type { DotData } from "@/libs/format-dotlist";
import DotSlider from "@/components/templates/DotSlider";

interface Props {
	dots: DotData[];
	tags: (DotIllustTag & MicroCMSContentId & MicroCMSDate)[];
}

export default function ({ dots, tags }: Props) {
	const [randomDots, setRandomDots] = useState<typeof dots>([]);
	const [randomTag, setRandomTag] = useState<(DotIllustTag & MicroCMSContentId & MicroCMSDate) | null>(null);
	const [randomTagDots, setRandomTagDots] = useState<typeof dots>([]);
	const [randomTagDotsLength, setRandomTagDotsLength] = useState<number>(0);
	const [slideDots1, setSlideDots1] = useState<typeof dots>([]);
	const [slideDots2, setSlideDots2] = useState<typeof dots>([]);

	let newDots = copy<typeof dots>(dots);
	newDots.length = 10;
	newDots = newDots.filter(Boolean);

	useEffect(() => {
		const deletedNewDots = copy<typeof dots>(dots).slice(-1 * (dots.length - 10));
		let shuffleDots = arrayShuffle<typeof dots>(deletedNewDots);
		shuffleDots.length = 10;
		shuffleDots = shuffleDots.filter(Boolean);
		setRandomDots(shuffleDots);

		const shuffleTags = arrayShuffle<typeof tags>(copy<typeof tags>(tags));
		const shuffleTag = shuffleTags[0];

		let shuffleTagDots: typeof dots = [];
		if (shuffleTag !== undefined) {
			setRandomTag(shuffleTag);
			shuffleTagDots = copy<typeof dots>(dots).filter((dot) => {
				const tagIds = dot.tags.map((tag) => tag.id);

				return tagIds.includes(shuffleTag.id);
			});
			setRandomTagDotsLength(shuffleTagDots.length);

			// ランダムに抽出するタグのドット絵のうち、既に表示されているドット絵を取得
			const displayedDots = [...copy<typeof newDots>(newDots), ...copy<typeof shuffleDots>(shuffleDots)].filter(
				(dot) => {
					const tagIds = dot.tags.map((tag) => tag.id);
					return tagIds.includes(shuffleTag.id);
				}
			);

			// ランダムに抽出するタグのドット絵のうち、既に表示されていないドット絵を取得
			const filterdDisplayedDots = shuffleTagDots.filter((dot) => {
				const newDotIds = displayedDots.map((dot) => dot.id);
				return !newDotIds.includes(dot.id);
			});

			// 既に表示されているドット絵を後ろに持ってくる
			shuffleTagDots = [...arrayShuffle<typeof filterdDisplayedDots>(filterdDisplayedDots), ...displayedDots];
			shuffleTagDots.length = 10;
			shuffleTagDots = shuffleTagDots.filter(Boolean);
			setRandomTagDots(shuffleTagDots);
		}

		const slideDots = copy<typeof dots>(dots).filter((dot) => {
			const ids = [
				...shuffleDots.map((dot) => dot.id),
				...newDots.map((dot) => dot.id),
				...shuffleTagDots.map((dot) => dot.id)
			];

			return !ids.includes(dot.id);
		});

		const slideDotsCenterNumber = Math.round(slideDots.length / 2);
		setSlideDots1(arrayShuffle<typeof dots>(slideDots.slice(0, slideDotsCenterNumber)));
		setSlideDots2(arrayShuffle<typeof dots>(slideDots.slice(slideDotsCenterNumber, slideDots.length)));
	}, []);

	return (
		<div
			css={css`
				display: flex;
				flex-direction: column;
				gap: 70px;
			`}
		>
			<div
				css={css`
					display: flex;
					flex-direction: column;
					gap: 40px;

					@media (max-width: 700px) {
						.dot-list-item:last-child {
							display: none;
						}
					}
				`}
			>
				<Title> こんにちは。ドット絵素材屋さんです！</Title>
				{randomDots.length === 0 ? <DummyList length={10} /> : <DotList dots={randomDots} />}
				<Button href="/page/1" center>
					もっとドット絵を見る
				</Button>
			</div>
			<div>
				<DotSlider dots={slideDots1} slide="linear" />
			</div>
			<ins
				className="adsbygoogle"
				style={{ display: "block" }}
				data-ad-client="ca-pub-6914867149724943"
				data-ad-slot="9512157076"
				data-ad-format="auto"
				data-full-width-responsive="true"
			/>

			<div
				css={css`
					display: flex;
					flex-direction: column;
					gap: 40px;

					@media (max-width: 700px) {
						.dot-list-item:last-child {
							display: none;
						}
					}
				`}
			>
				<Title>新着ドット絵はこちら！</Title>
				<DotList dots={newDots} />
				<Button href="/page/1" center>
					もっとドット絵を見る
				</Button>
			</div>
			<div>
				<DotSlider dots={slideDots2} slide="linear" reverse />
			</div>
			<div
				css={css`
					display: flex;
					flex-direction: column;
					gap: 40px;

					${randomTagDotsLength > 10 &&
					css`
						@media (max-width: 700px) {
							.dot-list-item:last-child {
								display: none;
							}
						}
					`}
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
