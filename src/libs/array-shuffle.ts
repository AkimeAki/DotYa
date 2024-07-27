export const arrayShuffle = <T>(array: any[]): T => {
	for (let i = array.length - 1; 0 < i; i--) {
		let r = Math.floor(Math.random() * (i + 1));

		let tmp = array[i];
		array[i] = array[r];
		array[r] = tmp;
	}
	return array as T;
};
