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

<button  class:active={current === 'NonSold'} on:click={() => selectShape('NonSold', NonSold)}>
	Show the Homes
</button>
<button class:active={current === 'Flipped'} on:click={() => selectShape('Flipped', Flipped)}>
	Show the Flipped
</button>



<style>
	:global(svg) {
		max-width: flex;
		display: block
	}
    .active {
		background-color: #0087EC;
		color: white;
	}
	button {
		background-color: #f1f1f1;
		border: none;
		color: black;
		padding: 15px 32px;
		text-align: center;
		text-decoration: none;
		display: inline-block;
		font-size: 16px;
		margin: 4px 2px;
		cursor: pointer;
	}
</style>