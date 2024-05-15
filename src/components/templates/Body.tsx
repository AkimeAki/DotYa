/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react";
import Sidebar from "@/components/organisms/Sidebar";
import type { MicroCMSListContent } from "microcms-js-sdk";
import type { DotIllustTag } from "@/types";

interface Props {
	children: React.ReactNode;
	tags: (DotIllustTag & MicroCMSListContent)[];
}

export default function ({ children, tags }: Props): JSX.Element {
	return (
		<div
			css={css`
				width: 100%;
				height: 100svh;
				overflow-y: scroll;
			`}
		>
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
							position: relative;
							display: flex;
							flex-direction: column;
							align-items: center;
							gap: 10px;
							justify-content: center;
							background-color: #ebae7e;
							padding: 30px 0;
							border: 7px solid #492b18;
						`}
					>
						<span
							css={css`
								position: absolute;
								top: 17px;
								left: 17px;
								content: "";
								display: block;
								width: 20px;
								height: 20px;
								background-color: #613e28;
							`}
						/>
						<span
							css={css`
								position: absolute;
								top: 10px;
								left: 10px;
								content: "";
								display: block;
								width: 20px;
								height: 20px;
								background-color: #492b18;
							`}
						/>

						<span
							css={css`
								position: absolute;
								bottom: 10px;
								right: 10px;
								content: "";
								display: block;
								width: 20px;
								height: 20px;
								background-color: #613e28;
							`}
						/>
						<span
							css={css`
								position: absolute;
								bottom: 17px;
								right: 17px;
								content: "";
								display: block;
								width: 20px;
								height: 20px;
								background-color: #492b18;
							`}
						/>
						<a
							css={css`
								text-decoration: none;
							`}
							href="/"
						>
							<h1
								css={css`
									display: inline-block;
									font-size: 30px;
									font-weight: bold;
									color: #86664f;
									text-shadow:
										1px 1px 0 #492b18,
										-1px -1px 0 #492b18,
										-1px 1px 0 #492b18,
										1px -1px 0 #492b18,
										0px 1px 0 #492b18,
										-1px 0 #492b18,
										-1px 0 0 #492b18,
										1px 0 0 #492b18;
								`}
							>
								どっとや
							</h1>
						</a>
						<p
							css={css`
								text-align: center;
								color: #313131;
							`}
						>
							ドット絵のフリーイラスト素材屋さんです。
						</p>
					</header>
					<main
						css={css`
							padding: 50px 10px;
							display: flex;
							gap: 30px;
							max-width: 1300px;
							width: 100%;
							margin: 0 auto;

							@media (max-width: 1130px) {
								flex-direction: column;
							}
						`}
					>
						<Sidebar tags={tags} />
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
						<a href="https://aki.wtf" target="_blank" rel="noreferrer">
							彩季
						</a>
					</p>
				</footer>
			</div>
		</div>
	);
}
