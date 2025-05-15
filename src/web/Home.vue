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
				button.fly( @click="copyText" )
					Icon(icon="prime:copy" height="29")
				Styler(ref="styler1")
		.right-side
			.box
				select.select-my(v-model="act" name="option")
					option(value="default") default
					option(value="monaco") monaco
					option(value="berry") berry
			WeDoChart(tky="7" fs="16" :ds="{width:700,height:500}" :points="data" :timefotmat="fdate" :theme="act"  )
			textarea#aria(:style="aStyle" rows="1" :value="txt" )
			hChart(:theme="act")


</template>


<script setup>
	import { ref,onMounted ,reactive,computed,watch,watchEffect ,useTemplateRef} from 'vue'
	import { Icon } from '@iconify/vue';
	import {Bank} from '../components/bank.js';
	import WeDoChart from '../components/WeDoChart.vue';
    import Styler from '../web/Styler.vue';
    import hChart from '../web/hLightChart.vue'

	const  bank1 = new Bank(),styler1=ref(null), aStyle=ref("visibility: hidden;") ,txt=ref("no");
	const data= computed(() => bank1.getData("sto"));
	const fdate = new Intl.DateTimeFormat("sv-SE", { dateStyle: "short", timeZone: "MET" })
	,themes=reactive(new Array("default","monaco","berry")), act=ref("default");

	const copyText=()=>{
		aStyle.value="visibility: visible;"
		txt.value=styler1.value.cssCode;
		setTimeout(()=>{
			let aria = document.getElementById("aria");
			aria.focus();
			aria.select(); 
			document.execCommand("copy");
			aStyle.value="visibility: hidden;"   
		},25);
		return 'ok';  	 
	}
	
</script>
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