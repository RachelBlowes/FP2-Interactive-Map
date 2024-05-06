<style>
  #Map {
    flex: 1;
    width: 100%;
    height: 100%;
  }

  #mapcontainer {
    display: flex;
    width: 100%;
    height: 400px;
    margin-bottom: 20px;
    justify-content: space-around;
  }

  #maptitles {
    display: flex;
    width: 100%;
    justify-content: space-around;
  }
</style>

<div id="mapcontainer">
  <div id="Map"></div>
</div>

<div id="maptitles">
  <h5>{MapTitle}</h5>
</div>

<script>
  import { onMount } from 'svelte';

  let Map;
  let MapTitle = '% Renters by Census Tract';

  onMount(async () => {
    try {
      const response = await fetch('https://rachelblowes.github.io/Geodata/demographic_data/percent_renters.geojson');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const geojsonData = await response.json();

      geojsonData.features.forEach(feature => {
        const value = parseFloat(feature.properties['Retained fields_2010_percent_renter']);
        if (!isNaN(value)) {
          feature.properties['Retained fields_2010_percent_renter'] = value;
        } else {
          feature.properties['Retained fields_2010_percent_renter'] = 1; 
        }

        const geoidValue = parseInt(feature.properties['geoid']);
        if (!isNaN(geoidValue)) {
          feature.properties['geoid'] = geoidValue;
        } else {
          feature.properties['geoid'] = 1; 
        }
        
        console.log('Feature Properties:', feature.properties);
      });

      initializeMap(geojsonData);
    } catch (error) {
      console.error('Error fetching census tract data:', error);
    }
  });

  function initializeMap(geojsonData) {
    mapboxgl.accessToken = 'pk.eyJ1IjoicmFjaGVsbWIiLCJhIjoiY2x1bjFtbDUwMHN3YTJrb2EyaDZqcGYzNCJ9.wzfF026YmS7lxeAbQOD_tA';

    Map = new mapboxgl.Map({ 
      container: 'Map',
      style: 'mapbox://styles/mapbox/standard',
      center: [-71.0955, 42.3314],
      zoom: 10
    });

    Map.on('load', () => {
      Map.addLayer({
        id: 'geoid',
        type: 'fill',
        source: {
          type: 'geojson',
          data: geojsonData
        },
        paint: {
          'fill-extrusion-color': '#aaa', 
          'fill-extrusion-height': ['get', 'Retained fields_2010_percent_renter'], 
          'fill-extrusion-opacity': 0.6
        }
      });
    });
  }
</script>

