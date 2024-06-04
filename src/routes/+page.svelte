<script>
	import Pouch from '../components/Pouch.svelte';
	import Rundown from '../components/Rundown.svelte';
	
	let pouchList = [];
</script>

<div class="flex flex-grow">
	<div class="bg-slate-800/50 p-2 rounded-xl br-5 m-4 w-3/4">
		<Rundown />
	</div>
	<div class="bg-slate-800/50 p-2 flex-col rounded-xl mt-4 mb-4 mr-4 w-1/4 max-w- overflow-auto">		

		<div class="flex">
			<input class=" bg-slate-800/50 flex-grow w-full focus:outline-none md:w-3/4 rounded-md ml-1 mr-4 pl-2" type="text">

			<button class="bg-blue-500 flex-shrink-0 w-full md:w-auto text-white rounded-md px-4 py-2">Submit </button>
		</div>

		<Pouch id={1} name={"animals".toLowerCase()} />


	</div>
</div>
