<!-- MapStyleButton.svelte -->
<script>
  export let currentStyle;
  export let styles;
  export let setStyle;

  function changeStyle(style) {
    setStyle(style);
  }
</script>

<button on:click={() => changeStyle(style)}>{style.name}</button>

<style>
  button {
    margin: 5px;
  }
</style>
