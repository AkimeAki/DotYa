export const downloadImage = async (url: string, title: string) => {
	try {
		const image = await fetch(url);
		const imageBlob = await image.blob();
		const imageURL = URL.createObjectURL(imageBlob);

		const link = document.createElement("a");
		link.href = imageURL;
		link.download = `${title}.png`;
		link.click();
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
	} catch (e) {
		console.error("download error");
	}
};
