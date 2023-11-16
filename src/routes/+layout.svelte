<script>
	import '../app.css';
	import GGFooter from '../components/GGFooter.svelte';
	import GGHeader from '../components/GGHeader.svelte';
</script>

<div class="flex flex-col min-h-screen">
	<GGHeader />
	<div class="flex grow">
		<slot />
	</div>
	<GGFooter />
</div>
