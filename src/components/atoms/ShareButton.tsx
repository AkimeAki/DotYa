import Button from "@/components/atoms/Button";
import { addElement } from "@/libs/getI18n";
import { css } from "@/styled-system/css";

interface Props {
	href: string;
	target?: string;
	icon: string;
	size: number;
	onClick?: () => void;
	alt: string;
	serviceName: string;
	text: string;
}

export default function ({ href, target = "_self", icon, size, alt, serviceName, text }: Props) {
	return (
		<div
			className={css`
				a {
					height: 38px;
					padding-top: 0;
					padding-bottom: 0;
				}
			`}
		>
			<Button
				target={target}
				href={href}
				onClick={() => {
					// eslint-disable-next-line @typescript-eslint/ban-ts-comment
					// @ts-expect-error
					dataLayer.push({ event: "click-share", service: serviceName });
				}}
			>
				<div
					className={css`
						color: inherit;
						display: flex;
						justify-content: center;
						gap: 8px;
						font-size: 15px;
						align-items: center;
						transform: translateY(-1px);
					`}
				>
					{addElement(
						text,
						<img
							alt={alt}
							className={css`
								aspect-ratio: 1/1;
								object-fit: contain;
								transform: translateY(2px);
							`}
							src={icon}
							width={size}
						/>
					)}
				</div>
			</Button>
		</div>
	);
}
