// カタカナをひらがなに変換
export const kanaToHira = (str: string) => {
	return str.replace(/[\u30a1-\u30f6]/g, function (match) {
		var chr = match.charCodeAt(0) - 0x60;
		return String.fromCharCode(chr);
	});
};

// ひらがなをカタカナに変換
export const hiraToKana = (str: string) => {
	return str.replace(/[\u3041-\u3096]/g, function (match) {
		var chr = match.charCodeAt(0) + 0x60;
		return String.fromCharCode(chr);
	});
};

// 全角を半角に変換
export const fullToHalf = (str: string) => {
	str = str.replace(/[Ａ-Ｚａ-ｚ０-９？！]/g, function (s) {
		return String.fromCharCode(s.charCodeAt(0) - 0xfee0);
	});
	return str;
};

// 半角を全角に変換
export const halfToFull = (str: string) => {
	// 半角英数字を全角に変換
	str = str.replace(/[A-Za-z0-9?!]/g, function (s) {
		return String.fromCharCode(s.charCodeAt(0) + 0xfee0);
	});
	return str;
};
