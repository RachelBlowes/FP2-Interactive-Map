<svelte:head>
  <title>About</title>
</svelte:head>

<br>
<br>
<h1 style="text-align:left;" calss="About">About the Project</h1>
<p class="indented">We created this project as part of the Interactive Visualization & Society class <a href="https://vis-society.github.io/" target="_blanc">(6.C35)</a> at MIT in spring 2024. 
  Collaborating with <a href="https://www.mapc.org/aboutus/" target="_blanc">the Metropolitan Area Planning Council (MAPC)</a>, we addressed Housing Affordability in Greater Boston, 
  researching speculation in the Boston housing market.</p>
<br>
  <p class="indented">
      We built on MAPC's work by analyzing more than twenty years of real estate transactions. We then joined these data with 
    the City of Boston's <a href="https://data.boston.gov/dataset/approved-building-permits" target="_blanc">approved building permits data</a> to research the relation between physical and fiscal investments and 
    how physical construction influences real estate market speculation, specifically, through "flipping" - the practice of buying a property, 
    renovating it, and selling it in the shortest period possible to maximize profit. 
  </p>

  <br>
  <br>
<h1 style="text-align:left;">About the Team</h1>
<div class="gallery">
  <ul class="gallery-list">
    <li class="gallery-item">
      <h3 class="gallery-title">Inge Donovan</h3>
      <a href="https://www.linkedin.com/in/inge-donovan-4467281b3/" targe="_blanc"><img src="https://media.licdn.com/dms/image/C4E03AQEWyaWm4SHyHw/profile-displayphoto-shrink_800_800/0/1595616022881?e=1721260800&v=beta&t=Qzq_OHSNFId2ZcER1cUa2EaRLFb_PVr74Cin0xMtc4c"></a> 
      <br>
      <p>Inge is an M.Arch and SMBT student interested in improving affordability and quality of life through building interventions in the housing sector.   </p>
    </li>
    <li class="gallery-item">
      <h3 class="gallery-title">Jenna Schnitzler</h3>
      <a href="https://www.linkedin.com/in/jenna-schnitzler/"><img src="https://media.licdn.com/dms/image/C4E03AQHVjKk3BdKgxg/profile-displayphoto-shrink_800_800/0/1561256683387?e=1721260800&v=beta&t=1aoptGhLPj2fRPP2bIXZYizV2BoABeFXIVn-JRcyKaA"></a>   
      <br>
      <p>Lorem ipsum </p>
    </li>
    <li class="gallery-item">
      <h3 class="gallery-title">Rachel Blowes</h3>
      <a href="https://www.linkedin.com/in/rachel-blowes-60aa06100/" target="_blanc"><img src="https://media.licdn.com/dms/image/C5603AQGSTsditXBscQ/profile-displayphoto-shrink_800_800/0/1592238101455?e=1721260800&v=beta&t=yn53fpV6gsb8164dsZzuym6o1VN9s6cKFA_tKv-c7Vs"></a>   
      <br>
      <p>Inge is kljvgoiehr;oweihv oihj </p>
    </li>
    <li class="gallery-item">
      <h3 class="gallery-title">Adi Kupershmidt</h3>
      <a href="https://www.linkedin.com/in/adi-kupershmidt-9b6730141/" target="_blanc"><img src="https://media.licdn.com/dms/image/D4D03AQG7QwGTfiY1Qg/profile-displayphoto-shrink_800_800/0/1715479440134?e=1721260800&v=beta&t=K6gYuVrDdqU829pvaJKmH0lhEkIjnGYaFOrNZwmPS-Q"></a>
      <br>
      <p>Architect (B.Arch) and Master of City Planning student (MIT), interested in how data can make cities more shareable.</p>
    </li>
  </ul>
</div>

<br>
<br>
<h1 style="text-align:left;" calss="About">Data Sources</h1>
<ol>
  <li><strong>The City of Boston Open Data Portal:</strong> Approved building permits, Live Street Address Management (SAM), Parcels</li>
  <li><strong>American Community Survey (ACS):</strong> Median income, total population, renters and owners division per census tract </li>
  <li><strong>The Warren Group:</strong> proprietary sales transactions data</li>
  <li><strong>US Census Bureau: </strong> Decennial Census</li>
  <li><strong>The City of Boston Open Data Portal:</strong> Open Geographic Data (SAM)</li>
  <li><strong>US Bureau of Labor Statistics: </strong> Consumer Price Index (CPI)</li>
</ol>
<br>
<br>
<br>

<style>
  .indented {
    text-indent: 40px;  /* Adjust the value to suit your needs */
}

h1.about{
  text-align: left;
}

p {
    margin-bottom: 20px; /* Increase the bottom margin of a paragraph */
}

.gallery {
    max-width: 100%; /* Limits the gallery's width to the viewport */
    display: block;
    margin: 0 auto; /* Centers the gallery in the viewport */
}

.gallery-list {
    display: grid;
    grid-template-columns: repeat(4, 1fr); /* Creates four equal columns */
    list-style: none; /* Removes default list styling */
    padding: 0;
    margin: 0;
}

.gallery-item {
    display: flex;
    flex-direction: column; /* Stacks the h3 and img vertically */
    align-items: center; /* Centers the items horizontally */
    margin: 0; /* Removes default margin */
    padding: 30px; /* Adds some padding around each item */
}

.gallery-title {
    margin: 0 0 10px 0; /* Adds a small space between the title and the image */
    text-align: center; /* Centers the title text */
}

.gallery img {
    width: 100%; /* Each image will fill its column */
    height: auto; /* Maintains the image's aspect ratio */
}

</style>