export const kanaToHira = (str: string) => {
	return str.replace(/[\u30a1-\u30f6]/g, function (match) {
		var chr = match.charCodeAt(0) - 0x60;
		return String.fromCharCode(chr);
	});
};

export const hiraToKana = (str: string) => {
	return str.replace(/[\u3041-\u3096]/g, function (match) {
		var chr = match.charCodeAt(0) + 0x60;
		return String.fromCharCode(chr);
	});
};
