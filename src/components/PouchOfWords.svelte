<script>
	/**
	 * A class that wraps the Pouch of Words functionality
	 * It allows creating pouches and displays them
	 * @param max : a number that tells the maximum numbers of characters possible in the input
	 */

	/* Imports */
	import { locales, pouches } from '../stores';
	import Pouch from './Pouch.svelte';

	/* Variables */
	let input_value = '';
	let max = 20;
	let pouch_id = 0;
	let dragged_pouch = null;

	$: input_value = String(input_value).toLowerCase();
	$: pouch_list = $pouches;

	/*Functions */

	/**
	 * This function handle the add of a new pouch
	 * It is not possible to create a pouch with an empty name or an name which already exist
	 */
	export const addPouch = (event) => {
		if (event?.type === 'click') {
			input_value = input_value.trim();
		} else if (event?.type === 'import') {
			input_value = event.detail.name;
		} else {
			input_value = event || input_value.trim();
		}
		if (
			input_value !== null &&
			input_value !== undefined &&
			input_value !== '' &&
			input_value.length > 0 &&
			input_value.length < max
		) {
			let pouch = {
				id: pouch_id,
				name: input_value,
				elements: event?.detail?.elements || []
			};
			pouches.update((currentList) => {
				let nameAlreadyExist = currentList.some((p) => p.name === pouch.name);
				if (!nameAlreadyExist) {
					pouch_id++;
					return [...currentList, pouch];
				}
				return currentList;
			});
			input_value = '';
		}
	};

	/**
	 *  This function redirect the user that addPouch through the enter key to the addPouch method
	 * @param event the key pressed by the user
	 */
	function handleKeyboard(event) {
		switch (event.key) {
			case 'Enter':
				addPouch();
				break;
			default:
				break;
		}
	}

	const clearPouchofWords = () => {
		pouches.set([]);
	};

	/**
	 * This method is triggered when the event 'pouch_elements' is catched
	 * Its goal is to update the pouch_list with the last modification done in the child components (Pouch and PouchElements)
	 * @param event : the pouch to update
	 */
	function refreshPouch(event) {
		const updatedPouch = event.detail;
		if (updatedPouch.name.trim() !== '') {
			pouches.update((currentList) => {
				let nameAlreadyExist = currentList.some(
					(p) => p.name === updatedPouch.name && p.id !== updatedPouch.id
				);
				if (!nameAlreadyExist) {
					return currentList.map((pouch) => (pouch.id === updatedPouch.id ? updatedPouch : pouch));
				}
				console.error(
					'The name :',
					updatedPouch.name,
					' already exist ! \n Please enter a new one'
				);
				return currentList;
			});
		}
	}

	/**
	 * This function handle the deletion of a pouch, it catches the event created from "Pouch.svelte"
	 * @param e : the id of the pouch to delete
	 */
	function deletePouch(e) {
		const pouchId = e.detail.id;
		pouches.update((currentList) => currentList.filter((p) => p.id !== pouchId));
	}

	function handleDragStart(event, pouch) {
		dragged_pouch = pouch;
		event.dataTransfer.effectAllowed = 'move';
		event.dataTransfer.setData('pouch', dragged_pouch.name);
	}

	function handleDragOver(event, pouch) {
		event.preventDefault();
		event.dataTransfer.dropEffect = 'move';

		//New features
		const element = event.currentTarget;
		element.classList.add(
			'bg-secondary-color/50',
			'rounded-t-primary',
			'border-b-8',
			'border-dashed'
		);
	}

	function handleDragLeave(event, pouch) {
		const element = event.currentTarget;
		element.classList.remove(
			'bg-secondary-color/50',
			'rounded-t-primary',
			'border-b-8',
			'border-dashed'
		);
	}

	function handleDrop(event, pouch) {
		event.preventDefault();

		// New features
		const element = event.currentTarget;
		element.classList.remove(
			'bg-secondary-color/50',
			'rounded-t-primary',
			'border-b-8',
			'border-dashed'
		);

		pouches.update((currentList) => {
			const draggedIndex = currentList.indexOf(dragged_pouch);
			const droppedIndex = currentList.indexOf(pouch);
			if (draggedIndex >= 0) {
				currentList.splice(draggedIndex, 1);
				currentList.splice(droppedIndex, 0, dragged_pouch);
			}
			return [...currentList];
		});
		dragged_pouch = null;
	}
</script>

<div class="flex flex-1 h-[calc(100vh-13.5rem)] flex-col">
	<div class="flex children:px-2 mb-2 justify-between not-selectable">
		<span class="text-secondary font-bold text-primary-color">{$locales.pouches}</span>
		<button
			class="hover:text-cancel-color transition-colors text-tertiary"
			on:click={clearPouchofWords}
		>
			{$locales.clear}
		</button>
	</div>

	<div class="flex" id="help_guide-step-pouch">
		<input
			class=" bg-slate-800/50 flex-grow w-full focus:outline-none focus:ring md:w-3/4 rounded-md mr-2 pl-2"
			type="text"
			bind:value={input_value}
			on:keypress={handleKeyboard}
		/>

		<button
			class="bg-validate-color flex-shrink-0 w-full md:w-auto text-white rounded-md px-4 py-2"
			on:click={addPouch}
			>{$locales.pouch_input}
		</button>
	</div>

	<div class="flex-1 overflow-y-auto rounded-primary">
		{#if $pouches}
			{#each $pouches as pouch}
				<div
					on:dragstart={(event) => handleDragStart(event, pouch)}
					on:dragover={(event) => handleDragOver(event, pouch)}
					on:dragleave={(event) => handleDragLeave(event, pouch)}
					on:drop={(event) => handleDrop(event, pouch)}
					aria-label="drag and drop zone of pouch"
					role="region"
				>
					<Pouch
						id={pouch.id}
						name={pouch.name}
						elements={pouch.elements}
						on:pouch_elements={refreshPouch}
						on:delete-pouch={deletePouch}
					/>
				</div>
			{/each}
		{:else}
			<div class="flex flex-col">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					version="1.1"
					xmlns:xlink="http://www.w3.org/1999/xlink"
					xmlns:svgjs="http://svgjs.dev/svgjs"
					viewBox="0 0 800 800"
					class="w-1/2 self-end"
					><g
						stroke-width="15"
						stroke="hsl(0, 0%, 100%)"
						stroke-opacity="0.5"
						fill="none"
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-dasharray="21 39"
						transform="matrix(-0.10452846326765336,-0.9945218953682734,0.9945218953682734,-0.10452846326765336,30.002627159752024,859.6201434543707)"
						><path
							d="M112.85421752929688 106Q393.8542175292969 839 406.8542175292969 400Q-331.1457824707031 588 700.8542175292969 694 "
							marker-end="url(#SvgjsMarker6867)"
						/></g
					><defs
						><marker
							markerWidth="7"
							markerHeight="7"
							refX="3.5"
							refY="3.5"
							viewBox="0 0 7 7"
							orient="auto"
							id="SvgjsMarker6867"
							><polygon
								points="0,7 2.3333333333333335,3.5 0,0 7,3.5"
								fill="hsl(0, 0%, 100%)"
								fill-opacity="0.5"
							/></marker
						></defs
					></svg
				>
				<p class="text-secondary text-primary-color/50 text-center not-selectable">
					{$locales.placeholder_pouches_1} <br />
					{$locales.placeholder_pouches_2}
				</p>
			</div>
		{/if}
	</div>
</div>
