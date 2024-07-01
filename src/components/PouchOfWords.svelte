<script>
	/**
	 * A class that wraps the Pouch of Words functionnality
	 * It allows creating pouches and displays them
	 * @param pouch_list: a list of string that contains the name of every pouch created, used to track the existing pouch and display them
	 * @param max : a number that tells the maximum numbers of characters possible in the input
	 */

	/* Imports */
	import Pouch from './Pouch.svelte';


	/* Variables */
	export let pouch_list = [];
	let input_value = '';
	let max = 20;

	let pouch_id = 0;

	$: input_value = String(input_value).toLowerCase();


	function contain(pouch){
		let nameAlreadyExist = false;

		if(pouch.name.trim() !==''){
			for(let i=0; (i<pouch_list.length) && (!nameAlreadyExist); i++){
				if(pouch_list[i].name === pouch.name && pouch_list[i].id !== pouch.id){
					nameAlreadyExist = true;
				}
			}

		}

		return nameAlreadyExist;
	}

	/*Functions */

	/**
	 * This function handle the add of a new pouch
	 * It is not possible to create a pouch with an empty name or an name which already exist
	 */
	export const addPouch = (event) => {
		if(event?.type === 'click'){
		input_value = input_value.trim();	
			
			
		}else{
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
					id : pouch_id,
					name: input_value,
					elements: []
				};
				let i = 0;
				let nameAlreadyExist = contains(pouch);
				if (!nameAlreadyExist) {
					pouch_id++;
					pouch_list = [...pouch_list, pouch];
					
				}
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

	/**
	 * A function that verify if a pouch name is already present
	 * @param pouch : the pouch to verify its name
	 * @return found : true if the name is already in the list, false otherwise
	 */
	function contains(pouch){
		let found = false;

        for(let i =0; i<(pouch_list.length) && (!found); i++){
			if(pouch_list[i].name === pouch.name && pouch.id !== pouch_list[i].id ){
				found = true;
			}
		}

		return found;
	}

	/**
	 * This method is triggered when the event 'pouch_elements' is catched
	 * Its goal is to update the pouch_list with the last modification done in the childs components (Pouch and PouchElements)
	 * @param event : the pouch to update
	 */
	function refreshPouch(event) {
		const pouch = event.detail;

		console.log();
		if(pouch.name.trim() !== ''){
			let nameAlreadyExist = contains(pouch);

			if(!nameAlreadyExist){
				let found = false;
				for (let i = 0; i < pouch_list.length && !found; i++) {
					if (pouch_list[i].id === pouch.id) {
						pouch_list[i] = pouch;
						found = true;
					}
				}
			}else{
				console.error("A list with the name :",pouch.name," already exist ! \n Please enter a new one");


			}
		}
		pouch_list = [...pouch_list];
	}


	/**
	 * This function handle the deletion of a pouch, it catches the event created from "Pouch.svelte"
	 * @param e : the id of the pouch to delete
	 */
	function deletePouch(e) {
		const pouch = e.detail;
		let i = 0;
		let found = false;
		while (i < pouch_list.length && !found) {
			if (pouch_list[i].id === pouch.id) {
				pouch_list.splice(i, 1);
			}
			i++;
		}
		pouch_list = [...pouch_list];

	}
</script>

<div class="flex-col" id="onboarding-step-pouch">
	<div 
		class="flex"
		>
		<input
			id="onboarding-step-pouch"
		
			class=" bg-slate-800/50 flex-grow w-full focus:outline-none focus:ring md:w-3/4 rounded-md mr-2 pl-2"
			type="text"
			bind:value={input_value}
			on:keypress={handleKeyboard}
		/>

		<button
			class="bg-validate-color flex-shrink-0 w-full md:w-auto text-white rounded-md px-4 py-2"
			on:click={addPouch}
			>Add list
		</button>
	</div>
	<div id="onboarding-step-pouch-element">
		{#each pouch_list as pouch}
			<Pouch
				id={pouch.id}
				name={pouch.name}
				elements={pouch.elements}
				on:pouch_elements={refreshPouch}
				on:delete-pouch={deletePouch}
			/>
		{/each}
	</div>
</div>
