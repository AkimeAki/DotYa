import Button from "@/components/atoms/Button";
import { downloadImage } from "@/libs/download-image";
import { useState } from "react";
import Checkbox from "@/components/atoms/Checkbox";
import type { DotData } from "@/libs/format-dotlist";
import { css } from "@/styled-system/css";

interface Props {
	dot: DotData;
}

export default function ({ dot }: Props): JSX.Element {
	const [termsAgree, setTermsAgree] = useState<boolean>(false);

	return (
		<div
			className={css`
				display: flex;
				flex-direction: column;
				gap: 10px;
			`}
		>
			<div>
				<Checkbox isChecked={termsAgree} setIsChecked={setTermsAgree}>
					<a aria-label="利用規約" href="/terms" target="_blank">
						利用規約
					</a>
					を読んで同意しました
				</Checkbox>
			</div>
			<Button
				disabled={!termsAgree}
				onClick={() => {
					if (termsAgree) {
						if (dot.illust.size === 32) {
							// eslint-disable-next-line @typescript-eslint/ban-ts-comment
							// @ts-expect-error
							dataLayer.push({ event: "download-32", dot_id: dot.id, dot_name: dot.title });
						}
						void downloadImage(`${dot.illust.url}?fm=png`, dot.title);
					}
				}}
			>
				ダウンロードする
			</Button>
			{/* {dot.dot64 !== undefined && (
							<Button
								disabled={!termsAgree}
								onClick={() => {
									// eslint-disable-next-line @typescript-eslint/ban-ts-comment
									// @ts-expect-error
									dataLayer.push({ event: "buy-64", dot_id: dot.id, dot_name: dot.title });
									void downloadImage(`${dot.dot16?.url}?fm=png`, dot.title);
								}}
							>
								64px版を購入する画面に進む
							</Button>
						)} */}
		</div>
	);
}
