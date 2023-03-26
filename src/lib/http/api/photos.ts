import type { Tag } from './tags';
import { http } from '../http';

interface Photo {
	id: string;
	title: string;
	creatorId: string;
	likeCount: number;
	nsfw: boolean;
	blurhash: string;
	createdAt: number;
	tags: Tag;
	assets: any;
	deleted: boolean;
}

export interface CreatePhotoRQ extends Pick<Photo, 'title' | 'blurhash' | 'nsfw'> {
	tags: string[];
}

export const createPhoto = (createPhotoRQ: CreatePhotoRQ) =>
	http('POST', '/api/photos', createPhotoRQ);
