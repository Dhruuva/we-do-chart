<script setup>
import { ref,computed,useTemplateRef,watch, onMounted,reactive} from 'vue'  
//import WeDoChartDev from './components/WeDoChartDev.vue'
import WeDoChartDev from './components/WeDoChart.vue'
import {Bank} from './components/bank.js'
const  bank1 = new Bank(), chart= ref(null),tky1= ref(2),scl= ref(0.7),off= ref(5);
const data= computed(() => bank1.getData("sto"));
const fdate = ref(new Intl.DateTimeFormat("ru-RU", { day:"2-digit",  timeZone: "MET" }));
const sp = new Array();
//const chartRef = useTemplateRef('chart')
const rows= reactive(new Array());
onMounted( async () => {
  Array.prototype.push.apply(rows, bank1.getData("sto"));
  // console.log(rows.value[0]?.data[0] )
  // console.log(rows.value[0]?.data.length,"==rows.value.length" )
  console.log(rows[0]?.data[0] )
  console.log(rows[0]?.data.length,"==rows.value.length" )
  chart.value.loadChart();

  //sp.push({type:'dot',x:0,y:0,price:284.22,tm:'2020-02-14'});
  sp.push({type:'dot',x:0.01,y:2,price:175.37,tm:'2020-01-18',class:'dotAlert',title:'alert',size:3});
  sp.push({type:'&#128545;',x:-18,y:45,price:184.22,tm:'2020-02-14',class:'emoj',title:'fall'});
  sp.push({type:'&#8679;',x:-8,y:1,price:145.6,tm:'2019-12-12',class:'dwtrg',title:'buy'});
  sp.push({type:'&#8681;',x:-16,y:7,price:281.94,tm:'2020-02-18',class:'uptrg',title:'sell'});

})

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
    <input type="range" id="off" name="off" min="5" max="35" step="1" v-model="off"></input>
  </header>
  <WeDoChartDev ref="chart" :ds="{width:600,height:400}" :tky="tky1" :points="rows" :timefotmat="fdate"  theme="berry" :scl="scl" :off="off" decimals="3" :shapes="sp"/>
</template>


<style >
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
.shape.dwtrg {
  stroke: #228b22;
  stroke-width: 1;
  fill: #008000;
  color: green;
  cursor: default;
  font-size: 18px;
}
.shape.uptrg {
  stroke: #ff7f50;
  stroke-width: 1;
  fill: #f00;
  color: #e60073;
  cursor: default;
  font-size: 18px;
}
.shape.ltrg {
  stroke: #3d3d5c;
  stroke-width: 1;
  fill: #669;
  cursor: default;
}
.shape.rtrg {
  stroke: #800080;
  stroke-width: 1;
  fill: #660;
  cursor: default;
}
.shape.emoj {
  font-size: 15px;
  padding: 1px;
  cursor: default;
}
.tooltip{
  font-size: inherit;
}
foreignObject {
  width: 25px;
  height: 25px;
}
.shape title {
  fill: #0f0;
  color: #f00;
  background-color: blue;
}


</style>
