<script>
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();
</script>

<div class="bg-slate-800 p-2 flex justify-between">
	<div class="flex space-x-4">
		<a href="http://ggenerator.ggthe.app" class="flex">
			<img src="favicon.png" alt="GG Logo" class="w-7" />
			<h1 class="text-xl">enerator v0.1.1</h1>
		</a>
		<button
			class="flex px-2
			bg-gradient-to-r
			from-indigo-900
			to-purple-600
			border-2
			rounded-lg
			transition duration-300 ease-out
			hover:shadow-black
			hover:shadow-md
			hover:scale-110
			"
			on:click={() => {
				dispatch('openFile');
				console.log('test');
			}}
		>
			<u>I</u>mport Save
		</button>
		<button
			class="flex px-2
			bg-gradient-to-r
			from-purple-600
			to-pink-500
			border-2
			rounded-lg
			transition duration-300 ease-out
			hover:shadow-black
			hover:shadow-md
			hover:scale-110
			"
		>
			<u>E</u>xport Save
		</button>
	</div>
	<a
		class="flex items-center"
		href="https://github.com/JaceTheBlu/GGenerator"
		aria-label="Follow @JaceTheBlu on GitHub"
		target="_blank"
	>
		Project On
		<img src="github.png" alt="GitHub Logo" class="w-7 mr-2 pl-2" />
	</a>
</div>
