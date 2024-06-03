<script>
    /**
     * This component represent a pouch element
     * A pouch element is represented by : 
     * @param id : The id of the pouch element
     * @param name : the name of the pouch element
    */

    /* Import  */
    import Card from "./Card.svelte";

    /* Variables */
    export let id = 0;
    export let name ="";
    
    /* Function */


</script>


<div class="flex justify-center">
    <Card>
       <span class="truncate ...">{name}</span> 
        <button class="text-xl text-white mx-2 ">X</button>
    </Card>

</div>

