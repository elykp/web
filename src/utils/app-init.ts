import { initOidc, startAuthentication } from '$lib/data-access/auth';

export const initialize = async () => {
	[initOidc, startAuthentication].forEach((fn) => fn());
};
