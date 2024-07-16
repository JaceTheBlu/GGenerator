import { writable } from 'svelte/store';

export const loaded = writable(false);
export const visited = writable(false);

export const rundown = writable([]);
export const pouches = writable([]);

export const history = writable({
	_length: 0
});

export const examples = writable({
	_length: 0
});

export const tutorials = writable({
	_length: 0
});

export const locales = writable({});
export const preferredLanguage = writable('fr');
