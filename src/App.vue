<template>
  <div>
    <Header />
    <router-view class="container"></router-view>
  </div>
</template>

<script>

import Header from './components/Header.vue';

export default {
  name: 'App',
  components: {
    Header
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

.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

:root {
  --primary-color: #6D2080;
  --font-primary: 'Montserrat', sans-serif;
}

</style>
