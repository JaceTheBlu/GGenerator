<script>
	import { createEventDispatcher } from 'svelte';
	import WordComponent from './WordComponent.svelte';

	const dispatch = createEventDispatcher();

	export let rundown_list = [];
	let rundownRootElement;

	let dragged_component = null;

	$: newId = rundown_list.length ? Math.max(...rundown_list.map((t) => t.id)) + 1 : 1;

	export const addWordComponent = (event) => {
		rundown_list = [
			...rundown_list,
			{
				id: event?.detail.id || newId,
				text: event?.detail.text || '',
				type: event?.detail.type || 'static'
			}
		];
	};

	const removeWordComponent = (event) => {
		rundown_list = rundown_list.filter((c) => c.id !== event.detail.id);
	};

	const updateWordComponent = (event) => {
		let word = event.detail;
		if (word.text.length > 0) {
			rundown_list = rundown_list.map((component) => {
				if (component.id === word.id) {
					return { ...component, text: word.text };
				}
				return component;
			});
			if (word.type === 'pouch') {
				dispatch('NewPouchWord', word);
			}
		} else {
			removeWordComponent(event);
		}
	};

	const generate = () => {
		dispatch('generate');
	};

	const clearRundown = () => {
		rundown_list = [];
	};


	function handleDragStart(event, component){
		dragged_component = component;
		event.dataTransfer.effectAllowed = 'move';
	}

	function handleDragOver(event, component){
		event.preventDefault();
		event.dataTransfer.dropEffect = 'move';

		//New features
		const element = event.currentTarget;
		element.classList.add('bg-secondary-color', 'rounded-primary');
	}

	function handleDragLeave(event, component){
		const element = event.currentTarget;
		element.classList.remove('bg-secondary-color','rounded-primary');
	}

	function handleDrop(event, component){
		event.preventDefault();

		const element = event.currentTarget;
		element.classList.remove('bg-secondary-color','rounded-primary');

		const draggedIndex = rundown_list.indexOf(dragged_component);
		const droppedIndex =  rundown_list.indexOf(component);

		rundown_list.splice(draggedIndex, 1);
		rundown_list.splice(droppedIndex, 0, dragged_component);

		rundown_list = [...rundown_list];

		dragged_component = null;

	}

	



</script>

<div class="relative w-full h-full flex flex-col">
	<div class="flex children:px-2 mb-2 justify-between">
		<span class="text-secondary font-bold text-primary-color">Rundown</span>
		<button
			class="hover:text-cancel-color transition-colors text-tertiary text-primary-color"
			on:click={clearRundown}
		>
			clear
		</button>
	</div>

	<ul
		class="ml-1 flex flex-wrap flex-1 flex-col content-center justify-center w-full h-full text-2xl"
	>
		<div
			class="flex flex-wrap w-full justify-center content-center place-items-center"
			bind:this={rundownRootElement}
		>
			{#each rundown_list as component}
				<div
					draggable="true"
					on:dragstart={(event) => handleDragStart(event, component)}
					on:dragleave={(event) => handleDragLeave(event,component)}
					on:dragover={(event) =>handleDragOver(event, component)}
					on:drop={(event) => handleDrop(event, component)}
					aria-label="drag n drop rundown"
					role="region"
				>
					<WordComponent id={component.id} text={component.text} on:update={updateWordComponent} />

				</div>
			{/each}
		</div>
		<button
			id="help_guide-step-rundown-button"
			class="mx-auto my-2 h-fit w-fit px-2 transition ease-in-out duration-300 bg-transparent hover:scale-110 hover:cursor-pointer rounded-lg border-4 border-white border-dotted"
			on:focus={addWordComponent}
		>
			+
		</button>
	</ul>
	<button
		id="help_guide-step-ggenerate"
		class="rounded-lg flex bg-slate-800 p-2 font-bold text-3xl h-fit w-fit transition duration-300 ease-out hover:ring hover:shadow-pink-100 place-self-end"
		on:click={generate}
	>
		GGenerate
		<p class="italic">!</p>
	</button>
</div>
