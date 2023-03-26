import { map } from 'rxjs';

import { writable } from '$lib/store';

interface GlobalRegister {
	auth: boolean;
	i18n: boolean;
}

export const globalLoading = writable<GlobalRegister>({
	auth: true,
	i18n: true
});

const baseSelector = globalLoading.asObservable();

export const globalLoading$ = baseSelector.pipe(
	map((services) => Object.keys(services).some((key) => services[key]))
);
