<script setup>
import { ref,onMounted ,reactive,computed,watch,watchEffect ,useTemplateRef,toRefs} from 'vue'
import {Bank} from '../components/bank.js'
//import {startDrag,mousemove} from '../components/mouse.js'
import {calcOffsetX,calcOffsetY,calcMiniBottomHight,calcMiniTopHight} from '../components/offset.js'
import {DoAxes} from '../components/doAxes.js'
import {Slide} from '../components/slide.js'

const p = defineProps({
  ds: {type:Object, default:() =>( {width:1250, height:300})}
  ,points: {   type:Array,  default: () =>new Array()}
  ,limit:{ type:[Number],  default: () =>(10)  }
  ,scl:{type:[Number,String], default: () =>(0.45)  }   // For slider
  ,shapes: { type:Array, default: () =>( new Array({type:'dot',x:0,y:0,price:5,tm:"2018-02-05"})) }
  ,tky:{   type:[Number,String], default: () =>(7) }// Axis y ticks numbers
  ,decimals:{      type:[String],     default: () =>('0.01')  } //For price scale
  ,tsz: { type:Object,   default: () =>( {size:5, off:5}) }  // the label ticks options off should be greater off
  ,off:{type:[Number,String],    default: () =>(2)  } // Axis offset in percent of height
  ,msg: String
  ,showGrid:{ type:Boolean, default: true }
  ,timefotmat:{type:Object, default: () =>( new Intl.DateTimeFormat('sv-SE', { dateStyle:"short",timeStyle:"short"}) ) }
  ,fs : { type:[Number,String], default: ()=>(12)}
});


const debug = {}, pos = ref({x:0, y:0}), bank1 = new Bank()
,svg = useTemplateRef('sheet')
,thumbs = ref({ left:{x:0, y:0}, right:{x:0, y:0, priceDigits:0 },step:0.0001 })
,pointsID = ref({x1:0,x2:Number.MAX_VALUE})
,pSize = ref(0) // data in  display
,limitSize= ref(0)   // data count it's use in limit calculation
,zero= ref(null) 
,wline= ref( { left:{x1:0, x2:0, y1:0, y2:0 }, middle:{x:0,y:0, w:0,h:0}, right:{x1:0, x2:0, y1:0, y2:0 }})
,cross= ref({ v:{x1:0, y1:0, x2:0, y2:0 }, h:{x1:0, y1:0, x2:0, y2:0 }, hide:false, txt:"",cursor:'cursor: crosshair;'})
,ticksY=reactive(new Array()), ticksX=reactive(new Array()), pointYX=reactive(new Array())
,shape=reactive(new Array());
const axis= computed( ()=> {
  let h=p.ds.height,w =p.ds.width ,off = h*p.off/100
  , wbox = calcOffsetY(p.decimals,p.points,p.tsz,p.fs)
  , lfBox= calcOffsetX(p.timefotmat,p.points,p.fs)
  , hbox = calcMiniBottomHight(p.tsz,p.fs,p.scl,h)
  , tbox = calcMiniTopHight(p.tsz,p.fs);
  //console.log( " wbox =" ,wbox," lfBox =" ,lfBox, "hbox==",hbox, "tbox=",tbox);
  debug.box={"wbox":wbox,"lfBox":lfBox,"hbo":hbox,"tbo":tbox};
  let x = (off) < lfBox/3 ? lfBox/3:off;
  if (x < p.scl*31) x=p.scl*31+(p.scl*31/2.5);
  let y = (off) < hbox ? hbox:off;
  let y2 = (tbox > off ) ? tbox:off;
  let x2 = (off) < wbox/1.5 ? wbox/1.5:off;
  //console.log( " x =" ,x," y =" ,y, "y2==",y2, "x2=",x2);
  debug.xy={ " x " :x," y " :y, "y2":y2, "x2":x2};
  return {
    y: {y1: h-y, y2:y2, x1: w-x2, x2: w-x2},
    x: {y1: h-y, y2:h-y, x1:x, x2: w-x2},
  };
});


const doAxes = new DoAxes(), slider=new Slide(axis.fn(),pos,p.ds.height,thumbs,wline,cross,p.fs);


const isXtb= computed(() => bank1.getData("mins")[0].data.length);



onMounted( async () => {
  let rows= bank1.getData("mins")[0].data;
  console.log( " cross.value.txt" ,cross.value.txt, "limit----->",p.limit);
  console.log( "svg==" ,svg.value," width= ",svg.value.clientWidth," width= ",svg.value.clientWidth);
  //mousemove.bind(this); 
  slider.leftDrug = true
  slider.draggingLeft =true
  xmapData();
  cross.value.txt=' ';
  const axi = axis.fn();
  getDisplayData(axi.x.x1,axi.x.x2);
  console.log( " pre &&&&&&&&& pointYX**************",pointYX);
  slider.scl=p.scl;
  const rtn=slider.init( getDisplayData,svg,pointYX,limitSize);
  let pt = svg.value.createSVGPoint();
  console.log( " pt=" ,pt);
  slider.leftDrug = false
  slider.draggingLeft =false

  let lgd = document.getElementsByClassName('legend');
  console.log(" style --",lgd[0])


})

const viewBoxSet= computed( ()=> `0 0 ${p.ds.width } ${p.ds.height }`);
const chartName= computed( ()=>{
  return   (p.points[0])?  (p.points[0].name)? p.points[0].name:'':''
})
const grid= computed( ()=>{
  let off = p.ds.height*p.off/100;
  let step = p.ds.height*p.tky/100;
  let i = off, y=[];
  while (i <= p.ds.height-off){
    y.push(i)
    i+=step;
  }

  return { y: y};
})
const pointsAsPolyline= computed( ()=> {
  return pointYX.map((p) => `${p.x} ${p.y}`).join(' ');
})


// watch([p.showGrid,p.fs,p.off,p.limit,p.scl,p.tky], ([newX, newY]) => {
//   console.log("watch ALL.",p.off);
//   loadChart();
// })
// watch([() => p.limit,() => p.off],  (newValue, oldValue) => {
//     //console.log( " timefotmat --->",newValue.value);
//   console.log("watch ALL.",p.off);
//     loadChart();
// }, { deep: true });

watch([() => p.points,() => p.timefotmat,() => p.limit,() => p.off,() => p.tky,() => p.fs,() => p.scl,() => p.showGrid]
  ,  (newValue, oldValue) => {
    //console.log( " timefotmat --->",newValue.value);
    loadChart();
}, { deep: true });

watch(() => p.timefotmat,  (newValue, oldValue) => {
    //console.log( " timefotmat --->",newValue.value);
    loadChart();

}, { deep: true });

watch(() => p.shapes,  (newValue, oldValue) => {
    //console.log( " timefotmat --->",newValue.value);
    loadChart();
}, { deep: true });
watch(() => p.tsz,  (newValue, oldValue) => {
    //console.log( " timefotmat --->",newValue.value);
    loadChart();
}, { deep: true });


watch(() => pos,  (newValue, oldValue) => {
    //console.log( " pos --->",newValue.value.x);
  if ( p.points && p.points.length > 0 && p.points[0]?.data.length>0){
    //console.log( " pos --->",newValue.value.x, p.points[0]?.data.length);
    crossMove();
    slider.thumbYY();
    slider.thumbY();
  }

}, { deep: true });

watch(() => p.tky,  (newValue, oldValue) => {
    console.log( " tky --->",newValue.value);
    crossMove();
    slider.thumbYY();
    slider.thumbY();

}, { deep: true });




const xmapData=()=>{
	let sz = (p.points.length>0)? p.points[0].data.length:0;
  limitSize.value =(sz<=15 && sz>0)? sz: (sz/100)*p.limit;
  const axi = axis.fn();
 // console.log(" axis.x.x2 ",axi.x);
  let step = (axi.x.x2-axi.x.x1)/(sz-1);
 // console.log(" step ",step);
  thumbs.value.step = step  // this need for slider to display last point easy
  let i = axi.x.x1;
  if (p.points.length>0){
    p.points[0].data.forEach((a,j)=> {
      a.x = (j == 0)? i : i = step+i ;
      a.id=j
    })
  } 
}
const getDisplayData=(first,end)=> {
  const  axi = axis.fn();
  doAxes.shapes=p.shapes;
  let n=thumbs.value.step*0.01;
  let arr =(p.points.length>0)? p.points[0].data.filter(a=> a.x >= first &&  a.x <= end+n ) :[];
  console.log( 'arr.length=' ,arr.length, "first ", first,"end ", end)
  pointsID.value.x1= (arr.length>0)? arr[0].id:pointsID.value.x1;
  pointsID.value.x2= (arr.length>0)? arr.slice(-1)[0].id:pointsID.value.x2;
  //console.log( 'arr.length=' ,arr.length)
  if (pSize.value != arr.length){
    pSize.value = arr.length;
    doAxes.formulaY(arr, axi, p.tky, calcOffsetX(p.timefotmat,p.points,p.fs), p.decimals, p.timefotmat)
    ticksY.splice(0,ticksY.length);
    Array.prototype.push.apply(ticksY,doAxes.ticksY().map(a=>a));
    ticksX.splice(0,ticksX.length);
    Array.prototype.push.apply(ticksX,doAxes.ticksX().map(a=>a));
    //console.log("ticksX =",ticksX)
    if (p.timefotmat) doAxes.formatTicksX(ticksX,p.timefotmat);
    pointYX.length=0;
   // console.log("pointYX.legth =",pointYX.length)
    Array.prototype.push.apply(pointYX,doAxes.pointYX().map(a=>a));
    zero.value=doAxes.zero();
    shape.length=0;
    Array.prototype.push.apply(shape,doAxes.shapes);
    return 'ok'
  } else  return 'no';
}
const loadChart=()=> {
  //console.log( "p.tky loadChart --->",p.tky);
  const axi = axis.fn(); 
  xmapData()
  let arr =(p.points.length>0)? p.points[0].data.filter(a=>  a.id >=  pointsID.value.x1 &&  a.id <=  pointsID.value.x2 ):[] 
  let x1 = (arr.length>0)? arr[0].x:axi.x.x1
  let x2 = (arr.length>0)? arr.slice(-1)[0].x:axi.x.x2
  let p1 = arr.slice(-1)[0]
  cross.value.txt = (p1)? p1.price + " " + p1.tm:'';
  pSize.value=1
  //doAxis.shapes=this.shapes
  getDisplayData(x1,x2)
  slider.scl=p.scl;
  const rtn=slider.init( getDisplayData,svg,pointYX,limitSize);
  console.log("moveSlider x2===",x2, "arr ", arr.length);
  slider.moveSlider(x1,x2)
}

const mousemove=(e)=> {
  e.preventDefault();
  let pt = svg.value.createSVGPoint();
  pt.x = e.clientX;
  pt.y = e.clientY;
  let cursorPt = pt.matrixTransform(svg.value.getScreenCTM().inverse());
  pos.value = {x: Math.floor(cursorPt.x), y: Math.floor(cursorPt.y)};
}
const zoom=(event)=>{
  const axi = axis.fn();
  event.preventDefault();
  if (pos.value.x <  axi.x.x2 && pos.value.x>axi.x.x1 && pos.value.y>axi.y.y2 && pos.value.y<axi.y.y1 ) {
    slider.zoomSlider(event.deltaY)
  } 
}
const crossMove=()=>{
  const axi = axis.fn(),farPoints= new Array();
  if (pos.value.x<axi.x.x2 && pos.value.x>axi.x.x1 && pos.value.y>axi.y.y2 && pos.value.y<axi.y.y1) {
  	//console.log(" cross.value.cursor ",cross.value.cursor)
    if ( !slider.draggingCenter){//cross.value.cursor!=='cursor: grabbing;'
      cross.value.hide=false;
      cross.value.cursor='cursor: default;'
      let arr = (pointYX.length >0)? pointYX:(p.points.length>0)?p.points[0].data:[]
      let far = arr.map(a=> ({...a, f: Math.abs(a.x-pos.value.x) }) ).sort((a, b) =>Number(a.f-b.f))
      farPoints.length=0;
      Array.prototype.push.apply(farPoints, far);
      let p = (far.length>0) ? far[0] : null
      if (p ){
      	//console.log(" +++++++++++++++++++++++++++++++++++++++++ cros far match")
        cross.value.v.x1=p.x
        cross.value.v.x2=p.x
        cross.value.v.y1=axi.y.y1
        cross.value.v.y2=axi.y.y2
        cross.value.txt = p.price + " " + p.dtm;
        cross.value.h.x1=axi.x.x1
        cross.value.h.x2=axi.x.x2
        cross.value.h.y1=p.y
        cross.value.h.y2=p.y
      } else {
        cross.value.txt = "_" ;
      }
    } 
  } else {
 // console.log("cursor: default; ___________________________________________________")
  //slider.stopDrag();
  cross.value.cursor='cursor: default;'
  cross.value.hide=true;
  }
}

const f=(d)=>{
  return +d.toFixed(2)
}



const canDrug=()=>{
	if (!slider.draggingLeft && !slider.draggingRight  && !slider.draggingCenter ){
		return true;
	}
  else {
   	return false;
  }
}

defineExpose({loadChart,f});

watchEffect(() => {
  // runs only once before 3.5
  // re-runs when the "foo" prop changes in 3.5+
  //console.log("watchEffect p.off",p.off," p.points[0].data==" , p.points[0]?.data.length)
  //loadChart();
})


</script>

<template lang ="pug">
main
  .my-grid
    .left-side
      h4 x= {{ pos.x }} y= {{ pos.y }}
      h4 limitSize  {{limitSize}}
      h4 p.scl {{ p.scl }}
      h4 pointYX {{pointYX.length}}
      h4 ticksX {{ticksX.length}}
      h5 thumbs.step {{thumbs.step}}
      tr(v-for="([key, val]) in Object.entries(debug.box)")
        td {{key}}:
        td {{val}}
      tr(v-for="([key, val]) in Object.entries(debug.xy)")
        td {{key}}:
        td {{val}}  

    .central  
      h5  thumbs left.x={{f(thumbs.left.x)}} left.y={{f(thumbs.left.y)}}  right.x={{f(thumbs.right.x)}} right.y={{f(thumbs.right.y)}}
      h5 wline.middle :x {{f(wline.middle.x)}} :y {{f(wline.middle.y)}} :width {{f(wline.middle.w)}} :height {{f(wline.middle.h)}}
      svg#sheet(ref="sheet" :viewBox="viewBoxSet" xmlns="http://www.w3.org/2000/svg" @mousedown="slider.startDrag($event)" @mousemove="mousemove($event,pos)" @wheel="zoom" @mouseleave="slider.stopDrag")
        rect.chartSheet(ref="chartSheet" x="0" y="0" :width="ds.width" :height="ds.height" :style="cross.cursor" @mouseup="slider.stopDrag" )
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
        g(v-for="r in shape" :key="r.y")
          circle.shape( :cx="r.x" :cy="r.y" :r="fs/5" )
        g.ticksY(v-for="r in ticksY" :key="r.y")
          line.grids(v-if="showGrid" :x1="axis.x.x1" :x2="axis.x.x2" :y1="r.y" :y2="r.y")
          line.ticks( :x1="axis.y.x1" :x2="axis.y.x1+tsz.size" :y1="r.y" :y2="r.y" )
          text.axislabely( :x="axis.y.x1+tsz.off" :y="r.y+fs/3" :font-size='fs') {{r.price}}
        g.ticksX(v-for="n in ticksX" :key="n.y")
          line.grids(v-if="showGrid" :x1="n.x" :x2="n.x" :y1="axis.y.y1" :y2="axis.y.y2")
          line.ticks( :x1="n.x" :x2="n.x" :y1="axis.x.y1" :y2="axis.x.y1+tsz.size")
          text.axislabelx( :x="n.x" :y="axis.x.y1+tsz.size+tsz.off+fs/2" :font-size='fs') {{n.tm}}
        polyline.plot(v-bind:points='pointsAsPolyline')
        g.leftThumb( :transform="'translate('+thumbs.left.x+','+thumbs.left.y+') scale('+p.scl+')'" @mouseenter="slider.leftDrug= true" @mouseup="slider.stopDrag")
          polyline(points="10,40 0,30 0,10 10,0 31,0 31,40 " )
        line.wline(:x1="wline.left.x1" :x2="wline.left.x2" :y1="wline.left.y1" :y2="wline.left.y2" :stroke-width='wline.left.sSize' @click="slider.wlineLeftClick")
        rect.mbody(@mouseup="slider.stopDrag" :x="wline.middle.x" :y="wline.middle.y" :width="wline.middle.w" :height="wline.middle.h" @mousedown="slider.draggingCenter=true;slider.startDrag($event);")
        g.rightThumb(@mouseup="slider.stopDrag" :transform="'translate('+thumbs.right.x+','+thumbs.right.y+')scale('+p.scl+')'" @mouseenter="slider.rightDrug = true" )
          polyline(points="0,0 0,40 21,40 30,30 30,10 21,0 " )
        line.wline(:x1="wline.right.x1" :x2="wline.right.x2" :y1="wline.right.y1" :y2="wline.right.y2" :stroke-width='wline.right.sSize' @click="slider.wlineRightClick" )
      h4 wline.left  :x1 {{f(wline.left.x1)}} :x2 {{f(wline.left.x2)}} :y1 {{f(wline.left.y1)}} :y2 {{f(wline.left.y2)}}
      
    .right-side
      h4.one leftDrug {{slider.leftDrug}}
      h4.two rightDrug {{slider.rightDrug}}
      h4.tre draggingLeft {{slider.draggingLeft}}
      h4.one wline.left.active {{wline.left.active}}
      h4.for draggingCenter {{slider.draggingCenter}}
      h4.one draggingRight {{slider.draggingRight}}
      h4.two moveDrug {{slider.moveDrug}}
      h5 w {{p.ds.width}} h {{p.ds.height}}

</template>

<style lang ="stylus" >
@import '../assets/theme.styl'	
$colorPlot = #0074d9
$colorAxis = #0074d9
.one
  color #0035
.two
  color #ee012035
.tre
  color #524
.for
  color #ee3524       
.my-grid
  display grid
  width 100%
  grid-template-columns 1fr 3fr 1fr;
.right-side
   background-color #feeffe
.central
  min-width 600px
  background-color #efde
.left-side
  background-color #d2efde 

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
  fill #cfebfd
  &:hover
    cursor url('../assets/grab.png'), auto
  &:active
  	fill #ceed
  	cursor url('../assets/closedhand.cur'), auto
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
  z-index 1
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
  z-index 2
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
.shape
  stroke green 
  fill $colorPlot
  stroke-width 1.5

</style>
