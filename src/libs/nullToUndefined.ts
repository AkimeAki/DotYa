export const nullToUndefined = <T>(object: T): T => {
	for (const value in object) {
		// nullの場合はundefinedにする
		if (object[value] === null) {
			object[value] = undefined as Extract<keyof T, undefined>;

			continue;
		}

		// 配列の場合はfor文で再起的に回す
		if (Array.isArray(object[value])) {
			const array = object[value] as Extract<keyof T, unknown[]>;
			for (let i = 0; i < array.length; i++) {
				array[i] = nullToUndefined(array[i]);
			}

			continue;
		}

		// オブジェクトの場合も再起的に実行
		if (typeof object[value] === "object") {
			object[value] = nullToUndefined(object[value]);

			continue;
		}
	}

	return object;
};
