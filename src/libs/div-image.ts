import { createCanvas, loadImage } from "canvas";
import { imageSize } from "image-size";

export const imageToDiv = async (url: string): Promise<string> => {
	const imageResponse = await fetch(url);
	const imageArray = new Uint8Array(await imageResponse.arrayBuffer());
	const { width, height } = imageSize(imageArray);
	if (width === undefined || height === undefined) {
		return "";
	}

	const canvas = createCanvas(width, height);

	const image = await loadImage(url);
	const sampleImage = await loadImage("https://pixel.gives/sample.png");
	canvas.width = width;
	canvas.height = height;

	const ctx = canvas.getContext("2d");
	ctx!.drawImage(image, 0, 0, width, height);
	ctx!.drawImage(sampleImage, 0, 0, width, height);
	const imageData = ctx!.getImageData(0, 0, canvas.width, canvas.height);
	const data = imageData.data;
	let dom = `<div style="display: grid; grid-template-columns: repeat(${width}, 1fr); font-size: 0;">`;
	for (let i = 0; i < data.length; i += 4) {
		const r = data[i] ?? 0;
		const g = data[i + 1] ?? 0;
		const b = data[i + 2] ?? 0;
		const a = (data[i + 3] ?? 0) / 255;
		dom += `<div style="aspect-ration 1/1; background-color: rgba(${r}, ${g}, ${b}, ${a});"></div>`;
	}

	return dom;
};
