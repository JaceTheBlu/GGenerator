import { writable } from 'svelte/store';

export const loaded = writable(false);
export const visited = writable(false);

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

export const createRundown = () => {
	const { subscribe, set, update } = writable([]);

	var rundownID = 0;

	return {
		subscribe,
		set,
		update,
		add: (text) =>
			update((items) => {
				const newItem = {
					id: rundownID++,
					text,
					type: String(text).charAt(0) === '@' ? 'pouch' : 'static'
				};
				return [...items, newItem];
			}),
		updateWord: (word) =>
			update((items) =>
				items.map((item) => (item.id === word.id ? { ...item, text: word.text } : item))
			),
		remove: (rundownID) => update((items) => items.filter((item) => item.id !== rundownID)),
		clear: () => {
			set([]);
			rundownID = 0;
		}
	};
};

export const createPouches = () => {
	const { subscribe, set, update } = writable([]);

	var PouchID = 0;

	return {
		subscribe,
		set,
		update,
		add: (name, elements) =>
			update((pouches) => {
				const pouchExists = pouches.some((pouch) => pouch.name === name);
				if (pouchExists) {
					return pouches;
				}
				const newPouch = { id: PouchID++, name, elements: elements || [] };
				return [...pouches, newPouch];
			}),
		remove: (event) => update((items) => items.filter((item) => item.id !== event.detail.id)),

		addElementToPouch: (pouchId, elementText) =>
			update((pouches) => {
				return pouches.map((pouch) => {
					if (pouch.id === pouchId) {
						return {
							...pouch,
							elements: [
								...pouch.elements,
								{ id: `${pouch.name.trim()}${pouch.elements.length}`, name: elementText }
							]
						};
					}
					return pouch;
				});
			}),
		removeElementFromPouch: (pouchId, elementId) =>
			update((pouches) => {
				return pouches.map((pouch) => {
					if (pouch.id === pouchId) {
						return {
							...pouch,
							elements: pouch.elements.filter((element) => element.id !== elementId)
						};
					}
					return pouch;
				});
			}),
		clear: () => set([])
	};
};
export const rundown = createRundown();
export const pouches = createPouches();
