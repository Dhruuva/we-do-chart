<script setup>
import { ref,computed} from 'vue'
import WeDoChart from '../components/WeDoChart.vue'
import Navi from '../web/Header.vue'
import hData from '../web/hLightData.vue'
const fdate = new Intl.DateTimeFormat("sv-SE", { dateStyle: "short", timeZone: "MET" });
import {Bank} from '../components/bank.js'
const  bank1 = new Bank()
const data= computed(() => bank1.getData("sto"))
</script>


<template lang ="pug">
header
  Navi(id="mynav" active="3")
body
  main
  .my-grid
    .left-side
    
    .central  
      h4 :tky
      WeDoChart(:ds="{width:600,height:400}" :points="data" :timefotmat="fdate" :limit=17 theme="berry")
    
    .right-side
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
  </style>