<script>
	import { onMount } from 'svelte';

	export let text = 'Click to edit';
	export let type = 'static';

	let isEditing = false;

	function enableEditing() {
		isEditing = true;
		// Wait for the next tick before focusing on the input element
		requestAnimationFrame(() => {
			const inputElement = document.getElementById('textInput');
			if (inputElement) {
				inputElement.focus();
			}
		});
	}

	function disableEditing() {
		isEditing = false;
	}

	function handleBlur() {
		disableEditing();
		if (text.charAt(0) === '@') {
			type = 'pouch';
		}
	}

	function handleKeyDown(event) {
		if (event.key === 'Tab' || event.key === 'Enter') {
			disableEditing();
		}
	}
</script>

{#if isEditing}
	<input
		id="textInput"
		type="text"
		bind:value={text}
		on:blur={handleBlur}
		on:keydown={handleKeyDown}
		class="bg-transparent rounded w-full pl-1"
	/>
{:else}
	<button
		class="px-2
            transition
            ease-in-out
            duration-300
            bg-slate-800/50
            hover:scale-110
            hover:cursor-pointer
            rounded-lg"
		on:click={enableEditing}
		on:keydown={(e) => {
			if (e.key === 'Enter') enableEditing();
		}}
	>
		{text}
	</button>
{/if}
