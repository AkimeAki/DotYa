/** @jsxImportSource @emotion/react */

import SidebarLink from "@/components/SidebarLink";
import { css } from "@emotion/react";

interface Props {
	children: React.ReactNode;
}

export default function ({ children }: Props): JSX.Element {
	return (
		<div
			css={css`
				display: flex;
				flex-direction: column;
				height: 100%;
			`}
		>
			<div
				css={css`
					flex: 1;
				`}
			>
				<header
					css={css`
						background-color: #f89b4e;
						padding: 30px 0;
					`}
				>
					<a
						css={css`
							text-decoration: none;
						`}
						href="/"
					>
						<h1
							css={css`
								text-align: center;
								font-size: 30px;
								font-weight: bold;
							`}
						>
							どっとや
						</h1>
					</a>
					<p
						css={css`
							text-align: center;
							margin-top: 10px;
						`}
					>
						ドット絵のフリーイラスト素材屋さんです。
					</p>
				</header>
				<main
					css={css`
						padding: 50px 0;
						display: flex;
						gap: 30px;
						max-width: 1300px;
						width: 100%;
						margin: 0 auto;
					`}
				>
					<aside
						css={css`
							display: flex;
							flex-direction: column;
							width: 300px;
							gap: 15px;
						`}
					>
						<SidebarLink href="/">ホーム</SidebarLink>
						<SidebarLink href="/terms">利用規約</SidebarLink>
						<SidebarLink href="/contact">お問い合わせ</SidebarLink>
					</aside>
					<div
						css={css`
							flex: 1;
						`}
					>
						{children}
					</div>
				</main>
			</div>
			<footer
				css={css`
					background-color: #6d6d6d;
					border-top: 2px solid #535353;
					padding: 50px 0;
				`}
			>
				<p
					css={css`
						text-align: center;

						span {
							color: white;
						}

						a {
							color: #7cf0ff;
							margin: 0 10px;
						}
					`}
				>
					<span>Created by</span>
					<a href="https://twitter.com/acharom032" target="_blank" rel="noreferrer">
						acharom
					</a>
					<span>&</span>
					<a href="https://twitter.com/Akime_Aki" target="_blank" rel="noreferrer">
						彩季
					</a>
				</p>
			</footer>
		</div>
	);
}
