export type SortDirection = 'ASC' | 'DESC' | 'asc' | 'desc';

export interface PagingRQ {
	page?: number;
	size?: number;
	sort?: string;
	direction?: SortDirection;
}

export interface PagingRS<TData> {
	content: TData;
	empty: boolean;
	first: boolean;
	last: boolean;
	number: number;
	numberOfElements: number;
	size: number;
	totalPages: number;
	totalElements: number;
}
