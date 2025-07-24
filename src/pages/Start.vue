<script setup>
import { ref,onMounted ,reactive,computed,watch,watchEffect ,useTemplateRef} from 'vue'
const fdate = ref(new Intl.DateTimeFormat("sv-SE", { month: "short", day:"numeric", timeZone: "MET" }));

onMounted( async () => {

	console.log( " s-tartt->");
	
})

</script>

<template lang="pug">
body
	main
		.my-grid
			.left-side
			.right-side

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
	overflow: auto;
	-webkit-overflow: auto;
	height 80vh
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
	overflow-y scroll 
	white-space nowrap
	background-color #F0F0F0
	region-overflow:auto;
	overflow:visible;
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