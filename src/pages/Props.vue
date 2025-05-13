<script setup>
import { ref,computed,watch,onMounted} from 'vue'
import WeDoChart from '../components/WeDoChart.vue'
import Navi from '../web/Header.vue'
import hData from '../web/hLightData.vue'
const fdate = new Intl.DateTimeFormat("sv-SE", { dateStyle: "short", timeZone: "MET" });
import {Bank} from '../components/bank.js'
const  bank1 = new Bank(),tky =ref(3),fs =ref(8),sz =ref(5),ofz =ref(5),scl =ref(0.46), chart=ref(null);
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
        p Use it in same cases, you wish to change size of the slider. Default value  
          code 0.46 
        input( type="range" id="scl" step="0.05"  name="scl" min="0.00" max="0.99" v-model="scl")    
    .central
      article.tide  
        h4 :tky
        p This props control number of ticks on the y-axis.
        input( type="range" id="tky" name="tky" min="1" max="11" v-model="tky")
      WeDoChart(ref="chart" :ds="{width:600,height:400}" :points="data" :timefotmat="fdate" :limit=17 theme="berry" :tky="tky" :fs="fs" :tsz="tsz" :scl="scl" )  
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
  margin-block-end: 1em;
</style>