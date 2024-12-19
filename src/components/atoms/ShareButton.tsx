import Button from "@/components/atoms/Button";
import { css } from "@/styled-system/css";

interface Props {
	children: React.ReactNode;
	href: string;
	target?: string;
	icon: string;
	size: number;
	onClick?: () => void;
	alt: string;
	serviceName: string;
}

export default function ({ href, target = "_self", icon, children, size, alt, serviceName }: Props) {
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
					`}
				>
					<img
						alt={alt}
						className={css`
							aspect-ratio: 1/1;
							object-fit: contain;
						`}
						src={icon}
						width={size}
					/>
					<span
						className={css`
							color: inherit;
							font-size: 15px;
							display: flex;
							align-items: center;
							transform: translateY(-1px);
						`}
					>
						{children}
					</span>
				</div>
			</Button>
		</div>
	);
}
