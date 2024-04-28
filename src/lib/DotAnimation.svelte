<!-- CombinedComponent.svelte -->
<script>
  import { onMount, onDestroy } from 'svelte';
  import { slide } from 'svelte/transition';

  // Greetings array and index for cycling greetings
  let greetings = ['2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020'];
  let index = 0;
  let roller;

  // Calculate the radius based on the index
  const calculateLeftRadius = () => {
    const radii = [40, 70, 200, 300, 350, 375, 400, 415, 450, 500, 550]; // Predefined radii
    const numRadii = radii.length;
    return radii[index % numRadii]; // Cycling through radii based on the index
  };

  // Calculate the radius based on the index
  const calculateRightRadius = () => {
    const radii = [10, 20, 30, 40, 50, 75, 100, 150, 160, 170, 200]; // Predefined radii
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
      display: flex;
    width: 100%;
    height: 400px; /* Set a fixed height for both maps */
    margin-bottom: 20px; /* Add space between the maps */
    justify-content: space-around;
  }

  .tickercontainer {
      display: flex;
    width: 100%;
    height: 100px; /* Set a fixed height for both maps */
    margin-bottom: 20px; /* Add space between the maps */
    justify-content: space-around;
  }

  .leftcircle-container {
    flex: 1;
    width: 50%; /* Adjust the width of each map */
    height: 100%; /* Set a fixed height for each map */
  }

  .rightcircle-container {
    flex: 1;
    width: 50%; /* Adjust the width of each map */
    height: 100%; /* Set a fixed height for each map */
  }

  .leftcircle {
    position: relative;
    border-radius: 50%;
    background-color: rgb(255, 255, 255); /* You can customize colors */
    transition: width 0.5s, height 0.5s; /* Define transition animation */
  }

  .rightcircle {
    position: relative;
    border-radius: 50%;
    background-color: rgb(255, 255, 255); /* You can customize colors */
    transition: width 0.5s, height 0.5s; /* Define transition animation */
  }

  

</style>

<div class="tickercontainer">
  <div>
    {#key index}
    <br> 
      <h1 transition:slide>{greetings[index]}</h1>
    {/key}
  </div>

</div>

<div class="container">


  <div class="leftcircle-container">
    <div class="leftcircle" style="width: {calculateLeftRadius()}px; height: {calculateLeftRadius()}px;"></div>
  </div>

  <div class="rightcircle-container">
    <div class="leftcircle" style="width: {calculateRightRadius()}px; height: {calculateRightRadius()}px;"></div>
  </div>
</div>
