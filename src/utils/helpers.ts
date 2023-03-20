import { config } from '$constants';

export const getCDNLink = (url?: string) => {
	if (!url) {
		return '';
	}
	return `https://res.cloudinary.com/${config.cloudinary.cloudName}/image/fetch/` + url;
};
