import PixelButton from "@/components/atoms/PixelButton";
import type { Lang } from "@/define";
import type { DotData } from "@/libs/format-dotlist";
import { addElement, getText } from "@/libs/getI18n";
import { getLangPath } from "@/libs/lang-path";
import type { TranslateData } from "@/types";

interface SizeProps {
	translateData: TranslateData;
	lang: Lang;
	tags: DotData["tags"];
}

export const Size = ({ translateData, lang, tags }: SizeProps) => {
	return (
		<>
			{addElement(
				getText(translateData, "dot_id_tags"),
				<>
					{tags.map((tag) => {
						return (
							<PixelButton href={getLangPath(`/tags/${tag.id}`, lang)} color="#4d3d36">
								{tag.name[lang]}
							</PixelButton>
						);
					})}
				</>
			)}
		</>
	);
};
