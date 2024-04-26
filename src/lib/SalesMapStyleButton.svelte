<!-- SalesMapStyleButton.svelte -->
<script>
  export let currentStyle;
  export let styles;
  export let setStyle;

  function changeStyle(style) {
    setStyle(style.style);
  }
</script>

{#each styles as style}
  <button on:click={() => changeStyle(style)}>{style.name}</button>
{/each}

<style>
  button {
    margin: 5px;
  }
</style>
