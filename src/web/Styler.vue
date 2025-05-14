<script setup>
import { ref,computed,onMounted,watch} from 'vue'  
import hljs from 'highlight.js';
import 'highlight.js/styles/an-old-hope.min.css';
import hljsVuePlugin from "@highlightjs/vue-plugin";
import javascript from 'highlight.js/lib/languages/javascript';
import css from 'highlight.js/lib/languages/css';
hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('css', css);
const cssCode=ref(`[theme="my-theme"] 
{                                                                                                                
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
}`);
const hljsText=computed( ()=> { 
		return hljs.highlight(cssCode.value,  {language: 'css'}).value;
})

onMounted( async () => {
	// document.querySelectorAll('pre code').forEach((el) => {
	// 	hljs.highlightElement(el);
	// });
	// console.log(" textToCopy =",hljs)
})
defineExpose({cssCode});
</script>

<template>
<hljsVuePlugin  language='javascript' code="var x = 5;" />
<hljsVuePlugin autodetect :code="cssCode" /> 
<pre><code class="hljs css" v-html="hljsText"></code></pre>


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