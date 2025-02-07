import DotList from "@/components/templates/DotList";
import type { TranslateData } from "@/types";
import Title from "@/components/atoms/Title";
import { copy } from "@/libs/copy-object";
import { arrayShuffle } from "@/libs/array-shuffle";
import { Fragment, useEffect, useState } from "react";
import Button from "@/components/atoms/Button";
import DummyList from "@/components/templates/DummyList";
import { type DotData, type DotTagData } from "@/libs/format-dotlist";
import GoogleAds from "@/components/atoms/GoogleAds";
import type { Lang } from "@/define";
import { addArg, getText } from "@/libs/getI18n";
import { getLangPath } from "@/libs/lang-path";
import { css } from "@/styled-system/css";
import { cx } from "@/libs/merge-panda";
import DotListItem from "@/components/atoms/DotListItem";

interface Props {
	dots: DotData[];
	tags: DotTagData[];
	lang: Lang;
	translateData: TranslateData;
}

export default function ({ dots, tags, lang, translateData }: Props) {
	const [newDots, setNewDots] = useState<typeof dots>([]);
	const [randomDots, setRandomDots] = useState<typeof dots>([]);
	const [randomTag, setRandomTag] = useState<DotTagData | null>(null);
	const [randomTagDots, setRandomTagDots] = useState<typeof dots>([]);
	const [randomTagDotsLength, setRandomTagDotsLength] = useState<number>(0);
	const [eventTag, setEventTag] = useState<DotTagData | null>(null);
	const [eventTagDots, setEventTagDots] = useState<typeof dots>([]);

	useEffect(() => {
		// イベントドット絵を作成
		let allDots = copy<typeof dots>(dots);
		let eventDots: typeof dots = [];
		let eventTag: DotTagData | null = null;
		const currentTime = new Date();
		for (const tag of tags) {
			if (tag.event !== undefined) {
				const eventStart = new Date(
					tag.event.startTime.replace(/^[0-9]{4}/, currentTime.getFullYear().toString())
				).getTime();
				const eventEnd = new Date(
					tag.event.endTime.replace(/^[0-9]{4}/, currentTime.getFullYear().toString())
				).getTime();

				if (eventStart <= currentTime.getTime() && currentTime.getTime() <= eventEnd) {
					eventTag = tag;
					setEventTag(tag);
					eventDots = arrayShuffle<typeof dots>(dots)
						.filter((dot) => {
							const tagIds = dot.tags.map((tag) => tag.id);
							return tagIds.includes(tag.id);
						})
						.slice(0, 10);
					setEventTagDots(eventDots);

					break;
				}
			}
		}

		// 全てのドット絵からイベントドットを削除
		allDots = allDots.filter((dot) => {
			const eventDotIds = eventDots.map((dot) => dot.id);
			return !eventDotIds.includes(dot.id);
		});

		const newDots = copy<typeof allDots>(allDots.splice(0, 10));
		// 新着ドット絵を作成 & 全てのドット絵から新着ドット絵を削除
		setNewDots(newDots);

		// 全てのドット絵からランダムドット絵を作成 & 全てのランダムドット絵からランダム抽出したドット絵を削除
		const shuffleDots = arrayShuffle<typeof dots>(allDots);
		setRandomDots(shuffleDots.splice(0, 10));

		// 全てのタグ（イベントタグ以外）からランダムタグを作成
		const shuffleTags = arrayShuffle<typeof tags>(
			copy<typeof tags>(
				tags.filter((tag) => {
					return eventTag !== null && tag.id !== eventTag.id;
				})
			)
		);
		const shuffleTag = shuffleTags[0];

		let shuffleTagDots: typeof allDots = [];
		if (shuffleTag !== undefined) {
			setRandomTag(shuffleTag);
			shuffleTagDots = copy<typeof allDots>(allDots).filter((dot) => {
				const tagIds = dot.tags.map((tag) => tag.id);

				return tagIds.includes(shuffleTag.id);
			});

			// ランダムに抽出するタグのドット絵のうち、既に表示されているドット絵を取得
			const displayedDots = [
				...copy<typeof newDots>(newDots),
				...copy<typeof shuffleDots>(shuffleDots),
				...copy<typeof eventDots>(eventDots)
			].filter((dot) => {
				const tagIds = dot.tags.map((tag) => tag.id);
				return tagIds.includes(shuffleTag.id);
			});

			// ランダムに抽出するタグのドット絵のうち、既に表示されていないドット絵を取得
			const filterdDisplayedDots = shuffleTagDots.filter((dot) => {
				const newDotIds = displayedDots.map((dot) => dot.id);
				return !newDotIds.includes(dot.id);
			});

			// 既に表示されているドット絵を後ろに持ってくる
			shuffleTagDots = [...arrayShuffle<typeof filterdDisplayedDots>(filterdDisplayedDots), ...displayedDots];
			setRandomTagDotsLength(shuffleTagDots.length);
			shuffleTagDots = shuffleTagDots.slice(0, 10);
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
					<DotList>
						<Fragment>
							{randomDots.map((dot) => (
								<DotListItem
									key={dot.id}
									dot={dot}
									lang={lang}
									translateData={translateData}
									family={dot.family}
								/>
							))}
						</Fragment>
					</DotList>
				)}
				<Button href={getLangPath("/page/1", lang)} center>
					{getText(translateData, "_moreDots")}
				</Button>
			</div>

			{eventTag !== null && eventTag.event !== undefined && eventTagDots.length !== 0 && (
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
					<Title>{eventTag.event.word[lang]}</Title>
					<DotList>
						<Fragment>
							{eventTagDots.map((dot) => (
								<DotListItem
									key={dot.id}
									dot={dot}
									lang={lang}
									translateData={translateData}
									family={dot.family}
								/>
							))}
						</Fragment>
					</DotList>
					<Button href={getLangPath(`/tags/${eventTag.id}`, lang)} center>
						{addArg(getText(translateData, "moreTagDots"), eventTag.name[lang])}
					</Button>
				</div>
			)}

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
				{newDots.length === 0 ? (
					<DummyList length={10} />
				) : (
					<DotList>
						<Fragment>
							{newDots.map((dot) => (
								<DotListItem
									key={dot.id}
									dot={dot}
									lang={lang}
									translateData={translateData}
									family={dot.family}
								/>
							))}
						</Fragment>
					</DotList>
				)}
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
				<Title>
					{addArg(getText(translateData, "_alsoDots"), randomTag !== null ? randomTag.name[lang] : "")}
				</Title>
				{randomTagDots.length === 0 ? (
					<DummyList length={10} />
				) : (
					<DotList>
						<Fragment>
							{randomTagDots.map((dot) => (
								<DotListItem
									key={dot.id}
									dot={dot}
									lang={lang}
									translateData={translateData}
									family={dot.family}
								/>
							))}
						</Fragment>
					</DotList>
				)}
				{randomTagDotsLength > 10 && (
					<Button href={randomTag !== null ? getLangPath(`/tags/${randomTag.id}`, lang) : undefined} center>
						{addArg(getText(translateData, "moreTagDots"), randomTag !== null ? randomTag.name[lang] : "")}
					</Button>
				)}
			</div>
		</div>
	);
}
