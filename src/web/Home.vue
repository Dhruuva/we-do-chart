<template lang="pug">
body
	main
	.my-grid
		.left-side
			article
				h4 Customization appearance
				.box
					p
						|Default styles maybe overridden in your page style section. You can also create custom style follow example in right panel. Then your style be ready just set its name in theme attribute of the component.
			Styler
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
	import Styler from '../web/Styler.vue'

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
	padding 0.1em 1em
	background-color #feeffe
	max-height 80vh
	
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
h5,h4,h3,p
	margin 0.1em
	
.tide2
	line-height 0.8em
	padding 0.1em 1.5em
	margin 0.1em 1.1em
	font-size 0.9em 
	border: 1px solid #eee;

</style>