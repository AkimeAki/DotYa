import { cx } from "@/libs/merge-panda";
import { css } from "@/styled-system/css";

interface Props {
	children: React.ReactNode;
	size?: "normal" | "small";
	h?: 2 | 3 | 4 | 5 | 6;
}

export default function ({ children, size = "normal", h = 2 }: Props) {
	const style = cx(
		css`
			padding: 15px 20px 20px;
			text-decoration: none;
			background-color: #36364d;
			color: #faf5b1;
			border-radius: 4px;
			border-bottom: 2px solid #111116;
			border-top: 2px solid #58586e;
			font-size: 30px;

			@media (max-width: 1130px) {
				font-size: 20px;
			}

			@media (max-width: 700px) {
				font-size: 16px;
				padding: 11px 20px 14px;
			}
		`,
		size === "small" &&
			css`
				padding: 5px 10px 8px;
				font-size: 15px;

				@media (max-width: 1130px) {
					padding: 5px 10px 8px;
					font-size: 15px;
				}

				@media (max-width: 700px) {
					padding: 5px 10px 8px;
					font-size: 12px;
				}
			`
	);

	switch (h) {
		case 2:
			return <h2 className={style}>{children}</h2>;
		case 3:
			return <h3 className={style}>{children}</h3>;
		case 4:
			return <h4 className={style}>{children}</h4>;
		case 5:
			return <h5 className={style}>{children}</h5>;
		case 6:
			return <h6 className={style}>{children}</h6>;
	}
}
