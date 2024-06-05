<script>
	import PouchOfWords from '../components/PouchOfWords.svelte';
	import Rundown from '../components/Rundown.svelte';
</script>

<div class="flex flex-grow">
	<div class="bg-slate-800/50 p-2 rounded-xl br-5 m-4 w-3/4">
		<Rundown />
	</div>
	<div class="bg-slate-800/50 p-2 flex-col rounded-xl mt-4 mb-4 mr-4 w-1/4 max-w- overflow-auto">		
		<PouchOfWords />
	</div>
</div>
