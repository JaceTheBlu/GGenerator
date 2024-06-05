<script>
	import WordComponent from './WordComponent.svelte';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	let rundown = [];
	let rootElement;

	$: dispatch('rundown_change', { rundown });

	const addWordComponent = () => {
		const component = new WordComponent({ target: rootElement });
		rundown = [...rundown, component];
		component.$on('destroy', () => removeWordComponent(component));
		component.enableEditing();
	};

	const removeWordComponent = (component) => {
		rundown = rundown.filter((c) => c !== component);
		component.$destroy();
	};

	const generate = () => {
		dispatch('generate');
	};
</script>

<div class="relative w-full h-full flex flex-col">
	<ul
		id="rundown"
		class="ml-1 flex flex-wrap flex-1 flex-col content-center justify-center w-full h-full text-2xl"
	>
		<div class="flex flex-wrap content-center place-items-center" bind:this={rootElement}>
			<div />
		</div>
		<button
			class="mx-auto my-2 h-fit w-fit px-2 transition ease-in-out duration-300 bg-transparent hover:scale-110 hover:cursor-pointer rounded-lg border-4 border-white border-dotted"
			on:click={addWordComponent}
			on:focus={addWordComponent}
		>
			+
		</button>
	</ul>
	<button
		class="rounded-xl bg-slate-800 p-2 font-bold text-3xl h-fit w-fit transition duration-300 ease-out hover:ring hover:shadow-pink-100 place-self-end"
		on:click={generate}
	>
		GGenerate!
	</button>
</div>
