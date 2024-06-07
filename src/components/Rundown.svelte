<script>
	import WordComponent from './WordComponent.svelte';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	export let rundown = [];
	export let rundownRootElement;

	$: newId = rundown.length ? Math.max(...rundown.map((t) => t.id)) + 1 : 1;
	$: console.log(rundown);

	const addWordComponent = () => {
		rundown = [...rundown, { id: newId, text: '' }];
	};

	const removeWordComponent = (event) => {
		rundown = rundown.filter((c) => c.id !== event.detail.id);
	};

	const updateWordComponent = (event) => {
		let word = event.detail;
		if (word.text.length > 0) {
			rundown = rundown.map((component) => {
				console.log('updating ' + word.id + 'with ' + word.text);

				if (component.id === word.id) {
					return { ...component, text: word.text };
				}
				return component;
			});
		} else {
			removeWordComponent(event);
		}
	};

	const generate = () => {
		dispatch('generate');
	};
</script>

<div class="relative w-full h-full flex flex-col">
	<ul
		class="ml-1 flex flex-wrap flex-1 flex-col content-center justify-center w-full h-full text-2xl"
	>
		<div
			class="flex flex-wrap w-full justify-center content-center place-items-center"
			bind:this={rundownRootElement}
		>
			<div />
			{#each rundown as component}
				<WordComponent id={component.id} on:update={updateWordComponent} />
			{/each}
		</div>
		<button
			class="mx-auto my-2 h-fit w-fit px-2 transition ease-in-out duration-300 bg-transparent hover:scale-110 hover:cursor-pointer rounded-lg border-4 border-white border-dotted"
			on:focus={addWordComponent}
		>
			+
		</button>
	</ul>
	<button
		class="rounded-xl flex bg-slate-800 p-2 font-bold text-3xl h-fit w-fit transition duration-300 ease-out hover:ring hover:shadow-pink-100 place-self-end"
		on:click={generate}
	>
		GGenerate
		<p class="italic">!</p>
	</button>
</div>
