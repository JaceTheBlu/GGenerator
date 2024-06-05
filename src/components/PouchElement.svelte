<script>
    /**
     * This component represent a pouch element
     * A pouch element is represented by : 
     * @param id : The id of the pouch element
     * @param name : the name of the pouch element
    */

    /* Imports  */
    import { createEventDispatcher } from 'svelte';
    
    /* Variables */
    export let id = 0;
    export let name ="";

    const dispach = createEventDispatcher();

    /* Functions */
    function dispachDelete(elementId){
        dispach('delete-pouch-element',elementId);
    }

</script>

<li class="flex justify-between items-center odd:bg-slate-800/10 even:bg-slate-800/50 pl-4 ">
    <span class=" flex-grow truncate ..." >{name}</span>
    <button class="text-xl text-white border-l border-white  hover:bg-red-500 transition-colors duration-300 px-2" on:click={dispachDelete(id)}>X</button>
</li>
