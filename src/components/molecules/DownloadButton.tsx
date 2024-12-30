import Button from "@/components/atoms/Button";
import { downloadImage } from "@/libs/download-image";
import { useState } from "react";
import Checkbox from "@/components/atoms/Checkbox";
import type { DotData } from "@/libs/format-dotlist";
import { css } from "@/styled-system/css";
import type { Lang } from "@/define";
import type { TranslateData } from "@/types";
import { getText } from "@/libs/getI18n";

interface Props {
	dot: DotData;
	lang: Lang;
	translateData: TranslateData;
}

export default function ({ dot, lang, translateData }: Props): JSX.Element {
	const [termsAgree, setTermsAgree] = useState<boolean>(false);

	return (
		<div
			className={css`
				display: flex;
				flex-direction: column;
				gap: 10px;
			`}
		>
			<div
				className={css`
					a {
						color: #2c91fd;
					}
				`}
			>
				<Checkbox isChecked={termsAgree} setIsChecked={setTermsAgree}>
					<div dangerouslySetInnerHTML={{ __html: getText(translateData, "dot_id_agreeTerms", true) }}></div>
				</Checkbox>
			</div>
			<Button
				disabled={!termsAgree}
				onClick={() => {
					if (termsAgree) {
						if (dot.illust.size === 32) {
							// eslint-disable-next-line @typescript-eslint/ban-ts-comment
							// @ts-expect-error
							dataLayer.push({ event: "download-32", dot_id: dot.id, dot_name: dot.title[lang] });
						}
						void downloadImage(`${dot.illust.url}?fm=png`, dot.title[lang]);
					}
				}}
			>
				{getText(translateData, "dot_id_downloadButton")}
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
