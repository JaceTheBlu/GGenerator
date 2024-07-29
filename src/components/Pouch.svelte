<script>
	/**
	 * This page represents a pouch, it is possible to add/delete an element from this pouch
	 * @param name : the name that represents the pouch and the elements in it
	 * @param elements : a list that contains every elements a pouch contains, an element have an id and a name, used to keep on track the existing elements and the display
	 *
	 */

	/* Imports*/
	import { scale, slide } from 'svelte/transition';
	import { locales, pouches } from '../stores';
	import PouchElement from './PouchElement.svelte';

	/* Variables*/
	export let id = 0;
	export let name = '';
	export let elements = [];

	let isEditable = false;
	let isHidden = false;

	let inputElement = '';
	let new_element = '';
	

	/* Functions */

	/**
	 * This function handle the add of a elements in the pouch
	 * @param event : the element to add, with and id and a name property
	 */
	function addElements() {
		if (new_element.trim() !== '') {
			pouches.addElementToPouch(id,new_element);
			new_element = '';
		}
	}

	/**
	 *  This function redirect the user that submit through the enter key to the addElements method
	 * @param event the key pressed by the user
	 */
	function handleKeyboard(event, methodName) {
		if (event.key === 'Enter') {
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
	 * This method is used for the update of a pouch
	 * Double clicking on a pouch make it editable
	 * When focus is lost the new name is updated
	 */
	function changeEditableState() {
		isEditable = !isEditable;

		if (isEditable) {
			requestAnimationFrame(() => {
				if (inputElement) {
					inputElement.focus();
					inputElement.select();
				}
			});
		} else {
			pouches.updatePouch(id, name.toLowerCase());
		}
	}
</script>

<ul class="bg-slate-800/50 rounded-xl divide-y my-2" transition:scale={{ duration: 100 }}>
	<li class="flex justify-between text-xl h-full">
		<button
			class={`flex items-center px-2 hover:bg-blue-500 ${
				isHidden ? 'rounded-bl-xl' : 'rounded-none'
			} transition duration-300 hover:cursor-pointer rounded-tl-xl`}
			on:click={() =>{ isHidden = !isHidden}}
		>
			{isHidden ? '▷' : '▽'}
		</button>

		<div
			draggable="true"
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
				/>
			{:else}
				<button class="flex font-bold items-center" on:click={changeEditableState}>
				{name}
				</button>
			{/if}
		</div>

		<button
			class="flex justify-end items-center text-white h-full rounded-tr-xl hover:bg-cancel-color transition-colors duration-300 px-2"
			on:click={pouches.remove(id)}
		>
			X
		</button>
	</li>

	{#if elements.length !== 0 && !isHidden}
		<div class="divide-y divide-dashed">
			{#each elements as pouch}
				<PouchElement
					id={pouch.id}
					name={pouch.name}
				/>
			{/each}
		</div>
	{/if}

	{#if !isHidden}
		<div transition:slide>
			<li class="flex">
				<input
					bind:value={new_element}
					class="bg-transparent w-full h-full focus:outline-none focus:ring-2 focus:ring-secondary-color placeholder:italic rounded-bl-xl pl-4"
					type="text"
					placeholder={$locales.pouch_placeholder}
					on:keydown={(event) => handleKeyboard(event, 'addElements')}
					on:blur={addElements}
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
