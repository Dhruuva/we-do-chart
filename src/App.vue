<script setup>
import { ref,computed,useTemplateRef,watch} from 'vue'  
import WeDoChartDev from './components/WeDoChartDev.vue'
import {Bank} from './components/bank.js'
const  bank1 = new Bank(), chart= ref(null),tky1= ref(2),scl= ref(0.7);
const data= computed(() => bank1.getData("sto"));
const fdate = ref(new Intl.DateTimeFormat("ru-RU", { day:"2-digit",  timeZone: "MET" }));
//const chartRef = useTemplateRef('chart')
const reload =()=>{
  tky1.value=5;
 // chart.value.f(343);
   
  chart.value.loadChart();
   console.log( " reload chart -->")
}
watch(scl, (v) => {
  console.log(`scl is ${v}`);
   chart.value.loadChart();
}) 
const change=(v )=>{
  let o = fdate.value.resolvedOptions();
  console.log(" before -----",o.timeZone, o.locale)
  const f = new Intl.DateTimeFormat('ja-JP', { month:"short",day:"2-digit", timeZone: "Asia/Seoul"});
  const ff = new Intl.DateTimeFormat('ko-KR', { day:"2-digit" ,timeZone: "Asia/Omsk"});
  fdate.value =(v==1)?ff:f;
  console.log(v,fdate.value.resolvedOptions().timeZone)
  return 'ok'
}
</script>

<template>
  <header>
    <button @click="reload()">Reload </button>
    <button @click="change(1)"> Korean </button>
    <button @click="change(2)"> Japan</button>
    <input type="range" id="scl" name="scl" min="0" max="1" step="0.01" v-model="scl"></input>
  </header>
  <WeDoChartDev ref="chart" :ds="{width:600,height:400}" :tky="tky1" :points="data" :timefotmat="fdate" :limit=17 theme="berry" :scl="scl" />
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
