<script setup>
import { ref,computed} from 'vue'  
import HelloWorld from './components/HelloWorld.vue'
import {Bank} from './components/bank.js'
const  bank1 = new Bank()
const data= computed(() => bank1.getData("sto"))
const fdate = new Intl.DateTimeFormat("sv-SE", { dateStyle: "short", timeZone: "MET" });
</script>

<template>
  <HelloWorld msg="Vite + Vue" :ds="{width:600,height:400}" :points="data" :timefotmat="fdate"  />
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
