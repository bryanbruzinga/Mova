<template>
  <div id="app">
    <Cabecalho />
    <router-view class="container"></router-view>
  </div>
</template>

<script>

import Cabecalho from './components/Cabecalho.vue';

export default {
  name: 'App',
  components: {
    Cabecalho
  }
}
</script>

<style>

* {
box-sizing: border-box;
}

body,
ul,
li,
h1,
h2,
p {
  margin: 0;
  padding: 0;
}

a {
text-decoration: none;}

ul {
  list-style: none;
}

#app {
  background: var(--background);
}

.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

:root {
  --primary-color: #6D2080;
  --secondary-color: #8D8D8D;
  --background: ##E5E5E5;
  --font-primary: 'Montserrat', sans-serif;
  --font-size-14: 0.875rem;
  --font-size-16: 1rem;
  --font-size-18: 1.125rem;
}

</style>
