export const cx = (...style: (string | undefined | null | false)[]): string => {
	return style.filter(Boolean).join(" ");
};
