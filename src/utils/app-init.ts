import { initOidc, startAuthentication } from '$lib/data-access/auth';
import { init18n } from '$lib/i18n';

export const initialize = () => [initOidc, startAuthentication, init18n].map((fn) => fn());
