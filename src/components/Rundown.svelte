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

	function handleDragStart(event, component) {
		dragged_component = component;
		event.dataTransfer.effectAllowed = 'move';
	}

	function handleDragOver(event) {
		event.preventDefault();
		event.dataTransfer.dropEffect = 'move';

		if (event.dataTransfer.getData('pouch') === '') {
			const element = event.currentTarget;
			element.classList.add('bg-secondary-color/50', 'rounded-primary');
		}
	}

	function handleDragOverGeneral(event) {
		event.preventDefault();
		event.dataTransfer.dropEffect = 'move';

		if (event.dataTransfer.getData('pouch') !== '') {
			const element = event.currentTarget;
			element.classList.add('bg-secondary-color/50', 'rounded-primary');
		}
	}

	function handleDragLeave(event) {
		const element = event.currentTarget;
		element.classList.remove('bg-secondary-color/50', 'rounded-primary');
	}

	function handleDrop(event, component) {
		event.preventDefault();

		const element = event.currentTarget;
		element.classList.remove('bg-secondary-color/50', 'rounded-primary');

		if (event.dataTransfer.getData('pouch') === '') {
			const draggedIndex = rundown_list.indexOf(dragged_component);
			const droppedIndex = rundown_list.indexOf(component);

			rundown_list.splice(draggedIndex, 1);
			rundown_list.splice(droppedIndex, 0, dragged_component);

			rundown_list = [...rundown_list];

			dragged_component = null;
		}
	}

	function handleDropGeneral(event) {
		event.preventDefault();
		event.dataTransfer.dropEffect = 'move';

		const element = event.currentTarget;
		element.classList.remove('bg-secondary-color/50', 'rounded-primary');

		if (event.dataTransfer.getData('pouch') !== '') {
			const pouch_name = event.dataTransfer.getData('pouch');

			const new_item = {
				id: newId,
				text: '@' + pouch_name,
				type: 'pouch'
			};

			rundown_list.push(new_item);
			rundown_list = [...rundown_list];
		}
	}
</script>

<div
	class="relative w-full h-full flex flex-col"
	on:dragleave={(event) => handleDragLeave(event)}
	on:dragover={(event) => handleDragOverGeneral(event)}
	on:drop={(event) => handleDropGeneral(event)}
	aria-label="drag n drop pouch"
	role="region"
>
	<div class="flex children:px-2 mb-2 justify-between not-selectable">
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
			{#if rundown_list.length > 0}
				{#each rundown_list as component}
					<div
						draggable="true"
						on:dragstart={(event) => handleDragStart(event, component)}
						on:dragleave={(event) => handleDragLeave(event)}
						on:dragover={(event) => handleDragOver(event)}
						on:drop={(event) => handleDrop(event, component)}
						aria-label="drag n drop rundown"
						role="region"
					>
						<WordComponent
							id={component.id}
							text={component.text}
							on:update={updateWordComponent}
						/>
					</div>
				{/each}
			{:else}
				<div class="flex flex-col justify-center align-middle items-center">
					<p class="text-secondary text-primary-color/50 text-center not-selectable">
						Start by adding a new word! <br /> Click the + button to get started.
					</p>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						version="1.1"
						xmlns:xlink="http://www.w3.org/1999/xlink"
						xmlns:svgjs="http://svgjs.dev/svgjs"
						class="w-[10%]"
						viewBox="0 0 200 375"
						><g
							stroke-width="15"
							stroke="hsl(0, 0%, 100%)"
							stroke-opacity="0.5"
							fill="none"
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-dasharray="13.5 29"
							transform="matrix(0.8090169943749475,0.5877852522924731,-0.5877852522924731,0.8090169943749475,24.507303167010264,-386.7208986669682)"
							><path
								d="M298.5 298.5Q397.5 634.5 400 400Q432.5 307.5 501.5 501.5 "
								marker-end="url(#SvgjsMarker1691)"
							/></g
						><defs
							><marker
								markerWidth="5"
								markerHeight="5"
								refX="2.5"
								refY="2.5"
								viewBox="0 0 5 5"
								orient="auto"
								id="SvgjsMarker1691"
								><polygon
									points="0,5 1.6666666666666667,2.5 0,0 5,2.5"
									fill="hsl(0, 0%, 100%)"
									fill-opacity="0.5"
								/></marker
							></defs
						></svg
					>
				</div>
			{/if}
		</div>
		<button
			id="help_guide-step-rundown-button"
			class="mx-auto my-2 h-fit w-fit px-2 transition ease-in-out duration-300 bg-transparent hover:scale-110 hover:cursor-pointer rounded-lg border-4 border-white border-dotted"
			on:focus={addWordComponent}
		>
			+
		</button>
	</ul>

	<div class="flex justify-end align-text-bottom">
		{#if rundown_list.length <= 0}
			<p class="flex items-center text-secondary text-primary-color/50 text-end not-selectable">
				Then click here to generate for the first time!
			</p>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				version="1.1"
				xmlns:xlink="http://www.w3.org/1999/xlink"
				xmlns:svgjs="http://svgjs.dev/svgjs"
				class="w-1/5 self-end"
				viewBox="0 0 800 175"
				><g
					stroke-width="15"
					stroke="hsl(0, 0%, 100%)"
					stroke-opacity="0.5"
					fill="none"
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-dasharray="13.5 29"
					transform="matrix(0.7313537016191707,-0.6819983600624983,0.6819983600624983,0.7313537016191707,-175.34082467266762,68.25786337733103)"
					><path d="M144.5 144.5Q380.5 237.5 655.5 655.5 " marker-end="url(#SvgjsMarker3384)" /></g
				><defs
					><marker
						markerWidth="5"
						markerHeight="5"
						refX="2.5"
						refY="2.5"
						viewBox="0 0 5 5"
						orient="auto"
						id="SvgjsMarker3384"
						><polygon
							points="0,5 1.6666666666666667,2.5 0,0 5,2.5"
							fill="hsl(0, 0%, 100%)"
							fill-opacity="0.5"
						/></marker
					></defs
				></svg
			>
		{/if}
		<button
			id="help_guide-step-ggenerate"
			class="not-selectable rounded-xl flex bg-slate-800 p-2 font-bold text-3xl h-fit w-fit transition duration-300 ease-out hover:ring hover:shadow-pink-100 place-self-end"
			on:click={generate}
		>
			GGenerate
			<p class="italic">!</p>
		</button>
	</div>
</div>
