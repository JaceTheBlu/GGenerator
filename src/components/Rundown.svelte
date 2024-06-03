<script>
	import WordComponent from './WordComponent.svelte';

	let rundown = ['@Kiddo', 'is doing', '@action'];

	const addWordComponent = () => {
		rundown = [...rundown, 'Click to edit'];
		const lastComponent = document.querySelector('#rundown > li:last-child');
		if (lastComponent) {
			lastComponent.enableEditing();
		}
	};
</script>

<div class="relative w-full h-full">
	<ul
		id="rundown"
		class="flex flex-wrap content-center justify-center w-full h-full text-2xl space-x-2 space-y-2 place-items-center"
	>
		<div />
		{#each rundown as text}
			<WordComponent {text} />
		{/each}
		<button
			class="px-2 transition ease-in-out duration-300 bg-transparent hover:scale-110 hover:cursor-pointer rounded-lg border-4 border-white border-dotted"
			on:click={addWordComponent}
		>
			+
		</button>
	</ul>
	<button class="rounded-xl bg-slate-800/50 p-4 absolute bottom-0 right-0 font-bold text-3xl">
		Generate!
	</button>
</div>
