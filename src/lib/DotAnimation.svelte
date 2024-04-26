<!-- CircleVisualization.svelte -->
<script>
  let counter = 0; // Counter to cycle through radii

  // Calculate the radius based on the counter
  const calculateRadius = () => {
    const radii = [50, 70, 100]; // Predefined radii
    const numRadii = radii.length;
    return radii[counter % numRadii]; // Cycling through radii based on the counter
  };

  // Function to update counter and trigger animation
  const updateCounter = () => {
    counter++; // Increment the counter
  };

  // Function to reset the counter
  const resetCounter = () => {
    counter = 0; // Reset counter to start the cycle again
  };
</script>

<style>
  .circle {
    display: inline-block;
    border-radius: 50%;
    background-color: blue; /* You can customize colors */
    margin-right: 20px; /* Adjust spacing between circles */
    transition: width 0.5s, height 0.5s; /* Define transition animation */
  }
</style>

<div on:click={updateCounter} on:animationend={resetCounter}>
  <div class="circle" style="width: {calculateRadius()}px; height: {calculateRadius()}px;"></div>
</div>
