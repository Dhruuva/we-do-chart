<script setup>
import { ref,onMounted ,reactive,computed,watch,watchEffect ,useTemplateRef} from 'vue'
import WeDoChart from '../components/WeDoChart.vue'
import Navi from '../web/Header.vue'
import hData from '../web/hLightData.vue'
const fdate = ref(new Intl.DateTimeFormat("gb-GB", { hour: "2-digit", minute:"2-digit",timeZone: "America/Panama" }));
import {Bank} from '../components/bank.js';
const  bank1 = new Bank(),fts =reactive(new Array(
		 new Intl.DateTimeFormat("ar-EG", { month: "short", day:"numeric", timeZone: "Asia/Dubai"})
		,new Intl.DateTimeFormat("ko-KR", { month: "short", day:"numeric", timeZone: "Asia/Seoul" })
		,new Intl.DateTimeFormat("ja-JP", { month: "short", day:"2-digit", timeZone: "Asia/Tokyo" })
		,new Intl.DateTimeFormat("gb-GB", { hour: "2-digit", minute:"2-digit",timeZone:"Pacific/Midway"})
));
const data= computed(() => bank1.getData("sto"));
watch(fdate, (newX) => {
  console.log(`fdate is ${newX}`)
})

</script>

<template lang="pug">
header
	Navi(id="mynav" active="4")
body
	main
	.my-grid
		.left-side
			article
				h4 :timefotmat
				.box
					p
						|In case time series data this property change format x-axis labels. It represent the  
						code Intl.DateTimeFormat
						|  object. You can use any language in date and time formatting also using different time zones for displaying. 
					table
						tbody
							tr
								td
									input( type="radio" id="ar" name="drone" :value="fts[0]" checked v-model="fdate")
									label( for="ar")
										code ("ar-EG", { month: "short", day:"numeric", timeZone: "Asia/Dubai"} )
							tr
								td
									input( type="radio" id="ko" name="drone" :value="fts[1]" v-model="fdate" )
									label( for="ko")
										code ("ko-KR", { month: "short", day:"numeric", timeZone: "Asia/Seoul" })
							tr
								td
									input( type="radio" id="ja" name="drone" value="fts[2]" v-model="fdate")
									label( for="ja")
										code ("ja-JP", { month: "short", day:"2-digit",timeZone: "Asia/Tokyo" })
							tr
								td
									input( type="radio" id="intra" name="drone" value="fts[3]" v-model="fdate")
									label( for="intra")
										code ("gb-GB", { hour: "2-digit", minute:"2-digit",timeZone:"Pacific/Midway"})					
		.right-side
			WeDoChart(tky="7" fs="16" :ds="{width:700,height:500}" :points="data" :timefotmat="fdate"   )
			

		
</template>

<style lang ="stylus">
@import '../assets/theme.styl'
@import '../assets/select-my.styl'		
$colorPlot = #0074d9
$colorAxis = #0074d9
.fly
	float: right;
	padding 0.1em 1em
	z-index 100
	margin-left -3rem
	&:hover
		border 1px solid #0f5ef3
		background-image linear-gradient(to bottom, #9eee, #eee)
	&:active 
		color rgb(213, 251, 251)
		text-shadow 1px 2px 0 rgba(0,0,0,0.5)
		background-image: linear-gradient(to bottom, #a7c3f4, #103675);
		border 1px solid rgba(0,0,0,0.3)
		border-style groove
		box-shadow: 0.3em 0.3em  rgb(10, 38, 46) groove;
.my-grid
	display grid
	width 100%
	grid-template-columns 1fr 1fr;
.right-side
	padding 0.1em 1em
	background-color #feeffe
	max-height 80vh
	text-align left
.central
	min-width 600px
	background-color #efde
.left-side
	padding 0.1em 1em
	height auto
	min-width 600px
	max-height 80vh
	overflow-y scroll 
	white-space nowrap
	background-color #F0F0F0
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
	border-radius 5px
	padding: 0.1em 0.1em
	inline-size: 60ch;
	margin-block-end: 0.01em;
	white-space: pre-line;
h5,h4,h3,p,button,pre,code
	margin 0.2em 0.1em
	
.tide2
	line-height 0.8em
	padding 0.1em 1.5em
	margin 0.1em 1.1em
	font-size 0.9em 
	border: 1px solid #eee;

</style>