<script>
	// Code for analytics
	import { inject } from '@vercel/analytics';
	inject();

	import { createEventDispatcher } from 'svelte';
	import '../app.css';
	import GGFooter from '../components/GGFooter.svelte';
	import GGHeader from '../components/GGHeader.svelte';
	import PouchOfWords from '../components/PouchOfWords.svelte';
	import Rundown from '../components/Rundown.svelte';

	const dispatch = createEventDispatcher();

	let rundown_list;
	let rundown_elem;
	let pouch_list;
	let pouch_elem;
	let result_div;

	const generateWords = () => {
		const words = rundown_list.map((word) => {
			const text = word.text;

			if (text.charAt(0) === '@' && text.length > 1) {
				const pouchName = text.substring(1);
				const pouch = pouch_list.find((pouch) => pouch.name === pouchName);

				if (pouch && pouch.elements.length > 0) {
					word = getPouchElement(pouch);
				} else {
					word = `<${pouchName}> is empty`;
				}
			} else {
				word = text;
			}

			return word;
		});
		result_div.innerText = words.join(' ');
	};

	const getPouchElement = (pouch) => {
		return pouch.elements[getRandomInt(0, pouch.elements.length - 1)].name;
	};

	const getRandomInt = (min, max) => {
		min = Math.ceil(min);
		max = Math.floor(max);
		return Math.ceil(Math.random() * (max - min + 1)) + min - 1;
	};

	const importJSON = () => {
		var input = document.createElement('input');
		input.type = 'file';

		input.onchange = (e) => {
			var file = e.target.files[0];

			var reader = new FileReader();
			reader.readAsText(file, 'UTF-8');

			reader.onload = (readerEvent) => {
				try {
					var content = JSON.parse(readerEvent.target.result);
					rundown_list = pouch_list = [];
					result_div.innerText = '';
					requestAnimationFrame(() => {
						content?.rundown.map((word) => {
							rundown_elem.addWordComponent({
								detail: { id: word.id, text: word.text, type: word.type }
							});
						});
						content?.pouch_list.map((pouch) => {
							pouch_elem.addPouch({
								type: 'import',
								detail: { name: pouch.name, elements: pouch.elements }
							});
						});
					});
				} catch (e) {
					console.error(e);
				}
			};
		};
		input.click();
	};

	const exportJSON = () => {
		const filename = 'data.json';
		const jsonStr = JSON.stringify({ rundown: rundown_list, pouch_list: pouch_list });

		let element = document.createElement('a');
		element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(jsonStr));
		element.setAttribute('download', filename);

		element.style.display = 'none';
		document.body.appendChild(element);

		element.click();

		document.body.removeChild(element);
	};

	const createPouchIfNE = (event) => {
		let pouchName = event.detail.text.substring(1);
		const pouch = pouch_list.find((pouch) => pouch.name === pouchName);
		if (!pouch) pouch_elem.addPouch(pouchName);
	};
</script>

<div class="flex flex-col min-h-screen">
	<GGHeader on:import={importJSON} on:export={exportJSON} />
	
	<div class="main flex flex-1">
		<div class="bg-primary-color/50 p-2 rounded-primary br-5 m-4 mb-0 w-3/4">
			<Rundown
				bind:this={rundown_elem}
				bind:rundown_list
				on:generate={generateWords}
				on:NewPouchWord={createPouchIfNE}
			/>
		</div>
		<div class="bg-primary-color/50 p-2 rounded-primary mt-4 mr-4 w-1/4 min-h-full">
			<PouchOfWords bind:this={pouch_elem} bind:pouch_list />
		</div>
	</div>

	<div class="w-auto flex bg-primary-color/50 h-16 m-4 rounded-primary items-center">
		<p class="pl-2 text-secondary mr-2">Output:</p>
		<p bind:this={result_div} class="text-secondary-color" />
	</div>
	<GGFooter />
</div>
