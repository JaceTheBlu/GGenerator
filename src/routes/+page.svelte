<script>
	import '../app.css';
	import GGFooter from '../components/GGFooter.svelte';
	import GGHeader from '../components/GGHeader.svelte';
	import ListList from '../components/ListList.svelte';
	import Rundown from '../components/Rundown.svelte';
</script>

<div class="flex flex-col min-h-screen">
	<GGHeader />
	<div class="flex grow">
		<div class="bg-primary-color/50 p-2 rounded-primary br-5 m-4 w-3/4">
			<Rundown />
		</div>
		<div class="bg-primary-color/50 p-2 rounded-primary mt-4 mb-4 mr-4 w-1/4 overflow-auto">
			<ListList />
		</div>
	</div>
	<GGFooter />
</div>
