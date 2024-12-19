import { css } from "@/styled-system/css";

interface Props {
	children: React.ReactNode;
	isChecked: boolean;
	setIsChecked: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ({ children, isChecked, setIsChecked }: Props) {
	return (
		<div
			className={css`
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
				className={css`
					position: relative;
					width: 30px;
					height: 30px;
					background-color: white;
					border-color: #613e28;
					border-width: 2px;
					border-style: solid;
					cursor: pointer;
				`}
			>
				<div
					className={css`
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
				className={css`
					flex: 1;
				`}
			>
				{children}
			</div>
		</div>
	);
}
