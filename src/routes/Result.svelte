<script>
  export let params;

  function getPercent(poll){
    //Return a percentage for the number of votes based on the collective amount of votes
    const largest = Math.max(...poll.answers.map(o => o.vote));

    for(let i = 0; i<poll.answers.length; i++){
      if(largest){
        poll.answers[i].percent = Math.round(poll.answers[i].vote * (100 / largest));
      } else{
        poll.answers[i].percent = 0;
      }
    }
    return poll;
 }

  async function fetchData() {
    //Use the get('poll/:id') route to get votes and answers
    const url = '/api/poll/' + params.id;
    const response = await fetch(url);
    const isJson = response.headers.get('content-type')?.includes('application/json');
    const data = isJson ? await response.json() : null;

    if(response.ok){
      return getPercent(data);
    }else{
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
    {#each poll.answers as ans}
      <div class="label">{ans.answer}</div>
      {#if ans.percent}
        <div class="bar" style="width:{ans.percent}%">{ans.vote}</div>
      {:else}
        <div class="barzero" style="width:{ans.percent}%">{ans.vote}</div>
      {/if}
    {/each}
  {:catch error}
    <h1>{error}</h1>
  {/await}
</main>

<style>
  .bar{
    background-color: green;
  }
  .barzero{
    background-color: green;
  }
  @keyframes slide {
    0% {
      color: green;
      transform: scaleX(0);
    }
    90% {
      color: green;
    }
    100% {
      color: #fff;
      transform: scaleX(1);
    }
  }
</style>
