import App from './App.svelte'; //Import App.svelte the connects all the routes.

const app = new App({
  target: document.body,
  props: {
    name: 'PollApp',
  },
});

export default app;
