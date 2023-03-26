import { derived, writable } from 'svelte/store';

import { globalLoading } from '$lib/data-access/global';

type Vars = Record<string, any>;

type Translations = Record<string, string>;

type SupportedLocale = 'en' | 'vi';

export const locale = writable<SupportedLocale>('en');

const translations = writable<Translations>({});

function translate(translations: Translations, key: string, vars: Vars) {
	if (!key) throw new Error('no key provided to $t()');

	let text: string;

	const translatedText = translations[key];
	if (!translatedText) {
		console.warn(`No translation found for key '${key}'`);
	}

	text = translatedText || key;

	Object.keys(vars).map((k) => {
		const regex = new RegExp(`{{${k}}}`, 'g');
		text = text.replace(regex, vars[k]);
	});

	return text;
}

export const t = derived(
	translations,
	(translations) =>
		(key: string, vars: Vars = {}) =>
			translate(translations, key, vars)
);

export const init18n = () => {
	return locale.subscribe((locale) => {
		const url = `/locales/${locale}.json`;
		fetch(new URL(url, import.meta.url))
			.then((res) => res.json() as Promise<Translations>)
			.then(translations.set)
			.finally(() => {
				globalLoading.update((state) => ({ ...state, i18n: false }));
			});
	});
};

export const changeLanguage = (v: SupportedLocale) => {
	locale.set(v);
};
