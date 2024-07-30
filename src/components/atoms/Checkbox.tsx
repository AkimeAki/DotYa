/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react";

interface Props {
	children: React.ReactNode;
	isChecked: boolean;
	setIsChecked: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ({ children, isChecked, setIsChecked }: Props) {
	return (
		<div
			css={css`
				display: flex;
				gap: 10px;
				align-items: center;
				user-select: none;
			`}
		>
			<div
				onClick={() => {
					setIsChecked((checked) => {
						return !checked;
					});
				}}
				css={css`
					position: relative;
					width: 30px;
					height: 30px;
					background-color: white;
					cursor: pointer;
				`}
			>
				<div
					css={css`
						position: absolute;
						top: 50%;
						left: 50%;
						transform: translate(-50%, -50%);
					`}
				>
					{isChecked && "✓"}
				</div>
			</div>
			<div
				css={css`
					flex: 1;
				`}
			>
				{children}
			</div>
		</div>
	);
}
