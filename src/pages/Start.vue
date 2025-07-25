<script setup>
import { ref,onMounted ,reactive,computed,watch,watchEffect ,useTemplateRef} from 'vue'
const fdate = ref(new Intl.DateTimeFormat("sv-SE", { month: "short", day:"numeric", timeZone: "MET" }));

onMounted( async () => {

	console.log( " s-tartt->");
	
})

</script>

<template lang="pug">
.my-grid
	.left-vue
		.wraper
			.cbox
				img(alt="Vue logo"  src="../assets/vue1.svg" )
			h1 Vue 2
			a(href="home.html") Go
	.right-vue
		.wraper
			.cbox
				img(alt="Vue logo" src="../assets/vue1.svg" )
			h1 Vue 3 +
			a(href="home.html") Go.. 
</template>

<style lang ="stylus">
$colorPlot = #646cffaa
$colorLink = #42b883aa
.logo 
  display block
 	margin-left 10em
 	margin-top -1em
  will-change: filter;
  transition: filter 100ms;
.wraper
	display flex
	place-items flex-start
	flex-wrap wrap
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
	overflow: auto;
	-webkit-overflow: auto;
	height 100vh
	display grid
	width 100%
	grid-template-columns 1fr 1fr;
.right-vue
	padding 0.1em 1em
	background-color #feeffe
	filter drop-shadow(0em 0em 2em #646cffaa)
	align-content center
	color  #42b883aa
.central
	min-width 600px
	background-color #efde
.left-vue
	filter drop-shadow(0em 0em 2em #42b883aa)
	padding 0.1em 1em
	height auto
	overflow-y scroll 
	white-space nowrap
	background-color #F0F0F0
	text-align center
	align-content center
	color  #42b883aa
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
h1 
	text-align center
a
	text-align center
	font-size 1.8em
	font-weight 700
	margin 1em
	color $colorPlot
.tide2
	line-height 0.8em
	padding 0.1em 1.5em
	margin 0.1em 1.1em
	font-size 0.9em 
	border: 1px solid #eee;
.cbox 
	margin-left 10em
	margin-top -1em
	will-change: filter;
	transition: filter 100ms;
	width 10em
	height 10em
	

	
	
@media (max-width: 1200px)
	.logo
		margin-left 1em
	.cbox
		margin-left 1em	
		width 7em
		height 7em
@media (max-width: 900px)
	.cbox
		margin-top -0.1em
		margin-left 0.1em	
		width 5em
		height 5em
	h1
		font-size 1.9em			
@media (max-width: 600px)
	.logo
		margin-left 0em
	a
		font-size 1.5em
		font-weight 500
@media (max-width: 700px)
	a
		font-size 0.9em
		font-weight 400
		margin 0.5em
	h1
		font-size 1.3em
	.cbox
		 margin-top -0.3em				

</style>