import { catchError, of } from 'rxjs';

import { http } from '../http';
import type { PagingRQ, PagingRS } from '../query';

export interface Tag {
	id: number;
	name: string;
	count?: number;
	highlighted?: string;
	createdAt?: number;
}

type CreateTagRQ = Pick<Tag, 'name'>;

export const createTag = (createTagRQ: CreateTagRQ) => http('POST', '/api/tags', createTagRQ);

export const getTrendingTags = () =>
	http<Tag[]>('GET', '/api/tags/trending').pipe(catchError(() => of([])));

export const getByName = (pagingRQ: PagingRQ & { q?: string }) =>
	http<PagingRS<Tag[]>>('GET', '/api/tags', pagingRQ);

export const getRelatedTagByQuery = (q: string) => http<Tag>('GET', '/api/tags/related', { q });
