<script>

    /* Imports*/
    import PouchElement from "./PouchElement.svelte";
    
    /* Variables*/
    export let id = 0;
    export let name = "";
    let pouch_elements = [];
    
    
    let element_id = 0;
    $: pouch_elements_id = name.toLowerCase() + element_id;

    /* Functions */
    function handleKeyDown(event) {
        if ( event.key === 'Enter') {
            let input_value = document.getElementById('addPouch').value;
            element_id++;

            pouch_elements = [ ...pouch_elements, {
                    id: pouch_elements_id, 
                    name: input_value
            },]
            
            document.getElementById('addPouch').value ='';
          
            console.log(pouch_elements)
        }
    }
    console.log(pouch_elements)


</script>

<ul class="bg-slate-800/50 rounded-xl pt-1 mt-4">
    
    <li class="flex justify-between font-black text-xl border-b border-white "> 
        <span class="flex"> -->  </span>
        <span class="flex justify-center" >
            {name.slice(0,1).toUpperCase() +name.slice(1).toLowerCase()}
        </span>
        <button class="flex justify-end  text-xl text-white pr-2 ml-4">X</button>

        
    </li>
    <div class="divide-y divide-dashed">
        {#each pouch_elements as pouch}
            <PouchElement id={pouch.id} name={pouch.name} />
        {/each}

    </div>
    <li>
        <input 
        id="addPouch"
        class=" bg-transparent w-full h-full focus:outline-none rounded-b-xl border-t border-white pl-2 pb-1" 
        type="text"
        placeholder="..."
        on:keydown={handleKeyDown}
        >
    </li>

</ul>