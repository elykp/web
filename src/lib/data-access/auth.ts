import {
	UserManager,
	WebStorageStateStore,
	type UserManagerSettings,
	type User
} from 'oidc-client';
import { map } from 'rxjs';

import { globalLoading } from './global';
import { enqueue } from './toast';
import { writable } from '../store';

const settings = (webOrigin: string): UserManagerSettings => ({
	userStore: new WebStorageStateStore({
		store: window.sessionStorage
	}),
	authority: 'http://localhost:8080/realms/elykp',
	client_id: 'elykp-mm-client',
	redirect_uri: webOrigin + '/signin-callback.html',
	response_type: 'code',
	scope: 'openid profile core-service asset-service',
	post_logout_redirect_uri: webOrigin,
	silent_redirect_uri: webOrigin + '/silent-renew.html',
	automaticSilentRenew: true,
	validateSubOnSilentRenew: true,
	loadUserInfo: false
});

let manager: UserManager;

export const _user$ = writable<User | null>(null);

const setUser = (user: User) => {
	_user$.set(user);
};

export const initOidc = () => {
	const WEB_ORIGIN = window.location.origin;
	manager = new UserManager(settings(WEB_ORIGIN));

	manager.events.addUserLoaded(() => {
		manager.getUser().then((user) => {
			if (user) {
				setUser(user);
			}
		});
	});

	manager.events.addSilentRenewError(() => {
		logout();
	});

	return () => {
		manager.events.removeUserLoaded(() => {});
		manager.events.removeSilentRenewError(() => {});
	};
};

const getUser = () => manager.getUser();

export const signIn = (...args: any[]) =>
	manager.signinRedirect(args).catch((e) => enqueue(e?.message, { variant: 'error' }));

export const logout = () => manager.signoutRedirect();

export const startAuthentication = async () => {
	getUser()
		.then((user) => {
			if (user) {
				if (user.expired) {
					signIn();
				} else {
					setUser(user);
				}
			} else {
				manager.signinSilent({}).catch(() => {});
			}
			return () => {};
		})
		.catch()
		.finally(() => {
			globalLoading.update((state) => ({
				...state,
				auth: false
			}));
		});
};

export const user$ = _user$.asObservable();

export const isAuthenticated$ = _user$.pipe(map((user) => !!user && !user.expired));

export const getAccessToken$ = _user$.pipe(map((user) => user?.access_token));
