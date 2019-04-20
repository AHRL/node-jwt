<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
body, html {
  margin: 0;
  padding: 0;
}
#app {
  width: 100vw;
  height: 100vh;
  background: linear-gradient(45deg, rgb(205, 228, 243),#58a);
}
</style>
