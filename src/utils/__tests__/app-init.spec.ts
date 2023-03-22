import { afterEach, describe, expect, it, vi } from 'vitest';

import { initialize } from '$utils/app-init';

describe('app-init', () => {
	afterEach(() => {
		vi.restoreAllMocks();
	});

	it('initialize() should have been called', () => {
		const mockInitialize = vi.fn().mockImplementation(initialize);
		mockInitialize();
		expect(mockInitialize).toHaveBeenCalledOnce();
	});
});
