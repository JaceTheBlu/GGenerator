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
	export let id = 0;
	export let name = '';
	export let elements = [];

	let isEditable = false;
	let isHidden = false;
	
	let inputElement = "";
	let new_pouch = '';

	let element_id = 0;

	$: elements_id = name.toLowerCase() + element_id;
	const dispatch = createEventDispatcher();
	
	/* Functions */
	
	/**
	 * This function handle the add of a elements in the pouch
	 * @param event : the element to add, with and id and a name property
	 */
	function addElements() {
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

		dispatch('pouch_elements', {
					id: id, 
					name :name, 
					elements : elements 
		});
	}
		
	/**
	 *  This function redirect the user that submit through the enter key to the addElements method
	 * @param event the key pressed by the user
	 */
	function handleKeyboard(event, methodName) {
		if(event.key === 'Enter'){
			switch (methodName) {
				case 'addElements':
					addElements();
				break;
	
				case 'update':
					changeEditableState();
				break;

				default:
				break;
			}
		}
	}


	/**
	 * This function send a pouch to the parent (PouchOfWords) when it is modified
	 * @param event : a pouch element that has been modified
	 */
	function refreshElements(event){

		const pouch_elem = event.detail;
		let found = false;
		if(pouch_elem.name.trim()!== ''){

			for (let i = 0; (i < elements.length) && (!found); i++) {
				if(elements[i].id === pouch_elem.id){
					elements[i].name = pouch_elem.name;
					found = true;
				}
			}
			if(found){
				dispatch('pouch_elements', {
					id: id, 
					name :name, 
					elements : elements 
				});
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

		dispatch('pouch_elements', {
					id: id, 
					name :name, 
					elements : elements 
		});

	}


	/**
	 * This function create an event with the goal of deleting a pouch, it takes the name of the pouch to delete
	 * @param pouchName : the name of the pouch to delete
	 */
	function dispatchDeletePouch() {
		dispatch('delete-pouch',{id : id});
	}


	/**
	 * This method is used for the update of a pouch element
	 * Double clicking on a pouch element make it editable
	 * When focus is lost new informations are sent to the parent component
	 */
	 function changeEditableState(){
		isEditable = !isEditable;

		if(isEditable){
			requestAnimationFrame(() => {
				if (inputElement) {
					inputElement.focus();
					inputElement.select();
				}
			});
		}else{
			dispatch('pouch_elements', {
					id: id, 
					name :name.toLowerCase(), 
					elements : elements 
		})
		}
	}

	function changeHiddenState(){
		isHidden = !isHidden
	}
</script>


<ul class="bg-slate-800/50 rounded-xl divide-y my-2">
	<li class="flex justify-between text-xl h-full">

		<button
			class={`flex items-center px-2 hover:bg-blue-500 ${isHidden ? 'rounded-bl-xl' : 'rounded-none'} transition duration-300 hover:cursor-pointer rounded-tl-xl`}
			on:click={changeHiddenState}
		>
			{isHidden ? '▷' : '▽'}
			 
		</button>
		
		<div
			class="flex hover:cursor-move grow hover:text-secondary-color transition-colors duration-300 justify-center"
		>
			<span class="flex items-center text-white/50"> @ </span>

			{#if isEditable}
				<input 
					type="text" 
					bind:this={inputElement}
					bind:value={name}
					on:blur={changeEditableState}
					on:keydown={(event) => handleKeyboard(event, 'update')}
					class="bg-transparent flex w-full text-center font-bold rounded focus:outline-none focus:ring-2 focus:ring-secondary-color"
					>
			{:else}
		
				<button 
					class="flex font-bold items-center"
					on:click={changeEditableState}
				>
					{name}
				</button>
			{/if}

		</div>

		<button
			class="flex justify-end items-center text-white h-full rounded-tr-xl hover:bg-cancel-color transition-colors duration-300 px-2"
			on:click={dispatchDeletePouch}
		>
			X
		</button>
	</li>

	{#if elements.length !== 0 && !isHidden}

		<div 
			class="divide-y divide-dashed"
		>
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

	{#if !isHidden}
		<div>
			<li class="flex">
				<input
					bind:value={new_pouch}
					class="bg-transparent w-full h-full focus:outline-none focus:ring-2 focus:ring-secondary-color placeholder:italic rounded-bl-xl pl-4"
					type="text"
					placeholder="Enter a value..."
					on:keydown={(event) => handleKeyboard(event, 'addElements')}
				/>

				<button
					class="text-xl text-white border-l border-white hover:bg-validate-color rounded-br-xl transition-colors duration-300 px-2"
					on:click={addElements}
				>↵
				</button>
		
			</li>
		</div>
	{/if}
	
</ul>
