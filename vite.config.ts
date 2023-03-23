import path from 'path';

import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';

interface Alias {
	alias: string;
	path: string;
}

// Add new alias here
const ALIASES: Alias[] = [
	{ alias: '$lib', path: 'src/lib' },
	{ alias: '$utils', path: 'src/utils' },
	{ alias: '$constants', path: 'src/constants' },
	{ alias: '$components', path: 'src/components' }
];

const generateAliases = () => {
	return ALIASES.reduce((acc, cur) => {
		acc[cur.alias] = path.resolve(__dirname, cur.path);
		return acc;
	}, {});
};

export default defineConfig({
	plugins: [sveltekit()],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}'],
		environment: 'jsdom'
	},
	server: {
		open: true
	},
	resolve: {
		alias: generateAliases()
	}
});
