<script>
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();
	const importSave = (event) => {
		dispatch('import');
	};
	const exportSave = (event) => {
		dispatch('export');
	};
</script>

<div class="bg-primary-color flex text-secondary justify-between" on:import on:export>
	<div class="flex hover:scale-110 duration-300 transition-all">
		<a href="https://ggenerator-beta.vercel.app/" class="flex px-2 items-center">
			<img src="favicon.png" alt="GG Logo" class="w-7" />
			<p class="mt-2">enerator</p>
		</a>
	</div>
	<div class="flex space-x-2">
		<button
			class="flex px-2 my-2
				bg-gradient-to-r
				text-tertiary
				from-background-primary-color
				to-background-secondary-color
				border-secondary-width
				rounded-primary
				transition duration-300 ease-out
				hover:shadow-black
				hover:shadow-md
				hover:scale-110
				items-center
				"
			on:click={importSave}
		>
			<p class="underline">I</p>
			<p>mport Save</p>
		</button>
		<button
			class="flex px-2
				bg-gradient-to-r
				text-tertiary
				my-2
				from-background-secondary-color
				to-background-primary-color
				border-secondary-width
				rounded-primary
				transition duration-300 ease-out
				hover:shadow-black
				hover:shadow-md
				hover:scale-110
				items-center
				"
			on:click={exportSave}
		>
			<p class="underline">E</p>
			xport Save
		</button>
	</div>
	<div class="flex divide-x divide-solid children:px-2 my-2">
		<button class=" hover:text-secondary-color text-primary !px-4 text-primary-color/75 self-center"
			>v0.1.1</button
		>
		<button class="hover:scale-110 duration-300 transition-all" title="Help">❔</button>
		<button class="hover:scale-110 duration-300 transition-all" title="Settings">⚙️</button>
	</div>
</div>
