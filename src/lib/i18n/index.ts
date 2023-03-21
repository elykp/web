import { derived, writable } from 'svelte/store';

import translations from './translations';

type Vars = Record<string, any>;

export const locale = writable('en');

export const locales = Object.keys(translations);

function translate(locale: string, key: string, vars: Vars) {
	if (!key) throw new Error('no key provided to $t()');
	if (!locale) throw new Error(`no translation for key "${key}"`);

	let text: string;

	text = translations[locale][key] || key;

	Object.keys(vars).map((k) => {
		const regex = new RegExp(`{{${k}}}`, 'g');
		text = text.replace(regex, vars[k]);
	});

	return text;
}

export const t = derived(
	locale,
	(locale) =>
		(key: string, vars: Vars = {}) =>
			translate(locale, key, vars)
);
