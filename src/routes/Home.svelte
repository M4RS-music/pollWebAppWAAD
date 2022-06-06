<script>
//Define the functionality of the home page for creating polls
  import { onMount, tick } from 'svelte';
  import {replace} from 'svelte-spa-router';
  import autosize from 'svelte-autosize';

  let poll = { //Temporary structure for storing data necessary for defining a poll in the db
    question: '',
    answers: ['','','']
  }

  onMount(() => document.querySelector('textarea:first-of-type').focus()); //Start cursor on the first textbox

  async function addAnswer(e){ //Add a new field in poll.answers(each element bound in <main>) thus adding a new textarea
    e.preventDefault();
    poll.answers = [...poll.answers, ''];
    await tick();
    document.querySelector('textarea:last-of-type').focus();
  }

  async function removeAnswer(e){ //Remove the last element of poll.answers thus removing the bound textarea
    e.preventDefault;
    poll.answers = [...poll.answers.slice(0, poll.answers.length - 1)];
    await tick();
    document.querySelector('textarea:last-of-type').focus();
  }

  function keyControl(e){
    const lastEl = document.querySelector('textarea:last-of-type');
    const focusedEl = document.activeElement;
    if(lastEl === 'Enter'){
      addAnswer(e);
    }else if(e.key === 'Backspace'){
      if(focusedEl.value === ''){
        removeAnswer(e);
      }
    }
  }

  async function publish(){//Use the post route to publish the created poll
    try{
      const url = '/api/poll';
      const response = await fetch(url, {
        method: 'post',
        body: JSOM.stringify(poll),
        headers: {'Content-Type': 'application/json'}
      });
      const isJson = response.headers.get('content-type')?.includes('application/json');
      const data = isJson ? await response.json() : null;

      if(response.ok){
        replace('/vote/' + data.id);
      }else{
        const error = (data && data.message) || response.status;
        throw new Error(error);
      }
    } catch(error){
      alert(error);
    }
  }
</script>
<main>
  <form on:submit|preventDefault={publish}>
    <div class="label">Question</div>
    <textarea rows="3"
      bind:value={poll.question}
      required
      on:keydown={keyControl}
      use:autosize
    ></textarea>
    <div class="label">Answers</div>
    {#each poll.answers as ans}
      <textarea rows="3"
        bind:value={ans}
        required
        on:keydown={keyControl}
        use:autosize
      ></textarea>
    {/each}
    <div id="buttons">
      <button on:click={addAnswer}>Add</button>
      <button on:click={removeAnswer}>Delete</button>
      <button type="submit">Publish</button>
    </div>
  </form>
</main>
