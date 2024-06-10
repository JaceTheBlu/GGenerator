<script>
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	const version = import.meta.env.VITE_VERSION;
</script>

<div class="bg-primary-color p-2 flex justify-between">
	<div class="flex space-x-4">
		<a href="http://ggenerator.ggthe.app" class="flex">
			<img src="favicon.png" alt="GG Logo" class="w-7" />
			<h1>enerator v{version}</h1>
		</a>
		<button
			class="flex px-2
			bg-gradient-to-r
			from-secondary-color
			to-tertiary-color
			border-2
			rounded-primary
			transition duration-300 ease-out
			hover:shadow-black
			hover:shadow-md
			hover:scale-110
			"
			on:click={() => {
				dispatch('import', 'detail value');
			}}
		>
			<p class="underline">I</p>
			mport Save
		</button>
		<button
			class="flex px-2
			bg-gradient-to-r
			from-tertiary-color
			to-secondary-color
			border-2
			rounded-primary
			transition duration-300 ease-out
			hover:shadow-black
			hover:shadow-md
			hover:scale-110
			"
			on:click={() => {
				dispatch('export', 'detail value');
			}}
		>
			<p class="underline">E</p>
			xport Save
		</button>
	</div>
	<a
		class="flex items-center text-tertiary"
		href="https://github.com/JaceTheBlu/GGenerator"
		aria-label="Follow @JaceTheBlu on GitHub"
		target="_blank"
	>
		Project On
		<img src="github.png" alt="GitHub Logo" class="w-7 mr-2 pl-2" />
	</a>
</div>
