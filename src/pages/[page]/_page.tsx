/** @jsxImportSource @emotion/react */

import Title from "@/components/atoms/Title";
import { css } from "@emotion/react";

interface Props {
	title: string;
	content: string;
}

export default function ({ title, content }: Props): JSX.Element {
	return (
		<div
			css={css`
				display: flex;
				flex-direction: column;
				gap: 30px;
			`}
		>
			<Title>{title}</Title>
			<div
				css={css`
					h3 {
						font-weight: bold;
						font-size: 23px;
						margin-top: 30px;
						margin-bottom: 20px;

						&:first-child {
							margin-top: 0;
						}
					}

					p,
					ul {
						margin-bottom: 15px;
					}

					ul {
						list-style-type: square;
					}
				`}
				dangerouslySetInnerHTML={{ __html: content }}
			/>
		</div>
	);
}
