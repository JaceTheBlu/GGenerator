<script>
	/**
	 * This component represent a pouch element
	 * A pouch element is represented by :
	 * @param id : The id of the pouch element
	 * @param name : the name of the pouch element
	 */

	/* Imports  */
	import { createEventDispatcher } from 'svelte';

	/* Variables */
	export let id = 0;
	export let name = '';

	let isEditable = false;
	let inputElement = "";

	const dispatch = createEventDispatcher();

	/* Functions */
	/**
	 * This function create an event with the goal of deleting an element from a pouch, it take the id of the element to delete
	 * @param elementId : the id of the element to delete
	 */
	function dispatchDelete(elementId) {
		dispatch('delete-pouch-element', elementId);
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
			dispatch('update-pouch-element',{id, name});
		}
	}


	/**
	 *  This function redirect the user that submit through the enter key to the changeEditableState method
	 * @param event the key pressed by the user
	 */
	function handleKeyboard(event) {
		switch (event.key) {
			case 'Enter':
				changeEditableState();
				break;

			default:
				break;
		}
	}

</script>

<li class="flex justify-between items-center odd:bg-slate-800/10 even:bg-slate-800/50 pl-4">
	
	{#if isEditable}
		<input 
			type="text"
			bind:this={inputElement}
			bind:value={name}
			on:blur={changeEditableState}
			on:keypress={handleKeyboard}
			class="flex font-bold bg-transparent rounded focus:outline-none focus:ring-2 focus:ring-secondary-color  w-full"

		>
	
	{:else}

		<button 
			class=" flex-grow text-left truncate ..."
			on:click={changeEditableState}
		>
			{name}
		</button>

	{/if}


	<button
		class="text-xl text-white border-l border-white hover:bg-cancel-color transition-colors duration-300 px-2"
		on:click={dispatchDelete(id)}
	>X
	</button>
</li>
