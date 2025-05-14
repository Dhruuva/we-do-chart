<script setup>
import { ref,computed,onMounted,watch} from 'vue'  
import hljs from 'highlight.js';
import 'highlight.js/styles/an-old-hope.min.css';
import hljsVuePlugin from "@highlightjs/vue-plugin";
const textToCopy=ref(null);

const p = defineProps({
	 limit:{ type:[Number],  default: () =>(10)  }
	,scl:{type:[Number,String], default: () =>(0.45)  }   // For slider
	,tky:{   type:[Number,String], default: () =>(7) }// Axis y ticks numbers
	,decimals:{      type:[String],     default: () =>('0.01')  } //For price scale
	,tsz: { type:Object,   default: () =>( {size:5, off:5}) }  // the label ticks options off should be greater off
	,off:{type:[Number,String],    default: () =>(2)  } // Axis offset in percent of height
	,showGrid:{ type:Boolean, default: true }
	,fs : { type:[Number,String], default: ()=>(12)}
});
onMounted( async () => {
	document.querySelectorAll('pre code').forEach((el) => {
		hljs.highlightElement(el);
	});
	console.log(" textToCopy =",hljs)
})

watch(p.limit, (v) => {
	console.log(`limit is ${v}`);
	document.querySelectorAll('pre code').forEach((el) => {
		hljs.highlightElement(el);
	});
})

const update=()=>{
	document.querySelectorAll('pre code').forEach((el) => {
		hljs.highlightElement(el);
	});
	return 'ok'
}

defineExpose({update});
</script>

<template>
	<hljsVuePlugin language='html' code="var x = 5;" />
 <pre ref="textToCopy">
 	<code class="language-css">
   [theme="my-theme"] {                                                                                                                   
       .leftThumb {
          cursor: ew-resize;
          fill: #00f;
        }
        .rightThumb {
          cursor: ew-resize;
          fill: #00f;
        }
        .wline {
          cursor: pointer;
          stroke: #0074d9;
        }
        .mbody {
          cursor: grab;
          fill: #cfebfd;
        }
        .mbody:hover {
          cursor: move;
        }
        .axislabelx {
          font-family: Arial, Helvetica Neue, Helvetica;
          fill: #f00;
          text-anchor: middle;
          font-weight: 600;
        }
        .axislabely {
          font-family: Arial, Helvetica Neue, Helvetica;
          fill: #f00;
          alignment-baseline: auto;
          font-weight: 600;
        }
        .chartSheet {
          stroke: #00f;
          stroke-width: 2.5;
          fill: #fffafa;
          z-index: 1;
        }
        .legend {
          font-family: Arial, Helvetica Neue, Helvetica;
          fill: #0074d9;
          font-weight: 600;
        }
        .titles {
          font-family: Arial, Helvetica Neue, Helvetica;
          fill: #0074d9;
          font-weight: 800;
          text-anchor: middle;
          z-index: 2;
        }
        .titlesDot {
          stroke-width: 1.1;
          font-family: Arial, Helvetica Neue, Helvetica;
          fill: #0074d9;
          font-weight: 600;
        }
        .axisY {
          stroke: #0074d9;
          stroke-width: 2;
        }
        .axisX {
          stroke: #0074d9;
          stroke-width: 2;
        }
        .cross {
          stroke: #0074d9;
          stroke-width: 0.5;
        }
        .grids {
          stroke-width: 0.2;
          stroke: #0074d9;
          stroke-dasharray: 3;
        }
        .ticks {
          stroke-width: 1.18;
          stroke: #0074d9;
        }
        .plot {
          fill: none;
          stroke: #0074d9;
          stroke-width: 2;
        }
        .zero {
          stroke: #f00;
          stroke-width: 0.5;
        }
}	
</code></pre>

</template>

<style scoped>
 code {
	white-space:preserve nowrap;
	text-align: left;
	margin: 0.1em;

}
pre{
	margin: 0.1em;
}

</style>