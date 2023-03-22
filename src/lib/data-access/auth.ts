import {
	UserManager,
	WebStorageStateStore,
	type UserManagerSettings,
	type User
} from 'oidc-client';
import { map } from 'rxjs';

import { enqueue } from './toast';
import { writable } from '../store';

interface Auth {
	user: User | null;
	isLoading: boolean;
}

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

export const auth$ = writable<Auth>({
	user: null,
	isLoading: true
});

const setUser = (user: User) => {
	auth$.update((state) => ({
		...state,
		isLoading: false,
		user
	}));
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
		})
		.catch()
		.finally(() => {
			auth$.update((state) => ({
				...state,
				isLoading: false
			}));
		});
};

export const user$ = auth$.pipe(map((x) => x.user));

export const isAuthenticated$ = auth$.pipe(map((x) => !!x.user && !x.user.expired));

export const isLoading$ = auth$.pipe(map((x) => x.isLoading));
