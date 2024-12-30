import type { TranslateData } from "@/types";
import { Fragment } from "react";

export const getText = (data: TranslateData, key: string, rich: boolean = false) => {
	if (rich) {
		return data[key]?.rich ?? "<p></p>";
	} else {
		return data[key]?.text ?? "";
	}
};

export const addArg = (text: string, ...args: string[]) => {
	let result = text;

	args.forEach((arg, index) => {
		result = result.replaceAll(new RegExp(`\\{\\{\\$${index + 1}\\}\\}`, "g"), arg);
	});

	return result;
};

export const addElement = (text: string, ...args: React.ReactElement[]) => {
	let result = [text];

	args.forEach((_, index) => {
		result = text.split(`{{$${index + 1}}}`);
	});

	return result.map((result, index) => {
		return (
			<Fragment key={index}>
				{result}
				{args[index]}
			</Fragment>
		);
	});
};
