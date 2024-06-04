<script>
	import '../app.css';
	import GGFooter from '../components/GGFooter.svelte';
	import GGHeader from '../components/GGHeader.svelte';
</script>

<div class="flex flex-col min-h-screen">
	<GGHeader on:openFile />
	<div class="flex grow" on:openFile>
		<slot />
	</div>
	<GGFooter />
</div>
