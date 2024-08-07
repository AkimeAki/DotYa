/** @jsxImportSource @emotion/react */
import Title from "@/components/atoms/Title";
import { css } from "@emotion/react";

export default function (): JSX.Element {
	return (
		<div
			css={css`
				display: flex;
				flex-direction: column;
				gap: 30px;
			`}
		>
			<Title>お問い合わせ</Title>
			<div>
				<iframe
					css={css`
						width: 100%;
						height: 1000px;
					`}
					src="https://docs.google.com/forms/d/e/1FAIpQLSfLI8zc_8L5piTSaO0inQwAsKCDikgfaUKcF8a9eA6WhSZSCA/viewform?embedded=true"
				>
					読み込んでいます…
				</iframe>
			</div>
		</div>
	);
}
