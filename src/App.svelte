<script>
  import Router from 'svelte-spa-router';
  import Home from './routes/Home.svelte'; //Point to all the svelte code defining the routes and their pages
  import Vote from './routes/Vote.svelte';
  import Result from './routes/Result.svelte';

  const routes = { //Assign "urls" too all these routes
    '/' : Home,
    '/vote/:id' : Vote,
    '/result/:id' : Result
  }
</script>

<main>
  <Router {routes} />
</main>
