<template>
  <div id="app">
    <h1>Page A</h1>
    <div id="nav">
      <router-link to="/">A-Home</router-link> |
      <router-link to="/about">A-About</router-link>
      <br>
      <br>
      <a href="/pb.html">To Page B</a> |
      <a href="/pc.html">To Page C</a> |
      <a href="/pd.html">To Page D</a> |
      <a href="/pe.html">To Page E</a> |
      <a href="/pf.html">To Page F</a>
    </div>
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'app',
  created() {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker
          .register('/service-worker.js')
          .then(registration => {
            console.log(registration)
            console.log('ServiceWorker registration successful')
          })
          .catch(err => {
            console.log('ServiceWorker registration failed: ', err)
          })
      })
    }
  }
}
</script>

<style lang="stylus">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
