<script setup>
import { ref,computed,watch} from 'vue'  
import Navi from './web/Header.vue'
import Home from './web/Home.vue'
import Start from './pages/Start.vue'


</script>

<template>
  <header>
    <Navi id="mynav" active="1"/>
  </header> 
  <body>
    <Start>
         </Start>
  </body>



  
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
