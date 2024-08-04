/** @jsxImportSource @emotion/react */
import Button from "@/components/atoms/Button";
import PictureFrame from "@/components/atoms/PictureFrame";
import Title from "@/components/atoms/Title";
import Modal from "@/components/molecules/Modal";
import type { DotData } from "@/libs/format-dotlist";
import { css } from "@emotion/react";
import { Fragment, useEffect, useState } from "react";

interface Props {
	dots: DotData[];
}

export default function ({ dots }: Props): JSX.Element {
	const [image1, setImage1] = useState<DotData | null>(null);
	const [image2, setImage2] = useState<DotData | null>(null);
	const [image1Path, setImage1Path] = useState<string>("/transparent.png");
	const [image2Path, setImage2Path] = useState<string>("/transparent.png");
	const [selectImage, setSelectImage] = useState<1 | 2>(1);
	const [isOpenImage1, setIsOpenImage1] = useState<boolean>(false);
	const [isOpenImage2, setIsOpenImage2] = useState<boolean>(false);

	useEffect(() => {
		document.body.dataset.selectImage = String(selectImage);
	}, [selectImage]);

	useEffect(() => {
		const canvas = document.querySelector<HTMLCanvasElement>("#canvas");
		if (canvas === null) {
			return;
		}

		const context = canvas.getContext("2d");
		if (context === null) {
			return;
		}

		let imageLoaded = 0;
		const imageData: {
			image: HTMLImageElement;
			src: string;
			x: number;
			y: number;
			oldX: number;
			oldY: number;
			diffX: number;
			diffY: number;
		}[] = [];

		imageData.push({ image: new Image(), src: image1Path, x: 0, y: 0, oldX: 0, oldY: 0, diffX: 0, diffY: 0 });
		imageData.push({ image: new Image(), src: image2Path, x: 0, y: 0, oldX: 0, oldY: 0, diffX: 0, diffY: 0 });

		for (let i = 0; i < imageData.length; i++) {
			const data = imageData[i];
			if (data !== undefined) {
				data.image.addEventListener("load", () => {
					imageLoaded++;
				});
				data.image.src = data.src;
				data.image.crossOrigin = "anonymous";
			}
		}

		let click = false;
		let pointX = 0;
		let pointY = 0;
		let oldPointX = 0;
		let oldPointY = 0;

		const mouseMove = (e: MouseEvent) => {
			pointX = e.offsetX;
			pointY = e.offsetY;
		};

		const mouseDown = (e: MouseEvent) => {
			click = true;
			pointX = e.offsetX;
			pointY = e.offsetY;
			oldPointX = e.offsetX;
			oldPointY = e.offsetY;
			canvas.style.cursor = "grabbing";
			document.body.style.userSelect = "none";
		};

		const mouseUp = () => {
			click = false;
			canvas.style.cursor = "grab";
			document.body.style.userSelect = "";
			for (let i = 0; i < imageData.length; i++) {
				const data = imageData[i];
				if (data !== undefined) {
					data.oldX = data.x;
					data.oldY = data.y;
				}
			}
		};

		window.addEventListener("mouseup", mouseUp);
		canvas.addEventListener("mousemove", mouseMove);
		canvas.addEventListener("mousedown", mouseDown);

		let animationId: number;
		const tick = () => {
			if (click) {
				const data = imageData[Number(document.body.dataset.selectImage) - 1];
				if (data !== undefined) {
					data.diffX = -1 * Math.ceil((64 * (oldPointX - pointX)) / canvas.offsetWidth);
					data.diffY = -1 * Math.ceil((64 * (oldPointY - pointY)) / canvas.offsetHeight);
					data.x = data.oldX + data.diffX;
					data.y = data.oldY + data.diffY;
				}
			}

			if (imageLoaded === imageData.length) {
				context.clearRect(0, 0, 64, 64);
				for (let i = 0; i < imageData.length; i++) {
					const data = imageData[i];
					if (data !== undefined) {
						context.drawImage(data.image, data.x, data.y);
					}
				}

				const data = imageData[Number(document.body.dataset.selectImage) - 1];
				if (data !== undefined) {
					context.drawImage(data.image, data.x, data.y);
				}
			}

			animationId = window.requestAnimationFrame(tick);
		};
		tick();

		return () => {
			canvas.removeEventListener("mousemove", mouseMove);
			canvas.removeEventListener("mousedown", mouseDown);
			window.removeEventListener("mouseup", mouseUp);
			window.cancelAnimationFrame(animationId);
		};
	}, [image1Path, image2Path]);

	return (
		<>
			<div
				css={css`
					display: flex;
					flex-direction: column;
					gap: 30px;
				`}
			>
				<Title>カスタマイズ</Title>
				<p>
					ここでは2つのドット絵をくっつけることができます！
					<br />
					お好みのカスタマイズをしてみてね！
					<br />
					※現在PCのみ対応しています。
				</p>
				<div
					css={css`
						display: flex;
						gap: 20px;

						@media (max-width: 720px) {
							flex-direction: column;
						}
					`}
				>
					<div
						css={css`
							display: flex;
							flex-direction: column;
							gap: 30px;

							@media (max-width: 720px) {
								flex-direction: row;
							}
						`}
					>
						<div
							css={css`
								display: flex;
								flex-direction: column;
								gap: 10px;
								align-items: flex-start;
							`}
						>
							<div
								css={css`
									cursor: pointer;
								`}
								onClick={() => {
									setSelectImage(1);
								}}
							>
								<PictureFrame src={image1Path} size={128} alt="1つ目の画像" />
							</div>
							<Button
								size="slim"
								onClick={() => {
									setIsOpenImage1(true);
								}}
							>
								ドット絵を変更する
							</Button>
							<Button
								size="slim"
								onClick={() => {
									setSelectImage(1);
								}}
							>
								選択する
							</Button>
						</div>
						<div
							css={css`
								display: flex;
								flex-direction: column;
								gap: 10px;
								align-items: flex-start;
							`}
						>
							<div
								css={css`
									cursor: pointer;
								`}
								onClick={() => {
									setSelectImage(2);
								}}
							>
								<PictureFrame src={image2Path} size={128} alt="2つ目の画像" />
							</div>
							<Button
								size="slim"
								onClick={() => {
									setIsOpenImage2(true);
								}}
							>
								ドット絵を変更する
							</Button>
							<Button
								size="slim"
								onClick={() => {
									setSelectImage(2);
								}}
							>
								選択する
							</Button>
						</div>
					</div>
					<div
						css={css`
							flex: 1;
						`}
					>
						<canvas
							id="canvas"
							width={64}
							height={64}
							css={css`
								width: 100%;
								image-rendering: pixelated;
								cursor: grab;
								background-color: white;
							`}
						/>
					</div>
				</div>
				<Button
					onClick={() => {
						const download = async () => {
							if (image1 !== null && image2 !== null) {
								const canvas = document.querySelector<HTMLCanvasElement>("#canvas");
								if (canvas === null) {
									return;
								}

								const dataURL = canvas.toDataURL("image/png");
								const blob = await (await fetch(dataURL)).blob();
								const link = document.createElement("a");
								const blobUrl = URL.createObjectURL(blob);

								link.href = blobUrl;
								link.download = `image.png`;
								link.click();

								// eslint-disable-next-line @typescript-eslint/ban-ts-comment
								// @ts-expect-error
								dataLayer.push({
									event: "download-custom",
									custom_dot_id1: image1.id,
									custom_dot_name1: image1.title,
									custom_dot_id2: image2.id,
									custom_dot_name2: image2.title
								});
							}
						};

						void download();
					}}
				>
					カスタマイズしたドット絵をダウンロード
				</Button>
			</div>
			<Modal isOpen={isOpenImage1} setIsOpen={setIsOpenImage1}>
				<div
					css={css`
						padding: 20px;
						display: flex;
						flex-wrap: wrap;
						gap: 20px;
						justify-content: center;
					`}
				>
					{dots.map((dot) => {
						if (dot.illust.size === 32) {
							return (
								<div
									key={dot.id}
									css={css`
										cursor: pointer;
									`}
									onClick={() => {
										setImage1(dot);
										setImage1Path(dot.illust.url);
										setIsOpenImage1(false);
									}}
								>
									<PictureFrame src={dot.illust.url} size={128} alt="1つ目の画像" />
								</div>
							);
						}

						return <Fragment key={dot.id}></Fragment>;
					})}
				</div>
			</Modal>
			<Modal isOpen={isOpenImage2} setIsOpen={setIsOpenImage2}>
				<div
					css={css`
						padding: 20px;
						display: flex;
						flex-wrap: wrap;
						gap: 20px;
						justify-content: center;
					`}
				>
					{dots.map((dot) => {
						if (dot.illust.size === 32) {
							return (
								<div
									key={dot.id}
									css={css`
										cursor: pointer;
									`}
									onClick={() => {
										setImage2(dot);
										setImage2Path(dot.illust.url);
										setIsOpenImage2(false);
									}}
								>
									<PictureFrame src={dot.illust.url} size={128} alt="2つ目の画像" />
								</div>
							);
						}

						return <Fragment key={dot.id}></Fragment>;
					})}
				</div>
			</Modal>
		</>
	);
}
