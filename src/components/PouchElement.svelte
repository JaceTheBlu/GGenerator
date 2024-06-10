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
	let inputName = "";

	const dispatch = createEventDispatcher();

	/* Functions */
	/**
	 * This function create an event with the goal of deleting an element from a pouch, it take the id of the element to delete
	 * @param elementId : the id of the element to delete
	 */
	function dispatchDelete(elementId) {
		dispatch('delete-pouch-element', elementId);
	}


	function enableEditing(){
		console.log("Double clicked, enable editing ...");
		isEditable = true;

	}

	function disableEditing(){
		console.log("Focus lost, disable editing ...");
		isEditable = false;
	}

	function updatePouchElementName(){
		console.log("Updating name ...");
		console.log("In Pouch Element : ",id,' ',name);

		dispatch('update-pouch-element',{id, name});

	}

</script>

<li class="flex justify-between items-center odd:bg-slate-800/10 even:bg-slate-800/50 pl-4">
	
	{#if isEditable}

		<input 
			type="text"
			contenteditable={isEditable}
			bind:this={inputName}
			bind:value={name}
			on:blur={disableEditing}
			on:change={updatePouchElementName}
			class="p-2 flex font-bold text-center bg-transparent rounded focus:outline-none focus:ring w-full pl-1 mr-2 mb-2"

		>
	
	{:else}
		<!-- svelte-ignore a11y-no-static-element-interactions -->
		<span 
			class=" flex-grow truncate ..."
			on:dblclick={enableEditing}
		>
			{name}
		</span>

	{/if}


	<button
		class="text-xl text-white border-l border-white hover:bg-red-500 transition-colors duration-300 px-2"
		on:click={dispatchDelete(id)}
	>X
	</button>
</li>
