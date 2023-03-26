import { encode } from 'blurhash';

const REDUCTION_RATE = 20;

const loadImage = async (src: string) =>
	new Promise<HTMLImageElement>((resolve, reject) => {
		const img = new Image();
		img.onload = () => resolve(img);
		img.onerror = reject;
		img.src = src;
	});

const getImageData = (image: HTMLImageElement) => {
	const canvas = document.createElement('canvas');
	canvas.width = image.width;
	canvas.height = image.height;
	const context = canvas.getContext('2d')!;
	context.drawImage(image, 0, 0);

	const canvas2 = document.createElement('canvas');
	// Reduce blur image size by 20 times
	const newWidth = image.width / REDUCTION_RATE;
	const newHeight = image.height / REDUCTION_RATE;
	canvas2.width = newWidth;
	canvas2.height = newHeight;
	const context2 = canvas2.getContext('2d')!;
	context2.drawImage(canvas, 0, 0, newWidth, newHeight);

	return context2.getImageData(0, 0, newWidth, newHeight);
};

export const encodeImageToBlurhash = async (imageUrl: string) => {
	const image = await loadImage(imageUrl);
	const { data, width, height } = getImageData(image);
	return encode(data, width, height, 4, 3);
};
