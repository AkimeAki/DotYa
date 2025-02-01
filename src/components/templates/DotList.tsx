import { css } from "@/styled-system/css";
import type { PropsWithChildren } from "react";

export default function ({ children }: PropsWithChildren): JSX.Element {
	return (
		<div
			className={css`
				display: grid;
				grid-template-columns: repeat(5, 1fr);
				column-gap: 20px;
				row-gap: 30px;

				@media (max-width: 1130px) {
					grid-template-columns: repeat(6, 1fr);
				}

				@media (max-width: 1000px) {
					grid-template-columns: repeat(5, 1fr);
				}

				@media (max-width: 900px) {
					grid-template-columns: repeat(4, 1fr);
				}

				@media (max-width: 700px) {
					grid-template-columns: repeat(3, 1fr);
				}
			`}
		>
			{children}
		</div>
	);
}
