<script>
	// Code for analytics
	import { inject } from '@vercel/analytics';
	inject();

	import { onMount } from 'svelte';
	import { blur, scale } from 'svelte/transition';

	import '../app.css';

	import GGFooter from '../components/GGFooter.svelte';
	import GGHeader from '../components/GGHeader.svelte';
	import PouchOfWords from '../components/PouchOfWords.svelte';
	import Rundown from '../components/Rundown.svelte';

	import Berger from '$lib/berger';

	import {
		examples,
		history,
		locales,
		loaded,
		pouches,
		preferredLanguage,
		rundown,
		tutorials,
		visited
	} from '../stores';

	import { loadLanguage } from '$lib/localization';

	let resultinput;

	let tour;

	preferredLanguage.subscribe((lang) => {
		if (lang != null) loadLanguage(lang);
	});

	onMount(async () => {
		await Promise.all([initTutorials(), initExamples()]).then(() => {
			visited.set(localStorage.getItem('visited'));

			if (!$visited) {
				localStorage.setItem('visited', true);
				tour = new Berger($tutorials[$preferredLanguage]['onboarding']);
				loadRandom();
			}

			const saved_rundown = localStorage.getItem('rundown');
			if (saved_rundown) {
				const parsed_rundown = JSON.parse(saved_rundown);
				parsed_rundown.forEach((word) => {
					rundown.copy(word);
				});
			}

			const saved_pouches = localStorage.getItem('pouches');
			if (saved_pouches) {
				const parsed_pouches = JSON.parse(saved_pouches);

				parsed_pouches.forEach((pouch) => {
					pouches.copy(pouch);
				});
			}

			const saved_history = localStorage.getItem('history');
			if (saved_history) {
				const parsed_history = JSON.parse(saved_history);

				parsed_history.forEach((output) => {
					history.copy(output);
				});
			}

			loaded.set(true);
			preferredLanguage.set(localStorage.getItem('preferredLanguage'));
		});
	});

	rundown.subscribe((current) => {
		if ($loaded) {
			localStorage.setItem('rundown', JSON.stringify(current));
		}
	});

	history.subscribe((current) => {
		if ($loaded) {
			localStorage.setItem('history', JSON.stringify(current));
		}
	});

	pouches.subscribe((current) => {
		if ($loaded) {
			localStorage.setItem('pouches', JSON.stringify(current));
		}
	});

	const initTutorials = async () => {
		const response = await fetch(`/tutos`);
		if (!response.ok) {
			throw new Error('Failed to fetch tutorial list');
		}
		const list = await response.json();
		tutorials.set(list);
	};

	const initExamples = async () => {
		const response = await fetch(`/exams`);
		if (!response.ok) {
			throw new Error('Failed to fetch examples list');
		}
		const list = await response.json();
		examples.set(list);
	};

	const generateWords = () => {
		const words = $rundown.map((word) => {
			const text = word.text;

			if (text.charAt(0) === '@' && text.length > 1) {
				const pouchName = text.substring(1);
				const pouch = $pouches.find((pouch) => pouch.name === pouchName);

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

		let sentence = words.join(' ');
		// Remove any spaces before punctuation
		sentence = sentence.replace(/ \./g, '.');
		sentence = sentence.replace(/ ,/g, ',');

		// Handle special cases: ensure no space before punctuation or excessive spaces
		sentence = sentence.replace(/\s+([.,!?])/g, '$1');

		if (sentence === '') {
			switch ($history.length + 1) {
				case 1:
					sentence = "Before Clicking the 'GGenerate' Button have you tried adding words?";
					break;
				case 2:
					sentence = 'The Rundown is still empty, make some effort!';
					break;
				case 5:
					sentence = "Are you trying to find something here? Good Luck, I'm not funny...";
					break;
				case 10:
					sentence = 'This is not a clicker game, try something else like Cookie Clicker!';
					break;
				case 15:
					sentence = 'I understand that this is supposed to be a fun app, but not in this manner!';
					break;
				case 42:
					sentence = "Good job you made it! Though I still don't have the answer to life...";
					break;
				case 69:
					sentence = 'NICE! *kof kof* I mean Nasty you, all of this for the unholy number...';
					break;
				case 100:
					sentence =
						"Congrats you made NOTHING, but that was not the point isn't ? add me on @discord : #jacetheblu";
					break;

				default:
					sentence = 'The Rundown is empty, try adding a word or two!';
					break;
			}
		}
		history.add(sentence);
	};

	const getPouchElement = (pouch) => {
		let randInt = Math.ceil(Math.random() * (pouch.elements.length - 1 + 1)) - 1;
		return pouch.elements[randInt].name;
	};

	const importJSON = () => {
		const input = document.createElement('input');
		input.type = 'file';

		input.onchange = (e) => {
			const file = e.target.files[0];

			const reader = new FileReader();
			reader.readAsText(file, 'UTF-8');

			reader.onload = (readerEvent) => {
				try {
					const content = JSON.parse(readerEvent.target.result);
					loadSave(content);
				} catch (e) {
					console.error('Error parsing JSON:', e);
				}
			};
		};
		input.click();
	};

	const loadSave = (obj) => {
		// Reset the stores
		rundown.clear();
		pouches.clear();

		requestAnimationFrame(() => {
			// Load rundown
			if (obj?.rundown) {
				obj.rundown.forEach((word) => {
					rundown.add(word.text);
				});
			}

			// Load pouches
			if (obj?.pouch_list) {
				obj.pouch_list.forEach((pouch) => {
					pouches.add(pouch.name, pouch.elements);
				});
			}
		});
	};

	const startTutorial = () => {
		tour = new Berger($tutorials[$preferredLanguage]['help_guide']);
	};

	const showChangeLog = () => {
		tour = new Berger($tutorials[$preferredLanguage]['changelog']);
	};

	const exportJSON = () => {
		const filename = 'data.json';
		const jsonStr = JSON.stringify({ rundown: $rundown, pouch_list: $pouches });

		let element = document.createElement('a');
		element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(jsonStr));
		element.setAttribute('download', filename);

		element.style.display = 'none';
		document.body.appendChild(element);

		element.click();

		document.body.removeChild(element);
	};

	const loadRandom = () => {
		// Get the list of categories from the preferred language examples
		const examplesList = Object.keys($examples[$preferredLanguage]);

		// Get the list of examples for the selected category
		const randomExample =
			$examples[$preferredLanguage][examplesList[Math.floor(Math.random() * examplesList.length)]];

		// Load the selected random example
		loadSave(randomExample);
	};

	const handleShowHistory = () => {
		console.log($history);
	};

	const handleCopyOutput = async () => {
		resultinput.select();
		const type = 'text/plain';
		const blob = new Blob([resultinput.value], { type });
		const data = [new ClipboardItem({ [type]: blob })];
		await navigator.clipboard.write(data);
	};

	const handleDeleteHistory = () => {
		history.clear();
	};
</script>

{#if !$loaded}
	<div
		transition:blur={{ duration: 1000 }}
		class="absolute z-[99999] h-screen w-screen text-3xl font-bold flex items-center justify-center
		bg-gradient-to-r
		from-background-primary-color
		to-background-secondary-color"
	>
		<div class="flex items-center justify-center" transition:scale>
			<svg class="animate-spin h-96 w-h-96 mr-3 ..." viewBox="0 0 800 800">
				<path
					d="M0 0 C0.95122742 0.00182281 1.90245483 0.00364563 2.88250732 0.00552368 C82.00058068 0.2590596 160.0103008 27.98521112 220.5 79.3125 C221.4796875 80.10785156 222.459375 80.90320313 223.46875 81.72265625 C231.51401586 88.3281657 238.93997993 95.53818864 246.3125 102.875 C247.04430481 103.59904022 247.04430481 103.59904022 247.79089355 104.33770752 C254.49130494 110.98200487 260.63000762 117.9230094 266.5 125.3125 C267.50046016 126.52109011 268.50389648 127.72722966 269.51171875 128.9296875 C282.14262846 144.21341176 292.86508449 161.00365301 302.5 178.3125 C302.9120166 179.05145508 303.3240332 179.79041016 303.74853516 180.55175781 C321.5 212.67215713 321.5 212.67215713 321.5 219.3125 C303.1586471 219.61666057 284.81795165 219.84565456 266.47461891 219.98605824 C257.95666654 220.05299434 249.44028415 220.14418403 240.92333984 220.29321289 C233.49673716 220.42310069 226.07127156 220.50672774 218.64356458 220.53565043 C214.71265086 220.55255081 210.7849888 220.59202774 206.85512161 220.68699074 C180.99111059 221.2880539 180.99111059 221.2880539 175.48284912 216.53622437 C172.79024487 213.46339763 171.22002972 210.00634007 169.5 206.3125 C167.88468048 204.23062452 166.14271469 202.40781976 164.3125 200.5 C161.47069166 197.44605045 158.68708188 194.37801642 156 191.1875 C121.43395319 151.76309178 65.53123529 130.17719504 14.3125 126.6875 C-42.62397072 123.17065729 -99.48912322 141.99343601 -142.43359375 179.5859375 C-143.456775 180.49361412 -144.47890101 181.40248156 -145.5 182.3125 C-146.02996582 182.78075195 -146.55993164 183.24900391 -147.10595703 183.73144531 C-153.32982405 189.2466449 -159.23890063 194.85322065 -164.5 201.3125 C-165.3891959 202.36599263 -166.2785316 203.41936728 -167.16796875 204.47265625 C-204.31875649 249.06339901 -221.43930185 306.91162741 -216.54931641 364.5390625 C-212.10681897 411.69678081 -192.93689952 455.03828499 -161.5 490.3125 C-161.03174805 490.84246582 -160.56349609 491.37243164 -160.08105469 491.91845703 C-154.5658551 498.14232405 -148.95927935 504.05140063 -142.5 509.3125 C-141.44650737 510.2016959 -140.39313272 511.0910316 -139.33984375 511.98046875 C-94.74910099 549.13125649 -36.90087259 566.25180185 20.7265625 561.36181641 C67.88428081 556.91931897 111.22578499 537.74939952 146.5 506.3125 C147.29494873 505.61012207 147.29494873 505.61012207 148.10595703 504.89355469 C154.32668381 499.38113778 160.25880704 493.78441843 165.5 487.3125 C165.9753418 486.72823242 166.45068359 486.14396484 166.94042969 485.54199219 C169.64838842 482.20823779 172.34498875 478.86532881 175.0234375 475.5078125 C175.47638184 474.94078613 175.92932617 474.37375977 176.39599609 473.78955078 C177.58567001 472.28888498 177.58567001 472.28888498 178.5 470.3125 C111.51 469.9825 44.52 469.6525 -24.5 469.3125 C-24.5 428.0625 -24.5 386.8125 -24.5 344.3125 C97.27 344.3125 219.04 344.3125 344.5 344.3125 C344.5 370.04861111 344.5 370.04861111 343.3125 380.5625 C343.18012939 381.77502441 343.04775879 382.98754883 342.91137695 384.23681641 C335.27814076 450.16294732 308.48817435 513.65052677 265.5 564.3125 C264.70464844 565.2921875 263.90929687 566.271875 263.08984375 567.28125 C256.4843343 575.32651586 249.27431136 582.75247993 241.9375 590.125 C241.45480652 590.61286987 240.97211304 591.10073975 240.47479248 591.60339355 C233.83049513 598.30380494 226.8894906 604.44250762 219.5 610.3125 C218.29140989 611.31296016 217.08527034 612.31639648 215.8828125 613.32421875 C200.59389348 625.95942156 183.80103082 636.65378928 166.5 646.3125 C165.78763184 646.71388184 165.07526367 647.11526367 164.34130859 647.52880859 C130.7469989 666.31632398 93.66782647 678.33973943 55.75 684.5625 C54.83001221 684.71372314 53.91002441 684.86494629 52.9621582 685.02075195 C35.69235932 687.66718388 18.45555304 688.69522548 1 688.625 C0.04877258 688.62317719 -0.90245483 688.62135437 -1.88250732 688.61947632 C-81.00058068 688.3659404 -159.0103008 660.63978888 -219.5 609.3125 C-220.4796875 608.51714844 -221.459375 607.72179687 -222.46875 606.90234375 C-230.51401586 600.2968343 -237.93997993 593.08681136 -245.3125 585.75 C-245.80036987 585.26730652 -246.28823975 584.78461304 -246.79089355 584.28729248 C-253.49130494 577.64299513 -259.63000762 570.7019906 -265.5 563.3125 C-266.50046016 562.10390989 -267.50389648 560.89777034 -268.51171875 559.6953125 C-281.14692156 544.40639348 -291.84128928 527.61353082 -301.5 510.3125 C-301.90138184 509.60013184 -302.30276367 508.88776367 -302.71630859 508.15380859 C-321.50382398 474.5594989 -333.52723943 437.48032647 -339.75 399.5625 C-339.97683472 398.18251831 -339.97683472 398.18251831 -340.20825195 396.7746582 C-342.85468388 379.50485932 -343.88272548 362.26805304 -343.8125 344.8125 C-343.81067719 343.86127258 -343.80885437 342.91004517 -343.80697632 341.92999268 C-343.5534404 262.81191932 -315.82728888 184.8021992 -264.5 124.3125 C-263.30697266 122.84296875 -263.30697266 122.84296875 -262.08984375 121.34375 C-255.4843343 113.29848414 -248.27431136 105.87252007 -240.9375 98.5 C-240.45480652 98.01213013 -239.97211304 97.52426025 -239.47479248 97.02160645 C-232.83049513 90.32119506 -225.8894906 84.18249238 -218.5 78.3125 C-217.29140989 77.31203984 -216.08527034 76.30860352 -214.8828125 75.30078125 C-199.59389348 62.66557844 -182.80103082 51.97121072 -165.5 42.3125 C-164.78763184 41.91111816 -164.07526367 41.50973633 -163.34130859 41.09619141 C-129.7469989 22.30867602 -92.66782647 10.28526057 -54.75 4.0625 C-53.37001831 3.83566528 -53.37001831 3.83566528 -51.9621582 3.60424805 C-34.69235932 0.95781612 -17.45555304 -0.07022548 0 0 Z "
					fill="#fff"
					transform="translate(399.5,55.6875)"
				/>
			</svg>
		</div>
	</div>
{/if}
<div class="flex flex-col min-h-screen" hidden={!$loaded}>
	<GGHeader
		on:import={importJSON}
		on:export={exportJSON}
		on:loadRandom={loadRandom}
		on:tutorial={startTutorial}
		on:changelog={showChangeLog}
	/>

	<div class="main flex flex-1" id="help_guide-step-welcome">
		<div
			class="bg-primary-color/50 p-2 rounded-primary br-5 m-4 mb-0 w-3/4"
			id="help_guide-step-rundown"
		>
			<Rundown on:generate={generateWords} />
		</div>

		<div
			id="help_guide-step-pouch-of-words"
			class="bg-primary-color/50 p-2 rounded-primary mt-4 mr-4 w-1/4 min-h-full overflow-auto"
		>
			<PouchOfWords />
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
				{#if history}
					{$history.length}
				{:else}
					0
				{/if}
			</button>
			<p class="place-content-center h-full w-full">
				{#if history && $history.length > 0}
					<input
						bind:this={resultinput}
						readonly
						class="text-secondary-color h-full w-full bg-transparent focus:outline-none overflow-scroll"
						value={$history[$history.length - 1].text}
						on:focus={(e) => e.target.select()}
					/>
				{:else}
					<p
						class="place-content-center text-tertiary-color italic overflow-auto h-full w-full not-selectable"
					>
						{$locales.placeholder_output}
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
			<button title={$locales.copy} class="hover:scale-110" on:click={handleCopyOutput}>
				📋
			</button>
			<button title={$locales.show_history} class="hover:scale-110" on:click={handleShowHistory}>
				🗃️
			</button>
			<button title={$locales.clear} class="hover:scale-110" on:click={handleDeleteHistory}>
				🗑️
			</button>
		</div>
	</div>
	<GGFooter />
</div>
