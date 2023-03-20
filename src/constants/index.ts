export const config = {
	cloudinary: {
		cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || 'dig00csrc'
	}
} as const;
