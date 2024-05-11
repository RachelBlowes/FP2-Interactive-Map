<script>
	import Flipped from './FlippedCloud.svelte'
	import NonSold from './NonSoldCloud.svelte'
	let visible = true;

    let current = 'NonSold';
	let selected = NonSold
    
    function selectShape(shape, component) {
        current = shape;
        selected = component;
    }

</script>

<div class="container">
    <div>
        <svelte:component this={selected}/>
    </div>
    <h5>Show what is renovated in:</h5>
    <div  class="button">
        <button  class:active={current === 'NonSold'} on:click={() => selectShape('NonSold', NonSold)}>
            Owned 
        </button>
        <button class:active={current === 'Flipped'} on:click={() => selectShape('Flipped', Flipped)}>
            Flipped
        </button>
    </div>
</div>

<style>
    .container {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 10em;
    }
</style>


