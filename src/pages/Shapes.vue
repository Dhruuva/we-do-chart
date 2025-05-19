<script setup>
import { ref,onMounted ,reactive,computed,watch,watchEffect ,useTemplateRef} from 'vue'
import hljs from 'highlight.js';
import 'highlight.js/styles/monokai.min.css';
import 'highlight.js/styles/atom-one-dark.min.css';
import hljsVuePlugin from "@highlightjs/vue-plugin";
import WeDoChart from '../components/WeDoChart.vue';
import Navi from '../web/Header.vue';
const fdate = ref(new Intl.DateTimeFormat("ja-JP", { month: "short", day:"2-digit",timeZone: "Asia/Tokyo" }));
import {Bank} from '../components/bank.js';
const act = ref(null), rows=reactive(null);
const  bank1 = new Bank(),hlight=ref(null), chart=ref(null);
const data= computed(() => bank1.getData("sto")),upi =ref(0) ;

onMounted( async () => {
	Array.prototype.push.apply(rows , bank1.getData("sto"));
	console.log( " s-->",rows)
	document.querySelectorAll('pre code').forEach((el) => {
		hljs.highlightElement(el);
	});
	
})

// active game click
// const gact = async (t,p)=>{
// 	busy.value=true;
// 	const ff = store.gameData.find(a=>a.class=='active');
// 	const fff = store.gameData.find(a=>a.class=='edit');
// 	if (ff) ff.class="";
// 	if (fff) fff.class="";
// 	const f = store.gameData.find(a=>a.qid==qid);
// 	qID.value=qid;
// 	store.qID=qid;
// 	// console.log(' gact:', f);
// 	f.class="active";
// 	let qq = await getQuestion(qid).catch(e=>e);
// 	error.value=null;
// 	busy.value=false;
// }
const hljsText=computed( ()=> { 
	let str =`const fdate = ref(new Intl.DateTimeFormat${act.value});`
	return hljs.highlight(str,  {language: 'js'}).value;
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
				h4 :shapes
				.box
					p
						|In case time series data this property change format x-axis labels. It represent the  
						code {type:'dot',x:0,y:0,price:-65,tm:"2018-04-24"}
						|  object. You can use any language in date and time formatting also using different time zones for displaying.
			.mini-grid
				.tbl-header
					table.fx-tb
						thead
							tr
								th tm
								th price
					.tbl-content
						table.fx-tb(cellpadding='0' cellspacing='0' border='0' )
							tbody
								tr(v-for="c in data[0].data")
									td {{c.tm}}
									td {{c.price}}
				pre
					code(class="language-js" v-html="hljsText")
		.right-side
			WeDoChart( ref="chart" tky="7" fs="12" :ds="{width:600,height:400}" :points="rows" :timefotmat="fdate")
			pre
				code(class="language-js" v-html="hljsText")
			
			

		
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