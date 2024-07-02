<script>
	// Code for analytics
	import { inject } from '@vercel/analytics';
	
	import '../app.css';
	import GGFooter from '../components/GGFooter.svelte';
	import GGHeader from '../components/GGHeader.svelte';
	import PouchOfWords from '../components/PouchOfWords.svelte';
	import Rundown from '../components/Rundown.svelte';

	import Berger from '$lib/berger.js';
	import 'shepherd.js/dist/css/shepherd.css';

	import { onMount } from 'svelte';
		
	inject();
	let rundown_list;
	let pouch_list;

	let rundown_elem;
	let pouch_elem;
	let result_div;
	let loaded = false;

	onMount(() => {
		const visited = localStorage.getItem('visited');

		if (!visited) {
			console.log('First Time !');
			localStorage.setItem('visited', true);
		}

		const saved_rundown_list = localStorage.getItem('rundown_list');
		if (saved_rundown_list) {
			rundown_list = JSON.parse(saved_rundown_list)?.rundown;
		}

		const saved_pouch_list = localStorage.getItem('pouch_list');
		if (saved_pouch_list) {
			pouch_list = JSON.parse(saved_pouch_list)?.pouch_list;
		}

		loaded = true;
	});

	$: if (loaded) saveAsCookie(rundown_list, pouch_list);

	export const saveAsCookie = (rl, pl) => {
		localStorage.setItem('rundown_list', JSON.stringify({ rundown: rl }));
		localStorage.setItem('pouch_list', JSON.stringify({ pouch_list: pl }));
	};

	let tour;
	let help_guide_script = [];

	onMount(async ()=>{
		try {
			const response = await fetch('/tutorials/help_guide.json');
			if(!response.ok){
				throw new Error('help_guide not loaded !');
			}
			help_guide_script = await response.json();
		} catch (error) {
			console.error('Error data was not fetched :',error);
		}
	})

	const generateWords = () => {
		const words = rundown_list.map((word) => {
			const text = word.text;

			if (text.charAt(0) === '@' && text.length > 1) {
				const pouchName = text.substring(1);
				const pouch = pouch_list.find((pouch) => pouch.name === pouchName);

				if (pouch && pouch.elements.length > 0) {
					word = getPouchElement(pouch);
				} else {
					word = `<${pouchName} EMPTY>`;
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

	function startTutorial(){
			tour = new Berger(help_guide_script);
	}
	
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
	<GGHeader on:import={importJSON} on:export={exportJSON} on:tutorial={startTutorial}/>
	
	<div class="main flex flex-1" id="help_guide-step-welcome">
		<div class="bg-primary-color/50 p-2 rounded-primary br-5 m-4 mb-0 w-3/4" id="help_guide-step-rundown">
			<Rundown
				bind:this={rundown_elem}
				bind:rundown_list
				on:generate={generateWords}
				on:NewPouchWord={createPouchIfNE}
			/>
		</div>

		<div id="help_guide-step-pouch-of-words" class="bg-primary-color/50 p-2 rounded-primary mt-4 mr-4 w-1/4 min-h-full overflow-auto">
			<PouchOfWords bind:this={pouch_elem} bind:pouch_list />
		</div>
	</div>

	<div id="help_guide-step-output" class="w-auto flex bg-primary-color/50 h-16 m-4 rounded-primary items-center">
		<p class="pl-2 text-secondary mr-2">Output:</p>
		<p bind:this={result_div} class="text-secondary-color"/>
	</div>
	<GGFooter />
</div>
