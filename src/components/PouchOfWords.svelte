<script>
    /* Imports */
    import Pouch from "./Pouch.svelte";

    /* Variables */
    let pouch_list = [];
    let input_value ="";
    let max=20;
    $: input_value = String(input_value).toLowerCase();

    /*Functions */
    function submit(){
		input_value= input_value.trim();
	    if((input_value!== null) && (input_value !== undefined) && (input_value !== "") && (input_value.length>0) && (input_value.length < max) ){
			let i = 0;
			let found = false;
			while((i<pouch_list.length) && (!found)){

				if(pouch_list[i]=== input_value){
					found = true;
				}
				i++;
			}
			if(!found){
				pouch_list = [...pouch_list, input_value];
				input_value="";
			}
		}
	}
</script>

<div class="flex-col">
    <div class="flex">
        <input class=" bg-slate-800/50 flex-grow w-full focus:outline-none md:w-3/4 rounded-md ml-1 mr-4 pl-2" type="text" bind:value={input_value}>
    
        <button class="bg-blue-500 flex-shrink-0 w-full md:w-auto text-white rounded-md px-4 py-2" on:click={submit}>Submit </button>
    </div>
    {#each pouch_list as pouch}
        <Pouch name={pouch} />
    {/each}
</div>




