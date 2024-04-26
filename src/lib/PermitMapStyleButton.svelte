<!-- MapStyleButton.svelte -->
<script>
  export let currentStyle;
  export let styles;
  export let setStyle;

  function changePermitStyle(permitstyle) {
    setPermitStyle(permitstyle);
  }
</script>

<button on:click={() => changePermitStyle(style)}>{style.name}</button>

<style>
  button {
    margin: 5px;
  }
</style>
