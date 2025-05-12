<script setup>
import { ref,computed} from 'vue'
import WeDoChart from '../components/WeDoChart.vue'
import Navi from '../web/Header.vue'
import hData from '../web/hLightData.vue'
const fdate = new Intl.DateTimeFormat("sv-SE", { dateStyle: "short", timeZone: "MET" });
import {Bank} from '../components/bank.js'
const  bank1 = new Bank(),tky =ref(3),fs =ref(8),sz =ref(5) ,ofz =ref(5);
const data= computed(() => bank1.getData("sto")) ,tsz =computed(() =>({ size:sz.value, off:ofz.value }));

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
    .central
      article.tide  
        h4 :tky
        p This props control number of ticks on the y-axis.
        input( type="range" id="tky" name="tky" min="1" max="11" v-model="tky")
      WeDoChart(:ds="{width:600,height:400}" :points="data" :timefotmat="fdate" :limit=17 theme="berry" :tky="tky" :fs="fs" :tsz="tsz")  
    .right-side
      article.box  
        h4.tide :tsz
        p This property deal with tick mark on the both axis. You can change size of ticks and labels offset. Property have a type of object.
        input( type="range" id="tsz" name="tsz" min="3" max="11" v-model="tsz")
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
  border: 1px solid #f76707;
  border-radius: 5px;
  padding: 10px;
  inline-size: 30ch;
  margin-block-end: 1em;
</style>