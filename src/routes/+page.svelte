<script>
	// Code for analytics
	import { inject } from '@vercel/analytics';
	
	import Shepherd from 'shepherd.js';
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
		console.log("A");
		if((tour=== undefined) || (!tour.isActive())){
			console.log("C");

			tour = new Shepherd.Tour({
				useModalOverlay: true,
				defaultStepOptions:{
					classes: 'shadow-md bg-gradient-to-r from-background-primary-color to-background-secondary-color border-2 rounded-primary px-2 pt-2 pb-2 mb-4',
					scrollTo: false,
				}
			});
	
			const firstText =
				"<div class='flex-col items-center justify-center'> "+
					"<p class='text-center font-bold text-2xl mb-4'>"+
						"Welcome to GGenerator"+
					"</p>"+ 
					"<p class='text-justify break-words max-w-xl px-4 pb-4'>"+ 
						"A multi-purpose generator for (theoretically) every cases where you need random things !"+
					"</p>"+ 
					"<p class='text-justify break-words max-w-xl px-4 pb-4'>"+ 
						"To explain how it works we will take the example of shared flat  who want to plan the tasks to do."+ 
					"</p>"+ 
					"<p class='text-justify px-4 pb-2'>"+ 
						"When you are ready let's start the tutorial."+ 
					"</p>"+ 
				"</div>"
			;
	
			const secondText=
				"<div class='flex-col items-center justify-center'> "+
					"<p class='text-center font-bold text-2xl mb-4'>"+
						"Sentence & blocks"+
					"</p>"+ 
					"<p class='text-justify px-4'>"+ 
						"A sentence is composed by blocks a block can be :"+
					"</p>"+
					"<ul class='list-disc list-inside break-words max-w-xl px-4 pb-4'>"+ 
						"<li> A group of words (to add some meaning)</li>"+	
						"<li> A list (for example a list of people)</li>"+	
					"</ul>"+
					"<p class='text-justify break-words max-w-xl px-4 pb-4'>"+ 
						"In fact the sentence will be our template for the random generation."+ 
					"</p>"+ 
				"</div>"
	
			;
			const thirdText=
				"<div class='flex-col flex-wrap items-center justify-center'> "+
					"<p class='text-center font-bold text-2xl mb-4'>"+
						"Blocks : Word & list"+
					"</p>"+ 
					"<p class='text-justify break-words max-w-xl px-4' mb-2>"+ 
						"First to create a block click on '+' over there and start typing to have a block of words."+
					"</p>"+
					"<p class='italic text-base break-words max-w-xl px-4 pb-4'>"+ 
						"Notice that you can press tab within a block to create a new one. Also to delete a block just delete everything in it."+ 
					"</p>"+
					"<p class='text-justify break-words max-w-xl px-4 pb-4'>"+ 
						"For the list it\'s different, first a list is alone in it\'s block "+  
						" you cannot have words with a list, not either another list. Second you need to put the name of list with an \'@\' in front of it."+
					"</p>"+ 
				"</div>"
			;
			
			const fourthText=
				"<div class='flex-col flex-wrap items-center justify-center'> "+
					"<p class='text-center font-bold text-2xl mb-4'>"+
						"Create our first sentence"+
					"</p>"+ 
					"<p class='text-justify break-words max-w-2xl px-4 pb-2'>"+ 
						"In our case we want to have this kind of result : Thursday it's the turn of John to do the laundry."+  
					"</p>"+ 
					"<p class='text-justify px-4'>"+ 
						"To do that we need :"+  
					"</p>"+ 
					"<ul class='list-disc  list-inside px-4 pb-4'>"+ 
						"<li> A block with '@days' to get the list of days</li>"+	
						"<li> Another with 'it\'s the turn of', so a block of words </li>"+	
						"<li> A block with '@people' to get the list of people </li>"+	
						"<li>  Again a word block with 'to do the' </li>"+	
						"<li> Finally a list block with '@tasks' this time </li>"+	
					"</ul>"+
					"<p class='text-justify break-words max-w-xl px-4'>"+ 
						"The result must be that :"+
					"</p>"+ 
					"<p class='text-justify px-4 pb-2'>"+ 
						"@days it's the turn of @people to do the @tasks."+
					"</p>"+ 
				"</div>"
			;
	
			const fifthText = 
				"<div class='flex-col items-centers justify center'>"+
					"<p class='text-center font-bold text-2xl mb-4'>"+
						"Creating a list"+
					"</p>"+	
					"<p class='text-justify break-words max-w-2xl px-4 pb-2'>"+
						"Now, we have a sentence, we need next to create the list, to do that just type the name of the list in the bar and press enter or submit."+
					"</p>"+	
					"<p class='italic text-base break-words max-w-xl px-4 pb-4'>"+ 
						"No need this time to add '@' in front of it ! It is done automatically"+ 
					"</p>"+
					"<p class='text-justify break-words max-w-2xl px-4 pb-2'>"+
						"Before continuing to the next step create 3 lists : people, tasks and days"+
					"</p>"+	
				"</div>"
			;
	
			const sixthText = 
				"<div class='flex-col items-centers justify center'>"+
					"<p class='text-center font-bold text-2xl mb-4'>"+
						"Add elements to a list"+
					"</p>"+	
					"<p class='text-justify break-words max-w-2xl px-4 pb-2'>"+
						"Since we have now 3 lists, we just need to add some elements, same as before but this time to add an element it's the bar within the list."+
					"</p>"+	
					"<p class='text-justify px-4 pb-2'>"+
						"To continue you will need to fill the lists with that :"+
					"</p>"+	
					"<ul class='list-disc  list-inside px-4 pb-4'>"+ 
						"<li> @people : John, Marie, Pablo and Elena</li>"+	
						"<li> @tasks : laundry, cooking, groceries</li>"+	
						"<li> @days : Thursday, Friday, Saturday and Sunday </li>"+		
					"</ul>"+
				"</div>"
			;
				
			const seventhText = 
				"<div class='flex-col items-centers justify center'>"+
					"<p class='text-center font-bold text-2xl mb-4'>"+
						"Update/Delete an element from a list"+
					"</p>"+	
					"<p class='text-justify break-words max-w-2xl px-4 pb-2'>"+
						"Now we will see on how we can modify our list, to update en element just click on it and type a new value, if you want to delete it just click on the cross."+
					"</p>"+	
					
					"<p class='text-italice break-words max-w-2xl px-4 pb-2'>"+
						"You can also do that on the name of the list, and of course delete the list as well"+
					"</p>"+	
					"<p class='text-justify px-4 pb-2'>"+
						"Pratice time ! "+
					"</p>"+	
					"<ul class='list-disc list-inside break-words max-w-2xl px-4 pb-4'>"+ 
						"<li> Pablo already left the shared flat, he was replaced by Nathan</li>"+	
						"<li> On Sunday everybody take care of himself so no need to have it</li>"+		
					"</ul>"+
				"</div>"
			;
	
			const eighthText = 
				"<div class='flex-col items-centers justify center'>"+
					"<p class='text-center font-bold text-2xl mb-4'>"+
						"Fold a list"+
					"</p>"+	
					"<p class='text-justify break-words max-w-2xl px-4 pb-2'>"+
						"To finish on the list you can also fold and unfold them ! Just click on ▽/▷"+
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
