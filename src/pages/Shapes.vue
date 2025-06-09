<script setup>
import { ref,onMounted ,reactive,computed,watch,watchEffect ,useTemplateRef} from 'vue'
import hljs from 'highlight.js';
import 'highlight.js/styles/monokai.min.css';
import 'highlight.js/styles/atom-one-dark.min.css';
import hljsVuePlugin from "@highlightjs/vue-plugin";
import WeDoChart from '../components/WeDoChart.vue';
import Navi from '../web/Header.vue';
const fdate = ref(new Intl.DateTimeFormat("sv-SE", { month: "short", day:"numeric", timeZone: "MET" }));
import {Bank} from '../components/bank.js';
const act = ref({type:'dot',x:0,y:0,price:-65,tm:"2018-04-24"})
, rows=reactive(new Array()), ds=reactive(new Array())
, sp=reactive(new Array());
const  bank1 = new Bank(),hlight=ref(null), chart=ref(null);
const data= computed(() => bank1.getData("sto")),upi =ref(0) ;

onMounted( async () => {
	rows.length=0;
	ds.length=0;
	document.querySelectorAll('pre code').forEach((el) => {
		hljs.highlightElement(el);
	});
	Array.prototype.push.apply(ds , bank1.getData("sto")[0].data);
	Array.prototype.push.apply(rows , bank1.getData("sto"));
	console.log( " s-->",rows, rows[0]?.data.length);
	chart.value.loadChart();
	
})

//active game click
const gact = async (t,p)=>{
	const ff = ds.find(a=>a.class=='active');
	//console.log(' -------ff:', ff);
	if (ff) ff.class="";
	const f = ds.find(a=>a.tm==t && a.price==p);
	act.value=f;
	if (!sp.find(a=>a.tm==t && a.price==p)){
		sp.push({type:'dot',price:act.value.price,tm:act.value.tm});
	}
	
	f.class="active";
	//console.log(t,p,' gact:', f);
}
const hljsText=computed( ()=> { 
	let str="";
	sp.forEach((a,i)=>{
     if (i==0){
     	str = `const sp = [{type:'dot',x:0,y:0,price:${a.price},tm:${a.tm}}`
     } else {
     	str+=`,{type:'dot',x:0,y:0,price:${a.price},tm:${a.tm}}`
     }
    
	});
	str+=(sp.length>0)?"];":" Click on any row in table"
	//let str =`const sp = [{type:'dot',x:0,y:0,price:${act.value.price},tm:${act.value.tm}},];`
	return hljs.highlight(str,  {language: 'js'}).value;
})

const hljsText3=computed( ()=> { 
	console.log( " hljsText3 ------------------->", hljsText3);
	let str =`<WeDoChart(ref="chart"  :ds="{width:700,height:500}" :points="data" :timefotmat="fdate" :shapes="sp")/>`
	return hljs.highlight(str,  {language:'js'}).value;
})


</script>

<template lang="pug">
header
	Navi(id="mynav" active="5")
body
	main
	.my-grid
		.left-side
			article
				h4 :shapes
				.box
					p
						| You can easy mark any point of the chart providing array of the special data points in  format like
						code {type:'dot',x:0,y:0,price:-65,tm:"2018-04-24"}
						|  currently supported type is dot.
			.mini-grid
				.tbl-header
					table.fx-tb
						thead
							tr
								th tm
								th price
					.tbl-content
						table.fx-tb(cellpadding='1' cellspacing='1' border='1' )
							tbody
								tr(v-for="c in ds" @click="gact(c.tm,c.price)" :class="c.class")
									td {{c.tm}}
									td {{c.price}}
				pre
					code(class="language-js" v-html="hljsText")
						
		.right-side
			WeDoChart( ref="chart" tky="5" fs="12" :ds="{width:600,height:400}" :points="rows" :timefotmat="fdate" :limit="12" :shapes="sp")
			pre
				code(class="language-js" v-html="hljsText3")
			
			

		
</template>

<style lang ="stylus">
@import '../assets/theme.styl'
@import '../assets/select-my.styl'
@import '../assets/fxtable.styl'			
$colorPlot = #0074d9
$colorAxis = #0074d9
code
	white-space:normal;
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
.mini-grid
	margin 0.1em 0.1em
	display grid
	width 100%
	grid-template-columns 1fr 1fr;
	&.left
		margin 0.1em 0.1em
		max-height 50vh
	&.right
		margin 0.1em 0.1em
		max-height 30vh		
.my-grid
	margin 0.1em 0.1em
	display grid
	width 100%
	grid-template-columns 1fr 1fr;
.right-side
	margin 0.2em 0.1em
	padding 0.1em 1em
	background-color #feeffe
	max-height 90vh
	text-align left
.central
	min-width 600px
	background-color #efde
.left-side
	margin 0.2em 0.1em
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
.cbox 
	border: 1px solid #1111eee;
	padding 0.1em 0.1em
	background-color #111
	width auto
	height auto

</style>