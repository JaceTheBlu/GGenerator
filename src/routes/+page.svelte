<script>
	import '../app.css';
	import GGFooter from '../components/GGFooter.svelte';
	import GGHeader from '../components/GGHeader.svelte';
	import PouchOfWords from '../components/PouchOfWords.svelte';
	import Rundown from '../components/Rundown.svelte';

	let rundown;
	let pouchOfWords;

	const generateWords = () => {
		rundown_list = rundown.rundown;
		pouch_list = pouchOfWords.getList();

		console.log(pouch_list);
		const words = rundown_list.map((component) => {
			const text = component.getText();
			let exists = false;
			let type = 'static';
			let word = text;

			if (text.charAt(0) === '@' && text.length > 1) {
				const pouchName = text.substring(1);
				exists = pouch_list.includes(pouchName);
				if (exists) {
					const pouch = pouch_list.find((pouch) => pouch.name === pouchName);
					if (pouch && pouch.elements.length > 0) {
						console.log(pouch);
						word = getRandomElement(pouch.pouch_elements); // Get a random word from the pouch elements
						type = 'pouch'; // Update type to indicate it's from a pouch
					}
				}
			}

			return word;
		});
		console.log(words);
		// Additional processing can be done here based on `words` array
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
		<div class="bg-primary-color/50 p-2 rounded-primary br-5 m-4 w-3/4">
			<Rundown bind:this={rundown} on:generate={generateWords} />
		</div>
		<div class="bg-primary-color/50 p-2 rounded-primary mt-4 mb-4 mr-4 w-1/4 overflow-auto">
			<PouchOfWords bind:this={pouchOfWords} />
		</div>
	</div>
	<GGFooter />
</div>
