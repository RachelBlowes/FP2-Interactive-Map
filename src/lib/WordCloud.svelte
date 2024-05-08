<script>
	import Flipped from './FlippedCloud.svelte'
	import NonSold from './NonSoldCloud.svelte'
    import { fade } from 'svelte/transition';
    let isVisible = true;
    let current = 'NonSold';
	let selected = NonSold
    
    function selectShape(shape, component) {
        current = shape;
        selected = component;
    }

</script>

<div class="container">
<div  in:fade={{ duration: 1000 }}>
    <svelte:component this={selected}/>
</div>
    <h5>Show what is renovated in:</h5>
    <div>
        <button  class:active={current === 'NonSold'} on:click={() => selectShape('NonSold', NonSold)}>
            Owned 
        </button>
        <button class:active={current === 'Flipped'} on:click={() => selectShape('Flipped', Flipped)}>
            Flipped
        </button>
    </div>
</div>

<style>
    div {
        display: flex;
        justify-content: center;
        margin-top: 10px;
    }
    .container {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 10em;
    }
</style>


