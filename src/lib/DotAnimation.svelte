<!-- CombinedComponent.svelte -->
<script>
  import { onMount, onDestroy } from 'svelte';
  import { slide } from 'svelte/transition';

  // Greetings array and index for cycling greetings
  let greetings = ['2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022'];
  let index = 0;
  let roller;


// Define captions for left and right circles
let leftCaptions = ['$369,096', '$377,898', '$387,295', '$442,950', '$591,897', '$643,319', '$580,850', '$729,266', '$830,000', '$882,037', '$811,094', '$839,656', '$1,065,000']; // Add captions as needed
let rightCaptions = ['$1,050', '$8,000', '$10,483', '$6,000', '$9,150', '$15,300', '$16,070', '$18,400', '$18,000', '$20,600', '$21,244', '$42,072', '$33,442']; // Add captions as needed


  // Calculate the radius based on the index
  const calculateLeftRadius = () => {
    const radii = [200, 204, 204, 228, 267, 217, 180, 151, 227, 212, 183, 207, 253]; // Predefined radii
    const numRadii = radii.length;
    return radii[index % numRadii]; // Cycling through radii based on the index
  };

  // Calculate the radius based on the index
  const calculateRightRadius = () => {
    const radii = [1, 4.3, 5.5, 3, 4.13, 5.16, 4.99, 7.335, 6.936, 8.963, 9.8, 10.37, 9.96]; // Predefined radii
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


  .tickercontainer {
      display: flex;
    width: 100%;
    height: 100px; /* Set a fixed height for both maps */
    margin-bottom: 20px; /* Add space between the maps */
    justify-content: space-around;
  }

  .titlecontainer {
      display: flex;
    width: 100%;
    height: 100px; /* Set a fixed height for both maps */
    margin-bottom: 20px; /* Add space between the maps */
    justify-content: space-around;
  }


  .captioncontainer {
      display: flex;
    width: 100%;
    height: 20px; /* Set a fixed height for both maps */
    margin-bottom: 20px; /* Add space between the maps */
    justify-content: space-around;
  }

  .leftcircle-container,
.rightcircle-container {
  position: relative; /* Ensure circles are positioned relative to their containers */
  display: flex;
  justify-content: center; /* Center circles horizontally */
  align-items: center; /* Center circles vertically */
  width: 50%; /* Adjust the width of each circle container */
}

.leftcircle {
  border-radius: 50%;
  background-color: #438b5b; /* You can customize colors */
  transition: width 0.5s, height 0.5s; /* Define transition animation */
}



.rightcircle {
  border-radius: 50%;
  background-color:  #0087EC; /* You can customize colors */
  transition: width 0.5s, height 0.5s; /* Define transition animation */
}


.container {
  display: flex;
  width: 100%;
  height: 400px; /* Set a fixed height for the container */
  margin-bottom: 20px; /* Add space below the container */
  justify-content: space-around; /* Distribute space evenly around child elements */
}


  #maptitles {
    display: flex;
    width: 100%;
    justify-content: space-around;
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
    <div class="rightcircle" style="width: {calculateRightRadius()}px; height: {calculateRightRadius()}px;"></div>
  </div>
</div>


<div class="captioncontainer">
  <div class="leftcircle-container">
    <div>{leftCaptions[index]}</div> <!-- Caption for left circle -->
  </div>

  <div class="rightcircle-container">
    <div>{rightCaptions[index]}</div> <!-- Caption for right circle -->
  </div>
  </div>



<div class="titlecontainer">
  <div id="maptitles">
    <h5>Average sale price</h5>
    <h5> Average permit valuation </h5>
  </div>


</div>

