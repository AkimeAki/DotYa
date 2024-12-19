import { cx } from "@/libs/merge-panda";
import { css } from "@/styled-system/css";

interface Props {
	isOpen: boolean;
	children: React.ReactNode;
	setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ({ isOpen, setIsOpen, children }: Props) {
	return (
		<div
			className={cx(
				css`
					user-select: none;
					pointer-events: none;
					opacity: 0;
				`,
				isOpen &&
					css`
						user-select: auto;
						pointer-events: auto;
						opacity: 1;
					`
			)}
		>
			<div
				onClick={() => {
					setIsOpen(false);
				}}
				className={css`
					position: fixed;
					top: 120px;
					right: 130px;
					z-index: 1002;

					&:after {
						content: "";
						display: block;
						position: absolute;
						top: 1px;
						left: -13px;
						background-color: #492b18;
						width: 40px;
						height: 40px;
						z-index: 1002;
						cursor: pointer;
					}

					@media (max-width: 990px) {
						top: 70px;
						right: 80px;
					}

					@media (max-width: 700px) {
						top: 20px;
						right: 30px;
					}
				`}
			>
				<span
					className={css`
						position: relative;
						font-size: 30px;
						font-weight: bold;
						z-index: 1004;
						color: white;
						user-select: none;
						pointer-events: none;
					`}
				>
					×
				</span>
			</div>
			<div
				className={css`
					position: fixed;
					top: 50%;
					left: 50%;
					transform: translate(-50%, -50%);
					width: calc(100% - 200px);
					height: calc(100% - 200px);
					background-color: rgba(235, 173, 126, 0.9);
					border: 7px solid #492b18;
					z-index: 1000;
					overflow-y: scroll;

					@media (max-width: 990px) {
						width: calc(100% - 100px);
						height: calc(100% - 100px);
					}

					@media (max-width: 700px) {
						width: 100%;
						height: 100%;
					}
				`}
			>
				<div
					className={css`
						margin-top: 60px;
					`}
				>
					{children}
				</div>
			</div>
		</div>
	);
}
