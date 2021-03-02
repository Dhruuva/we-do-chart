<template>
	<v-container @mousemove="getLocation">
	<div class="split left border" :style="leftStyle">
	<div class="svgResponsive" >	
	<svg  :viewBox="viewBoxSet">
		<defs>
			<pattern

				id="smallGrid"
				width="10"
				height="10"
				patternUnits="userSpaceOnUse"
			>
				<path
				d="M 10 0 L 0 0 0 10"
				fill="none"
				stroke="gray"
				stroke-width="0.5"
				/>
			</pattern>
			
			<pattern
				id="grid"
				width="100"
				height="100"
				patternUnits="userSpaceOnUse"
			>
				<rect width="100" height="100" fill="url(#smallGrid)" />
				<path
				d="M 100 0 L 0 0 0 100"
				fill="none"
				stroke="gray"
				stroke-width="1"
				/>
			</pattern>
			</defs>
		
		<polyline
		fill="none"
		stroke="#0074d9"
		stroke-width="3"
		v-bind:points="pointsAsPolyline"/>
		<polyline
		fill="none"
		stroke="#0074d9"
		stroke-width="3"
		points="10 10"/>
	</svg>
	</div>
	<div class="thumb" @mousedown="startLeftDrug()" @mouseenter="rightDrug=!rightDrug" @mouseleave="rightDrug=!rightDrug" ></div>
	</div>
	<div class ="split right border" :style="rightStyle">
		<p> {{ xy }} </p>
		<p> {{ wh }} </p>
		<p> rightDrug={{ rightDrug}}</p>
		<p> moveDrug={{ moveDrug}}</p>
		<p> {{leftX}} </p>
		<p> rightStyle()=  {{rightStyle}} </p>
	</div>
	</v-container>
</template>

<script>
/* eslint-disable */	
export default {
	name: 'About',
	components: {
	 
	},
	data: () => (
	{
		xy: [] ,
		rightDrug:false,moveDrug:false,
		leftX:50,
		splitX:50,
		wh: {width:0,height :0 },
		div:  {width:0,height :0 },
		points: [
			{ date: '2020-08-17', price: 70.61 },
			{ date: '2020-08-19', price: 60.56 },
			{ date: '2020-08-20', price: 50.71 },
			{ date: '2020-08-21', price: 56.28 },
			{ date: '2020-08-22', price: 20.37 },
		]
		
	}),
	mounted() {
		window.addEventListener('mouseup', this.stopDrag);
		let el = document.getElementsByClassName('svgResponsive')	
		this.div.width=el[0].clientWidth
		this.div.height=el[0].clientHeight
		console.log(this.div)
	},

	computed: {
		pointsAsPolyline: function() {
			console.log (window.innerWidth)
			this.wh.width = window.innerWidth
			this.wh.height = window.innerHeight
			
			return this.points.map((p, i) => `${i * 50} ${p.price}`).join(' ');
		},
		leftStyle(){
			if (this.moveDrug) this.leftX = (this.xy[0]+8+7)*100/(window.innerWidth)
			return " width: "+this.leftX + "%;"
		},
		rightStyle(){
			return " width: "+ (100-this.leftX) + "%;"
		},
		viewBoxSet() {
			return  `0 0 ${this.div.width } ${this.div.height }`;
		},

	},
	methods: {
		getLocation(e) {
			let xx = 0;
			let yy = 0;
			if (e.touches) {
				xx = e.touches[0].pageX;
				yy = e.touches[0].pageY;
			} else {
				xx = e.pageX;
				yy = e.pageY;
			}
			this.xy=[xx, yy];
			return [xx, yy];
		},
		stopDrag() {
			if (this.moveDrug){
           console.log( "stopDrag",this.moveDrug, this.xy[0])
	        
			}
	      this.moveDrug = false;
	   },
	   startLeftDrug(){
	   	this.leftX = this.xy[0]*100/(window.innerWidth)
	   	console.log( "startLeftDrug--->",this.leftX );
	   	if (this.rightDrug){
	   		console.log( "startLeftDrug",this.moveDrug, this.xy[0])
	   	  	this.moveDrug = true;
	   	}
	   }
	}
}
</script>
<style scoped lang='stylus'>
	.svgResponsive 
		fill red
		width auto
		height 100%
		background-color lightblue
	.split
		height 90%
		width 50%
		position fixed
		z-index 1
		top auto
		padding 10px
		overflow-x hidden
	.left
		left 0
	.right
		right 0
	.border	
		border-style groove
		border-color coral
		border-width 7px
	.wd
		width 30%	
	.thumb 
		position absolute
		height 35px
		width 8px
		right 0
		top 45%	
		border-color green
		border-style inset
		background-color yellowgreen
		border-width 2px
		&:hover
			cursor ew-resize
</style>