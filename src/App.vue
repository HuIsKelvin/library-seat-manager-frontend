<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>

export default {
  name: 'app',
}
</script>

<style lang="scss">
@import './element-variables.scss';

* {
  box-sizing:border-box;
  -moz-box-sizing:border-box; /* Firefox */
  -webkit-box-sizing:border-box; /* Safari */
}

html,
body {
  margin: 0;
  margin-top: 0;
  padding: 0;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center;
  color: #2c3e50; */
  /* background-color: #f7f8fa; */
  background-color: $color-grey-light;
  margin: 0;
  min-width: 800px;
  width: 100%;
  min-height: 100%;
}

a {
  text-decoration: none;
}
</style>
