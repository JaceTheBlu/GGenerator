<script>
	import { onMount, createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	export let id;
	export let text = '';
	export let type = '';

	let isEditing = false;

	let inputElement;

	onMount(() => {
		enableEditing();
	});

	$: if (String(text).charAt(0) === '@' && text.length > 1) {
		type = 'pouch';
		text = text.toLocaleLowerCase();
	} else {
		type = 'static';
	}

	export function enableEditing() {
		isEditing = true;
		requestAnimationFrame(() => {
			if (inputElement) {
				inputElement.focus();
				inputElement.select();
			}
		});
	}

	const disableEditing = () => {
		isEditing = false;
		text = text.trim();
		dispatch('update', { id, text, type });
	};

	const handleBlur = () => {
		disableEditing();
	};

	const handleKeyDown = (event) => {
		switch (event.key) {
			case 'Enter':
				disableEditing();
				break;

			case 'Tab':
				disableEditing();
				break;

			default:
				break;
		}
	};
</script>

<div id="word-{id}">
	{#if isEditing}
		<input
			bind:this={inputElement}
			type="text"
			bind:value={text}
			on:blur={handleBlur}
			on:keydown={handleKeyDown}
			class="p-2 bg-transparent rounded-primary focus:outline-none focus:ring w-full pl-1 mr-2 mb-2
			{type === 'pouch' ? 'text-secondary-color underline' : ''}"
		/>
	{:else}
		<button
			class="p-2
	transition
	ease-in-out
	duration-300
	bg-primary-color/50
	hover:scale-110
	hover:cursor-pointer
	rounded-primary mr-2 mb-2
	{type === 'pouch' ? 'text-secondary-color underline' : ''}"
			on:mouseup={enableEditing}
		>
			{text}
		</button>
	{/if}
</div>
