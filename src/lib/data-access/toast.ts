import { writable } from '../store';

export type ToastVariant = 'success' | 'warning' | 'error' | 'info';

export interface Toast {
	id: string;
	message: string;
	variant: ToastVariant;
}

interface EnqueueOptions {
	variant?: ToastVariant;
}

export interface EnqueueFn {
	(message: string, opts?: EnqueueOptions): void;
}

export const toastStore$ = writable<Toast[]>([]);

export const enqueue: EnqueueFn = (message, opts = {}) => {
	toastStore$.update((toasts) => {
		const item: Toast = {
			id: String(Date.now()),
			message,
			variant: opts.variant ?? 'success'
		};
		return [...toasts, item];
	});
};

export const dequeue = (id: string) => {
	toastStore$.update((toasts) => {
		const foundIdx = toasts.findIndex((toast) => toast.id === id);
		const clone = [...toasts];
		if (foundIdx > -1) {
			clone.splice(foundIdx, 1);
		} else {
			clone.pop();
		}
		return clone;
	});
};
