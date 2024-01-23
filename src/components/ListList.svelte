<!-- src/components/List.svelte -->
<script>
	import { onMount } from 'svelte';

	let userLists = [];
	let newItem;
	let newStr = '';

	function addItem() {
		if (newStr.trim() !== '') {
			newItem = { name: newStr, items: [], probabilities: [] };
			userLists = [...userLists, newItem];
			newStr = '';
		}
	}

	function removeItem(index) {
		userLists = userLists.filter((_, i) => i !== index);
	}

	onMount(async function () {
		try {
			const response = await fetch('./default_lists.json');
			userLists = await response.json();
		} catch (error) {
			console.error('Error fetching JSON data:', error);
		}
	});
</script>

<div class="overflow-auto">
	<div class="rounded-xl border-2 border-dashed border-zinc-100 relative text-xl">
		<input
			id="listInput"
			class="rounded-xl bg-transparent placeholder:text-zinc-200 placeholder:italic pl-8 w-full"
			bind:value={newStr}
			placeholder="Create a List..."
		/>
		<button class="absolute right-0 bg-slate-800 pr-2 pl-2 rounded-r-xl" on:click={addItem}
			>Add</button
		>
	</div>

	<ul>
		{#each userLists as item, index (item)}
			<li class="rounded-xl bg-slate-800/50 mt-2 ml-2 mr-2 flex-col">
				<div class="flex rounded-xl bg-slate-800/50">
					<h3 class="flex-1 overflow-hidden text-ellipsis mr-2 ml-2">{item.name}</h3>
					<button class="mr-2" on:click={() => removeItem(index)}>Remove</button>
				</div>
				{#each item.items as subItem, subIndex (subItem)}
					<ul class="ml-4 flex">
						<p class="flex-1 overflow-hidden text-ellipsis mr-2">{subItem}</p>
						<input class="mr-2 w-4" type="number" name="pItem" />
						<button class="mr-2" on:click={() => removeItem(subIndex)}>Remove</button>
					</ul>
				{/each}
			</li>
		{/each}
	</ul>
</div>
