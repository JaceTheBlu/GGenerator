<script>
	import { onMount } from 'svelte';
	// Code for analytics
	import { inject } from '@vercel/analytics';
	inject();

	import '../app.css';

	import GGFooter from '../components/GGFooter.svelte';
	import GGHeader from '../components/GGHeader.svelte';
	import PouchOfWords from '../components/PouchOfWords.svelte';
	import Rundown from '../components/Rundown.svelte';

	import Berger from '$lib/berger.js';

	let rundown_list;
	let pouch_list;

	let rundown_elem;
	let pouch_elem;
	let resultinput;

	let loaded = false;

	let tour;
	let data = {};

	let tutorials_name = ['help_guide', 'onboarding', 'changelog'];
	let examples_save = ['animals', 'hello_i_am'];

	onMount(() => {
		data['visited'] = localStorage.getItem('visited');

		if (!data.visited) {
			localStorage.setItem('visited', true);
		}

		initTutorials(tutorials_name);

		const saved_rundown_list = localStorage.getItem('rundown_list');
		if (saved_rundown_list) {
			rundown_list = JSON.parse(saved_rundown_list)?.rundown;
		}

		const saved_pouch_list = localStorage.getItem('pouch_list');
		if (saved_pouch_list) {
			pouch_list = JSON.parse(saved_pouch_list)?.pouch_list;
		}

		const saved_history = localStorage.getItem('history');
		if (saved_history) {
			pouch_list = JSON.parse(saved_pouch_list)?.pouch_list;
		} else {
			data['history'] = {
				_length: 0
			};
		}

		loaded = true;
	});

	$: if (loaded) saveAsCookie(rundown_list, pouch_list);

	const initTutorials = async (tutos_name) => {
		await fillFromFile('tutorials', tutos_name);
		if (!data.visited) {
			tour = new Berger(data.tutorials.onboarding);
			const randomExample = examples_save[Math.floor(Math.random() * examples_save.length)];
			await fillFromFile('examples', [randomExample]);
			loadSave(data.examples[randomExample]);
		}
	};

	const fillFromFile = async (data_name, files) => {
		data[data_name] = {
			_length: 0
		};
		const dataArray = await Promise.all(
			files.map(async (file_name) => {
				const content = await readFile(`/${data_name}/${file_name}.json`);
				data[data_name][file_name] = content;
				data[data_name]['_length'] += 1;
			})
		);
	};

	const readFile = async (path) => {
		try {
			const response = await fetch(path);
			if (!response.ok) {
				throw new Error('Network response was not ok');
			}
			const jsonData = await response.json();
			return jsonData;
		} catch (error) {
			console.error('There was a problem with the fetch operation:', error);
			return null;
		}
	};

	export const saveAsCookie = (rl, pl) => {
		localStorage.setItem('rundown_list', JSON.stringify({ rundown: rl }));
		localStorage.setItem('pouch_list', JSON.stringify({ pouch_list: pl }));
	};

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
		let result = words.join(' ');
		if (result === '') {
			switch (data.history._length + 1) {
				case 1:
					result = "Before Clicking the 'GGenerate' Button have you tried adding words?";
					break;
				case 2:
					result = 'The Rundown is still empty, make some effort!';
					break;
				case 5:
					result = "Are you trying to find something here? Good Luck, I'm not funny...";
					break;
				case 10:
					result = 'This is not a clicker game, try something else like Cookie Clicker!';
					break;
				case 15:
					result = 'I understand that this is supposed to be a fun app, but not in this manner!';
					break;
				case 42:
					result = "Good job you made it! Though I still don't have the answer to life...";
					break;
				case 69:
					result = 'NICE! *kof kof* I mean Nasty you, all of this for the unholy number...';
					break;
				case 100:
					result =
						"Congrats you made NOTHING, but that was not the point isn't ? add me on @discord : #jacetheblu";
					break;

				default:
					result = 'The Rundown is empty, try adding a word or two!';
					break;
			}
		}
		data.history[data.history._length] = result;
		data.history._length += 1;
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
					loadSave(content);
				} catch (e) {
					console.error(e);
				}
			};
		};
		input.click();
	};

	const loadSave = (obj) => {
		rundown_list = pouch_list = [];

		requestAnimationFrame(() => {
			obj?.rundown.map((word) => {
				rundown_elem.addWordComponent({
					detail: { id: word.id, text: word.text, type: word.type }
				});
			});
			obj?.pouch_list.map((pouch) => {
				pouch_elem.addPouch({
					type: 'import',
					detail: { name: pouch.name, elements: pouch.elements }
				});
			});
		});
	};

	const startTutorial = () => {
		tour = new Berger(data.tutorials.help_guide);
	};

	const showChangeLog = () => {
		tour = new Berger(data.tutorials.changelog);
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

	const handleShowHistory = () => {
		console.log(data.history);
	};

	const handleCopyOutput = () => {
		resultinput.select();
	};

	const handleDeleteHistory = () => {
		data.history = {
			_length: 0
		};
	};
</script>

<div class="flex flex-col min-h-screen">
	<GGHeader
		on:import={importJSON}
		on:export={exportJSON}
		on:tutorial={startTutorial}
		on:changelog={showChangeLog}
	/>

	<div class="main flex flex-1" id="help_guide-step-welcome">
		<div
			class="bg-primary-color/50 p-2 rounded-primary br-5 m-4 mb-0 w-3/4"
			id="help_guide-step-rundown"
		>
			<Rundown
				bind:this={rundown_elem}
				bind:rundown_list
				on:generate={generateWords}
				on:NewPouchWord={createPouchIfNE}
			/>
		</div>

		<div
			id="help_guide-step-pouch-of-words"
			class="bg-primary-color/50 p-2 rounded-primary mt-4 mr-4 w-1/4 min-h-full overflow-auto"
		>
			<PouchOfWords bind:this={pouch_elem} bind:pouch_list />
		</div>
	</div>

	<div
		id="help_guide-step-output"
		class="w-auto flex bg-primary-color/50 h-16 m-4 rounded-primary items-center"
	>
		<div class="flex-1 flex items-center h-full">
			<button
				class="mr-4 text-secondary px-4 py-2 not-selectable border-r"
				on:click={handleShowHistory}
			>
				{#if data && data.history && data.history._length}
					{data.history._length}
				{:else}
					0
				{/if}
			</button>
			<p class="place-content-center h-full w-full">
				{#if data && data.history && data.history._length}
					<input
						bind:this={resultinput}
						readonly
						class="text-secondary-color h-full w-full bg-transparent focus:outline-none overflow-scroll"
						value={data.history[data.history._length - 1]}
						on:focus={(e) => e.target.select()}
					/>
				{:else}
					<p class="place-content-center text-tertiary-color italic overflow-auto h-full w-full">
						Waiting for GGeneration!
					</p>
				{/if}
			</p>
		</div>
		<div
			class="flex
				items-end
				space-x-2
				mx-2
				children:border-primary-width
				children:rounded-secondary
				children:p-2
				"
		>
			<button class="hover:scale-110" on:click={handleCopyOutput}> 📋 </button>
			<button class="hover:scale-110" on:click={handleShowHistory}> 🗃️ </button>
			<button class="hover:scale-110" on:click={handleDeleteHistory}> 🗑️ </button>
		</div>
	</div>
	<GGFooter />
</div>
