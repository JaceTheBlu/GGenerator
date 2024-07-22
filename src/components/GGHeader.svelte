<script>
	import { createEventDispatcher } from 'svelte';
	import { locales, preferredLanguage } from '../stores';

	let lang_count = 0;
	const dispatch = createEventDispatcher();

	const importSave = (event) => {
		dispatch('import');
	};

	const exportSave = (event) => {
		dispatch('export');
	};

	const loadRandom = (event) => {
		dispatch('loadRandom');
	};

	const changeLanguage = () => {
		lang_count++;
		if (lang_count >= 27) {
			preferredLanguage.set('spqr');
		} else {
			preferredLanguage.set($preferredLanguage === 'fr' ? 'en' : 'fr');
		}
	};
</script>

<div
	id="help_guide-top-bar"
	class="bg-primary-color flex text-secondary justify-between"
	on:import
	on:export
>
	<div class="flex hover:scale-110 duration-300 transition-all not-selectable">
		<a href="https://ggenerator-beta.vercel.app/" class="flex px-2 items-center">
			<img src="favicon.png" alt="GG Logo" class="w-7" />
			<p class="mt-2">enerator</p>
		</a>
	</div>

	<div class="flex space-x-2">
		<button
			id="help_guide-save-button"
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
			<p class="underline">{$locales.save}</p>
		</button>

		<button
			id="help_guide-load-button"
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
			<p class="underline">{$locales.load}</p>
		</button>

		<button
			id="help_guide-load-button"
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
			on:click={loadRandom}
		>
			<p class="underline">{$locales.load_random}!</p>
		</button>
	</div>
	<div class="flex divide-x divide-solid children:px-2 my-2">
		<button
			id="help_guide-version-button"
			class=" hover:text-secondary-color text-primary !px-4 text-primary-color/75 self-center"
			title={$locales.changelog}
			on:click={() => {
				dispatch('changelog');
			}}
			>v1.0.0
		</button>
		<button
			id="help_guide-help-button"
			class="hover:scale-110 duration-300 transition-all"
			title={$locales.help}
			on:click={() => {
				dispatch('tutorial');
			}}
		>
			❔
		</button>
		<button
			id="help_guide-settings-button"
			class="hover:scale-110 duration-300 transition-all"
			title={$locales.settings}>⚙️</button
		>
		<button
			class="hover:scale-110 duration-300 transition-all"
			title={$locales.language}
			on:click={changeLanguage}
		>
			{#if $preferredLanguage === 'spqr'}
				<img src="images/spqr.png" class="h-8" alt="spqr" />
			{:else}
				{$preferredLanguage === 'fr' ? '🇫🇷' : '🇬🇧'}
			{/if}
		</button>
	</div>
</div>
