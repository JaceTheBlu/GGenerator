<script>
	import { onMount, createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	export let text = '';
	export let type = 'static';

	let isEditing = false;
	let inputElem;

	onMount(() => {
		checkType();
	});

	export function getText() {
		return text;
	}

	export function enableEditing() {
		isEditing = true;
		// Wait for the next tick before focusing on the input element
		requestAnimationFrame(() => {
			if (inputElem) {
				inputElem.focus();
				inputElem.select();
			}
		});
	}

	const checkType = () => {
		if (String(text).charAt(0) === '@' && text.length > 1) {
			type = 'pouch';
		} else {
			type = 'static';
		}
	};

	const disableEditing = () => {
		if (text.length <= 0) {
			dispatch('destroy');
		}
		checkType();
		isEditing = false;
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
			default:
				break;
		}
	};
</script>

<div class="">
	{#if isEditing}
		<input
			bind:this={inputElem}
			type="text"
			bind:value={text}
			on:blur={handleBlur}
			on:keydown={handleKeyDown}
			class="p-2 bg-transparent rounded focus:outline-none focus:ring w-full pl-1 mr-2 mb-2"
		/>
	{:else}
		<button
			class="p-2
			transition
            ease-in-out
            duration-300
            bg-slate-800/50
            hover:scale-110
            hover:cursor-pointer
            rounded-lg mr-2 mb-2
            {type === 'pouch' ? 'text-orange-400' : ''}
			{type === 'pouch' ? 'underline' : ''}"
			on:focus={enableEditing}
		>
			{text}
		</button>
	{/if}
</div>
