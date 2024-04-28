<!-- SalesMapStyleButton.svelte -->
<script>
  export let currentSaleStyle;
  export let styles;
  export let setSaleStyle;

  function changeStyle(style) {
    setStyle(style.style);
  }
</script>

{#each styles as style}
  <button on:click={() => changeSaleStyle(style)}>{style.name}</button>
{/each}

<style>
  button {
    margin: 5px;
  }
</style>
