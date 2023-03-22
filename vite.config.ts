import path from 'path';

import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';

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
		alias: {
			$lib: path.resolve(__dirname, 'src/lib'),
			$utils: path.resolve(__dirname, 'src/utils'),
			$constants: path.resolve(__dirname, 'src/constants')
		}
	}
});
