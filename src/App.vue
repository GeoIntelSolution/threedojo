<template>
  <div id="app">
    Hello
  </div>
</template>

<script>
import Worker from './my.worker.js';

export default {
  name: 'App',
  components: {
  },
  created(){
    const wk =new Worker();
    wk.postMessage({
      type:'start_worker',
      msg:'hi'
    })

    wk.onmessage=(e)=>{
      console.log(e.data)
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
