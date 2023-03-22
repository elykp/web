import { afterEach, describe, expect, it, vi } from 'vitest';

import { getCDNLink } from '$utils/helpers';

describe('helpers', () => {
	afterEach(() => {
		vi.restoreAllMocks();
	});

	describe('getCDNLink(url: string)', () => {
		it('should return empty string if url is empty', () => {
			const mockGetCDNLink = vi.fn().mockImplementation(getCDNLink);
			expect(mockGetCDNLink('')).toEqual('');
			expect(mockGetCDNLink).toHaveBeenCalledOnce();
		});
	});
});
