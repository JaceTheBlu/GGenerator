<script>
	/**
	 * This page represents a pouch, it is possible to add/delete an element from this pouch
	 * @param name : the name that represents the pouch and the elements in it
	 * @param pouch_elements : a list that contains every elements a pouch contains, an elements have an id and a name, used to keep on track the existing elements and the display
	 *
	 */

	/* Imports*/
	import { createEventDispatcher } from 'svelte';
	import PouchElement from './PouchElement.svelte';

	/* Variables*/
	export let name = '';
	export let elements = [];
	let element_id = 0;
	let new_pouch = '';

	$: elements_id = name.toLowerCase() + element_id;
	
	const dispatch = createEventDispatcher();
	
	/* Functions */
	
	/**
	 * This function handle the add of a elements in the pouch
	 * @param event : the element to add, with and id and a name property
	 */
	function submit() {
		if (new_pouch.trim() !== '') {
			element_id++;
			elements = [
				...elements,
				{
					id: elements_id,
					name: new_pouch
				}
			];
			new_pouch = '';
		}
		dispatch('pouch_elements', { name :name, elements : elements });
	}
		

	function handleKeyboard(event) {
		switch (event.key) {
			case 'Enter':
				submit();
				break;

			default:
				break;
		}
	}


	function refreshElements(event){
		const pouch_elem = event.detail;
		let found = false;
		if(pouch_elem.name.trim()!== ''){

			console.log("In Pouch :", pouch_elem);

			for (let i = 0; (i < elements.length) && (!found); i++) {

				if(elements[i].id === pouch_elem.id){
					elements[i].name = pouch_elem.name;
					found = true;
				}
			}
			if(found){
				dispatch('pouch_elements', { name :name, elements : elements });
			}
		}
		elements = [...elements];
	}

	/**
	 * This function delete an element from a pouch, it catches the event created from "PouchElement.svelte"
	 * @param e : the id of the pouch to delete
	 */
	function deletePouchElement(e) {
		const deletionId = e.detail;
		let found = false;
		let i = 0;

		while (i < elements.length && !found) {
			if (deletionId === elements[i].id) {
				elements.splice(i, 1);
				found = true;
			}
			i++;
		}
		elements = [...elements];

		dispatch('pouch_elements', { name :name, elements : elements });
		console.log("elements :",elements)
	}


	/**
	 * This function create an event with the goal of deleting a pouch, it takes the name of the pouch to delete
	 * @param pouchName : the name of the pouch to delete
	 */
	function dispatchDeletePouch(pouchName) {
		dispatch('delete-pouch', pouchName);
	}
</script>


<ul class="bg-slate-800/50 rounded-xl divide-y mt-4 mb-4">
	<li class="flex justify-between text-xl h-full">
		<span
			class="flex items-center px-2 hover:rotate-90 transition duration-300 hover:cursor-pointer rounded-tl-xl"
		>
			>
		</span>
		
		<div
			class="flex hover:cursor-move grow hover:text-orange-500 transition-colors duration-300 justify-center"
		>
			<span class="flex items-center text-white/50"> @ </span>
			<span class="flex font-bold items-center">{name}</span>

		</div>
		<button
			class="flex justify-end items-center text-white h-full rounded-tr-xl hover:bg-red-500 transition-colors duration-300 px-2"
			on:click={dispatchDeletePouch(name)}>X</button
		>
	</li>

	{#if elements.length !== 0}
		<div class="divide-y divide-dashed">
			{#each elements as pouch}
				<PouchElement
					id={pouch.id}
					name={pouch.name}
					on:update-pouch-element={refreshElements}
					on:delete-pouch-element={deletePouchElement}
				/>
			{/each}
		</div>
	{/if}

	<li class="flex">
		<input
			bind:value={new_pouch}
			class="bg-transparent w-full h-full focus:outline-none placeholder:italic rounded-b-xl pl-4 pb-1  "
			type="text"
			placeholder="Enter a value..."
			on:keypress={handleKeyboard}
		/>

		<button
			class="bg-blue-500 flex-shrink-0 w-full md:w-auto text-white text-secondary font-bold rounded-md px-4 "	
			on:click={submit}		
			>
				 ↵
		</button>

	</li>
</ul>
