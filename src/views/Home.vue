<template lang="pug">
	v-container( fluid class="grey lighten-5")
		v-row
			v-col.text-h5( cols="12" sm="1" )
				v-text-field.text-h7( v-if='isHide' label="x Real" dense :value="axis.y.y1")
			v-col.text-h2( cols="12" sm="1" )
				div(class="d-flex")
					v-text-field.text-h7(label="x" dense :value="pos.x")
					v-text-field.text-h7(label="y" dense :value="pos.y")
			v-col.text-h2( cols="12" sm="1" )
				v-text-field.text-h7(label="BaseVal" dense :value="leftDrug")
			v-col.text-h2( cols="12" sm="1" )
				v-text-field.text-h7(label="draggingLeft" dense :value="draggingLeft")
			v-col.text-h2( cols="12" sm="2" )
				v-btn(small @click="clearTest()") Clear
				v-btn(small @click="resizi()") Resize
				v-btn(small @click="loadChart()") 356
			v-col.text-h2( cols="12" sm="1" )
				v-text-field.text-h7(label="this.rightDrug" dense :value="rightDrug")
			v-col.text-h2( cols="12" sm="1" )
				v-text-field.text-h7(label="this.draggingCenter" dense :value="draggingCenter")
			v-col.text-h2( cols="12" sm="1" )
				v-text-field.text-h7(label="draggingRight" dense :value="draggingRight")
			v-col.text-h2( cols="12" sm="1" )
				v-text-field.text-h7(label="moveDrug" dense :value="moveDrug")
			v-col( cols="12" sm="2" )
				div(class="d-flex")
					v-text-field.text-h9(label="Width" dense :value="wh.w")
					v-text-field.text-h9(label="Height" dense :value="wh.h")
			v-col.text-h2( cols="12" sm="1" )
				v-text-field.text-h7(label="U" dense :value="wh.u")
			v-col.text-h2( cols="12" sm="1" )
				v-text-field.text-h7(label="fs" dense :value="fs")
			v-col.text-h2( cols="12" sm="1" )
				v-text-field.text-h7(label="thumbs.right.x" dense :value="thumbs.right.x")
			v-col.text-h2( cols="12" sm="1" )
				v-text-field.text-h7(label="axis.x.x1" dense :value="axis.x.x1")
			v-col.text-h2( cols="12" sm="1" )
				v-text-field.text-h7(label="axis.x.x2" dense :value="axis.x.x2")
			v-col.text-h2( cols="12" sm="1" )
				v-text-field.text-h7(label="thumbs.step" dense :value="thumbs.step")
			v-col.text-h2( cols="12" sm="1" )
				v-text-field.text-h7(label="this.move" dense :value="move")
			v-col.text-h2( cols="12" sm="1" )
				v-text-field.text-h7(label="thumbs.right.mp+pos.x" dense :value="thumbs.right.mp+pos.x")
			v-col.text-h2( cols="12" sm="1" )
				v-text-field.text-h7(label="thumbs.right.mp" dense :value="thumbs.right.mp")
			v-col.text-h2( cols="12" sm="1" )
				v-text-field.text-h7(label="ds" dense :value=" ds.width+ '-' +ds.height")
			v-col.text-h2( cols="12" sm="1" )
				v-text-field.text-h7(label="k" dense :value="k")
			v-col.text-h2( cols="12" sm="1" )
				v-text-field.text-h7(label="calcMiniTopHight" dense :value="calcMiniTopHight()")
		.svgResponsive(ref="field" @resize="reSize")
			svg#sheet(ref="sheet" :viewBox="viewBoxSet" xmlns="http://www.w3.org/2000/svg" @mousedown="startDrag" @mousemove="mousemove" :width='whBox.w' :height='whBox.h')
				defs
					pattern#smallGrid(width='10' height='10' patternunits='userSpaceOnUse')
						path(d='M 10 0 L 0 0 0 10' fill='none' stroke='gray' stroke-width='1.5')
					pattern#grid(width='100' height='100' patternunits='userSpaceOnUse')
						rect(width='100' height='100' fill='url(#smallGrid)')
							path(d='M 100 0 L 0 0 0 100' fill='none' stroke='gray' stroke-width='1')
				rect.chartSheet(ref="chartSheet" x="0" y="0"	:width="ds.width" :height="ds.height"
					stroke='orange' stroke-width='1' fill="url(#smallGrid)"  )
				text.titles(id="legend" ref="titles" :x="axis.x.x1" :y="axis.y.y2-1" stroke-width="1"  fill="red" :font-size="fs" ) {{dPoint.txt}}	
				line.axisY(:x1="axis.y.x1" :x2="axis.y.x2" :y1="axis.y.y1" :y2="axis.y.y2"  stroke='#0074d9' stroke-width='1')
				line.axisX(:x1="axis.x.x1" :x2="axis.x.x2" :y1="axis.x.y1" :y2="axis.x.y2"  stroke='#0074d9' stroke-width='1')
				g(v-if="!cross.hide")
					line.vCross(:x1="cross.v.x1" :x2="cross.v.x2" :y1="cross.v.y1" :y2="cross.v.y2"  stroke='#0074d9' stroke-width='0.2')
					line.hCross(:x1="cross.h.x1" :x2="cross.h.x2" :y1="cross.h.y1" :y2="cross.h.y2"  stroke='#0074d9' stroke-width='0.2')
				g.ticksY(v-for="r in ticksY" :key="r.y")
					line.hgrids(:x1="axis.x.x1" :x2="axis.x.x2" :y1="r.y" :y2="r.y" stroke-width="0.2" stroke='#0074d9'  stroke-dasharray="2")
					line.ticks( :x1="axis.y.x1" :x2="axis.y.x1+tsz.size" :y1="r.y" :y2="r.y" stroke-width="1" stroke='#0074d9')
					text.axislabels( :x="axis.y.x1+tsz.off" :y="r.y" stroke-width="0.1" fill="red" :font-size="fs" alignment-baseline="middle") {{r.price}}
				g.ticksX(v-for="n in ticksX" :key="n.id")
					line.vgrids(:x1="n.x" :x2="n.x" :y1="axis.y.y1" :y2="axis.y.y2" stroke-width="0.2" stroke='#0074d9'  stroke-dasharray="2")
					line.ticks( :x1="n.x" :x2="n.x" :y1="axis.x.y1" :y2="axis.x.y1+tsz.size" stroke-width="1" stroke='#0074d9')
					text.axislabel( :x="n.x+tsz.size" :y="axis.x.y1+tsz.size+fs" stroke-width="0.1"  fill="red" :font-size="fs" text-anchor="middle") {{n.dtm}}
				polyline.plot(fill='none' stroke='#0074d9' stroke-width='1' v-bind:points='pointsAsPolyline')
				g.leftThumb(@mouseleave="stopThumb()" :transform="'translate('+thumbY+') scale('+scl+')'" @mouseenter="leftDrug = true" )
					polyline(points="10,40 0,30 0,10 10,0 31,0 31,40 "  fill ="blue" stroke='blue' stroke-width='0.1')
				line.wline(:x1="wline.left.x1" :x2="wline.left.x2" :y1="wline.left.y1" :y2="wline.left.y2"  stroke='#0074d9' :stroke-width='wline.left.sSize' @click="wlineLeftClick")
				rect.mbody( @mouseleave="draggingCenter =!draggingCenter" @mouseenter="draggingCenter =!draggingCenter" :x="wline.middle.x" :y="wline.middle.y" :width="wline.middle.w" :height="wline.middle.h" fill="#cfebfd")
				g.rightThumb(@mouseleave="stopThumb()" :transform="'translate('+thumbYY+') scale('+scl+')'" @mouseenter="rightDrug = true" )
					polyline(points="0,0 0,40 21,40 30,30 30,10 21,0 "  fill ="blue" stroke='blue' stroke-width='0.1')
				line.wline(:x1="wline.right.x1" :x2="wline.right.x2" :y1="wline.right.y1" :y2="wline.right.y2" stroke='#0074d9' :stroke-width='wline.right.sSize' @click="wlineRightClick"  @mouseleave="stopDrag()")
		v-row
			v-col.text-h2( cols="12" md="5" )
				v-data-table.elevation-1(dense, :headers='tmp2', :items='pointYX', :items-per-page='5')
			v-col.text-h2( cols="12" md="5" )
				v-data-table.elevation-1(dense, :headers='tmp2', :items='points', :items-per-page='5')
		v-row
			v-col.text-h2( cols="12" md="3" )
				v-data-table.elevation-1(dense, :headers='tmp', :items='ticksY', :items-per-page='5')
			v-col.text-h2( cols="12" md="3" )
				v-data-table.elevation-1(dense, :headers='tmp', :items='pointY', :items-per-page='5')
			v-col.text-h2( cols="12" md="3" )
				v-data-table.elevation-1(dense, :headers='tmp1', :items='ticksX', :items-per-page='5')
			v-col.text-h2( cols="12" md="3" )
				v-data-table.elevation-1(dense, :headers='tmp1', :items='pointX', :items-per-page='5')
		
</template>
<script>
// @ is an alias to /src
/* eslint-disable */
import mouseLocation  from "../components/mouseLocation";
import DoAxis from "../components/doAxis";
import Bank from "../components/bank";

const bank = new Bank();

export default {
	mixins: [mouseLocation],
	name: 'Home',
	components: {
	 
	},
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
			default: () =>(5)
		},
		off:{
			type:[Number,String], // Axis offset in percent of height
			default: () =>(18.3)
		},
		k:{
			type:[Number,String], // Font-Size 
			default: () => (0.0625)  // 3.5  *2.64 --((2/500)*3.94)
		},
		scl:{
			type:[Number,String], // For slider
			default: () =>(0.45) 
		},
		tsz: {
			type:Object,
			default: () =>( {size:5, off:5}) // the label ticks options off should be greater off
		},
		data: {
			type:Array,
			default: () =>([]) // the label ticks options off should be greater off
		},

	},
	data: () => (
	{
		svg:{},
		points:[],
		dPoints: [], // points in display 
		pSize : 0, // data in  display
      farPoints :[], // dev
      move:"don't",
      cross:{ v:{x1:0, y1:0, x2:0, y2:0 }, h:{x1:0, y1:0, x2:0, y2:0 }, hide:false, txt:"" },
      wh:{w:0,h:0, u:0}, //size of the root div 
     // priceDigits:0, // price digits count see thumbs
		pos:{x:0, y:0},
		tmp:[{text: 'id',value:'id'},{text: 'price',value:'price'},{text: 'y',value:'y'},{text: 'x',value:'x'}],
		ticksY:[],
		pointY:[],
		tmp1:[{text: 'id',value:'id'},{text: 'dtm',value:'dtm'},{text: 'x',value:'x'}],
		ticksX:[],
		pointX:[],
		tmp2:[{text: 'id',value:'id'},{text: 'price',value:'price'},{text: 'y',value:'y'},{text: 'dtm',value:'dtm'},{text: 'x',value:'x'}],
		pointYX:[],
		leftDrug: false,draggingLeft:false,rightDrug: false,draggingRight:false,draggingCenter:false,moveDrug: false,
		thumbs: { left:{x:0, y:0}, right:{x:0, y:0, priceDigits:0 },step:0.0001 },
		wline: { left:{x1:0, x2:0, y1:0, y2:0 }, middle:{x:0,y:0, w:0,h:0}, right:{x1:0, x2:0, y1:0, y2:0 }},
		isHide:true

	}),
	mounted() {
		window.addEventListener('mouseup', this.stopDrag);
		window.addEventListener("resize", this.reSize);
		//console.log("@@@@this.$refs.field  ", this.rect1() , "  @@ bv" ,this.bv)
		this.svg = this.$refs.sheet
		this.leftDrug = true
		this.draggingLeft =true
		
		let doAxis = new DoAxis();
		let bank = new Bank();
		
		//this.xmapData(bank.getData('test'))
		
		//this.test()
		console.log("bank  ",bank.getData('sto')[0].name);
		this.fillData(bank.getData('sto'))
		//this.initSlider()
		this.xmapData()
		this.getDisplayData(this.axis.x.x1,this.axis.x.x2)
		this.initSlider()

		//console.log( " display >>>",this.getDisplayData(400/1.1, 760.80*1.01) )
		
		this.leftDrug = false
		this.draggingLeft =false

	},
	computed: {
		dataSet:{
			//while( this.points[0].data.data.length>0) this.points[0].data.data.pop()
			//let arr	=[...this.data]
            get(){
                return [...this.data];
            },
            set(arr) {
                this.points[0].data = [...arr];
            }

		},

		thumbY() {
			let wd = this.scl*31
			if (this.draggingCenter && !this.rightDrug && !this.leftDrug && this.moveDrug ){
				let xp = this.pos.x-this.thumbs.left.mp, rx = this.thumbs.right.mp+this.pos.x
				if(  rx <= this.axis.x.x2) this.getDisplayData(xp, this.thumbs.right.x) //dont't use to avoid double update
				if( xp >= this.axis.x.x1-wd &&  rx <= this.axis.x.x2){
					this.thumbs.left.x = xp
					this.wline.left.x2 = ( xp < this.axis.x.x1)? this.axis.x.x1:xp
					this.wline.middle.x = this.thumbs.left.x + wd
				} else if ( xp< this.axis.x.x1-wd &&  rx <= this.axis.x.x2){
					//this.getDisplayData(xp, this.thumbs.right.x)
					xp=this.axis.x.x1-wd
					this.thumbs.left.x = xp
					this.wline.left.x2 = ( xp < this.axis.x.x1)? this.axis.x.x1:xp
					this.wline.middle.x = this.thumbs.left.x + wd
				}
			} else if ((this.leftDrug && this.draggingLeft) || this.wline.left.active){
				let offset = (this.thumbs.left.off)? this.thumbs.left.off:this.scl*31
				//console.log("thumbY x  ",this.pos.x ," this.thumbs.left.x  " ,this.thumbs.left.x, " off ",offset);
				if ( (this.pos.x + wd) > this.axis.x.x1 ) {
					this.thumbs.left.x = this.pos.x - offset
					//this.thumbs.left.y = this.ds.height -this.scl*40
					 this.wline.left.x2 = (this.thumbs.left.x < this.axis.x.x1) ?  this.wline.left.x1: this.thumbs.left.x
					this.wline.middle.x = this.thumbs.left.x + wd
					this.wline.middle.w = this.thumbs.right.x - this.thumbs.left.x-wd
					this.getDisplayData(this.thumbs.left.x, this.thumbs.right.x)
				} 
			}
			this.wline.left.active = false
			return  `${this.thumbs.left.x} ,  ${this.thumbs.left.y}`;
		},
		thumbYY() {
			let wd = this.scl*31
			//let pwbox = this.priceDigits*this.fs 
			let offset = (this.thumbs.right.off)? this.thumbs.right.off:0

			if (this.draggingCenter && !this.rightDrug && !this.leftDrug && this.moveDrug ){

				let xp = this.thumbs.right.mp+this.pos.x ,lx = this.pos.x-this.thumbs.left.mp
				if (lx >= this.axis.x.x1-wd) this.getDisplayData(this.thumbs.left.x, xp)
				if (xp <= this.axis.x.x2 && lx >= this.axis.x.x1-wd) { //&& lx >= this.axis.x.x1-wd
					this.thumbs.right.x = xp
					this.wline.right.x1 = (xp+wd > this.axis.x.x2)? this.axis.x.x2: xp+wd
					this.wline.middle.w = this.thumbs.right.x - this.thumbs.left.x
					
					this.move = "move"
				} else if (xp > this.axis.x.x2 && lx >= this.axis.x.x1-wd) {
					xp=this.axis.x.x2
					this.thumbs.right.x = xp
					this.wline.right.x1 = (xp+wd > this.axis.x.x2)? this.axis.x.x2: xp+wd
					this.wline.middle.w = this.thumbs.right.x - this.thumbs.left.x
				} 
				else if ( lx < this.axis.x.x1-wd) {
					xp=this.wline.middle.w+this.thumbs.left.x
					this.thumbs.right.x = xp
					this.wline.right.x1 = (xp+wd > this.axis.x.x2)? this.axis.x.x2: xp+wd
					//this.wline.middle.w = this.thumbs.right.x - this.thumbs.left.x
					this.move = "dont't move";
				}

			} else if (this.rightDrug && this.draggingRight || this.wline.right.active){
				if( this.pos.x  < this.axis.x.x2+wd) {
					this.thumbs.right.x = this.pos.x - offset
				//	this.thumbs.right.y = this.ds.height -this.scl*40
					this.wline.right.x1 = (this.pos.x > this.axis.x.x2 - wd ) ?  this.wline.right.x2:this.thumbs.right.x+wd
					this.wline.middle.w = this.thumbs.right.x - this.thumbs.left.x
					this.getDisplayData(this.thumbs.left.x, this.thumbs.right.x)

				}
				//console.log(" getDisplayData= ",this.getDisplayData(this.thumbs.left.x, this.thumbs.right.x) )
			}
			this.wline.right.active = false 
			return  `${this.thumbs.right.x} ,  ${this.thumbs.right.y}`;
		},
		bv() {
			console.log("this.$refs.field  ", this.$refs.field)

			return this.$refs.chartSheet;
		},
		viewBoxSet() {
			return  `0 0 ${this.ds.width } ${this.ds.height }`;
		},
		whBox() {
			let w = this.ds.width, h=this.ds.height;
			return  { w:w+'px',h:h+'px' }
		},
		
		pointsAsPolyline: function() {
			//return this.points[0].data.data.map((p, i) => `${i * 70} ${p.price}`).join(' ');
			return this.pointYX.map((p, i) => `${p.x} ${p.y}`).join(' ');
		},
		rects() {
			let rect = this.$refs.field ? this.$refs.field.getBoundingClientRect():{ width:this.ds.width, height:this.ds.height};

			return {
				rWidth: rect.width ,
				rHeight: rect.height
			}
		},
		axis(){
			let off = this.ds.height*this.off*1.003200/100
			let wbox = this.calcOffsetY() 
			let lfBox= this.calcOffsetX()
			//if (wbox < this.scl*31)  wbox = this.scl*31;
			let hbox = this.calcMiniBottomHight()
			let tbox = this.calcMiniTopHight()
			let x = (off) < lfBox/3.03 ? lfBox/3.03:off;
			let y = (off) < hbox ? hbox:off;
            let y2 = (tbox > off ) ? tbox:off;
           // let wbox = this.thumbs.right.priceDigits*this.fs -- this bad work
            let x2 = (off) < wbox/1.5 ? wbox/1.5:off;
			//let west =(wbox/2 > )
				console.log('axis() this. axis.x2=',  "lfBox - ", lfBox, " wbox ", wbox, ' x2',x2, ' axis.x2=',this.ds.width-x2);
				//this.pos.x =  this.axis.x.x1 
			// console.log(this.thumbs.right.priceDigits , " pwbox ", pwbox)
			// this.thumbs.x = this.pos.x - this.scl*25
			// this.thumbs.y = this.ds.height -this.scl*40
			return {
				y: {y1: this.ds.height-y, y2:y2, x1: this.ds.width-x2, x2: this.ds.width-x2},
				x: {y1: this.ds.height-y, y2:this.ds.height-y, x1:x, x2: this.ds.width-x2},
			};
		},
		grid(){
			let off = this.ds.height*this.off/100;
			let step = this.ds.height*this.tky/100;
			//console.log(" step " , step);
			let i = off, y=[];
			while (i <= this.ds.height-off){
				y.push(i)
				i+=step;
			}
		
			return { y: y};
		},
		dPoint(){
			if (this.pos.x<this.axis.x.x2 && this.pos.x>this.axis.x.x1 && this.pos.y>this.axis.y.y2 && this.pos.y<this.axis.y.y1 ) {
				this.cross.hide=false;
				let arr = (this.pointYX.length >0)? this.pointYX:this.points[0].data
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
			} else  this.cross.hide=true;

			return this.cross;
		},
		fs(){
			return 12 // this.k*this.ds.width; --  this.k*this.ds.height
		}

	},
	methods: {
		initSlider() {
			this.pos.x =  this.axis.x.x1 
			let hf =  (this.ds.height-(this.axis.y.y1 + this.fs*1.18))/2 + (this.scl*40)/2
			let y = this.ds.height-hf
		    console.log( ' init this.axis.x.x2 ',this.axis.x.x2 )
			this.thumbs.left.x = this.axis.x.x1 - this.scl*31
			this.thumbs.left.y = y
			this.wline.left.x1 = this.axis.x.x1
			this.wline.left.x2 = this.axis.x.x1
			this.wline.left.y1 =  y + this.scl*40/2
			this.wline.left.y2 =  y +this.scl*40/2
			this.wline.left.sSize = this.scl*40*0.6
			this.wline.left.active = false

			this.wline.middle.x = this.axis.x.x1
			this.wline.middle.y = y+this.scl*8
			this.wline.middle.w = this.axis.x.x2 - this.axis.x.x1
			this.wline.middle.h = this.scl*(40-16)

			this.thumbs.right.x = this.axis.x.x2 
			this.thumbs.right.y = y
			this.wline.right.x1 = this.axis.x.x2
			this.wline.right.x2 = this.axis.x.x2
			this.wline.right.y1 = y + this.scl*40/2
			this.wline.right.y2 = y + this.scl*40/2
			this.wline.right.sSize = this.scl*40*0.6
				console.log( this.ds.height -this.scl*40, "YYYYYYYYYYYYYYYY ",this.ds.height-hf,' this.axis.x.x2 ',this.axis.x.x2 )
			return 'ok'
		},
		mousemove(e) {
			 //console.log(e, " -eeee ", this.leftDrug);
				e.preventDefault();

				this.pos = this.getMousePosition(e);
				//if ( !this.leftDrug) this.pos = this.getMousePosition(e);
				//console.log( this.pos, " -x-y", this.leftDrug);
		},
		fillData(arr){ 
			console.log("fillData done",arr)
			while( this.points.length>0) this.points.pop()
			this.points=[...arr]	
			console.log(this.points[0].name)
		//console.log(Math.max.apply(null,this.points[0].data.map(a=> (''+a.price).length  )))
			
		},
		xmapData(){
			//let arr = bank.getData('mins')
			let step = (this.axis.x.x2-this.axis.x.x1)/(this.points[0].data.length-1)
			this.thumbs.step = step  // this need for slider to display last point easy
			let i = this.axis.x.x1, aa=0.00;
			this.points[0].data.forEach((a,j)=> {
				a.x = (j == 0)? i : i = step+i ;
				a.id=j
				aa=a.x
			})
			console.log("xmap points=", this.points[0].data.length, "x1=" ,this.axis.x.x1 ," x2=" ,this.axis.x.x2,"  >>", aa );
				
		},
		getDisplayData(first,end) {
			let doAxis = new DoAxis()
			//let mvMin= doAxis.minMove(arr)
			let n=this.thumbs.step*0.01
			let arr = this.points[0].data.filter(a=>  a.x >= first &&  a.x <= end+n ) //this.thumbs.step*0.5)
			//console.log("getDisplayData end ",end, arr.slice(-1), 'step' ,this.thumbs.step);
			let movMin = doAxis.minMove(arr)
			this.thumbs.right.priceDigits = movMin.width
			//console.log(movMin, " this.priceDigits ",this.thumbs.right.priceDigits, " update",this.axis);
			if (this.pSize != arr.length){
				this.pSize = arr.length
				doAxis.formulaY(arr, this.axis ,this.tky,this.calcOffsetX(),'0.01' ) // this.calcOffsetX()=58
				this.ticksY.splice(0,this.ticksY.length);
				this.ticksY=doAxis.ticksY().map(a=>a);
				this.pointY.splice(0,this.pointY.length);
				this.pointY=doAxis.pointY().map(a=>a);
				this.ticksX.splice(0,this.ticksX.length);
				this.ticksX=doAxis.ticksX().map(a=>a);
				this.pointX.splice(0,this.pointX.length);
				this.pointX=doAxis.pointX().map(a=>a);
				this.pointYX.splice(0,this.pointYX.length);
				this.pointYX=doAxis.pointYX().map(a=>a);
				//this.dPoints.splice(0,this.dPoints.length)
				//this.dPoints = arr
				return 'ok'
			} else  return 'no'
		},
		reSize(e) {
			// console.log(" reSize ",e);
			this.rect1()
		},
		rect1() {
			const rect = this.$refs.field.getBoundingClientRect();
			let CTM = this.$refs.sheet.getScreenCTM();
			this.wh.u = CTM.a;
			this.wh.w = rect.width, this.wh.h = rect.height
			console.log( " rect1 === " ,rect)
				return {
					rWidth: rect.width ,
					rHeight: rect.height
			}
		},
		calcOffsetY(){
			let mxl = (this.points.length>0) ? Math.max.apply(null,this.points[0].data.map(a=> (''+a.price).length  )):6
			let boxWidth = mxl*this.fs+this.tsz.off
			console.log( "mxl " , mxl, boxWidth, " -boxWidth+++ calcOffsetY() ")
			return  boxWidth;
		},
		calcOffsetX(){
			let mxl = (this.points.length>0) ? Math.max.apply(null,this.points[0].data.map(a=> (''+a.tm).length  )):6;
			let boxWidth = mxl*this.fs
			//console.log( "mxl " , mxl, boxWidth, " -boxWidth  calcOffsetX()")
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
		clearTest() {
			// this.pointYX.splice(...[]);
			// this.pointYX.splice(0,this.pointYX.length);
			//console.log('clearTest', this.pointYX.length)
			let wh = this.$refs.titles.getBoundingClientRect()
			let el = document.getElementById("legend");
			console.log('title box width',wh.width," height ", wh.height)
			let rwh = this.ds.width/this.ds.height;
			console.log(" Baseval box ",el.getBBox()," fs " ,this.fs, " cHeight ",this.fs*1.18 )
			
		},
		test() {
			while( this.points[0].data.length>0) this.points[0].data.pop()
            console.log( "test");
		},
		resizi() {
			const rect = this.$refs.field;
            let {width,height} = rect.style;

			console.log( 'rect', width.replace(/\D/g,''),height.replace(/\D/g,''))
			if( width)	{
				this.ds.width=width.replace(/\D/g,'')-19
				this.ds.height=height.replace(/\D/g,'')-19
				this.wh.w=12
				this.fillData(bank.getData('sto'))
				this.xmapData()
				this.pSize=1;
				this.getDisplayData(this.axis.x.x1,this.axis.x.x2)
				this.initSlider()
			}	
		},
		loadChart() {
			this.fillData(bank.getData('year'))
			this.xmapData()
			//this.pSize=1;
			this.getDisplayData(this.axis.x.x1,this.axis.x.x2)
			this.initSlider()
		}



	}
}
</script>
<style scoped lang='stylus'>
	.svgResponsive {
		 fill: none;  width: 100%; height: auto; background-color: transparent; resize: both ;
		  padding-right:  5px
		  margin-bottom 2px
		  border: 2px solid; overflow: auto;
	}
	#sheet
		& .leftThumb
			cursor ew-resize
		& .rightThumb
			cursor ew-resize	
		& .wline 	
			cursor pointer
		& .mbody
			cursor grab
			&:hover
				cursor move
	
</style>