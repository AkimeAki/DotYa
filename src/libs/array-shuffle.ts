export const arrayShuffle = <T>(array: unknown[]): T => {
	for (let i = array.length - 1; 0 < i; i--) {
		const r = Math.floor(Math.random() * (i + 1));

		const tmp = array[i];
		array[i] = array[r];
		array[r] = tmp;
	}
	return array as T;
};
