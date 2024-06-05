<script>

    /* Imports*/
    import { createEventDispatcher } from 'svelte';
    import PouchElement from "./PouchElement.svelte";
    
    /* Variables*/
    export let name = "";

    let pouch_elements = [];
    let element_id = 0;
    $: pouch_elements_id = name.toLowerCase() + element_id;
    $: pouch_id = "addPouch" + name;

    const dispach = createEventDispatcher();


    /* Functions */

    function handleKeyDown(event) {
        if ( event.key === 'Enter') {
            let input_value = document.getElementById(pouch_id).value;
            element_id++;
            pouch_elements = [ ...pouch_elements, {
                    id: pouch_elements_id, 
                    name: input_value
            },]
            document.getElementById(pouch_id).value ='';
        }
    }

    function deletePouchElement(e){
        const deletionId = e.detail;
        let found = false;
        let i = 0;

        while( (i<pouch_elements.length) && (!found) ){

            if(deletionId === pouch_elements[i].id){
                pouch_elements.splice(i,1);
                found = true;
            }
            i++;
        }
        pouch_elements = [...pouch_elements];

    }

    function dispachDeletePouch(pouchName){
        dispach('delete-pouch',pouchName);
    }
</script>


<ul class="bg-slate-800/50 rounded-xl divide-y mt-4 mb-4">
    <li class="flex justify-between font-bold text-xl h-full pl-2"> 
        <span class="flex items-center"> > </span>
        <div class="flex hover:cursor-move">
            <span class="flex justify-center items-center text-white/50 pr-1" >
                @
            </span>
            <span class="flex justify-center hover:text-orange-500 transition-colors duration-300 items-center">
                {name}
            </span>
        </div>
        <button class="flex justify-end items-center text-white h-full rounded-tr-xl hover:bg-red-500 transition-colors duration-300 px-2" on:click={dispachDeletePouch(name)}>X</button>
    </li>

    {#if pouch_elements.length !== 0}
        <div class="divide-y divide-dashed">
            {#each pouch_elements as pouch}
                <PouchElement id={pouch.id} name={pouch.name} on:delete-pouch-element={deletePouchElement}/>
            {/each}
        </div>
    {/if}

    <li>
        <input 
        id={pouch_id}
        class="bg-transparent w-full h-full focus:outline-none placeholder:italic rounded-b-xl pl-4 pb-1" 
        type="text"
        placeholder="Enter a value..."
        on:keydown={handleKeyDown}
        >
    </li>
</ul>