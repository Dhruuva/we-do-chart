<template lang="pug">
	body
		div(id="mainLook_root" ref="root" @mousemove='getLocation' style='height:100%;')
			.split.upper.left.border(:style='leftStyle')
				v-card
					v-tabs(v-model='tab' align-with-title color='cyan' dark)
						v-tabs-slider(color='yellow')
						v-tab(v-for='item in iTabs' :key='item') {{ item }}
					v-tabs-items(v-model='tab')
						v-tab-item 
							v-card(height="500")
								v-card-text
									p.display-1.text--primary.text-left.titleBig we-do-chart 
										span.float-right
											v-btn.mx-2(  small color="primary" dark @click="loadData('sto')") Load Data  
									p.body-1.text-left.pa-2
										|  This is a brief interactive guide help You in quick its implementation in Web pages with all your requirements.Let's go to load some sample data in the component and look it.
										| Resize this panel size using thumb or resize browser window. The 
										span.green--text.font-weight-bold we-do-chart
										|   will stay in pretty look.	Any screen size you get the pretty looking your data visualizations.
									
						v-tab-item
							v-card(flat )
								v-toolbar(color="orange" dense)
									v-btn-toggle(v-model='toggle_none' )
										v-btn(small color="primary" dark @click="loadData('sto')") 100
										v-btn(small color="primary" dark @click="loadData('year')") 365
										v-btn(small color="primary" dark @click="loadData('intra')") Intra
									v-btn(class="ma-2 white--text" :loading="loading" :disabled="loading" color="blue-grey"  @click="initData('data.json')") Crypto
									v-select.mt-6(v-if="ishide" color="snow" :items="symbols" label="code" item-value='id' item-text='code' dense  v-model="sid" )
										template(v-slot:item='{ item }')
											v-card(fixed dense)
												table.myTable(v-if="item.id==212")
													thead
														tr 
															th Id
															th Symbol
															th Price
															th Points
															th Tick size
												table.myTable(v-if="item.id!=212")
													tbody
														tr 
															td {{item.id}}
															td {{item.code}}
															td {{item.price}}
															td {{item.points}}
															td {{item.tkz}}
								v-card.pa-2(height="700")
									v-row
										v-col( cols="12" md="6" )
											h1.text-left  points
											p.body-1.text-left.pa-2 Chart data represent array of the JSON object rows.								
												code.grey.lighten-1.mx-2.white--text() price: 
												|  should be a number otherwise error will rise.
												code.grey.lighten-1.mx-2.white--text tm: 
												|    field has no strict types but for a timeseries chart should be  ISO 8601 (YYYY-MM-DD).    Use buttons in upper toolbar to examine different data samples. Crypto button let you examine real-world sample ( crypto-currency ). 
											p.body-1.text-left.mt-n5.pa-2
												span 
													v-icon.pa-2( color="yellow darken-2") mdi-lightbulb
												| For the best interaction with chart, avoid load heavy sized arrays. I think below 2000 rows performance would be fast.	 	
										v-col( cols="12" md="6" )
											CodeSample
						v-tab-item 
							v-card.pa-2(height="700") 
								h1.text-left  decimals	
								div.d-inline.body-1.text-left.pa-2 Set the number of digits after the decimal point. Use the string mask. Default is 
								code.grey.mx-2.white--text '0.01'
								p
									v-slider( v-model="tkz" :tick-labels="dcml"   max="4" ticks="always" tick-size="4")
						v-tab-item 
							v-card.pa-2(height="700") 
								h1.text-left  fs
								p.body-1.text-left.pa-2 Use this property to set appropriate font-size for axis labels and chart legend. 
								v-slider( v-model="fsz" thumb-size="20" thumb-label="always" min="10" max="18" ticks="always" tick-size="4" step="1")
								p.body-1.text-left.pa-2
									v-icon.pa-2(  color="red darken-2") mdi-alert
									span.caption(color="red darken-2") Style font-size always ignored.
						v-tab-item 
							v-card.pa-2(height="700") 
								h1.text-left tky
								p.body-1.text-left.pa-2 This props control number of ticks on the y-axis.
								v-slider(v-model="tickYnumber" thumb-size="20"  thumb-label="always" min="3"  max="12" ticks="always" tick-size="4" step="1")
						v-tab-item 
							v-card.pa-2(height="700") 
								h1.text-left off
								p.body-1.text-left.pa-2 Use it in same cases, you wish to increase charts offset. This property impact top and left chart offset. Default 2 percent of height-width correspondingly.
								v-slider(v-model="chartOff" thumb-size="20"  thumb-label="always" min="2"  max="16" ticks="always" tick-size="4" step="2")
						v-tab-item 
							v-card.pa-2(height="700")
								h1.text-left tsz
								p.body-1.text-left.pa-2  This property deal with tick mark on the both axis. You can change size of ticks and labels offset. Property have a type of object.
									code.grey.mx-2.white--text  { size:5, off:5 }
								v-slider(label="tsz.size" v-model="tickSize.size" thumb-size="20" thumb-label="always" min="1" max="8" ticks="always" tick-size="4" step="1")
								v-slider(label="tsz.off" v-model="tickSize.off" thumb-size="20" thumb-label="always" min="5" max="16" ticks="always" tick-size="4" step="1")
						v-tab-item 
							v-card.pa-2(height="700") 
								h1.text-left timefotmat
								v-row
									v-col.text-h5( cols="12" sm="8" )
										p.body-1.text-left.pa-2 In case time series data this property change format x-axis labels. For help take a  reference of the 
											a(href="https://www.npmjs.com/package/dateformat") |npm dateformat package 
											| . Default value is null.
										p.body-1.text-left.pa-2 
											v-icon.pa-2( color="yellow darken-2") mdi-lightbulb
											|For more informative view in formats
											code.grey.mx-2.white--text(color="lighten-5") HH:MM, HH:MM:ss, dd  
											| would be display month and year on the changing tick-label.	
									v-col.text-h5( cols="12" sm="4" )
										v-select(:items="fmts" v-model='timefotmat')
						v-tab-item 
							v-card.pa-2(height="700") 
								h1.text-left scl
								p.body-1.text-left.pa-2 Use it in same cases, you wish to change size of the slider. Default value
									code.grey.mx-2.white--text 0.46 
								v-slider.pa-2(v-model="scl" thumb-size="30"  thumb-label="always" min="0.01"  max="0.99" ticks="always" tick-size="4" step="0.05")
								p.body-1.text-left.pa-2 
									v-icon.pa-2( color="yellow darken-2") mdi-lightbulb
									| If You have no need in slider just set 
									code.grey.mx-2.white--text(color="lighten-5") 0.01
						v-tab-item 
							v-card.pa-2(height="700") 
								h1.text-left limit
								p.body-1.text-left.pa-2 Property would be useful when you are need set minimum data points at that decreasing chart become unpossible.
								v-slider.mx-2(v-model="lmt" thumb-size="20" thumb-label="always" min="10"  max="30" ticks="always" tick-size="4" step="5")
						v-tab-item 
							v-card.pa-2(height="700") 
								h1.text-left showGrid
								p.body-1.text-left.pa-2 Property (boolean) hide/show  chart grid.
								v-switch.mx-2(v-model="showGrid")
						v-tab-item debug
							v-card.pa-2(height="700")
								v-card-text(v-text='3')
								p {{divHeight}}
								p  topp {{ topp}}	
				.thumb(@mousedown='startLeftDrug()' @mouseenter='rightDrug=!rightDrug' @mouseleave='rightDrug=!rightDrug')
			.split.upper.right.border(:style='rightStyle')
				WeChart(ref="weChart1" :points='data' :decimals='tkzz' :showGrid='showGrid' :timefotmat='timefotmat' :off="chartOff" :tky="tickYnumber" :tsz="tickSize" :scl="scl" :limit="lmt" :fs="fsz" :theme="theme" :shapes="shape")
			.split.down.left.border(:style='downStyle')
				.thumbUp(@mousedown='startUpDrug()' @mouseenter='upDrug=!upDrug' @mouseleave='upDrug=!upDrug')
				v-row
					v-col.text-h2( cols="12" md="12" )
						div.scrollTabel(:style="styleScrolLeft")
							v-data-table.myTable.pa-2(dense :headers='headers', :items='dataTable', :items-per-page='10')
			.split.down.right.border( :style='downRightStyle')
				v-card(flat)
					v-toolbar(color="orange" dense)
						v-toolbar-title Select theme
						v-col(cols="12" md="3")
							v-select.mx-4.mt-6(dense  flat solo :items="themes" v-model='thm')
					v-row
						v-fab-transition
							v-btn(color='#D3D3D3'  absolute middle right fab @click='copyText')
								v-icon  mdi-content-copy
						v-col( cols="12" md="6" )
							h1.text-left Style
								p.body-1.text-left.pa-2 Default styles maybe overridden in your page style section. You can also create custom style follow example in right panel. Then your style be ready just set its name in theme attribute of
									span.d-inline.green--text.font-weight-bold   we-do-chart 
									|  component.
								p.body-1.text-left.pa-2
									span.caption  
										v-icon.pa-2( color="yellow darken-2") mdi-lightbulb
										| Hint- you can explore theme.styl which founded in the component npm folder.
							v-textarea#aria(:style='visible' no-resize rows='1' :value='txt' ref='aria')
						v-col( cols="12" md="6" dark)
							div.meScroll(:style="styleScroll")
								Styling(ref="StyleBox" )


</template>

<script>

import WeChart  from "../components/weDoChart.vue";	
import Bank from "../components/bank";
import Styling from "../components/styling.vue";
import CodeSample from "../components/codeSample.vue";	

const bank = new Bank();

export default {
	name: 'MainLook',
	components: {
		WeChart,Styling,CodeSample
	},
	data: () => (
	{
		toggle_none: null,
		xy: [] ,
		rightDrug:false,moveDrug:false,upDrug:false,upDrugMove:false,
		leftX:50,leftY:50,top:0,topp:1,
		splitX:50,
		wh: {width:0,height :0 },	
		divHeight:{upDiv:0,dwDiv:0},
		vb:null,
		ds:{width:10, height:10},
		data:[],
		showGrid: true,
		loading: false,
		crypto:[],
		symbols:[],
		sid:null, // symboll ID
		tkz:2, // for update tkzz 
		//tkz:2, // minimal move for chart prop
		timefotmat:'HH:MM',
		headers:[{text:'tm',value:'tm'},{text:'price',value:'price'}],
		offx:0,offy:0,
		chartDiv:[], // dev
		tab: null,
		iTabs: [
			'Setup options','points','decimals','fs','tky','off','tsz','timefotmat','scl','limit','showGrid'
		],
		dcml:['0','0.1','0.01','0.001','0.0001'],
		chartOff:2,
		tickYnumber:7,
		tickSize: {size:5, off:5},
		scl:0.49,
		fmts:['yyyy-mm-dd','m/d/yy','mmm-dd','dd','HH:MM','HH:MM:ss'],
		lmt:10,
		themes:["default","monaco","berry"],
		thm:"default",
		scrollHeight:"200px",
		scrollHeight2:"200px",
		fsz:14,
		visible:"visibility: hidden;",
		txt:" Ha Ha copy me",
		hideme:("visibility: hidden;"),
		ishide: false,
		shape :[],


	}),
	mounted() {
		window.addEventListener('mouseup', this.stopDrag);	
		window.addEventListener('resize', this.reSize);	
		this.init()
		this.initData('symbols.json'); 
		// let element = document.getElementsByClassName("split upper left border")[0];
		// this.getStyle(element)
		this.calcHeight()
		this.shape.push({type:'dot',x:0,y:0,price:110,tm:"2019-12-08 00:15:00"})
		this.shape.push({type:'dot',x:0,y:0,price:110,tm:"2019-12-25"})
	},
	watch:{
		xy(){
			this.movePanelUp()
			this.movePanel()
		},
		leftY(){
			this.calcHeight()

		},
		sid(id){
			this.toggle_none=null
			this.getChart(id);
		},
		
	},

	computed: {
		leftStyle(){
			return " width: "+this.leftX + "%;height: "+(this.leftY-this.topp) + "%;"
		},
		rightStyle(){
			return " width: "+ (100-this.leftX) + "%;height: "+(this.leftY-this.topp) + "%;"
		},
		upStyle(){
			
			return " height: "+this.leftY + "%;"
		},
		downStyle(){
			
			return " top: "+ (this.leftY) + "%;width: "+this.leftX + "%;height: "+(100-(this.leftY) ) + "%;"
		},
		downRightStyle(){
			return " top: "+ (this.leftY) + "%;width: "+(100-this.leftX) + "%;height: "+(100-(this.leftY) ) + "%;"
		},
		tkzz(){
			let rtn=this.dcml[this.tkz]
			return rtn
		},
		theme(){
			let rtn=(this.thm=='default')?'':this.thm;
			return rtn
		},
		styleScroll () {
			return 'height: ' + this.scrollHeight + ';' 
		},
		styleScrolLeft () {
			return 'height: ' + this.scrollHeight2 + ';' 
		},
		dataTable () {
			return  (this.data.length>0)? this.data[0].data:[]
		}


	},

	methods: {
		movePanel(){
			if (this.moveDrug && !this.upDrugMove) this.leftX =(this.xy[0]+this.offx)*100/(this.wh.width);
		
		},
		movePanelUp(){
			if (this.upDrugMove && !this.moveDrug){
				let h=(this.xy[1]+this.offy)*100/(this.wh.height);
				this.leftY = h;
			}
		},
		initLayout(){
			let top=(this.$refs.root) ?this.$refs.root.getBoundingClientRect().top: document.getElementById('mainLook_root').getBoundingClientRect().top
			this.wh.width = window.innerWidth
			this.wh.height = window.innerHeight
			this.top = top
			this.topp =top*100/window.innerHeight
			
			let upDiv = document.getElementsByClassName('split upper left border')
			
			this.divHeight.upDiv=upDiv[0].getBoundingClientRect();
		
			let dwDiv = document.getElementsByClassName('split down left border')
			this.divHeight.dwDiv=dwDiv[0].getBoundingClientRect();
		
			this.ds.width=dwDiv[0].clientWidth
			this.ds.height= dwDiv[0].clientHeight
			this.divSvg=dwDiv
			//dev
			let chdv = document.getElementsByClassName('split down right border')
			this.chartDiv.push(chdv[0].clientWidth)
			this.chartDiv.push(chdv[0].clientHeight)
			this.chartDiv.push(chdv[0].getBoundingClientRect().width)
			this.chartDiv.push(chdv[0].getBoundingClientRect().height)
		},
		init(){
			setTimeout(()=>{
				this.initLayout();
			},25);
		
		},

		reSize(){
			setTimeout(()=>{
				this.init();
			},20);
		
		},
		getLocation(e) {
			e.preventDefault();
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
			this.moveDrug = false;
			this.upDrugMove = false;
		},
		startLeftDrug(){
			let elem = document.getElementsByClassName('split upper left border')
			this.offx =elem[0].offsetWidth-this.xy[0]+7
			this.leftX = (this.xy[0]+this.offx)*100/(this.wh.width)
		
			if (this.rightDrug){
				this.moveDrug = true;
			}
		},
		startUpDrug(){
			let elem = document.getElementsByClassName('split down left border')
			this.offy = elem[0].offsetTop-this.xy[1]
			if (this.upDrug){
				this.upDrugMove = true;
			}
		},
		async loadData(val){
			let arr = bank.getData(val);
			if (val=='sto') {
				this.timefotmat='dd'
			}
			else if (val=='year'){
				this.timefotmat='dd'
			}
			else if (val=='intra'){
				this.timefotmat='HH:MM'
			}
			while( this.data.length>0) this.data.pop()
				
			this.data=[...arr]
			this.sid=null
			
		
		},
		loadJSON(name,callback) {   
			let xobj = new XMLHttpRequest();
			xobj.overrideMimeType("application/json");
			xobj.open('GET', name, true); // Replace 'my_data' with the path to your file
			xobj.onreadystatechange = function () {
					if (xobj.readyState == 4 && xobj.status == "200") {
						callback(xobj.responseText);
				}
			};
			xobj.send(null);  
		},
		initData(name) {
			let vm=this
			this.loading=true
			this.loadJSON(name,function(response) {

				if (name=='data.json')  {
					vm.crypto = JSON.parse(response)
					vm.ishide=true
				}
				else{
					vm.symbols = JSON.parse(response)	
				}
				vm.loading=false
			
				
			});
			
		//	
		},
		getChart(id) {
			let flt=(val)=>this.$options.filters.toExponentialFree(val)
			let rows=this.crypto.map(a=>(a.id==id)? {tm:a.tms,price:flt(a.bid)}:null).filter(Boolean);
			let tiker=this.symbols.find(a=>a.id==id).code
			let toPoints=[{name:tiker ,data:rows}]
			let mv = this.symbols.find(a=>a.id==id).tkz
			///if (mv==1) mv='0'
			let nn = (mv.toString().indexOf(".")>0)? mv.toString().length - mv.toString().indexOf(".")-1:0
			if (this.dcml.indexOf(mv)<0 && nn>0){
				this.dcml.pop()
				this.dcml.push(mv)
				nn=4
			}
			this.tkz =nn			
			while( this.data.length>0) this.data.pop()
		
			this.data=[...toPoints]	
		
			this.timefotmat='HH:MM:ss'
		},
		calcHeight(){
			let element = document.getElementsByClassName("split down left border")[0]
			let computedStyle = window.getComputedStyle(element, null)
			let h = parseInt(computedStyle['height'], 10)
			this.scrollHeight2 =  (h-30)+'px'
			this.scrollHeight =  (h-80)+'px'

		},

		copyText(){
			this.visible="visibility: visible;"
			let textToCopy = this.$refs.StyleBox.txt
			this.txt = textToCopy;
			
			setTimeout(()=>{
				let aria = document.getElementById("aria");
				aria.focus();
				aria.select(); 
				document.execCommand("copy");
				this.visible="visibility: hidden;"   
			},25);  	 
		}

	}
}
</script>
<style scoped lang='stylus'>
	$colorBorder = coral
	$colorBg = coral
	body
		font-family 'Avenir', Helvetica, Arial, sans-serif
	.titleBig
		text-shadow: 0 -.1em .2em darkgreen;
		font-size:1.9em !important
		color lime !important
		font-stretch: expanded
		font-family "Jazz LET" !important
		letter-spacing 10px !important
		font-weight 900 !important
	border-radius(n)
		-webkit-border-radius n
		-moz-border-radius n
		border-radius n
	thumb-style(n)
		border-color $colorBorder
		border-style groove
		background-color $colorBg
		border-width n
	#sheet	
		& .leftThumb
			/*fill green*/
	.svgResponsive 
		fill red
		width auto
		height 300px
		background-color snow
	.meScroll
		overflow-y scroll 
		white-space nowrap
		margin-top -5px
		min-height 70px
		background-color #F0F0F0
	.scrollTabel
		overflow-y auto 
		white-space nowrap
		margin-top -5px
		min-height 100px
		background-color snow	
	.split
		width 50%
		height  100%
		position fixed
		z-index 1
		padding 0
		overflow-x hidden
		overflow-y hidden
	.upper
		top auto
		height 50%
	.down
		height 50%	
		background-color transparent	 	
	.left
		left 0
	.right
		right 0
	.border	
		border-style groove
		border-color $colorBorder
		border-width 7px
	.wd
		width 30%	
	.thumb 
		position absolute
		height 35px
		width 8px
		right 0
		top 45%
		border-radius(5px)	
		thumb-style(2px)
		&:hover
			cursor ew-resize
	.thumbUp 
		position absolute
		height 8px
		width 35px
		right 0
		top 0
		left 45%	
		border-radius(5px)
		thumb-style(2px)
		&:hover
			cursor ns-resize
	.myCell
		border 1px solid rgb(190, 190, 190)
		text-align center
		width auto
.myTable
	table
		border 1px solid #1C6EA4
		background-color snow
		width 100%
		text-align left
		/*border-collapse collapse
		border-spacing 0 1px */
	tbody
		td
			font-size 13px
			border 1px solid #AAAAAA
			padding 3px 2px
			width 100px
		tr
			width 100px
			padding 1px
			&:nth-child(even)
				background #D0E4F5
	thead
		background #1C6EA4
		background -moz-linear-gradient(top, #5592bb 0%, #327cad 66%, #1C6EA4 100%)
		background -webkit-linear-gradient(top, #5592bb 0%, #327cad 66%, #1C6EA4 100%)
		background linear-gradient(to bottom, #5592bb 0%, #327cad 66%, #1C6EA4 100%)
		border-bottom 2px solid #444444
	th
		width 100px
		font-size 15px
		font-weight bold
		color #FFFFFF
		border-left 2px solid #D0E4F5
		&:first-child
			border-left none						
</style>