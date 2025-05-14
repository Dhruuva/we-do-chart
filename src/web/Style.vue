<template lang="pug">
body
	main
	.my-grid
		.left-side
			pre
				code(class="language-js")
					const  bank1 = new Bank()
		.right-side
			p right
			WeDoChart(tky="7" fs="18" :ds="{width:700,height:600}" :points="data" :timefotmat="fdate" :limit=17 ) 	
</template>


<script setup>
	import { ref,onMounted ,reactive,computed,watch,watchEffect ,useTemplateRef} from 'vue'
	import { Icon } from '@iconify/vue';
	import {Bank} from '../components/bank.js';
	import WeDoChart from '../components/WeDoChart.vue'
  import hljsVuePlugin from "@highlightjs/vue-plugin";
  import hljs from 'highlight.js';
  import 'highlight.js/styles/an-old-hope.min.css';

	const  bank1 = new Bank()
	const data= computed(() => bank1.getData("sto"))
	const fdate = new Intl.DateTimeFormat("sv-SE", { dateStyle: "short", timeZone: "MET" });
	

</script>
<style lang ="stylus">
@import '../assets/theme.styl'	
$colorPlot = #0074d9
$colorAxis = #0074d9
.my-grid
	display grid
	width 100%
	grid-template-columns 1fr 1fr;
.right-side
	 background-color #feeffe
.central
	min-width 600px
	background-color #efde
.left-side
	height auto
	min-width 600px
	min-height 80vh
	background-color #d2efde

</style>