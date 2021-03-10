
<template lang="pug">
	svg#sheet(ref="sheet" :viewBox="viewBoxSet" xmlns="http://www.w3.org/2000/svg" @mousedown="startDrag" @mousemove="mousemove" )
		rect.chartSheet(ref="chartSheet" x="0" y="0" :width="ds.width" :height="ds.height")
		circle.titlesDot( :cx="axis.x.x1" :cy="axis.y.y2-1-fs/3" :r="fs/3" )
		text.legend(id="legend" ref="titles" :x="axis.x.x1+1+fs/3" :y="axis.y.y2-1" :font-size="fs" ) {{cross.txt}}
		text.titles(id="title"  :x="axis.x.x1+(axis.x.x2-axis.x.x1)/2+1+fs/3" :y="axis.y.y2-1" :font-size="fs*1.2" ) {{chartName}}	
		line.axisY(:x1="axis.y.x1" :x2="axis.y.x2" :y1="axis.y.y1" :y2="axis.y.y2" )
		line.axisX(:x1="axis.x.x1" :x2="axis.x.x2" :y1="axis.x.y1" :y2="axis.x.y2" )
		g(v-if="!cross.hide")
			line.cross(:x1="cross.v.x1" :x2="cross.v.x2" :y1="cross.v.y1" :y2="cross.v.y2")
			line.cross(:x1="cross.h.x1" :x2="cross.h.x2" :y1="cross.h.y1" :y2="cross.h.y2")
		g(v-if="zero>0")
			line.zero(:x1="axis.x.x1" :x2="axis.x.x2" :y1="zero" :y2="zero" )
		g.ticksY(v-for="r in ticksY" :key="r.y")
			line.grids(v-if="showGrid" :x1="axis.x.x1" :x2="axis.x.x2" :y1="r.y" :y2="r.y")
			line.ticks( :x1="axis.y.x1" :x2="axis.y.x1+tsz.size" :y1="r.y" :y2="r.y" )
			text.axislabely( :x="axis.y.x1+tsz.off" :y="r.y+fs/3" :font-size='fs') {{r.price}}
		g.ticksX(v-for="n in ticksX" :key="n.y")
			line.grids(v-if="showGrid" :x1="n.x" :x2="n.x" :y1="axis.y.y1" :y2="axis.y.y2")
			line.ticks( :x1="n.x" :x2="n.x" :y1="axis.x.y1" :y2="axis.x.y1+tsz.size")
			text.axislabelx( :x="n.x" :y="axis.x.y1+tsz.size+tsz.off+fs/2" :font-size='fs') {{n.tm}}
		polyline.plot(v-bind:points='pointsAsPolyline')
		g.leftThumb(@mouseleave="stopThumb()" :transform="'translate('+thumbs.left.x+','+thumbs.left.y+') scale('+scl+')'" @mouseenter="leftDrug = true" )
			polyline(points="10,40 0,30 0,10 10,0 31,0 31,40 " )
		line.wline(:x1="wline.left.x1" :x2="wline.left.x2" :y1="wline.left.y1" :y2="wline.left.y2" :stroke-width='wline.left.sSize' @click="wlineLeftClick")
		rect.mbody( @mouseleave="draggingCenter =!draggingCenter" @mouseenter="draggingCenter =!draggingCenter" :x="wline.middle.x" :y="wline.middle.y" :width="wline.middle.w" :height="wline.middle.h" )
		g.rightThumb(@mouseleave="stopThumb()" :transform="'translate('+thumbs.right.x+','+thumbs.right.y+') scale('+scl+')'" @mouseenter="rightDrug = true" )
			polyline(points="0,0 0,40 21,40 30,30 30,10 21,0 " )
		line.wline(:x1="wline.right.x1" :x2="wline.right.x2" :y1="wline.right.y1" :y2="wline.right.y2"  :stroke-width='wline.right.sSize' @click="wlineRightClick" )
</template>

<script>

import mouseLocation  from "../components/mouseLocation";
import observeApi  from "../components/observeApi.js";
import DoAxis from "../components/doAxis";
import slider from "../components/slider";

export default {
	mixins: [mouseLocation,observeApi,slider],
	name: 'WeChart',
	props: {
		ds: {
			type:Object,
			default: () =>( {width:1250, height:300}) 
		},
		background:  {
			type: String,
			default: "AliceBlue"
		},
		showGrid:  {
			type: Boolean,
			default: true
		},
		tky:{
			type:[Number,String], // Axis y ticks numbers
			default: () =>(7)
		},
		off:{
			type:[Number,String], // Axis offset in percent of height
			default: () =>(2)
		},
		scl:{
			type:[Number,String], // For slider
			default: () =>(0.45) 
		},
		tsz: {
			type:Object,
			default: () =>( {size:5, off:5}) // the label ticks options off should be greater off
		},
		points: {
			type:Array,
			default: () =>([]) 
		},
		fs : {
			type:[Number,String],
			default: ()=>(14)
		},
		limit:{
			type:[Number], // For slider
			default: () =>(10) 
		},
		decimals:{
			type:[String], //For price scale
			default: () =>('0.01') 
		},
		timefotmat:{
			type:[String], // if date or null
			default: () =>(null) 
		},

	},
	data: () => (
	{
		svg:{},
		dPoints: [], // points in display 
		pSize : 0, // data in  display
		limitSize : 0, // data count it's use in limit calculation
		farPoints :[], // dev
		move:"don't",
		cross:{ v:{x1:0, y1:0, x2:0, y2:0 }, h:{x1:0, y1:0, x2:0, y2:0 }, hide:false, txt:"" },
		pointsID:{x1:0,x2:15},
		pos:{x:0, y:0},
		ticksY:[],
		ticksX:[],
		pointYX:[],
		leftDrug: false,draggingLeft:false,rightDrug: false,draggingRight:false,draggingCenter:false,moveDrug: false,
		thumbs: { left:{x:0, y:0}, right:{x:0, y:0, priceDigits:0 },step:0.0001 },
		wline: { left:{x1:0, x2:0, y1:0, y2:0 }, middle:{x:0,y:0, w:0,h:0}, right:{x1:0, x2:0, y1:0, y2:0 }},
		title:"",
		zero:null,


	}),
	mounted() {
		window.addEventListener('mouseup', this.stopDrag);
		window.addEventListener("resize", this.reSize);
		this.svg = this.$refs.sheet
		this.ds.width=this.$refs.sheet.clientWidth
		this.ds.height= this.$refs.sheet.clientHeight
		this.cross.txt=' ' //dev

		this.leftDrug = true
		this.draggingLeft =true

		this.initObserver()
		this.xmapData()
		this.getDisplayData(this.axis.x.x1,this.axis.x.x2)
		this.initSlider()

		this.leftDrug = false
		this.draggingLeft =false
	

	},
	beforeDestroy() {
		this.destroy()
	},
	watch: {
		pos(){
			this.crossMove()
			this.thumbYY()
			this.thumbY()
			//console.log( "Pos change",this.pos)
		},
		points(val){
			
			if (val.length>0){
				this.pointsID.x1 = 0
				this.pointsID.x2 = val[0].data.length
				//this.title = (val[0].name)? val[0].name:''
				this.loadChart()

			}
		},
		wh(){
			
			this.loadChart()
		},
		decimals (){
			
			this.loadChart()
			
		},
		off (){
			
			this.loadChart()
			
		},
		tky (){
			this.loadChart()
			
		},
		
		scl (){
			this.loadChart()
		
		},
		timefotmat (){
			this.loadChart()
			
		},
		fs (){
			this.loadChart()
		},
		tsz: {
			deep: true,
			handler: function()  {
				this.loadChart()
			},
		}

	},
	computed: {

		chartName(){
			return   (this.points[0])?  (this.points[0].name)? this.points[0].name:'':''
		},
				
		viewBoxSet() {
			return  `0 0 ${this.ds.width } ${this.ds.height }`;
		},
				
		pointsAsPolyline: function() {
			
			return this.pointYX.map((p) => `${p.x} ${p.y}`).join(' ');
		},
		rects() {
			let rect = this.$refs.field ? this.$refs.field.getBoundingClientRect():{ width:this.ds.width, height:this.ds.height};

			return {
				rWidth: rect.width ,
				rHeight: rect.height
			}
		},
		axis(){
			let off = this.ds.height*this.off/100
			let wbox = this.calcOffsetY() 
			let lfBox= this.calcOffsetX()
			let hbox = this.calcMiniBottomHight()
			let tbox = this.calcMiniTopHight()
			let x = (off) < lfBox/3 ? lfBox/3:off;
			let y = (off) < hbox ? hbox:off;
			let y2 = (tbox > off ) ? tbox:off;
			let x2 = (off) < wbox/1.5 ? wbox/1.5:off;
			return {
				y: {y1: this.ds.height-y, y2:y2, x1: this.ds.width-x2, x2: this.ds.width-x2},
				x: {y1: this.ds.height-y, y2:this.ds.height-y, x1:x, x2: this.ds.width-x2},
			};
		},
		grid(){
			let off = this.ds.height*this.off/100;
			let step = this.ds.height*this.tky/100;
			let i = off, y=[];
			while (i <= this.ds.height-off){
				y.push(i)
				i+=step;
			}
		
			return { y: y};
		},
		
	},
	methods: {
		destroy: function () {
			window.removeEventListener('mouseup', this.stopDrag);
			window.removeEventListener("resize", this.reSize);
		},
		
		crossMove(){
			if (this.pos.x<this.axis.x.x2 && this.pos.x>this.axis.x.x1 && this.pos.y>this.axis.y.y2 && this.pos.y<this.axis.y.y1 ) {
				this.cross.hide=false;
				let arr = (this.pointYX.length >0)? this.pointYX:(this.points.length>0)?this.points[0].data:[]
				let far = arr.map(a=> ({...a, f: Math.abs(a.x-this.pos.x) }) ).sort((a, b) =>Number(a.f-b.f))
				this.farPoints.splice(0,this.farPoints.length)
				this.farPoints = far
				let p = (far.length>0) ? far[0] : null
				if (p ){
					this.cross.v.x1=p.x
					this.cross.v.x2=p.x
					this.cross.v.y1=this.axis.y.y1
					this.cross.v.y2=this.axis.y.y2
					this.cross.txt = p.price + " " + p.dtm;
					this.cross.h.x1=this.axis.x.x1
					this.cross.h.x2=this.axis.x.x2
					this.cross.h.y1=p.y
					this.cross.h.y2=p.y
				} else {
					this.cross.txt = "_" ;
				}
			}	else {
				this.cross.hide=true;
			}
			
		},
		
		mousemove(e) {
			e.preventDefault();
			this.pos = this.getMousePosition(e);
		},
		xmapData(){
			
			let sz = (this.points.length>0)? this.points[0].data.length:0
			let step = (this.axis.x.x2-this.axis.x.x1)/(sz-1)
			this.thumbs.step = step  // this need for slider to display last point easy
			let i = this.axis.x.x1
			this.limitSize = (sz/100)*this.limit
			if (sz<=15 && sz>0) this.limitSize = sz;
			if (this.points.length>0){
				this.points[0].data.forEach((a,j)=> {
					a.x = (j == 0)? i : i = step+i ;
					a.id=j
				})
			}	
		},
		getDisplayData(first,end) {
			let doAxis = new DoAxis()

			let n=this.thumbs.step*0.01
			let arr =(this.points.length>0)? this.points[0].data.filter(a=>  a.x >= first &&  a.x <= end+n ) :[]
			this.pointsID.x1= (arr.length>0)? arr[0].id:this.pointsID.x1
			this.pointsID.x2= (arr.length>0)? arr.slice(-1)[0].id:this.pointsID.x2
			if (this.pSize != arr.length){
				this.pSize = arr.length
				doAxis.formulaY(arr, this.axis ,this.tky,this.calcOffsetX(),this.decimals,this.timefotmat) // this.calcOffsetX()=58
				this.ticksY.splice(0,this.ticksY.length);
				this.ticksY=doAxis.ticksY().map(a=>a);
				this.ticksX.splice(0,this.ticksX.length);
				this.ticksX=doAxis.ticksX().map(a=>a);
				if (this.timefotmat) this.formatTicksX()
				this.pointYX.splice(0,this.pointYX.length);// chart data
				this.pointYX=doAxis.pointYX().map(a=>a);
				this.zero=doAxis.zero()
				return 'ok'
			} else  return 'no'
		},
		formatTicksX(){
			let prevDtm=(this.ticksX.length>0)?this.ticksX[0].dtm:null
			this.ticksX.forEach((a)=>{
				if (this.timefotmat=='HH:MM'  || this.timefotmat=='HH:MM:ss'){
					if ( new Date(a.dtm).getFullYear() !== new Date(prevDtm).getFullYear() ) {
						a.tm = a.yy
					}
					else if (new Date(a.dtm).getMonth() !== new Date(prevDtm).getMonth()){
						a.tm=a.mm
					}
					else if (new Date(a.dtm).getDate() !== new Date(prevDtm).getDate()){
						a.tm = new Date(a.dtm).getDate()
					}
				}	else if (this.timefotmat=='dd') {
					if ( new Date(a.dtm).getFullYear() !== new Date(prevDtm).getFullYear() ) {
						a.tm = a.yy
					}
					else if (new Date(a.dtm).getMonth() !== new Date(prevDtm).getMonth()){
						a.tm=a.mm
					}
				}
				prevDtm=a.dtm
				
			})
		},
		calcOffsetY(){
			let f = (this.decimals.length<2)? 2 : this.decimals.length
			let maxInteger = (this.points.length>0) ? Math.max.apply(null,this.points[0].data.map(a=> (''+a.price).indexOf(".") ) ):1
			if (maxInteger<0) maxInteger= Math.max.apply(null,this.points[0].data.map(a=> (''+a.price).length  ))
			let mxl = maxInteger + f - 1 ;
			if ( this.points.length == 0) mxl=6
			let boxWidth = mxl*this.fs+this.tsz.off
			return  boxWidth;
		},
		calcOffsetX(){
			let mxl =(this.timefotmat)?this.timefotmat.length:0;
			if (mxl==0) mxl = (this.points.length>0) ? Math.max.apply(null,this.points[0].data.map(a=> (''+a.tm).length  )):6;
			if (this.timefotmat && mxl<3) mxl=3;
			let boxWidth = mxl*this.fs
			return  boxWidth;
		},
		calcMiniBottomHight(){
			let add=this.tsz.size+this.tsz.off
			let miniHeight = this.fs*1.18 + this.scl*40 + (this.ds.height/100)*3+add
			return  miniHeight;
		},
		calcMiniTopHight(){
			let miniHeight = this.fs*1.18 +this.tsz.off
			return  miniHeight;
		},
		loadChart() {
			this.xmapData()			
			let arr =(this.points.length>0)? this.points[0].data.filter(a=>  a.id >= this.pointsID.x1 &&  a.id <= this.pointsID.x2 ):[] 
			let x1 = (arr.length>0)? arr[0].x:this.axis.x.x1
			let x2 = (arr.length>0)? arr.slice(-1)[0].x:this.axis.x.x2
			let p = arr.slice(-1)[0]
			this.cross.txt = (p)? p.price + " " + p.tm:'';
			this.pSize=1
			this.getDisplayData(x1,x2)
			this.initSlider()
			this.moveSlider(x1,x2)
		},
		moveSlider(x1,x2){
			let wd = this.scl*31
			this.thumbs.left.x = x1
			this.wline.left.x2 = (this.thumbs.left.x < this.axis.x.x1) ?  this.wline.left.x1: this.thumbs.left.x
			this.wline.middle.x = this.thumbs.left.x + wd
			this.wline.middle.w = this.thumbs.right.x - this.thumbs.left.x-wd
			this.thumbs.right.x = x2
			this.wline.right.x1 = (x2 > this.axis.x.x2 - wd ) ?  this.wline.right.x2:this.thumbs.right.x+wd
			this.wline.middle.w = this.thumbs.right.x - this.thumbs.left.x
		}
	}
}
</script>
<style  lang='stylus'>
	$colorPlot = #0074d9
	$colorAxis = #0074d9
	
	.leftThumb
		cursor ew-resize
		fill  blue
	.rightThumb
		cursor ew-resize
		fill  blue	
	.wline 	
		cursor pointer
		stroke $colorAxis
	.mbody
		cursor grab
		fill #cfebfd
		&:hover
			cursor move
	.axislabelx	
		font-family  Arial, Helvetica Neue, Helvetica
		fill red
		text-anchor middle
		font-weight 600
		stroke transparent
		
	.axislabely	
		font-family  Arial, Helvetica Neue, Helvetica
		fill red 
		alignment-baseline auto
		font-weight 600
		stroke transparent
	.chartSheet
		stroke blue
		stroke-width 2.5
		fill snow
	.legend
		font-family  Arial, Helvetica Neue, Helvetica
		fill $colorPlot
		font-weight 600
	.titles
		font-family  Arial, Helvetica Neue, Helvetica
		fill $colorPlot
		font-weight 800
		text-anchor middle	
		stroke transparent
	.titlesDot
		stroke-width 1.1
		font-family  Arial, Helvetica Neue, Helvetica
		fill $colorPlot
		font-weight 600	
	.axisY
		stroke $colorAxis 
		stroke-width 2
	.axisX
		stroke $colorAxis 
		stroke-width 2	
	.cross	
		stroke $colorAxis 
		stroke-width 0.5
	.grids
		stroke-width 0.2 
		stroke $colorAxis
		stroke-dasharray 3
	.ticks
		stroke-width 1.18
		stroke $colorAxis
	.plot
		fill none
		stroke $colorPlot
		stroke-width 2
	.zero
		stroke red 
		stroke-width 0.5	
	@import '.././assets/themeUsa.styl'				
</style>