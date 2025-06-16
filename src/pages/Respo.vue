<script setup>
import { ref,onMounted ,reactive,computed,watch,watchEffect ,useTemplateRef} from 'vue'
import hljs from 'highlight.js';
import hljsVuePlugin from '@highlightjs/vue-plugin'
import http from 'highlight.js/lib/languages/http'
import xml from 'highlight.js/lib/languages/xml'
import json from 'highlight.js/lib/languages/json'
hljs.registerLanguage('http', http)
hljs.registerLanguage('xml', xml)
hljs.registerLanguage('json', json)
const highlightjs=hljsVuePlugin.component;

import hChart from '../web/hLightChart.vue';
import WeDoChart from '../components/WeDoChart.vue';
import Navi from '../web/Header.vue';
import {Bank} from '../components/bank.js';
const  bank1 = new Bank();
const fdate = ref(new Intl.DateTimeFormat("sv-SE", { month: "short", day:"numeric", timeZone: "MET" }));
const  rightDrug=ref(false),moveDrug=ref(false),upDrug=ref(false),upDrugMove=ref(false),
		leftX=ref(50),leftY=ref(50),top=ref(0),topp=ref(1),w1=ref(null),h1=ref(null)
		, offx = ref(0), offy = ref(0),fs =ref(10), chart=ref(null),lmt=ref(10)
		, wh=reactive({width:0,height :0 }),divHeight=reactive({upDiv:0,dwDiv:0}),xy=reactive(new Array());

onMounted( async () => {

	window.addEventListener('resize', reSize);	
	init();
	let dwDiv = document.getElementsByClassName('split down right border');
	w1.value=dwDiv[0].getBoundingClientRect().width;
	h1.value=dwDiv[0].getBoundingClientRect().height;
	
})
const data= computed(() => {
	const ch = bank1.getData("sto")
	ch[0].name="Responsive chart."
	return  ch;
})
,upi =ref(0) 
,data1= computed(() => {
	const ch = bank1.getData("equity");
	ch[0].name="Fixed chart."
	return  ch;
});

const  init=()=>{
	setTimeout(()=>{
		initLayout();
	},25);
}

const reSize=()=>{
	setTimeout(()=>{
		init();
		let dwDiv = document.getElementsByClassName('split down right border');
		w1.value=dwDiv[0].getBoundingClientRect().width;
		h1.value=dwDiv[0].getBoundingClientRect().height;

	},20);
}

const hljsText=computed( ()=> { 
	let str =`
	import { ref,computed} from 'vue'
	const w=ref(null),h=ref(null)
	const parent = document.getElementsByClassName('your parent div')
	w.value=parent[0].getBoundingClientRect().width
	h.value=parent[0].getBoundingClientRect().height
	const dset = computed( () => ( {width:w1.value,height:h1.value} ) )

	 `
	return hljs.highlight(str,  {language: 'js'}).value;
})

const hcode=computed( ()=> { 
	let str =`<WeDoChart(ref="chart" :ds="dset" :points="data" )/>`
	return str
})

const initLayout=()=>{
	let top0= document.getElementById('mainLook_root').getBoundingClientRect().top;
	wh.width = window.innerWidth
	wh.height = window.innerHeight
	top.value = top0;
	topp.value =(top0)*100/window.innerHeight;

	let upDiv = document.getElementsByClassName('split upper left border')
	divHeight.upDiv=upDiv[0].getBoundingClientRect();
	let dwDiv = document.getElementsByClassName('split down left border')
	divHeight.dwDiv=dwDiv[0].getBoundingClientRect();
}			

const getLocation=(e)=> {
	e.preventDefault();
	let xx = 0, yy = 0;
	if (e.touches) {
		xx = e.touches[0].pageX;
		yy = e.touches[0].pageY;
	} else {
		xx = e.pageX;
		yy = e.pageY;
	}
	xy[0]=xx;xy[1]=yy;
	return [xx, yy];
}

watch(() => xy,  (newValue, oldValue) => {
	movePanelUp();
	movePanel();
	//console.log( " xy --->",newValue);
	 
}, { deep: true });



const leftStyle= computed( ()=> {
	return " width: "+leftX.value + "%;height: "+(leftY.value-topp.value) + "%;"
})
const rightStyle= computed( ()=>{
	return " width: "+ (80-leftX.value) + "%;height: "+(leftY.value-topp.value) + "%;"
})
const upStyle= computed( ()=>{
	return " height: "+leftY.value + "%;"
})
const downStyle= computed( ()=>{
	return " top: "+ (leftY.value) + "%;width: "+leftX.value + "%;height: "+(80-(leftY.value-topp.value*0.3) ) + "%;"
})
const downRightStyle= computed( ()=>{
	return " top: "+ (leftY.value) + "%;width: "+(80-leftX.value) + "%;height: "+(80-(leftY.value-topp.value*0.3) ) + "%;"
})

const startLeftDrug = () => {
	let elem = document.getElementsByClassName('split upper left border')
	offx.value =elem[0].offsetWidth-xy[0]
	leftX.value = (xy[0]+offx.value)*100/(wh.width)
	if (rightDrug.value){
		moveDrug.value = true;
	}
}
const startUpDrug = () => {
	let elem = document.getElementsByClassName('split down left border')
	offy.value = elem[0].offsetTop-xy[1]
	if (upDrug.value){
		upDrugMove.value = true;
	}
}

const movePanel= () => {
	if (moveDrug.value && !upDrugMove.value) leftX.value =(xy[0]+offx.value)*100/(wh.width);

}
const	movePanelUp= () => {
	if (upDrugMove.value && !moveDrug.value){
		let h=(xy[1]+offy.value)*100/(wh.height);
		leftY.value = h;
	}
}

const stopDrag= () =>  {
	moveDrug.value = false;
	upDrugMove.value = false;
	let dwDiv = document.getElementsByClassName('split down right border');
	w1.value=dwDiv[0].getBoundingClientRect().width;
	h1.value=dwDiv[0].getBoundingClientRect().height;
	

}

const dset = computed( () => ( {width:w1.value,height:h1.value} ) );
</script>

<template lang="pug">
header
	Navi(id="mynav" active="6")
body
	#mainLook_root(ref="root" @mousemove='getLocation' style='height:50%;' @mouseup="stopDrag")
		.split.upper.left.border(:style='leftStyle')
			.thumb(@mousedown='startLeftDrug()' @mouseenter='rightDrug=!rightDrug' @mouseleave='rightDrug=!rightDrug')
			article
				.box
					h4 How make it responsive
					p 
						|In this case you need to handle tracking the width and height of parent chart container window after resizing event. After this just pass them to chart property named 
						strong ds 
						| for example like this 
						code :ds="{width:400,height:200}" 
						| and in vue best way to do it throught computed property. 
						strong ds 
						| property used for define chart size.
		.split.upper.right.border(:style='rightStyle')
			.tide2 
				WeDoChart(ref="chart2" :ds="{width:350,height:170}" :points="data1" :timefotmat="fdate" :fs="9"
				 :tky="3" :scl="0" theme="monaco")
		.split.down.left.border(:style='downStyle')
			.thumbUp(@mousedown='startUpDrug()' @mouseenter='upDrug=!upDrug' @mouseleave='upDrug=!upDrug')
			.my-grid
				pre.hljs
					code(class="js" v-html="hljsText")
				highlightjs(autodetect :code="hcode")
		.split.down.right.border(:style='downRightStyle')
			.tide2
				.chart-box
					WeDoChart( ref="chart" :limit="lmt" :fs="fs" :ds="dset" :points="data" :timefotmat="fdate")
</template>
<style type="text/css">
/*	@import 'highlight.js/styles/an-old-hope.min.css';
	@import 'highlight.js/styles/atom-one-dark-reasonable.css';*/
	@import 'highlight.js/styles/monokai-sublime.min.css';
</style>

<style lang ="stylus">
@import '../assets/theme.styl'
@import '../assets/select-my.styl'
*
	-webkit-touch-callout:none;
	-webkit-user-select:none;
	-moz-user-select:none;
	-ms-user-select:none;
	user-select:none;
	margin: 0;
	padding: 0;
	box-sizing: border-box;	
$colorBorder = coral
$colorBg = coral
thumb-style(n)
	border-color $colorBorder
	border-style groove
	background-color $colorBg
	border-width n
border-radius(n)
	-webkit-border-radius n
	-moz-border-radius n
	border-radius n
header
	width 100%	
pre
	text-align left	
	code
		white-space pre
		text-align left
.my-grid
	max-width 600px
	display block;
	padding 1rem

#mainLook_root
	display flex
	padding 0rem 1rem
	width 100%
	&::before,
	&::after 
		padding 2rem 1rem
		width 1280px
.split
	width 50%
	height  90%
	position fixed
	z-index 1
	padding 0
	overflow-x hidden
	overflow-y hidden
	&.upper
		margin-top 9px
		top auto
		height 1
	&.down
		margin-top 10px
		height 1	
		background-color transparent	 	
	&.left
		left 10%
	&.right
		right 10%
	&.border	
		border-style groove
		border-color $colorBorder
		border-width 1px
.thumb 
	position absolute
	height 35px
	width 5px
	right 0
	top 45%
	border-radius(5px)	
	thumb-style(2px)
	&:hover
		cursor ew-resize
.thumbUp 
	position absolute
	height 5px
	width 35px
	right 0
	top 0
	left 45%	
	border-radius(5px)
	thumb-style(2px)
	&:hover
		cursor ns-resize			
article 
	display: inline-flex;
	text-align: left;
	margin 0.2em 0.1em
.chart-box
	margin 0 0
	padding 0 0
	display flex
	width 100%
	height stretch
.box 
	border: 1px solid white;
	border-radius 5px
	padding: 0.1em 0.1em
	inline-size: 60ch;
	margin-block-end: 0.01em;
	white-space: pre-line;	

h5,h4,h3,p,button
	margin 0.2em 0.1em
.tide2
	line-height 0.8em
	padding 0.5em 0.5em

</style>