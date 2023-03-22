import { config } from '$constants';

export const getCDNLink = (url?: string) => {
	if (!url) {
		return '';
	}
	return `https://res.cloudinary.com/${config.cloudinary.cloudName}/image/fetch/` + url;
};

export const readFileAsync = (file: File): Promise<string> =>
	new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => {
			resolve(reader.result as string);
		};

		reader.onerror = reject;
	});
