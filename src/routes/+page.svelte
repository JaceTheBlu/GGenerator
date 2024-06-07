<script>
	import '../app.css';
	import GGFooter from '../components/GGFooter.svelte';
	import GGHeader from '../components/GGHeader.svelte';
	import PouchOfWords from '../components/PouchOfWords.svelte';
	import Rundown from '../components/Rundown.svelte';

	let rundown_list;
	let pouch_list;
	let result_div;

	const generateWords = () => {
		const words = rundown_list.map((word) => {
			const text = word.text;

			if (text.charAt(0) === '@' && text.length > 1) {
				const pouchName = text.substring(1);
				const pouch = pouch_list.find((pouch) => pouch.name === pouchName);

				if (pouch && pouch.elements.length > 0) {
					console.log(pouch);
					word = getPouchElement(pouch);
				} else {
					word = 'ERROR';
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

	let exampleJSON = {
		rundown: ['@name', 'is', '@something'],
		pouches: [
			{ name: '@name', elements: ['Patrick', 'Emilie', 'GG'] },
			{ name: '@something', elements: ['in Paris', 'skating', 'cute'] }
		]
	};

	const importJSON = () => {
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
	};
</script>

<div class="flex flex-col min-h-screen">
	<GGHeader />
	<div class="flex grow">
		<div class="bg-primary-color/50 p-2 rounded-primary br-5 m-4 mb-0 w-3/4">
			<Rundown bind:rundown_list on:generate={generateWords} />
		</div>
		<div class="bg-primary-color/50 p-2 rounded-primary mt-4 mr-4 w-1/4 overflow-auto">
			<PouchOfWords bind:pouch_list />
		</div>
	</div>
	<div class="w-auto flex bg-primary-color/50 h-16 m-4 rounded-primary items-center">
		<p class="pl-2 text-secondary mr-2">Output:</p>
		<p bind:this={result_div} class="text-secondary-color" />
	</div>
	<GGFooter />
</div>
