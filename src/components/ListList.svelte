<!-- src/components/List.svelte -->
<script>
	let userLists = [];
	let newItem = '';

	function addItem() {
		if (newItem.trim() !== '') {
			userLists = [...userLists, newItem];
			newItem = '';
		}
	}

	function removeItem(index) {
		userLists = userLists.filter((_, i) => i !== index);
	}

	async function readDefaultLists() {
		try {
			const response = await fetch('./default_lists.json');
			userLists = await response.json();
		} catch (error) {
			console.error('Error fetching JSON data:', error);
		}
	}

	readDefaultLists();
</script>

<div class="rounded-xl border-2 border-dashed border-zinc-100 relative text-xl">
	<input
		class="rounded-xl bg-transparent placeholder:text-zinc-200 placeholder:italic pl-8 w-full"
		bind:value={newItem}
		placeholder="Create a List..."
	/>
	<button class="absolute right-0 bg-slate-800 pr-2 pl-2 rounded-r-xl" on:click={addItem}
		>Add</button
	>
</div>

<ul>
	{#each userLists as item, index (item)}
		<li>
			{item.name}
			<button on:click={() => removeItem(index)}>Remove</button>
		</li>
	{/each}
</ul>
