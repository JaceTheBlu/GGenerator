<script>
	// Code for analytics
	import { inject } from '@vercel/analytics';
	
	import Berger from '$lib/berger.js';
	import { createEventDispatcher } from 'svelte';
	import '../app.css';
	import GGFooter from '../components/GGFooter.svelte';
	import GGHeader from '../components/GGHeader.svelte';
	import PouchOfWords from '../components/PouchOfWords.svelte';
	import Rundown from '../components/Rundown.svelte';
	
	const dispatch = createEventDispatcher();
	
	inject();
	let rundown_list;
	let rundown_elem;
	let pouch_list;
	let pouch_elem;
	let result_div;

	let tour;

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


	function startTutorial(){
		if((tour=== undefined) || (!tour.isActive())){

			tour = new Berger(null);
	
			const firstText =
				"<div class='flex-col items-center justify-center children:text-lg first:text-2xl'> "+
					"<p class='text-center font-bold mb-4'>"+
						"Welcome to GGenerator"+
					"</p>"+ 
					"<p class='px-4 pb-4'>"+ 
						"A multi-purpose generator for every cases where you need random things !"+
					"</p>"+ 
					"<p class='px-4 pb-2'>"+ 
						"When you are ready let's start the tutorial."+ 
					"</p>"+ 
				"</div>"
			;
	
			const secondText=
				"<div class='flex-col items-center justify-center chidlren:text-lg'> "+
					"<p class='text-center font-bold text-2xl mb-4'>"+
						"Main sections "+
					"</p>"+ 
					"<p class='px-4'>"+ 
						"We have two sections : "+
					"</p>"+
					"<ul class='list-disc list-inside  px-4 pb-4'>"+ 
						"<li> On the left, the Rundown used  to create a sentence</li>"+	
						"<li> On the right, the Pouch of words to create lists</li>"+	
					"</ul>"+
					"<p class='px-4 pb-4'>"+ 
						"Let's continue with the Pouch of Words !"+ 
					"</p>"+ 
				"</div>"
	
			;
			const thirdText=
				"<div class='flex flex-col items-center justify-between'> "+
					"<p class='text-center font-bold text-2xl mb-4'>"+
						"Right section : Pouch Of Words"+
					"</p>"+ 
					"<p class='text-lg px-4 mb-2'>"+ 
						"The goal of this section is to create pouches, which are lists of things. For example you can have a pouch named as animals with cat and dog in it :"+
					"</p>"+
					"<img src='images/pouch_animals.png' alt='pouch example' class='w-96 mb-4'/>"+
					"<p class='text-lg px-4 pb-4'>"+ 
						"Next how to create a pouch !"+
					"</p>"+ 
				"</div>"
			;
			
			const fourthText=
				"<div class='flex-col flex-wrap items-center justify-center'> "+
					"<p class='text-center font-bold text-2xl mb-4'>"+
						"Create a pouch"+
					"</p>"+ 
					"<p class='text-justify break-words max-w-2xl px-4 pb-2'>"+ 
						"To create a pouch enter the name of pouch in the bar and press Enter or click the 'Add pouch' button "+  
					"</p>"+ 
					"<p class='text-justify break-words max-w-4xl px-4'>"+ 
						"To add element to a pouch do it in the 'Enter a value ...' section and press Enter or the 'submit ↵' button next to it"+  
					"</p>"+ 
					"<p class='text-justify break-words max-w-4xl px-4'>"+ 
						"In the next section how to manage a pouch and its elements"+  
					"</p>"+ 
					
				"</div>"
			;
	
			const fifthText = 
				"<div class='flex-col items-centers justify center'>"+
					"<p class='text-center font-bold text-2xl mb-4'>"+
						"Manage a pouch"+
					"</p>"+	
					"<p class='text-justify break-words max-w-2xl px-4 pb-2'>"+
						"In a pouch you also can modify its name by clicking on the pouch name, note that you cannot put a name of an existing pouch. You can also in the same way change the name of the elements."+
					"</p>"+	
					"<p class='italic text-base break-words max-w-xl px-4 pb-4'>"+ 
						"If you want to delete an element click on the red cross next to it, to delete a pouch click the red cross next to its name."+ 
					"</p>"+
					"<p class='text-justify break-words max-w-2xl px-4 pb-2'>"+
						"It cover everything you need to know about pouches ! Next Rundown section ! "+
					"</p>"+	
				"</div>"
			;
	
			const sixthText = 
				"<div class='flex-col items-centers justify center'>"+
					"<p class='text-center font-bold text-2xl mb-4'>"+
						"Rundown section"+
					"</p>"+	
					"<p class='text-justify break-words max-w-2xl px-4 pb-2'>"+
						"The goal of this section is to create a sentence, it will be used as a template for the random generation."+
					"</p>"+	
					"<p class='text-justify px-4 pb-2'>"+
						"A sentence is composed of multiples words, we have two types of them : "+
					"</p>"+	
					"<ul class='list-disc  list-inside px-4 pb-4'>"+ 
						"<li> A pouch word : it's the name of one the list you created earlier</li>"+	
						"<li> A static text word : it's used to add meaning to the sentence </li>"+	
					"</ul>"+
					"<p class='text-justify px-4 pb-2'>"+
						"Next detail on words !"+
					"</p>"+	
				"</div>"
			;
				
			const seventhText = 
				"<div class='flex-col items-centers justify center'>"+
					"<p class='text-center font-bold text-2xl mb-4'>"+
						"Words : Pouch & Static text"+
					"</p>"+	
					"<p class='text-justify break-words max-w-2xl px-4 pb-2'>"+
						"First to create a word click on the '+' button, when you have finished you can create another word by clicking again on the '+' button on by pressing Tab."+
					"</p>"+	
					"<p class='text-justify break-words max-w-2xl px-4 pb-2'>"+
						"If you want to create a Pouch word, put the name of the pouch forwared by '@', don't put anything else ! A pouch word contains only a pouch."+
					"</p>"+	
					"<p class='text-justify px-4 pb-2'>"+
						"To create a Static text word ... just type some text ! Note that you can modify your words by clicking on them, to delete them just remove everything in them."+
					"</p>"+	
					"<p class='text-justify px-4 pb-2'>"+
						"When you finished you will have something like that : "+
					"</p>"+	
					"<img src='images/sentence.png' alt='sentence example' class='w-96'/>"+
				"</div>"
			;
	
			const eighthText = 
				"<div class='flex-col items-centers justify center'>"+
					"<p class='text-center font-bold text-2xl mb-4'>"+
						"GGenerate !"+
					"</p>"+	
					"<p class='text-justify break-words max-w-2xl px-4 pb-2'>"+
						"When you're happy with your sentence and your pouches, click on GGenrate ! to generate a random result."+
					"</p>"+	
				"</div>"
			;
	
			const ninethText = 
				"<div class='flex-col items-centers justify center'>"+
					"<p class='text-center font-bold text-2xl mb-4'>"+
						"GGenerate !"+
					"</p>"+	
					"<p class='text-justify break-words max-w-2xl px-4 pb-2'>"+
						"It's time ! We have our sentence, we have some lists, now click on the 'GGenerate' button and see what kind of result you got."+
					"</p>"+	
					"<p class='text-justify break-words max-w-2xl px-4 pb-2'>"+
						"Thank you for having followed this tutorial and have fun !"+
					"</p>"+	
				"</div>"
			;
			
					
			tour.addStep({
				id:'first-step',
				arrow: true,
				text: firstText,
				attachTo:{
					element : '#tutorial-step-0',
				},
				buttons:[
					{
						text: 'Exit',
						action: tour.complete,
						classes:'border-2 rounded-primary px-2 hover:bg-cancel-color transition duration-300 ease out py-1 mr-2 mt-2',
						label: 'Exit'
					},
					{
						text:'Next',
						action: tour.next,
						classes:'border-2 rounded-primary px-2 hover:bg-validate-color transition duration-300 ease out py-1 mr-2 mt-2',
						label:'Next'
	
					}
				],
			});
	
			tour.addStep({
				id:'second-step',
				arrow: true,
				text: secondText,
				attachTo:{
					element: '#tutorial-step-1',
					on: 'bottom-start'
				},
				buttons:[
					{
						text: 'Back',
						action: tour.back,
						classes:'border-2 rounded-primary px-2 hover:bg-cancel-color transition duration-300 ease out py-1 mr-2 mt-2',
						label: 'Back'
					},
					{
						text:'Next',
						action: tour.next,
						classes:'border-2 rounded-primary px-2 hover:bg-validate-color transition duration-300 ease out py-1 mr-2 mt-2',
						label:'Next'
	
					}
				],
			});
			tour.addStep({
				id:'third-step',
				arrow: true,
				text: thirdText,
				attachTo:{
					element: '#tutorial-step-1',
					on: 'left'
				},
				buttons:[
					{
						text: 'Back',
						action: tour.back,
						classes:'border-2 rounded-primary px-2 hover:bg-cancel-color transition duration-300 ease out py-1 mr-2 mt-2',
						label: 'Back'
					},
					{
						text:'Next',
						action: tour.next,
						classes:'border-2 rounded-primary px-2 hover:bg-validate-color transition duration-300 ease out py-1 mr-2 mt-2',
						label:'Next'
	
					}
				],
			});
	
			tour.addStep({
				id:'fourth-step',
				arrow: true,
				text: fourthText,
				attachTo:{
					element: '#tutorial-step-1',
					on: 'top'
				},
				buttons:[
					{
						text: 'Back',
						action: tour.back,
						classes:'border-2 rounded-primary px-2 hover:bg-cancel-color transition duration-300 ease out py-1 mr-2 mt-2',
						label: 'Back'
					},
					{
						text:'Next',
						action: tour.next,
						classes:'border-2 rounded-primary px-2 hover:bg-validate-color transition duration-300 ease out py-1 mr-2 mt-2',
						label:'Next'
	
					}
				],
			});
			tour.addStep({
				id:'fifth-step',
				arrow: true,
				text: fifthText,
				attachTo:{
					element: '#tutorial-step-2',
					on: 'left'
				},
				buttons:[
					{
						text: 'Back',
						action: tour.back,
						classes:'border-2 rounded-primary px-2 hover:bg-cancel-color transition duration-300 ease out py-1 mr-2 mt-2',
						label: 'Back'
					},
					{
						text:'Next',
						action: tour.next,
						classes:'border-2 rounded-primary px-2 hover:bg-validate-color transition duration-300 ease out py-1 mr-2 mt-2',
						label:'Next'
	
					}
				],
			});
			tour.addStep({
				id:'sixth-step',
				arrow: true,
				text: sixthText,
				attachTo:{
					element: '#tutorial-step-2',
					on: 'left'
				},
				buttons:[
					{
						text: 'Back',
						action: tour.back,
						classes:'border-2 rounded-primary px-2 hover:bg-cancel-color transition duration-300 ease out py-1 mr-2 mt-2',
						label: 'Back'
					},
					{
						text:'Next',
						action: tour.next,
						classes:'border-2 rounded-primary px-2 hover:bg-validate-color transition duration-300 ease out py-1 mr-2 mt-2',
						label:'Next'
	
					}
				],
			});
			tour.addStep({
				id:'seventh-step',
				arrow: true,
				text: seventhText,
				attachTo:{
					element: '#tutorial-step-2',
					on: 'left'
				},
				buttons:[
					{
						text: 'Back',
						action: tour.back,
						classes:'border-2 rounded-primary px-2 hover:bg-cancel-color transition duration-300 ease out py-1 mr-2 mt-2',
						label: 'Back'
					},
					{
						text:'Next',
						action: tour.next,
						classes:'border-2 rounded-primary px-2 hover:bg-validate-color transition duration-300 ease out py-1 mr-2 mt-2',
						label:'Next'
	
					}
				],
			});
			tour.addStep({
				id:'eighth-step',
				arrow: true,
				text: eighthText,
				attachTo:{
					element: '#tutorial-step-2',
					on: 'left'
				},
				buttons:[
					{
						text: 'Back',
						action: tour.back,
						classes:'border-2 rounded-primary px-2 hover:bg-cancel-color transition duration-300 ease out py-1 mr-2 mt-2',
						label: 'Back'
					},
					{
						text:'Next',
						action: tour.next,
						classes:'border-2 rounded-primary px-2 hover:bg-validate-color transition duration-300 ease out py-1 mr-2 mt-2',
						label:'Next'
	
					}
				],
			});
			tour.addStep({
				id:'nineth-step',
				arrow: true,
				text: ninethText,
				attachTo:{
					element: '#tutorial-step-3',
					on: 'top'
				},
				buttons:[
					{
						text: 'Back',
						action: tour.back,
						classes:'border-2 rounded-primary px-2 hover:bg-cancel-color transition duration-300 ease out py-1 mr-2 mt-2',
						label: 'Back'
					},
					{
						text:'End',
						action: tour.complete,
						classes:'border-2 rounded-primary px-2 hover:bg-validate-color transition duration-300 ease out py-1 mr-2 mt-2',
						label:'End'
	
					}
				],
			});
	
			tour.start();


		}
	}
	
	const exportJSON = () => {
		console.log('export');
	};
	const createPouchIfNE = (event) => {
		console.log(event);
		let pouchName = event.detail.text.substring(1);
		const pouch = pouch_list.find((pouch) => pouch.name === pouchName);
		if (!pouch) pouch_elem.addPouch(pouchName);
	};
</script>

<div 
	class="flex flex-col min-h-screen"
	id="tutorial-step-0"
>


	<GGHeader on:import={importJSON} on:export={exportJSON} on:tutorial={startTutorial} />
	<div class="flex grow" id="tutorial-step0">
		<div class="bg-primary-color/50 p-2 rounded-primary br-5 m-4 mb-0 w-3/4">
			<Rundown
				bind:this={rundown_elem}
				bind:rundown_list
				on:generate={generateWords}
				on:NewPouchWord={createPouchIfNE}
			/>
		</div>
		<div class="bg-primary-color/50 p-2 rounded-primary mt-4 mr-4 w-1/4 overflow-auto">
			<PouchOfWords bind:this={pouch_elem} bind:pouch_list />
		</div>
	</div>
	<div class="w-auto flex bg-primary-color/50 h-16 m-4 rounded-primary items-center">
		<p class="pl-2 text-secondary mr-2">Output:</p>
		<p bind:this={result_div} class="text-secondary-color"/>
	</div>
	<GGFooter />
</div>
