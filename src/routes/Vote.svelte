<script>
  export let params;
  import { replace } from 'svelte-spa-router';

  if(window.localStorage.hasOwnProperty('poll' + params.id)){
    replace('/result/' + params.id);
  }

  async function vote(id) {
    //Use patch to increment the amount of votes for a given answer
    //Bound to each button in <main> (showing answers) so that when the users clicks on one the vote is cast
    try{
      const url = '/api/poll/answer' + id;
      const response = await fetch(url, {method: 'PATCH'});
      const isJson = response.headers.get('content-type')?.includes('application/json');
      const data = isJson ? await response.json() : null;

      if(response.ok) {
        window.localStorage.setItem('poll' + params.id, id);
        replace('/result/' + params.id);
      } else{
        const error = (data && data.message) || response.status;
        throw new Error(error);
      }
    } catch (error){
      alert(error);
    }
  }



  async function fetchData() {
    //Use get route to get data for displaying the voting page
    const url = '/api/poll/' + params.id;
    const response = await fetch(url);
    const isJson = response.headers.get('content-type')?.includes('application/json');
    const data = isJson ? await response.json() : null;

    if(response.ok){
      return data;
    } else{
      const error = (data && data.message) || response.status;
      throw new Error(error);
    }
  }


</script>

<main>
  {#await fetchData()}
    <h1>Loading</h1>
  {:then poll}
    <h1>{poll.question}</h1>
    <div class="label">Click to vote</div>
    {#each poll.answers as ans}
      <button on:click={() => vote(ans.id)}>{ans.answer}</button>
    {/each}
  {:catch error}
    <h1>{error}</h1>
  {/await}
</main>
