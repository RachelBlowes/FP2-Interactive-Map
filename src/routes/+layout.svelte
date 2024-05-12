<script>
    import "../stylesheet.css";
    import { page } from '$app/stores';
     
    let pages = [
        { url: "./", title: "Home" },
        { url: "./about", title: "About" },
        // Add more pages here
    ];
</script>
      
<nav>
    {#each pages as p}
        <a href={p.url} class:current={"." + $page.route.id === p.url}>{p.title}</a>
    {/each}
</nav>

<div class="content">
    <slot></slot>
</div>

<style>
nav {
    display: flex;
    justify-content: center; 
    border-bottom-width: 0.1em;
    border-bottom-style: solid;
    border-bottom-color: #BBB4B1;
    background-color: #CABB8B;
    
}

a {
    flex: 1;
    margin-top: 20px;
    color: whitesmoke;
    font-family: 'Courier New', Courier, monospace;
    text-decoration: none;
    text-align: center; 
    
}

a:hover {
    font-weight: bold;
    border-bottom-width: 0.4em;
    border-bottom-style: solid;
    border-bottom-color: #BBB4B1;
    padding-bottom: 0.8em;
}

a.current {
    color: whitesmoke;
    font-weight: bold;
    border-bottom-width: 0.4em;
    border-bottom-style: solid;
    border-bottom-color: #D1D6D5;
    padding-bottom: 0.8em;
}

.content {
    margin-top: 20px;
}



</style>