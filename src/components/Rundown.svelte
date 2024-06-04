<script>
	import WordComponent from './WordComponent.svelte';

	let rundown = [];
	let rootElement;

	let exampleJSON = {
		rundown: ['@name', 'is', '@something'],
		pouches: [
			{ name: '@name', elements: ['Patrick', 'Emilie', 'GG'] },
			{ name: '@something', elements: ['dancing', 'skating', 'sleeping'] }
		]
	};

	function importJSON() {
		console.log('received');
		var input = document.createElement('input');
		input.type = 'file';

		input.onchange = (e) => {
			// getting a hold of the file reference
			var file = e.target.files[0];

			// setting up the reader
			var reader = new FileReader();
			reader.readAsText(file, 'UTF-8');

			// here we tell the reader what to do when it's done reading...
			reader.onload = (readerEvent) => {
				var content = readerEvent.target.result; // this is the content!
				console.log(content);
			};
		};

		input.click();
	}

	const addWordComponent = () => {
		const component = new WordComponent({ target: rootElement });
		rundown = [...rundown, component];
		component.enableEditing();
	};
</script>

<div
	class="relative
	w-full
	h-full
	flex
	flex-col"
	on:openFile={importJSON}
>
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
		>
			+
		</button>
	</ul>
	<button
		class="rounded-xl bg-slate-800 p-2 font-bold text-3xl h-fit
		w-fit
		transition duration-300 ease-out
		hover:ring
		hover:shadow-pink-100
		hover:shadow-

		place-self-end
"
	>
		GGenerate!
	</button>
</div>
