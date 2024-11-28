/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react";
import Button from "@/components/atoms/Button";
import { Fragment } from "react";

interface Props {
	current: number;
	last: number;
	baseUrl: string;
	fisrtPagePath?: string;
}

export default function ({ current, last, baseUrl, fisrtPagePath }: Props) {
	const viewTenTenTen = last > 5;

	return (
		<div
			css={css`
				display: flex;
				gap: 5px;
				justify-content: center;

				@media (max-width: 500px) {
					a,
					button {
						padding: 10px 12px 12px;
						font-size: 12px;
					}
				}
			`}
		>
			<Button
				href={
					current < 2
						? undefined
						: current - 1 === 1 && fisrtPagePath !== undefined
							? fisrtPagePath
							: `${baseUrl}${current - 1}`
				}
				disabled={current < 2}
			>
				{"<"}
			</Button>
			{viewTenTenTen && last > 7 && (
				<>
					{current > 2 && (
						<Button href={fisrtPagePath !== undefined ? fisrtPagePath : `${baseUrl}${1}`}>1</Button>
					)}
					{current > 4 && <Button noSelect>...</Button>}
				</>
			)}
			{[...Array(last)].map((_, i) => {
				if (viewTenTenTen && last > 7) {
					if (current > 2 && i + 1 === 1) {
						return <Fragment key={i} />;
					}

					if (current < 5 && i + 1 > 4) {
						return <Fragment key={i} />;
					}

					if (current > 4 && i + 1 > current && current < last - 3) {
						return <Fragment key={i} />;
					}

					if (current > 4 && i + 1 < current - 1 && i + 1 < last - 3) {
						return <Fragment key={i} />;
					}

					if (current > 4 && i + 1 < 4) {
						return <Fragment key={i} />;
					}
				}

				return (
					<Button
						key={i}
						selected={i + 1 === current}
						href={
							i + 1 === current
								? undefined
								: i + 1 === 1 && fisrtPagePath !== undefined
									? fisrtPagePath
									: `${baseUrl}${i + 1}`
						}
					>
						{i + 1}
					</Button>
				);
			})}
			{viewTenTenTen && last > 7 && (
				<>
					{current > 3 && current < last - 3 && (
						<Button href={`${baseUrl}${current + 1}`}>{current + 1}</Button>
					)}
					{current < last - 3 && <Button noSelect>...</Button>}
					{current < last - 3 && <Button href={`${baseUrl}${last}`}>{last}</Button>}
				</>
			)}
			<Button href={current > last - 1 ? undefined : `${baseUrl}${current + 1}`} disabled={current > last - 1}>
				{">"}
			</Button>
		</div>
	);
}
