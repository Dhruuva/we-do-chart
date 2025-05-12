<script setup>
import { ref,computed,useTemplateRef} from 'vue'  
import WeDoChartDev from './components/WeDoChartDev.vue'
import {Bank} from './components/bank.js'
const  bank1 = new Bank(), chart= ref(null),tky1= ref(2);
const data= computed(() => bank1.getData("sto"))
const fdate = new Intl.DateTimeFormat("sv-SE", { dateStyle: "short", timeZone: "MET" });
//const chartRef = useTemplateRef('chart')
const reload =()=>{
  tky1.value=5;
 // chart.value.f(343);
   
  chart.value.loadChart();
   console.log( " reload chart -->")
}
 
</script>

<template>
  <header>
    <button @click="reload()">Reload </button>
  </header>
  <WeDoChartDev ref="chart" :ds="{width:600,height:400}" :tky="tky1" :points="data" :timefotmat="fdate" :limit=17 theme="berry" />
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
