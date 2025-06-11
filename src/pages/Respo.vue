<script setup>
import { ref,onMounted ,reactive,computed,watch,watchEffect ,useTemplateRef} from 'vue'
import hljs from 'highlight.js';
import 'highlight.js/styles/an-old-hope.min.css';
import WeDoChart from '../components/WeDoChart.vue';
import Navi from '../web/Header.vue';

const  rightDrug=ref(false),moveDrug=ref(false),upDrug=ref(false),upDrugMove=ref(false),
		leftX=ref(50),leftY=ref(50),top=ref(0),topp=ref(1)
		, offx = ref(0), offy = ref(0)
		, wh=reactive({width:0,height :0 }),divHeight=reactive({upDiv:0,dwDiv:0}),xy=reactive(new Array());

onMounted( async () => {
	window.addEventListener('resize', reSize);	
	init();
	
})

const  init=()=>{
	setTimeout(()=>{
		initLayout();
	},25);
}

const reSize=()=>{
	setTimeout(()=>{
		init();
	},20);
}

const initLayout=()=>{
	
	console.log( " initLayout " ,top.value);
	let top0= document.getElementById('mainLook_root').getBoundingClientRect().top;
	console.log( " initLayout " ,top0);
	wh.width = window.innerWidth
	wh.height = window.innerHeight
	top.value = top0;
	topp.value =(top0)*100/window.innerHeight;
	console.log( " top ",top0 );
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
	return " width: "+ (98-leftX.value) + "%;height: "+(leftY.value-topp.value) + "%;"
})
const upStyle= computed( ()=>{
	return " height: "+leftY.value + "%;"
})
const downStyle= computed( ()=>{
	return " top: "+ (leftY.value) + "%;width: "+leftX.value + "%;height: "+(98-(leftY.value+topp.value*0.1) ) + "%;"
})
const downRightStyle= computed( ()=>{
	return " top: "+ (leftY.value) + "%;width: "+(98-leftX.value) + "%;height: "+(98-(leftY.value+topp.value*0.1) ) + "%;"
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
}
</script>

<template lang="pug">
header
	Navi(id="mynav" active="6")
body
	#mainLook_root(ref="root" @mousemove='getLocation' style='height:50%;' @mouseup="stopDrag")
		.split.upper.left.border(:style='leftStyle')
			p topp {{topp}}
			p top {{top}}
			.thumb(@mousedown='startLeftDrug()' @mouseenter='rightDrug=!rightDrug' @mouseleave='rightDrug=!rightDrug')
		.split.upper.right.border(:style='rightStyle')
			p rightStyle {{rightStyle}}
			p leftStyle {{leftStyle}}
		.split.down.left.border(:style='downStyle')
			.thumbUp(@mousedown='startUpDrug()' @mouseenter='upDrug=!upDrug' @mouseleave='upDrug=!upDrug')
			p downStyle {{downStyle}}
			p downRightStyle {{downRightStyle}}
		.split.down.right.border(:style='downRightStyle')
			p divHeight {{divHeight}}
</template>

<style lang ="stylus">
@import '../assets/theme.styl'
@import '../assets/select-my.styl'
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
.my-grid
	display grid
	width 100%
	grid-template-columns 1fr 1fr;
#mainLook_root
	padding 0rem 1rem
	max-width 1280px
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
		left 1%
	&.right
		right 1%
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
.crop
	position absolute
	top 10px
	left 100px
	width 100px
	height 100px
	transition all 0.05s
	cursor move
	.crop-line
		position absolute
		transition all 0.25s
	.crop-right-line
		top 0
		right 0
		bottom 0
		width 5px
		border-right 1px solid rgba(204,31,48,1)
		cursor e-resize
</style>