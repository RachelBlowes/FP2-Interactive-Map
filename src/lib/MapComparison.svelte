<script>
  import { onMount } from 'svelte';

  onMount(() => {
      mapboxgl.accessToken = 'pk.eyJ1IjoicmFjaGVsbWIiLCJhIjoiY2x1bjFtbDUwMHN3YTJrb2EyaDZqcGYzNCJ9.wzfF026YmS7lxeAbQOD_tA';

      const salesMap = new mapboxgl.Map({
          container: 'salesComp',
          style: 'mapbox://styles/rachelmb/clupvjh7o05c001qq6bmp6ukx',
          center: [-71.0955, 42.3314], // starting position [lng, lat]
          zoom: 12
      });

      const permitMap = new mapboxgl.Map({
          container: 'permitsComp',
          style: 'mapbox://styles/rachelmb/clupxzulx000t01qn10fl6v61',
          center: [-71.0955, 42.3314], // starting position [lng, lat]
          zoom: 12
      });

      const container = '#comparison-container';

      const comparemap = new mapboxgl.Compare(salesMap, permitMap, container, {
          // Set this to enable comparing two maps by mouse movement:
          // mousemove: true
      });
  });
</script>

<style>
  body {
      overflow: hidden;
  }

  body * {
      -webkit-touch-callout: none;
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
  }

  .comparemap {
      position: absolute;
      top: 0;
      bottom: 0;
      width: 100%;
  }
</style>

<div id="comparison-container">
  <div id="salesComp" class="comparemap"></div>
  <div id="permitsComp" class="comparemap"></div>
</div>
