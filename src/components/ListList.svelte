<!-- src/components/List.svelte -->
<script>
	let items = [];
	let newItem = '';

	function addItem() {
		if (newItem.trim() !== '') {
			items = [...items, newItem];
			newItem = '';
		}
	}

	function removeItem(index) {
		items = items.filter((_, i) => i !== index);
	}
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
	{#each items as item, index (item)}
		<li>
			{item}
			<button on:click={() => removeItem(index)}>Remove</button>
		</li>
	{/each}
</ul>
