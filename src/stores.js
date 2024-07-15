import { writable } from 'svelte/store';

export const loaded = writable(false);

export const locales = writable({});
export const preferredLanguage = writable('fr');
