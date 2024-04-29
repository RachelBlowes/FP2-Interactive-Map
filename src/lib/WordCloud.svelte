<script>
	import Flipped from './FlippedCloud.svelte'
	import NonSold from './NonSoldCloud.svelte'
	
    let current = 'NonSold';
	let selected = NonSold
    
    function selectShape(shape, component) {
        current = shape;
        selected = component;
    }

</script>

<svelte:component this={selected} />
<h5>Show what is renovated in:</h5>
<button  class:active={current === 'NonSold'} on:click={() => selectShape('NonSold', NonSold)}>
	Flipped 
</button>
<button class:active={current === 'Flipped'} on:click={() => selectShape('Flipped', Flipped)}>
	Owned
</button>



<style>
	:global(svg) {
		max-width: flex;
		display: block
	}
	text {
        font-family: Courier;
		fill: #BBB4B1;
            }   
</style>