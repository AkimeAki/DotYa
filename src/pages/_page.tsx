import DotList from "@/components/templates/DotList";
import type { DotIllustTag, TranslateData } from "@/types";
import type { MicroCMSContentId, MicroCMSDate } from "microcms-js-sdk";
import Title from "@/components/atoms/Title";
import { copy } from "@/libs/copy-object";
import { arrayShuffle } from "@/libs/array-shuffle";
import { useEffect, useState } from "react";
import Button from "@/components/atoms/Button";
import DummyList from "@/components/templates/DummyList";
import type { DotData } from "@/libs/format-dotlist";
import GoogleAds from "@/components/atoms/GoogleAds";
import type { Lang } from "@/define";
import { addArg, getText } from "@/libs/getI18n";
import { getLangPath } from "@/libs/lang-path";
import { css } from "@/styled-system/css";
import { cx } from "@/libs/merge-panda";

interface Props {
	dots: DotData[];
	tags: (DotIllustTag & MicroCMSContentId & MicroCMSDate)[];
	lang: Lang;
	translateData: TranslateData;
}

export default function ({ dots, tags, lang, translateData }: Props) {
	const [randomDots, setRandomDots] = useState<typeof dots>([]);
	const [randomTag, setRandomTag] = useState<(DotIllustTag & MicroCMSContentId & MicroCMSDate) | null>(null);
	const [randomTagDots, setRandomTagDots] = useState<typeof dots>([]);
	const [randomTagDotsLength, setRandomTagDotsLength] = useState<number>(0);

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
	}, []);

	return (
		<div
			className={css`
				display: flex;
				flex-direction: column;
				gap: 70px;
			`}
		>
			<div
				className={css`
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
				<Title>{getText(translateData, "_titleHello")}</Title>
				{randomDots.length === 0 ? (
					<DummyList length={10} />
				) : (
					<DotList dots={randomDots} lang={lang} translateData={translateData} />
				)}
				<Button href={getLangPath("/page/1", lang)} center>
					{getText(translateData, "_moreDots")}
				</Button>
			</div>
			<GoogleAds slot="9512157076" />

			<div
				className={css`
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
				<Title>{getText(translateData, "_hereNewDots")}</Title>
				<DotList dots={newDots} lang={lang} translateData={translateData} />
				<Button href={getLangPath("/page/1", lang)} center>
					{getText(translateData, "_moreDots")}
				</Button>
			</div>
			<div
				className={cx(
					css`
						display: flex;
						flex-direction: column;
						gap: 40px;
					`,
					randomTagDotsLength > 10 &&
						css`
							@media (max-width: 700px) {
								.dot-list-item:last-child {
									display: none;
								}
							}
						`
				)}
			>
				<Title>{addArg(getText(translateData, "_alsoDots"), randomTag !== null ? randomTag.name : "")}</Title>
				{randomTagDots.length === 0 ? (
					<DummyList length={10} />
				) : (
					<DotList dots={randomTagDots} lang={lang} translateData={translateData} />
				)}
				{randomTagDotsLength > 10 && (
					<Button href={randomTag !== null ? getLangPath(`/tags/${randomTag.id}`, lang) : undefined} center>
						{addArg(getText(translateData, "moreTagDots"), randomTag !== null ? randomTag.name : "")}
					</Button>
				)}
			</div>
		</div>
	);
}
