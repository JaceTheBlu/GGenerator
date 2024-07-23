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
					id: "w"+rundownID++,
					text,
					type: String(text).charAt(0) === '@' ? 'pouch' : 'static'
				};
				return [...items, newItem];
			}),
		updateWord: (word) =>
			update((items) =>{
				if(word.type === 'pouch'){
					pouches.add(word.text.substring(1));
				}

				return items.map((item) => (item.id === word.id ? { 
					...item, 
					text: word.text, 
					type: word.type 
				} : item))
			}),
		remove: (rundownID) => update((items) => items.filter((item) => item.id !== rundownID)),
		clear: () => {
			set([]);
			rundownID = 0;
		},
		copy: (rundown_writable) =>{
			rundown.add(rundown_writable.text);
			return rundown
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
				console.log("name :",name);
				const pouchExists = pouches.some((pouch) => pouch.name === name);
				if (pouchExists) {
					return pouches;
				}
				const newPouch = { id: "p"+PouchID++, name, elements: elements || [] };
				return [...pouches, newPouch];
			}),
		updatePouch: (pouchId, pouchName ) =>
			update((pouches) =>{
				return pouches.map((pouch) => {
					if (pouch.id === pouchId) {
						return {
							...pouch,
							name: pouchName,
						};
					}
					return pouch;
				});
			}),
		remove: (pouchId) => update((items) => items.filter((item) => item.id !== pouchId)),

		addElementToPouch: (pouchId, elementText) =>
			update((pouches) => {
				return pouches.map((pouch) => {
					if (pouch.id === pouchId) {
						return {
							...pouch,
							elements: [
								...pouch.elements,
								{ 
									id: `${pouch.id}${"e"+pouch.elements.length}`, 
									name: elementText 
								}
							]
						};
					}
					return pouch;
				});
			}),
		updateElement: (elementId, elementName ) =>
				update((pouches) =>{
					return pouches.map((pouch) => {

					const pouchId = elementId.split("e")[0];
						if (pouch.id === pouchId) {
							pouch.elements.map((elem)=>{
								if(elem.id === elementId){
									elem.name = elementName;
									return{
										...pouch
									}
									
								}
							});
						}
						return pouch;
					});
				}),
		removeElementFromPouch: (elementId) =>
			update((pouches) => {
				return pouches.map((pouch) => {

					const pouchId = elementId.split("e")[0];
					if (pouch.id === pouchId) {
						return {
							...pouch,
							elements: pouch.elements.filter((element) => element.id !== elementId)
						};
					}
					return pouch;
				});
			}),
		clear: () => set([]),
		swapPouch: (pouch1, pouch2  ) => 
			update((currentList) => {
				const draggedIndex = currentList.indexOf(pouch1);
				const droppedIndex = currentList.indexOf(pouch2);
	
				if (draggedIndex >= 0) {
					currentList.splice(draggedIndex, 1);
					currentList.splice(droppedIndex, 0, pouch1);
				}
				return [...currentList];
			}),
			copy: (pouch_writable) => {
				const { name, elements } = pouch_writable;
				pouches.add(name)

				elements.forEach(elem => {
					const pouchID = PouchID -1 ; 
					pouches.addElementToPouch("p"+pouchID,elem.name);
				});
				return pouches
			}
	};
};
export const rundown = createRundown();
export const pouches = createPouches();
