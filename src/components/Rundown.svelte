<script>
	import { onMount } from 'svelte';
	import './WordComponent.svelte';
	import WordComponent from './WordComponent.svelte';
	let input;
	let inputValue = '';
	let showCursor = false;

	const updateInputWidth = () => {
		if (input) {
			const tempSpan = document.createElement('span');
			tempSpan.style.visibility = 'hidden';
			tempSpan.style.whiteSpace = 'pre';
			tempSpan.style.fontSize = 'inherit';
			tempSpan.style.fontFamily = 'inherit';
			tempSpan.innerText = inputValue || ' ';
			document.body.appendChild(tempSpan);

			input.style.width = `${tempSpan.offsetWidth * 1.25 + 8}px`;
			document.body.removeChild(tempSpan);
		}
	};

	onMount(updateInputWidth);
</script>

<div class="relative w-full h-full">
	<ul
		class="flex flex-wrap content-center justify-center w-full h-full text-2xl space-x-2 space-y-2 place-items-center"
	>
		<div />
		<WordComponent text="@Kiddo" />
		<WordComponent text="is doing" />
		<WordComponent text="@action" />
		<WordComponent text="@action" />
		<WordComponent text="@action" />
		<WordComponent text="@action" />
		<WordComponent text="@action" />
		<WordComponent text="@action" />
		<WordComponent text="@action" />
		<WordComponent text="@action" />
		<WordComponent text="@action" />
		<WordComponent text="@action" />
		<WordComponent text="@action" />
		<WordComponent text="@action" />
		<WordComponent text="@action" />
		<WordComponent text="@action" />
		<WordComponent text="@action" />
		<WordComponent text="@action" />
		<WordComponent text="@action" />
		<WordComponent text="@action" />
		<WordComponent text="@action" />
		<WordComponent text="@action" />
		<WordComponent text="@action" />
		<WordComponent text="@action" />
		<WordComponent />
		<div
			class="px-2
        transition
        ease-in-out
        duration-300
		bg-transparent
		hover:scale-110
        hover:cursor-pointer
        rounded-lg
		border-4
		border-white
		border-dotted"
		>
			+
		</div>
	</ul>
	<button class="rounded-xl bg-slate-800/50 p-4 absolute bottom-0 right-0 font-bold text-3xl">
		GGenerate!
	</button>
</div>
