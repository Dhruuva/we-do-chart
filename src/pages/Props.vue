<script setup>
import { ref,computed,watch,onMounted} from 'vue'
import WeDoChart from '../components/WeDoChart.vue'
import Navi from '../web/Header.vue'
import hChart from '../web/hLightChart.vue'
const fdate = new Intl.DateTimeFormat("sv-SE", { dateStyle: "short", timeZone: "MET" });
import {Bank} from '../components/bank.js'
const  bank1 = new Bank(),tky =ref(3),fs =ref(10),sz =ref(5),ofz =ref(5),scl =ref(0.46),off =ref(2)
, chart=ref(null), hlight=ref(null) ,grid =ref(true),limit =ref(10);
const data= computed(() => bank1.getData("sto")) ,tsz =computed(() =>({ size:+sz.value, off:+ofz.value }));
onMounted( async () => {
  chart.value.loadChart()
})
watch(sz, (vv) => {
  console.log( " sz --->",tsz.fn(),vv);
  chart.value.loadChart();
});
watch(ofz, (vv) => {
  console.log( " ofz --->",vv);
  chart.value.loadChart();
});
watch(fs, (v) => {
  console.log( " fs --->",v, tsz.fn());
  chart.value.loadChart();
});

watch(tky, (v) => {
  console.log( " tky --->",v, tsz.fn());
  chart.value.loadChart();
});
watch(scl, (v) => {
   console.log( " scll --->",v);
   chart.value.loadChart();
});
watch(limit, (v) => {
  console.log( " limit --->",v);
  hlight.value.update()
  chart.value.loadChart();
});



</script>


<template lang ="pug">
header
  Navi(id="mynav" active="3")
body
  main
  .my-grid
    .left-side
      article.box 
        h4.tide :fs
        p Use this property to set appropriate font-size for axis labels and chart legend.
        input( type="range" id="fs" name="fs" min="8" max="14" v-model="fs")
      article.box 
        h4.tide :scl
        p
          |Use it in same cases, you wish to change size of the slider. Default value  
          code 0.46 
          |If you have no need in slider just set it at 
          code 0.00  
        input( type="range" id="scl" step="0.05"  name="scl" min="0.00" max="0.99" v-model="scl")
      article.box 
        h4.tide :limit
        p Property would be useful when you are need set minimum data points at that decreasing chart become unpossible.
        input(type="range" id="limit" step="1"  name="limit" min="5" max="90" v-model="limit")
    .central
      table
        tbody
          tr
            td.tide2
              h4 :tky
              p This props control number of ticks on the y-axis.
              input( type="range" id="tky" name="tky" min="1" max="11" v-model="tky")
            td.tide2
              h4 :showGrid 
              p Property (boolean) hide/show  chart grid.
              input(v-model="grid" type="checkbox" id="grid" name="grid" :checked="grid")
      .tide          
        WeDoChart(ref="chart" :ds="{width:600,height:300}" :points="data" :timefotmat="fdate" :limit="+limit" theme="berry" :tky="tky" :fs="fs" :tsz="tsz" :scl="scl" :off="off" :showGrid="grid")
      hChart(ref="hlight" :tky="tky" :fs="fs" :tsz="tsz" :scl="scl" :off="off" :showGrid="grid" :limit="+limit")  
    .right-side
      article.box  
        h4.tide :tsz
        p This property deal with tick mark on the both axis. You can change size of ticks and labels offset. Property have a type of object. 
          code { size:5, off:5}
        table
          tbody
            tr
              td off:
              td  
                input( type="range" id="ofz" name="ofz" min="5" max="12" v-model="ofz")
            tr      
              td size:
              td      
                input( type="range" id="sz" name="sz" min="5" max="9" v-model="sz")
      article.box 
        h4.tide :off
        p Use it in same cases, you wish to increase charts offset. This property impact top and left chart offset. Default 2 percent of height-width correspondingly.
        input( type="range" id="off" name="off" min="2" max="14" v-model="off")            
           

</template>

<style lang ="stylus" >
@import '../assets/theme.styl'	
$colorPlot = #0074d9
$colorAxis = #0074d9
.one
  color #0035
.two
  color #ee012035
.tre
  color #524
.for
  color #ee3524       
.my-grid
  display grid
  width 100%
  grid-template-columns 1fr 3fr 1fr;
.right-side
   background-color #feeffe
.central
  min-width 600px
  background-color #efde
.left-side
  background-color #d2efde
.tide
  line-height 0.1em
  padding 0.1em
  margin 0.1em
.wrap
  word-break:break-word;
  max-width: 100px; 
  white-space: pre;
.box 
  border: 1px solid #eee;
  border-radius: 5px;
  padding: 10px;
  inline-size: 30ch;
  margin-block-end: 0.01em;
input
  margin 0px
.tide2
  line-height 0.8em
  padding 0.1em 1.5em
  margin 0.1em 1.1em
  font-size 0.9em 
  border: 1px solid #eee;
</style>