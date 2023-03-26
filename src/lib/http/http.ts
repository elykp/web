import queryString, { type StringifyOptions } from 'query-string';
import { switchMap, throwError } from 'rxjs';
import { fromFetch } from 'rxjs/fetch';

import { getAccessToken$ } from '$lib/data-access/auth';

type Method = 'GET' | 'POST' | 'PUT' | 'DELETE';

interface URLConstructor {
	path: string;
	pathVariable: string | number;
}

type URL = string | URLConstructor;

const stringifyOptions: StringifyOptions = {
	arrayFormat: 'comma',
	skipNull: true,
	skipEmptyString: true
};

const BASE_URL = 'http://localhost:8765';

const URLConstructor = (url: URL) => {
	if (typeof url === 'string') {
		return url;
	}
	const { path, pathVariable } = url as URLConstructor;
	return path.endsWith('/') ? `${path}/${pathVariable}` : path + pathVariable;
};

export const http = <TData>(method: Method, url: URL, data?: unknown) => {
	let _url = URLConstructor(url);
	_url = _url.startsWith('/') ? BASE_URL + _url : _url;
	const reqInit: RequestInit = {
		method,
		headers: {
			'Content-Type': 'application/json'
		},
		mode: 'cors'
	};

	if (data) {
		if (method === 'GET') {
			_url = _url.concat('?', queryString.stringify(data, stringifyOptions));
		} else {
			reqInit.body = JSON.stringify(data);
		}
	}

	return getAccessToken$.pipe(
		switchMap((accessToken) => {
			if (accessToken) {
				reqInit.headers!['Authorization'] = 'Bearer ' + accessToken;
			}
			return fromFetch(_url, reqInit).pipe(
				switchMap((response) => {
					if (response.ok) {
						return response.json() as Promise<TData>;
					}
					return throwError(() => new Error(response.statusText));
				})
			);
		})
	);
};
