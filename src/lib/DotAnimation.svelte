<!-- CombinedComponent.svelte -->
<script>
  import { onMount, onDestroy } from 'svelte';
  import { slide } from 'svelte/transition';

  // Greetings array and index for cycling greetings
  let greetings = ['2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020'];
  let index = 0;
  let roller;

  // Calculate the radius based on the index
  const calculateRadius = () => {
    const radii = [40, 70, 200, 300, 350, 375, 400, 415, 450, 500, 550]; // Predefined radii
    const numRadii = radii.length;
    return radii[index % numRadii]; // Cycling through radii based on the index
  };

  // Function to update index and trigger animation
  const updateIndex = () => {
    if (index === greetings.length - 1) index = 0;
    else index++;
  };

  // Automatically start animation when component is mounted
  onMount(() => {
    roller = setInterval(() => {
      updateIndex();
    }, 1150);
  });

  // Clean up the interval when the component is destroyed
  onDestroy(() => {
    clearInterval(roller);
  });
</script>

<style>
    .container {
    position: relative;
    width: 100%;
    height: 600px; /* Set the desired height */
  }

  .leftcircle-container {
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
  }

  .leftcircle {
    position: relative;
    border-radius: 50%;
    background-color: rgb(255, 255, 255); /* You can customize colors */
    transition: width 0.5s, height 0.5s; /* Define transition animation */
  }

</style>

<div class="container">
  <div>
    {#key index}
    <br> 
      <h1 transition:slide>{greetings[index]}</h1>
    {/key}
  </div>

  <div class="leftcircle-container">
    <div class="leftcircle" style="width: {calculateRadius()}px; height: {calculateRadius()}px;"></div>
  </div>
</div>
